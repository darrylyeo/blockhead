import type { PartialExceptOneOf } from '../typescript/PartialExceptOneOf'
import type { Actor } from './actor'
import type { BlockNumber } from './block'
import type { ChainId } from './network'
import type { Address, BasisPoints, Hash, Percentage, Timestamp, TokenAmount, UsdAmount } from './scalars'

export type EventId = string

// Event categories based on functionality
export enum EventCategory {
	Transfer = 'Transfer', // Token/NFT transfers
	Approval = 'Approval', // Token approvals
	Mint = 'Mint', // Token minting
	Burn = 'Burn', // Token burning
	Swap = 'Swap', // DEX swaps
	Liquidity = 'Liquidity', // Liquidity events
	Lending = 'Lending', // Lending/borrowing
	Staking = 'Staking', // Staking events
	Governance = 'Governance', // DAO/governance
	Bridge = 'Bridge', // Cross-chain bridges
	Oracle = 'Oracle', // Oracle updates
	System = 'System', // System/protocol events
	Custom = 'Custom' // Custom events
}

export enum EventSeverity {
	Info = 'Info',
	Warning = 'Warning',
	Error = 'Error',
	Critical = 'Critical'
}

export enum TransferType {
	Erc20 = 'Erc20',
	Erc721 = 'Erc721',
	Erc1155 = 'Erc1155',
	Native = 'Native',
	Internal = 'Internal'
}

export enum SwapType {
	Exact = 'Exact', // Exact input/output
	Multi = 'Multi', // Multi-hop swap
	Flash = 'Flash', // Flash swap
	Aggregated = 'Aggregated' // Aggregator swap
}

