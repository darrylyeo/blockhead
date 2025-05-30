import type { PartialExceptOneOf } from '../typescript/PartialExceptOneOf.js'
import type { Address, Hash, Actor } from './address.js'
import type { ChainId } from './chain.js'
import type { TokenStandard, AnyToken } from './token.js'
import type { Timestamp, NativeCurrencyAmount, BlockNumber, TransactionId, TokenAmount, USDAmount, Percentage, BasisPoints } from './types.js'

// Balance types based on asset standards
export enum BalanceStandard {
	Native = 'Native', // Native blockchain currency
	ERC20 = 'ERC20', // Fungible tokens
	ERC721 = 'ERC721', // Non-fungible tokens (ownership)
	ERC1155 = 'ERC1155', // Multi-token standard
	LP = 'LP', // Liquidity provider tokens
	Staked = 'Staked', // Staked/locked assets
	Vesting = 'Vesting' // Vesting schedule balances
}

export enum BalanceType {
	Available = 'Available', // Freely transferable
	Locked = 'Locked', // Locked/frozen
	Staked = 'Staked', // Staked for consensus
	Delegated = 'Delegated', // Delegated to validator
	Vesting = 'Vesting', // Subject to vesting schedule
	Escrow = 'Escrow', // Held in escrow
	Collateral = 'Collateral', // Used as collateral
	Pending = 'Pending' // Pending/processing
}

export enum BalanceCategory {
	Wallet = 'Wallet', // EOA wallet balance
	Contract = 'Contract', // Contract balance
	DeFi = 'DeFi', // DeFi protocol balance
	CEX = 'CEX', // Centralized exchange
	Gaming = 'Gaming', // Gaming platform
	DAO = 'DAO', // DAO treasury
	Multisig = 'Multisig', // Multisig wallet
	Bridge = 'Bridge' // Bridge contract
}

