import type { PartialExceptOneOf } from '../typescript/PartialExceptOneOf'
import type { Actor } from './actor'
import type { Address, Hash } from './scalars'
import type { ChainId } from './network'
import type { Timestamp, BlockNumber, TokenAmount, UsdAmount, Percentage, BasisPoints } from './types'

// Transaction types based on EIP standards
export enum TransactionType {
	Legacy = 'Legacy', // Pre-EIP-2718 transactions
	AccessList = 'AccessList', // EIP-2930 with access list
	DynamicFee = 'DynamicFee', // EIP-1559 dynamic fee
	BlobCarrying = 'BlobCarrying', // EIP-4844 blob transactions
	Deposit = 'Deposit', // L2 deposit transactions
	Withdrawal = 'Withdrawal', // L2 withdrawal transactions
	Internal = 'Internal', // Internal contract calls
	System = 'System' // System-level transactions
}

export enum TransactionStatus {
	Pending = 'Pending', // In mempool
	Included = 'Included', // Included in block
	Confirmed = 'Confirmed', // Block confirmed
	Failed = 'Failed', // Transaction failed
	Dropped = 'Dropped', // Dropped from mempool
	Replaced = 'Replaced' // Replaced by higher fee tx
}

export enum TransactionCategory {
	Transfer = 'Transfer', // Simple value transfer
	ContractCall = 'ContractCall', // Contract interaction
	ContractCreation = 'ContractCreation', // Contract deployment
	TokenTransfer = 'TokenTransfer', // ERC token transfer
	Defi = 'Defi', // DeFi protocol interaction
	Nft = 'Nft', // NFT transaction
	Gaming = 'Gaming', // Gaming transaction
	Dao = 'Dao', // DAO governance
	Bridge = 'Bridge', // Cross-chain bridge
	Mev = 'Mev' // MEV extraction
}

