// Types
import { Filecoin } from '$/data/filecoin'
import type { Ethereum } from '$/data/networks/types'
import type { TokenWithBalance } from '$/data/tokens'
import type { TipsetInfo, BlockInfo, Transaction, AccountBalance } from './api'
import { type BeryxActorType, beryxActorTypes, type BeryxAccountInfo } from '.'

type TransactionWithInternalTransactions = Transaction & { internalTransactions?: Transaction[] }


// Functions
import { isTruthy } from '$/utils/isTruthy'

export const normalizeTipset = (
	tipset: TipsetInfo,
): Filecoin.Tipset => ({
	id: tipset.tipset_cid,

	number: tipset.height !== undefined ? BigInt(tipset.height) : undefined,
	timestamp: tipset.timestamp !== undefined ? new Date(tipset.timestamp).valueOf() : undefined,

	isCanonical: tipset.canonical,
	baseGasFee: tipset.base_fee !== undefined ? BigInt(tipset.base_fee) : undefined,

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

	transactions: tipset.transactions,

	...tipset.parent_tipset_cid && {
		previousTipset: {
			id: tipset.parent_tipset_cid,
		},
	},
})

export const normalizeBlock = (
	block: BlockInfo,
	tipset: TipsetInfo,
): Filecoin.Block => ({
	id: block.BlockCid!,

	miner: {
		shortAddress: block.Miner as Filecoin.Address<Filecoin.AddressType.ID>,
	},

	tipset: {
		id: tipset.tipset_cid,

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
	id: transaction.tx_cid,

	isSuccessful: transaction.status == 'Ok',

	fromAddress: transaction.tx_from,
	toAddress: transaction.tx_to,

	value: BigInt(transaction.amount ?? 0),

	gasToken: network.nativeCurrency,
	gasSpent: transaction.gas_used !== undefined ? BigInt(transaction.gas_used) : undefined,

	method: transaction.tx_type,

	metadata: transaction.tx_metadata,

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
		block: {
			id: transaction.block_cid,
		},
	},

	...(
		transaction.tipset_cid
		|| transaction.height !== undefined
		|| transaction.tx_timestamp !== undefined
	) && {
		tipset: {
			id: transaction.tipset_cid,
			number: transaction.height !== undefined ? BigInt(transaction.height) : undefined,
			timestamp: transaction.tx_timestamp !== undefined ? new Date(transaction.tx_timestamp).valueOf() : undefined,
		},
	},
})

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
					id: account.creation_tx_hash,
				},
			},
			...'creation_tx_cid' in account && account.creation_tx_cid && {
				transaction: {
					id: account.creation_tx_cid,
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

export const linkInternalTransactions = (
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
