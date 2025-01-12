// Types
import type { Filecoin } from '$/data/filecoin'
import type { Ethereum } from '$/data/networks/types'
import type { TokenWithBalance } from '$/data/tokens'
import type { TipsetInfo, Transaction, AccountInfo, AccountBalance } from './api'

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
			?.map(block => ({
				id: block.BlockCid,
				minerAddress: block.Miner,
			}))
	),

	transactions: tipset.transactions,
})

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

export const normalizeAccount = (
	account: AccountInfo,
	address: Filecoin.Address,
): Filecoin.Account => ({
	address,
	actorType: account.actor_type,

	robustAddress: account.robust,
	createdTipsetTimestamp: account.create_timestamp,
	createdTransactionId: account.creation_tx_hash,
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