// Generic transaction type with type-specific fields
export type Transaction<_TransactionType extends TransactionType = TransactionType> = (
	& {
		// Transaction identification
		transactionId: string
		hash: Hash
		chainId: ChainId
		type: _TransactionType
		status: TransactionStatus
		category: TransactionCategory
		
		// Position in blockchain
		blockNumber?: BlockNumber
		transactionIndex?: number
		
		// Timing
		timestamp: Timestamp
		submittedAt?: Timestamp
		confirmedAt?: Timestamp
		
		// Transaction parties
		from: Address
		to?: Address
		
		// Value and gas
		value: TokenAmount
		valueFormatted: string
		nonce: number
		gasLimit: TokenAmount
		gasUsed?: TokenAmount
		gasPrice?: TokenAmount
		gasFee?: TokenAmount
		gasEfficiency?: Percentage
		
		// Transaction data
		input?: string
		output?: string
		
		// Execution result
		isSuccess: boolean
		error?: string
		revertReason?: string
		
		// Transaction metadata
		size: number // bytes
		weight?: number
		priority?: number
		isReplacement?: boolean
		
		// Network context
		networkFee?: TokenAmount
		priorityFee?: TokenAmount
		tip?: TokenAmount
		
		// Analysis metadata
		complexity?: 'low' | 'medium' | 'high' | 'extreme'
		riskLevel?: 'low' | 'medium' | 'high' | 'critical'
		confidenceScore?: Percentage
	}

	& (
		_TransactionType extends TransactionType.Legacy ?
			{
				// Legacy transaction data (pre-EIP-2718)
				legacyData: {
					gasPrice: TokenAmount
					
					// Legacy context
					v: string
					r: Hash
					s: Hash
					
					// Transaction signing
					publicKey?: string
					signature: string
					
					// Legacy analysis
					isLegacyFormat: true
					upgradeRecommended?: boolean
				}
			}

		: _TransactionType extends TransactionType.AccessList ?
			{
				// EIP-2930 access list transaction data
				accessListData: {
					gasPrice: TokenAmount
					accessList: Array<{
						address: Address
						storageKeys: Hash[]
					}>
					
					// Access list optimization
					accessListSize: number
					gasOptimization: TokenAmount
					gasSavings: TokenAmount
					
					// Storage context
					warmStorageAccesses: number
					coldStorageAccesses: number
					
					// EIP-2930 specific
					chainId: ChainId
					yParity: number
					signatureR: Hash
					signatureS: Hash
				}
			}

		: _TransactionType extends TransactionType.DynamicFee ?
			{
				// EIP-1559 dynamic fee transaction data
				dynamicFeeData: {
					maxFeePerGas: TokenAmount
					maxPriorityFeePerGas: TokenAmount
					baseFeePerGas?: TokenAmount
					
					// Fee optimization
					effectiveGasPrice: TokenAmount
					feeSavings?: TokenAmount
					feeEfficiency: Percentage
					
					// Priority context
					priorityLevel: 'low' | 'standard' | 'high' | 'urgent'
					inclusionProbability: Percentage
					estimatedWaitTime?: number
					
					// EIP-1559 specific
					accessList?: Array<{
						address: Address
						storageKeys: Hash[]
					}>
					
					// Fee burning (EIP-1559)
					burntFee?: TokenAmount
					tipToMiner?: TokenAmount
				}
			}

		: _TransactionType extends TransactionType.BlobCarrying ?
			{
				// EIP-4844 blob transaction data
				blobData: {
					maxFeePerGas: TokenAmount
					maxPriorityFeePerGas: TokenAmount
					maxFeePerBlobGas: TokenAmount
					blobVersionedHashes: Hash[]
					
					// Blob context
					blobCount: number
					totalBlobSize: number
					blobGasUsed?: number
					blobFee?: TokenAmount
					
					// Blob optimization
					compressionRatio?: Percentage
					dataEfficiency: Percentage
					
					// L2 rollup context
					rollupUsage?: {
						rollupChain: ChainId
						batchId?: string
						transactionCount?: number
						stateRoot?: Hash
					}
				}
			}

		: _TransactionType extends TransactionType.Deposit ?
			{
				// L2 deposit transaction data
				depositData: {
					l1TransactionHash?: Hash
					l1BlockNumber?: BlockNumber
					depositAmount: TokenAmount
					
					// Deposit context
					l1Token?: Address
					l2Token?: Address
					depositIndex?: number
					
					// Bridge details
					bridgeContract: Address
					bridgeType: 'native' | 'canonical' | 'third-party'
					
					// Processing details
					processingTime?: number
					confirmationBlocks?: number
					
					// Fees
					l1Fee?: TokenAmount
					bridgeFee?: TokenAmount
					totalDepositCost: TokenAmount
				}
			}

		: _TransactionType extends TransactionType.Withdrawal ?
			{
				// L2 withdrawal transaction data
				withdrawalData: {
					l2TransactionHash?: Hash
					l1ClaimHash?: Hash
					withdrawalAmount: TokenAmount
					
					// Withdrawal context
					l2Token?: Address
					l1Token?: Address
					withdrawalIndex?: number
					
					// Challenge period
					challengePeriodEnd?: Timestamp
					isChallengeable: boolean
					finalizedAt?: Timestamp
					
					// Withdrawal status
					withdrawalStatus: 'initiated' | 'proven' | 'finalized' | 'claimed'
					
					// Proofs
					withdrawalProof?: Hash[]
					stateRoot?: Hash
					
					// Fees
					l2Fee?: TokenAmount
					l1ClaimFee?: TokenAmount
					totalWithdrawalCost: TokenAmount
				}
			}

		: _TransactionType extends TransactionType.Internal ?
			{
				// Internal transaction data (from traces)
				internalData: {
					parentTransaction: Hash
					traceAddress: number[]
					callType: 'call' | 'delegatecall' | 'staticcall' | 'callcode'
					
					// Call context
					depth: number
					isError: boolean
					gasUsed: TokenAmount
					
					// Function details
					functionSelector?: Hash
					functionName?: string
					decodedInput?: Record<string, any>
					decodedOutput?: Record<string, any>
					
					// Internal execution
					subCalls?: number
					stateChanges?: number
					eventCount?: number
				}
			}

		: _TransactionType extends TransactionType.System ?
			{
				// System transaction data
				systemData: {
					systemType: 'genesis' | 'coinbase' | 'withdrawal' | 'deposit' | 'burn'
					authority?: Address
					
					// System context
					isAutomated: boolean
					systemFunction: string
					protocolVersion?: string
					
					// System parameters
					systemParameters?: Record<string, any>
					
					// Consensus context
					epoch?: number
					slot?: number
					validatorIndex?: number
					
					// Economic impact
					inflationImpact?: TokenAmount
					supplyChange?: TokenAmount
				}
			}

		:
			{}
	)

	& {
		// --
		// Entity References (using PartialExceptOneOf)
		block?: PartialExceptOneOf<import('./block').Block,
			| 'number'
			| 'hash'
			| 'timestamp'
		>
		
		// Transaction actors
		fromActor?: PartialExceptOneOf<Actor,
			| 'address'
			| 'type'
		>
		
		toActor?: PartialExceptOneOf<Actor,
			| 'address'
			| 'type'
		>
		
		// For contract interactions
		targetContract?: PartialExceptOneOf<import('./contract').Contract,
			| 'address'
			| 'standard'
			| 'metadata'
		>
		
		// For contract creation
		createdContract?: PartialExceptOneOf<import('./contract').Contract,
			| 'address'
			| 'standard'
			| 'deploymentTimestamp'
		>
		
		// Related transactions
		relatedTransactions?: PartialExceptOneOf<Transaction,
			| 'transactionId'
			| 'type'
			| 'timestamp'
		>[]
		
		// Replacement transactions
		replacedBy?: PartialExceptOneOf<Transaction,
			| 'transactionId'
			| 'gasPrice'
			| 'timestamp'
		>
		
		// Parent transaction (for internal transactions)
		parentTransaction?: PartialExceptOneOf<Transaction,
			| 'transactionId'
			| 'type'
			| 'status'
		>
		
		// Associated events
		events?: PartialExceptOneOf<import('./event').Event,
			| 'id'
			| 'category'
			| 'timestamp'
		>[]
		
		// Associated transfers
		transfers?: PartialExceptOneOf<import('./transfer').Transfer,
			| 'id'
			| 'category'
			| 'timestamp'
		>[]
		
		// Associated traces
		traces?: PartialExceptOneOf<import('./trace').Trace,
			| 'id'
			| 'type'
			| 'timestamp'
		>[]
		
		// For blob transactions
		blobs?: PartialExceptOneOf<import('./blob').Blob,
			| 'id'
			| 'blobHash'
			| 'size'
		>[]
		
		// For bridge transactions
		bridgeContract?: PartialExceptOneOf<import('./contract').Contract,
			| 'address'
			| 'standard'
		>
		
		// Cross-chain context
		l1Transaction?: PartialExceptOneOf<Transaction,
			| 'transactionId'
			| 'chainId'
			| 'timestamp'
		>
		
		l2Transaction?: PartialExceptOneOf<Transaction,
			| 'transactionId'
			| 'chainId'
			| 'timestamp'
		>
	}
)

export type AnyTransaction = Transaction<TransactionType> 