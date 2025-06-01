import type { PartialExceptOneOf } from '../typescript/PartialExceptOneOf'
import type { Actor } from './actor'
import type { BlockNumber } from './block'
import type { ChainId } from './network'
import type { Address, BasisPoints, Hash, Percentage, Timestamp, TokenAmount, UsdAmount } from './scalars'

export type TransactionId = Hash

// Transaction format types based on EIP standards (mutually exclusive)
export enum TransactionFormat {
	Type0Legacy = 'Type0Legacy', // Pre-EIP-2718 legacy transactions
	Type1AccessList = 'Type1AccessList', // EIP-2930 access list transactions
	Type2DynamicFee = 'Type2DynamicFee', // EIP-1559 dynamic fee transactions
	Type3Blob = 'Type3Blob', // EIP-4844 blob transactions
	Type4Eoa = 'Type4Eoa' // EIP-3074 authorized transactions (proposed)
}

// L2 operation types (mutually exclusive)
export enum L2OperationType {
	Deposit = 'Deposit', // L2 deposit transactions
	Withdrawal = 'Withdrawal', // L2 withdrawal transactions
	System = 'System' // L2 system transactions
}

// Execution context (mutually exclusive)
export enum ExecutionContext {
	OnChain = 'OnChain', // Regular on-chain transaction
	Internal = 'Internal' // Internal contract call (from traces)
}

// Transaction tags (can have multiple, use as flags or array)
export enum TransactionTag {
	Transfer = 'Transfer', // Simple value transfer
	ContractCall = 'ContractCall', // Contract interaction
	ContractCreation = 'ContractCreation', // Contract deployment
	TokenTransfer = 'TokenTransfer', // ERC token transfer
	Bridge = 'Bridge', // Cross-chain bridge operation
	L2Operation = 'L2Operation' // L2 specific operation
}

export enum TransactionStatus {
	Pending = 'Pending', // In mempool
	Included = 'Included', // Included in block
	Confirmed = 'Confirmed', // Block confirmed
	Finalized = 'Finalized', // Block finalized
	Failed = 'Failed', // Transaction failed
	Dropped = 'Dropped', // Dropped from mempool
	Replaced = 'Replaced', // Replaced by higher fee tx
	Cancelled = 'Cancelled' // Explicitly cancelled
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
	Mev = 'Mev', // MEV extraction
	Staking = 'Staking', // Staking operations
	L2Operations = 'L2Operations' // L2 specific operations
}

