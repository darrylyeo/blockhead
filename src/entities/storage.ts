import type { PartialExceptOneOf } from '../typescript/PartialExceptOneOf'
import type { Actor } from './actor'
import type { BlockNumber } from './block'
import type { ChainId } from './network'
import type { Address, BasisPoints, Hash, Percentage, Timestamp, TokenAmount, UsdAmount } from './scalars'

export type StorageId = string

// Storage access patterns
export enum StorageAccessType {
	Read = 'read', // SLOAD
	Write = 'write', // SSTORE
	Create = 'create', // First write to slot
	Delete = 'delete', // Delete from slot
	Warm = 'warm', // Warm access (EIP-2929)
	Cold = 'cold' // Cold access (EIP-2929)
}

// Storage slot types
export enum SlotType {
	Mapping = 'mapping', // Mapping storage
	Array = 'array', // Dynamic array
	Struct = 'struct', // Struct field
	Constant = 'constant', // Constant/immutable
	ProxyStorage = 'proxy-storage', // Proxy implementation slot
	AdminSlot = 'admin-slot', // Admin storage slot
	BeaconSlot = 'beacon-slot', // Beacon proxy slot
	Unknown = 'unknown' // Unknown pattern
}

// Storage operation types
export enum StorageOperation {
	Read = 'Read', // SLOAD operation
	Write = 'Write', // SSTORE operation
	Create = 'Create', // First write to slot
	Delete = 'Delete', // Write zero to slot
	WarmRead = 'WarmRead', // Read from warm slot
	ColdRead = 'ColdRead' // Read from cold slot
}

export enum StorageContext {
	Transaction = 'Transaction', // During transaction execution
	StateAccess = 'StateAccess', // State tree access
	Proof = 'Proof', // Merkle proof verification
	Migration = 'Migration', // State migration
	Backup = 'Backup', // State backup
	Recovery = 'Recovery' // State recovery
}

export enum StorageGranularity {
	Slot = 'Slot', // Individual storage slot
	Contract = 'Contract', // Entire contract storage
	Block = 'Block', // Block-level storage changes
	State = 'State' // Global state
}

export type Storage<_T extends StorageOperation = StorageOperation> = (
	& {
		// Storage identification
		id: StorageId
		chainId: ChainId
		operation: _T
		context: StorageContext
		granularity: StorageGranularity

		// Storage location
		storageSlot: Hash

		// Position in blockchain
		blockNumber: BlockNumber
		transactionIndex?: number
		traceIndex?: number

		// Timing
		timestamp: Timestamp

		// Gas context
		gasUsed?: TokenAmount
		gasCost?: TokenAmount

		// Storage values
		value: Hash

		// Access patterns
		isWarmAccess?: boolean
		accessCount?: number
		lastAccessedAt?: Timestamp

		// Storage metadata
		slotType?: 'mapping' | 'array' | 'struct' | 'simple' | 'proxy' | 'admin'
		dataType?: string
		encoding?: 'direct' | 'packed' | 'hashed' | 'compressed'

		// Security context
		isAdmin?: boolean
		isProxy?: boolean
		isCritical?: boolean
		riskLevel?: 'low' | 'medium' | 'high' | 'critical'
	}

	& (
		_T extends StorageOperation.Read | StorageOperation.WarmRead | StorageOperation.ColdRead ?
			{
				// Read operation data
				readData: {
					readValue: Hash
					previousReads?: number
					cacheHit?: boolean

					// Performance metrics
					accessLatency?: number
					cacheLevel?: 'l1' | 'l2' | 'disk' | 'network'

					// Value interpretation
					decodedValue?: any
					valueType?: string
					isDefault?: boolean
				}
			}

		: _T extends StorageOperation.Write | StorageOperation.Create | StorageOperation.Delete ?
			{
				// Write operation data
				writeData: {
					previousValue: Hash
					newValue: Hash
					valueDelta?: Hash

					// Write context
					isFirstWrite?: boolean
					writeCount?: number

					// Change tracking
					changeType: 'increment' | 'decrement' | 'replace' | 'zero' | 'append'
					changeSize?: number

					// Optimization flags
					isRefund?: boolean
					refundAmount?: TokenAmount

					// Decoded values
					decodedPrevious?: any
					decodedNew?: any
				}
			}

		:
			{}
	)

	& {
		_contract?: PartialExceptOneOf<import('./contract').Contract,
			| 'address'
			| 'standards'
		>

		_block?: PartialExceptOneOf<import('./block').Block,
			| 'blockNumber'
			| 'blockHash'
			| 'timestamp'
		>

		_transaction?: PartialExceptOneOf<import('./transaction').Transaction,
			| 'id'
			| 'format'
			| 'status'
		>

		// Trace context
		_trace?: PartialExceptOneOf<import('./trace').Trace,
			| 'id'
			| 'format'
			| 'traceAddress'
		>

		// Storage accessor
		_accessor?: PartialExceptOneOf<Actor,
			| 'address'
			| 'format'
		>

		// Related storage operations
		_relatedOperations?: PartialExceptOneOf<Storage,
			| 'id'
			| 'operation'
			| 'timestamp'
		>[]

		// Storage dependencies
		_dependencies?: PartialExceptOneOf<Storage,
			| 'id'
			| 'storageSlot'
			| 'operation'
		>[]

		// Associated events
		_events?: PartialExceptOneOf<import('./event').Event,
			| 'id'
			| 'category'
			| 'timestamp'
		>[]
	}
)

