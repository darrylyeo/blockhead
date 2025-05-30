import type { Address, Hash } from './address.js'
import type { ChainId } from './chain.js'
import type { Timestamp, NativeCurrencyAmount, BlockNumber, TransactionId, TokenAmount, USDAmount, Percentage, BasisPoints } from './types.js'

// dApp categories following EIP-7509 Entity Component System
export enum AppCategory {
	DeFi = 'DeFi', // Decentralized Finance
	NFT = 'NFT', // Non-Fungible Tokens
	Gaming = 'Gaming', // Blockchain Gaming
	Social = 'Social', // Social Networks
	DAO = 'DAO', // Decentralized Autonomous Organizations
	Identity = 'Identity', // Identity & Reputation
	Infrastructure = 'Infrastructure', // Protocol Infrastructure
	Analytics = 'Analytics', // Data & Analytics
	Developer = 'Developer', // Developer Tools
	Marketplace = 'Marketplace', // Marketplaces
	Bridge = 'Bridge', // Cross-chain Bridges
	Wallet = 'Wallet', // Wallet Applications
	Oracle = 'Oracle', // Oracle Services
	Privacy = 'Privacy', // Privacy Tools
	Governance = 'Governance', // Governance Platforms
	Education = 'Education', // Educational Platforms
	Media = 'Media', // Media & Content
	RealEstate = 'RealEstate', // Real Estate
	Supply = 'Supply', // Supply Chain
	Insurance = 'Insurance' // Insurance
}

// DeFi Protocol Types based on common standards
export enum DeFiProtocolType {
	ERC4626 = 'ERC4626', // Tokenized Vaults
	ERC3156 = 'ERC3156', // Flash Loans
	ERC2612 = 'ERC2612', // Permit (Meta Transactions)
	ERC1155 = 'ERC1155', // Multi-Token (for LP tokens)
	ERC4337 = 'ERC4337', // Account Abstraction
	CompoundV2 = 'CompoundV2',
	CompoundV3 = 'CompoundV3',
	AaveV2 = 'AaveV2',
	AaveV3 = 'AaveV3',
	UniswapV2 = 'UniswapV2',
	UniswapV3 = 'UniswapV3',
	UniswapV4 = 'UniswapV4',
	CurveV1 = 'CurveV1',
	CurveV2 = 'CurveV2',
	BalancerV2 = 'BalancerV2',
	Sushiswap = 'Sushiswap',
	PancakeswapV2 = 'PancakeswapV2',
	PancakeswapV3 = 'PancakeswapV3',
	OneInchV5 = 'OneInchV5',
	OneInchV6 = 'OneInchV6',
	YearnV2 = 'YearnV2',
	YearnV3 = 'YearnV3',
	MakerDAO = 'MakerDAO',
	Lido = 'Lido',
	RocketPool = 'RocketPool',
	GMXV1 = 'GMXV1',
	GMXV2 = 'GMXV2'
}

export enum DeFiCategory {
	DEX = 'DEX', // Decentralized Exchange
	Lending = 'Lending', // Lending Protocol
	Yield = 'Yield', // Yield Farming
	Derivatives = 'Derivatives', // Derivatives Trading
	Insurance = 'Insurance', // DeFi Insurance
	Staking = 'Staking', // Liquid Staking
	Bridge = 'Bridge', // Cross-chain Bridge
	Payments = 'Payments', // Payment Rails
	DAO = 'DAO', // Decentralized Autonomous Organization
	Launchpad = 'Launchpad', // Token Launch Platform
	NFTFI = 'NFTFI', // NFT Finance
	RealWorldAssets = 'RealWorldAssets', // RWA Protocols
	Privacy = 'Privacy' // Privacy Protocols
}

// EIP-7509 Entity Component System integration
export enum ECSComponent {
	Position = 'Position', // Spatial positioning
	Renderable = 'Renderable', // Visual representation
	Physics = 'Physics', // Physics properties
	Inventory = 'Inventory', // Item management
	Stats = 'Stats', // Character statistics
	Ownership = 'Ownership', // Asset ownership
	Metadata = 'Metadata', // Entity metadata
	Behavior = 'Behavior', // AI/Logic behavior
	Network = 'Network', // Network state
	Economy = 'Economy' // Economic properties
}

