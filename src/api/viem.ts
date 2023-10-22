import type { Ethereum } from '../data/networks/types'

export const normalizeViemBlock = (
	block: Awaited<ReturnType<Ethereum.PublicClient['getBlock']>>,
	network: Ethereum.Network,
): Ethereum.Block | 'pending' => (
	'nonce' in block && block.nonce
		? {
			network,

			blockNumber: Number(block.number),
			hash: block.hash!,
			// blockHash
			parentHash: block.parentHash ?? undefined,
			// parentBlockHash
			timestamp: Number(block.timestamp),
			nonce: block.nonce,

			difficulty: block.difficulty,
			totalDifficulty: block.totalDifficulty ?? undefined,

			gasLimit: block.gasLimit,
			gasUsed: block.gasUsed,

			minerAddress: block.miner,
			extraData: block.extraData,
			baseFeePerGas: block.baseFeePerGas ?? undefined,

			...(((transactions: typeof block['transactions']): transactions is `0x${string}`[] => typeof transactions[0] === 'string')(block.transactions) ? {
				transactionIds: block.transactions,
			} : {
				transactions: block.transactions.map(transaction => normalizeViemTransaction(transaction, network) as Ethereum.Transaction),
			}),
		}
		: 'pending'
)

export const normalizeViemTransaction = (
	transaction: Awaited<ReturnType<Ethereum.PublicClient['getTransaction']>> | Exclude<Awaited<ReturnType<Ethereum.PublicClient['getBlock']>>, `0x${string}`[]>,
	network: Ethereum.Network,
): Ethereum.Transaction | 'pending' => (
	'blockNumber' in transaction
		? {
			network,

			transactionID: transaction.hash as Ethereum.TransactionID,
			nonce: transaction.nonce,
			transactionIndex: transaction.transactionIndex ?? undefined,
			blockNumber: Number(transaction.blockNumber) as Ethereum.BlockNumber,
			blockHash: transaction.blockHash as Ethereum.BlockHash,
			// date: transaction.,

			// isSuccessful: transaction.status != '0',

			fromAddress: transaction.from as Ethereum.Address,
			toAddress: transaction.to as Ethereum.Address,

			value: transaction.value,

			gasToken: network.nativeCurrency,
			gasOffered: transaction.gas,
			gasSpent: transaction.gas,
			gasRate: transaction.gasPrice,
			gasValue: transaction.gasPrice && transaction.gas && transaction.gasPrice * transaction.gas,

			...('accessList' in transaction ? {
				accessList: transaction.accessList,
			} : {}),
		}
		: 'pending'
)
		
// logEvents: transaction?.map(({
// 	address,
// 	blockHash,
// 	blockNumber,
// 	data,
// 	decoded,
// 	logIndex,
// 	topics,
// 	transactionHash,
// 	transactionIndex
// } : {
// 	address: string,
// 	blockHash: string,
// 	blockNumber: number,
// 	data: string,
// 	decoded: Ethereum.TransactionLogEventDecoded,
// 	logIndex: number,
// 	topics: string[],
// 	transactionHash: string,
// 	transactionIndex: number
// }) => ({
// 	indexInTransaction: logIndex,
// 	transactionHash,

// 	indexInBlock: transactionIndex,
// 	blockNumber,
// 	blockHash,

// 	topics,
// 	data,

// 	contract: {
// 		address
// 	},

// 	decoded
// } as Ethereum.TransactionLogEvent)),
