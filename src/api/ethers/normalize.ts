import type { Ethereum } from '$/data/networks/types'
import type { TransactionResponse, TransactionReceipt, Log } from 'ethers'


export const normalizeTransaction = (transaction: TransactionResponse | TransactionReceipt, network: Ethereum.Network): Partial<Ethereum.Transaction> => ({
	network,
	transactionId: transaction.hash as Ethereum.TransactionID,

	...('status' in transaction && {
		executionStatus: transaction.status !== 0 ? 'successful' : 'failed',
	}),

	...('nonce' in transaction ? {
		finalityStatus: 'finalized',
		nonce: transaction.nonce,
		transactionIndex: transaction.index,
		blockNumber: transaction.blockNumber !== null ? BigInt(transaction.blockNumber) : undefined,
		blockHash: transaction.blockHash as Ethereum.BlockHash,
		// date: transaction.timestamp,
	} : {
		finalityStatus: 'pending',
	}),

	fromAddress: transaction.from as Ethereum.Address,
	toAddress: transaction.to as Ethereum.Address,

	...('value' in transaction && {
		value: transaction.value,
	}),

	gasToken: network.nativeCurrency,
	...('gasLimit' in transaction && {
		gasUnitsOffered: transaction.gasLimit,
	}),
	...('gasUsed' in transaction && {
		gasUnitsSpent: transaction.gasUsed,
	}),
	gasUnitRate: transaction.gasPrice,
	...('gasUsed' in transaction && {
		gasValue: transaction.gasPrice * transaction.gasUsed,
	}),

	...('logs' in transaction && transaction.logs ? {
		logEvents: transaction.logs.map(normalizeTransactionLogEvent),
	} : {}),
})

export const normalizeTransactionLogEvent = (logEvent: Log): Ethereum.TransactionLogEvent => ({
	indexInTransaction: logEvent.index,
	transactionHash: logEvent.transactionHash as Ethereum.TransactionID,

	indexInBlock: logEvent.transactionIndex,
	blockNumber: BigInt(logEvent.blockNumber),
	blockHash: logEvent.blockHash as Ethereum.BlockHash,

	topics: logEvent.topics as Ethereum.TopicHash[],
	data: logEvent.data,

	contract: {
		address: logEvent.address as Ethereum.Address,
	},
})
