// Types
import { Filecoin } from '$/data/filecoin'
import type { Ethereum } from '$/data/networks/types'
import type { TokenWithBalance } from '$/data/tokens'
import type { TipsetInfo, BlockInfo, Transaction, AccountBalance, EventWithMetadata } from './api'
import { type BeryxActorType, beryxActorTypes, type BeryxAccountInfo } from '.'

type TransactionWithInternalTransactions = Transaction & { internalTransactions?: Transaction[] }


// Functions
import { isTruthy } from '$/utils/isTruthy'

export const normalizeTipset = (
	tipset: TipsetInfo,
): Filecoin.Tipset => ({
	cid: tipset.tipset_cid,

	number: tipset.height !== undefined ? BigInt(tipset.height) : undefined,
	timestamp: tipset.timestamp !== undefined ? new Date(tipset.timestamp).valueOf() : undefined,

	isCanonical: tipset.canonical,
	baseGasRate: tipset.base_fee !== undefined ? BigInt(tipset.base_fee) : undefined,

	blocks: (
		tipset
			.blocks_info
			?.map(block => (
				normalizeBlock(
					block,
					tipset,
				)
			))
	),

	...tipset.parent_tipset_cid && {
		previousTipset: {
			cid: tipset.parent_tipset_cid,
		},
	},
})

export const normalizeBlock = (
	block: BlockInfo,
	tipset: TipsetInfo,
): Filecoin.Block => ({
	cid: block.BlockCid!,

	miner: {
		shortAddress: block.Miner as Filecoin.Address<Filecoin.AddressType.ID>,
	},

	tipset: {
		cid: tipset.tipset_cid,

		...tipset.height !== undefined && {
			number: BigInt(tipset.height),
		},

		...tipset.timestamp !== undefined && {
			timestamp: new Date(tipset.timestamp).valueOf(),
		},
	},
})

export const normalizeBlockFromTipset = (
	tipset: TipsetInfo,
	blockCid: Filecoin.BlockCid,
): Filecoin.Block => (
	normalizeBlock(
		(
			tipset
				.blocks_info
				?.find(block => block.BlockCid === blockCid)
		),
		tipset
	)
)

export const normalizeTransaction = (
	transaction: Transaction | TransactionWithInternalTransactions,
	network: Ethereum.Network,
): Filecoin.Transaction => ({
	cid: transaction.tx_cid! as Filecoin.TransactionCid,

	...transaction.tx_from && {
		fromActor: {
			shortAddress: transaction.tx_from as Filecoin.Address<Filecoin.AddressType.ID>,
		},
	},
	...transaction.tx_to && {
		toActor: {
			shortAddress: transaction.tx_to as Filecoin.Address<Filecoin.AddressType.ID>,
		},
	},

	value: BigInt(transaction.amount ?? 0),

	gasToken: network.nativeCurrency,

	...transaction.tx_type && {
		method: {
			name: transaction.tx_type,
		},
	},

	metadata: 'tx_metadata' in transaction ? transaction.tx_metadata : undefined, // ???

	receipt: {
		exitCode: (
			({
				'Ok': 0,
				'Error': 1,
			} as const)
				[transaction.status as 'Ok' | 'Error']
		),

		gasSpent: transaction.gas_used !== undefined ? BigInt(transaction.gas_used) : undefined,
	},

	internalTransactions: (
		'internalTransactions' in transaction ?
			transaction
				.internalTransactions
				?.map(transaction => (
					normalizeTransaction(transaction, network)
				))
		:
			undefined
	),

	...transaction.block_cid && {
		blocks: [
			{
				cid: transaction.block_cid,
			},
		],
	},

	...(
		transaction.tipset_cid
		|| transaction.height !== undefined
		|| transaction.tx_timestamp !== undefined
	) && {
		tipset: {
			cid: transaction.tipset_cid,
			...transaction.height !== undefined && {
				number: BigInt(transaction.height),
			},
			...transaction.tx_timestamp !== undefined && {
				timestamp: new Date(transaction.tx_timestamp).valueOf(),
			},
		},
	},
})

