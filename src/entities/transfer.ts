import type { PartialExceptOneOf } from '../typescript/PartialExceptOneOf'
import type { Actor } from './actor'
import type { BlockNumber } from './block'
import type { ChainId } from './network'
import type { Address, BasisPoints, Hash, Percentage, Timestamp, TokenAmount, UsdAmount } from './scalars'

export type TransferId = string

// Transfer types based on token standards
export enum TransferStandard {
	Native = 'Native', // Native currency (ETH, MATIC, etc.)
	Erc20 = 'Erc20', // Fungible tokens
	Erc721 = 'Erc721', // Non-fungible tokens
	Erc1155 = 'Erc1155', // Multi-token standard
	Internal = 'Internal' // Internal transactions/traces
}

export enum TransferCategory {
	Transfer = 'Transfer', // Simple transfer
	Mint = 'Mint', // Token creation
	Burn = 'Burn', // Token destruction
	Trade = 'Trade', // Marketplace trade
	Swap = 'Swap', // Dex swap
	Bridge = 'Bridge', // Cross-chain bridge
	Airdrop = 'Airdrop', // Token distribution
	Reward = 'Reward', // Staking/farming reward
	Fee = 'Fee', // Fee payment
	Refund = 'Refund' // Refund transaction
}

export type Transfer<
	_Standard extends TransferStandard = TransferStandard,
	_Category extends TransferCategory = TransferCategory