// Liquidity Pool types based on AMM models
export enum AMMType {
	ConstantProduct = 'ConstantProduct', // Uniswap V2 x*y=k
	ConstantSum = 'ConstantSum', // x+y=k
	ConstantMean = 'ConstantMean', // Balancer weighted pools
	StableSwap = 'StableSwap', // Curve stable pools
	ConcentratedLiquidity = 'ConcentratedLiquidity', // Uniswap V3
	HooksBased = 'HooksBased', // Uniswap V4
	Hybrid = 'Hybrid', // Curve V2
	Orderbook = 'Orderbook' // dYdX style
}

export enum YieldFarmType {
	Single = 'Single',
	Pair = 'Pair',
	MultiAsset = 'MultiAsset'
}

export enum RewardType {
	Token = 'Token',
	NFT = 'NFT',
	Hybrid = 'Hybrid'
}

export enum DerivativeType {
	Perpetual = 'Perpetual', // Perpetual futures
	Options = 'Options', // Options contracts
	Futures = 'Futures', // Futures contracts
	StructuredProducts = 'StructuredProducts', // Complex derivatives
	SyntheticAssets = 'SyntheticAssets', // Synthetic tokens
	PredictionMarkets = 'PredictionMarkets' // Betting markets
}

export enum DeFiPositionType {
	Supply = 'Supply',
	Borrow = 'Borrow',
	Stake = 'Stake',
	Farm = 'Farm',
	Trade = 'Trade'
}

export enum BridgeType {
	LockMint = 'LockMint',
	BurnMint = 'BurnMint',
	Liquidity = 'Liquidity',
	Optimistic = 'Optimistic',
	ZKProof = 'ZKProof'
}

export enum VotingType {
	Token = 'Token',
	NFT = 'NFT',
	Quadratic = 'Quadratic',
	Delegated = 'Delegated'
}

export enum ProposalStatus {
	Pending = 'Pending',
	Active = 'Active',
	Succeeded = 'Succeeded',
	Defeated = 'Defeated',
	Queued = 'Queued',
	Executed = 'Executed',
	Cancelled = 'Cancelled'
}

// Supporting types for DeFi
export type LiquidityPool = {
	address: Address
	chainId: ChainId
	protocol: DeFiProtocolType
	ammType: AMMType
	
	// Pool composition
	tokens: Address[]
	reserves: TokenAmount[]
	weights?: number[] // For weighted pools
	
	// Pool token (LP token)
	lpToken: Address
	totalSupply: TokenAmount
	
	// Pool metrics
	tvl: TokenAmount
	volume24h: TokenAmount
	fees24h: TokenAmount
	apr: Percentage
	apy: Percentage
	
	// Pool parameters
	feeRate: BasisPoints
	adminFee?: BasisPoints
	slippageTolerances: {
		low: Percentage
		medium: Percentage
		high: Percentage
	}
	
	// Concentrated liquidity (V3/V4)
	tickSpacing?: number
	currentTick?: number
	sqrtPriceX96?: string
	liquidity?: TokenAmount
	
	// Pool state
	isActive: boolean
	isPaused?: boolean
	createdAt: Timestamp
	lastUpdated: Timestamp
}

export type YieldFarm = {
	address: Address
	chainId: ChainId
	protocol: DeFiProtocolType
	type: YieldFarmType
	rewardType: RewardType
	
	// Staking details
	stakingToken: Address
	stakingTokenSymbol: string
	minimumStake?: TokenAmount
	lockPeriod?: number // seconds
	
	// Rewards
	rewardTokens: Address[]
	rewardRates: TokenAmount[] // per second
	totalRewards: TokenAmount
	distributedRewards: TokenAmount
	
	// Pool metrics
	totalStaked: TokenAmount
	totalStakers: number
	apr: Percentage
	apy: Percentage
	
	// Time bounds
	startTime: Timestamp
	endTime?: Timestamp
	lastRewardTime: Timestamp
	
	// Boosts and multipliers
	boostMultipliers?: Array<{
		condition: string
		multiplier: number
	}>
}

