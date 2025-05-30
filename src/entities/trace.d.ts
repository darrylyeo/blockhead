import type { PartialExceptOneOf } from '../typescript/PartialExceptOneOf.js'
import type { Address, Hash, Actor } from './address.js'
import type { ChainId } from './chain.js'
import type { Timestamp, BlockNumber, TokenAmount, USDAmount, Percentage, BasisPoints } from './types.js'

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
		block?: PartialExceptOneOf<import('./block.js').Block,
			| 'number'
			| 'hash'
			| 'timestamp'
		>
		
		transaction?: PartialExceptOneOf<import('./transaction.js').Transaction,
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
		
		createdContract?: PartialExceptOneOf<import('./contract.js').Contract,
			| 'address'
			| 'standard'
			| 'deploymentTimestamp'
		>
		
		// For self-destruct traces
		selfDestructContract?: PartialExceptOneOf<import('./contract.js').Contract,
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
		events?: PartialExceptOneOf<import('./event.js').Event,
			| 'id'
			| 'category'
			| 'timestamp'
		>[]
		
		transfers?: PartialExceptOneOf<import('./transfer.js').Transfer,
			| 'id'
			| 'category'
			| 'timestamp'
		>[]
	}
)

// Convenience type aliases
export type CallTrace = Trace<TraceType.Call>
export type CreateTrace = Trace<TraceType.Create>
export type Create2Trace = Trace<TraceType.Create2>
export type SelfDestructTrace = Trace<TraceType.SelfDestruct>
export type RewardTrace = Trace<TraceType.Reward>
export type GenesisTrace = Trace<TraceType.Genesis>

export type AnyTrace = Trace<TraceType>

// Trace analytics
export enum TraceAnalyticsTimeframe {
	OneHour = 'OneHour',
	OneDay = 'OneDay',
	SevenDays = 'SevenDays',
	ThirtyDays = 'ThirtyDays'
}

export type TraceAnalytics = {
	chainId: ChainId
	timeframe: TraceAnalyticsTimeframe
	
	// Execution metrics
	totalTraces: number
	totalGasUsed: TokenAmount
	averageGasPerTrace: TokenAmount
	gasEfficiency: Percentage
	
	// Type breakdown
	byType: Record<TraceType, {
		count: number
		percentage: Percentage
		gasUsed: TokenAmount
		successRate: Percentage
	}>
	
	// Call type breakdown (for call traces)
	byCallType: Record<CallType, {
		count: number
		percentage: Percentage
		averageGas: TokenAmount
		failureRate: Percentage
	}>
	
	// Contract activity
	contractActivity: {
		contractCalls: number
		contractCreations: number
		contractDestructions: number
		uniqueContracts: number
		
		topContracts: Array<{
			address: Address
			callCount: number
			gasUsed: TokenAmount
			successRate: Percentage
		}>
	}
	
	// Error analysis
	errorAnalysis: {
		totalErrors: number
		errorRate: Percentage
		
		topErrors: Array<{
			error: string
			count: number
			percentage: Percentage
		}>
		
		revertReasons: Array<{
			reason: string
			count: number
			gasWasted: TokenAmount
		}>
	}
	
	// Depth analysis
	depthAnalysis: {
		averageDepth: number
		maxDepth: number
		
		byDepth: Record<number, {
			count: number
			successRate: Percentage
			averageGas: TokenAmount
		}>
	}
	
	// Value flows
	valueFlows: {
		totalValueTransferred: TokenAmount
		internalTransfers: number
		contractCreationValue: TokenAmount
		rewardsDistributed: TokenAmount
	}
}

export type TraceFilter = {
	// Basic filters
	types?: TraceType[]
	callTypes?: CallType[]
	from?: Address[]
	to?: Address[]
	involving?: Address[]
	
	// Status filters
	isSuccess?: boolean
	hasError?: boolean
	errorTypes?: string[]
	
	// Value filters
	minValue?: TokenAmount
	maxValue?: TokenAmount
	hasValue?: boolean
	
	// Gas filters
	minGas?: TokenAmount
	maxGas?: TokenAmount
	gasEfficiencyRange?: {
		min: Percentage
		max: Percentage
	}
	
	// Depth filters
	minDepth?: number
	maxDepth?: number
	exactDepth?: number
	
	// Time range
	fromTimestamp?: Timestamp
	toTimestamp?: Timestamp
	fromBlock?: BlockNumber
	toBlock?: BlockNumber
	
	// Function filters
	methodSignatures?: Hash[]
	methodNames?: string[]
	
	// Advanced filters
	isPrecompile?: boolean
	isLibraryCall?: boolean
	hasRevertReason?: boolean
	
	// Pagination and sorting
	limit?: number
	offset?: number
	orderBy?: 'timestamp' | 'gasUsed' | 'value' | 'depth' | 'blockNumber'
	orderDirection?: 'asc' | 'desc'
}

