import type { PartialExceptOneOf } from '../typescript/PartialExceptOneOf.js'
import type { Address, Hash, Actor } from './address.js'
import type { ChainId } from './chain.js'
import type { Timestamp, BlockNumber, TokenAmount, USDAmount, Percentage, BasisPoints } from './types.js'

// Transfer types based on token standards
export enum TransferStandard {
	Native = 'Native', // Native currency (ETH, MATIC, etc.)
	ERC20 = 'ERC20', // Fungible tokens
	ERC721 = 'ERC721', // Non-fungible tokens
	ERC1155 = 'ERC1155', // Multi-token standard
	Internal = 'Internal' // Internal transactions/traces
}

export enum TransferCategory {
	Transfer = 'Transfer', // Simple transfer
	Mint = 'Mint', // Token creation
	Burn = 'Burn', // Token destruction
	Trade = 'Trade', // Marketplace trade
	Swap = 'Swap', // DEX swap
	Bridge = 'Bridge', // Cross-chain bridge
	Airdrop = 'Airdrop', // Token distribution
	Reward = 'Reward', // Staking/farming reward
	Fee = 'Fee', // Fee payment
	Refund = 'Refund' // Refund transaction
}

// Generic transfer type with standard and category-specific fields
export type Transfer<
	_S extends TransferStandard = TransferStandard,
	_C extends TransferCategory = TransferCategory
