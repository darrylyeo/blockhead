import type { PartialExceptOneOf } from '../typescript/PartialExceptOneOf.js'
import type { Address, Hash, Actor } from './address.js'
import type { ChainId } from './chain.js'
import type { Timestamp, BlockNumber, TokenAmount, USDAmount, Percentage, BasisPoints } from './types.js'

// Transaction types based on EIP standards
export enum TransactionType {
	Legacy = 'Legacy', // Pre-EIP-2718 transactions
	AccessList = 'AccessList', // EIP-2930 with access list
	DynamicFee = 'DynamicFee', // EIP-1559 dynamic fee
	BlobCarrying = 'BlobCarrying', // EIP-4844 blob transactions
	Deposit = 'Deposit', // L2 deposit transactions
	Withdrawal = 'Withdrawal', // L2 withdrawal transactions
	Internal = 'Internal', // Internal contract calls
	System = 'System' // System-level transactions
}

export enum TransactionStatus {
	Pending = 'Pending', // In mempool
	Included = 'Included', // Included in block
	Confirmed = 'Confirmed', // Block confirmed
	Failed = 'Failed', // Transaction failed
	Dropped = 'Dropped', // Dropped from mempool
	Replaced = 'Replaced' // Replaced by higher fee tx
}

export enum TransactionCategory {
	Transfer = 'Transfer', // Simple value transfer
	ContractCall = 'ContractCall', // Contract interaction
	ContractCreation = 'ContractCreation', // Contract deployment
	TokenTransfer = 'TokenTransfer', // ERC token transfer
	DeFi = 'DeFi', // DeFi protocol interaction
	NFT = 'NFT', // NFT transaction
	Gaming = 'Gaming', // Gaming transaction
	DAO = 'DAO', // DAO governance
	Bridge = 'Bridge', // Cross-chain bridge
	MEV = 'MEV' // MEV extraction
}

