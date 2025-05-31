import type { PartialExceptOneOf } from '../typescript/PartialExceptOneOf'
import type { Address, Hash } from './scalars'
import type { Timestamp } from './types'

export type ChainId = number
export type NetworkId = string

export enum NetworkType {
	Mainnet = 'Mainnet',
	Testnet = 'Testnet',
	Devnet = 'Devnet',
	Layer2 = 'Layer2',
	Sidechain = 'Sidechain',
	PrivateNetwork = 'PrivateNetwork',
	Rollup = 'Rollup',
	Subnet = 'Subnet'
}

export enum ConsensusType {
	ProofOfWork = 'ProofOfWork',
	ProofOfStake = 'ProofOfStake',
	ProofOfAuthority = 'ProofOfAuthority',
	DelegatedProofOfStake = 'DelegatedProofOfStake',
	ProofOfHistory = 'ProofOfHistory',
	ProofOfSpacetime = 'ProofOfSpacetime',
	ByzantineFaultTolerance = 'ByzantineFaultTolerance',
	Other = 'Other'
}

export enum NetworkStatus {
	Active = 'Active',
	Deprecated = 'Deprecated',
	Maintenance = 'Maintenance',
	Halted = 'Halted',
	Beta = 'Beta',
	Alpha = 'Alpha'
}

export enum RollupType {
	Optimistic = 'Optimistic',
	ZKRollup = 'ZKRollup',
	Validium = 'Validium',
	Plasma = 'Plasma',
	StateChannel = 'StateChannel'
}

export type NetworkAsset = {
	name: string
	symbol: string
	decimals: number
	contractAddress?: Address
}

