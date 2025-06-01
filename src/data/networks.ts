import type { Network, ChainId } from '$/entities/network'

export const networks = [
	{
		chainId: 1,
		slug: 'ethereum',
		name: 'Ethereum',
	},
	{
		chainId: 137,
		slug: 'polygon',
		name: 'Polygon',
	},
	{
		chainId: 42161,
		slug: 'arbitrum',
		name: 'Arbitrum',
	},
	{
		chainId: 501,
		slug: 'solana',
		name: 'Solana',
	},
] as const satisfies Pick<Network, 'chainId' | 'slug' | 'name'>[]

export const networksByChainId: Map<ChainId, typeof networks[number]> = (
	new Map(
		networks
			.map((network) => [
				network.chainId,
				network
			] as const)
	)
)

export const CHAIN_NATIVE_CURRENCY = {
	1: { name: 'Ether', symbol: 'ETH', decimals: 18, networkName: 'Ethereum' },
	137: { name: 'Polygon', symbol: 'MATIC', decimals: 18, networkName: 'Polygon' },
	42161: { name: 'Ether', symbol: 'ETH', decimals: 18, networkName: 'Arbitrum' },
	10: { name: 'Ether', symbol: 'ETH', decimals: 18, networkName: 'Optimism' },
	56: { name: 'BNB', symbol: 'BNB', decimals: 18, networkName: 'BSC' },
	250: { name: 'Fantom', symbol: 'FTM', decimals: 18, networkName: 'Fantom' },
	43114: { name: 'Avalanche', symbol: 'AVAX', decimals: 18, networkName: 'Avalanche' },
	100: { name: 'xDAI', symbol: 'xDAI', decimals: 18, networkName: 'Gnosis' },
	8453: { name: 'Ether', symbol: 'ETH', decimals: 18, networkName: 'Base' },
	59144: { name: 'Ether', symbol: 'ETH', decimals: 18, networkName: 'Linea' },
} as const

export const getChainNativeCurrency = (chainId: ChainId) => 
	CHAIN_NATIVE_CURRENCY[chainId as keyof typeof CHAIN_NATIVE_CURRENCY] ?? 
	{ name: 'Native Token', symbol: 'NATIVE', decimals: 18, networkName: 'Unknown' } 