// Generic transaction type with type-specific fields
export type Transaction<_T extends TransactionType = TransactionType> = (
	& {
		// Transaction identification
		transactionId: string
		hash: Hash
		chainId: ChainId
		type: _T
		status: TransactionStatus
		category: TransactionCategory
		
		// Position in blockchain
		blockNumber?: BlockNumber
		transactionIndex?: number
		
		// Timing
		timestamp: Timestamp
		submittedAt?: Timestamp
		confirmedAt?: Timestamp
		
		// Transaction parties
		from: Address
		to?: Address
		
		// Value and gas
		value: TokenAmount
		valueFormatted: string
		nonce: number
		gasLimit: TokenAmount
		gasUsed?: TokenAmount
		gasPrice?: TokenAmount
		gasFee?: TokenAmount
		gasEfficiency?: Percentage
		
		// Transaction data
		input?: string
		output?: string
		
		// Execution result
		isSuccess: boolean
		error?: string
		revertReason?: string
		
		// Transaction metadata
		size: number // bytes
		weight?: number
		priority?: number
		isReplacement?: boolean
		
		// Network context
		networkFee?: TokenAmount
		priorityFee?: TokenAmount
		tip?: TokenAmount
		
		// Analysis metadata
		complexity?: 'low' | 'medium' | 'high' | 'extreme'
		riskLevel?: 'low' | 'medium' | 'high' | 'critical'
		confidenceScore?: Percentage
	}

	& (
		_T extends TransactionType.Legacy ?
			{
				// Legacy transaction data (pre-EIP-2718)
				legacyData: {
					gasPrice: TokenAmount
					
					// Legacy context
					v: string
					r: Hash
					s: Hash
					
					// Transaction signing
					publicKey?: string
					signature: string
					
					// Legacy analysis
					isLegacyFormat: true
					upgradeRecommended?: boolean
				}
			}

		: _T extends TransactionType.AccessList ?
			{
				// EIP-2930 access list transaction data
				accessListData: {
					gasPrice: TokenAmount
					accessList: Array<{
						address: Address
						storageKeys: Hash[]
					}>
					
					// Access list optimization
					accessListSize: number
					gasOptimization: TokenAmount
					gasSavings: TokenAmount
					
					// Storage context
					warmStorageAccesses: number
					coldStorageAccesses: number
					
					// EIP-2930 specific
					chainId: ChainId
					yParity: number
					signatureR: Hash
					signatureS: Hash
				}
			}

		: _T extends TransactionType.DynamicFee ?
			{
				// EIP-1559 dynamic fee transaction data
				dynamicFeeData: {
					maxFeePerGas: TokenAmount
					maxPriorityFeePerGas: TokenAmount
					baseFeePerGas?: TokenAmount
					
					// Fee optimization
					effectiveGasPrice: TokenAmount
					feeSavings?: TokenAmount
					feeEfficiency: Percentage
					
					// Priority context
					priorityLevel: 'low' | 'standard' | 'high' | 'urgent'
					inclusionProbability: Percentage
					estimatedWaitTime?: number
					
					// EIP-1559 specific
					accessList?: Array<{
						address: Address
						storageKeys: Hash[]
					}>
					
					// Fee burning (EIP-1559)
					burntFee?: TokenAmount
					tipToMiner?: TokenAmount
				}
			}

		: _T extends TransactionType.BlobCarrying ?
			{
				// EIP-4844 blob transaction data
				blobData: {
					maxFeePerGas: TokenAmount
					maxPriorityFeePerGas: TokenAmount
					maxFeePerBlobGas: TokenAmount
					blobVersionedHashes: Hash[]
					
					// Blob context
					blobCount: number
					totalBlobSize: number
					blobGasUsed?: number
					blobFee?: TokenAmount
					
					// Blob optimization
					compressionRatio?: Percentage
					dataEfficiency: Percentage
					
					// L2 rollup context
					rollupUsage?: {
						rollupChain: ChainId
						batchId?: string
						transactionCount?: number
						stateRoot?: Hash
					}
				}
			}

		: _T extends TransactionType.Deposit ?
			{
				// L2 deposit transaction data
				depositData: {
					l1TransactionHash?: Hash
					l1BlockNumber?: BlockNumber
					depositAmount: TokenAmount
					
					// Deposit context
					l1Token?: Address
					l2Token?: Address
					depositIndex?: number
					
					// Bridge details
					bridgeContract: Address
					bridgeType: 'native' | 'canonical' | 'third-party'
					
					// Processing details
					processingTime?: number
					confirmationBlocks?: number
					
					// Fees
					l1Fee?: TokenAmount
					bridgeFee?: TokenAmount
					totalDepositCost: TokenAmount
				}
			}

		: _T extends TransactionType.Withdrawal ?
			{
				// L2 withdrawal transaction data
				withdrawalData: {
					l2TransactionHash?: Hash
					l1ClaimHash?: Hash
					withdrawalAmount: TokenAmount
					
					// Withdrawal context
					l2Token?: Address
					l1Token?: Address
					withdrawalIndex?: number
					
					// Challenge period
					challengePeriodEnd?: Timestamp
					isChallengeable: boolean
					finalizedAt?: Timestamp
					
					// Withdrawal status
					withdrawalStatus: 'initiated' | 'proven' | 'finalized' | 'claimed'
					
					// Proofs
					withdrawalProof?: Hash[]
					stateRoot?: Hash
					
					// Fees
					l2Fee?: TokenAmount
					l1ClaimFee?: TokenAmount
					totalWithdrawalCost: TokenAmount
				}
			}

		: _T extends TransactionType.Internal ?
			{
				// Internal transaction data (from traces)
				internalData: {
					parentTransaction: Hash
					traceAddress: number[]
					callType: 'call' | 'delegatecall' | 'staticcall' | 'callcode'
					
					// Call context
					depth: number
					isError: boolean
					gasUsed: TokenAmount
					
					// Function details
					functionSelector?: Hash
					functionName?: string
					decodedInput?: Record<string, any>
					decodedOutput?: Record<string, any>
					
					// Internal execution
					subCalls?: number
					stateChanges?: number
					eventCount?: number
				}
			}

		: _T extends TransactionType.System ?
			{
				// System transaction data
				systemData: {
					systemType: 'genesis' | 'coinbase' | 'withdrawal' | 'deposit' | 'burn'
					authority?: Address
					
					// System context
					isAutomated: boolean
					systemFunction: string
					protocolVersion?: string
					
					// System parameters
					systemParameters?: Record<string, any>
					
					// Consensus context
					epoch?: number
					slot?: number
					validatorIndex?: number
					
					// Economic impact
					inflationImpact?: TokenAmount
					supplyChange?: TokenAmount
				}
			}

		:
			{}
	)

	& {
		// --
		// Entity References (using PartialExceptOneOf)
		block?: PartialExceptOneOf<import('./block.js').Block,
			| 'number'
			| 'hash'
			| 'timestamp'
		>
		
		// Transaction actors
		fromActor?: PartialExceptOneOf<Actor,
			| 'address'
			| 'type'
		>
		
		toActor?: PartialExceptOneOf<Actor,
			| 'address'
			| 'type'
		>
		
		// For contract interactions
		targetContract?: PartialExceptOneOf<import('./contract.js').Contract,
			| 'address'
			| 'standard'
			| 'metadata'
		>
		
		// For contract creation
		createdContract?: PartialExceptOneOf<import('./contract.js').Contract,
			| 'address'
			| 'standard'
			| 'deploymentTimestamp'
		>
		
		// Related transactions
		relatedTransactions?: PartialExceptOneOf<Transaction,
			| 'transactionId'
			| 'type'
			| 'timestamp'
		>[]
		
		// Replacement transactions
		replacedBy?: PartialExceptOneOf<Transaction,
			| 'transactionId'
			| 'gasPrice'
			| 'timestamp'
		>
		
		// Parent transaction (for internal transactions)
		parentTransaction?: PartialExceptOneOf<Transaction,
			| 'transactionId'
			| 'type'
			| 'status'
		>
		
		// Associated events
		events?: PartialExceptOneOf<import('./event.js').Event,
			| 'id'
			| 'category'
			| 'timestamp'
		>[]
		
		// Associated transfers
		transfers?: PartialExceptOneOf<import('./transfer.js').Transfer,
			| 'id'
			| 'category'
			| 'timestamp'
		>[]
		
		// Associated traces
		traces?: PartialExceptOneOf<import('./trace.js').Trace,
			| 'id'
			| 'type'
			| 'timestamp'
		>[]
		
		// For blob transactions
		blobs?: PartialExceptOneOf<import('./blob.js').Blob,
			| 'id'
			| 'blobHash'
			| 'size'
		>[]
		
		// For bridge transactions
		bridgeContract?: PartialExceptOneOf<import('./contract.js').Contract,
			| 'address'
			| 'standard'
		>
		
		// Cross-chain context
		l1Transaction?: PartialExceptOneOf<Transaction,
			| 'transactionId'
			| 'chainId'
			| 'timestamp'
		>
		
		l2Transaction?: PartialExceptOneOf<Transaction,
			| 'transactionId'
			| 'chainId'
			| 'timestamp'
		>
	}
)