// Generic balance type with standard-specific fields
export type Balance<_S extends BalanceStandard = BalanceStandard> = (
	& {
		// Balance identification
		id: string
		chainId: ChainId
		standard: _S
		type: BalanceType
		category: BalanceCategory
		
		// Owner identification
		owner: Address
		
		// Balance amounts
		balance: TokenAmount
		balanceFormatted: string
		balanceUSD?: USDAmount
		
		// Asset identification
		asset: Address // Token contract or zero address for native
		
		// Position in blockchain
		blockNumber: BlockNumber
		timestamp: Timestamp
		
		// Balance metadata
		isActive: boolean
		lastActivity?: Timestamp
		transactionCount?: number
		
		// Change tracking
		changeAmount?: TokenAmount
		changePercentage?: Percentage
		changePeriod?: '1h' | '24h' | '7d' | '30d'
		
		// Balance history
		historicalData?: Array<{
			timestamp: Timestamp
			balance: TokenAmount
			balanceUSD?: USDAmount
			blockNumber: BlockNumber
		}>
		
		// Risk and security
		riskLevel?: 'low' | 'medium' | 'high' | 'critical'
		securityFlags?: string[]
		isVerified?: boolean
	}

	& (
		_S extends BalanceStandard.Native ?
			{
				// Native currency balance data
				nativeData: {
					symbol: string
					decimals: number
					networkName: string
					
					// Gas balance context
					availableForGas: TokenAmount
					reservedForGas?: TokenAmount
					
					// Staking context
					totalStaked?: TokenAmount
					stakingRewards?: TokenAmount
					unstakingQueue?: Array<{
						amount: TokenAmount
						availableAt: Timestamp
					}>
					
					// Validator context (if staking)
					validatorAddress?: Address
					delegationRewards?: TokenAmount
					commission?: Percentage
					
					// Network participation
					governanceVotes?: number
					proposalParticipation?: Percentage
				}
			}

		: _S extends BalanceStandard.ERC20 ?
			{
				// ERC20 token balance data
				erc20Data: {
					name: string
					symbol: string
					decimals: number
					
					// Token context
					totalSupply?: TokenAmount
					holderRank?: number
					holderPercentage?: Percentage
					
					// Liquidity context
					liquidityAvailable: boolean
					liquidityPools?: Array<{
						pool: Address
						liquidity: TokenAmount
						apr?: Percentage
					}>
					
					// DeFi positions
					defiPositions?: Array<{
						protocol: string
						type: 'lending' | 'borrowing' | 'farming' | 'staking'
						amount: TokenAmount
						apy?: Percentage
						healthFactor?: number
					}>
					
					// Approval tracking
					allowances?: Array<{
						spender: Address
						amount: TokenAmount
						isUnlimited: boolean
						lastUsed?: Timestamp
					}>
				}
			}

		: _S extends BalanceStandard.ERC721 ?
			{
				// NFT ownership data
				nftData: {
					tokenIds: string[]
					collectionName: string
					collectionSymbol: string
					
					// Collection context
					totalSupply?: number
					ownershipPercentage?: Percentage
					floorPrice?: USDAmount
					
					// Individual NFT data
					nfts: Array<{
						tokenId: string
						name?: string
						description?: string
						image?: string
						attributes?: Array<{
							trait_type: string
							value: string | number
							rarity?: Percentage
						}>
						
						// Market data
						lastSalePrice?: USDAmount
						estimatedValue?: USDAmount
						isListed?: boolean
						listingPrice?: USDAmount
						
						// Utility
						isStaked?: boolean
						stakingRewards?: TokenAmount
						gameUtility?: boolean
					}>
					
					// Portfolio metrics
					totalValue: USDAmount
					averageHoldingTime: number
					realizationRate?: Percentage
				}
			}

		: _S extends BalanceStandard.ERC1155 ?
			{
				// Multi-token balance data
				multiTokenData: {
					tokenBalances: Array<{
						tokenId: string
						balance: TokenAmount
						name?: string
						description?: string
						image?: string
						isFungible: boolean
						
						// Market data
						unitPrice?: USDAmount
						totalValue?: USDAmount
						
						// Game context
						gameAsset?: {
							assetType: string
							rarity: string
							level?: number
							stats?: Record<string, number>
						}
					}>
					
					// Collection summary
					uniqueTokens: number
					totalTokens: TokenAmount
					fungibleValue: USDAmount
					nftValue: USDAmount
					totalValue: USDAmount
				}
			}

		: _S extends BalanceStandard.LP ?
			{
				// Liquidity provider token data
				lpData: {
					protocol: string
					poolAddress: Address
					
					// Pool composition
					token0: {
						address: Address
						symbol: string
						reserve: TokenAmount
						value: USDAmount
					}
					token1: {
						address: Address
						symbol: string
						reserve: TokenAmount
						value: USDAmount
					}
					
					// LP position metrics
					poolShare: Percentage
					totalValueLocked: USDAmount
					
					// Yield metrics
					apr: Percentage
					fees24h: USDAmount
					accruedFees: USDAmount
					
					// Impermanent loss tracking
					impermanentLoss: USDAmount
					impermanentLossPercentage: Percentage
					
					// LP rewards
					rewards?: Array<{
						token: Address
						symbol: string
						amount: TokenAmount
						value: USDAmount
					}>
				}
			}

		: _S extends BalanceStandard.Staked ?
			{
				// Staked asset data
				stakedData: {
					stakingContract: Address
					stakingProtocol: string
					
					// Staking mechanics
					stakingType: 'flexible' | 'fixed' | 'locked' | 'validator'
					stakingPeriod?: number // seconds
					lockEndTime?: Timestamp
					
					// Staking rewards
					accruedRewards: TokenAmount
					rewardRate: Percentage
					lastRewardClaim?: Timestamp
					totalRewardsClaimed: TokenAmount
					
					// Validator context (for PoS staking)
					validator?: {
						address: Address
						name?: string
						commission: Percentage
						performance: Percentage
						isActive: boolean
					}
					
					// Unstaking queue
					unstakingRequests?: Array<{
						amount: TokenAmount
						requestedAt: Timestamp
						availableAt: Timestamp
						status: 'pending' | 'processing' | 'available'
					}>
					
					// Slashing risk
					slashingRisk: 'low' | 'medium' | 'high'
					hasBeenSlashed: boolean
					slashingHistory?: Array<{
						timestamp: Timestamp
						amount: TokenAmount
						reason: string
					}>
				}
			}

		: _S extends BalanceStandard.Vesting ?
			{
				// Vesting schedule data
				vestingData: {
					vestingContract: Address
					
					// Vesting schedule
					totalAllocation: TokenAmount
					vestedAmount: TokenAmount
					claimedAmount: TokenAmount
					remainingAmount: TokenAmount
					
					// Vesting timeline
					startTime: Timestamp
					endTime: Timestamp
					cliffPeriod?: number
					vestingPeriod: number
					releaseSchedule: 'linear' | 'cliff' | 'staged' | 'custom'
					
					// Next vesting events
					nextVesting?: {
						timestamp: Timestamp
						amount: TokenAmount
					}
					
					// Vesting milestones
					milestones?: Array<{
						timestamp: Timestamp
						percentage: Percentage
						amount: TokenAmount
						isReached: boolean
						isClaimed: boolean
					}>
					
					// Acceleration triggers
					accelerationEvents?: Array<{
						trigger: string
						percentage: Percentage
						isTriggered: boolean
					}>
				}
			}

		:
			{}
	)

	& {
		// --
		// Entity References (using PartialExceptOneOf)
		ownerActor?: PartialExceptOneOf<Actor,
			| 'address'
			| 'type'
		>
		
		// Asset reference
		token?: PartialExceptOneOf<import('./token.js').Token,
			| 'address'
			| 'standard'
			| 'metadata'
		>
		
		// For DeFi balances
		protocol?: PartialExceptOneOf<import('./app.js').App,
			| 'address'
			| 'category'
			| 'name'
		>
		
		// For LP tokens
		liquidityPool?: PartialExceptOneOf<import('./app.js').LiquidityPool,
			| 'address'
			| 'tokens'
			| 'tvl'
		>
		
		// For staked balances
		stakingContract?: PartialExceptOneOf<import('./contract.js').Contract,
			| 'address'
			| 'standard'
		>
		
		validator?: PartialExceptOneOf<Actor,
			| 'address'
			| 'type'
		>
		
		// For vesting balances
		vestingContract?: PartialExceptOneOf<import('./contract.js').Contract,
			| 'address'
			| 'standard'
		>
		
		// Balance history
		relatedBalances?: PartialExceptOneOf<Balance,
			| 'id'
			| 'standard'
			| 'timestamp'
		>[]
		
		// Associated transactions
		recentTransactions?: PartialExceptOneOf<import('./transaction.js').Transaction,
			| 'transactionId'
			| 'type'
			| 'timestamp'
		>[]
		
		// Associated transfers
		recentTransfers?: PartialExceptOneOf<import('./transfer.js').Transfer,
			| 'id'
			| 'type'
			| 'timestamp'
		>[]
	}
)

