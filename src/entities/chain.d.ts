// Chain and Network Types

export type ChainId = number

export type NetworkType = 
	| 'mainnet' 
	| 'testnet' 
	| 'devnet' 
	| 'l2' 
	| 'sidechain'

export type ConsensusType = 
	| 'proof-of-work' 
	| 'proof-of-stake' 
	| 'proof-of-authority' 
	| 'delegated-proof-of-stake'

export interface Chain {
	id: ChainId
	name: string
	symbol: string
	type: NetworkType
	consensus: ConsensusType
	isTestnet: boolean
	parentChainId?: ChainId // For L2s
	
	// Network properties
	blockTime: number // seconds
	finalityBlocks: number
	maxBlockSize: number // bytes
	
	// RPC and explorers
	rpcUrls: string[]
	blockExplorerUrls: string[]
	iconUrl?: string
	
	// Gas configuration
	nativeCurrency: {
		name: string
		symbol: string
		decimals: number
	}
	gasToken?: string // For L2s that use different gas tokens
	
	// L2 specific
	rollupType?: 'optimistic' | 'zk'
	bridgeContract?: string
	sequencer?: string
	
	// Deployment info
	deployBlock?: number
	deployTimestamp?: number
}

export interface HardFork {
	name: string
	chainId: ChainId
	blockNumber: number
	timestamp: number
	description: string
	eips: number[] // EIP numbers included
	changes: string[]
}

export interface NetworkStats {
	chainId: ChainId
	latestBlock: number
	totalTransactions: number
	totalAddresses: number
	totalContracts: number
	averageBlockTime: number
	hashRate?: number // For PoW chains
	totalStaked?: string // For PoS chains
	validatorCount?: number
}

// Predefined chains
export const ETHEREUM_MAINNET: Chain = {
	id: 1,
	name: 'Ethereum',
	symbol: 'ETH',
	type: 'mainnet',
	consensus: 'proof-of-stake',
	isTestnet: false,
	blockTime: 12,
	finalityBlocks: 32,
	maxBlockSize: 30000000,
	rpcUrls: ['https://eth.llamarpc.com'],
	blockExplorerUrls: ['https://etherscan.io'],
	nativeCurrency: {
		name: 'Ether',
		symbol: 'ETH',
		decimals: 18,
	},
}

export const ARBITRUM_ONE: Chain = {
	id: 42161,
	name: 'Arbitrum One',
	symbol: 'ARB',
	type: 'l2',
	consensus: 'proof-of-authority',
	isTestnet: false,
	parentChainId: 1,
	blockTime: 1,
	finalityBlocks: 1,
	maxBlockSize: 32000000,
	rpcUrls: ['https://arb1.arbitrum.io/rpc'],
	blockExplorerUrls: ['https://arbiscan.io'],
	rollupType: 'optimistic',
	nativeCurrency: {
		name: 'Ether',
		symbol: 'ETH',
		decimals: 18,
	},
}

export const POLYGON: Chain = {
	id: 137,
	name: 'Polygon',
	symbol: 'MATIC',
	type: 'sidechain',
	consensus: 'delegated-proof-of-stake',
	isTestnet: false,
	blockTime: 2,
	finalityBlocks: 128,
	maxBlockSize: 30000000,
	rpcUrls: ['https://polygon-rpc.com'],
	blockExplorerUrls: ['https://polygonscan.com'],
	nativeCurrency: {
		name: 'Polygon',
		symbol: 'MATIC',
		decimals: 18,
	},
}

export const SUPPORTED_CHAINS: Record<ChainId, Chain> = {
	[ETHEREUM_MAINNET.id]: ETHEREUM_MAINNET,
	[ARBITRUM_ONE.id]: ARBITRUM_ONE,
	[POLYGON.id]: POLYGON,
} 