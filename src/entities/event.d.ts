import type { PartialExceptOneOf } from '../typescript/PartialExceptOneOf.js'
import type { Address, Hash, Actor } from './address.js'
import type { ChainId } from './chain.js'
import type { Timestamp, BlockNumber, TokenAmount, USDAmount, Percentage, BasisPoints } from './types.js'

// Event log types
export enum EventStandard {
	ERC20 = 'ERC20',
	ERC721 = 'ERC721',
	ERC1155 = 'ERC1155',
	Custom = 'Custom'
}

export enum EventCategory {
	Transfer = 'Transfer',
	Approval = 'Approval',
	Mint = 'Mint',
	Burn = 'Burn',
	Swap = 'Swap',
	Deposit = 'Deposit',
	Withdrawal = 'Withdrawal',
	Stake = 'Stake',
	Unstake = 'Unstake',
	Governance = 'Governance',
	Custom = 'Custom'
}

// Generic event type with standard and category-specific fields
export type Event<
	_S extends EventStandard = EventStandard,
	_C extends EventCategory = EventCategory
> = (
	& {
		// Event identification
		id: string
		chainId: ChainId
		standard: _S
		category: _C
		
		// Event log data
		topics: Hash[]
		data: string
		signature: Hash
		name: string
		
		// Position in blockchain
		blockNumber: BlockNumber
		transactionIndex: number
		logIndex: number
		
		// Timing
		timestamp: Timestamp
		
		// Event metadata
		removed: boolean
		gasUsed?: number
		gasPrice?: TokenAmount
		
		// Decoded event data
		decodedData?: Record<string, any>
		
		// Event source context
		eventInterface?: {
			abi: any
			inputs: Array<{
				name: string
				type: string
				indexed: boolean
			}>
		}
	}

	& (
		_S extends EventStandard.ERC20 ?
			(
				_C extends EventCategory.Transfer ?
					{
						// ERC20 Transfer event specific data
						transferData: {
							from: Address
							to: Address
							value: TokenAmount
							valueFormatted: string
							symbol: string
							decimals: number
						}
					}

				: _C extends EventCategory.Approval ?
					{
						// ERC20 Approval event specific data
						approvalData: {
							owner: Address
							spender: Address
							value: TokenAmount
							valueFormatted: string
							isUnlimited: boolean
						}
					}

				:
					{}
			)

		: _S extends EventStandard.ERC721 ?
			(
				_C extends EventCategory.Transfer ?
					{
						// ERC721 Transfer event specific data
						nftTransferData: {
							from: Address
							to: Address
							tokenId: string
							collectionName: string
							tokenMetadata?: {
								name?: string
								description?: string
								image?: string
								attributes?: Array<{
									traitType: string
									value: string | number
								}>
							}
						}
					}

				: _C extends EventCategory.Approval ?
					{
						// ERC721 Approval event specific data
						nftApprovalData: {
							owner: Address
							approved: Address
							tokenId: string
						}
					}

				:
					{}
			)

		: _S extends EventStandard.ERC1155 ?
			(
				_C extends EventCategory.Transfer ?
					{
						// ERC1155 Transfer event specific data
						multiTokenTransferData: {
							operator: Address
							from: Address
							to: Address
							tokenIds: string[]
							amounts: TokenAmount[]
							batchTransfer: boolean
						}
					}

				: _C extends EventCategory.Approval ?
					{
						// ERC1155 Approval event specific data
						multiTokenApprovalData: {
							owner: Address
							operator: Address
							approved: boolean
						}
					}

				:
					{}
			)

		: _S extends EventStandard.Custom ?
			(
				_C extends EventCategory.Swap ?
					{
						// DeFi Swap event specific data
						swapData: {
							sender: Address
							recipient: Address
							amount0In: TokenAmount
							amount1In: TokenAmount
							amount0Out: TokenAmount
							amount1Out: TokenAmount
							token0: Address
							token1: Address
							protocol: string
							fee: BasisPoints
						}
					}

				: _C extends EventCategory.Deposit ?
					{
						// DeFi Deposit event specific data
						depositData: {
							user: Address
							asset: Address
							amount: TokenAmount
							shares?: TokenAmount
							protocol: string
						}
					}

				: _C extends EventCategory.Withdrawal ?
					{
						// DeFi Withdrawal event specific data
						withdrawalData: {
							user: Address
							asset: Address
							amount: TokenAmount
							shares?: TokenAmount
							protocol: string
						}
					}

				: _C extends EventCategory.Stake ?
					{
						// Staking event specific data
						stakeData: {
							staker: Address
							validator?: Address
							amount: TokenAmount
							duration?: number
							rewards?: TokenAmount
						}
					}

				: _C extends EventCategory.Governance ?
					{
						// Governance event specific data
						governanceData: {
							voter?: Address
							proposalId?: string
							support?: boolean
							votes?: TokenAmount
							reason?: string
							proposer?: Address
						}
					}

				:
					{
						// Generic custom event data
						customData: Record<string, any>
					}
			)

		:
			{}
	)

	& {
		// --
		// Entity References (using PartialExceptOneOf)
		emitter?: PartialExceptOneOf<Actor,
			| 'address'
			| 'type'
		>
		
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
		
		relatedEvents?: PartialExceptOneOf<Event,
			| 'id'
			| 'category'
			| 'timestamp'
		>[]
		
		// For token events
		tokenContract?: PartialExceptOneOf<import('./token.js').Token,
			| 'address'
			| 'standard'
			| 'metadata'
		>
		
		// For transfer events
		fromActor?: PartialExceptOneOf<Actor,
			| 'address'
			| 'type'
		>
		
		toActor?: PartialExceptOneOf<Actor,
			| 'address'
			| 'type'
		>
		
		// For approval events
		ownerActor?: PartialExceptOneOf<Actor,
			| 'address'
			| 'type'
		>
		
		spenderActor?: PartialExceptOneOf<Actor,
			| 'address'
			| 'type'
		>
		
		// For DeFi events
		protocolActor?: PartialExceptOneOf<Actor,
			| 'address'
			| 'type'
		>
		
		// For governance events
		proposalRef?: PartialExceptOneOf<import('./app.js').DAOProposal,
			| 'id'
			| 'status'
		>
		
		voterActor?: PartialExceptOneOf<Actor,
			| 'address'
			| 'type'
		>
	}
)