// Convenience type aliases
export type LegacyTransaction = Transaction<TransactionType.Legacy>
export type AccessListTransaction = Transaction<TransactionType.AccessList>
export type DynamicFeeTransaction = Transaction<TransactionType.DynamicFee>
export type BlobTransaction = Transaction<TransactionType.BlobCarrying>
export type DepositTransaction = Transaction<TransactionType.Deposit>
export type WithdrawalTransaction = Transaction<TransactionType.Withdrawal>
export type InternalTransaction = Transaction<TransactionType.Internal>
export type SystemTransaction = Transaction<TransactionType.System>

export type AnyTransaction = Transaction<TransactionType>

// Transaction analytics
export enum TransactionAnalyticsTimeframe {
	OneHour = 'OneHour',
	OneDay = 'OneDay',
	SevenDays = 'SevenDays',
	ThirtyDays = 'ThirtyDays'
}

export type TransactionAnalytics = {
	chainId: ChainId
	timeframe: TransactionAnalyticsTimeframe
	
	// Volume metrics
	totalTransactions: number
	totalValue: TokenAmount
	totalFees: TokenAmount
	averageTransactionValue: TokenAmount
	averageFee: TokenAmount
	
	// Type breakdown
	byType: Record<TransactionType, {
		count: number
		percentage: Percentage
		volume: TokenAmount
		averageFee: TokenAmount
	}>
	
	// Status distribution
	byStatus: Record<TransactionStatus, {
		count: number
		percentage: Percentage
	}>
	
	// Category breakdown
	byCategory: Record<TransactionCategory, {
		count: number
		volume: TokenAmount
		averageSize: number
		successRate: Percentage
	}>
	
	// Gas analysis
	gasAnalysis: {
		totalGasUsed: TokenAmount
		averageGasPrice: TokenAmount
		gasUtilization: Percentage
		gasEfficiency: Percentage
		
		gasPriceDistribution: {
			p10: TokenAmount
			p25: TokenAmount
			p50: TokenAmount
			p75: TokenAmount
			p90: TokenAmount
			p95: TokenAmount
			p99: TokenAmount
		}
	}
	
	// Network activity
	networkActivity: {
		uniqueSenders: number
		uniqueReceivers: number
		newAddresses: number
		activeContracts: number
		
		transactionFrequency: Array<{
			hour: number
			count: number
			volume: TokenAmount
			averageFee: TokenAmount
		}>
	}
	
	// Success metrics
	successMetrics: {
		overallSuccessRate: Percentage
		failureReasons: Array<{
			reason: string
			count: number
			percentage: Percentage
		}>
		
		averageConfirmationTime: number
		mempoolMetrics: {
			averageWaitTime: number
			dropRate: Percentage
			replacementRate: Percentage
		}
	}
}