export type Event<_EventCategory extends EventCategory = EventCategory> = (
	& {
		// Event identification
		id: EventId
		chainId: ChainId
		category: _EventCategory
		severity: EventSeverity

		// Event location
		blockNumber: BlockNumber
		blockHash: Hash
		transactionHash: Hash
		transactionIndex: number
		logIndex: number

		// Event data
		topics: Hash[] // Indexed parameters
		data: string // Non-indexed parameters

		// Event metadata
		eventSignature?: string
		eventName?: string
		removed: boolean // True if event was removed due to reorg

		// Timing
		timestamp: Timestamp

		// Decoded data (if available)
		decodedData?: Record<string, any>
		decodedTopics?: Record<string, any>

		// Context
		gasUsed?: TokenAmount
		gasPrice?: TokenAmount
		effectiveGasPrice?: TokenAmount
	}

	& (
		_EventCategory extends EventCategory.Transfer ?
			{
				// Transfer event data
				transferData: {
					transferType: TransferType
					from: Address
					to: Address

					// Token transfers
					tokenAddress?: Address
					tokenSymbol?: string
					amount?: TokenAmount
					tokenId?: string // For NFTs
					tokenIds?: string[] // For batch transfers
					amounts?: TokenAmount[] // For batch transfers

					// Value in USD
					valueUsd?: UsdAmount
					pricePerToken?: UsdAmount

					// Transfer metadata
					isInternal?: boolean
					isMint?: boolean
					isBurn?: boolean

					// Fee/tax info
					transferFee?: TokenAmount
					taxAmount?: TokenAmount
					netAmount?: TokenAmount
				}
			}

		: _EventCategory extends EventCategory.Approval ?
			{
				// Approval event data
				approvalData: {
					owner: Address
					spender: Address

					// Token approval
					tokenAddress: Address
					tokenSymbol?: string
					amount?: TokenAmount // For ERC20
					tokenId?: string // For NFT
					approved?: boolean // For NFT setApprovalForAll

					// Approval context
					isUnlimited?: boolean
					previousAllowance?: TokenAmount
					expirationTime?: Timestamp

					// Risk assessment
					riskLevel?: 'low' | 'medium' | 'high'
					spenderType?: 'eoa' | 'contract' | 'router' | 'unknown'
				}
			}

		: _EventCategory extends EventCategory.Swap ?
			{
				// Swap event data
				swapData: {
					swapType: SwapType
					sender: Address
					recipient: Address

					// Swap pairs
					tokenIn: Address
					tokenOut: Address
					amountIn: TokenAmount
					amountOut: TokenAmount

					// Token metadata
					tokenInSymbol?: string
					tokenOutSymbol?: string
					tokenInDecimals?: number
					tokenOutDecimals?: number

					// Pricing
					priceImpact?: Percentage
					executionPrice?: number
					spotPrice?: number
					slippage?: Percentage

					// USD values
					amountInUsd?: UsdAmount
					amountOutUsd?: UsdAmount

					// Pool/route info
					poolAddress?: Address
					poolFee?: BasisPoints
					route?: Address[] // For multi-hop

					// MEV protection
					isPrivate?: boolean
					hasAntiMev?: boolean
				}
			}

		: _EventCategory extends EventCategory.Liquidity ?
			{
				// Liquidity event data
				liquidityData: {
					action: 'add' | 'remove' | 'collect'
					provider: Address
					poolAddress: Address

					// Token amounts
					token0: Address
					token1: Address
					amount0: TokenAmount
					amount1: TokenAmount

					// LP tokens
					liquidityAmount?: TokenAmount
					lpTokenAddress?: Address

					// Pool state
					reserve0?: TokenAmount
					reserve1?: TokenAmount
					totalSupply?: TokenAmount

					// Position info (for concentrated liquidity)
					tokenId?: string // NFT position ID
					tickLower?: number
					tickUpper?: number
					liquidity?: string

					// Fees collected
					fees0?: TokenAmount
					fees1?: TokenAmount

					// USD values
					totalValueUsd?: UsdAmount
					token0ValueUsd?: UsdAmount
					token1ValueUsd?: UsdAmount
				}
			}

		: _EventCategory extends EventCategory.Lending ?
			{
				// Lending event data
				lendingData: {
					action: 'deposit' | 'withdraw' | 'borrow' | 'repay' | 'liquidate'
					user: Address
					asset: Address

					// Amounts
					amount: TokenAmount
					shares?: TokenAmount // For share-based protocols

					// Interest rates
					supplyRate?: Percentage
					borrowRate?: Percentage
					utilizationRate?: Percentage

					// Collateral (for borrows/liquidations)
					collateralAsset?: Address
					collateralAmount?: TokenAmount

					// Liquidation specific
					liquidator?: Address
					debtToCover?: TokenAmount
					liquidationBonus?: TokenAmount

					// Health factor
					healthFactorBefore?: number
					healthFactorAfter?: number

					// USD values
					amountUsd?: UsdAmount
					collateralValueUsd?: UsdAmount
				}
			}

		: _EventCategory extends EventCategory.Staking ?
			{
				// Staking event data
				stakingData: {
					action: 'stake' | 'unstake' | 'claim' | 'delegate' | 'slash'
					staker: Address
					validator?: Address

					// Staking token
					stakingToken: Address
					amount: TokenAmount
					shares?: TokenAmount

					// Rewards
					rewardToken?: Address
					rewardAmount?: TokenAmount

					// Lock period
					lockDuration?: number
					unlockTime?: Timestamp

					// Delegation (for PoS)
					delegatedTo?: Address
					delegationAmount?: TokenAmount

					// Slashing
					slashingAmount?: TokenAmount
					slashingReason?: string

					// APR/APY
					apr?: Percentage
					apy?: Percentage

					// USD values
					stakedValueUsd?: UsdAmount
					rewardValueUsd?: UsdAmount
				}
			}

		: _EventCategory extends EventCategory.Governance ?
			{
				// Governance event data
				governanceData: {
					action: 'propose' | 'vote' | 'execute' | 'cancel' | 'delegate'
					actor: Address

					// Proposal data
					proposalId?: string
					proposer?: Address
					title?: string

					// Voting
					support?: boolean // true = for, false = against
					votes?: TokenAmount
					votingPower?: TokenAmount

					// Delegation
					delegator?: Address
					delegatee?: Address
					delegatedAmount?: TokenAmount

					// Execution
					targets?: Address[]
					values?: TokenAmount[]
					calldatas?: string[]
					executed?: boolean

					// Proposal state
					state?: 'pending' | 'active' | 'succeeded' | 'defeated' | 'queued' | 'executed' | 'cancelled'

					// Voting stats
					forVotes?: TokenAmount
					againstVotes?: TokenAmount
					abstainVotes?: TokenAmount
					quorum?: TokenAmount
				}
			}

		: _EventCategory extends EventCategory.Bridge ?
			{
				// Bridge event data
				bridgeData: {
					action: 'lock' | 'unlock' | 'mint' | 'burn'
					user: Address

					// Chain info
					sourceChain: ChainId
					destinationChain: ChainId

					// Token info
					sourceToken: Address
					destinationToken?: Address
					amount: TokenAmount

					// Bridge details
					bridgeAddress: Address
					depositId?: string
					withdrawalId?: string

					// Fees
					bridgeFee?: TokenAmount
					relayerFee?: TokenAmount

					// Status
					status?: 'pending' | 'confirmed' | 'completed' | 'failed'
					confirmations?: number
					estimatedTime?: number

					// USD values
					amountUsd?: UsdAmount
					totalFeesUsd?: UsdAmount
				}
			}

		: _EventCategory extends EventCategory.Oracle ?
			{
				// Oracle event data
				oracleData: {
					oracleType: 'price' | 'random' | 'computation' | 'data'
					oracle: Address

					// Price feed
					asset?: Address
					price?: TokenAmount
					decimals?: number

					// Price metadata
					roundId?: string
					timestamp?: Timestamp
					startedAt?: Timestamp
					updatedAt?: Timestamp
					answeredInRound?: string

					// Data feed
					feedId?: string
					dataKey?: string
					dataValue?: string

					// Oracle info
					aggregator?: Address
					transmitter?: Address

					// Deviation
					previousPrice?: TokenAmount
					priceChange?: Percentage
					deviation?: Percentage
				}
			}

		: _EventCategory extends EventCategory.Custom ?
			{
				// Custom event data
				customData: {
					eventType: string
					protocol?: string

					// Flexible data storage
					stringData?: Record<string, string>
					numberData?: Record<string, number>
					addressData?: Record<string, Address>
					bytesData?: Record<string, string>

					// Nested data
					structData?: Record<string, any>
					arrayData?: Record<string, any[]>

					// Metadata
					version?: string
					metadata?: Record<string, any>
				}
			}

		:
			{}
	)

	& {
		$emitter?: PartialExceptOneOf<import('./contract').Contract,
			| 'address'
		>

		$transaction?: PartialExceptOneOf<import('./transaction').Transaction,
			| 'id'
		>

		$block?: PartialExceptOneOf<import('./block').Block,
			| 'blockHash'
		>

		// Actor references (based on event type)
		$fromActor?: PartialExceptOneOf<Actor,
			| 'address'
		>

		$toActor?: PartialExceptOneOf<Actor,
			| 'address'
		>

		// Related events (in same transaction)
		$relatedEvents?: PartialExceptOneOf<Event,
			| 'id'
		>[]

		// Triggered events (events that this event caused)
		$triggeredEvents?: PartialExceptOneOf<Event,
			| 'id'
		>[]

		// Token references
		$token?: PartialExceptOneOf<import('./token').Token,
			| 'address'
		>

		// NFT references
		$nft?: PartialExceptOneOf<import('./nft').Nft,
			| 'tokenId'
			| 'contractAddress'
		>
	}
)