export type LendingMarket = {
	asset: Address
	aToken?: Address // Interest bearing token (Aave style)
	cToken?: Address // Compound token
	vaultToken?: Address // ERC-4626 vault token
	
	protocol: DeFiProtocolType
	
	// Interest rates
	supplyRate: Percentage
	borrowRate: Percentage
	utilizationRate: Percentage
	
	// Market parameters
	collateralFactor: Percentage
	liquidationThreshold: Percentage
	liquidationPenalty: Percentage
	reserveFactor: Percentage
	
	// Market state
	totalSupply: TokenAmount
	totalBorrow: TokenAmount
	totalReserves: TokenAmount
	exchangeRate?: TokenAmount // For cTokens
	
	// Risk assessment
	riskLevel: 'low' | 'medium' | 'high' | 'critical'
	volatility: Percentage
	
	// Caps and limits
	supplyCap?: TokenAmount
	borrowCap?: TokenAmount
	
	// Market status
	isActive: boolean
	isCollateral: boolean
	isFrozen: boolean
	isPaused: boolean
}

export type DerivativeContract = {
	address: Address
	chainId: ChainId
	type: DerivativeType
	protocol: DeFiProtocolType
	
	// Contract details
	underlying: Address
	strikePrice?: TokenAmount
	expirationDate?: Timestamp
	
	// Trading metrics
	openInterest: TokenAmount
	volume24h: TokenAmount
	fundingRate?: Percentage // For perpetuals
	
	// Risk metrics
	impliedVolatility?: Percentage
	delta?: number
	gamma?: number
	theta?: number
	vega?: number
	
	// Market state
	markPrice: TokenAmount
	indexPrice: TokenAmount
	lastPrice: TokenAmount
	
	// Margin and collateral
	initialMargin?: Percentage
	maintenanceMargin?: Percentage
	acceptedCollateral: Address[]
}

export type DeFiPosition = {
	id: string
	user: Address
	protocol: DeFiProtocolType
	type: DeFiPositionType
	
	// Position details
	asset: Address
	amount: TokenAmount
	usdValue: USDAmount
	
	// Returns and performance
	apy: Percentage
	rewards?: Array<{
		token: Address
		amount: TokenAmount
		usdValue: USDAmount
	}>
	
	// Risk metrics
	healthFactor?: number
	liquidationPrice?: TokenAmount
	liquidationRisk: 'safe' | 'moderate' | 'high' | 'critical'
	
	// Time tracking
	openedAt: Timestamp
	lastUpdated: Timestamp
	
	// Transaction history
	history: Array<{
		action: 'open' | 'increase' | 'decrease' | 'close' | 'liquidate'
		amount: TokenAmount
		timestamp: Timestamp
		transaction: Hash
	}>
}

export type FeeStructure = {
	tradingFee?: BasisPoints
	protocolFee?: BasisPoints
	lpFee?: BasisPoints
	governanceFee?: BasisPoints
	performanceFee?: BasisPoints
	managementFee?: BasisPoints
	withdrawalFee?: BasisPoints
	
	// Dynamic fees
	isDynamicFees: boolean
	feeModel?: 'fixed' | 'tiered' | 'volume-based' | 'time-based'
	
	// Fee distribution
	feeRecipients?: Array<{
		recipient: Address
		percentage: Percentage
	}>
}

export type FlashLoanProvider = {
	address: Address
	chainId: ChainId
	protocol: DeFiProtocolType
	
	// Supported assets
	supportedAssets: Address[]
	maxFlashLoan: Record<Address, TokenAmount>
	
	// Fee structure
	flashFee: BasisPoints
	feeToken?: Address // If different from borrowed asset
	
	// Provider state
	isActive: boolean
	totalFlashLoaned: TokenAmount
	flashLoanCount: number
}