// Balance aggregation types
export type BalancePortfolio = {
	owner: Address
	chainId: ChainId
	timestamp: Timestamp
	
	// Aggregated metrics
	totalValueUSD: USDAmount
	totalAssets: number
	activePositions: number
	
	// Asset distribution
	assetAllocation: Array<{
		standard: BalanceStandard
		percentage: Percentage
		value: USDAmount
	}>
	
	// Category distribution
	categoryAllocation: Array<{
		category: BalanceCategory
		percentage: Percentage
		value: USDAmount
	}>
	
	// Risk metrics
	diversificationScore: number
	riskScore: number
	liquidityScore: number
	
	// Performance tracking
	performance24h: Percentage
	performance7d: Percentage
	performance30d: Percentage
	
	// Individual balances
	balances: Balance[]
}

// Convenience type aliases
export type NativeBalance = Balance<BalanceStandard.Native>
export type ERC20Balance = Balance<BalanceStandard.ERC20>
export type ERC721Balance = Balance<BalanceStandard.ERC721>
export type ERC1155Balance = Balance<BalanceStandard.ERC1155>
export type LPBalance = Balance<BalanceStandard.LP>
export type StakedBalance = Balance<BalanceStandard.Staked>
export type VestingBalance = Balance<BalanceStandard.Vesting>

export type AnyBalance = Balance<BalanceStandard>

// Portfolio aggregation
export type Portfolio = {
	id: string
	holder: Address
	chainId: ChainId
	
	// Portfolio overview
	totalValue: USDAmount
	totalBalances: number
	lastUpdated: Timestamp
	
	// Asset breakdown
	byStandard: Record<BalanceStandard, {
		count: number
		value: USDAmount
		percentage: Percentage
	}>
	
	byType: Record<BalanceType, {
		count: number
		value: USDAmount
		percentage: Percentage
	}>
	
	// Top holdings
	topHoldings: Array<{
		tokenAddress: Address
		symbol: string
		balance: TokenAmount
		value: USDAmount
		percentage: Percentage
		priceChange24h: Percentage
	}>
	
	// Portfolio analytics
	analytics: {
		diversificationScore: Percentage
		concentrationRisk: Percentage
		totalReturn: Percentage
		volatility: Percentage
		sharpeRatio?: number
		
		assetAllocation: {
			tokens: Percentage
			nfts: Percentage
			defi: Percentage
			staking: Percentage
			other: Percentage
		}
		
		riskMetrics: {
			portfolioRisk: 'low' | 'medium' | 'high' | 'critical'
			liquidityRisk: Percentage
			correlationRisk: Percentage
			concentrationRisk: Percentage
		}
	}
	
	// Performance tracking
	performance: {
		dailyChange: USDAmount
		weeklyChange: USDAmount
		monthlyChange: USDAmount
		allTimeHigh: USDAmount
		allTimeLow: USDAmount
		
		bestPerformer: {
			tokenAddress: Address
			symbol: string
			change: Percentage
		}
		
		worstPerformer: {
			tokenAddress: Address
			symbol: string
			change: Percentage
		}
	}
	
	// Yield tracking
	yield: {
		totalYieldEarned: USDAmount
		dailyYield: USDAmount
		weeklyYield: USDAmount
		monthlyYield: USDAmount
		yieldAPY: Percentage
		
		yieldSources: Array<{
			source: string
			amount: USDAmount
			apy: Percentage
		}>
	}
}

