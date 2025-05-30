import type { PartialExceptOneOf } from '../typescript/PartialExceptOneOf.js'
import type { Address, Hash, Actor, ActorType } from './address.js'
import type { ChainId } from './chain.js'
import type { Timestamp, BlockNumber, TokenAmount, USDAmount, Percentage, BasisPoints } from './types.js'

// Token standard types
export enum TokenStandard {
	ERC20 = 'ERC20',
	ERC721 = 'ERC721',
	ERC1155 = 'ERC1155',
	ERC4626 = 'ERC4626',
	Native = 'Native'
}

export enum TokenType {
	Utility = 'Utility',
	Governance = 'Governance',
	Stablecoin = 'Stablecoin',
	Wrapped = 'Wrapped',
	Synthetic = 'Synthetic',
	Rebasing = 'Rebasing',
	Deflationary = 'Deflationary',
	Yield = 'Yield',
	LP = 'LP', // Liquidity Provider
	Receipt = 'Receipt', // Staking/Deposit receipt
	Collectible = 'Collectible',
	Art = 'Art',
	Gaming = 'Gaming',
	Membership = 'Membership',
	Identity = 'Identity'
}

export type Token<
	_S extends TokenStandard = TokenStandard,
	_T extends TokenType = TokenType
> = (
	& {
		// Token identification
		address: Address
		chainId: ChainId
		standard: _S
		type: _T
		
		// Basic token info
		metadata: TokenMetadata
		decimals: number
		totalSupply?: TokenAmount
		maxSupply?: TokenAmount
		
		// Market data
		marketData?: {
			price: USDAmount
			priceChange24h: Percentage
			volume24h: USDAmount
			marketCap: USDAmount
			fullyDilutedValuation?: USDAmount
			circulatingSupply: TokenAmount
			
			// Price history
			priceHistory?: Array<{
				timestamp: Timestamp
				price: USDAmount
				volume: USDAmount
			}>
			
			// Liquidity metrics
			liquidityScore: number
			liquidityPools: number
			totalLiquidity: USDAmount
		}
		
		// Token mechanics
		mechanics?: {
			isMintable: boolean
			isBurnable: boolean
			isPausable: boolean
			hasPermissions: boolean
			isUpgradable: boolean
			
			// Fee mechanisms
			transferTax?: Percentage
			burnRate?: Percentage
			reflectionRate?: Percentage
			
			// Supply mechanisms
			inflationRate?: Percentage
			emissionSchedule?: Array<{
				timestamp: Timestamp
				rate: Percentage
				amount: TokenAmount
			}>
		}
		
		// Verification and security
		verification: {
			isVerified: boolean
			verificationSource?: string
			securityScore?: number
			auditReports?: Array<{
				auditor: string
				date: Timestamp
				reportUrl: string
				score?: number
			}>
			riskLevel: 'low' | 'medium' | 'high' | 'critical'
			riskFactors: string[]
		}
		
		// Usage statistics
		statistics: {
			holderCount: number
			transferCount: number
			uniqueTransferParticipants: number
			averageHoldingTime: number
			
			// Activity metrics
			dailyActiveUsers: number
			weeklyActiveUsers: number
			monthlyActiveUsers: number
			
			// Distribution analysis
			whaleHoldings: Percentage // Top 100 holders
			retailHoldings: Percentage // Bottom 90% holders
			concentrationRisk: Percentage
		}
	}

	& (
		_S extends TokenStandard.ERC20 ?
			(
				_T extends TokenType.Stablecoin ?
					{
						// Stablecoin specific data
						stablecoinData: {
							peggingMechanism: 'fiat-collateralized' | 'crypto-collateralized' | 'algorithmic' | 'hybrid'
							targetPeg: USDAmount
							collateralRatio?: Percentage
							reserveAssets?: Array<{
								asset: Address
								amount: TokenAmount
								percentage: Percentage
							}>
							
							// Stability metrics
							depegEvents: number
							maxDepegPercentage: Percentage
							stabilityFee?: Percentage
						}
					}

				: _T extends TokenType.Governance ?
					{
						// Governance token data
						governanceData: {
							votingWeight: Percentage
							proposalThreshold: TokenAmount
							quorumThreshold: Percentage
							votingPeriod: number
							timelockDelay: number
							
							// DAO metrics
							activeProposals: number
							totalProposals: number
							voterParticipation: Percentage
						}
					}

				: _T extends TokenType.Yield ?
					{
						// Yield bearing token data
						yieldData: {
							underlyingAsset: Address
							currentAPY: Percentage
							totalValueLocked: TokenAmount
							
							// Yield mechanics
							compoundingFrequency: number
							feeStructure: {
								managementFee: Percentage
								performanceFee: Percentage
								withdrawalFee?: Percentage
							}
							
							// Performance tracking
							historicalReturns: Array<{
								period: string
								return: Percentage
							}>
						}
					}

				:
					{
						// Standard ERC20 data
						erc20Data: {
							name: string
							symbol: string
							features: {
								mintable: boolean
								burnable: boolean
								pausable: boolean
								upgradeable: boolean
								permit: boolean // EIP-2612
								flashMintable: boolean
								deflationary: boolean
								rebasable: boolean
								taxToken: boolean
							}
						}
					}
			)

		: _S extends TokenStandard.ERC721 ?
			{
				// NFT specific data
				nftData: {
					name: string
					symbol: string
					baseURI?: string
					
					// Collection information
					collection?: {
						name: string
						description?: string
						floorPrice: USDAmount
						totalVolume: USDAmount
						royaltyFee: Percentage
						verified: boolean
					}
					
					// NFT mechanics
					features: {
						enumerable: boolean // ERC-721Enumerable
						metadata: boolean
						burnable: boolean
						pausable: boolean
						upgradeable: boolean
						soulbound: boolean
						dynamic: boolean // Metadata can change
					}
					
					// Market data
					trading?: {
						lastSalePrice: USDAmount
						lastSaleDate: Timestamp
						estimatedValue: USDAmount
						isListed: boolean
						listingPrice?: USDAmount
						marketplace?: string
						
						priceHistory: Array<{
							timestamp: Timestamp
							price: USDAmount
							marketplace: string
							buyer: Address
							seller: Address
						}>
					}
				}
			}

		: _S extends TokenStandard.ERC1155 ?
			{
				// Multi-token specific data
				multiTokenData: {
					uri: string // Token URI template
					
					// Token type distributions
					tokenTypes: {
						fungible: number
						nonFungible: number
						semiFungible: number
					}
					
					// Features
					features: {
						burnable: boolean
						pausable: boolean
						upgradeable: boolean
						supplyTracking: boolean
					}
					
					// Gaming context
					gameAssets?: Array<{
						tokenId: string
						assetType: string
						rarity: string
						level?: number
						stats?: Record<string, number>
					}>
				}
			}

		: _S extends TokenStandard.Native ?
			{
				// Native currency data
				nativeData: {
					name: string
					symbol: string
					networkName: string
					
					// Network properties
					consensusType: 'proof-of-work' | 'proof-of-stake' | 'proof-of-authority'
					blockTime: number
					gasTokenUsage: boolean
					
					// Economic model
					issuanceModel: 'fixed' | 'inflationary' | 'deflationary' | 'dynamic'
					annualInflation?: Percentage
				}
			}

		:
			{}
	)

	& (
		_T extends TokenType.Gaming ?
			{
				// Gaming token features
				gamingFeatures: {
					gameTitle: string
					gameGenre: string
					utilityInGame: string[]
					
					// Game economy
					tokenUtility: Array<{
						function: string
						description: string
						required: boolean
					}>
					
					// Player economy
					earnMechanics: string[]
					stakingRewards: boolean
					governanceRights: boolean
				}
			}

		: _T extends TokenType.LP ?
			{
				// Liquidity provider token data
				lpTokenData: {
					dexProtocol: string
					poolAddress: Address
					
					// Pool composition
					token0: Address
					token1: Address
					poolFee: BasisPoints
					
					// LP metrics
					totalValueLocked: TokenAmount
					volume24h: USDAmount
					apr: Percentage
					
					// Risk metrics
					impermanentLossRisk: Percentage
					poolVolatility: Percentage
				}
			}

		:
			{}
	)

	& {
		// --
		// Entity References (using PartialExceptOneOf)
		contractActor?: PartialExceptOneOf<Actor<ActorType.Token>,
			| 'address'
			| 'type'
			| 'tokenStandard'
		>
		
		creator?: PartialExceptOneOf<Actor,
			| 'address'
			| 'type'
		>
		
		owner?: PartialExceptOneOf<Actor,
			| 'address'
			| 'type'
		>
		
		deployer?: PartialExceptOneOf<Actor,
			| 'address'
			| 'type'
		>
		
		admin?: PartialExceptOneOf<Actor,
			| 'address'
			| 'type'
		>
		
		minters?: PartialExceptOneOf<Actor,
			| 'address'
			| 'type'
		>[]
		
		burners?: PartialExceptOneOf<Actor,
			| 'address'
			| 'type'
		>[]
		
		topHolders?: PartialExceptOneOf<Actor,
			| 'address'
			| 'type'
		>[]
		
		liquidityPools?: PartialExceptOneOf<import('./app.js').LiquidityPool,
			| 'address'
			| 'tokens'
			| 'tvl'
		>[]
		
		yieldFarms?: PartialExceptOneOf<import('./app.js').YieldFarm,
			| 'address'
			| 'stakingToken'
			| 'apr'
		>[]
		
		lendingMarkets?: PartialExceptOneOf<import('./app.js').LendingMarket,
			| 'asset'
			| 'protocol'
			| 'supplyRate'
		>[]
		
		recentTransfers?: PartialExceptOneOf<import('./transfer.js').Transfer,
			| 'id'
			| 'type'
			| 'amount'
			| 'timestamp'
		>[]
		
		creationTransaction?: PartialExceptOneOf<import('./transaction.js').Transaction,
			| 'transactionId'
			| 'timestamp'
		>
	}
)