export type BridgeProtocol = {
	address: Address
	sourceChain: ChainId
	targetChain: ChainId
	type: BridgeType
	protocol: DeFiProtocolType
	
	// Bridge metrics
	tvl: TokenAmount
	volume24h: TokenAmount
	totalTransactions: number
	
	// Supported assets
	supportedAssets: Array<{
		source: Address
		target: Address
		minTransfer: TokenAmount
		maxTransfer: TokenAmount
		fee: BasisPoints
	}>
	
	// Security
	validators?: Address[]
	guardians?: Address[]
	challengePeriod?: number
	
	// Bridge state
	isActive: boolean
	isPaused: boolean
	lastUpdate: Timestamp
}

export type DAOGovernance = {
	address: Address
	chainId: ChainId
	protocol: DeFiProtocolType
	votingType: VotingType
	
	// Governance token
	governanceToken: Address
	totalSupply: TokenAmount
	circulatingSupply: TokenAmount
	
	// Voting parameters
	proposalThreshold: TokenAmount
	quorumThreshold: Percentage
	votingPeriod: number // blocks
	executionDelay: number // blocks
	
	// Delegation
	supportsDelegation: boolean
	totalDelegated?: TokenAmount
	topDelegates?: Array<{
		delegate: Address
		votingPower: TokenAmount
		delegatorCount: number
	}>
	
	// Treasury
	treasury: Address
	treasuryValue: TokenAmount
	treasuryAssets: Array<{
		asset: Address
		amount: TokenAmount
		usdValue: USDAmount
	}>
}

export type DAOProposal = {
	id: string
	dao: Address
	proposer: Address
	status: ProposalStatus
	
	// Proposal content
	title: string
	description: string
	targets: Address[]
	values: TokenAmount[]
	calldatas: string[]
	
	// Voting details
	votesFor: TokenAmount
	votesAgainst: TokenAmount
	votesAbstain: TokenAmount
	quorum: TokenAmount
	
	// Timing
	startBlock: BlockNumber
	endBlock: BlockNumber
	executionETA?: Timestamp
	
	// Execution
	executionTransaction?: Hash
	executionTimestamp?: Timestamp
}

