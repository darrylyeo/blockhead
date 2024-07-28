// Types
import type { Ethereum } from '$/data/networks/types'
import type { Block, BlockTransaction, Log } from '../api/Api'


// Functions
export const normalizeBlock = (
	block: Block,
	network: Ethereum.Network
): Ethereum.Block => ({
	network,

	finalityStatus: 'block_number' in block ? 'finalized' : 'pending',

	blockHash: block.hash as Ethereum.BlockHash,
	parentBlockHash: block.parent_hash as Ethereum.BlockHash,
	blockNumber: BigInt(block.number),
	timestamp: new Date(block.timestamp).valueOf(),
	nonce: block.nonce as Ethereum.BlockNonce,

	difficulty: BigInt(block.difficulty),
	totalDifficulty: BigInt(block.total_difficulty),

	gasLimit: BigInt(block.gas_limit),
	gasUsed: BigInt(block.gas_used),

	minerAddress: block.miner as Ethereum.Address,
	extraData: block.extra_data,

	transactions: block.transactions
		.map(transaction => normalizeTransaction(transaction, network))
		.sort((transaction1, transaction2) => (transaction1.transactionIndex ?? 0) - (transaction2.transactionIndex ?? 0))
})

export const normalizeTransaction = (
	transaction: BlockTransaction,
	network: Ethereum.Network
): Ethereum.Transaction => ({
	network,
	transactionId: transaction.hash as Ethereum.TransactionID,

	executionStatus: transaction.receipt_status === '1' ? 'successful' : 'failed',
	finalityStatus: 'block_number' in transaction ? 'finalized' : 'pending',

	nonce: Number(transaction.nonce),
	transactionIndex: Number(transaction.transaction_index),
	blockNumber: BigInt(transaction.block_number),
	blockHash: transaction.block_hash as Ethereum.BlockHash,
	blockTimestamp: new Date(transaction.block_timestamp).valueOf(),

	fromAddress: transaction.from_address as Ethereum.Address,
	toAddress: transaction.to_address as Ethereum.Address,

	input: transaction.input as Ethereum.TransactionInput,
	value: BigInt(transaction.value),

	gasToken: network.nativeCurrency,
	gasUnitsSpent: BigInt(transaction.receipt_gas_used),
	gasUnitRate: BigInt(transaction.gas_price),
	gasValue: BigInt(transaction.receipt_gas_used) * BigInt(transaction.gas_price),

	logEvents: transaction.logs
		?.map((log, indexInTransaction) => normalizeLog(log, indexInTransaction, network))
		.sort((a, b) => (a.indexInBlock ?? 0) - (b.indexInBlock ?? 0)),
})

export const normalizeLog = (
	log: Log,
	indexInTransaction: number,
	network: Ethereum.Network,
): Ethereum.TransactionLogEvent => ({
	indexInTransaction,
	transactionHash: log.transaction_hash as Ethereum.TransactionID,

	indexInBlock: Number(log.log_index),
	blockNumber: BigInt(log.block_number),
	blockHash: log.block_hash as Ethereum.BlockHash,

	topics: [
		log.topic0 as Ethereum.TopicHash,
		log.topic1 as Ethereum.TopicHash,
		log.topic2 as Ethereum.TopicHash,
		log.topic3 as Ethereum.TopicHash,
	].filter(Boolean),
	data: log.data,

	contract: {
		chainId: network.chainId,
		address: log.address as Ethereum.ContractAddress,
	},
})
