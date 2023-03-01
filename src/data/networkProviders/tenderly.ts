import type { Ethereum } from '../networks/types'
import { NetworkProviderConnectionType, NetworkProviderNodeType } from './types'

export const tenderlyProviderConfigs: {
	label: string,
	subdomain: string,
	networkSlug: Ethereum.NetworkSlug,
	connectionType: NetworkProviderConnectionType,
	nodeType: NetworkProviderNodeType,
}[] = [
	{
		label: 'Mainnet',
		subdomain: 'mainnet',
		networkSlug: 'ethereum',
		connectionType: NetworkProviderConnectionType.RPC,
		nodeType: NetworkProviderNodeType.Default,
	},
	{
		label: 'Ropsten',
		subdomain: 'ropsten',
		networkSlug: 'ethereum-ropsten',
		connectionType: NetworkProviderConnectionType.RPC,
		nodeType: NetworkProviderNodeType.Default,
	},
	{
		label: 'Rinkeby',
		subdomain: 'rinkeby',
		networkSlug: 'ethereum-rinkeby',
		connectionType: NetworkProviderConnectionType.RPC,
		nodeType: NetworkProviderNodeType.Default,
	},
	{
		label: 'Görli',
		subdomain: 'goerli',
		networkSlug: 'ethereum-goerli',
		connectionType: NetworkProviderConnectionType.RPC,
		nodeType: NetworkProviderNodeType.Default,
	},
	{
		label: 'Sepolia',
		subdomain: 'sepolia',
		networkSlug: 'ethereum-sepolia',
		connectionType: NetworkProviderConnectionType.RPC,
		nodeType: NetworkProviderNodeType.Default,
	},
]
