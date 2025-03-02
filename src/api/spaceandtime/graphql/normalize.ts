// Types
import type { Ethereum } from '$/data/networks/types'
import type { EthereumBlock, EthereumTransaction } from './ethereum/fragments'
import type { FragmentOf } from 'gql.tada'


// Functions
export const normalizeBlock = (
	block: FragmentOf<typeof EthereumBlock>,
	network: Ethereum.Network,
): Partial<Ethereum.Block> => ({
	network,
	blockNumber: block.BLOCK_NUMBER !== null ? BigInt(block.BLOCK_NUMBER) : undefined,

	blockHash: block.BLOCK_HASH !== null ? block.BLOCK_HASH as Ethereum.BlockHash : undefined,
	timestamp: typeof block.TIME_STAMP === 'string' ? new Date(block.TIME_STAMP).valueOf() : undefined,

	gasLimit: block.GAS_LIMIT !== null ? BigInt(block.GAS_LIMIT) : undefined,
	gasUsed: block.GAS_USED !== null ? BigInt(block.GAS_USED) : undefined,
	// baseFeePerGas: block.BASE_FEE_PER_GAS !== null ? BigInt(block.BASE_FEE_PER_GAS) : undefined,
	
	minerAddress: block.MINER !== null ? block.MINER as Ethereum.Address : undefined,
})

export const normalizeTransaction = (
	transaction: FragmentOf<typeof EthereumTransaction>,
	network: Ethereum.Network,
): Partial<Ethereum.Transaction> => ({
	network,
	transactionId: transaction.TRANSACTION_HASH !== null ? transaction.TRANSACTION_HASH as Ethereum.TransactionId : undefined,
	
	executionStatus: transaction.RECEIPT_STATUS !== null ? transaction.RECEIPT_STATUS === 1 ? 'successful' : 'failed' : undefined,
	
	blockNumber: transaction.BLOCK_NUMBER !== null ? BigInt(transaction.BLOCK_NUMBER) : undefined,
	blockTimestamp: typeof transaction.TIME_STAMP === 'string' ? new Date(transaction.TIME_STAMP).valueOf() : undefined,
	
	fromAddress: transaction.FROM_ADDRESS !== null ? transaction.FROM_ADDRESS as Ethereum.Address : undefined,
	toAddress: transaction.TO_ADDRESS !== null ? transaction.TO_ADDRESS as Ethereum.Address : undefined,
	
	value: transaction.VALUE_ !== null ? BigInt(transaction.VALUE_) : undefined,
	
	gasUnitsOffered: transaction.GAS !== null ? BigInt(transaction.GAS) : undefined
})
