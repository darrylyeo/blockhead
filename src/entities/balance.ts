import type { PartialExceptOneOf } from '../typescript/PartialExceptOneOf'
import type { Actor } from './actor'
import type { BlockNumber } from './block'
import type { ChainId } from './network'
import type { Address, BasisPoints, Hash, NativeCurrencyAmount, Percentage, Timestamp, TokenAmount, UsdAmount } from './scalars'
import type { TokenStandard } from './token'

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
	Defi = 'Defi', // DeFi protocol balance
	Cex = 'Cex', // Centralized exchange
	Gaming = 'Gaming', // Gaming platform
	Dao = 'Dao', // DAO treasury
	Multisig = 'Multisig', // Multisig wallet
	Bridge = 'Bridge' // Bridge contract
}

export type Balance<
	_TokenStandard extends TokenStandard = TokenStandard,
	_BalanceType extends BalanceType = BalanceType
> = (
	& {
		// Balance identification
		id: string
		chainId: ChainId
		standard: _TokenStandard
		types: _BalanceType[]
		category: BalanceCategory

		// Balance amounts
		balance: TokenAmount
		balanceUsd?: UsdAmount

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
		historicalData?: {
			timestamp: Timestamp
			balance: TokenAmount
			balanceUsd?: UsdAmount
			blockNumber: BlockNumber
		}[]

		// Risk and security
		riskLevel?: 'low' | 'medium' | 'high' | 'critical'
		securityFlags?: string[]
		isVerified?: boolean
	}

	& (
		_BalanceType extends BalanceType.Locked ?
			{
				lockedData: {
					unlockTime?: Timestamp
					lockDuration?: number
					lockContract?: Address
					lockReason?: string
				}
			}
		: _BalanceType extends BalanceType.Staked ?
			{
				stakedData: {
					stakingContract: Address
					stakingProtocol: string
					stakingApr?: Percentage
					stakingRewards?: TokenAmount
				}
			}
		: _BalanceType extends BalanceType.Vesting ?
			{
				vestingData: {
					vestingSchedule: {
						timestamp: Timestamp
						amount: TokenAmount
						isClaimable: boolean
					}[]
					cliffPeriod?: number
					vestingDuration: number
				}
			}
		: _BalanceType extends BalanceType.Collateral ?
			{
				collateralData: {
					loanProtocol: string
					collateralizationRatio: Percentage
					liquidationThreshold: Percentage
					borrowedAmount?: TokenAmount
				}
			}
		: {}
	)

	& (
		_TokenStandard extends TokenStandard.Native ?
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
					unstakingQueue?: {
						amount: TokenAmount
						availableAt: Timestamp
					}[]

					// Validator context (if staking)
					validatorAddress?: Address
					delegationRewards?: TokenAmount
					commission?: Percentage

					// Network participation
					governanceVotes?: number
					proposalParticipation?: Percentage
				}
			}

		: _TokenStandard extends TokenStandard.Erc20 ?
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
					liquidityPools?: {
						pool: Address
						liquidity: TokenAmount
						apr?: Percentage
					}[]

					// DeFi positions
					defiPositions?: {
						protocol: string
						type: 'lending' | 'borrowing' | 'farming' | 'staking'
						amount: TokenAmount
						apy?: Percentage
						healthFactor?: number
					}[]

					// Approval tracking
					allowances?: {
						spender: Address
						amount: TokenAmount
						isUnlimited: boolean
						lastUsed?: Timestamp
					}[]
				}
			}

		: _TokenStandard extends TokenStandard.Erc721 ?
			{
				// NFT ownership data
				nftData: {
					tokenIds: string[]
					collectionName: string
					collectionSymbol: string

					// Collection context
					totalSupply?: number
					ownershipPercentage?: Percentage
					floorPrice?: UsdAmount

					// Individual NFT data
					nfts: {
						tokenId: string
						name?: string
						description?: string
						image?: string
						attributes?: {
							trait_type: string
							value: string | number
							rarity?: Percentage
						}[]

						// Market data
						lastSalePrice?: UsdAmount
						estimatedValue?: UsdAmount
						isListed?: boolean
						listingPrice?: UsdAmount

						// Utility
						isStaked?: boolean
						stakingRewards?: TokenAmount
						gameUtility?: boolean
					}[]

					// Portfolio metrics
					totalValue: UsdAmount
					averageHoldingTime: number
					realizationRate?: Percentage
				}
			}

		: _TokenStandard extends TokenStandard.Erc1155 ?
			{
				// Multi-token balance data
				multiTokenData: {
					tokenBalances: {
						tokenId: string
						balance: TokenAmount
						name?: string
						description?: string
						image?: string
						isFungible: boolean

						// Market data
						unitPrice?: UsdAmount
						totalValue?: UsdAmount

						// Game context
						gameAsset?: {
							assetType: string
							rarity: string
							level?: number
							stats?: Record<string, number>
						}
					}[]

					// Collection summary
					uniqueTokens: number
					totalTokens: TokenAmount
					fungibleValue: UsdAmount
					nftValue: UsdAmount
					totalValue: UsdAmount
				}
			}

		:
			{}
	)

	& {
		$owner?: PartialExceptOneOf<Actor,
			| 'address'
		>

		// Asset reference
		$asset?: PartialExceptOneOf<import('./token').Token,
			| 'address'
		>

		// For DeFi balances
		$protocol?: PartialExceptOneOf<import('./app').App,
			| 'name'
		>

		// For LP tokens
		$liquidityPool?: PartialExceptOneOf<import('./app').LiquidityPool,
			| 'address'
		>

		// For staked balances
		$stakingContract?: PartialExceptOneOf<import('./contract').Contract,
			| 'address'
		>

		$validator?: PartialExceptOneOf<Actor,
			| 'address'
		>

		// For vesting balances
		$vestingContract?: PartialExceptOneOf<import('./contract').Contract,
			| 'address'
		>

		// Balance history
		$relatedBalances?: PartialExceptOneOf<Balance,
			| 'id'
		>[]

		// Associated transactions
		$recentTransactions?: PartialExceptOneOf<import('./transaction').Transaction,
			| 'transactionId'
		>[]

		// Associated transfers
		$recentTransfers?: PartialExceptOneOf<import('./transfer').Transfer,
			| 'id'
		>[]
	}
)

