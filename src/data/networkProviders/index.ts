// Types
import type { Ethereum } from '../networks/types'
import type { Provider } from 'ethers'
import { NetworkProvider, NetworkProviderConnectionType, NetworkProviderNodeType } from './types'


// Constants
import { env } from '../../env'
import { networksBySlug } from '../networks'


// Utils
import { memoizedAsync } from '../../utils/memoized'


// APIs
import {
	getDefaultProvider,
	JsonRpcProvider,
	WebSocketProvider,
	AlchemyProvider,
	EtherscanProvider,
	InfuraProvider,
	PocketProvider,
} from 'ethers'
// import { getMoralisJSONRPCEndpoint } from '../../api/moralis/endpoints'
import { figmentProviderConfigs } from './figment'
import { infuraProviderConfigs } from './infura'
import { tenderlyProviderConfigs } from './tenderly'
import { pocketProviderConfigs } from './pocket'
import { gatewayFmProviderConfigs } from './gatewayFm'
import { getBlockProviderConfigs } from './getBlock'


// Icons
import { AlchemyIcon, EtherscanIcon, FigmentIcon, GatewayFmIcon, GetBlockIcon, InfuraIcon, MoralisIcon, TenderlyIcon, PocketIcon, QuickNodeIcon } from '../../assets/icons'


type NetworkProviderConfig = {
	provider: NetworkProvider,
	name: string,
	icon?: string,
	get: (_: {
		network: Ethereum.Network,
		connectionType: NetworkProviderConnectionType,
		nodeType: NetworkProviderNodeType,
	}) => Provider | JsonRpcProvider
}


