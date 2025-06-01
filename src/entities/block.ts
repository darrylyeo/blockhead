import type { PartialExceptOneOf } from '../typescript/PartialExceptOneOf'
import type { Actor } from './actor'
import type { ChainId } from './network'
import type { Address, BasisPoints, Hash, Percentage, Timestamp, TokenAmount, UsdAmount, BlockNumber } from './scalars'

export type BlockHash = Hash

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
	Pow = 'Pow', // Proof of Work (pre-merge Ethereum)
	Pos = 'Pos', // Proof of Stake (post-merge Ethereum)
	Poa = 'Poa', // Proof of Authority
	PoaClique = 'PoaClique', // Clique PoA (Goerli, Sepolia)
	PoaBor = 'PoaBor', // Bor PoA (Polygon)
	PoaIbft = 'PoaIbft', // Istanbul BFT PoA
	PoaAura = 'PoaAura', // Aura PoA (Gnosis Chain)
	Tendermint = 'Tendermint', // Tendermint consensus (Cosmos chains)
	Layer2Sequencer = 'Layer2Sequencer', // L2 sequencer (Arbitrum, Optimism)
	Rollup = 'Rollup' // ZK-Rollup consensus
}

export enum BlockTransactionType {
	Type0Legacy = 'Type0Legacy', // Pre-EIP-2718 legacy transactions
	Type1AccessList = 'Type1AccessList', // EIP-2930 access list transactions
	Type2DynamicFee = 'Type2DynamicFee', // EIP-1559 dynamic fee transactions
	Type3Blob = 'Type3Blob', // EIP-4844 blob transactions
	Type4Eoa = 'Type4Eoa', // EIP-3074 authorized transactions (proposed)
	Deposit = 'Deposit', // L2 deposit transactions (Optimism)
	System = 'System' // System transactions (various L2s)
}

// Block characteristics (not mutually exclusive)
export type BlockCharacteristics = {
	isGenesis: boolean
	isEmpty: boolean
	isFork: boolean // Contains fork activation
	isMerge: boolean // Merge transition block (Paris upgrade)
	isShanghai: boolean // Shanghai upgrade block
	isCancun: boolean // Cancun upgrade block
	isDencun: boolean // Dencun upgrade (Cancun + Deneb)
	hasUncles: boolean
	hasReorg: boolean
	hasBlobs: boolean // EIP-4844 blob transactions
	hasBeaconRoots: boolean // EIP-4788 beacon block roots
	hasWithdrawals: boolean // EIP-4895 beacon chain withdrawals
}

