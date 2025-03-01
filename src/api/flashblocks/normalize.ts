import type { Ethereum } from '$/data/networks/types'
import type { Payload, Block, FlashBlock, Transaction } from './types'

export const normalizeBlock = (
	block: Block,
	network: Ethereum.Network,
): Ethereum.Block => ({
	network,
	blockNumber: BigInt(parseInt(block.number, 16)) as Ethereum.BlockNumber,
	timestamp: parseInt(block.timestamp, 16) * 1000,
	blockHash: block.hash as Ethereum.BlockHash,
	parentBlockHash: block.parentHash as Ethereum.BlockHash,
	
	gasLimit: block.gasLimit ? BigInt(block.gasLimit) : 0n,
	gasUsed: block.gasUsed ? BigInt(block.gasUsed) : 0n,
	baseFeePerGas: block.baseFeePerGas ? BigInt(block.baseFeePerGas) : undefined,
	
	transactionsRoot: block.transactionsRoot as `0x${string}`,
	receiptsRoot: block.receiptsRoot as `0x${string}`,
	
	extraData: block.extraData,
	
	transactions: block.transactions?.map(tx => normalizeTransaction(tx, network)),
})

export const normalizeFlashBlock = (
	flashBlock: FlashBlock,
	network: Ethereum.Network
): Ethereum.Block => ({
	network,
	blockNumber: BigInt(parseInt(flashBlock.number, 16)) as Ethereum.BlockNumber,
	timestamp: parseInt(flashBlock.timestamp, 16) * 1000,
	// blockTime: 200, // Default block time in milliseconds
	producedAt: parseInt(flashBlock.timestamp, 16) * 1000,
	transactions: flashBlock.transactions?.map(tx => normalizeTransaction(tx, network)),
})

export const normalizeTransaction = (
	transaction: Transaction,
	network: Ethereum.Network
): Ethereum.Transaction => ({
	network,
	transactionId: transaction.hash as Ethereum.TransactionId,
	fromAddress: transaction.from as Ethereum.Address,
	toAddress: transaction.to as Ethereum.Address | undefined,
	value: transaction.value ? BigInt(transaction.value) : 0n,
	input: transaction.input as Ethereum.TransactionInput,
	nonce: transaction.nonce ? parseInt(transaction.nonce, 16) : undefined,
	type: (
		transaction.maxFeePerGas !== undefined && transaction.maxPriorityFeePerGas !== undefined ?
			'eip1559'
		: transaction.accessList !== undefined ?
			'eip2930'
		:
			'legacy'
	),
	gasToken: network.nativeCurrency,
	gasUnitsOffered: transaction.gas ? BigInt(transaction.gas) : undefined,
	gasUnitRate: transaction.gasPrice 
		? BigInt(transaction.gasPrice) 
		: transaction.maxFeePerGas 
			? BigInt(transaction.maxFeePerGas) 
			: undefined,
})

// This function normalizes a raw Payload into an Ethereum.Block
export const normalizePayload = (
	payload: Payload,
	network: Ethereum.Network
): Ethereum.Block => {
	// Extract block number from metadata
	const blockNumber = BigInt(payload.metadata.block_number) as Ethereum.BlockNumber
	
	// Normalize payload to Ethereum.Block
	return {
		network,
		blockNumber: blockNumber,
		timestamp: payload.base ? parseInt(payload.base.timestamp, 16) : undefined,
		blockHash: payload.diff.block_hash as Ethereum.BlockHash,
		parentBlockHash: payload.base?.parent_hash as Ethereum.BlockHash ?? `0x0` as Ethereum.BlockHash,
		
		gasLimit: payload.base?.gas_limit ? BigInt(payload.base.gas_limit) : 0n,
		gasUsed: BigInt(payload.diff.gas_used),
		baseFeePerGas: payload.base?.base_fee_per_gas ? BigInt(payload.base.base_fee_per_gas) : undefined,
		
		transactionsRoot: `0x0` as `0x${string}`, // Not directly available in payload
		receiptsRoot: payload.diff.receipts_root,
		logsBloom: payload.diff.logs_bloom,
		
		extraData: payload.base?.extra_data ?? '',
		
		// Process transactions from the diff
		transactions: normalizePayloadTransactions(payload.diff.transactions, network),
	}
}

// Normalizes a raw payload into an Ethereum.FlashBlock
export const normalizePayloadAsFlashBlock = (
	payload: Payload,
	network: Ethereum.Network
): Ethereum.FlashBlock => {
	// Extract block number from metadata and timestamp from base
	const blockNumber = BigInt(payload.metadata.block_number) as Ethereum.BlockNumber
	const timestamp = payload.base ? parseInt(payload.base.timestamp, 16) : undefined
	
	return {
		network,
		blockNumber,
		timestamp,
		blockTime: 200, // Default block time in milliseconds
		producedAt: timestamp ? timestamp * 1000 : Date.now(),
		sequenceNumber: payload.index,
		transactions: normalizePayloadTransactions(payload.diff.transactions, network),
	}
}

// Helper function to normalize transaction hex strings to Ethereum.Transaction objects
const normalizePayloadTransactions = (
	txHexes: `0x${string}`[],
	network: Ethereum.Network
): Ethereum.Transaction[] => {
	return txHexes.map(txHex => {
		// Basic transaction parsing, actual implementation would decode the transaction data
		return {
			network,
			transactionId: txHex.substring(0, 66) as Ethereum.TransactionId,
			fromAddress: (`0x${txHex.substring(66, 106)}`) as Ethereum.Address,
			toAddress: (`0x${txHex.substring(106, 146)}`) as Ethereum.Address,
			value: 0n,
			input: txHex as Ethereum.TransactionInput,
			type: 'legacy', // Default type
			gasToken: network.nativeCurrency
		}
	})
}