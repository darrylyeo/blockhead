import type { PartialExceptOneOf } from '../typescript/PartialExceptOneOf'
import type { Actor } from './actor'
import type { BlockNumber } from './block'
import type { ChainId } from './chain'
import type { Address, BasisPoints, Hash, Percentage, Timestamp, TokenAmount, UsdAmount } from './scalars'

export type BlobId = string

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

export type Blob<
	_BlobType extends BlobType = BlobType,
	_BlobUsage extends BlobUsage = BlobUsage
> = (
	& {
		// Blob identification
		id: BlobId
		chainId: ChainId
		type: _BlobType
		status: BlobStatus
		usages: _BlobUsage[]

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
		_BlobUsage extends BlobUsage.Rollup ?
			{
				rollupData: {
					rollupChain: ChainId
					sequencer: Address
					batchId: string
					transactionCount: number
					stateRoot: Hash
					l2BlockRange?: {
						from: number
						to: number
					}
				}
			}
		: _BlobUsage extends BlobUsage.DataAvailability ?
			{
				dataAvailabilityInfo: {
					provider: string
					storageType: 'onchain' | 'offchain' | 'hybrid'
					redundancy: number
					retrievalEndpoints?: string[]
				}
			}
		: _BlobUsage extends BlobUsage.Bridge ?
			{
				bridgeData: {
					bridgeProtocol: string
					sourceChain: ChainId
					targetChain: ChainId
					messageRoot?: Hash
					messageCount?: number
				}
			}
		: _BlobUsage extends BlobUsage.Oracle ?
			{
				oracleData: {
					oracleName: string
					dataType: 'price' | 'weather' | 'sports' | 'random' | 'custom'
					feedId?: string
					updateFrequency?: number
					dataPoints?: number
				}
			}
		: _BlobUsage extends BlobUsage.Storage ?
			{
				storageData: {
					storageProtocol: string
					contentType?: string
					contentHash?: Hash
					encryption?: boolean
					accessControl?: 'public' | 'private' | 'permissioned'
				}
			}
		: _BlobUsage extends BlobUsage.Computation ?
			{
				computationData: {
					computeProtocol: string
					programHash?: Hash
					inputHash?: Hash
					outputHash?: Hash
					executionTime?: number
					gasUsed?: number
				}
			}
		: {}
	)

	& (
		_BlobType extends BlobType.Standard ?
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

		: _BlobType extends BlobType.Sidecar ?
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

		: _BlobType extends BlobType.Commitment ?
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

		: _BlobType extends BlobType.Proof ?
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
		$block?: PartialExceptOneOf<import('./block').Block,
			| 'blockNumber'
			| 'blockHash'
			| 'timestamp'
		>

		$transaction?: PartialExceptOneOf<import('./transaction').Transaction,
			| 'id'
			| 'format'
			| 'status'
		>

		// Blob submitter
		$submitter?: PartialExceptOneOf<Actor,
			| 'address'
			| 'format'
		>

		// For rollup blobs
		$rollupOperator?: PartialExceptOneOf<Actor,
			| 'address'
			| 'format'
		>

		// Related blobs
		$relatedBlobs?: PartialExceptOneOf<Blob,
			| 'id'
			| 'format'
			| 'timestamp'
		>[]

		// Parent blob (for blob fragments)
		$parentBlob?: PartialExceptOneOf<Blob,
			| 'id'
			| 'blobHash'
		>

		// Child blobs (for blob bundles)
		$childBlobs?: PartialExceptOneOf<Blob,
			| 'id'
			| 'blobHash'
			| 'size'
		>[]

		// Associated transactions (for rollup data)
		$includedTransactions?: PartialExceptOneOf<import('./transaction').Transaction,
			| 'id'
			| 'format'
			| 'timestamp'
		>[]
	}
)

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

	// Bundle status
	status: 'pending' | 'included' | 'finalized' | 'failed'
	failureReason?: string

	// Entity references
	bundler?: Address
	rollupOperator?: Address
	includedInBlocks?: BlockNumber[]
} 