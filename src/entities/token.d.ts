import type { PartialExceptOneOf } from '../typescript/PartialExceptOneOf'
import type { Actor, ActorType } from './actor'
import type { BlockNumber } from './block'
import type { ChainId } from './chain'
import type { Address, BasisPoints, Hash, Percentage, Timestamp, TokenAmount, UsdAmount } from './scalars'

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
		types: _TokenType[]

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
			emissionSchedule?: {
				timestamp: Timestamp
				rate: Percentage
				amount: TokenAmount
			}[]
		}

		// Verification and security
		verification: {
			isVerified: boolean
			verificationSource?: string
			securityScore?: number
			auditReports?: {
				auditor: string
				date: Timestamp
				reportUrl: string
				score?: number
			}[]
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
							reserveAssets?: {
								asset: Address
								amount: TokenAmount
								percentage: Percentage
							}[]

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
							historicalReturns: {
								period: string
								return: Percentage
							}[]
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
					gameAssets?: {
						tokenId: string
						assetType: string
						rarity: string
						level?: number
						stats?: Record<string, number>
					}[]
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
					tokenUtility: {
						function: string
						description: string
						required: boolean
					}[]

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
		$contractActor?: PartialExceptOneOf<Actor<ActorType.Contract>,
			| 'address'
		>

		$creator?: PartialExceptOneOf<Actor,
			| 'address'
		>

		$owner?: PartialExceptOneOf<Actor,
			| 'address'
		>

		$deployer?: PartialExceptOneOf<Actor,
			| 'address'
		>

		$admin?: PartialExceptOneOf<Actor,
			| 'address'
		>

		$minters?: PartialExceptOneOf<Actor,
			| 'address'
		>[]

		$burners?: PartialExceptOneOf<Actor,
			| 'address'
		>[]

		$topHolders?: PartialExceptOneOf<Actor,
			| 'address'
		>[]

		$recentTransfers?: PartialExceptOneOf<import('./transfer').Transfer,
			| 'id'
		>[]

		$creationTransaction?: PartialExceptOneOf<import('./transaction').Transaction,
			| 'id'
		>
	}
)