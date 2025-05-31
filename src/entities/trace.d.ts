import type { PartialExceptOneOf } from '../typescript/PartialExceptOneOf'
import type { Actor } from './actor'
import type { Address, Hash } from './scalars'
import type { ChainId } from './network'
import type { Timestamp, BlockNumber, TokenAmount, UsdAmount, Percentage, BasisPoints } from './types'

// Trace types based on EVM execution
export enum TraceType {
	Call = 'Call', // Regular function call
	Create = 'Create', // Contract creation
	Create2 = 'Create2', // Deterministic contract creation
	SelfDestruct = 'SelfDestruct', // Contract self-destruction
	Reward = 'Reward', // Block/uncle reward
	Genesis = 'Genesis' // Genesis allocation
}

export enum CallType {
	Call = 'Call', // CALL opcode
	CallCode = 'CallCode', // CALLCODE opcode
	DelegateCall = 'DelegateCall', // DELEGATECALL opcode
	StaticCall = 'StaticCall' // STATICCALL opcode
}

export enum RewardType {
	Block = 'Block', // Block mining reward
	Uncle = 'Uncle', // Uncle block reward
	External = 'External' // External reward (e.g., MEV)
}

// Generic trace type with type-specific fields
export type Trace<_T extends TraceType = TraceType> = (
	& {
		// Trace identification
		id: string
		chainId: ChainId
		type: _T
		
		// Position in execution
		blockNumber: BlockNumber
		transactionIndex: number
		traceAddress: number[]
		subtraces: number
		
		// Timing
		timestamp: Timestamp
		
		// Basic execution context
		gasLimit?: TokenAmount
		gasUsed?: TokenAmount
		gasPrice?: TokenAmount
		gasCost?: TokenAmount
		
		// Execution result
		isSuccess: boolean
		error?: string
		revertReason?: string
		
		// EVM context
		depth: number
		pcCounter?: number
		opcode?: string
		
		// Input/output data
		input?: string
		output?: string
		
		// State changes
		balanceChanges?: Array<{
			address: Address
			before: TokenAmount
			after: TokenAmount
			delta: TokenAmount
		}>
		
		storageChanges?: Array<{
			address: Address
			slot: Hash
			before: Hash
			after: Hash
		}>
		
		// Code changes
		codeChanges?: Array<{
			address: Address
			before?: Hash
			after?: Hash
		}>
	}

	& (
		_T extends TraceType.Call ?
			{
				// Call trace specific data
				callData: {
					callType: CallType
					from: Address
					to: Address
					value: TokenAmount
					valueFormatted: string
					
					// Function identification
					methodSignature?: Hash
					methodName?: string
					functionSelector?: Hash
					
					// ABI decoding
					decodedInput?: {
						method: string
						params: Record<string, any>
					}
					
					decodedOutput?: {
						returns: Record<string, any>
					}
					
					// Call context
					isPrecompile: boolean
					isLibraryCall: boolean
					isDelegateChain: boolean
				}
			}

		: _T extends TraceType.Create | TraceType.Create2 ?
			{
				// Contract creation trace data
				createData: {
					creator: Address
					createdContract?: Address
					value: TokenAmount
					valueFormatted: string
					
					// Creation details
					initCode: string
					deployedBytecode?: string
					salt?: Hash // For CREATE2
					
					// Constructor details
					constructorArgs?: string
					decodedConstructorArgs?: Record<string, any>
					
					// Contract metadata
					contractSize?: number
					isProxy?: boolean
					implementationAddress?: Address
					
					// Creation cost
					creationGasCost: TokenAmount
					deploymentCost: TokenAmount
				}
			}

		: _T extends TraceType.SelfDestruct ?
			{
				// Self-destruct trace data
				selfDestructData: {
					contract: Address
					refundAddress: Address
					balance: TokenAmount
					balanceFormatted: string
					
					// Self-destruct context
					initiator: Address
					reason?: string
					
					// Impact analysis
					affectedContracts?: Address[]
					storageCleared: boolean
					codeRemoved: boolean
				}
			}

		: _T extends TraceType.Reward ?
			{
				// Reward trace data
				rewardData: {
					rewardType: RewardType
					recipient: Address
					amount: TokenAmount
					amountFormatted: string
					
					// Reward context
					blockReward?: TokenAmount
					transactionFees?: TokenAmount
					uncleReward?: TokenAmount
					
					// Mining context
					miner?: Address
					uncleHash?: Hash
					uncleNumber?: number
					
					// MEV context
					mevReward?: TokenAmount
					flashloanProfit?: TokenAmount
					arbitrageProfit?: TokenAmount
				}
			}

		: _T extends TraceType.Genesis ?
			{
				// Genesis allocation data
				genesisData: {
					recipient: Address
					amount: TokenAmount
					amountFormatted: string
					
					// Genesis context
					allocationIndex: number
					totalAllocations: number
					totalGenesis: TokenAmount
					
					// Allocation type
					allocationType: 'founder' | 'investor' | 'treasury' | 'public' | 'reserve'
					vestingSchedule?: {
						startTime: Timestamp
						duration: number
						cliffPeriod?: number
					}
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
		
		transaction?: PartialExceptOneOf<import('./transaction').Transaction,
			| 'transactionId'
			| 'type'
			| 'status'
		>
		
		// For call traces
		fromActor?: PartialExceptOneOf<Actor,
			| 'address'
			| 'type'
		>
		
		toActor?: PartialExceptOneOf<Actor,
			| 'address'
			| 'type'
		>
		
		// For creation traces
		creatorActor?: PartialExceptOneOf<Actor,
			| 'address'
			| 'type'
		>
		
		createdContract?: PartialExceptOneOf<import('./contract').Contract,
			| 'address'
			| 'standard'
			| 'deploymentTimestamp'
		>
		
		// For self-destruct traces
		selfDestructContract?: PartialExceptOneOf<import('./contract').Contract,
			| 'address'
			| 'standard'
		>
		
		refundRecipient?: PartialExceptOneOf<Actor,
			| 'address'
			| 'type'
		>
		
		// For reward traces
		rewardRecipient?: PartialExceptOneOf<Actor,
			| 'address'
			| 'type'
		>
		
		// Trace relationships
		parentTrace?: PartialExceptOneOf<Trace,
			| 'id'
			| 'type'
		>
		
		childTraces?: PartialExceptOneOf<Trace,
			| 'id'
			| 'type'
			| 'traceAddress'
		>[]
		
		relatedTraces?: PartialExceptOneOf<Trace,
			| 'id'
			| 'type'
			| 'timestamp'
		>[]
		
		// Associated events and transfers
		events?: PartialExceptOneOf<import('./event').Event,
			| 'id'
			| 'category'
			| 'timestamp'
		>[]
		
		transfers?: PartialExceptOneOf<import('./transfer').Transfer,
			| 'id'
			| 'category'
			| 'timestamp'
		>[]
	}
)

export type AnyTrace = Trace<TraceType> 