// Block type with generic role parameter
export type Block<_BlockRole extends BlockRole = BlockRole> = {
	// Block identification
	chainId: ChainId
	blockNumber: BlockNumber
	blockHash: BlockHash
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

	// Miner/validator reward
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
			competingBlocks?: {
				hash: Hash
				miner: Address
				totalDifficulty?: string
			}[]
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
		premine?: {
			address: Address
			balance: TokenAmount
		}[]

		// Genesis parameters
		genesisTime: Timestamp
		genesisNonce: string
		genesisDifficulty: string

		// Chain configuration
		chainConfig: {
			chainId: ChainId

			// Homestead (EIP-2, EIP-7, EIP-8)
			homesteadBlock?: BlockNumber

			// DAO Fork
			daoForkBlock?: BlockNumber
			daoForkSupport?: boolean

			// Tangerine Whistle (EIP-150)
			eip150Block?: BlockNumber
			eip150Hash?: Hash

			// Spurious Dragon (EIP-155, EIP-160, EIP-161, EIP-170)
			eip155Block?: BlockNumber
			eip158Block?: BlockNumber

			// Byzantium (EIP-140, EIP-196, EIP-197, EIP-198, EIP-211, EIP-214, EIP-649, EIP-658)
			byzantiumBlock?: BlockNumber

			// Constantinople (EIP-145, EIP-1014, EIP-1052, EIP-1283)
			constantinopleBlock?: BlockNumber

			// Petersburg (reverts EIP-1283)
			petersburgBlock?: BlockNumber

			// Istanbul (EIP-152, EIP-1108, EIP-1344, EIP-1884, EIP-2028, EIP-2200)
			istanbulBlock?: BlockNumber

			// Muir Glacier (difficulty bomb delay)
			muirGlacierBlock?: BlockNumber

			// Berlin (EIP-2565, EIP-2718, EIP-2929, EIP-2930)
			berlinBlock?: BlockNumber

			// London (EIP-1559, EIP-3198, EIP-3529, EIP-3541, EIP-3554)
			londonBlock?: BlockNumber

			// Arrow Glacier (difficulty bomb delay)
			arrowGlacierBlock?: BlockNumber

			// Gray Glacier (difficulty bomb delay)
			grayGlacierBlock?: BlockNumber

			// Paris (The Merge - EIP-3675, EIP-4399)
			parisBlock?: BlockNumber
			terminalTotalDifficulty?: string
			terminalTotalDifficultyPassed?: boolean

			// Shanghai (EIP-3651, EIP-3855, EIP-3860, EIP-4895)
			shanghaiTime?: number // Unix timestamp for time-based forks

			// Cancun (EIP-1153, EIP-4788, EIP-4844, EIP-5656, EIP-6780, EIP-7516)
			cancunTime?: number

			// Upcoming forks
			pragueTime?: number // Verkle trees and more
			osakaTime?: number // Next major upgrade

			// L2 specific configs
			optimismConfig?: {
				bedrockBlock?: BlockNumber
				regolithTime?: number
				canyonTime?: number
			}

			arbitrumConfig?: {
				arbitrumChainId?: number
				nitroGenesisBlock?: BlockNumber
			}

			polygonConfig?: {
				jaipurBlock?: BlockNumber
				delhiBlock?: BlockNumber
				indoreBlock?: BlockNumber
			}
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
		protocolChanges: {
			eip?: string
			name: string
			description: string
			impact: 'low' | 'medium' | 'high' | 'breaking'
		}[]
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
	transactions: {
		hash: Hash
		from: Address
		to?: Address
		value: TokenAmount
		gasPrice?: string
		maxFeePerGas?: string
		maxPriorityFeePerGas?: string
		gasUsed: string
		status: boolean
		type: BlockTransactionType
	}[]

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

	_miner?: PartialExceptOneOf<Actor,
		| 'address'
	>

	// For L2s
	_sequencer?: PartialExceptOneOf<Actor,
		| 'address'
	>

	// Parent/child blocks
	_parentBlock?: PartialExceptOneOf<Block,
		| 'blockHash'
		| 'blockNumber'
	>

	_childBlocks?: PartialExceptOneOf<Block,
		| 'blockHash'
		| 'blockNumber'
	>[]

	// Uncle blocks reference
	_uncleBlocks?: PartialExceptOneOf<Block<BlockRole.Uncle>,
		| 'blockHash'
		| 'blockNumber'
	>[]

	// Transactions in block
	_transactions?: PartialExceptOneOf<import('./transaction').Transaction,
		| 'id'
	>[]

	// Events in block
	_events?: PartialExceptOneOf<import('./event').Event,
		| 'id'
	>[]

	// Validator/proposer (PoS)
	_validator?: PartialExceptOneOf<import('./validator').Validator,
		| 'index'
	>

	// Beacon block reference (post-merge)
	_beaconBlock?: PartialExceptOneOf<import('./beacon').BeaconData,
		| 'id'
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
	topMiners: {
		address: Address
		blockCount: number
		percentage: Percentage
		totalRewards: TokenAmount
	}[]

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
	blockHash: BlockHash
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
	blockHash: BlockHash
	blockNumber: BlockNumber
	confirmations: number
	isFinalized: boolean

	// Reorg risk
	reorgRisk: 'low' | 'medium' | 'high'
	recommendedConfirmations: number

	// Fork detection
	isCanonical: boolean
	competingBlocks?: {
		blockHash: BlockHash
		miner: Address
		totalDifficulty?: string
	}[]
} 