> = (
	& {
		// Transfer identification
		id: string
		chainId: ChainId
		standard: _S
		category: _C
		
		// Transfer parties
		from: Address
		to: Address
		
		// Position in blockchain
		blockNumber: BlockNumber
		transactionIndex: number
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
		_S extends TransferStandard.Native ?
			{
				// Native currency transfer data
				nativeData: {
					amount: TokenAmount
					amountFormatted: string
					symbol: string
					amountUsd?: USDAmount
					
					// Network specific
					networkName: string
					isDeployment?: boolean
					
					// Gas context
					isGasPayment?: boolean
					refundAmount?: TokenAmount
				}
			}

		: _S extends TransferStandard.ERC20 ?
			{
				// ERC20 token transfer data
				tokenData: {
					tokenAddress: Address
					amount: TokenAmount
					amountFormatted: string
					symbol: string
					name: string
					decimals: number
					amountUsd?: USDAmount
					
					// Price information
					pricePerToken?: USDAmount
					priceSource?: string
					
					// Token metadata
					logoURI?: string
					isVerified?: boolean
					tokenType?: 'standard' | 'stablecoin' | 'wrapped' | 'governance' | 'defi'
				}
			}

		: _S extends TransferStandard.ERC721 ?
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
					attributes?: Array<{
						traitType: string
						value: string | number
						rarity?: Percentage
					}>
					
					// Market data
					lastSalePrice?: TokenAmount
					estimatedValue?: USDAmount
					floorPrice?: USDAmount
					rarityRank?: number
					
					// Marketplace context
					marketplace?: {
						name: string
						address: Address
						feePercentage?: BasisPoints
					}
				}
			}

		: _S extends TransferStandard.ERC1155 ?
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
					tokens: Array<{
						tokenId: string
						amount: TokenAmount
						amountFormatted: string
						
						// Token metadata
						name?: string
						description?: string
						image?: string
						decimals?: number
						
						// Market data
						pricePerToken?: USDAmount
						totalValue?: USDAmount
					}>
					
					// Aggregate value
					totalValueUsd?: USDAmount
				}
			}

		: _S extends TransferStandard.Internal ?
			{
				// Internal transfer data
				internalData: {
					callType: 'call' | 'delegatecall' | 'staticcall' | 'create' | 'create2'
					amount: TokenAmount
					amountFormatted: string
					
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
		_C extends TransferCategory.Trade ?
			{
				// Trade specific data
				tradeData: {
					marketplace: string
					marketplaceAddress: Address
					salePrice: TokenAmount
					salePriceUsd: USDAmount
					
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

		: _C extends TransferCategory.Swap ?
			{
				// DEX swap data
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

		: _C extends TransferCategory.Bridge ?
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
					bridgeFeeUsd?: USDAmount
					
					// Timing
					estimatedArrival?: Timestamp
					confirmationBlocks?: number
					
					// Status
					bridgeStatus?: 'initiated' | 'confirmed' | 'completed' | 'failed'
				}
			}

		: _C extends TransferCategory.Airdrop ?
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

		: _C extends TransferCategory.Reward ?
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
		// --
		// Entity References (using PartialExceptOneOf)
		fromActor?: PartialExceptOneOf<Actor,
			| 'address'
			| 'type'
		>
		
		toActor?: PartialExceptOneOf<Actor,
			| 'address'
			| 'type'
		>
		
		block?: PartialExceptOneOf<import('./block.js').Block,
			| 'number'
			| 'hash'
			| 'timestamp'
		>
		
		transaction?: PartialExceptOneOf<import('./transaction.js').Transaction,
			| 'transactionId'
			| 'type'
			| 'status'
		>
		
		// For token transfers
		tokenContract?: PartialExceptOneOf<import('./token.js').Token,
			| 'address'
			| 'standard'
			| 'metadata'
		>
		
		// For NFT transfers
		nftCollection?: PartialExceptOneOf<import('./token.js').NFTToken,
			| 'address'
			| 'metadata'
			| 'collection'
		>
		
		// For DeFi transfers
		protocolActor?: PartialExceptOneOf<Actor,
			| 'address'
			| 'type'
		>
		
		// For marketplace trades
		marketplaceActor?: PartialExceptOneOf<Actor,
			| 'address'
			| 'type'
		>
		
		// Related transfers
		relatedTransfers?: PartialExceptOneOf<Transfer,
			| 'id'
			| 'category'
			| 'timestamp'
		>[]
		
		// Parent transfer (for batch operations)
		parentTransfer?: PartialExceptOneOf<Transfer,
			| 'id'
		>
		
		// Child transfers (for batch operations)
		childTransfers?: PartialExceptOneOf<Transfer,
			| 'id'
			| 'category'
		>[]
		
		// Associated events
		events?: PartialExceptOneOf<import('./event.js').Event,
			| 'id'
			| 'category'
			| 'timestamp'
		>[]
	}
)

// Convenience type aliases
export type NativeTransfer = Transfer<TransferStandard.Native>
export type ERC20Transfer = Transfer<TransferStandard.ERC20>
export type NFTTransfer = Transfer<TransferStandard.ERC721>
export type MultiTokenTransfer = Transfer<TransferStandard.ERC1155>
export type InternalTransfer = Transfer<TransferStandard.Internal>

export type TradeTransfer = Transfer<TransferStandard, TransferCategory.Trade>
export type SwapTransfer = Transfer<TransferStandard, TransferCategory.Swap>
export type BridgeTransfer = Transfer<TransferStandard, TransferCategory.Bridge>
export type AirdropTransfer = Transfer<TransferStandard, TransferCategory.Airdrop>
export type RewardTransfer = Transfer<TransferStandard, TransferCategory.Reward>

export type AnyTransfer = Transfer<TransferStandard, TransferCategory>

// Transfer analytics
export enum TransferAnalyticsTimeframe {
	OneHour = 'OneHour',
	OneDay = 'OneDay',
	SevenDays = 'SevenDays',
	ThirtyDays = 'ThirtyDays'
}

export type TransferAnalytics = {
	chainId: ChainId
	timeframe: TransferAnalyticsTimeframe
	
	// Volume metrics
	totalTransfers: number
	totalVolume: USDAmount
	averageTransferValue: USDAmount
	medianTransferValue: USDAmount
	
	// Standard breakdown
	byStandard: Record<TransferStandard, {
		count: number
		volume: USDAmount
		percentage: Percentage
		growth: Percentage
	}>
	
	// Category breakdown
	byCategory: Record<TransferCategory, {
		count: number
		volume: USDAmount
		percentage: Percentage
		averageValue: USDAmount
	}>
	
	// Top transfers
	topTransfers: Array<{
		id: string
		standard: TransferStandard
		category: TransferCategory
		value: USDAmount
		timestamp: Timestamp
	}>
	
	// Network activity
	networkActivity: {
		uniqueSenders: number
		uniqueReceivers: number
		uniqueTokens: number
		crossProtocolTransfers: number
	}
	
	// Trends
	trends: {
		volumeTrend: 'increasing' | 'decreasing' | 'stable'
		countTrend: 'increasing' | 'decreasing' | 'stable'
		averageValueTrend: 'increasing' | 'decreasing' | 'stable'
	}
}

export type TransferFilter = {
	// Basic filters
	from?: Address[]
	to?: Address[]
	involving?: Address[] // Either from or to
	tokens?: Address[]
	
	// Standards and categories
	standards?: TransferStandard[]
	categories?: TransferCategory[]
	
	// Value filters
	minValue?: USDAmount
	maxValue?: USDAmount
	minAmount?: TokenAmount
	maxAmount?: TokenAmount
	
	// Time range
	fromTimestamp?: Timestamp
	toTimestamp?: Timestamp
	fromBlock?: BlockNumber
	toBlock?: BlockNumber
	
	// Protocol filters
	protocols?: string[]
	marketplaces?: string[]
	
	// Advanced filters
	riskLevel?: Array<'low' | 'medium' | 'high' | 'critical'>
	hasUsdValue?: boolean
	isInternal?: boolean
	
	// Pagination and sorting
	limit?: number
	offset?: number
	orderBy?: 'timestamp' | 'value' | 'amount' | 'blockNumber'
	orderDirection?: 'asc' | 'desc'
}

export type TransferBatch = {
	id: string
	chainId: ChainId
	
	// Batch metadata
	batchType: 'airdrop' | 'multi-send' | 'marketplace' | 'bridge' | 'custom'
	totalTransfers: number
	
	// Aggregated data
	totalValue: USDAmount
	totalGasUsed: number
	totalGasCost: TokenAmount
	
	// Timing
	startTimestamp: Timestamp
	endTimestamp: Timestamp
	duration: number
	
	// Batch composition
	standardBreakdown: Record<TransferStandard, number>
	categoryBreakdown: Record<TransferCategory, number>
	
	// Optimization metrics
	gasEfficiency: number
	costSavings?: TokenAmount
	optimizationUsed?: string[]
	
	// Status
	isComplete: boolean
	successfulTransfers: number
	failedTransfers: number
	
	// Entity references
	transfers: string[] // Transfer IDs
	initiator?: Address
	protocol?: string
}

export type TransferPattern = {
	id: string
	name: string
	description: string
	
	// Pattern definition
	pattern: {
		sequence: Array<{
			standard?: TransferStandard
			category?: TransferCategory
			conditions: Record<string, any>
			timeWindow?: number
		}>
		
		// Pattern rules
		exactOrder: boolean
		allowGaps: boolean
		maxTimeSpan: number
		minOccurrences: number
	}
	
	// Pattern detection
	isActive: boolean
	confidence: Percentage
	severity: 'info' | 'warning' | 'critical'
	
	// Analytics
	detectionCount: number
	lastDetected?: Timestamp
	falsePositiveRate?: Percentage
	
	// Examples
	examples: Array<{
		transfers: string[]
		detectedAt: Timestamp
		confidence: Percentage
		risk: 'low' | 'medium' | 'high' | 'critical'
	}>
}

export type TransferFlow = {
	id: string
	chainId: ChainId
	
	// Flow metadata
	flowType: 'chain' | 'circular' | 'fan-out' | 'fan-in' | 'hub'
	depth: number
	totalTransfers: number
	
	// Flow analysis
	entry: Address
	exit?: Address
	intermediaries: Address[]
	
	// Volume tracking
	totalVolume: USDAmount
	volumeByHop: USDAmount[]
	averageHopValue: USDAmount
	
	// Timing analysis
	startTime: Timestamp
	endTime: Timestamp
	totalDuration: number
	averageHopTime: number
	
	// Flow efficiency
	directPath?: {
		possible: boolean
		savings: USDAmount
		gasEfficiency: Percentage
	}
	
	// Risk assessment
	riskLevel: 'low' | 'medium' | 'high' | 'critical'
	riskFactors: string[]
	
	// Pattern indicators
	isStructured: boolean
	isSuspicious: boolean
	isMixing: boolean
	isLaundering?: boolean
	
	// Flow visualization
	graph: {
		nodes: Array<{
			address: Address
			type: string
			volume: USDAmount
		}>
		edges: Array<{
			from: Address
			to: Address
			transferId: string
			weight: USDAmount
		}>
	}
} 