export const networkProviderConfigs: NetworkProviderConfig[] = [
	{
		provider: NetworkProvider.Default,
		name: 'Default RPC Provider',
		get: ({ network }) => (
			new JsonRpcProvider(
				network.rpc?.[0],
				network.chainId
			)
		)
	},

	// {
	// 	provider: NetworkProvider.Default,
	// 	name: 'Default',
	// 	get: ({ network }) => getDefaultProvider(network.chainId, {
	// 		alchemy: env.ALCHEMY_API_KEY_MAINNET,
	// 		etherscan: env.ETHERSCAN_API_KEY,
	// 		infura: env.INFURA_API_KEY,
	// 		pocket: {
	// 			applicationId: env.POCKET_APP_PUBLIC_KEY,
	// 			applicationSecretKey: env.POCKET_NETWORK_SECRET_KEY
	// 		},
	// 	})
	// },

	{
		provider: NetworkProvider.Infura,
		name: 'Infura',
		icon: InfuraIcon,

		get: ({
			network,
			connectionType = NetworkProviderConnectionType.RPC,
			nodeType = NetworkProviderNodeType.Default,
		}) => {
			const config = infuraProviderConfigs.find(config =>
				config.networkSlug === network.slug &&
				config.connectionType === connectionType &&
				config.nodeType === nodeType
			)

			if(!config)
				throw new Error(`Couldn't find an Infura node matching the configuration.`)

			return (
				new ({
					[NetworkProviderConnectionType.RPC]: JsonRpcProvider,
					[NetworkProviderConnectionType.JSONRPC]: JsonRpcProvider,
					[NetworkProviderConnectionType.WebSocket]: WebSocketProvider,
				}[connectionType])(
					`${config.connectionType === NetworkProviderConnectionType.WebSocket ? 'wss' : 'https'}://${config.subdomain}.infura.io/${config.connectionType === NetworkProviderConnectionType.WebSocket ? 'ws/v3' : 'v3'}/${env.INFURA_API_KEY || '84842078b09946638c03157f83405213'}`,
					network.chainId
				)
			)
		}

		// get: ({ network }) => (
		// 	new InfuraProvider(
		// 		network.chainId,
		// 		env.INFURA_API_KEY,
		// 		env.INFURA_API_KEY_SECRET
		// 	)
		// )
	},

	{
		provider: NetworkProvider.Alchemy,
		name: 'Alchemy',
		icon: AlchemyIcon,
		get: ({ network }) => (
			new AlchemyProvider(
				network.chainId,
				{
					'ethereum': env.ALCHEMY_API_KEY_MAINNET,
					'ethereum-rinkeby': env.ALCHEMY_API_KEY_RINKEBY
				}[network.slug]
			)
		)
	},

	{
		provider: NetworkProvider.PocketNetwork,
		name: 'Pocket Network',
		icon: PocketIcon,

		get: ({
			network,
			connectionType = NetworkProviderConnectionType.RPC,
			nodeType = NetworkProviderNodeType.Default,
		}) => {
			const config = pocketProviderConfigs.find(config =>
				config.networkSlug === network.slug &&
				config.connectionType === connectionType &&
				config.nodeType === nodeType
			)

			if(!config)
				throw new Error(`Couldn't find a Pocket Network node matching the configuration.`)

			return (
				new ({
					[NetworkProviderConnectionType.RPC]: JsonRpcProvider,
					[NetworkProviderConnectionType.JSONRPC]: JsonRpcProvider,
					[NetworkProviderConnectionType.WebSocket]: WebSocketProvider,
				}[connectionType])(
					`${config.connectionType === NetworkProviderConnectionType.WebSocket ? 'wss' : 'https'}://${config.subdomain}.gateway.pokt.network/v1/lb/${env.POCKET_NETWORK_PORTAL_ID}`,
					network.chainId
				)
			)
		}

		// get: ({ network }) => (
		// 	new PocketProvider(
		// 		network.chainId,
		// 		env.POCKET_NETWORK_PORTAL_ID,
		// 		env.POCKET_NETWORK_SECRET_KEY
		// 	)
		// )
	},

	// {
	// 	provider: NetworkProvider.Moralis,
	// 	name: 'Moralis',
	// 	icon: MoralisIcon,

	// 	get: ({
	// 		network,
	// 		connectionType = NetworkProviderConnectionType.WebSocket,
	// 	}) => (
	// 		new ({
	// 			[NetworkProviderConnectionType.RPC]: JsonRpcProvider,
	// 			[NetworkProviderConnectionType.JSONRPC]: JsonRpcProvider,
	// 			[NetworkProviderConnectionType.WebSocket]: WebSocketProvider,
	// 		}[connectionType])(
	// 			getMoralisJSONRPCEndpoint({
	// 				network,
	// 				protocol: 'wss'
	// 			}),
	// 			network.chainId,
	// 		)
	// 	)
	// },

	{
		provider: NetworkProvider.Etherscan,
		name: 'Etherscan',
		icon: EtherscanIcon,

		get: ({ network }) => (
			new EtherscanProvider(
				network.chainId,
				env.ETHERSCAN_API_KEY
			)
		)
	},

	{
		provider: NetworkProvider.Figment,
		name: 'Figment DataHub',
		icon: FigmentIcon,

		get: ({
			network,
			connectionType = NetworkProviderConnectionType.RPC,
			nodeType = NetworkProviderNodeType.Default,
		}) => {
			const config = figmentProviderConfigs.find(config =>
				config.networkSlug === network.slug &&
				config.connectionType === connectionType &&
				config.nodeType === nodeType
			)

			if(!config)
				throw new Error(`Couldn't find a Figment node matching the configuration.`)

			return (
				new ({
					[NetworkProviderConnectionType.RPC]: JsonRpcProvider,
					[NetworkProviderConnectionType.JSONRPC]: JsonRpcProvider,
					[NetworkProviderConnectionType.WebSocket]: WebSocketProvider,
				}[connectionType])(
					`${config.connectionType === NetworkProviderConnectionType.WebSocket ? 'wss' : 'https'}://${config.subdomain}.datahub.figment.io/apikey/${env.FIGMENT_DATA_HUB_APP_API_KEY}`,
					network.chainId
				)
			)
		}
	},

	{
		provider: NetworkProvider.Tenderly,
		name: 'Tenderly › Web3 Gateway',
		icon: TenderlyIcon,

		get: ({
			network,
			connectionType = NetworkProviderConnectionType.RPC,
			nodeType = NetworkProviderNodeType.Default,
		}) => {
			const config = tenderlyProviderConfigs.find(config =>
				config.networkSlug === network.slug &&
				config.connectionType === connectionType &&
				config.nodeType === nodeType
			)

			if(!config)
				throw new Error(`Couldn't find a Tenderly node matching the configuration.`)

			return (
				new ({
					[NetworkProviderConnectionType.RPC]: JsonRpcProvider,
					[NetworkProviderConnectionType.JSONRPC]: JsonRpcProvider,
					[NetworkProviderConnectionType.WebSocket]: WebSocketProvider,
				}[connectionType])(
					`${config.connectionType === NetworkProviderConnectionType.WebSocket ? 'wss' : 'https'}://${config.subdomain}.gateway.tenderly.co/${env.TENDERLY_WEB3_GATEWAY_API_KEY}`,
					network.chainId
				)
			)
		}
	},

	{
		provider: NetworkProvider.QuickNode,
		name: 'QuickNode',
		icon: QuickNodeIcon,

		get: ({
			network,
			connectionType = NetworkProviderConnectionType.RPC,
		}) => new JsonRpcProvider(
			`${connectionType === NetworkProviderConnectionType.WebSocket ? 'wss' : 'https'}://${{
				1: env.QUICKNODE_ENDPOINT_NAME_1,
				10: env.QUICKNODE_ENDPOINT_NAME_10,
				137: env.QUICKNODE_ENDPOINT_NAME_137,
				84531: env.QUICKNODE_ENDPOINT_NAME_84531,
				1101: env.QUICKNODE_ENDPOINT_NAME_1101,
			}[network.chainId]}.quiknode.pro/${{
				1: env.QUICKNODE_ENDPOINT_AUTHENTICATION_TOKEN_1,
				10: env.QUICKNODE_ENDPOINT_AUTHENTICATION_TOKEN_10,
				137: env.QUICKNODE_ENDPOINT_AUTHENTICATION_TOKEN_137,
				84531: env.QUICKNODE_ENDPOINT_AUTHENTICATION_TOKEN_84531,
				1101: env.QUICKNODE_ENDPOINT_AUTHENTICATION_TOKEN_1101,
			}[network.chainId]}/`,
			network.chainId
		)
	},
	{
		provider: NetworkProvider.GatewayFm,
		name: 'Gateway.fm',
		icon: GatewayFmIcon,

		get: ({
			network,
			connectionType = NetworkProviderConnectionType.RPC,
			nodeType = NetworkProviderNodeType.Default,
		}) => {
			const config = gatewayFmProviderConfigs.find(config =>
				config.networkSlug === network.slug &&
				config.connectionType === connectionType &&
				config.nodeType === nodeType
			)

			if(!config)
				throw new Error(`Couldn't find a Gateway.fm node matching the configuration.`)

			return (
				new ({
					[NetworkProviderConnectionType.RPC]: JsonRpcProvider,
					[NetworkProviderConnectionType.JSONRPC]: JsonRpcProvider,
					[NetworkProviderConnectionType.WebSocket]: WebSocketProvider,
				}[connectionType])(
					`${config.endpointUrl}?apiKey=${env.GATEWAY_FM_API_KEY}`,
					network.chainId
				)
			)
		}
	},
	
	{
		provider: NetworkProvider.GetBlock,
		name: 'GetBlock',
		icon: GetBlockIcon,

		get: ({
			network,
			connectionType = NetworkProviderConnectionType.RPC,
			nodeType = NetworkProviderNodeType.Default,
		}) => {
			const config = getBlockProviderConfigs.find(config =>
				config.networkSlug === network.slug &&
				config.connectionType === connectionType &&
				config.nodeType === nodeType
			)

			if(!config)
				throw new Error(`Couldn't find a GetBlock node matching the configuration.`)

			return (
				new ({
					[NetworkProviderConnectionType.RPC]: JsonRpcProvider,
					[NetworkProviderConnectionType.JSONRPC]: JsonRpcProvider,
					[NetworkProviderConnectionType.WebSocket]: WebSocketProvider,
				}[connectionType])(
					`${config.connectionType === NetworkProviderConnectionType.WebSocket ? 'wss' : 'https'}://${config.subdomain}.getblock.io/${env.GETBLOCK_API_KEY}/${config.path}`,
					network.chainId
				)
			)
		}
	},
]