// Storage analytics
export enum StorageAnalyticsTimeframe {
	OneHour = 'OneHour',
	OneDay = 'OneDay',
	SevenDays = 'SevenDays',
	ThirtyDays = 'ThirtyDays'
}

export type StorageAnalytics = {
	chainId: ChainId
	timeframe: StorageAnalyticsTimeframe

	// Operation metrics
	totalOperations: number
	totalGasUsed: TokenAmount
	averageGasPerOperation: TokenAmount

	// Operation breakdown
	byOperation: Record<StorageOperation, {
		count: number
		percentage: Percentage
		gasUsed: TokenAmount
		averageGas: TokenAmount
	}>

	// Context breakdown
	byContext: Record<StorageContext, {
		count: number
		gasUsed: TokenAmount
		averageLatency?: number
	}>

	// Access patterns
	accessPatterns: {
		warmAccesses: number
		coldAccesses: number
		warmAccessRate: Percentage
		cacheEfficiency: Percentage

		hotSlots: {
			contractAddress: Address
			slot: Hash
			accessCount: number
			lastAccessed: Timestamp
		}[]
	}

	// Storage efficiency
	efficiency: {
		storageRefunds: TokenAmount
		wastedWrites: number
		redundantReads: number
		optimizationPotential: Percentage
	}

	// Top contracts by storage activity
	topContracts: {
		address: Address
		operationCount: number
		gasUsed: TokenAmount
		uniqueSlots: number
		efficiency: Percentage
	}[]

	// Storage growth
	growth: {
		newSlots: number
		deletedSlots: number
		netGrowth: number
		storageExpansionRate: Percentage
	}
}

export type StorageFilter = {
	// Basic filters
	operations?: StorageOperation[]
	contexts?: StorageContext[]
	contracts?: Address[]
	slots?: Hash[]

	// Access filters
	isWarmAccess?: boolean
	accessCountRange?: {
		min: number
		max: number
	}

	// Gas filters
	minGas?: TokenAmount
	maxGas?: TokenAmount
	hasRefund?: boolean

	// Value filters
	hasValueChange?: boolean
	isNonZeroValue?: boolean
	valuePatterns?: Hash[]

	// Security filters
	isAdmin?: boolean
	isProxy?: boolean
	isCritical?: boolean
	riskLevels?: ('low' | 'medium' | 'high' | 'critical')[]

	// Time range
	fromTimestamp?: Timestamp
	toTimestamp?: Timestamp
	fromBlock?: BlockNumber
	toBlock?: BlockNumber

	// Performance filters
	maxLatency?: number
	cacheLevel?: ('l1' | 'l2' | 'disk' | 'network')[]

	// Pagination and sorting
	limit?: number
	offset?: number
	orderBy?: 'timestamp' | 'gasUsed' | 'accessCount' | 'blockNumber'
	orderDirection?: 'asc' | 'desc'
}

export type StorageSnapshot = {
	id: string
	chainId: ChainId

	// Snapshot metadata
	blockNumber: BlockNumber
	stateRoot: Hash
	timestamp: Timestamp
	snapshotType: 'full' | 'incremental' | 'differential'

	// Storage data
	storageData: {
		contractAddress: Address
		storageSlots: Record<Hash, Hash>
		slotCount: number
		storageSize: number
	}[]

	// Snapshot metrics
	totalContracts: number
	totalSlots: number
	totalStorageSize: number
	compressionRatio?: Percentage

	// Generation metadata
	generationTime: number
	generationCost?: TokenAmount
	generationMethod: 'iterative' | 'merkle' | 'witness' | 'parallel'

	// Verification data
	isVerified: boolean
	verificationMethod?: 'merkle-proof' | 'state-proof' | 'witness'
	verificationRoot?: Hash

	// Snapshot relationships
	parentSnapshot?: string
	childSnapshots?: string[]

	// Usage statistics
	accessCount: number
	lastAccessed: Timestamp
	downloadCount?: number
}