// Generic App type with category-specific fields
export type App<_T extends AppCategory = AppCategory> = (
	& {
		// App identification
		id: string
		name: string
		description: string
		category: _T
		
		// Contract addresses
		contracts: Address[]
		mainContract: Address
		chainId: ChainId
		
		// App metadata
		website?: string
		documentation?: string
		github?: string
		twitter?: string
		discord?: string
		
		// Version and deployment
		version: string
		deployedAt: Timestamp
		lastUpdated: Timestamp
		
		// Verification status
		isVerified: boolean
		auditReports?: Array<{
			auditor: string
			date: Timestamp
			reportUrl: string
			score?: number
		}>
		
		// Usage metrics
		metrics: {
			totalUsers: number
			activeUsers24h: number
			activeUsers7d: number
			activeUsers30d: number
			totalTransactions: number
			totalVolume: TokenAmount
			totalValueLocked?: TokenAmount
		}
		
		// Integration info
		integrations: Array<{
			protocol: Address
			protocolName: string
			integrationType: 'oracle' | 'bridge' | 'lending' | 'dex' | 'other'
		}>
		
		// Governance
		governance?: {
			governanceToken?: Address
			daoAddress?: Address
			votingMechanism?: 'token' | 'nft' | 'reputation'
		}
	}

	& (
		_T extends AppCategory.DeFi ?
			{
				// DeFi specific metrics
				defiMetrics: {
					totalValueLocked: TokenAmount
					volume24h: TokenAmount
					fees24h: TokenAmount
					yieldGenerated: TokenAmount
					
					// Protocol breakdown
					protocolTypes: Array<{
						type: DeFiCategory
						tvl: TokenAmount
						volume: TokenAmount
					}>
					
					// Risk metrics
					riskScore: number
					auditScore: number
					timeInMarket: number
				}
				
				// DeFi protocol details
				protocolType: DeFiProtocolType
				defiCategory: DeFiCategory
				
				// Protocol metadata
				protocolWebsite?: string
				protocolDocumentation?: string
				protocolGovernance?: Address
				protocolTreasury?: Address
				
				// Economic metrics
				tvl: TokenAmount // Total Value Locked
				volume24h?: TokenAmount
				fees24h?: TokenAmount
				revenue24h?: TokenAmount
				
				// Security and audits
				audits: Array<{
					auditor: string
					date: Timestamp
					reportUrl?: string
					score?: number
				}>
				
				// Governance
				governanceToken?: Address
				votingPower?: 'token-based' | 'nft-based' | 'hybrid'
				proposalThreshold?: TokenAmount
				
				// Integration info
				supportedTokens: Address[]
				whitelistedTokens?: Address[]
				feeStructure: FeeStructure
				
				// Supported assets
				supportedAssets: Array<{
					token: Address
					symbol: string
					pools?: Address[]
					apr?: Percentage
					risk?: 'low' | 'medium' | 'high'
				}>
				
				// DeFi protocol components
				liquidityPools?: LiquidityPool[]
				yieldFarms?: YieldFarm[]
				lendingMarkets?: LendingMarket[]
				derivatives?: DerivativeContract[]
				bridges?: BridgeProtocol[]
				daoGovernance?: DAOGovernance
			}

		: _T extends AppCategory.NFT ?
			{
				// NFT specific metrics
				nftMetrics: {
					totalCollections: number
					totalNFTs: number
					floorPriceAverage: USDAmount
					volume24h: TokenAmount
					royaltiesGenerated: TokenAmount
					
					// Collection breakdown
					topCollections: Array<{
						collection: Address
						name: string
						floorPrice: USDAmount
						volume24h: TokenAmount
						holders: number
					}>
					
					// Marketplace features
					features: Array<'minting' | 'trading' | 'auctions' | 'fractionalization' | 'lending'>
				}
				
				// Creator tools
				creatorTools?: {
					launchpadSupport: boolean
					royaltyManagement: boolean
					metadataTools: boolean
					communityFeatures: boolean
				}
			}

		: _T extends AppCategory.Gaming ?
			{
				// Gaming specific metrics
				gameMetrics: {
					totalPlayers: number
					activePlayers24h: number
					averageSessionTime: number
					retentionRate7d: Percentage
					revenueGenerated: TokenAmount
					
					// Game economy
					gameAssets: Array<{
						assetType: 'character' | 'item' | 'land' | 'currency' | 'cosmetic'
						totalSupply: number
						averagePrice: TokenAmount
						tradingVolume24h: TokenAmount
					}>
				}
				
				// EIP-7509 ECS integration
				ecsSystem?: {
					entities: Array<{
						entityId: string
						components: ECSComponent[]
						onChainData: boolean
					}>
					
					// Component definitions
					componentRegistry: Record<ECSComponent, {
						updateFrequency: 'realtime' | 'batched' | 'manual'
						storageType: 'onchain' | 'ipfs' | 'centralized'
					}>
					
					// Game state
					worldState: {
						totalEntities: number
						activeEntities: number
						lastStateUpdate: Timestamp
						stateRoot?: Hash
					}
				}
				
				// Play-to-earn mechanics
				playToEarn?: {
					rewardTokens: Address[]
					earningMechanisms: Array<'gameplay' | 'staking' | 'tournaments' | 'achievements'>
					averageEarningsPerHour: TokenAmount
					totalRewardsDistributed: TokenAmount
				}
			}

		: _T extends AppCategory.Social ?
			{
				// Social metrics
				socialMetrics: {
					totalUsers: number
					activeUsers24h: number
					totalPosts: number
					totalInteractions: number
					
					// Content breakdown
					contentTypes: Array<{
						type: 'text' | 'image' | 'video' | 'audio' | 'nft'
						count: number
						engagement: number
					}>
					
					// Network effects
					averageConnections: number
					communityCount: number
					influencerCount: number
				}
				
				// Monetization
				monetization?: {
					creatorRewards: TokenAmount
					platformFees: TokenAmount
					tippingVolume: TokenAmount
					subscriptionRevenue: TokenAmount
				}
				
				// Content moderation
				moderation: {
					isDecentralized: boolean
					moderationDAO?: Address
					reportingMechanism: boolean
					contentFiltering: Array<'spam' | 'nsfw' | 'hate' | 'misinformation'>
				}
			}

		: _T extends AppCategory.DAO ?
			{
				// DAO metrics
				daoMetrics: {
					totalDAOs: number
					totalMembers: number
					totalProposals: number
					totalTreasuryValue: TokenAmount
					
					// Governance activity
					proposalsPerMonth: number
					averageParticipation: Percentage
					averageExecutionTime: number
					
					// DAO types
					daoTypes: Array<{
						type: 'investment' | 'protocol' | 'social' | 'service' | 'collector'
						count: number
						totalValue: TokenAmount
					}>
				}
				
				// Governance tools
				governanceTools: {
					votingMechanisms: Array<VotingType>
					proposalTypes: Array<'parameter' | 'treasury' | 'upgrade' | 'membership'>
					executionMethods: Array<'timelock' | 'multisig' | 'optimistic' | 'immediate'>
					delegationSupport: boolean
				}
				
				// Treasury management
				treasuryFeatures?: {
					assetManagement: boolean
					yieldGeneration: boolean
					diversificationTools: boolean
					riskManagement: boolean
				}
			}

		:
			{}
	)
)

