// Types
import { Filecoin } from '$/data/filecoin'
import type { Ethereum } from '$/data/networks/types'
import type { TokenWithBalance } from '$/data/tokens'
import type { TipsetInfo, BlockInfo, Transaction, AccountBalance } from './api'
import type { BeryxAccountInfo } from '.'

type TransactionWithInternalTransactions = Transaction & { internalTransactions?: Transaction[] }


// Functions
export const normalizeTipset = (
	tipset: TipsetInfo,
): Filecoin.Tipset => ({
	id: tipset.tipset_cid,
	previousId: tipset.parent_tipset_cid,

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
})

export const normalizeBlock = (
	block: BlockInfo,
	tipset: TipsetInfo,
): Filecoin.Block => ({
	id: block.BlockCid,
	minerAddress: block.Miner,

	tipsetId: tipset.tipset_cid,
	tipsetNumber: tipset.height !== undefined ? BigInt(tipset.height) : undefined,
	tipsetTimestamp: tipset.timestamp !== undefined ? new Date(tipset.timestamp).valueOf() : undefined
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

	blockId: transaction.block_cid,
	tipsetId: transaction.tipset_cid,
	tipsetNumber: transaction.height !== undefined ? BigInt(transaction.height) : undefined,
	tipsetTimestamp: transaction.tx_timestamp !== undefined ? new Date(transaction.tx_timestamp).valueOf() : undefined,
})

export const normalizeAccount = <
	T extends Filecoin.ActorType = Filecoin.ActorType
>(
	account: BeryxAccountInfo<T>,
): Filecoin.Actor<T> => ({
	type: account.actor_type,

	cid: account.actor_cid as Filecoin.ActorCid,
	shortAddress: account.short! as Filecoin.Address,
	robustAddress: account.robust as Filecoin.Address | undefined,
	...'eth_address' in account && account.eth_address && {
		evmAddress: account.eth_address as Ethereum.Address,
	},

	...'creator_address' in account && account.creator_address && {
		creatorAddress: account.creator_address as Filecoin.Address,
	},

	...(
		account.actor_type === Filecoin.ActorType.EvmContract && 'state' in account && account.state && 'contract_address' in account.state ?
			{
				erc20Token: {
					address: account.state.contract_address,
					symbol: account.state.ticker,
					decimals: account.state.decimals,
					name: account.state.description,

					totalSupply: account.state.total_supply,
					holdersCount: account.state.holders_count,

					created: new Date(account.state.creation_date).valueOf(),
				},
			}

		: account.actor_type === Filecoin.ActorType.Multisig && 'state' in account && account.state && 'last_tipset_processed' in account.state ?
			{
				lastProcessedTipsetNumber: BigInt(account.state.last_tipset_processed),
			}

		:
			undefined
	),

	...(
		('creation_tx_hash' in account && account.creation_tx_hash)
		|| ('created_at' in account && account.created_at)
	) && {
		creation: {
			...'creation_tx_hash' in account && account.creation_tx_hash && {
				transactionId: account.creation_tx_hash,
			},

			...'created_at' in account && account.created_at && {
				tipsetTimestamp: new Date(account.created_at).getTime(),
			},
		},
	},
})

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