export type BalanceHistory = {
	holder: Address
	tokenAddress: Address
	chainId: ChainId
	
	// Historical data points
	history: Array<{
		timestamp: Timestamp
		blockNumber: BlockNumber
		balance: TokenAmount
		balanceUSD?: USDAmount
		transactionHash?: Hash
		changeType: 'increase' | 'decrease' | 'no-change'
		changeAmount?: TokenAmount
	}>
	
	// Analytics
	analytics: {
		averageBalance: TokenAmount
		maxBalance: TokenAmount
		minBalance: TokenAmount
		balanceVolatility: Percentage
		
		holdingPattern: 'accumulating' | 'distributing' | 'holding' | 'trading'
		averageHoldingPeriod: number
		
		transactionFrequency: number
		averageTransactionSize: TokenAmount
		
		growthRate: Percentage
		compoundGrowthRate: Percentage
	}
	
	// Significant events
	significantEvents: Array<{
		timestamp: Timestamp
		eventType: 'large-purchase' | 'large-sale' | 'first-acquisition' | 'milestone'
		description: string
		impact: Percentage
		transactionHash?: Hash
	}>
}

export type BalanceFilter = {
	// Basic filters
	standards?: BalanceStandard[]
	types?: BalanceType[]
	category?: BalanceCategory[]
	holders?: Address[]
	tokens?: Address[]
	
	// Value filters
	minBalance?: TokenAmount
	maxBalance?: TokenAmount
	minBalanceUSD?: USDAmount
	maxBalanceUSD?: USDAmount
	
	// Activity filters
	minTransactions?: number
	maxTransactions?: number
	lastActivityRange?: {
		from: Timestamp
		to: Timestamp
	}
	
	// Portfolio filters
	minPortfolioValue?: USDAmount
	maxPortfolioValue?: USDAmount
	diversificationRange?: {
		min: Percentage
		max: Percentage
	}
	
	// Risk filters
	riskLevels?: Array<'low' | 'medium' | 'high' | 'critical'>
	liquidityRisks?: Array<'low' | 'medium' | 'high' | 'critical'>
	
	// Status filters
	isActive?: boolean
	isVerified?: boolean
	hasRewards?: boolean
	isStaked?: boolean
	isLocked?: boolean
	
	// Pagination and sorting
	limit?: number
	offset?: number
	orderBy?: 'balance' | 'balanceUSD' | 'lastUpdated' | 'transactionCount'
	orderDirection?: 'asc' | 'desc'
}

export type BalanceAnalytics = {
	chainId: ChainId
	timeframe: 'OneHour' | 'OneDay' | 'SevenDays' | 'ThirtyDays'
	
	// Overall metrics
	totalBalances: number
	totalHolders: number
	totalValue: USDAmount
	averageBalance: USDAmount
	
	// Standard distribution
	byStandard: Record<BalanceStandard, {
		balanceCount: number
		holderCount: number
		totalValue: USDAmount
		averageBalance: USDAmount
		percentage: Percentage
	}>
	
	// Type distribution
	byType: Record<BalanceType, {
		balanceCount: number
		totalValue: USDAmount
		percentage: Percentage
	}>
	
	// Holder analytics
	holderAnalytics: {
		newHolders: number
		activeHolders: number
		holderGrowthRate: Percentage
		
		holderDistribution: {
			whales: number
			dolphins: number
			fish: number
			dust: number
		}
		
		concentrationMetrics: {
			top1Percentage: Percentage
			top10Percentage: Percentage
			top100Percentage: Percentage
			giniCoefficient: Percentage
		}
	}
	
	// Activity metrics
	activityMetrics: {
		totalTransactions: number
		activeBalances: number
		averageTransactionsPerBalance: number
		transactionGrowthRate: Percentage
		
		balanceChanges: {
			increased: number
			decreased: number
			unchanged: number
		}
	}
	
	// Value flows
	valueFlows: {
		totalInflowValue: USDAmount
		totalOutflowValue: USDAmount
		netFlow: USDAmount
		
		topInflowTokens: Array<{
			tokenAddress: Address
			symbol: string
			inflowValue: USDAmount
		}>
		
		topOutflowTokens: Array<{
			tokenAddress: Address
			symbol: string
			outflowValue: USDAmount
		}>
	}
	
	// Risk assessment
	riskAssessment: {
		overallRisk: 'low' | 'medium' | 'high' | 'critical'
		concentrationRisk: Percentage
		liquidityRisk: Percentage
		volatilityRisk: Percentage
		
		riskFactors: Array<{
			factor: string
			impact: 'low' | 'medium' | 'high'
			description: string
		}>
	}
} 