export type TraceTree = {
	id: string
	chainId: ChainId
	rootTrace: string
	
	// Tree structure
	nodes: Array<{
		traceId: string
		parentId?: string
		children: string[]
		depth: number
		
		// Node data
		type: TraceType
		from?: Address
		to?: Address
		value: TokenAmount
		gasUsed: TokenAmount
		isSuccess: boolean
		
		// Position
		traceAddress: number[]
		subtraces: number
	}>
	
	// Tree metrics
	totalNodes: number
	maxDepth: number
	successfulNodes: number
	failedNodes: number
	
	// Execution summary
	totalGasUsed: TokenAmount
	totalValue: TokenAmount
	executionTime: number
	
	// Path analysis
	executionPaths: Array<{
		path: string[]
		gasUsed: TokenAmount
		isSuccessful: boolean
		valueFlow: TokenAmount
	}>
	
	// Contract interactions
	contractInteractions: Array<{
		contract: Address
		interactionCount: number
		gasSpent: TokenAmount
		methods: string[]
	}>
}

export type TracePattern = {
	id: string
	name: string
	description: string
	
	// Pattern definition
	pattern: {
		sequence: Array<{
			type?: TraceType
			callType?: CallType
			conditions: Record<string, any>
			timeWindow?: number
		}>
		
		// Pattern matching rules
		exactOrder: boolean
		allowGaps: boolean
		maxTimeSpan: number
		minOccurrences: number
	}
	
	// Pattern detection
	isActive: boolean
	confidence: Percentage
	severity: 'info' | 'warning' | 'critical'
	
	// Analytics
	detectionCount: number
	lastDetected?: Timestamp
	averageGasUsed: TokenAmount
	
	// Examples
	examples: Array<{
		traces: string[]
		detectedAt: Timestamp
		confidence: Percentage
		gasUsed: TokenAmount
		contracts: Address[]
	}>
}

export type TraceExecution = {
	id: string
	chainId: ChainId
	
	// Execution metadata
	rootFunction: string
	totalTraces: number
	executionResult: 'success' | 'revert' | 'out-of-gas' | 'invalid'
	
	// Resource consumption
	gasLimit: TokenAmount
	gasUsed: TokenAmount
	gasRemaining: TokenAmount
	gasPrice: TokenAmount
	totalCost: TokenAmount
	
	// State changes
	stateChanges: {
		balanceChanges: Array<{
			address: Address
			before: TokenAmount
			after: TokenAmount
			delta: TokenAmount
		}>
		
		storageChanges: Array<{
			address: Address
			slot: Hash
			before: Hash
			after: Hash
		}>
		
		codeChanges: Array<{
			address: Address
			operation: 'deploy' | 'destroy'
			size?: number
		}>
		
		nonceChanges: Array<{
			address: Address
			before: number
			after: number
		}>
	}
	
	// Execution flow
	callStack: Array<{
		depth: number
		from: Address
		to: Address
		function: string
		gasUsed: TokenAmount
		returnValue?: string
	}>
	
	// Performance metrics
	performance: {
		averageGasPerTrace: TokenAmount
		gasEfficiency: Percentage
		executionTime: number
		bottlenecks: Array<{
			trace: string
			gasUsage: TokenAmount
			percentage: Percentage
		}>
	}
	
	// Error analysis
	errors: Array<{
		trace: string
		error: string
		gasWasted: TokenAmount
		errorContext: {
			depth: number
			function: string
			inputs: string
		}
	}>
}

export type TraceDebugger = {
	// Execution context
	transactionHash: Hash
	blockNumber: BlockNumber
	traceIndex: number
	
	// Debug information
	debugTrace: Array<{
		step: number
		opcode: string
		gas: TokenAmount
		gasCost: TokenAmount
		stack: string[]
		memory: string[]
		storage: Record<Hash, Hash>
		
		// Program counter and depth
		pc: number
		depth: number
		
		// Error information
		error?: string
		
		// State changes at this step
		stateChanges?: {
			balanceChanges?: Record<Address, TokenAmount>
			storageChanges?: Record<Address, Record<Hash, Hash>>
		}
	}>
	
	// Debug capabilities
	breakpoints: number[]
	watchedAddresses: Address[]
	watchedStorageSlots: Array<{
		address: Address
		slot: Hash
	}>
	
	// Debug analysis
	analysis: {
		gasHotspots: Array<{
			step: number
			opcode: string
			gasUsed: TokenAmount
			percentage: Percentage
		}>
		
		memoryGrowth: Array<{
			step: number
			memorySize: number
			growth: number
		}>
		
		stackDepthAnalysis: {
			maxDepth: number
			averageDepth: number
			depthChanges: Array<{
				step: number
				depth: number
				change: number
			}>
		}
	}
} 