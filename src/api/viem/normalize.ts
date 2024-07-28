import type { TransactionReceipt } from 'viem'
import type { Ethereum } from '$/data/networks/types'

export const normalizeBlock = (
	block: Awaited<ReturnType<Ethereum.PublicClient['getBlock']>>,
	network: Ethereum.Network,
): Ethereum.Block => ({
	network,
	blockNumber: block.number !== null ? BigInt(block.number) : undefined,
	finalityStatus: 'hash' in block && block.hash ? 'finalized' : 'pending',

	blockHash: block.hash ?? undefined,
	parentBlockHash: block.parentHash,
	timestamp: Number(block.timestamp) * 1000,
	nonce: block.nonce ? block.nonce : undefined,

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
		transactions: block.transactions.map(transaction => normalizeTransaction(transaction, network) as Ethereum.Transaction),
	}),
})

export const normalizeTransaction = (
	transaction: (
		| Awaited<ReturnType<Ethereum.PublicClient['getTransaction']>>
		| Awaited<ReturnType<Ethereum.PublicClient['getTransactionReceipt']>>
		| Exclude<Awaited<ReturnType<Ethereum.PublicClient['getBlock']>>['transactions'][number], `0x${string}`>
	),
	network: Ethereum.Network,
	logs?: TransactionReceipt['logs'],
): Ethereum.Transaction => ({
	network,
	transactionId: 'hash' in transaction ? transaction.hash : transaction.transactionHash,

	...('status' in transaction && {
		executionStatus: ({
			'success': 'successful',
			'reverted': 'failed',
		} as const)[transaction.status],
	}),
	finalityStatus: transaction.blockNumber !== null ? 'finalized' : 'pending',

	blockNumber: transaction.blockNumber !== null ? BigInt(transaction.blockNumber) : undefined,
	blockHash: transaction.blockHash !== null ? transaction.blockHash : undefined,
	...('timestamp' in transaction && {
		blockTimestamp: Number(transaction.timestamp),
	}),

	transactionIndex: transaction.transactionIndex !== null ? transaction.transactionIndex : undefined,

	...('nonce' in transaction && {
		nonce: transaction.nonce,
	}),

	fromAddress: transaction.from as Ethereum.Address,
	toAddress: transaction.to as Ethereum.Address,

	input: 'input' in transaction ? transaction.input : undefined,
	value: 'value' in transaction ? transaction.value : 0n,

	gasToken: network.nativeCurrency,
	...('gas' in transaction && {
		gasUnitsOffered: transaction.gas,
		gasUnitsSpent: transaction.gas,
		gasUnitRate: transaction.gasPrice,
		gasValue: transaction.gasPrice && transaction.gas && transaction.gasPrice * transaction.gas,
	}),

	...('accessList' in transaction ? {
		accessList: transaction.accessList,
	} : {}),

	...('logs' in transaction ? {
		logEvents: transaction.logs.map(normalizeLogEvent)
	} : logs ? {
		logEvents: (
			logs.map(log => (
				normalizeLogEvent(log, network)
			))
		),
	} : {}),
})
		
export const normalizeLogEvent = (
	logEvent: TransactionReceipt['logs'][number],
	network: Ethereum.Network,
): Ethereum.TransactionLogEvent => ({
	topics: logEvent.topics,
	data: logEvent.data,

	contract: {
		chainId: network.chainId,
		address: logEvent.address,
	},

	transactionHash: logEvent.transactionHash ?? undefined,
	indexInTransaction: logEvent.logIndex ?? undefined,

	indexInBlock: logEvent.transactionIndex ?? undefined,
	blockNumber: logEvent.blockNumber !== null ? BigInt(logEvent.blockNumber) : undefined,
	blockHash: logEvent.blockHash ?? undefined,
})
