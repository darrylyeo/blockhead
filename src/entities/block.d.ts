import type { PartialExceptOneOf } from '../typescript/PartialExceptOneOf'
import type { Actor } from './actor'
import type { Address, Hash } from './scalars'
import type { ChainId } from './network'
import type { Timestamp, BlockNumber, TokenAmount, UsdAmount, Percentage, BasisPoints } from './types'

// Block's role in the chain (mutually exclusive)
export enum BlockRole {
	Canonical = 'Canonical', // Part of main chain
	Uncle = 'Uncle', // Uncle/ommer block
	Orphaned = 'Orphaned', // Not part of chain
	Pending = 'Pending' // Being processed
}

export enum BlockStatus {
	Pending = 'Pending', // Block being mined
	Confirmed = 'Confirmed', // Block confirmed
	Finalized = 'Finalized', // Block finalized
	Reorged = 'Reorged' // Block reorganized out
}

export enum ConsensusType {
	Pow = 'Pow', // Proof of Work
	Pos = 'Pos', // Proof of Stake
	Poa = 'Poa', // Proof of Authority
	PoaClique = 'PoaClique', // Clique PoA
	PoaBor = 'PoaBor', // Bor PoA (Polygon)
	PoaIbft = 'PoaIbft', // IBFT PoA
	Layer2 = 'Layer2' // L2 sequencer
}

export enum TransactionType {
	Legacy = 'Legacy',
	Eip2930 = 'Eip2930', // Access list
	Eip1559 = 'Eip1559', // Dynamic fees
	Eip4844 = 'Eip4844' // Blob transactions
}

// Block characteristics (not mutually exclusive)
export type BlockCharacteristics = {
	isGenesis: boolean
	isEmpty: boolean
	isFork: boolean // Contains fork activation
	isMerge: boolean // Merge transition block
	hasUncles: boolean
	hasReorg: boolean
	hasBlobs: boolean // EIP-4844
}