export type NFTToken = Token<TokenStandard.ERC721 | TokenStandard.ERC1155, TokenType.Collectible | TokenType.Art | TokenType.Gaming | TokenType.Membership | TokenType.Identity> & {
	// NFT specific extensions
	tokenId?: string
	edition?: {
		current: number
		total: number
	}
	
	// Ownership and provenance
	ownership: {
		currentOwner: Address
		previousOwners: Array<{
			owner: Address
			acquiredAt: Timestamp
			soldAt?: Timestamp
			purchasePrice?: USDAmount
			salePrice?: USDAmount
		}>
	}
	
	// Utility and gaming
	utility?: {
		gameAsset: boolean
		stakingRewards: boolean
		governanceRights: boolean
		membershipAccess: boolean
		utilities: string[]
	}
}

export type AnyToken = Token<TokenStandard, TokenType> | NFTToken

// Legacy types for compatibility
export type TokenMetadata<
	Extensions extends Record<string, any> = Record<string, any>
> = {
	address: Address
	chainId: ChainId
	name: string
	symbol: string
	decimals: number
	logoURI?: string
	tags?: string[]
	extensions?: Extensions
}

// Token instance for NFTs with generic attributes
export type TokenInstance<
	A extends Record<string, any> = Record<string, any>
> = {
	tokenId: string
	contract: Address
	chainId: ChainId
	
	// Ownership
	owner: Address
	previousOwner?: Address
	
	// Metadata
	name?: string
	description?: string
	image?: string
	animationUrl?: string
	externalUrl?: string
	attributes: TokenAttribute<A>[]
	
	// Market data
	lastSalePrice?: string
	lastSaleTimestamp?: number
	estimatedValue?: number
	
	// Provenance
	mintTransaction: Hash
	mintTimestamp: number
	transferHistory: TokenTransfer[]
	
	// Status
	isListed?: boolean
	listingPrice?: string
	marketplace?: string
}

