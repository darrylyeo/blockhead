import { graphql } from './index'

export const EthereumBlock = graphql(`
	fragment EthereumBlock on ETHEREUM_BLOCKS @_unmask {
		BLOCK_NUMBER
		BLOCK_HASH
		TIME_STAMP
		MINER
		GAS_LIMIT
		GAS_USED
		TRANSACTION_COUNT
		# BASE_FEE_PER_GAS
		REWARD
		SIZE_
	}
`)

export const EthereumBlockDetails = graphql(`
	fragment EthereumBlockDetails on ETHEREUM_BLOCK_DETAILS @_unmask {
		BLOCK_NUMBER
		LOGS_BLOOM
		RECEIPTS_ROOT
		SHA3_UNCLES
		STATE_ROOT
		TIME_STAMP
		TRANSACTIONS_ROOT
		UNCLES_COUNT
	}
`)

export const EthereumTransaction = graphql(`
	fragment EthereumTransaction on ETHEREUM_TRANSACTIONS @_unmask {
		BLOCK_NUMBER
		FROM_ADDRESS
		TO_ADDRESS
		VALUE_
		GAS
		TRANSACTION_HASH
		TIME_STAMP
		TRANSACTION_FEE
		RECEIPT_STATUS
	}
`)

export const EthereumTransactionDetails = graphql(`
	fragment EthereumTransactionDetails on ETHEREUM_TRANSACTION_DETAILS @_unmask {
		BLOCK_NUMBER
		TRANSACTION_HASH
		TRANSACTION_INDEX
		CHAIN_ID
		FUNCTION_NAME
		METHOD_ID
		TIME_STAMP
		GAS_PRICE
		MAX_FEE_PER_GAS
		MAX_PRIORITY_FEE_PER_GAS
		LOGS_COUNT
	}
`)