export type Network<_NetworkType extends NetworkType = NetworkType> = {
	// Network identification
	id: NetworkId
	chainId: ChainId
	name: string
	shortName?: string
	slug?: string
	
	// Network properties
	type: _NetworkType
	consensus: ConsensusType
	status: NetworkStatus
	isTestnet: boolean
	isDeprecated?: boolean
	
	// Parent/child relationships
	parentChainId?: ChainId
	parentNetworkId?: NetworkId
	childChainIds?: ChainId[]
	
	// Native currency
	nativeCurrency: NetworkAsset
	wrappedNativeToken?: Address
	
	// Gas configuration
	gasToken?: NetworkAsset // For L2s with different gas tokens
	eip1559?: boolean
	baseFeePerGas?: string
	priorityFeePerGas?: string
	
	// Network parameters
	blockTime: number // seconds
	blockGasLimit: string
	finalityBlocks?: number
	confirmationsRequired?: number
	
	// Genesis
	genesisBlock?: {
		hash: Hash
		timestamp: Timestamp
		gasLimit: string
		difficulty?: string
		nonce?: string
	}
	
	// Deployment
	deploymentBlock?: number
	deploymentTimestamp?: Timestamp
	
	// RPCs and infrastructure
	rpcUrls: {
		default: string[]
		public?: string[]
		authenticated?: string[]
		websocket?: string[]
		archive?: string[]
	}
	
	// Block explorers
	blockExplorers: Array<{
		name: string
		url: string
		apiUrl?: string
		apiKey?: string
		standard?: 'etherscan' | 'blockscout' | 'custom'
	}>
	
	// Bridges
	bridges?: Array<{
		name: string
		url: string
		contractAddress?: Address
		targetChainId: ChainId
	}>
	
	// Contracts
	contracts?: {
		multicall?: Address
		multicall2?: Address
		multicall3?: Address
		ensRegistry?: Address
		ensUniversalResolver?: Address
		weth?: Address
		create2Factory?: Address
		deterministicDeployment?: Address
	}
	
	// Icons and branding
	iconUrl?: string
	iconBackground?: string
	
	// Features
	features?: {
		eip155: boolean
		eip1559: boolean
		eip2718: boolean
		eip2930: boolean
		accountAbstraction?: boolean
		flashbots?: boolean
	}
	
	// Hard forks
	hardforks?: Array<{
		name: string
		blockNumber: number
		timestamp?: Timestamp
		eips?: number[]
	}>
	
	// Network statistics
	stats?: {
		latestBlock: number
		totalTransactions?: number
		totalAddresses?: number
		totalContracts?: number
		averageBlockTime?: number
		tps?: number // transactions per second
		gasPrice?: string
		
		// PoW specific
		hashRate?: string
		difficulty?: string
		
		// PoS specific
		totalStaked?: string
		validatorCount?: number
		apr?: number
	}
	
	// Documentation
	infoUrl?: string
	documentation?: string
	faucets?: string[]
	
	// Custom metadata
	metadata?: Record<string, any>
} & (
	_NetworkType extends NetworkType.Layer2 | NetworkType.Rollup ?
		{
			// L2/Rollup specific configuration
			rollupConfig: {
				type: RollupType
				bridgeContract?: Address
				sequencer?: Address
				proposer?: Address
				challenger?: Address
				stateRoot?: Hash
				dataAvailability?: 'onchain' | 'offchain' | 'celestia' | 'eigenda'
				withdrawalPeriod?: number // seconds
				
				// L2 specific parameters
				l1GasPrice?: string
				l2GasPrice?: string
				compressionRatio?: number
				batchSize?: number
				
				// Security model
				fraudProofWindow?: number
				validityProofFrequency?: number
			}
			
			// L2 costs
			l2Costs?: {
				l1DataCost: string
				l2ExecutionCost: string
				totalCost: string
				costReduction: number // percentage vs L1
			}
		}
	: _NetworkType extends NetworkType.Sidechain ?
		{
			// Sidechain specific configuration
			sidechainConfig: {
				consensusMechanism: string
				bridgeType: 'federated' | 'decentralized' | 'hybrid'
				validators?: Address[]
				checkpointInterval?: number
				
				// Security parameters
				requiredValidators?: number
				validatorRotation?: boolean
				slashingEnabled?: boolean
			}
		}
	: _NetworkType extends NetworkType.Testnet | NetworkType.Devnet ?
		{
			// Testnet/Devnet specific
			testnetConfig: {
				resetsEnabled?: boolean
				faucetUrl?: string
				faucetAmount?: string
				
				// Test parameters
				acceleratedBlocks?: boolean
				debugMode?: boolean
				unlimitedGas?: boolean
			}
		}
	: _NetworkType extends NetworkType.PrivateNetwork ?
		{
			// Private network configuration
			privateConfig: {
				accessControl: 'permissioned' | 'permissionless'
				nodeWhitelist?: Address[]
				adminNodes?: Address[]
				
				// Privacy features
				privateTransactions?: boolean
				encryptedState?: boolean
				confidentialContracts?: boolean
			}
		}
	: _NetworkType extends NetworkType.Subnet ?
		{
			// Subnet configuration
			subnetConfig: {
				parentNetwork: NetworkId
				subnetId: string
				validators: Address[]
				
				// Subnet parameters
				minValidators: number
				stakingToken?: Address
				minStake?: string
			}
		}
	: {}
)

export type NetworkActivity = {
	// Activity identification
	networkId: NetworkId
	chainId: ChainId
	timestamp: Timestamp
	
	// Block data
	blockNumber: number
	blockHash: Hash
	blockTime: number
	
	// Transactions
	transactionCount: number
	failedTransactionCount?: number
	internalTransactionCount?: number
	
	// Gas metrics
	gasUsed: string
	gasLimit: string
	baseFeePerGas?: string
	gasPrice?: string
	
	// Network health
	isHealthy: boolean
	propagationTime?: number
	uncleCount?: number
	reorganized?: boolean
}

export type NetworkGasPrice = {
	// Gas price data
	networkId: NetworkId
	chainId: ChainId
	timestamp: Timestamp
	
	// Legacy gas
	gasPrice?: string
	
	// EIP-1559
	baseFeePerGas?: string
	maxPriorityFeePerGas?: string
	maxFeePerGas?: string
	
	// Recommendations
	slow?: {
		gasPrice?: string
		maxPriorityFeePerGas?: string
		maxFeePerGas?: string
		estimatedTime?: number // seconds
	}
	standard?: {
		gasPrice?: string
		maxPriorityFeePerGas?: string
		maxFeePerGas?: string
		estimatedTime?: number
	}
	fast?: {
		gasPrice?: string
		maxPriorityFeePerGas?: string
		maxFeePerGas?: string
		estimatedTime?: number
	}
	
	// Percentiles
	percentiles?: Record<number, string> // e.g., { 10: "1", 50: "5", 90: "10" }
}