export type TransactionFilter = {
	// Basic filters
	types?: TransactionType[]
	statuses?: TransactionStatus[]
	categories?: TransactionCategory[]
	from?: Address[]
	to?: Address[]
	involving?: Address[]
	
	// Value filters
	minValue?: TokenAmount
	maxValue?: TokenAmount
	hasValue?: boolean
	
	// Gas filters
	minGas?: TokenAmount
	maxGas?: TokenAmount
	minGasPrice?: TokenAmount
	maxGasPrice?: TokenAmount
	gasEfficiencyRange?: {
		min: Percentage
		max: Percentage
	}
	
	// Size filters
	minSize?: number
	maxSize?: number
	
	// Time range
	fromTimestamp?: Timestamp
	toTimestamp?: Timestamp
	fromBlock?: BlockNumber
	toBlock?: BlockNumber
	
	// Status filters
	isSuccess?: boolean
	hasError?: boolean
	isReplacement?: boolean
	
	// Contract filters
	hasCallData?: boolean
	createsContract?: boolean
	contractAddresses?: Address[]
	
	// Advanced filters
	hasAccessList?: boolean
	hasBlobData?: boolean
	isInternal?: boolean
	functionSelectors?: Hash[]
	
	// Pagination and sorting
	limit?: number
	offset?: number
	orderBy?: 'timestamp' | 'value' | 'gasUsed' | 'gasPrice' | 'blockNumber'
	orderDirection?: 'asc' | 'desc'
}

export type TransactionPool = {
	chainId: ChainId
	
	// Pool state
	totalTransactions: number
	totalValue: TokenAmount
	memoryUsage: number // bytes
	
	// Transaction distribution
	byType: Record<TransactionType, number>
	byCategory: Record<TransactionCategory, number>
	
	// Fee market
	feeMarket: {
		pendingTransactions: number
		queuedTransactions: number
		
		gasPrice: {
			min: TokenAmount
			max: TokenAmount
			average: TokenAmount
			median: TokenAmount
		}
		
		priorityFee: {
			min: TokenAmount
			max: TokenAmount
			average: TokenAmount
			median: TokenAmount
		}
		
		// Fee recommendations
		feeRecommendations: {
			slow: TokenAmount
			standard: TokenAmount
			fast: TokenAmount
			instant: TokenAmount
		}
	}
	
	// Pool performance
	performance: {
		inclusionRate: Percentage
		averageWaitTime: number
		dropRate: Percentage
		
		// Congestion analysis
		congestionLevel: 'low' | 'medium' | 'high' | 'critical'
		estimatedClearTime: number
		
		// Pool efficiency
		throughput: number // tx/second
		utilization: Percentage
	}
	
	// Top transactions
	highestValue: Array<{
		hash: Hash
		value: TokenAmount
		gasPrice: TokenAmount
		from: Address
		to?: Address
	}>
	
	highestFee: Array<{
		hash: Hash
		gasPrice: TokenAmount
		maxFeePerGas?: TokenAmount
		gasLimit: TokenAmount
		from: Address
	}>
	
	// Pool health
	health: {
		memoryPressure: Percentage
		processingDelay: number
		networkLatency: number
		
		// Issues
		issues: Array<{
			type: 'memory' | 'processing' | 'network' | 'consensus'
			severity: 'low' | 'medium' | 'high' | 'critical'
			description: string
			count: number
		}>
	}
}

