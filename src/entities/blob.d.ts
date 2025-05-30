import type { PartialExceptOneOf } from '../typescript/PartialExceptOneOf.js'
import type { Address, Hash, Actor } from './address.js'
import type { ChainId } from './chain.js'
import type { Timestamp, BlockNumber, TokenAmount, USDAmount, Percentage, BasisPoints } from './types.js'

// Blob types based on EIP-4844
export enum BlobType {
	Standard = 'Standard', // Standard EIP-4844 blob
	Sidecar = 'Sidecar', // Blob sidecar data
	Commitment = 'Commitment', // KZG commitment
	Proof = 'Proof' // KZG proof
}

export enum BlobStatus {
	Pending = 'Pending', // Waiting for inclusion
	Included = 'Included', // Included in block
	Finalized = 'Finalized', // Block is finalized
	Expired = 'Expired', // Blob expired before inclusion
	Invalid = 'Invalid' // Invalid blob data
}

export enum BlobUsage {
	Rollup = 'Rollup', // Layer 2 rollup data
	DataAvailability = 'DataAvailability', // General data availability
	Storage = 'Storage', // Decentralized storage
	Bridge = 'Bridge', // Cross-chain bridge data
	Oracle = 'Oracle', // Oracle data feed
	Computation = 'Computation', // Computation results
	Custom = 'Custom' // Custom application data
}

