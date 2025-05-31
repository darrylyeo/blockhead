import type { PartialExceptOneOf } from '../typescript/PartialExceptOneOf'
import type { Actor, ActorType } from './actor'
import type { Address, Hash } from './scalars'
import type { ChainId } from './network'
import type { Timestamp, BlockNumber, TokenAmount, UsdAmount, Percentage, BasisPoints } from './types'

// Token standard types
export enum TokenStandard {
	Erc20 = 'Erc20',
	Erc721 = 'Erc721',
	Erc1155 = 'Erc1155',
	Erc4626 = 'Erc4626',
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
	Lp = 'Lp', // Liquidity Provider
	Receipt = 'Receipt', // Staking/Deposit receipt
	Collectible = 'Collectible',
	Art = 'Art',
	Gaming = 'Gaming',
	Membership = 'Membership',
	Identity = 'Identity'
}

export type TokenMetadata = {
	address: Address
	chainId: ChainId
	name: string
	symbol: string
	decimals: number
	logoUri?: string
	tags?: string[]
	extensions?: Record<string, any>
}

export type Token<
	_Standard extends TokenStandard = TokenStandard,
	_TokenType extends TokenType = TokenType
> = (
	& {
		// Token identification
		address: Address
		chainId: ChainId
		standard: _Standard
		type: _TokenType
		
		// Basic token info
		metadata: TokenMetadata
		decimals: number
		totalSupply?: TokenAmount
		maxSupply?: TokenAmount
		
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
	}

	& (
		_Standard extends TokenStandard.Erc20 ?
			(
				_TokenType extends TokenType.Stablecoin ?
					{
						// Stablecoin specific data
						stablecoinData: {
							peggingMechanism: 'fiat-collateralized' | 'crypto-collateralized' | 'algorithmic' | 'hybrid'
							targetPeg: UsdAmount
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

				: _TokenType extends TokenType.Governance ?
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

				: _TokenType extends TokenType.Yield ?
					{
						// Yield bearing token data
						yieldData: {
							underlyingAsset: Address
							currentApy: Percentage
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

		: _Standard extends TokenStandard.Erc721 ?
			{
				// NFT specific data
				nftData: {
					name: string
					symbol: string
					baseUri?: string
					
					// Collection information
					collection?: {
						name: string
						description?: string
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
				}
			}

		: _Standard extends TokenStandard.Erc1155 ?
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

		: _Standard extends TokenStandard.Native ?
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
		_TokenType extends TokenType.Gaming ?
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

		: _TokenType extends TokenType.Lp ?
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
					volume24h: UsdAmount
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
		contractActor?: PartialExceptOneOf<Actor<ActorType.Contract>,
			| 'address'
			| 'type'
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
		
		recentTransfers?: PartialExceptOneOf<import('./transfer').Transfer,
			| 'id'
			| 'type'
			| 'amount'
			| 'timestamp'
		>[]
		
		creationTransaction?: PartialExceptOneOf<import('./transaction').Transaction,
			| 'transactionId'
			| 'timestamp'
		>
	}
)

export type AnyToken = Token<TokenStandard, TokenType> 