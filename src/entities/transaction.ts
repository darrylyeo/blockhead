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
export type Transaction<
	_TransactionFormat extends TransactionFormat = TransactionFormat,
	_TransactionTag extends TransactionTag = TransactionTag
> = {
	// Transaction identification
	id: TransactionId
	chainId: ChainId

	// Transaction classification
	format: _TransactionFormat
	status: TransactionStatus
	categories: TransactionCategory[]
	tags: _TransactionTag[]
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
	_block?: PartialExceptOneOf<import('./block').Block,
		| 'blockHash'
	_

	// Transaction actors
	_from?: PartialExceptOneOf<Actor,
	_| 'address'
	>

	_to?: PartialExceptOneOf<Actor,
		| 'address'
	_

	// Related transactions
	_relatedTransactions?: PartialExceptOneOf<import('./transaction').Transaction,
		| 'id'
	>[]
_
	// Replacement transactions
	_replacedBy?: PartialExceptOneOf<import('./transaction').Transaction,
	_| 'id'
	>

	// Parent transaction (for internal transactions)
	_parentTransaction?: PartialExceptOneOf<import('./transaction').Transaction,
	_| 'id'
	>

	// Associated events
	_events?: PartialExceptOneOf<import('./event').Event,
	_| 'id'
	>[]

	// Associated transfers
	_transfers?: PartialExceptOneOf<import('./transfer').Transfer,
	_| 'id'
	>[]

	// Associated traces
	_traces?: PartialExceptOneOf<import('./trace').Trace,
		| 'id'
	>[]

	// For blob transactions
	_blobs?: PartialExceptOneOf<import('./blob').Blob,
		| 'id'
	>[]
}
& {
	// Internal transaction data (present when executionContext is 'Internal')
	internalData?: {
		parentTransactionHash: Hash
		traceAddress: number[]
		callType: 'call' | 'delegatecall' | 'staticcall' | 'callcode' | 'create' | 'create2'

		// Call context
		depth: number
		gasLimit: TokenAmount
		gasUsed: TokenAmount

		// Call data
		input: string
		output: string

		// Execution result
		success: boolean
		error?: string
		revertReason?: string

		// Function details
		functionSelector: Hash
		functionName?: string
		decodedInput?: Record<string, any>
		decodedOutput?: Record<string, any>

		// State changes
		stateChanges: {
			address: Address
			slot: Hash
			before: Hash
			after: Hash
		}[]

		// Sub-calls
		subcallCount: number
		maxDepthReached: number
	}
}
& (
	// L2 operation conditional fields
	_TransactionTag extends TransactionTag.L2Operation ?
		{
			// L2 operation type (required when L2Operation tag is present)
			l2OperationType: L2OperationType

			// L2 operation data based on operation type
			l2OperationData: (
				L2OperationType extends 'Deposit' ?
					{
						// L2 deposit transaction data
						depositData: {
							// L1 context
							l1OriginTransaction: Hash
							l1OriginBlock: BlockNumber
							l1Sender: Address

							// Deposit details
							mintValue: TokenAmount // ETH minted on L2
							gasLimit: TokenAmount

							// Optimism specific
							opaqueData?: string // Additional data

							// Deposit source
							sourceHash: Hash // Unique identifier for deposit

							// Processing
							l2DepositTxHash?: Hash
							processed: boolean

							// Fees
							l1DataFee?: TokenAmount
							l2ExecutionFee?: TokenAmount
						}
					}

				: L2OperationType extends 'Withdrawal' ?
					{
						// L2 withdrawal transaction data
						withdrawalData: {
							// Withdrawal details
							withdrawalAmount: TokenAmount
							l1Target: Address
							l2Sender: Address

							// Withdrawal proof
							withdrawalHash: Hash
							messageNonce: number

							// Proof data
							outputRootProof?: {
								version: Hash
								stateRoot: Hash
								messagePasserStorageRoot: Hash
								latestBlockhash: Hash
							}

							withdrawalProof?: Hash[]

							// Status tracking
							withdrawalStatus: 'initiated' | 'proven' | 'finalized' | 'relayed'
							challengePeriodEnd?: Timestamp

	_					// Cross-chain context
							l1ClaimTransaction?: Hash
							l1FinalizeTransaction?: Hash

							// Fees
							l1RelayFee?: TokenAmount
							provingFee?: TokenAmount
						}
					}

				: L2OperationType extends 'System' ?
					{
						// L2 system transaction data
	_				systemData: {
							systemType: 'l1-attributes' | 'user-deposit' | 'fee-vault' | 'upgrade'

							// L1 attributes deposit (block info from L1)
	_					l1Attributes?: {
	_						l1BlockNumber: BlockNumber
								l1BlockHash: Hash
								l1Timestamp: Timestamp
								l1BaseFee: TokenAmount
								l1BlobBaseFee?: TokenAmount
								sequenceNumber: number
								batcherHash: Hash
							}

							// System upgrade
	_					upgradeData?: {
								upgradeType: 'implementation' | 'config' | 'hardfork'
								version: string
								activationBlock: BlockNumber
							}

							// Fee vault operations
							feeVaultData?: {
								vaultType: 'sequencer' | 'l1' | 'base'
								withdrawalAmount: TokenAmount
								recipientAddress: Address
							}
						}
					}

				:
					never
			)
		}
	: {}
)
& (
	_TransactionFormat extends TransactionFormat.Type0Legacy ?
		{
			// Legacy transaction data (Type 0)
			legacyData: {
				gasPrice: TokenAmount

				// Legacy signature (pre-EIP-155)
				v: string // Recovery ID
				r: Hash // Signature r value
				s: Hash // Signature s value

				// Chain protection (EIP-155)
				protected: boolean // Whether EIP-155 protection is used

				// Legacy analysis
				preEip155: boolean // Whether this is a pre-EIP-155 transaction
				replayProtected: boolean // Whether replay protection is active
			}
		}

	: _TransactionFormat extends TransactionFormat.Type1AccessList ?
		{
			// EIP-2930 access list transaction data (Type 1)
			accessListData: {
				gasPrice: TokenAmount
				accessList: {
					address: Address
					storageKeys: Hash[]
				}[]

				// Access list optimization metrics
				accessListLength: number
				totalStorageKeys: number
				estimatedGasSavings: TokenAmount

				// Warm/cold access tracking
				warmAddresses: number
				coldAddresses: number
				warmStorageSlots: number
				coldStorageSlots: number

				// EIP-2930 signature
				yParity: number // 0 or 1
				r: Hash
				s: Hash

				// Optimization analysis
				isOptimal: boolean
				suggestedOptimizations?: string[]
			}
		}

	: _TransactionFormat extends TransactionFormat.Type2DynamicFee ?
		{
			// EIP-1559 dynamic fee transaction data (Type 2)
			dynamicFeeData: {
				maxFeePerGas: TokenAmount
				maxPriorityFeePerGas: TokenAmount
				baseFeePerGas: TokenAmount // From block

				// Fee calculation
				effectiveGasPrice: TokenAmount // min(maxFeePerGas, baseFeePerGas + maxPriorityFeePerGas)
				priorityFeePerGas: TokenAmount // min(maxPriorityFeePerGas, maxFeePerGas - baseFeePerGas)

				// Fee metrics
				baseFeeUsage: Percentage // baseFeePerGas / maxFeePerGas
				priorityFeeUsage: Percentage // priorityFeePerGas / maxPriorityFeePerGas
				totalFeeSavings: TokenAmount // (maxFeePerGas - effectiveGasPrice) * gasUsed

				// Inclusion metrics
				inclusionProbability: Percentage
				estimatedWaitTime: number // seconds

				// Access list (optional for Type 2)
				accessList?: {
					address: Address
					storageKeys: Hash[]
				}[]

				// EIP-1559 signature
				yParity: number
				r: Hash
				s: Hash

				// Fee burning (London hard fork)
				baseFeeAmount: TokenAmount // baseFeePerGas * gasUsed
				priorityTipAmount: TokenAmount // priorityFeePerGas * gasUsed
				burntFee: TokenAmount // Same as baseFeeAmount
			}
		}

	: _TransactionFormat extends TransactionFormat.Type3Blob ?
		{
			// EIP-4844 blob transaction data (Type 3)
			blobData: {
				// Gas fees (inherits from Type 2)
				maxFeePerGas: TokenAmount
				maxPriorityFeePerGas: TokenAmount
				baseFeePerGas: TokenAmount
				effectiveGasPrice: TokenAmount

				// Blob-specific fees
				maxFeePerBlobGas: TokenAmount
				blobBaseFee: TokenAmount // From block
				blobGasUsed: number // Always 2^17 (131,072) per blob
				blobFeePerGas: TokenAmount // min(maxFeePerBlobGas, blobBaseFee)

				// Blob data
				blobVersionedHashes: Hash[] // KZG commitments
				blobCount: number // Length of blobVersionedHashes

				// Blob cost calculation
				totalBlobFee: TokenAmount // blobFeePerGas * blobGasUsed * blobCount
				blobFeeSavings: TokenAmount // (maxFeePerBlobGas - blobFeePerGas) * blobGasUsed * blobCount

				// Data efficiency
				totalBlobSize: number // bytes (each blob is 128KB)
				dataCompressionRatio: Percentage
				costPerKB: TokenAmount

				// Sidecar data (not on-chain)
				sidecarAvailable: boolean
				sidecarSize?: number

				// L2 rollup context
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

				// EIP-4844 signature (same as Type 2)
				yParity: number
				r: Hash
				s: Hash

				// Access list (optional)
				accessList?: {
					address: Address
					storageKeys: Hash[]
				}[]
			}
		}

	: _TransactionFormat extends TransactionFormat.Type4Eoa ?
		{
			// EIP-3074 authorized transaction data (Type 4) - Proposed
			eoaData: {
				// Inherits fee structure from Type 2
				maxFeePerGas: TokenAmount
				maxPriorityFeePerGas: TokenAmount
				baseFeePerGas: TokenAmount

				// Authorization
				authorizationList: {
					chainId: ChainId
					address: Address // EOA address
					nonce: number
					yParity: number
					r: Hash
					s: Hash
				}[]

				// Invoker context
				invoker: Address // Contract that executes on behalf of EOA

				// Access list
				accessList?: {
					address: Address
					storageKeys: Hash[]
				}[]

				// Signature
				yParity: number
				r: Hash
				s: Hash
			}
		}

	:
		{}
)
& (
	// Tag-specific conditional fields
	_TransactionTag extends TransactionTag.ContractCreation ?
		{
			// For contract creation
			_createdContract?: PartialExceptOneOf<import('./contract').Contract,
				| 'address'
			>

			// Contract creation specific data
			contractCreationData?: {
				constructorArgs?: string
				initCode?: string
				deploymentCost?: TokenAmount
				contractSize?: number
				isProxy?: boolean
				implementationAddress?: Address
			}
		}
	: {}
)
& (
	_TransactionTag extends TransactionTag.Bridge ?
		{
			// For bridge transactions
			_bridgeContract?: PartialExceptOneOf<import('./contract').Contract,
				| 'address'
			>

			// Cross-chain context
			_l1Transaction?: PartialExceptOneOf<import('./transaction').Transaction,
				| 'id'
			>

			_l2Transaction?: PartialExceptOneOf<import('./transaction').Transaction,
				| 'id'
			>

			// Bridge specific data
			bridgeData?: {
				sourceChain: ChainId
				destinationChain: ChainId
				bridgeProtocol: string
				bridgeFee?: TokenAmount
				estimatedTime?: number
			}
		}
	: {}
)
& (
	_TransactionTag extends TransactionTag.ContractCall ?
		{
			// For contract interactions
			_targetContract?: PartialExceptOneOf<import('./contract').Contract,
				| 'address'
			>

			// Contract call specific data
			contractCallData?: {
				functionSelector?: Hash
				functionName?: string
				decodedInput?: Record<string, any>
				decodedOutput?: Record<string, any>
				isDelegate?: boolean
				isStatic?: boolean
			}
		}
	: {}
)

// Helper types for common transaction patterns
export type EthereumTransaction = Transaction<TransactionFormat.Type0Legacy | TransactionFormat.Type1AccessList | TransactionFormat.Type2DynamicFee>
export type BlobTransaction = Transaction<TransactionFormat.Type3Blob>
export type L2DepositTransaction = Transaction<TransactionFormat, TransactionTag.L2Operation> & { l2OperationType: L2OperationType.Deposit }
export type InternalTransaction = Transaction & { executionContext: ExecutionContext.Internal }
export type ContractCreationTransaction = Transaction<TransactionFormat, TransactionTag.ContractCreation>
export type BridgeTransaction = Transaction<TransactionFormat, TransactionTag.Bridge>

// Examples of valid transaction combinations:
// ✅ Type2DynamicFee + ContractCreation tag
// ✅ Type3Blob + L2Operation tag + L2OperationType.Deposit
// ✅ Type1AccessList + Bridge tag
// ✅ Type0Legacy + Transfer tag + Internal execution context

// Invalid combinations are now prevented by the type system:
// ❌ Multiple transaction formats (Type0Legacy AND Type2DynamicFee)
// ❌ Multiple execution contexts (OnChain AND Internal)
// ❌ Multiple L2 operations (Deposit AND Withdrawal)