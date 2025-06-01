import type { ChainId } from '$/entities/network'

export enum DataSource {
	Viem = 'viem',
	Blockscout = 'blockscout',
	OneInch = '1inch',
	TheGraph = 'thegraph',
	Alchemy = 'alchemy',
	Infura = 'infura',
	Moralis = 'moralis',
	Covalent = 'covalent',
	Zapper = 'zapper',
	DefiLlama = 'defillama',
}

export type DataSourceConfig = {
	source: DataSource
	chainId?: ChainId
	apiKey?: string
	endpoint?: string
	rateLimit?: number
	timeout?: number
	retries?: number
	isEnabled: boolean
}

export type DataSourceStatus = {
	source: DataSource
	isOnline: boolean
	latency?: number
	lastChecked: number
	errorCount: number
	successCount: number
	rateLimitRemaining?: number
	rateLimitReset?: number
	healthScore: number // 0-100
}

// Supported chains per data source
const SUPPORTED_CHAINS: Record<DataSource, ChainId[]> = {
	[DataSource.Viem]: [1, 137, 42161, 10, 56, 250, 43114, 100, 8453, 59144],
	[DataSource.Blockscout]: [1, 137, 42161, 10, 56, 250, 43114, 100, 8453],
	[DataSource.OneInch]: [1, 137, 42161, 56, 43114, 250, 100, 10],
	[DataSource.TheGraph]: [1, 137, 42161, 10, 56, 250, 43114, 100],
	[DataSource.Alchemy]: [1, 137, 42161, 10, 8453],
	[DataSource.Infura]: [1, 137, 42161, 10],
	[DataSource.Moralis]: [1, 137, 56, 43114, 250],
	[DataSource.Covalent]: [1, 137, 56, 43114, 250, 42161],
	[DataSource.Zapper]: [1, 137, 42161, 10, 56, 43114, 250],
	[DataSource.DefiLlama]: [1, 137, 42161, 10, 56, 43114, 250, 100],
}

// Get available data sources for a chain
export const getAvailableDataSources = (chainId: ChainId): DataSource[] => {
	return Object.entries(SUPPORTED_CHAINS)
		.filter(([, chains]) => chains.includes(chainId))
		.map(([source]) => source as DataSource)
}

// Check if a data source supports a chain
export const isChainSupported = (source: DataSource, chainId: ChainId): boolean => {
	return SUPPORTED_CHAINS[source]?.includes(chainId) ?? false
}

// Get data source priority order (higher priority first)
export const getDataSourcePriority = (source: DataSource): number => {
	switch (source) {
		case DataSource.Viem: return 100 // Highest - direct RPC
		case DataSource.Blockscout: return 90 // High - comprehensive blockchain data
		case DataSource.OneInch: return 85 // High - best for DeFi data
		case DataSource.Alchemy: return 80 // High - reliable RPC provider
		case DataSource.Infura: return 75 // Good - reliable RPC provider
		case DataSource.TheGraph: return 70 // Good - indexed data
		case DataSource.Moralis: return 60 // Medium - multi-chain data
		case DataSource.Covalent: return 55 // Medium - historical data
		case DataSource.Zapper: return 50 // Medium - DeFi specific
		case DataSource.DefiLlama: return 45 // Medium - analytics focused
		default: return 0
	}
}

// Mock data source status (would be real monitoring in production)
export const fetch = async (source: DataSource, chainId?: ChainId) => {
	// Simulate API call delay
	await new Promise(resolve => setTimeout(resolve, Math.random() * 100 + 50))
	
	// Simulate status data
	const isSupported = chainId ? isChainSupported(source, chainId) : true
	const isOnline = Math.random() > 0.05 // 95% uptime simulation
	
	return {
		source,
		chainId,
		isSupported,
		isOnline,
		latency: Math.random() * 200 + 50, // 50-250ms
		errorCount: Math.floor(Math.random() * 5),
		successCount: Math.floor(Math.random() * 1000) + 500,
		rateLimitRemaining: Math.floor(Math.random() * 1000),
		fetchedAt: Math.floor(Date.now() / 1000),
	}
}

export const normalize = (data: any, source: DataSource, chainId?: ChainId): DataSourceStatus => {
	const { isOnline, latency, errorCount, successCount, rateLimitRemaining } = data
	
	// Calculate health score
	const uptimeScore = isOnline ? 40 : 0
	const latencyScore = Math.max(0, 30 - (latency / 10)) // 0-30 points
	const reliabilityScore = Math.min(30, (successCount / (successCount + errorCount)) * 30)
	const healthScore = Math.round(uptimeScore + latencyScore + reliabilityScore)
	
	return {
		source,
		isOnline,
		latency,
		lastChecked: data.fetchedAt,
		errorCount,
		successCount,
		rateLimitRemaining,
		rateLimitReset: data.fetchedAt + 3600, // 1 hour from now
		healthScore: Math.max(0, Math.min(100, healthScore)),
	}
}

// Get optimal data source for a specific use case
export const getOptimalDataSource = (
	chainId: ChainId,
	useCase: 'balance' | 'transaction' | 'token' | 'nft' | 'trace' | 'block',
	availableSources?: DataSource[]
): DataSource | null => {
	const candidates = availableSources || getAvailableDataSources(chainId)
	
	// Filter by use case preferences
	const useCasePreferences: Record<string, DataSource[]> = {
		balance: [DataSource.OneInch, DataSource.Viem, DataSource.Alchemy, DataSource.Blockscout],
		transaction: [DataSource.Viem, DataSource.Blockscout, DataSource.Alchemy],
		token: [DataSource.OneInch, DataSource.Blockscout, DataSource.Viem],
		nft: [DataSource.Alchemy, DataSource.Moralis, DataSource.Blockscout],
		trace: [DataSource.Viem, DataSource.Alchemy],
		block: [DataSource.Viem, DataSource.Blockscout, DataSource.Alchemy],
	}
	
	const preferred = useCasePreferences[useCase] || candidates
	const available = preferred.filter(source => candidates.includes(source))
	
	if (available.length === 0) return null
	
	// Return highest priority available source
	return available.sort((a, b) => getDataSourcePriority(b) - getDataSourcePriority(a))[0]
}