// Convenience type aliases
export type DeFiApp = App<AppCategory.DeFi>
export type NFTApp = App<AppCategory.NFT>
export type GamingApp = App<AppCategory.Gaming>
export type SocialApp = App<AppCategory.Social>
export type DAOApp = App<AppCategory.DAO>

export type AnyApp = App<AppCategory>

export enum EcosystemAnalyticsTimeframe {
	OneDay = 'OneDay',
	SevenDays = 'SevenDays',
	ThirtyDays = 'ThirtyDays',
	All = 'All'
}

export type EcosystemAnalytics = {
	chainId: ChainId
	timeframe: EcosystemAnalyticsTimeframe
	
	// Ecosystem overview
	overview: {
		totalApps: number
		activeApps: number
		newApps: number
		totalUsers: number
		totalTransactions: number
		totalVolume: TokenAmount
	}
	
	// Category breakdown
	byCategory: Record<AppCategory, {
		appCount: number
		userCount: number
		volume: TokenAmount
		growth: Percentage
	}>
	
	// Top performers
	topApps: Array<{
		app: string
		category: AppCategory
		users24h: number
		volume24h: TokenAmount
		growth: Percentage
	}>
	
	// Cross-app interactions
	interactions: {
		totalCrossAppTxs: number
		topIntegrations: Array<{
			app1: string
			app2: string
			interactionCount: number
			volume: TokenAmount
		}>
		
		// Composability metrics
		composabilityScore: number
		averageIntegrationsPerApp: number
	}
	
	// Developer activity
	developerMetrics: {
		activeDevs: number
		newDeployments: number
		upgradeActivity: number
		openSourceProjects: number
	}
	
	// Network effects
	networkEffects: {
		userRetention: Percentage
		crossAppMigration: Percentage
		ecosystemStickiness: Percentage
		platformLoyalty: Percentage
	}
}

export type AppDiscovery = {
	// User context
	userAddress: Address
	userHistory: Array<{
		app: string
		category: AppCategory
		lastUsed: Timestamp
		frequency: number
	}>
	
	// Recommendations
	recommendations: Array<{
		app: string
		category: AppCategory
		score: number
		reason: 'similar-users' | 'category-match' | 'trending' | 'new-feature'
		
		// App preview
		preview: {
			name: string
			description: string
			userCount: number
			rating?: number
			tags: string[]
		}
	}>
	
	// Trending apps
	trending: Array<{
		app: string
		category: AppCategory
		growthRate: Percentage
		userGrowth: Percentage
		volumeGrowth: Percentage
	}>
	
	// Personalization
	preferences: {
		favoriteCategories: AppCategory[]
		riskTolerance: 'low' | 'medium' | 'high'
		featurePreferences: string[]
		excludedCategories?: AppCategory[]
	}
}

// Legacy type alias for backward compatibility
export type DeFiProtocol = DeFiApp 