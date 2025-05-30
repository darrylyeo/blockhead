import type { PartialExceptOneOf } from '../typescript/PartialExceptOneOf.js'
import type { Address, Hash, Actor } from './address.js'
import type { ChainId } from './chain.js'
import type { Timestamp, BlockNumber, TokenAmount, USDAmount, Percentage, BasisPoints } from './types.js'
import type { AnyTransaction } from './transaction.js'

// Block types based on network consensus
export enum BlockType {
	Genesis = 'Genesis', // Genesis block
	Regular = 'Regular', // Regular block
	Uncle = 'Uncle', // Uncle block (Ethereum PoW)
	Fork = 'Fork', // Fork block
	Reorg = 'Reorg', // Reorganization block
	Empty = 'Empty', // Empty block (no transactions)
	Merge = 'Merge', // Merge transition block
	Beacon = 'Beacon' // Beacon chain block
}

export enum BlockStatus {
	Pending = 'Pending', // Block being mined
	Confirmed = 'Confirmed', // Block confirmed
	Finalized = 'Finalized', // Block finalized
	Orphaned = 'Orphaned', // Block orphaned
	Reorged = 'Reorged' // Block reorganized out
}

export enum ConsensusType {
	ProofOfWork = 'ProofOfWork', // PoW consensus
	ProofOfStake = 'ProofOfStake', // PoS consensus
	ProofOfAuthority = 'ProofOfAuthority', // PoA consensus
	ProofOfHistory = 'ProofOfHistory', // PoH consensus
	Hybrid = 'Hybrid' // Hybrid consensus
}