// Convenience type aliases
export type ERC20TransferEvent = Event<EventStandard.ERC20, EventCategory.Transfer>
export type ERC20ApprovalEvent = Event<EventStandard.ERC20, EventCategory.Approval>
export type ERC721TransferEvent = Event<EventStandard.ERC721, EventCategory.Transfer>
export type ERC721ApprovalEvent = Event<EventStandard.ERC721, EventCategory.Approval>
export type ERC1155TransferEvent = Event<EventStandard.ERC1155, EventCategory.Transfer>
export type SwapEvent = Event<EventStandard.Custom, EventCategory.Swap>
export type DepositEvent = Event<EventStandard.Custom, EventCategory.Deposit>
export type WithdrawalEvent = Event<EventStandard.Custom, EventCategory.Withdrawal>
export type StakeEvent = Event<EventStandard.Custom, EventCategory.Stake>
export type GovernanceEvent = Event<EventStandard.Custom, EventCategory.Governance>

export type AnyEvent = Event<EventStandard, EventCategory>

// Event analytics
export enum EventAnalyticsTimeframe {
	OneHour = 'OneHour',
	OneDay = 'OneDay',
	SevenDays = 'SevenDays',
	ThirtyDays = 'ThirtyDays'
}

export type EventAnalytics = {
	chainId: ChainId
	timeframe: EventAnalyticsTimeframe
	
	// Event volume metrics
	totalEvents: number
	eventsPerSecond: number
	peakEventsPerSecond: number
	
	// Category breakdown
	byCategory: Record<EventCategory, {
		count: number
		percentage: Percentage
		volume: TokenAmount
		growth: Percentage
	}>
	
	// Standard breakdown
	byStandard: Record<EventStandard, {
		count: number
		percentage: Percentage
	}>
	
	// Top emitters
	topEmitters: Array<{
		emitter: Address
		emitterType: string
		eventCount: number
		categories: EventCategory[]
		volume: TokenAmount
	}>
	
	// Gas analysis
	gasAnalysis: {
		totalGasUsed: number
		averageGasPerEvent: number
		gasEfficiency: number
		costAnalysis: {
			totalCost: TokenAmount
			averageCostPerEvent: TokenAmount
			costByCategory: Record<EventCategory, TokenAmount>
		}
	}
	
	// Network activity
	networkActivity: {
		uniqueEmitters: number
		uniqueReceivers: number
		crossContractInteractions: number
		protocolInteractions: number
	}
}