// Event analytics
export type EventAnalytics = {
	chainId: ChainId
	timeframe: 'OneHour' | 'OneDay' | 'SevenDays' | 'ThirtyDays'

	// Overall metrics
	totalEvents: number
	uniqueContracts: number
	uniqueAddresses: number

	// Category breakdown
	byCategory: Record<EventCategory, {
		count: number
		percentage: Percentage
		gasUsed: TokenAmount
		valueTransferred: TokenAmount
	}>

	// Top emitters
	topEmitters: {
		address: Address
		eventCount: number
		categories: EventCategory[]
		gasUsed: TokenAmount
	}[]

	// Activity patterns
	activityByHour: {
		hour: number
		eventCount: number
		activeAddresses: number
	}[]

	// Event trends
	trends: {
		growthRate: Percentage
		peakHour: number
		peakDay: string

		trendingCategories: {
			category: EventCategory
			growth: Percentage
			volume: number
		}[]

		emergingPatterns: {
			pattern: string
			frequency: number
			description: string
		}[]
	}

	// Economic impact
	economicImpact: {
		totalValueTransferred: TokenAmount
		totalGasUsed: TokenAmount
		averageGasPerEvent: TokenAmount

		defiVolume: TokenAmount
		nftVolume: TokenAmount
		bridgeVolume: TokenAmount
	}
}

// Event filter
export type EventFilter = {
	// Basic filters
	categories?: EventCategory[]
	severities?: EventSeverity[]
	addresses?: Address[] // Emitter addresses

	// Block range
	fromBlock?: BlockNumber
	toBlock?: BlockNumber
	blockNumbers?: BlockNumber[]

	// Time range
	fromTimestamp?: Timestamp
	toTimestamp?: Timestamp

	// Topic filters
	topics?: (Hash | Hash[] | null)[]

	// Transaction filters
	transactionHashes?: Hash[]
	fromAddresses?: Address[]
	toAddresses?: Address[]

	// Value filters (for transfers/swaps)
	minValue?: TokenAmount
	maxValue?: TokenAmount
	tokenAddresses?: Address[]

	// Status filters
	removed?: boolean
	confirmed?: boolean

	// Advanced filters
	hasDecodedData?: boolean
	eventNames?: string[]
	eventSignatures?: string[]

	// Pagination
	limit?: number
	offset?: number
	orderBy?: 'blockNumber' | 'timestamp' | 'logIndex' | 'gasUsed'
	orderDirection?: 'asc' | 'desc'
}

// Event subscription
export type EventSubscription = {
	id: string
	chainId: ChainId

	// Filter criteria
	filter: EventFilter

	// Subscription config
	active: boolean
	createdAt: Timestamp
	lastChecked: Timestamp

	// Delivery
	webhook?: string
	email?: string

	// Rate limiting
	maxEventsPerHour?: number
	cooldownPeriod?: number
}

// Common event patterns
export type EventPattern = {
	name: string
	description: string

	// Pattern definition
	requiredEvents: {
		category: EventCategory
		count: number
		timeWindow?: number // seconds
	}[]

	// Detection
	confidence: Percentage
	instances: {
		timestamp: Timestamp
		events: Event[]
		actors: Address[]
	}[]

	// Risk/opportunity
	riskLevel?: 'low' | 'medium' | 'high'
	profitOpportunity?: boolean
	estimatedProfit?: TokenAmount
} 