// Block type with generic role parameter
export type Block<_BlockRole extends BlockRole = BlockRole> = {
	// Block identification
	chainId: ChainId
	blockNumber: BlockNumber
	blockHash: Hash
	role: _BlockRole
	status: BlockStatus
	
	// Block characteristics
	characteristics: BlockCharacteristics
	
	// Block metadata
	timestamp: Timestamp
	parentHash: Hash
	stateRoot: Hash
	transactionsRoot: Hash
	receiptsRoot: Hash
	
	// Consensus data
	consensusType: ConsensusType
	difficulty?: string
	totalDifficulty?: string
	nonce?: string
	extraData?: string
	
	// Size and gas
	size: number
	gasLimit: string
	gasUsed: string
	gasUsedPercentage: Percentage
	
	// Transaction counts
	transactionCount: number
	internalTransactionCount?: number
	
	// Economic metrics
	baseFeePerGas?: string
	burntFees?: TokenAmount
	
	// Miner/validator
	miner: Address
	minerReward?: TokenAmount
	
	// Timestamps
	minedAt: Timestamp
	receivedAt?: Timestamp
	propagationTime?: number // milliseconds
} & (
	_BlockRole extends BlockRole.Canonical ?
		{
			// Canonical block specific data
			confirmations: number
			isFinalized: boolean
			chainTipDistance: number
			
			// Canonical chain metrics
			cumulativeGasUsed?: string
			cumulativeDifficulty?: string
		}
	: _BlockRole extends BlockRole.Uncle ?
		{
			// Uncle block specific data
			unclePosition: number
			uncleHash: Hash
			nephewHash: Hash
			nephewNumber: BlockNumber
			
			// Uncle miner
			uncleMiner: Address
			uncleReward: TokenAmount
			
			// Uncle metadata
			uncleHeight: number // blocks behind main chain
			inclusionDelay: number // blocks until included
		}
	: _BlockRole extends BlockRole.Orphaned ?
		{
			// Orphaned block data
			orphanedReason: 'reorg' | 'invalid' | 'stale' | 'fork'
			canonicalBlockHash?: Hash
			forkLength?: number
			
			// Competition info
			competingBlocks?: Array<{
				hash: Hash
				miner: Address
				totalDifficulty?: string
			}>
		}
	: _BlockRole extends BlockRole.Pending ?
		{
			// Pending block data
			estimatedConfirmationTime?: number
			replacementRisk?: Percentage
			
			// Mempool context
			mempoolEntryTime?: Timestamp
			priorityScore?: number
		}
	: {}
) & {
	// Additional data based on characteristics
	// Genesis block specific data
	genesisData?: {
		chainName: string
		chainVersion: string
		protocolVersion: string
		
		// Initial state
		initialSupply: TokenAmount
		premine?: Array<{
			address: Address
			balance: TokenAmount
		}>
		
		// Genesis parameters
		genesisTime: Timestamp
		genesisNonce: string
		genesisDifficulty: string
		
		// Chain configuration
		chainConfig: {
			chainId: ChainId
			homesteadBlock?: BlockNumber
			eip150Block?: BlockNumber
			eip155Block?: BlockNumber
			eip158Block?: BlockNumber
			byzantiumBlock?: BlockNumber
			constantinopleBlock?: BlockNumber
			petersburgBlock?: BlockNumber
			istanbulBlock?: BlockNumber
			berlinBlock?: BlockNumber
			londonBlock?: BlockNumber
			parisBlock?: BlockNumber
			shanghaiBlock?: BlockNumber
			cancunBlock?: BlockNumber
		}
	}
	
	// Fork activation data
	forkData?: {
		forkType: 'soft' | 'hard' | 'contentious'
		forkName?: string
		forkHeight: BlockNumber
		activationHeight?: BlockNumber
		
		// Fork statistics
		supportPercentage?: Percentage
		oppositionBlocks?: number
		consensusReached?: boolean
		
		// Protocol changes
		protocolChanges: Array<{
			eip?: string
			name: string
			description: string
			impact: 'low' | 'medium' | 'high' | 'breaking'
		}>
	}
	
	// Reorg data
	reorgData?: {
		reorgDepth: number
		canonicalHash: Hash
		reorgedHash: Hash
		commonAncestor: BlockNumber
		
		// Affected transactions
		droppedTransactions: Hash[]
		replayedTransactions: Hash[]
		
		// Reorg metrics
		totalValueAffected: TokenAmount
		accountsAffected: number
		
		// Cause analysis
		reorgCause?: 'natural' | 'attack' | 'bug' | 'unknown'
		minersInvolved?: Address[]
	}
	
	// Merge transition data
	mergeData?: {
		transitionType: 'pos-activation' | 'difficulty-bomb' | 'final-pow'
		executionPayload?: Hash
		
		// Transition metrics
		powDifficulty?: string
		posEpoch?: number
		validatorCount?: number
		stakingRatio?: Percentage
		
		// Network changes
		issuanceReduction: Percentage
		energyReduction: Percentage
		securityModel: 'pow-pos-hybrid' | 'pure-pos'
	}
	
	// Transaction details
	transactions: Array<{
		hash: Hash
		from: Address
		to?: Address
		value: TokenAmount
		gasPrice?: string
		maxFeePerGas?: string
		maxPriorityFeePerGas?: string
		gasUsed: string
		status: boolean
		type: TransactionType
	}>
	
	// Uncle blocks (pre-merge)
	uncles?: Hash[]
	uncleCount?: number
	
	// Mev data
	mevData?: {
		isMevBlock: boolean
		mevReward?: TokenAmount
		mevGasPrice?: string
		bundleCount?: number
		builderAddress?: Address
		relayName?: string
	}
	
	// Blob data (EIP-4844)
	blobData?: {
		blobGasUsed: string
		excessBlobGas: string
		blobGasPrice: string
		blobCount: number
	}
	
	// Beacon chain data (post-merge)
	beaconData?: {
		slot: number
		epoch: number
		proposerIndex: number
		
		// Attestations
		attestationCount: number
		participationRate: Percentage
		
		// Validator activity
		slashingCount: number
		depositCount: number
		voluntaryExitCount: number
		
		// Sync committee
		syncCommitteeParticipation?: Percentage
		syncCommitteeRewards?: TokenAmount
		
		// Execution payload
		executionPayload?: {
			blockHash: Hash
			blockNumber: BlockNumber
			transactionCount: number
			gasUsed: TokenAmount
		}
	}
	
	// Entity References
	minerActor?: PartialExceptOneOf<Actor,
		| 'address'
		| 'type'
	>
	
	// For L2s
	sequencer?: PartialExceptOneOf<Actor,
		| 'address'
		| 'type'
	>
	
	// Parent/child blocks
	parentBlock?: PartialExceptOneOf<Block,
		| 'blockHash'
		| 'blockNumber'
	>
	
	childBlocks?: PartialExceptOneOf<Block,
		| 'blockHash'
		| 'blockNumber'
	>[]
	
	// Uncle blocks reference
	uncleBlocks?: PartialExceptOneOf<Block<BlockRole.Uncle>,
		| 'blockHash'
		| 'blockNumber'
	>[]
	
	// Transactions in block
	blockTransactions?: PartialExceptOneOf<import('./transaction').Transaction,
		| 'transactionId'
		| 'blockNumber'
	>[]
	
	// Events in block
	blockEvents?: PartialExceptOneOf<import('./event').Event,
		| 'id'
		| 'blockNumber'
	>[]
	
	// Validator/proposer (PoS)
	validator?: PartialExceptOneOf<import('./validator').Validator,
		| 'validatorIndex'
		| 'address'
	>
	
	// Beacon block reference (post-merge)
	beaconBlock?: PartialExceptOneOf<import('./beacon').BeaconData,
		| 'slot'
		| 'blockRoot'
	>
}