> = (
	& {
		// Transfer identification
		id: TransferId
		chainId: ChainId
		standard: _Standard
		category: _Category

		// Position in blockchain
		blockNumber: BlockNumber
		indexInBlock: number
		indexInTransaction: number
		logIndex?: number // For token transfers

		// Timing
		timestamp: Timestamp

		// Transfer metadata
		isInternal?: boolean
		gasUsed?: number
		gasPrice?: TokenAmount

		// Risk and compliance
		riskLevel?: 'low' | 'medium' | 'high' | 'critical'
		riskFactors?: string[]

		// Transfer context
		context?: {
			protocol?: string
			dapp?: string
			method?: string
			purpose?: string
		}
	}

	& (
		_Standard extends TransferStandard.Native ?
			{
				// Native currency transfer data
				nativeData: {
					amount: TokenAmount
					symbol: string
					amountUsd?: UsdAmount

					// Network specific
					networkName: string
					isDeployment?: boolean

					// Gas context
					isGasPayment?: boolean
					refundAmount?: TokenAmount
				}
			}

		: _Standard extends TransferStandard.Erc20 ?
			{
				// ERC20 token transfer data
				tokenData: {
					tokenAddress: Address
					amount: TokenAmount
					symbol: string
					name: string
					decimals: number
					amountUsd?: UsdAmount

					// Price information
					pricePerToken?: UsdAmount
					priceSource?: string

					// Token metadata
					logoUri?: string
					isVerified?: boolean
					tokenType?: 'standard' | 'stablecoin' | 'wrapped' | 'governance' | 'defi'
				}
			}

		: _Standard extends TransferStandard.Erc721 ?
			{
				// NFT transfer data
				nftData: {
					tokenAddress: Address
					tokenId: string

					// Collection information
					collectionName: string
					collectionSymbol: string
					collectionSlug?: string

					// Token metadata
					tokenName?: string
					tokenDescription?: string
					tokenImage?: string
					tokenAnimationUrl?: string

					// Attributes
					attributes?: {
						traitType: string
						value: string | number
						rarity?: Percentage
					}[]

					// Market data
					lastSalePrice?: TokenAmount
					estimatedValue?: UsdAmount
					floorPrice?: UsdAmount
					rarityRank?: number

					// Marketplace context
					marketplace?: {
						name: string
						address: Address
						feePercentage?: BasisPoints
					}
				}
			}

		: _Standard extends TransferStandard.Erc1155 ?
			{
				// Multi-token transfer data
				multiTokenData: {
					tokenAddress: Address
					tokenIds: string[]
					amounts: TokenAmount[]

					// Collection information
					collectionName: string
					collectionSymbol: string

					// Batch transfer info
					isBatchTransfer: boolean
					totalTokenTypes: number
					totalAmount: TokenAmount

					// Individual token details
					tokens: {
						tokenId: string
						amount: TokenAmount

						// Token metadata
						name?: string
						description?: string
						image?: string
						decimals?: number

						// Market data
						pricePerToken?: UsdAmount
						totalValue?: UsdAmount
					}[]

					// Aggregate value
					totalValueUsd?: UsdAmount
				}
			}

		: _Standard extends TransferStandard.Internal ?
			{
				// Internal transfer data
				internalData: {
					callType: 'call' | 'delegatecall' | 'staticcall' | 'create' | 'create2'
					amount: TokenAmount

					// Call context
					input?: string
					output?: string
					error?: string
					gasLimit?: number
					gasUsed?: number

					// Trace information
					traceAddress: number[]
					subtraces: number
					isSuccess: boolean

					// Contract interaction
					hasCallData: boolean
					methodSignature?: Hash
					methodName?: string
				}
			}

		:
			{}
	)

	& (
		_Category extends TransferCategory.Trade ?
			{
				// Trade specific data
				tradeData: {
					marketplace: string
					marketplaceAddress: Address
					salePrice: TokenAmount
					salePriceUsd: UsdAmount

					// Fees
					marketplaceFee?: TokenAmount
					royaltyFee?: TokenAmount
					totalFees?: TokenAmount

					// Trade context
					tradeType: 'sale' | 'auction' | 'offer' | 'bundle'
					paymentToken?: Address

					// Seller/buyer context
					isFirstSale?: boolean
					previousOwner?: Address
					holdingDuration?: number
				}
			}

		: _Category extends TransferCategory.Swap ?
			{
				// Dex swap data
				swapData: {
					dexName: string
					dexAddress: Address
					dexVersion?: string

					// Swap details
					tokenIn: Address
					tokenOut: Address
					amountIn: TokenAmount
					amountOut: TokenAmount

					// Swap metrics
					exchangeRate: string
					slippage: Percentage
					priceImpact: Percentage

					// Fees
					tradingFee: TokenAmount
					protocolFee?: TokenAmount
					lpFee?: TokenAmount

					// Liquidity pool
					poolAddress?: Address
					poolFee?: BasisPoints
				}
			}

		: _Category extends TransferCategory.Bridge ?
			{
				// Cross-chain bridge data
				bridgeData: {
					bridgeName: string
					bridgeAddress: Address
					bridgeType: 'lock-mint' | 'burn-mint' | 'liquidity'

					// Bridge details
					sourceChain: ChainId
					targetChain: ChainId
					targetAddress?: Address

					// Bridge fees
					bridgeFee: TokenAmount
					bridgeFeeUsd?: UsdAmount

					// Timing
					estimatedArrival?: Timestamp
					confirmationBlocks?: number

					// Status
					bridgeStatus?: 'initiated' | 'confirmed' | 'completed' | 'failed'
				}
			}

		: _Category extends TransferCategory.Airdrop ?
			{
				// Airdrop specific data
				airdropData: {
					campaign: string
					campaignId?: string
					merkleRoot?: Hash
					merkleProof?: Hash[]

					// Airdrop details
					reason: string
					eligibilityCriteria?: string[]

					// Distribution info
					totalRecipients?: number
					totalAmount?: TokenAmount
					distributionPhase?: number

					// Claiming
					claimIndex?: number
					claimDeadline?: Timestamp
				}
			}

		: _Category extends TransferCategory.Reward ?
			{
				// Reward specific data
				rewardData: {
					rewardType: 'staking' | 'farming' | 'mining' | 'governance' | 'referral'
					protocol: string
					protocolAddress: Address

					// Reward details
					rewardPeriod?: {
						start: Timestamp
						end: Timestamp
					}

					// Staking context
					stakedAmount?: TokenAmount
					stakingDuration?: number
					apr?: Percentage

					// Reward calculation
					rewardRate?: TokenAmount
					multiplier?: number
					boost?: Percentage
				}
			}

		:
			{}
	)

	& {
		$from?: PartialExceptOneOf<Actor,
			| 'address'
			| 'format'
		>

		$to?: PartialExceptOneOf<Actor,
			| 'address'
			| 'format'
		>

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

		// For token transfers
		$tokenContract?: PartialExceptOneOf<import('./token').Token,
			| 'address'
			| 'standard'
		>

		// For NFT transfers
		$nftCollection?: PartialExceptOneOf<import('./nft').NftCollection,
			| 'contractAddress'
			| 'name'
			| 'category'
		>

		// For DeFi transfers
		$protocolActor?: PartialExceptOneOf<Actor,
			| 'address'
			| 'format'
		>

		// For marketplace trades
		$marketplaceActor?: PartialExceptOneOf<Actor,
			| 'address'
			| 'format'
		>

		// Related transfers
		$relatedTransfers?: PartialExceptOneOf<Transfer,
			| 'id'
			| 'category'
			| 'timestamp'
		>[]

		// Parent transfer (for batch operations)
		$parentTransfer?: PartialExceptOneOf<Transfer,
			| 'id'
		>

		// Child transfers (for batch operations)
		$childTransfers?: PartialExceptOneOf<Transfer,
			| 'id'
			| 'category'
		>[]

		// Associated events
		$events?: PartialExceptOneOf<import('./event').Event,
			| 'id'
			| 'category'
			| 'timestamp'
		>[]
	}
)