// Generic blob type with type-specific fields
export type Blob<_T extends BlobType = BlobType> = (
	& {
		// Blob identification
		id: string
		chainId: ChainId
		type: _T
		status: BlobStatus
		usage: BlobUsage
		
		// Blob hashes
		blobHash: Hash
		versionedHash: Hash
		
		// Position in blockchain
		blockNumber?: BlockNumber
		transactionIndex?: number
		blobIndex: number
		
		// Timing
		timestamp: Timestamp
		submittedAt: Timestamp
		expiresAt?: Timestamp
		
		// Size and capacity
		size: number // bytes
		compressedSize?: number
		compressionRatio?: Percentage
		
		// Blob economics (EIP-4844)
		baseFeePerBlobGas?: TokenAmount
		maxFeePerBlobGas?: TokenAmount
		blobGasUsed?: number
		blobGasPrice?: TokenAmount
		blobFee?: TokenAmount
		
		// Data availability
		isAvailable: boolean
		availabilityPeriod?: number // blocks
		
		// Verification
		isVerified: boolean
		kzgCommitment?: Hash
		kzgProof?: Hash
		
		// Network context
		networkLatency?: number
		propagationTime?: number
		
		// Access patterns
		accessCount?: number
		lastAccessed?: Timestamp
		hotness?: Percentage
	}

	& (
		_T extends BlobType.Standard ?
			{
				// Standard blob data
				standardData: {
					data: string // hex-encoded blob data
					encoding: 'raw' | 'compressed' | 'encoded'
					
					// Data structure
					dataType: 'transactions' | 'state' | 'witness' | 'custom'
					schema?: string
					version?: string
					
					// Compression details
					compressionAlgorithm?: 'gzip' | 'brotli' | 'snappy' | 'lz4'
					originalSize?: number
					
					// Metadata
					description?: string
					tags?: string[]
					applicationData?: Record<string, any>
				}
			}

		: _T extends BlobType.Sidecar ?
			{
				// Blob sidecar data
				sidecarData: {
					blobs: string[] // Raw blob data
					commitments: Hash[] // KZG commitments
					proofs: Hash[] // KZG proofs
					
					// Sidecar metadata
					blobCount: number
					totalSize: number
					
					// Verification data
					aggregateCommitment?: Hash
					aggregateProof?: Hash
					
					// Sidecar context
					bundleId?: string
					sequenceNumber?: number
				}
			}

		: _T extends BlobType.Commitment ?
			{
				// KZG commitment data
				commitmentData: {
					commitment: Hash
					polynomial?: string
					degree?: number
					
					// Commitment generation
					generationMethod: 'trusted-setup' | 'ceremony' | 'custom'
					setupId?: string
					
					// Verification details
					verificationKey?: Hash
					publicParameters?: Hash
					
					// Cryptographic context
					curve: 'BLS12-381' | 'BN254' | 'other'
					fieldSize?: number
				}
			}

		: _T extends BlobType.Proof ?
			{
				// KZG proof data
				proofData: {
					proof: Hash
					point?: Hash
					evaluation?: Hash
					
					// Proof generation
					provingTime?: number
					proverVersion?: string
					
					// Verification context
					verificationResult?: boolean
					verificationTime?: number
					verifierVersion?: string
					
					// Proof metadata
					challengePoint?: Hash
					openingProof?: Hash
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
		
		// Blob submitter
		submitter?: PartialExceptOneOf<Actor,
			| 'address'
			| 'type'
		>
		
		// For rollup blobs
		rollupOperator?: PartialExceptOneOf<Actor,
			| 'address'
			| 'type'
		>
		
		// Related blobs
		relatedBlobs?: PartialExceptOneOf<Blob,
			| 'id'
			| 'type'
			| 'timestamp'
		>[]
		
		// Parent blob (for blob fragments)
		parentBlob?: PartialExceptOneOf<Blob,
			| 'id'
			| 'blobHash'
		>
		
		// Child blobs (for blob bundles)
		childBlobs?: PartialExceptOneOf<Blob,
			| 'id'
			| 'blobHash'
			| 'size'
		>[]
		
		// Associated transactions (for rollup data)
		includedTransactions?: PartialExceptOneOf<import('./transaction.js').Transaction,
			| 'transactionId'
			| 'type'
			| 'timestamp'
		>[]
	}
)

// Convenience type aliases
export type StandardBlob = Blob<BlobType.Standard>
export type SidecarBlob = Blob<BlobType.Sidecar>
export type CommitmentBlob = Blob<BlobType.Commitment>
export type ProofBlob = Blob<BlobType.Proof>

export type AnyBlob = Blob<BlobType>

// Blob analytics
export enum BlobAnalyticsTimeframe {
	OneHour = 'OneHour',
	OneDay = 'OneDay',
	SevenDays = 'SevenDays',
	ThirtyDays = 'ThirtyDays'
}

export type BlobAnalytics = {
	chainId: ChainId
	timeframe: BlobAnalyticsTimeframe
	
	// Volume metrics
	totalBlobs: number
	totalSize: number // bytes
	averageBlobSize: number
	compressionEfficiency: Percentage
	
	// Type breakdown
	byType: Record<BlobType, {
		count: number
		totalSize: number
		percentage: Percentage
	}>
	
	// Usage breakdown
	byUsage: Record<BlobUsage, {
		count: number
		totalSize: number
		percentage: Percentage
		averageSize: number
	}>
	
	// Status distribution
	byStatus: Record<BlobStatus, {
		count: number
		percentage: Percentage
	}>
	
	// Economics
	economics: {
		totalBlobFees: TokenAmount
		averageFeePerBlob: TokenAmount
		averageFeePerByte: TokenAmount
		baseFeeVariation: Percentage
		
		feeEfficiency: {
			underpriced: number
			optimized: number
			overpriced: number
		}
	}
	
	// Network performance
	networkPerformance: {
		averageLatency: number
		averagePropagationTime: number
		inclusionRate: Percentage
		expirationRate: Percentage
		
		performanceBySize: Array<{
			sizeRange: string
			averageLatency: number
			inclusionRate: Percentage
		}>
	}
	
	// Data availability
	dataAvailability: {
		availabilityRate: Percentage
		averageRetentionPeriod: number
		accessPatterns: {
			hot: number
			warm: number
			cold: number
		}
	}
}

export type BlobFilter = {
	// Basic filters
	types?: BlobType[]
	statuses?: BlobStatus[]
	usages?: BlobUsage[]
	submitters?: Address[]
	
	// Size filters
	minSize?: number
	maxSize?: number
	sizeRange?: {
		min: number
		max: number
	}
	
	// Fee filters
	minFee?: TokenAmount
	maxFee?: TokenAmount
	feeEfficiency?: Array<'underpriced' | 'optimized' | 'overpriced'>
	
	// Time range
	fromTimestamp?: Timestamp
	toTimestamp?: Timestamp
	fromBlock?: BlockNumber
	toBlock?: BlockNumber
	
	// Status filters
	isVerified?: boolean
	isAvailable?: boolean
	hasExpired?: boolean
	
	// Performance filters
	maxLatency?: number
	minCompressionRatio?: Percentage
	
	// Content filters
	contentTypes?: string[]
	tags?: string[]
	hasMetadata?: boolean
	
	// Pagination and sorting
	limit?: number
	offset?: number
	orderBy?: 'timestamp' | 'size' | 'fee' | 'latency' | 'blockNumber'
	orderDirection?: 'asc' | 'desc'
}

export type BlobBundle = {
	id: string
	chainId: ChainId
	
	// Bundle metadata
	bundleSize: number
	blobCount: number
	totalSize: number
	compressionRatio: Percentage
	
	// Bundle composition
	blobs: string[] // Blob IDs
	blobHashes: Hash[]
	
	// Aggregated commitments and proofs
	aggregateCommitment?: Hash
	aggregateProof?: Hash
	merkleRoot?: Hash
	
	// Bundle economics
	totalFees: TokenAmount
	averageFeePerBlob: TokenAmount
	bundleDiscount?: Percentage
	
	// Bundle timing
	submittedAt: Timestamp
	includedAt?: Timestamp
	finalizedAt?: Timestamp
	bundleLatency?: number
	
	// Bundle performance
	inclusionRate: Percentage
	verificationTime?: number
	networkEfficiency: Percentage
	
	// Bundle status
	status: 'pending' | 'included' | 'finalized' | 'failed'
	failureReason?: string
	
	// Entity references
	bundler?: Address
	rollupOperator?: Address
	includedInBlocks?: BlockNumber[]
}

export type BlobMarket = {
	chainId: ChainId
	
	// Market conditions
	currentBaseFee: TokenAmount
	targetBlobGasUsage: number
	actualBlobGasUsage: number
	utilizationRate: Percentage
	
	// Fee dynamics
	feeHistory: Array<{
		blockNumber: BlockNumber
		timestamp: Timestamp
		baseFee: TokenAmount
		blobGasUsed: number
		blobCount: number
	}>
	
	// Market metrics
	metrics: {
		averageFee24h: TokenAmount
		medianFee24h: TokenAmount
		feeVolatility: Percentage
		demandTrend: 'increasing' | 'decreasing' | 'stable'
		
		priceElasticity: {
			feeIncrease: Percentage
			demandDecrease: Percentage
			elasticity: number
		}
	}
	
	// Capacity analysis
	capacity: {
		maxBlobsPerBlock: number
		averageBlobsPerBlock: number
		peakUtilization: Percentage
		capacityUtilization: Percentage
		
		bottlenecks: Array<{
			constraint: 'gas-limit' | 'bandwidth' | 'verification' | 'storage'
			impact: Percentage
			mitigation?: string
		}>
	}
	
	// Market participants
	participants: {
		activeSubmitters: number
		topSubmitters: Array<{
			submitter: Address
			blobCount: number
			totalSize: number
			marketShare: Percentage
		}>
		
		submitterTypes: Record<BlobUsage, {
			count: number
			volume: number
			averageFee: TokenAmount
		}>
	}
}

export type BlobOptimization = {
	id: string
	blobId: string
	
	// Optimization strategy
	strategy: 'compression' | 'batching' | 'scheduling' | 'encoding' | 'fragmentation'
	
	// Optimization results
	originalSize: number
	optimizedSize: number
	sizeReduction: Percentage
	
	originalFee: TokenAmount
	optimizedFee: TokenAmount
	feeReduction: Percentage
	
	// Performance impact
	latencyIncrease?: number
	verificationOverhead?: number
	storageEfficiency?: Percentage
	
	// Optimization parameters
	parameters: {
		compressionLevel?: number
		batchSize?: number
		schedulingWindow?: number
		encodingScheme?: string
		fragmentCount?: number
	}
	
	// Quality metrics
	qualityMetrics: {
		lossiness: 'lossless' | 'lossy'
		fidelity?: Percentage
		recoverability: Percentage
		errorRate?: Percentage
	}
	
	// Trade-offs
	tradeOffs: {
		sizeVsLatency: number
		costVsQuality: number
		speedVsEfficiency: number
	}
} 