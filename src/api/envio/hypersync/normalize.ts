import type { Ethereum } from '$/data/networks/types'
import type { getBlocks, getTransactions, getLogs } from '.'

export const normalizeBlock = (
	block: Awaited<ReturnType<typeof getBlocks>>['result']['blocks'][number],
	network: Ethereum.Network,
): Ethereum.Block => ({
	network,
	blockNumber: BigInt(block.number),

	finalityStatus: 'finalized',

	blockHash: block.hash as `0x${string}`,
	parentBlockHash: block.parent_hash as `0x${string}`,
	timestamp: new Date(Number(block.timestamp) * 1000).valueOf(),

	gasLimit: BigInt(block.gas_limit),
	gasUsed: BigInt(block.gas_used),
	...'base_fee_per_gas' in block && block.base_fee_per_gas !== null && {
		baseFeePerGas: BigInt(block.base_fee_per_gas),
	},

	minerAddress: block.miner as `0x${string}`,
	difficulty: BigInt(block.difficulty),
	nonce: block.nonce as Ethereum.BlockNonce,

	extraData: block.extra_data,

	...'blob_gas_used' in block && block.blob_gas_used !== null && {
		blobGasUsed: BigInt(block.blob_gas_used),
	},
	...'excess_blob_gas' in block && block.excess_blob_gas !== null && {
		excessBlobGas: BigInt(block.excess_blob_gas),
	},
	...'parent_beacon_block_root' in block && block.parent_beacon_block_root !== null && {
		parentBeaconBlockRoot: block.parent_beacon_block_root as `0x${string}`,
	},
	...'withdrawals_root' in block && block.withdrawals_root !== null && {
		withdrawalsRoot: block.withdrawals_root as `0x${string}`,
	},
	...'withdrawals' in block && block.withdrawals !== null && {
		withdrawals: block.withdrawals as string,
	},
	...'mix_hash' in block && block.mix_hash !== null && {
		mixHash: block.mix_hash as `0x${string}`,
	},
})

export const normalizeTransaction = (
	transaction: Awaited<ReturnType<typeof getTransactions>>['result']['transactions'][number],
	network: Ethereum.Network,
): Ethereum.Transaction => ({
	network,
	transactionId: transaction.hash as `0x${string}`,

	executionStatus: transaction.status ? 'successful' : 'failed',

	finalityStatus: 'finalized',

	blockNumber: BigInt(transaction.block_number),
	blockHash: transaction.block_hash as `0x${string}`,

	nonce: Number(transaction.nonce),
	type: 'legacy',

	fromAddress: transaction.from as `0x${string}`,
	toAddress: transaction.to ? (transaction.to as `0x${string}`) : undefined,

	input: transaction.input as Ethereum.TransactionInput,
	value: BigInt(transaction.value),

	gasToken: network.nativeCurrency,
	gasUnitsSpent: BigInt(transaction.gas_used),
	gasUnitRate: BigInt(transaction.gas_price),
})

export const normalizeLog = (
	log: Awaited<ReturnType<typeof getLogs>>['result']['logs'][number],
): Ethereum.TransactionLogEvent => ({
	topics: log.topics as Ethereum.TopicHash[],
	data: log.data,
	
	contract: {
		address: log.address as `0x${string}`,
	},
	
	removed: log.removed,
	
	indexInTransaction: log.transaction_index,
	transactionHash: log.transaction_hash as `0x${string}`,
	
	indexInBlock: log.log_index,
	blockNumber: BigInt(log.block_number),
	blockHash: log.block_hash as `0x${string}`,
})