// Balance aggregation types
export type BalancePortfolio = {
	owner: Address
	chainId: ChainId
	timestamp: Timestamp

	// Aggregated metrics
	totalValueUsd: UsdAmount
	totalAssets: number
	activePositions: number

	// Asset distribution
	assetAllocation: {
		standard: TokenStandard
		percentage: Percentage
		value: UsdAmount
	}[]

	// Category distribution
	categoryAllocation: {
		category: BalanceCategory
		percentage: Percentage
		value: UsdAmount
	}[]

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

// Portfolio aggregation
export type Portfolio = {
	id: string
	holder: Address
	chainId: ChainId

	// Portfolio overview
	totalValue: UsdAmount
	totalBalances: number
	lastUpdated: Timestamp

	// Asset breakdown
	byStandard: Record<TokenStandard, {
		count: number
		value: UsdAmount
		percentage: Percentage
	}>

	byType: Record<BalanceType, {
		count: number
		value: UsdAmount
		percentage: Percentage
	}>

	// Top holdings
	topHoldings: {
		tokenAddress: Address
		symbol: string
		balance: TokenAmount
		value: UsdAmount
		percentage: Percentage
		priceChange24h: Percentage
	}[]

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
		dailyChange: UsdAmount
		weeklyChange: UsdAmount
		monthlyChange: UsdAmount
		allTimeHigh: UsdAmount
		allTimeLow: UsdAmount

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
		totalYieldEarned: UsdAmount
		dailyYield: UsdAmount
		weeklyYield: UsdAmount
		monthlyYield: UsdAmount
		yieldApy: Percentage

		yieldSources: {
			source: string
			amount: UsdAmount
			apy: Percentage
		}[]
	}
}
