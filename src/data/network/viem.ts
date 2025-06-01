import type { ChainId } from '$/entities/network'

// Network configuration
const getNetworkConfig = (chainId: ChainId) => {
	switch (chainId) {
		case 1:
			return {
				name: 'Ethereum',
				shortName: 'eth',
				nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
				rpcUrls: ['https://rpc.ankr.com/eth'],
				blockExplorers: ['https://etherscan.io'],
				iconUrl: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
				isMainnet: true,
				layer: 'L1',
				consensus: 'pos',
			}
		case 137:
			return {
				name: 'Polygon',
				shortName: 'matic',
				nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
				rpcUrls: ['https://rpc.ankr.com/polygon'],
				blockExplorers: ['https://polygonscan.com'],
				iconUrl: 'https://cryptologos.cc/logos/polygon-matic-logo.png',
				isMainnet: true,
				layer: 'L2',
				consensus: 'pos',
			}
		case 42161:
			return {
				name: 'Arbitrum One',
				shortName: 'arb1',
				nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
				rpcUrls: ['https://rpc.ankr.com/arbitrum'],
				blockExplorers: ['https://arbiscan.io'],
				iconUrl: 'https://cryptologos.cc/logos/arbitrum-arb-logo.png',
				isMainnet: true,
				layer: 'L2',
				consensus: 'sequencer',
			}
		case 10:
			return {
				name: 'Optimism',
				shortName: 'oeth',
				nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
				rpcUrls: ['https://rpc.ankr.com/optimism'],
				blockExplorers: ['https://optimistic.etherscan.io'],
				iconUrl: 'https://cryptologos.cc/logos/optimism-ethereum-op-logo.png',
				isMainnet: true,
				layer: 'L2',
				consensus: 'sequencer',
			}
		case 56:
			return {
				name: 'BNB Smart Chain',
				shortName: 'bnb',
				nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
				rpcUrls: ['https://rpc.ankr.com/bsc'],
				blockExplorers: ['https://bscscan.com'],
				iconUrl: 'https://cryptologos.cc/logos/bnb-bnb-logo.png',
				isMainnet: true,
				layer: 'L1',
				consensus: 'poa',
			}
		case 250:
			return {
				name: 'Fantom Opera',
				shortName: 'ftm',
				nativeCurrency: { name: 'Fantom', symbol: 'FTM', decimals: 18 },
				rpcUrls: ['https://rpc.ankr.com/fantom'],
				blockExplorers: ['https://ftmscan.com'],
				iconUrl: 'https://cryptologos.cc/logos/fantom-ftm-logo.png',
				isMainnet: true,
				layer: 'L1',
				consensus: 'pos',
			}
		case 43114:
			return {
				name: 'Avalanche C-Chain',
				shortName: 'avax',
				nativeCurrency: { name: 'Avalanche', symbol: 'AVAX', decimals: 18 },
				rpcUrls: ['https://rpc.ankr.com/avalanche'],
				blockExplorers: ['https://snowtrace.io'],
				iconUrl: 'https://cryptologos.cc/logos/avalanche-avax-logo.png',
				isMainnet: true,
				layer: 'L1',
				consensus: 'pos',
			}
		case 100:
			return {
				name: 'Gnosis Chain',
				shortName: 'gno',
				nativeCurrency: { name: 'xDAI', symbol: 'xDAI', decimals: 18 },
				rpcUrls: ['https://rpc.ankr.com/gnosis'],
				blockExplorers: ['https://gnosisscan.io'],
				iconUrl: 'https://cryptologos.cc/logos/gnosis-gno-logo.png',
				isMainnet: true,
				layer: 'L1',
				consensus: 'poa',
			}
		case 8453:
			return {
				name: 'Base',
				shortName: 'base',
				nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
				rpcUrls: ['https://rpc.ankr.com/base'],
				blockExplorers: ['https://basescan.org'],
				iconUrl: 'https://cryptologos.cc/logos/base-base-logo.png',
				isMainnet: true,
				layer: 'L2',
				consensus: 'sequencer',
			}
		case 59144:
			return {
				name: 'Linea',
				shortName: 'linea',
				nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
				rpcUrls: ['https://rpc.linea.build'],
				blockExplorers: ['https://lineascan.build'],
				iconUrl: 'https://cryptologos.cc/logos/linea-linea-logo.png',
				isMainnet: true,
				layer: 'L2',
				consensus: 'sequencer',
			}
		default:
			return {
				name: `Chain ${chainId}`,
				shortName: `chain-${chainId}`,
				nativeCurrency: { name: 'Native Token', symbol: 'NATIVE', decimals: 18 },
				rpcUrls: [],
				blockExplorers: [],
				iconUrl: undefined,
				isMainnet: false,
				layer: 'L1',
				consensus: 'unknown',
			}
	}
}

