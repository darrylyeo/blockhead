import { env } from '../../env'
import { HttpClient, Api, type ChainList, type Block, type BlockTransaction, type Log } from './api/Api'

export const MoralisWeb3Api = new Api(new HttpClient({
	baseApiParams: {
		headers: {
			'x-api-key': env.MORALIS_WEB3_API_KEY
		}
	}
}))


import type { Ethereum } from '../../data/networks/types'

export const chainCodeFromNetwork = (network: Ethereum.Network) =>
	`0x${network.chainId.toString(16)}` as ChainList

// export const moralisChainIDs = [
// 	'eth',
// 	'0x1',
// 	'ropsten',
// 	'0x3',
// 	'rinkeby',
// 	'0x4',
// 	'goerli',
// 	'0x5',
// 	'kovan',
// 	'0x2a',
// 	'polygon',
// 	'0x89',
// 	'mumbai',
// 	'0x13881',
// 	'bsc',
// 	'0x38',
// 	'bsc',
// 	'0x61',
// 	'avalanche',
// 	'0xa86a',
// ]

// export const networkToMoralisChainID = (network: Ethereum.Network) =>
// 	moralisChainIDs[network.chainId]


export const normalizeMoralisBlock = (block: Block, network: Ethereum.Network): Ethereum.Block => ({
	network,

	finalityStatus: 'block_number' in block ? 'finalized' : 'pending',

	blockHash: block.hash as Ethereum.BlockHash,
	parentBlockHash: block.parent_hash as Ethereum.BlockHash,
	blockNumber: Number(block.number),
	timestamp: new Date(block.timestamp).valueOf(),
	nonce: block.nonce as Ethereum.BlockNonce,

	difficulty: BigInt(block.difficulty),
	totalDifficulty: BigInt(block.total_difficulty),

	gasLimit: BigInt(block.gas_limit),
	gasUsed: BigInt(block.gas_used),

	minerAddress: block.miner as Ethereum.Address,
	extraData: block.extra_data,

	transactions: block.transactions
		.map(transaction => normalizeMoralisTransaction(transaction, network))
		.sort((transaction1, transaction2) => (transaction1.transactionIndex ?? 0) - (transaction2.transactionIndex ?? 0))
})

export const normalizeMoralisTransaction = (transaction: BlockTransaction, network: Ethereum.Network): Ethereum.Transaction => ({
	network,
	transactionId: transaction.hash as Ethereum.TransactionID,

	executionStatus: transaction.receipt_status === '1' ? 'successful' : 'failed',
	finalityStatus: 'block_number' in transaction ? 'finalized' : 'pending',

	nonce: Number(transaction.nonce),
	transactionIndex: Number(transaction.transaction_index),
	blockNumber: Number(transaction.block_number),
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

	logEvents: transaction.logs?.map(log => normalizeMoralisLog(log, network)),
})

export const normalizeMoralisLog = (log: Log, network: Ethereum.Network): Ethereum.TransactionLogEvent => ({
	indexInTransaction: Number(log.transaction_index),
	transactionHash: log.transaction_hash as Ethereum.TransactionID,

	indexInBlock: Number(log.log_index),
	blockNumber: Number(log.block_number),
	blockHash: log.block_hash as Ethereum.BlockHash,

	topics: [
		log.topic0 as Ethereum.TopicHash,
		log.topic1 as Ethereum.TopicHash,
		log.topic2 as Ethereum.TopicHash,
		log.topic3 as Ethereum.TopicHash,
	],
	data: log.data,

	contract: {
		address: log.address as Ethereum.ContractAddress,
		label: log.address as string,
	},
})