// Block analytics
export enum BlockAnalyticsTimeframe {
	OneHour = 'OneHour',
	OneDay = 'OneDay', 
	SevenDays = 'SevenDays',
	ThirtyDays = 'ThirtyDays'
}

export type BlockAnalytics = {
	chainId: ChainId
	timeframe: BlockAnalyticsTimeframe
	
	// Block production
	totalBlocks: number
	averageBlockTime: number // seconds
	blockTimeVariance: number
	emptyBlocks: number
	fullBlocks: number
	
	// Transaction metrics
	totalTransactions: number
	averageTransactionsPerBlock: number
	maxTransactionsInBlock: number
	
	// Gas metrics
	totalGasUsed: string
	averageGasUsed: string
	averageGasPrice: string
	averageBaseFee?: string
	totalBurntFees?: TokenAmount
	
	// Miner/validator distribution
	uniqueMiners: number
	topMiners: Array<{
		address: Address
		blockCount: number
		percentage: Percentage
		totalRewards: TokenAmount
	}>
	
	// Network health
	reorgCount: number
	uncleCount?: number
	propagationTime: {
		average: number
		p50: number
		p90: number
		p99: number
	}
	
	// Economic metrics
	totalRewards: TokenAmount
	averageReward: TokenAmount
	mevRewards?: TokenAmount
	
	// Performance indicators
	tps: number // transactions per second
	gasPerSecond: string
	stateGrowth?: number // bytes
}

export type BlockFilter = {
	// Chain filter
	chainIds?: ChainId[]
	
	// Block range
	blockRange?: {
		from: BlockNumber
		to: BlockNumber
	}
	
	// Time range
	timeRange?: {
		from: Timestamp
		to: Timestamp
	}
	
	// Block properties
	roles?: BlockRole[]
	status?: BlockStatus[]
	
	// Characteristics filters
	isGenesis?: boolean
	isEmpty?: boolean
	isFork?: boolean
	isMerge?: boolean
	hasUncles?: boolean
	hasReorg?: boolean
	hasBlobs?: boolean
	
	// Miner filter
	miners?: Address[]
	
	// Size filters
	minTransactions?: number
	maxTransactions?: number
	minGasUsed?: string
	maxGasUsed?: string
	
	// Special filters
	hasMev?: boolean
	
	// Pagination
	limit?: number
	offset?: number
	orderBy?: 'number' | 'timestamp' | 'gasUsed' | 'transactionCount'
	orderDirection?: 'asc' | 'desc'
}

export type BlockSummary = {
	chainId: ChainId
	blockNumber: BlockNumber
	blockHash: Hash
	timestamp: Timestamp
	
	// Quick stats
	transactionCount: number
	gasUsed: string
	baseFeePerGas?: string
	
	// Miner info
	miner: Address
	minerReward?: TokenAmount
	
	// Status
	status: BlockStatus
	confirmations: number
}

export type BlockConfirmation = {
	blockHash: Hash
	blockNumber: BlockNumber
	confirmations: number
	isFinalized: boolean
	
	// Reorg risk
	reorgRisk: 'low' | 'medium' | 'high'
	recommendedConfirmations: number
	
	// Fork detection
	isCanonical: boolean
	competingBlocks?: Array<{
		blockHash: Hash
		miner: Address
		totalDifficulty?: string
	}>
} 