// Generic block type with type-specific fields
export type Block<_T extends BlockType = BlockType> = (
	& {
		// Block identification
		id: string
		chainId: ChainId
		type: _T
		status: BlockStatus
		consensus: ConsensusType
		
		// Block identification
		number: BlockNumber
		hash: Hash
		parentHash: Hash
		
		// Timing
		timestamp: Timestamp
		
		// Block structure
		transactionCount: number
		size: number // bytes
		gasLimit: TokenAmount
		gasUsed: TokenAmount
		gasUtilization: Percentage
		
		// Base fee (EIP-1559)
		baseFeePerGas?: TokenAmount
		
		// Blob gas (EIP-4844)
		blobGasUsed?: number
		excessBlobGas?: number
		
		// Block metadata
		extraData?: string
		logsBloom?: Hash
		receiptsRoot?: Hash
		stateRoot?: Hash
		transactionsRoot?: Hash
		withdrawalsRoot?: Hash
		
		// Network context
		networkDifficulty?: string
		networkHashRate?: string
		blockTime?: number // seconds
		
		// Processing metrics
		processingTime?: number
		propagationTime?: number
		orphanRisk?: Percentage
	}

	& (
		_T extends BlockType.Genesis ?
			{
				// Genesis block data
				genesisData: {
					chainId: ChainId
					networkName: string
					genesisTime: Timestamp
					
					// Initial allocations
					preAllocations: Array<{
						address: Address
						balance: TokenAmount
						nonce?: number
					}>
					
					// Genesis parameters
					initialDifficulty?: string
					gasLimit: TokenAmount
					
					// Network configuration
					networkConfig: {
						homesteadBlock?: number
						daoForkBlock?: number
						eip150Block?: number
						eip155Block?: number
						eip158Block?: number
						byzantiumBlock?: number
						constantinopleBlock?: number
						petersburgBlock?: number
						istanbulBlock?: number
						berlinBlock?: number
						londonBlock?: number
						mergeBlock?: number
						shanghaiBlock?: number
						cancunBlock?: number
					}
				}
			}

		: _T extends BlockType.Regular ?
			{
				// Regular block data
				regularData: {
					// Transaction summary
					transactionTypes: Record<string, number>
					uniqueSenders: number
					uniqueReceivers: number
					
					// Value flows
					totalValueTransferred: TokenAmount
					totalFeesPaid: TokenAmount
					averageGasPrice: TokenAmount
					
					// Block rewards
					blockReward?: TokenAmount
					transactionFees: TokenAmount
					burntFees?: TokenAmount // EIP-1559
					
					// MEV analysis
					mevData?: {
						extractedValue: TokenAmount
						mevBlocks: number
						flashloanVolume: TokenAmount
						arbitrageProfit: TokenAmount
						sandwichAttacks: number
					}
					
					// DeFi activity
					defiActivity?: {
						dexVolume: TokenAmount
						lendingVolume: TokenAmount
						yieldFarmingRewards: TokenAmount
						liquidations: number
						newPools: number
					}
					
					// NFT activity
					nftActivity?: {
						sales: number
						volume: TokenAmount
						uniqueCollections: number
						mints: number
						transfers: number
					}
				}
			}

		: _T extends BlockType.Uncle ?
			{
				// Uncle block data (Ethereum PoW)
				uncleData: {
					uncleHeight: number
					uncleReward: TokenAmount
					nephewHash: Hash
					nephewHeight: number
					
					// Uncle context
					uncleIndex: number
					generationGap: number
					
					// Mining details
					uncleTimestamp: Timestamp
					timeDifference: number
					hashRateLoss: Percentage
				}
			}

		: _T extends BlockType.Fork ?
			{
				// Fork block data
				forkData: {
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
			}

		: _T extends BlockType.Reorg ?
			{
				// Reorganization block data
				reorgData: {
					reorgDepth: number
					reorgType: 'short' | 'long' | 'deep'
					previousHash: Hash
					newHash: Hash
					
					// Reorg impact
					affectedTransactions: number
					reversedTransactions: Hash[]
					lostValue: TokenAmount
					
					// Reorg cause
					reorgCause?: 'mining-variance' | 'network-split' | 'attack' | 'client-bug'
					attackType?: '51%' | 'selfish-mining' | 'eclipse' | 'other'
					
					// Recovery metrics
					recoveryTime: number
					networkStability: Percentage
				}
			}

		: _T extends BlockType.Empty ?
			{
				// Empty block data
				emptyData: {
					reason: 'no-transactions' | 'strategy' | 'network-congestion' | 'technical'
					emptyDuration: number
					
					// Mining context
					wasProfitable: boolean
					opportunityCost?: TokenAmount
					
					// Network impact
					capacityWasted: Percentage
					userExperience: 'positive' | 'neutral' | 'negative'
				}
			}

		: _T extends BlockType.Merge ?
			{
				// Merge transition block data
				mergeData: {
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
			}

		: _T extends BlockType.Beacon ?
			{
				// Beacon chain block data
				beaconData: {
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
			}

		:
			{}
	)

	& {
		// --
		// Entity References (using PartialExceptOneOf)
		miner?: PartialExceptOneOf<Actor,
			| 'address'
			| 'type'
		>
		
		// For PoS blocks
		proposer?: PartialExceptOneOf<Actor,
			| 'address'
			| 'type'
		>
		
		parentBlock?: PartialExceptOneOf<Block,
			| 'number'
			| 'hash'
			| 'timestamp'
		>
		
		childBlocks?: PartialExceptOneOf<Block,
			| 'number'
			| 'hash'
			| 'timestamp'
		>[]
		
		// Uncle blocks (for PoW)
		uncleBlocks?: PartialExceptOneOf<Block<BlockType.Uncle>,
			| 'number'
			| 'hash'
			| 'uncleData'
		>[]
		
		// Block transactions
		transactions?: PartialExceptOneOf<import('./transaction.js').Transaction,
			| 'transactionId'
			| 'type'
			| 'status'
			| 'timestamp'
		>[]
		
		// Block events
		events?: PartialExceptOneOf<import('./event.js').Event,
			| 'id'
			| 'category'
			| 'timestamp'
		>[]
		
		// Block transfers
		transfers?: PartialExceptOneOf<import('./transfer.js').Transfer,
			| 'id'
			| 'category'
			| 'timestamp'
		>[]
		
		// Block traces
		traces?: PartialExceptOneOf<import('./trace.js').Trace,
			| 'id'
			| 'type'
			| 'timestamp'
		>[]
		
		// Related blocks
		relatedBlocks?: PartialExceptOneOf<Block,
			| 'number'
			| 'hash'
			| 'type'
			| 'timestamp'
		>[]
	}
)

// Convenience type aliases
export type GenesisBlock = Block<BlockType.Genesis>
export type RegularBlock = Block<BlockType.Regular>
export type UncleBlock = Block<BlockType.Uncle>
export type ForkBlock = Block<BlockType.Fork>
export type ReorgBlock = Block<BlockType.Reorg>
export type EmptyBlock = Block<BlockType.Empty>
export type MergeBlock = Block<BlockType.Merge>
export type BeaconBlock = Block<BlockType.Beacon>

export type AnyBlock = Block<BlockType>

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
	
	// Block production metrics
	totalBlocks: number
	averageBlockTime: number
	blockTimeVariance: number
	orphanRate: Percentage
	
	// Type breakdown
	byType: Record<BlockType, {
		count: number
		percentage: Percentage
		averageSize: number
		averageGasUsed: TokenAmount
	}>
	
	// Status distribution
	byStatus: Record<BlockStatus, {
		count: number
		percentage: Percentage
	}>
	
	// Consensus metrics
	consensusHealth: {
		finalizationRate: Percentage
		averageFinalizationTime: number
		reorgFrequency: number
		consensusParticipation: Percentage
	}
	
	// Network performance
	networkPerformance: {
		averageBlockSize: number
		gasUtilization: Percentage
		transactionThroughput: number
		networkCapacity: Percentage
		
		performanceByHour: Array<{
			hour: number
			blockCount: number
			averageBlockTime: number
			gasUtilization: Percentage
		}>
	}
	
	// Economic metrics
	economics: {
		totalBlockRewards: TokenAmount
		totalTransactionFees: TokenAmount
		totalBurntFees?: TokenAmount
		averageFeePerBlock: TokenAmount
		minerRevenue: TokenAmount
		
		feeMarket: {
			averageBaseFee?: TokenAmount
			baseFeeVolatility?: Percentage
			priorityFeeShare?: Percentage
		}
	}
	
	// MEV analysis
	mevAnalysis?: {
		totalMevExtracted: TokenAmount
		mevPerBlock: TokenAmount
		mevBlocks: number
		mevRate: Percentage
		
		mevTypes: {
			arbitrage: TokenAmount
			sandwich: TokenAmount
			liquidation: TokenAmount
			other: TokenAmount
		}
	}
}

export type BlockFilter = {
	// Basic filters
	types?: BlockType[]
	statuses?: BlockStatus[]
	consensus?: ConsensusType[]
	miners?: Address[]
	proposers?: Address[]
	
	// Block range
	fromBlock?: BlockNumber
	toBlock?: BlockNumber
	blockNumbers?: BlockNumber[]
	
	// Time range
	fromTimestamp?: Timestamp
	toTimestamp?: Timestamp
	
	// Size and gas filters
	minSize?: number
	maxSize?: number
	minGasUsed?: TokenAmount
	maxGasUsed?: TokenAmount
	gasUtilizationRange?: {
		min: Percentage
		max: Percentage
	}
	
	// Transaction filters
	minTransactions?: number
	maxTransactions?: number
	hasTransactions?: boolean
	
	// Economic filters
	minBlockReward?: TokenAmount
	maxBlockReward?: TokenAmount
	minTotalFees?: TokenAmount
	maxTotalFees?: TokenAmount
	
	// Advanced filters
	hasUncles?: boolean
	hasMev?: boolean
	isEmpty?: boolean
	isReorged?: boolean
	
	// Pagination and sorting
	limit?: number
	offset?: number
	orderBy?: 'number' | 'timestamp' | 'gasUsed' | 'size' | 'transactionCount'
	orderDirection?: 'asc' | 'desc'
}

export type BlockReward = {
	blockNumber: BlockNumber
	blockHash: Hash
	chainId: ChainId
	
	// Reward breakdown
	baseReward: TokenAmount
	uncleReward?: TokenAmount
	transactionFees: TokenAmount
	mevReward?: TokenAmount
	totalReward: TokenAmount
	
	// Reward distribution
	miner: Address
	minerShare: TokenAmount
	poolShare?: TokenAmount
	devFeeShare?: TokenAmount
	burnedAmount?: TokenAmount
	
	// Reward context
	rewardType: 'pow' | 'pos' | 'hybrid'
	difficulty?: string
	validatorIndex?: number
	
	// Economic context
	rewardValue: USDAmount
	profitability: Percentage
	operatingCost?: USDAmount
	netProfit?: USDAmount
	
	// Market impact
	marketPrice: USDAmount
	sellPressure?: USDAmount
	hodlRatio?: Percentage
}

export type BlockProduction = {
	chainId: ChainId
	producer: Address
	
	// Production metrics
	blocksProduced: number
	totalRewards: TokenAmount
	averageBlockTime: number
	successRate: Percentage
	
	// Performance metrics
	efficiency: {
		gasUtilization: Percentage
		transactionInclusion: Percentage
		mevCapture?: Percentage
		profitability: Percentage
	}
	
	// Time distribution
	productionSchedule: Array<{
		timestamp: Timestamp
		blockNumber: BlockNumber
		blockTime: number
		gasUsed: TokenAmount
		reward: TokenAmount
	}>
	
	// Competition analysis
	marketShare: Percentage
	dominanceRisk: 'low' | 'medium' | 'high' | 'critical'
	
	// Equipment/stake info
	infrastructure?: {
		hashRate?: string // For PoW
		stakeAmount?: TokenAmount // For PoS
		delegatedStake?: TokenAmount
		commission?: Percentage
		
		// Performance
		uptime: Percentage
		missedBlocks: number
		slashingHistory?: Array<{
			timestamp: Timestamp
			reason: string
			penalty: TokenAmount
		}>
	}
}

export type BlockHealth = {
	chainId: ChainId
	assessmentTime: Timestamp
	
	// Health metrics
	overallHealth: Percentage
	healthGrade: 'A' | 'B' | 'C' | 'D' | 'F'
	
	// Performance indicators
	performance: {
		blockTime: {
			current: number
			target: number
			variance: Percentage
			trend: 'improving' | 'stable' | 'degrading'
		}
		
		gasUtilization: {
			current: Percentage
			optimal: Percentage
			efficiency: Percentage
			congestion: 'low' | 'medium' | 'high'
		}
		
		finalization: {
			rate: Percentage
			averageTime: number
			reliability: Percentage
		}
	}
	
	// Security indicators
	security: {
		consensusParticipation: Percentage
		decentralization: Percentage
		attackResistance: Percentage
		
		risks: Array<{
			type: 'centralization' | 'coordination' | 'technical' | 'economic'
			severity: 'low' | 'medium' | 'high' | 'critical'
			description: string
			likelihood: Percentage
		}>
	}
	
	// Economic health
	economics: {
		feeMarketHealth: Percentage
		inflationRate: Percentage
		validatorProfitability?: Percentage
		minerProfitability?: Percentage
		
		sustainabilityScore: Percentage
		economicSecurity: TokenAmount
	}
	
	// Network effects
	adoption: {
		transactionGrowth: Percentage
		activeAddresses: number
		developerActivity: Percentage
		ecosystemGrowth: Percentage
	}
	
	// Recommendations
	recommendations: Array<{
		category: 'performance' | 'security' | 'economics' | 'governance'
		priority: 'low' | 'medium' | 'high' | 'critical'
		action: string
		expectedImpact: string
		timeframe: string
	}>
} 