export const fetch = async (chainId: ChainId) => {
	const { getViemClient } = await import('$/api/viem/index')
	
	try {
		const client = getViemClient(chainId)
		
		// Fetch current network status
		const [blockNumber, gasPrice, chainIdFromRpc] = await Promise.allSettled([
			client.getBlockNumber(),
			client.getGasPrice(),
			client.getChainId(),
		])
		
		const currentBlock = blockNumber.status === 'fulfilled' ? Number(blockNumber.value) : 0
		const currentGasPrice = gasPrice.status === 'fulfilled' ? gasPrice.value.toString() : '0'
		const rpcChainId = chainIdFromRpc.status === 'fulfilled' ? chainIdFromRpc.value : chainId
		
		// Get latest block for timestamp
		let latestBlockTimestamp = 0
		if (currentBlock > 0) {
			try {
				const latestBlock = await client.getBlock({ blockTag: 'latest' })
				latestBlockTimestamp = Number(latestBlock.timestamp)
			} catch {
				// Fallback to current time
				latestBlockTimestamp = Math.floor(Date.now() / 1000)
			}
		}
		
		return {
			chainId: rpcChainId,
			currentBlock,
			currentGasPrice,
			latestBlockTimestamp,
			isConnected: true,
			fetchedAt: Math.floor(Date.now() / 1000),
		}
	} catch (error) {
		return {
			chainId,
			currentBlock: 0,
			currentGasPrice: '0',
			latestBlockTimestamp: 0,
			isConnected: false,
			error: error instanceof Error ? error.message : 'Unknown error',
			fetchedAt: Math.floor(Date.now() / 1000),
		}
	}
}

export const normalize = (data: any, chainId: ChainId) => {
	const config = getNetworkConfig(chainId)
	const { currentBlock, currentGasPrice, latestBlockTimestamp, isConnected, error } = data
	
	const network = {
		// Network identification
		chainId,
		name: config.name,
		shortName: config.shortName,
		
		// Network properties
		nativeCurrency: config.nativeCurrency,
		rpcUrls: config.rpcUrls,
		blockExplorers: config.blockExplorers,
		iconUrl: config.iconUrl,
		
		// Network classification
		isMainnet: config.isMainnet,
		isTestnet: !config.isMainnet,
		layer: config.layer,
		
		// Consensus mechanism
		consensus: config.consensus,
		
		// Current network state
		status: {
			isOnline: isConnected,
			currentBlock,
			latestBlockTimestamp,
			averageBlockTime: getAverageBlockTime(chainId),
			currentGasPrice,
			lastChecked: data.fetchedAt,
			error,
		},
		
		// Network features
		features: {
			eip1559: [1, 137, 42161, 10, 8453, 59144].includes(chainId),
			eip2930: [1, 137, 42161, 10, 8453, 59144].includes(chainId),
			eip4844: [1].includes(chainId), // Only Ethereum mainnet for now
			multicall: true, // Most networks support multicall
			ens: chainId === 1, // ENS only on mainnet
		},
		
		// Economic data
		economics: {
			totalSupply: undefined, // Would need additional data
			circulatingSupply: undefined,
			inflationRate: undefined,
			stakingApr: undefined,
		},
		
		// Additional metadata
		source: 'viem',
		fetchedAt: data.fetchedAt,
	}
	
	return network as any // Type assertion to avoid deep instantiation issues
}

// Get average block time for different chains
const getAverageBlockTime = (chainId: ChainId): number => {
	switch (chainId) {
		case 1: return 12 // Ethereum ~12 seconds
		case 137: return 2 // Polygon ~2 seconds
		case 42161: return 0.25 // Arbitrum ~0.25 seconds
		case 10: return 2 // Optimism ~2 seconds
		case 56: return 3 // BSC ~3 seconds
		case 250: return 1 // Fantom ~1 second
		case 43114: return 2 // Avalanche ~2 seconds
		case 100: return 5 // Gnosis ~5 seconds
		case 8453: return 2 // Base ~2 seconds
		case 59144: return 2 // Linea ~2 seconds
		default: return 12 // Default to Ethereum-like
	}
}