export type TransactionTrace = {
	transactionHash: Hash
	chainId: ChainId
	
	// Trace metadata
	executionTime: number
	gasUsed: TokenAmount
	traceCount: number
	maxDepth: number
	
	// Execution flow
	executionFlow: Array<{
		step: number
		traceAddress: number[]
		from: Address
		to?: Address
		value: TokenAmount
		gasUsed: TokenAmount
		depth: number
		isSuccess: boolean
		error?: string
	}>
	
	// Call tree
	callTree: {
		root: {
			address: Address
			children: Array<{
				address: Address
				callType: string
				gasUsed: TokenAmount
				value: TokenAmount
				children?: any[]
			}>
		}
	}
	
	// State changes
	stateChanges: {
		balanceChanges: Array<{
			address: Address
			before: TokenAmount
			after: TokenAmount
			delta: TokenAmount
		}>
		
		storageChanges: Array<{
			address: Address
			slot: Hash
			before: Hash
			after: Hash
		}>
		
		codeChanges: Array<{
			address: Address
			operation: 'create' | 'destroy'
			size?: number
		}>
		
		nonceChanges: Array<{
			address: Address
			before: number
			after: number
		}>
	}
	
	// Value flows
	valueFlows: Array<{
		from: Address
		to: Address
		value: TokenAmount
		transferType: 'call' | 'create' | 'suicide' | 'fee'
	}>
	
	// Gas analysis
	gasAnalysis: {
		gasBreakdown: Array<{
			operation: string
			gasUsed: TokenAmount
			percentage: Percentage
		}>
		
		gasEfficiency: Percentage
		wastedGas?: TokenAmount
		refunds: TokenAmount
	}
}

export type TransactionSimulation = {
	transactionHash?: Hash
	chainId: ChainId
	
	// Simulation input
	simulationInput: {
		from: Address
		to?: Address
		value: TokenAmount
		gasLimit: TokenAmount
		gasPrice: TokenAmount
		data?: string
		
		// Simulation context
		blockNumber?: BlockNumber
		timestamp?: Timestamp
		difficulty?: string
	}
	
	// Simulation results
	results: {
		isSuccess: boolean
		gasUsed: TokenAmount
		gasRemaining: TokenAmount
		returnData?: string
		error?: string
		revertReason?: string
		
		// Execution trace
		trace?: Array<{
			op: string
			pc: number
			depth: number
			gas: TokenAmount
			gasCost: TokenAmount
			stack: string[]
			memory: string[]
		}>
	}
	
	// Impact analysis
	impact: {
		stateChanges: number
		contractsAffected: Address[]
		eventsGenerated: number
		
		// Economic impact
		valueTransferred: TokenAmount
		feeCost: TokenAmount
		gasEfficiency: Percentage
		
		// Risk assessment
		riskLevel: 'low' | 'medium' | 'high' | 'critical'
		riskFactors: string[]
	}
	
	// Recommendations
	recommendations: {
		gasOptimization?: {
			recommendedGasLimit: TokenAmount
			potentialSavings: TokenAmount
		}
		
		feeOptimization?: {
			recommendedGasPrice: TokenAmount
			estimatedWaitTime: number
		}
		
		securityWarnings?: Array<{
			type: string
			severity: 'info' | 'warning' | 'error'
			message: string
		}>
	}
}

export type TransactionBundle = {
	id: string
	chainId: ChainId
	
	// Bundle metadata
	transactionCount: number
	totalValue: TokenAmount
	totalGas: TokenAmount
	bundleSize: number // bytes
	
	// Bundle composition
	transactions: Hash[]
	bundleType: 'mev' | 'atomic' | 'batch' | 'flashloan'
	
	// Bundle execution
	isAtomic: boolean
	executionOrder: number[]
	dependencies: Array<{
		from: number
		to: number
		type: 'value' | 'state' | 'nonce'
	}>
	
	// Bundle economics
	totalRevenue?: TokenAmount
	totalCost: TokenAmount
	netProfit?: TokenAmount
	profitability?: Percentage
	
	// MEV analysis
	mevData?: {
		mevType: 'arbitrage' | 'sandwich' | 'liquidation' | 'frontrun' | 'backrun'
		extractedValue: TokenAmount
		victimTransactions?: Hash[]
		profitMargin: Percentage
	}
	
	// Bundle performance
	performance: {
		inclusionProbability: Percentage
		estimatedBlockInclusion?: number
		gasEfficiency: Percentage
		
		// Simulation results
		simulationSuccess: boolean
		simulationGasUsed?: TokenAmount
		simulationErrors?: string[]
	}
	
	// Competition analysis
	competition?: {
		competingBundles: number
		bidPrice?: TokenAmount
		marketPosition: number
		winProbability: Percentage
	}
} 