export type StorageProof = {
	id: string
	chainId: ChainId

	// Proof target
	targetContract: Address
	targetSlot: Hash
	targetValue: Hash
	targetBlock: BlockNumber

	// Proof data
	proofType: 'merkle' | 'witness' | 'inclusion' | 'non-inclusion'
	proof: Hash[]
	proofSize: number

	// Verification context
	stateRoot: Hash
	storageRoot: Hash
	accountProof?: Hash[]

	// Proof generation
	generatedAt: Timestamp
	generationTime: number
	generationMethod: 'rpc' | 'local' | 'cached' | 'precomputed'

	// Verification status
	isValid: boolean
	verifiedAt?: Timestamp
	verificationTime?: number
	verificationMethod?: string

	// Proof optimization
	isOptimized: boolean
	optimizationLevel?: number
	compressionUsed?: string

	// Usage tracking
	usageCount: number
	lastUsed?: Timestamp
	cacheHit?: boolean
}

export type StorageLayout = {
	contractAddress: Address
	chainId: ChainId

	// Layout metadata
	layoutVersion: string
	compilerVersion?: string
	optimizationEnabled?: boolean

	// Storage variables
	variables: {
		name: string
		type: string
		slot: number
		offset: number
		size: number

		// Type information
		isMapping?: boolean
		isArray?: boolean
		isStruct?: boolean
		isPacked?: boolean

		// Access patterns
		isConstant?: boolean
		isImmutable?: boolean
		visibility?: 'public' | 'private' | 'internal'

		// Value tracking
		currentValue?: Hash
		defaultValue?: Hash
		lastModified?: Timestamp
	}[]

	// Layout statistics
	totalSlots: number
	usedSlots: number
	utilization: Percentage
	packingEfficiency: Percentage

	// Gas optimization
	gasOptimization: {
		currentCost: TokenAmount
		optimizedCost?: TokenAmount
		potentialSavings?: TokenAmount
		optimizationSuggestions: string[]
	}

	// Layout validation
	isValid: boolean
	conflicts?: {
		variable1: string
		variable2: string
		conflict: 'overlap' | 'type-mismatch' | 'size-conflict'
	}[]

	// Layout evolution
	versions: {
		version: string
		deployedAt: BlockNumber
		changes: {
			variable: string
			changeType: 'added' | 'removed' | 'moved' | 'resized'
			oldSlot?: number
			newSlot?: number
		}[]
	}[]
}

export type StorageOptimization = {
	id: string
	contractAddress: Address
	chainId: ChainId

	// Optimization strategy
	strategy: 'packing' | 'reordering' | 'compression' | 'caching' | 'lazy-loading'

	// Current state analysis
	currentLayout: {
		totalSlots: number
		usedSlots: number
		wastedSpace: number
		gasPerAccess: TokenAmount
	}

	// Optimization proposal
	proposedLayout: {
		totalSlots: number
		usedSlots: number
		wastedSpace: number
		gasPerAccess: TokenAmount
		packingImprovements: number
	}

	// Optimization benefits
	benefits: {
		gasReduction: TokenAmount
		gasReductionPercent: Percentage
		storageReduction: number
		accessSpeedUp: Percentage

		costSavings: {
			perRead: TokenAmount
			perWrite: TokenAmount
			perTransaction: TokenAmount
			annually?: TokenAmount
		}
	}

	// Implementation details
	implementation: {
		complexity: 'low' | 'medium' | 'high'
		breakingChanges: boolean
		migrationRequired: boolean
		migrationCost?: TokenAmount

		steps: {
			step: string
			description: string
			gasRequired?: TokenAmount
			riskLevel: 'low' | 'medium' | 'high'
		}[]
	}

	// Optimization validation
	validation: {
		functionalityPreserved: boolean
		securityMaintained: boolean
		testCoverage: Percentage
		auditRequired: boolean
	}
}

export type StorageMonitor = {
	id: string
	name: string
	chainId: ChainId

	// Monitoring configuration
	targets: {
		contractAddress: Address
		slots?: Hash[]
		operations?: StorageOperation[]
		contexts?: StorageContext[]
	}[]

	// Alert conditions
	alerts: {
		type: 'unusual-activity' | 'gas-spike' | 'value-change' | 'access-pattern' | 'security-risk'
		condition: string
		threshold?: number | string
		isActive: boolean
		severity: 'info' | 'warning' | 'critical'
	}[]

	// Monitoring metrics
	metrics: {
		operationsTracked: number
		alertsTriggered: number
		falsePositives: number
		averageResponseTime: number

		detectionAccuracy: Percentage
		coveragePercent: Percentage
	}

	// Historical data
	history: {
		timestamp: Timestamp
		metric: string
		value: number | string
		alert?: boolean
		anomaly?: boolean
	}[]

	// Notification settings
	notifications: {
		webhook?: string
		email?: string[]
		discord?: string
		telegram?: string
		realtime: boolean
	}

	// Monitor status
	isActive: boolean
	lastCheck: Timestamp
	nextCheck?: Timestamp
	uptime: Percentage
} 