export const normalizeTransactions = (
	transactions: Transaction[],
	network: Ethereum.Network,
): Filecoin.Transaction[] => (
	linkInternalTransactions(
		transactions
	)
		.map(transaction => (
			normalizeTransaction(
				transaction,
				network
			)
		))
)

const linkInternalTransactions = (
	transactions: Transaction[],
) => {
	const transactionsById = Object.fromEntries(
		transactions
			.map(transaction => [transaction.id, transaction])
	)

	const rootTransactions: TransactionWithInternalTransactions[] = []

	for(const transaction of transactions){
		const parentTransaction = transaction.parent_id && transactionsById[transaction.parent_id]

		if(parentTransaction)
			(parentTransaction.internalTransactions ??= []).push(transaction)

		else
			rootTransactions.push(transaction)
	}

	return rootTransactions
}

export const normalizeAccount = <
	T extends BeryxActorType = BeryxActorType
>(
	account: BeryxAccountInfo<T>,
) => ({
	type: beryxActorTypes[account.actor_type] as typeof beryxActorTypes[T],

	...'actor_cid' in account && account.actor_cid && {
		cid: account.actor_cid as Filecoin.ActorCid,
	},
	...'short' in account && account.short && {
		shortAddress: account.short as Filecoin.Address,
	},
	...'robust' in account && account.robust && {
		robustAddress: account.robust as Filecoin.Address,
	},
	...'eth_address' in account && account.eth_address && {
		evmAddress: account.eth_address as Ethereum.Address,
	},

	...'creator_address' in account && account.creator_address && {
		creator: {
			address: account.creator_address as Filecoin.Address,
		},
	},

	...(
		account.actor_type === Filecoin.ActorType.Multisig && 'state' in account && account.state && 'last_tipset_processed' in account.state ?
			{
				lastProcessedTipset: {
					number: BigInt(account.state.last_tipset_processed),
				},
			}

		: account.actor_type === Filecoin.ActorType.EvmContract && 'state' in account && account.state && 'contract_address' in account.state && Object.values(account.state).some(isTruthy) ?
			{
				erc20Token: {
					address: account.state.contract_address as Ethereum.Address,
					symbol: account.state.ticker,
					decimals: account.state.decimals,
					name: account.state.description,

					totalSupply: account.state.total_supply,
					holdersCount: account.state.holders_count,

					created: new Date(account.state.creation_date).valueOf(),
				},
			}

		:
			undefined
	),

	...(
		('creation_tx_hash' in account && account.creation_tx_hash)
		|| ('creation_tx_cid' in account && account.creation_tx_cid)
		|| ('created_at' in account && account.created_at)
	) && {
		createdAt: {
			...'creation_tx_hash' in account && account.creation_tx_hash && {
				transaction: {
					cid: account.creation_tx_hash,
				},
			},
			...'creation_tx_cid' in account && account.creation_tx_cid && {
				transaction: {
					cid: account.creation_tx_cid,
				},
			},

			...'created_at' in account && account.created_at && {
				tipset: {
					timestamp: new Date(account.created_at).valueOf(),
				},
			},
		},
	},
}) as Filecoin.Actor<typeof beryxActorTypes[T]>

export const normalizeBalance = (
	balance: AccountBalance,
): TokenWithBalance => ({
	token: {
		symbol: balance.currency.symbol,
		decimals: balance.currency.decimals,
	},

	balance: BigInt(balance.value),
})

export const normalizeEvent = (
	event: EventWithMetadata,
): Filecoin.Event => ({
	type: event.type! as Filecoin.EventType,

	emitter: {
		shortAddress: event.emitter! as Filecoin.Address<Filecoin.AddressType.ID>,
	},

	selectorId: event.selector_id!,
	...event.selector_sig && {
		selectorSignature: event.selector_sig,
	},

	logIndex: event.log_index!,

	metadata: event.metadata as Record<string, unknown> | undefined,

	...event.tx_cid && {
		transaction: {
			cid: event.tx_cid,

			...event.reverted !== undefined && {
				receipt: {
					exitCode: event.reverted ? 1 : 0,
				},
			},
		},
	},

	...event.tipset_cid && {
		tipset: {
			cid: event.tipset_cid,

			...event.canonical !== undefined && {
				isCanonical: event.canonical,
			},
		},
	},
})