export const networkProviderConfigByProvider = Object.fromEntries(networkProviderConfigs.map(networkProviderConfig => [networkProviderConfig.provider, networkProviderConfig]))

export const networkProviderConfigByNetworkSlug = Object.fromEntries(Object.entries({
	"arbitrum-one": [
		NetworkProvider.PocketNetwork,
		NetworkProvider.Figment,
	],
	"avalanche": [
		NetworkProvider.PocketNetwork,
		NetworkProvider.Figment,
	],
	"avalanche-fuji": [
		NetworkProvider.Figment,
	],
	"bsc": [
		NetworkProvider.Figment,
	],
	"celo": [
		NetworkProvider.Figment,
	],
	"celo-alfajores": [
		NetworkProvider.Figment,
	],
	"ethereum": [
		NetworkProvider.Alchemy,
		NetworkProvider.PocketNetwork,
		NetworkProvider.Figment,
		NetworkProvider.QuickNode,
	],
	"ethereum-ropsten": [
		// RpcProvider.Alchemy,
		NetworkProvider.PocketNetwork,
	],
	"ethereum-rinkeby": [
		NetworkProvider.Alchemy,
		NetworkProvider.PocketNetwork,
		NetworkProvider.Figment,
	],
	"ethereum-goerli": [
		// RpcProvider.Alchemy,
		NetworkProvider.PocketNetwork,
	],
	"fantom": [
		NetworkProvider.Figment,
	],
	"harmony-shard0": [
		NetworkProvider.PocketNetwork
	],
	"harmony-shard1": [],
	"oasis-paratime": [
		NetworkProvider.Figment,
	],
	"polygon": [
		NetworkProvider.PocketNetwork,
		NetworkProvider.Figment,
		NetworkProvider.QuickNode,
	],
	"polygon-mumbai": [
		NetworkProvider.Figment,
	],
	"optimism": [
		NetworkProvider.QuickNode,
	],
	"polygon-zkevm": [
		NetworkProvider.QuickNode,
	],
})
	.map(([slug, networkProviders]) =>
		[
			slug,
			[
				...(networksBySlug[slug].rpc ?? [])
					.filter(rpcUrl => rpcUrl.startsWith('https://'))
					.map(rpcUrl => ({
						type: NetworkProvider.Default,
						name: new URL(rpcUrl).host,
						// name: `Default (${new URL(rpcUrl).host})`,
						get: ({ network }) => new providers.JsonRpcProvider(rpcUrl, networksBySlug[slug].chainId)
					})),
				...networkProviders
					.map(networkProvider => networkProviderConfigByProvider[networkProvider])
			]
		]
	)
)

