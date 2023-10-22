import type { Ethereum } from '../data/networks/types'
import type { TransactionResponse, TransactionReceipt, Log } from 'ethers'


export const normalizeEthersTransaction = (transaction: TransactionResponse | TransactionReceipt, network: Ethereum.Network): Partial<Ethereum.Transaction> => ({
	network,

	transactionID: transaction.hash as Ethereum.TransactionID,

	...('nonce' in transaction && {
		nonce: transaction.nonce,
		transactionIndex: transaction.index,
		blockNumber: transaction.blockNumber as Ethereum.BlockNumber,
		blockHash: transaction.blockHash as Ethereum.BlockHash,
		// date: transaction.timestamp,
	}),

	...('status' in transaction && {
		isSuccessful: transaction.status !== 0,
	}),

	fromAddress: transaction.from as Ethereum.Address,
	toAddress: transaction.to as Ethereum.Address,

	...('value' in transaction && {
		value: Number(transaction.value) * 0.1 ** network.nativeCurrency.decimals,
	}),

	gasToken: network.nativeCurrency,
	...('gasLimit' in transaction && {
		gasOffered: transaction.gasLimit,
	}),
	...('gasUsed' in transaction && {
		gasSpent: transaction.gasUsed,
	}),
	gasRate: transaction.gasPrice,
	...('gasUsed' in transaction && {
		gasValue: Number(transaction.gasPrice) * Number(transaction.gasUsed) * 0.1 ** network.nativeCurrency.decimals,
	}),

	...('logs' in transaction && transaction.logs ? {
		logEvents: transaction.logs.map(normalizeEthersTransactionLogEvent),
	} : {}),
})

export const normalizeEthersTransactionLogEvent = (logEvent: Log): Ethereum.TransactionLogEvent => ({
	indexInTransaction: logEvent.index,
	transactionHash: logEvent.transactionHash as Ethereum.TransactionID,

	indexInBlock: logEvent.transactionIndex,
	blockNumber: logEvent.blockNumber,
	blockHash: logEvent.blockHash as Ethereum.BlockHash,

	topics: logEvent.topics as Ethereum.TopicHash[],
	data: logEvent.data,

	contract: {
		address: logEvent.address as Ethereum.Address,
	},
})
