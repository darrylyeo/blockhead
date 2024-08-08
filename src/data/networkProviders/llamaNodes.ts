// Types/constants
import type { Ethereum } from '../networks/types'
import { NetworkProviderConnectionType, NetworkProviderNodeType } from './types'

export const llamaNodesProviderConfigs: {
	label: string,
	subdomain: string,
	chainId: Ethereum.ChainId,
	connectionType: NetworkProviderConnectionType,
	nodeType: NetworkProviderNodeType,
}[] = [
	{
		label: 'Arbitrum',
		subdomain: 'arbitrum',
		chainId: 42161,
		connectionType: NetworkProviderConnectionType.REST,
		nodeType: NetworkProviderNodeType.Default,
	},
	{
		label: 'Base',
		subdomain: 'base',
		chainId: 8453,
		connectionType: NetworkProviderConnectionType.REST,
		nodeType: NetworkProviderNodeType.Default,
	},
	{
		label: 'BNB Chain',
		subdomain: 'binance',
		chainId: 56,
		connectionType: NetworkProviderConnectionType.REST,
		nodeType: NetworkProviderNodeType.Default,
	},
	{
		label: 'Ethereum',
		subdomain: 'eth',
		chainId: 1,
		connectionType: NetworkProviderConnectionType.REST,
		nodeType: NetworkProviderNodeType.Default,
	},
	{
		label: 'Optimism',
		subdomain: 'optimism',
		chainId: 10,
		connectionType: NetworkProviderConnectionType.REST,
		nodeType: NetworkProviderNodeType.Default,
	},
	{
		label: 'Polygon',
		subdomain: 'polygon',
		chainId: 137,
		connectionType: NetworkProviderConnectionType.REST,
		nodeType: NetworkProviderNodeType.Default,
	},
]