// for(const slug in networkProviderConfigByNetworkSlug){
// 	// if(networksBySlug[slug].rpc?.length)
// 	// 	networkProviderConfigByNetworkSlug[slug].unshift(RpcProvider.Default)

// 	const network = networksBySlug[slug]
// 	if(network.rpc?.length)
// 		networkProviderConfigByNetworkSlug[slug].unshift({
// 			type: RpcProvider.Default,
// 			name:  `Default (${new URL(network.rpc[0]).host})`,
// 			get: ({ network }) => new providers.JsonRpcProvider(network.providers?.[0], network.chainId)
// 		})
// }


export const getEthersProvider = memoizedAsync(async ({
	network,
	networkProvider,
	connectionType = NetworkProviderConnectionType.RPC,
	nodeType = NetworkProviderNodeType.Default,
}: {
	network: Ethereum.Network,
	networkProvider: NetworkProvider,
	connectionType?: NetworkProviderConnectionType,
	nodeType?: NetworkProviderNodeType,
}) => {
	if(!globalThis.document) return ''

	const providerConfig = networkProviderConfigByProvider[networkProvider]

	const ethersProvider = providerConfig?.get({
		network,
		connectionType,
		nodeType
	})

	// console.log('ethersProvider', ethersProvider)

	return ethersProvider
})