// Generic transaction type with format and tag-specific fields
export type Transaction = {
	// Transaction identification
	id: TransactionId
	chainId: ChainId

	// Transaction classification
	format: TransactionFormat
	status: TransactionStatus
	categories: TransactionCategory[]
	tags: TransactionTag[]
	executionContext: ExecutionContext

	// L2 operation type (only if tags includes L2Operation)
	l2OperationType?: L2OperationType

	// Position in blockchain
	blockNumber?: BlockNumber
	transactionIndex?: number

	// Timing
	timestamp: Timestamp
	submittedAt?: Timestamp
	confirmedAt?: Timestamp

	// Value and gas
	value: TokenAmount
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
	_ip?: TokenAmount

	// Entity references
	_block?: {
		blockHash: Hash
	}

	// Transaction actors
	_from?: {
		address: Address
	}

	_to?: {
		address: Address
	}

	// Related transactions
	_relatedTransactions?: TransactionId[]

	// Replacement transactions
	_replacedBy?: TransactionId

	// Parent transaction (for internal transactions)
	_parentTransaction?: TransactionId

	// Associated events
	_events?: {
		id: string
	}[]

	// Associated transfers
	_transfers?: {
		id: string
	}[]

	// Associated traces
	_traces?: {
		id: string
	}[]

	// For blob transactions
	_blobs?: {
		id: string
	}[]

	// Optional format-specific data
	legacyData?: {
		gasPrice: TokenAmount
		v: string
		r: Hash
		s: Hash
		protected: boolean
		preEip155: boolean
		replayProtected: boolean
	}

	accessListData?: {
		gasPrice: TokenAmount
		accessList: {
			address: Address
			storageKeys: Hash[]
		}[]
		accessListLength: number
		totalStorageKeys: number
		estimatedGasSavings: TokenAmount
		warmAddresses: number
		coldAddresses: number
		warmStorageSlots: number
		coldStorageSlots: number
		yParity: number
		r: Hash
		s: Hash
		isOptimal: boolean
		suggestedOptimizations?: string[]
	}

	dynamicFeeData?: {
		maxFeePerGas: TokenAmount
		maxPriorityFeePerGas: TokenAmount
		baseFeePerGas: TokenAmount
		effectiveGasPrice: TokenAmount
		priorityFeePerGas: TokenAmount
		baseFeeUsage: Percentage
		priorityFeeUsage: Percentage
		totalFeeSavings: TokenAmount
		inclusionProbability: Percentage
		estimatedWaitTime: number
		accessList?: {
			address: Address
			storageKeys: Hash[]
		}[]
		yParity: number
		r: Hash
		s: Hash
		baseFeeAmount: TokenAmount
		priorityTipAmount: TokenAmount
		burntFee: TokenAmount
	}

	blobData?: {
		maxFeePerGas: TokenAmount
		maxPriorityFeePerGas: TokenAmount
		baseFeePerGas: TokenAmount
		effectiveGasPrice: TokenAmount
		maxFeePerBlobGas: TokenAmount
		blobBaseFee: TokenAmount
		blobGasUsed: number
		blobFeePerGas: TokenAmount
		blobVersionedHashes: Hash[]
		blobCount: number
		totalBlobFee: TokenAmount
		blobFeeSavings: TokenAmount
		totalBlobSize: number
		dataCompressionRatio: Percentage
		costPerKB: TokenAmount
		sidecarAvailable: boolean
		sidecarSize?: number
		rollupUsage?: {
			rollupChain: ChainId
			batchId: string
			l2TransactionCount: number
			stateRoot: Hash
			l2BlockRange: {
				from: BlockNumber
				to: BlockNumber
			}
		}
		yParity: number
		r: Hash
		s: Hash
		accessList?: {
			address: Address
			storageKeys: Hash[]
		}[]
	}

	eoaData?: {
		maxFeePerGas: TokenAmount
		maxPriorityFeePerGas: TokenAmount
		baseFeePerGas: TokenAmount
		authorizationList: {
			chainId: ChainId
			address: Address
			nonce: number
			yParity: number
			r: Hash
			s: Hash
		}[]
		invoker: Address
		accessList?: {
			address: Address
			storageKeys: Hash[]
		}[]
		yParity: number
		r: Hash
		s: Hash
	}

	// Optional tag-specific data
	_createdContract?: PartialExceptOneOf<import('./contract').Contract,
		| 'address'
	>

	contractCreationData?: {
		constructorArgs?: string
		initCode?: string
		deploymentCost?: TokenAmount
		contractSize?: number
		isProxy?: boolean
		implementationAddress?: Address
	}

	_bridgeContract?: PartialExceptOneOf<import('./contract').Contract,
		| 'address'
	>

	_l1Transaction?: TransactionId
	_l2Transaction?: TransactionId

	bridgeData?: {
		sourceChain: ChainId
		destinationChain: ChainId
		bridgeProtocol: string
		bridgeFee?: TokenAmount
		estimatedTime?: number
	}

	_targetContract?: PartialExceptOneOf<import('./contract').Contract,
		| 'address'
	>

	contractCallData?: {
		functionSelector?: Hash
		functionName?: string
		decodedInput?: Record<string, any>
		decodedOutput?: Record<string, any>
		isDelegate?: boolean
		isStatic?: boolean
	}

	// L2 operation data
	l2OperationData?: {
		depositData?: {
			l1OriginTransaction: Hash
			l1OriginBlock: BlockNumber
			l1Sender: Address
			mintValue: TokenAmount
			gasLimit: TokenAmount
			opaqueData?: string
			sourceHash: Hash
			l2DepositTxHash?: Hash
			processed: boolean
			l1DataFee?: TokenAmount
			l2ExecutionFee?: TokenAmount
		}

		withdrawalData?: {
			withdrawalAmount: TokenAmount
			l1Target: Address
			l2Sender: Address
			withdrawalHash: Hash
			messageNonce: number
			outputRootProof?: {
				version: Hash
				stateRoot: Hash
				messagePasserStorageRoot: Hash
				latestBlockhash: Hash
			}
			withdrawalProof?: Hash[]
			withdrawalStatus: 'initiated' | 'proven' | 'finalized' | 'relayed'
			challengePeriodEnd?: Timestamp
			l1ClaimTransaction?: Hash
			l1FinalizeTransaction?: Hash
			l1RelayFee?: TokenAmount
			provingFee?: TokenAmount
		}

		systemData?: {
			systemType: 'l1-attributes' | 'user-deposit' | 'fee-vault' | 'upgrade'
			l1Attributes?: {
				l1BlockNumber: BlockNumber
				l1BlockHash: Hash
				l1Timestamp: Timestamp
				l1BaseFee: TokenAmount
				l1BlobBaseFee?: TokenAmount
				sequenceNumber: number
				batcherHash: Hash
			}
			upgradeData?: {
				upgradeType: 'implementation' | 'config' | 'hardfork'
				version: string
				activationBlock: BlockNumber
			}
			feeVaultData?: {
				vaultType: 'sequencer' | 'l1' | 'base'
				withdrawalAmount: TokenAmount
				recipientAddress: Address
			}
		}
	}
}

// Helper types for common transaction patterns
export type EthereumTransaction = Transaction & { format: TransactionFormat.Type0Legacy | TransactionFormat.Type1AccessList | TransactionFormat.Type2DynamicFee }
export type BlobTransaction = Transaction & { format: TransactionFormat.Type3Blob }
export type L2DepositTransaction = Transaction & { l2OperationType: L2OperationType.Deposit }
export type InternalTransaction = Transaction & { executionContext: ExecutionContext.Internal }
export type ContractCreationTransaction = Transaction & { tags: [TransactionTag.ContractCreation] }
export type BridgeTransaction = Transaction & { tags: [TransactionTag.Bridge] }

// Examples of valid transaction combinations:
// ✅ Type2DynamicFee + ContractCreation tag
// ✅ Type3Blob + L2Operation tag + L2OperationType.Deposit
// ✅ Type1AccessList + Bridge tag
// ✅ Type0Legacy + Transfer tag + Internal execution context

// Invalid combinations are now prevented by the type system:
// ❌ Multiple transaction formats (Type0Legacy AND Type2DynamicFee)
// ❌ Multiple execution contexts (OnChain AND Internal)
// ❌ Multiple L2 operations (Deposit AND Withdrawal)