// Generic token attribute type
export type TokenAttribute<T = string | number> = {
	traitType: string
	value: T
	displayType?: 'boost_number' | 'boost_percentage' | 'number' | 'date'
	maxValue?: number
	rarity?: number // 0-100
}

// Generic token transfer type
export type TokenTransfer<
	TransferType extends string = 'mint' | 'burn' | 'transfer' | 'sale'
> = {
	from: Address
	to: Address
	value: string
	timestamp: number
	transaction: Hash
	logIndex: number
	transferType: TransferType
	price?: string // If it was a sale
	marketplace?: string
}

// Token balance with generic token type
export type TokenBalance<T extends Address = Address> = {
	token: T
	balance: string
	balanceFormatted: string
	balanceUsd?: number
	price?: number
	change24h?: number
	
	// For NFTs
	tokenIds?: string[]
	
	// Staking/earning positions
	stakingBalance?: string
	rewards?: string
	apr?: number
}

// Generic token portfolio type
export type TokenPortfolio<
	RiskLevel extends string = 'low' | 'medium' | 'high'
> = {
	address: Address
	chainId: ChainId
	balances: TokenBalance[]
	totalValueUsd: number
	
	// Portfolio metrics
	diversity: number // 0-1, 1 = perfectly diversified
	risk: RiskLevel
	yield: number // Annual %
	
	// Performance
	pnl24h: number
	pnl7d: number
	pnl30d: number
	pnlAll: number
}

// Utility types for token validation
export type ValidTokenAddress<T extends string> = T extends Address ? T : never

// Token list metadata type
export type TokenList<T extends TokenMetadata = TokenMetadata> = {
	name: string
	version: {
		major: number
		minor: number
		patch: number
	}
	tokens: T[]
	keywords: string[]
	logoURI?: string
	timestamp: number
} 