export type NetworkNode = {
	// Node identification
	id: string
	networkId: NetworkId
	chainId: ChainId
	
	// Node info
	name?: string
	version?: string
	client?: 'geth' | 'erigon' | 'nethermind' | 'besu' | 'openethereum' | 'other'
	
	// Connection
	endpoint?: string
	isPublic: boolean
	requiresAuth?: boolean
	
	// Capabilities
	isArchive?: boolean
	tracingEnabled?: boolean
	debugEnabled?: boolean
	
	// Performance
	syncStatus?: 'synced' | 'syncing' | 'not-synced'
	latestBlock?: number
	peerCount?: number
	
	// Location
	region?: string
	provider?: string
}

export type NetworkUpgrade = {
	// Upgrade identification
	name: string
	networkId: NetworkId
	chainId: ChainId
	
	// Activation
	blockNumber?: number
	timestamp?: Timestamp
	epoch?: number
	
	// Changes
	eips?: number[]
	features?: string[]
	breakingChanges?: boolean
	
	// Description
	description?: string
	proposalUrl?: string
	discussionUrl?: string
	
	// Status
	status: 'proposed' | 'scheduled' | 'activated' | 'rejected'
}

export type NetworkComparison = {
	// Comparison data
	networks: NetworkId[]
	
	// Metrics
	metrics: {
		tps: Record<NetworkId, number>
		blockTime: Record<NetworkId, number>
		gasPrice: Record<NetworkId, string>
		finalityTime: Record<NetworkId, number>
		decentralization: Record<NetworkId, number> // score 0-100
	}
	
	// Features
	features: Record<NetworkId, string[]>
	
	// Costs
	transactionCost: Record<NetworkId, number> // in USD
	deploymentCost: Record<NetworkId, number> // in USD
}

// Predefined networks
export const ETHEREUM_MAINNET: Network<NetworkType.Mainnet> = {
	id: 'ethereum-mainnet',
	chainId: 1,
	name: 'Ethereum Mainnet',
	shortName: 'eth',
	type: NetworkType.Mainnet,
	consensus: ConsensusType.ProofOfStake,
	status: NetworkStatus.Active,
	isTestnet: false,
	nativeCurrency: {
		name: 'Ether',
		symbol: 'ETH',
		decimals: 18,
	},
	eip1559: true,
	blockTime: 12,
	blockGasLimit: '30000000',
	rpcUrls: {
		default: ['https://eth.llamarpc.com'],
		public: ['https://cloudflare-eth.com'],
	},
	blockExplorers: [{
		name: 'Etherscan',
		url: 'https://etherscan.io',
		standard: 'etherscan',
	}],
	iconUrl: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png',
}

export const ARBITRUM_ONE: Network<NetworkType.Layer2> = {
	id: 'arbitrum-one',
	chainId: 42161,
	name: 'Arbitrum One',
	shortName: 'arb1',
	type: NetworkType.Layer2,
	consensus: ConsensusType.ProofOfAuthority,
	status: NetworkStatus.Active,
	isTestnet: false,
	parentChainId: 1,
	nativeCurrency: {
		name: 'Ether',
		symbol: 'ETH',
		decimals: 18,
	},
	blockTime: 1,
	blockGasLimit: '32000000',
	rpcUrls: {
		default: ['https://arb1.arbitrum.io/rpc'],
	},
	blockExplorers: [{
		name: 'Arbiscan',
		url: 'https://arbiscan.io',
		standard: 'etherscan',
	}],
	rollupConfig: {
		type: RollupType.Optimistic,
		withdrawalPeriod: 604800, // 7 days
	},
}

export const SUPPORTED_CHAINS: Record<ChainId, Network> = {
	[ETHEREUM_MAINNET.chainId]: ETHEREUM_MAINNET,
	[ARBITRUM_ONE.chainId]: ARBITRUM_ONE,
} 