export type EventFilter = {
	// Basic filters
	emitters?: Address[]
	standards?: EventStandard[]
	categories?: EventCategory[]
	topics?: Hash[]
	
	// Time range
	fromTimestamp?: Timestamp
	toTimestamp?: Timestamp
	fromBlock?: BlockNumber
	toBlock?: BlockNumber
	
	// Amount filters (for value events)
	minAmount?: TokenAmount
	maxAmount?: TokenAmount
	
	// Address filters
	involving?: Address[] // Events involving these addresses
	excluding?: Address[] // Events not involving these addresses
	
	// Protocol filters
	protocols?: string[]
	
	// Advanced filters
	hasDecodedData?: boolean
	isRemoved?: boolean
	
	// Pagination
	limit?: number
	offset?: number
	orderBy?: 'timestamp' | 'blockNumber' | 'logIndex' | 'amount'
	orderDirection?: 'asc' | 'desc'
}

export type EventSubscription = {
	id: string
	name: string
	description?: string
	
	// Subscription filters
	filter: EventFilter
	
	// Notification settings
	notifications: {
		webhook?: {
			url: string
			headers?: Record<string, string>
			secret?: string
		}
		email?: {
			recipients: string[]
			template?: string
		}
		discord?: {
			webhookUrl: string
			mentionRoles?: string[]
		}
		telegram?: {
			botToken: string
			chatId: string
		}
	}
	
	// Subscription state
	isActive: boolean
	createdAt: Timestamp
	lastTriggered?: Timestamp
	triggerCount: number
	
	// Rate limiting
	rateLimit?: {
		maxEventsPerMinute: number
		maxEventsPerHour: number
		cooldownSeconds: number
	}
	
	// Batch settings
	batchSettings?: {
		enabled: boolean
		maxBatchSize: number
		maxWaitTimeSeconds: number
	}
}

export type EventPattern = {
	id: string
	name: string
	description: string
	
	// Pattern definition
	pattern: {
		sequence: Array<{
			standard: EventStandard
			category: EventCategory
			conditions?: Record<string, any>
			timeWindow?: number // seconds
		}>
		
		// Pattern matching rules
		exactOrder: boolean
		allowGaps: boolean
		maxTimeSpan: number // seconds
		minOccurrences: number
	}
	
	// Pattern detection
	isActive: boolean
	confidence: number // 0-100
	
	// Analytics
	detectionCount: number
	lastDetected?: Timestamp
	averageTimeSpan: number
	
	// Examples of detected patterns
	examples: Array<{
		events: string[] // Event IDs
		timeSpan: number
		detectedAt: Timestamp
		confidence: number
	}>
}

export type EventAggregation = {
	// Aggregation parameters
	groupBy: Array<'emitter' | 'category' | 'standard' | 'hour' | 'day' | 'week'>
	timeRange: {
		from: Timestamp
		to: Timestamp
	}
	
	// Aggregated results
	groups: Array<{
		key: Record<string, any>
		metrics: {
			eventCount: number
			uniqueEmitters: number
			totalVolume: TokenAmount
			averageGasUsed: number
			
			// Time-based metrics
			eventsPerSecond: number
			peakActivity: {
				timestamp: Timestamp
				eventCount: number
			}
			
			// Category distribution
			categoryBreakdown: Record<EventCategory, {
				count: number
				percentage: Percentage
			}>
		}
	}>
	
	// Overall aggregation metadata
	totalGroups: number
	totalEvents: number
	aggregationTime: Timestamp
}

export type EventDecoder = {
	// Contract interface information
	contractAddress: Address
	contractStandard: EventStandard
	abiVersion?: string
	
	// Event signatures
	supportedEvents: Array<{
		signature: Hash
		name: string
		inputs: Array<{
			name: string
			type: string
			indexed: boolean
		}>
		category: EventCategory
	}>
	
	// Decoding capabilities
	canDecodeTopics: boolean
	canDecodeData: boolean
	supportsMetadata: boolean
	
	// Performance metrics
	decodingStats: {
		totalDecoded: number
		successRate: Percentage
		averageDecodeTime: number
		errorCount: number
		lastError?: string
	}
	
	// Custom decoding rules
	customRules?: Array<{
		condition: string
		transformation: string
		priority: number
	}>
}

export type EventExport = {
	id: string
	name: string
	description?: string
	
	// Export configuration
	filter: EventFilter
	format: 'json' | 'csv' | 'parquet' | 'xlsx'
	compression?: 'gzip' | 'zip' | 'none'
	
	// Output configuration
	fields: string[] // Which fields to include
	includeMetadata: boolean
	includeRelatedData: boolean
	
	// Processing options
	batchSize: number
	maxRecords?: number
	
	// Export status
	status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled'
	progress: Percentage
	
	// Results
	createdAt: Timestamp
	completedAt?: Timestamp
	recordCount?: number
	fileSize?: number
	downloadUrl?: string
	expiresAt?: Timestamp
	
	// Error information
	error?: {
		code: string
		message: string
		details?: Record<string, any>
	}
} 