import type { Ethereum } from '../networks/types'
import { NetworkProviderConnectionType, NetworkProviderNodeType } from './types'

// https://admin.gateway.fm/projects
export const gatewayFmProviderConfigs: {
	label: string,
	endpointUrl: string,
	networkSlug: Ethereum.NetworkSlug,
	connectionType: NetworkProviderConnectionType,
	nodeType: NetworkProviderNodeType,
}[] = [
	{
		label: 'Europe (Zurich) - Arbitrum (Arbitrum One) - HTTPS (non-archival)',
		endpointUrl: 'https://rpc.eu-central-2.gateway.fm/v4/arbitrum/non-archival/arb1',
		networkSlug: 'arbitrum-one',
		connectionType: NetworkProviderConnectionType.RPC,
		nodeType: NetworkProviderNodeType.Default,
	},
	{
		label: 'Europe (Zurich) - Arbitrum (Arbitrum One) - WebSocket',
		endpointUrl: 'wss://rpc.eu-central-2.gateway.fm/ws/v4/arbitrum/non-archival/arb1',
		networkSlug: 'arbitrum-one',
		connectionType: NetworkProviderConnectionType.WebSocket,
		nodeType: NetworkProviderNodeType.Default,
	},
	{
		label: 'Europe (Zurich) - Gnosis (mainnet) - HTTPS (non-archival)',
		endpointUrl: 'https://rpc.eu-central-2.gateway.fm/v4/gnosis/non-archival/mainnet',
		networkSlug: 'gnosis',
		connectionType: NetworkProviderConnectionType.RPC,
		nodeType: NetworkProviderNodeType.Default,
	},
	{
		label: 'Europe (Zurich) - Gnosis (mainnet) - WebSocket',
		endpointUrl: 'wss://rpc.eu-central-2.gateway.fm/ws/v4/gnosis/non-archival/mainnet',
		networkSlug: 'gnosis',
		connectionType: NetworkProviderConnectionType.WebSocket,
		nodeType: NetworkProviderNodeType.Default,
	},
	{
		label: 'Europe (Sweden) - Ethereum (mainnet) - HTTPS (non-archival)',
		endpointUrl: 'https://rpc.eu-north-1.gateway.fm/v4/ethereum/non-archival/mainnet',
		networkSlug: 'ethereum',
		connectionType: NetworkProviderConnectionType.RPC,
		nodeType: NetworkProviderNodeType.Default,
	},
	{
		label: 'Europe (Sweden) - Ethereum (mainnet) - WebSocket',
		endpointUrl: 'wss://rpc.eu-north-1.gateway.fm/ws/v4/ethereum/non-archival/mainnet',
		networkSlug: 'ethereum',
		connectionType: NetworkProviderConnectionType.WebSocket,
		nodeType: NetworkProviderNodeType.Default,
	},
	{
		label: 'Europe (Sweden) - Fantom (mainnet) - HTTPS (non-archival)',
		endpointUrl: 'https://rpc.eu-north-1.gateway.fm/v4/fantom/non-archival/mainnet',
		networkSlug: 'fantom',
		connectionType: NetworkProviderConnectionType.RPC,
		nodeType: NetworkProviderNodeType.Default,
	},
	{
		label: 'Europe (Sweden) - Fantom (mainnet) - WebSocket',
		endpointUrl: 'wss://rpc.eu-north-1.gateway.fm/ws/v4/fantom/non-archival/mainnet',
		networkSlug: 'fantom',
		connectionType: NetworkProviderConnectionType.WebSocket,
		nodeType: NetworkProviderNodeType.Default,
	},
	{
		label: 'Europe (Sweden) - Near (mainnet) - HTTPS (non-archival)',
		endpointUrl: 'https://rpc.eu-north-1.gateway.fm/v4/near/non-archival/mainnet',
		networkSlug: 'near',
		connectionType: NetworkProviderConnectionType.RPC,
		nodeType: NetworkProviderNodeType.Default,
	},
	{
		label: 'Europe (Sweden) - Near (mainnet) - WebSocket',
		endpointUrl: 'wss://rpc.eu-north-1.gateway.fm/ws/v4/near/non-archival/mainnet',
		networkSlug: 'near',
		connectionType: NetworkProviderConnectionType.WebSocket,
		nodeType: NetworkProviderNodeType.Default,
	},
	{
		label: 'Europe (Sweden) - Optimism (mainnet) - HTTPS (non-archival)',
		endpointUrl: 'https://rpc.eu-north-1.gateway.fm/v4/optimism/non-archival/mainnet',
		networkSlug: 'optimism',
		connectionType: NetworkProviderConnectionType.RPC,
		nodeType: NetworkProviderNodeType.Default,
	},
	{
		label: 'Europe (Sweden) - Optimism (mainnet) - WebSocket',
		endpointUrl: 'wss://rpc.eu-north-1.gateway.fm/ws/v4/optimism/non-archival/mainnet',
		networkSlug: 'optimism',
		connectionType: NetworkProviderConnectionType.WebSocket,
		nodeType: NetworkProviderNodeType.Default,
	},
	{
		label: 'Europe (Sweden) - Polygon ZkEVM (mainnet) - HTTPS (archival)',
		endpointUrl: 'https://rpc.eu-north-1.gateway.fm/v4/polygon-zkevm/archival/mainnet',
		networkSlug: 'polygon-zkevm',
		connectionType: NetworkProviderConnectionType.RPC,
		nodeType: NetworkProviderNodeType.Default,
	},
	{
		label: 'Europe (Sweden) - Polygon ZkEVM (mainnet) - WebSocket',
		endpointUrl: 'wss://rpc.eu-north-1.gateway.fm/ws/v4/polygon-zkevm/archival/mainnet',
		networkSlug: 'polygon-zkevm',
		connectionType: NetworkProviderConnectionType.WebSocket,
		nodeType: NetworkProviderNodeType.Default,
	},
	{
		label: 'Asia (Singapore) - Gnosis (mainnet) - HTTPS (non-archival)',
		endpointUrl: 'https://rpc.ap-southeast-1.gateway.fm/v4/gnosis/non-archival/mainnet',
		networkSlug: 'gnosis',
		connectionType: NetworkProviderConnectionType.RPC,
		nodeType: NetworkProviderNodeType.Default,
	},
	{
		label: 'Asia (Singapore) - Gnosis (mainnet) - WebSocket',
		endpointUrl: 'wss://rpc.ap-southeast-1.gateway.fm/ws/v4/gnosis/non-archival/mainnet',
		networkSlug: 'gnosis',
		connectionType: NetworkProviderConnectionType.WebSocket,
		nodeType: NetworkProviderNodeType.Default,
	}
]

