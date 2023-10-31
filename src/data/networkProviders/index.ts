// Types
import type { Ethereum } from '../networks/types'
import type { Provider } from 'ethers'
import type { Chain, PublicClient } from 'viem'
import { NetworkProvider, NetworkProviderConnectionType, NetworkProviderNodeType } from './types'


// Constants
import { env } from '../../env'
import { isTestnet, networksBySlug } from '../networks'


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

import { createPublicClient, http, webSocket } from 'viem'
import * as chains from 'viem/chains'

import { alchemyProviderConfigs } from './alchemy'
// import { getMoralisJSONRPCEndpoint } from '../../api/moralis/endpoints'
import { figmentProviderConfigs } from './figment'
import { infuraProviderConfigs } from './infura'
import { tenderlyProviderConfigs } from './tenderly'
import { pocketProviderConfigs } from './pocket'
import { gatewayFmProviderConfigs } from './gatewayFm'
import { getBlockProviderConfigs } from './getBlock'
import { blastProviderConfigs } from './blast'
import { chainbaseProviderConfigs } from './chainbase'


// Icons
import { AlchemyIcon, BlastIcon, ChainbaseIcon, EtherscanIcon, FigmentIcon, GatewayFmIcon, GetBlockIcon, InfuraIcon, MoralisIcon, TenderlyIcon, PocketIcon, QuickNodeIcon } from '../../assets/icons'


// Functions
export const networkToViemChain = (network: Ethereum.Network) => ({
	id: network.chainId,
	name: network.name,
	network: network.network,
	nativeCurrency: network.nativeCurrency,
	rpcUrls: {
		default: {
			http: network.rpc
		},
		public: {
			http: network.rpc
		},
	},
	blockExplorers: {
		default: network.explorers?.[0] && {
			name: network.explorers[0].name,
			url: network.explorers[0].url,
		},
		...Object.fromEntries(network.explorers?.map(explorer => [explorer.name, { name: explorer.name, url: explorer.url }]) ?? [])
	},
	contracts: Object.values(chains).find(chain => chain.id === network.chainId)?.contracts,
	testnet: isTestnet(network),
} as Chain)


type NetworkProviderConfig = {
	provider: NetworkProvider,
	name: string,
	icon?: string,

	getEthersProvider?: (_: {
		network: Ethereum.Network,
		connectionType: NetworkProviderConnectionType,
		nodeType: NetworkProviderNodeType,
	}) => Ethereum.Provider | undefined,

	getViemPublicClient?: (_: {
		network: Ethereum.Network,
		connectionType: NetworkProviderConnectionType,
		nodeType: NetworkProviderNodeType,
	}) => Ethereum.PublicClient | undefined,
}


export const networkProviderConfigs = [
	{
		provider: NetworkProvider.Default,
		name: 'Default RPC Provider',

		getEthersProvider: ({ network }) => (
			network.rpc?.[0]
				? new JsonRpcProvider(
					network.rpc[0],
					network.chainId
				)
				: undefined

			// getDefaultProvider(network.chainId, {
			// 	alchemy: env.ALCHEMY_API_KEY_1,
			// 	etherscan: env.ETHERSCAN_API_KEY_1,
			// 	infura: env.INFURA_API_KEY,
			// 	pocket: {
			// 		applicationId: env.POCKET_APP_PUBLIC_KEY,
			// 		applicationSecretKey: env.POCKET_NETWORK_SECRET_KEY
			// 	},
			// })
		),

		getViemPublicClient: ({
			network,
			connectionType = NetworkProviderConnectionType.RPC,
		}) => (
			createPublicClient({
				chain: networkToViemChain(network),
				transport: {
					[NetworkProviderConnectionType.RPC]: http,
					[NetworkProviderConnectionType.JSONRPC]: http,
					[NetworkProviderConnectionType.WebSocket]: webSocket,
				}[connectionType](
					undefined,
					{},
				),
			})
		),
	},

	{
		provider: NetworkProvider.Infura,
		name: 'Infura',
		icon: InfuraIcon,

		getEthersProvider: ({
			network,
			connectionType = NetworkProviderConnectionType.RPC,
			nodeType = NetworkProviderNodeType.Default,
		}) => {
			const config = infuraProviderConfigs.find(config =>
				config.networkSlug === network.slug &&
				config.connectionType === connectionType &&
				config.nodeType === nodeType
			)

			return config && (
				new ({
					[NetworkProviderConnectionType.RPC]: JsonRpcProvider,
					[NetworkProviderConnectionType.JSONRPC]: JsonRpcProvider,
					[NetworkProviderConnectionType.WebSocket]: WebSocketProvider,
				}[connectionType])(
					`${config.connectionType === NetworkProviderConnectionType.WebSocket ? 'wss' : 'https'}://${config.subdomain}.infura.io/${config.connectionType === NetworkProviderConnectionType.WebSocket ? 'ws/v3' : 'v3'}/${env.INFURA_API_KEY || '84842078b09946638c03157f83405213'}`,
					network.chainId
				)
			)

			// return new InfuraProvider(
			// 	network.chainId,
			// 	env.INFURA_API_KEY,
			// 	env.INFURA_API_KEY_SECRET
			// )
		},

		getViemPublicClient: ({
			network,
			connectionType = NetworkProviderConnectionType.RPC,
			nodeType = NetworkProviderNodeType.Default,
		}) => {
			const config = infuraProviderConfigs.find(config =>
				config.networkSlug === network.slug &&
				config.connectionType === connectionType &&
				config.nodeType === nodeType
			)

			return config && (
				createPublicClient({
					chain: networkToViemChain(network),
					transport: {
						[NetworkProviderConnectionType.RPC]: http,
						[NetworkProviderConnectionType.JSONRPC]: http,
						[NetworkProviderConnectionType.WebSocket]: webSocket,
					}[connectionType](
						`${config.connectionType === NetworkProviderConnectionType.WebSocket ? 'wss' : 'https'}://${config.subdomain}.infura.io/${config.connectionType === NetworkProviderConnectionType.WebSocket ? 'ws/v3' : 'v3'}/${env.INFURA_API_KEY || '84842078b09946638c03157f83405213'}`,
						{},
					),
				})
			)
		},
	},

	{
		provider: NetworkProvider.Alchemy,
		name: 'Alchemy',
		icon: AlchemyIcon,

		getEthersProvider: ({
			network,
			connectionType = NetworkProviderConnectionType.RPC,
		}) => {
			const config = alchemyProviderConfigs.find(config => config.networkSlug === network.slug)

			const apiKey = env[`ALCHEMY_API_KEY_${network.chainId}`]

			return config && (
				new ({
					[NetworkProviderConnectionType.RPC]: JsonRpcProvider,
					[NetworkProviderConnectionType.JSONRPC]: JsonRpcProvider,
					[NetworkProviderConnectionType.WebSocket]: WebSocketProvider,
				}[connectionType])(
					`${connectionType === NetworkProviderConnectionType.WebSocket ? 'wss' : 'https'}://${config.subdomain}.g.alchemy.com/v2/${apiKey}`,
					network.chainId
				)
			)

			// return new AlchemyProvider(
			// 	network.chainId,
			// 	apiKey
			// )
		},

		getViemPublicClient: ({
			network,
			connectionType = NetworkProviderConnectionType.RPC,
			nodeType = NetworkProviderNodeType.Default,
		}) => {
			const config = alchemyProviderConfigs.find(config => config.networkSlug === network.slug)

			const apiKey = env[`ALCHEMY_API_KEY_${network.chainId}`]

			return config && (
				createPublicClient({
					chain: networkToViemChain(network),
					transport: {
						[NetworkProviderConnectionType.RPC]: http,
						[NetworkProviderConnectionType.JSONRPC]: http,
						[NetworkProviderConnectionType.WebSocket]: webSocket,
					}[connectionType](
						`${connectionType === NetworkProviderConnectionType.WebSocket ? 'wss' : 'https'}://${config.subdomain}.g.alchemy.com/v2/${apiKey}`,
						{},
					),
				})
			)
		},
	},

	{
		provider: NetworkProvider.PocketNetwork,
		name: 'Pocket Network',
		icon: PocketIcon,

		getEthersProvider: ({
			network,
			connectionType = NetworkProviderConnectionType.RPC,
			nodeType = NetworkProviderNodeType.Default,
		}) => {
			const config = pocketProviderConfigs.find(config =>
				config.networkSlug === network.slug &&
				config.connectionType === connectionType &&
				config.nodeType === nodeType
			)

			return config && (
				new ({
					[NetworkProviderConnectionType.RPC]: JsonRpcProvider,
					[NetworkProviderConnectionType.JSONRPC]: JsonRpcProvider,
					[NetworkProviderConnectionType.WebSocket]: WebSocketProvider,
				}[connectionType])(
					`${config.connectionType === NetworkProviderConnectionType.WebSocket ? 'wss' : 'https'}://${config.subdomain}.gateway.pokt.network/v1/lb/${env.POCKET_NETWORK_PORTAL_ID}`,
					network.chainId
				)
			)

			// return new PocketProvider(
			// 	network.chainId,
			// 	env.POCKET_NETWORK_PORTAL_ID,
			// 	env.POCKET_NETWORK_SECRET_KEY
			// )
		},

		getViemPublicClient: ({
			network,
			connectionType = NetworkProviderConnectionType.RPC,
			nodeType = NetworkProviderNodeType.Default,
		}) => {
			const config = pocketProviderConfigs.find(config =>
				config.networkSlug === network.slug &&
				config.connectionType === connectionType &&
				config.nodeType === nodeType
			)

			return config && (
				createPublicClient({
					chain: networkToViemChain(network),
					transport: {
						[NetworkProviderConnectionType.RPC]: http,
						[NetworkProviderConnectionType.JSONRPC]: http,
						[NetworkProviderConnectionType.WebSocket]: webSocket,
					}[connectionType](
						`${config.connectionType === NetworkProviderConnectionType.WebSocket ? 'wss' : 'https'}://${config.subdomain}.gateway.pokt.network/v1/lb/${env.POCKET_NETWORK_PORTAL_ID}`,
						{},
					),
				})
			)
		},
	},

	// {
	// 	provider: NetworkProvider.Moralis,
	// 	name: 'Moralis',
	// 	icon: MoralisIcon,

	// 	getEthersProvider: ({
	// 		network,
	// 		connectionType = NetworkProviderConnectionType.WebSocket,
	// 	}) => {
	// 		const endpointUrl = getMoralisJSONRPCEndpoint({
	// 			network,
	// 			protocol: 'wss'
	// 		})
	
	// 		return endpointUrl && new ({
	// 			[NetworkProviderConnectionType.RPC]: JsonRpcProvider,
	// 			[NetworkProviderConnectionType.JSONRPC]: JsonRpcProvider,
	// 			[NetworkProviderConnectionType.WebSocket]: WebSocketProvider,
	// 		}[connectionType])(
	// 			endpointUrl,
	// 			network.chainId,
	// 		)
	// 	},

	// 	getViemPublicClient: ({
	// 		network,
	// 		connectionType = NetworkProviderConnectionType.WebSocket,
	// 	}) => (
	// 		createPublicClient({
	// 			chain: networkToViemChain(network),
	// 			transport: {
	// 				[NetworkProviderConnectionType.RPC]: http,
	// 				[NetworkProviderConnectionType.JSONRPC]: http,
	// 				[NetworkProviderConnectionType.WebSocket]: webSocket,
	// 			}[connectionType](
	// 				getMoralisJSONRPCEndpoint({
	// 					network,
	// 					protocol: 'wss'
	// 				}),
	// 				{},
	// 			),
	// 		})
	// 	}),
	// },

	{
		provider: NetworkProvider.Etherscan,
		name: 'Etherscan',
		icon: EtherscanIcon,

		getEthersProvider: ({ network }) => (
			new EtherscanProvider(
				network.chainId,
				env.ETHERSCAN_API_KEY_1
			)
		)
	},

	{
		provider: NetworkProvider.Figment,
		name: 'Figment DataHub',
		icon: FigmentIcon,

		getEthersProvider: ({
			network,
			connectionType = NetworkProviderConnectionType.RPC,
			nodeType = NetworkProviderNodeType.Default,
		}) => {
			const config = figmentProviderConfigs.find(config =>
				config.networkSlug === network.slug &&
				config.connectionType === connectionType &&
				config.nodeType === nodeType
			)

			return config && (
				new ({
					[NetworkProviderConnectionType.RPC]: JsonRpcProvider,
					[NetworkProviderConnectionType.JSONRPC]: JsonRpcProvider,
					[NetworkProviderConnectionType.WebSocket]: WebSocketProvider,
				}[connectionType])(
					`${config.connectionType === NetworkProviderConnectionType.WebSocket ? 'wss' : 'https'}://${config.subdomain}.datahub.figment.io/apikey/${env.FIGMENT_DATA_HUB_APP_API_KEY}`,
					network.chainId
				)
			)
		},

		getViemPublicClient: ({
			network,
			connectionType = NetworkProviderConnectionType.RPC,
			nodeType = NetworkProviderNodeType.Default,
		}) => {
			const config = figmentProviderConfigs.find(config =>
				config.networkSlug === network.slug &&
				config.connectionType === connectionType &&
				config.nodeType === nodeType
			)

			return config && (
				createPublicClient({
					chain: networkToViemChain(network),
					transport: {
						[NetworkProviderConnectionType.RPC]: http,
						[NetworkProviderConnectionType.JSONRPC]: http,
						[NetworkProviderConnectionType.WebSocket]: webSocket,
					}[connectionType](
						`${config.connectionType === NetworkProviderConnectionType.WebSocket ? 'wss' : 'https'}://${config.subdomain}.datahub.figment.io/apikey/${env.FIGMENT_DATA_HUB_APP_API_KEY}`,
						{},
					),
				})
			)
		},
	},

	{
		provider: NetworkProvider.Tenderly,
		name: 'Tenderly › Web3 Gateway',
		icon: TenderlyIcon,

		getEthersProvider: ({
			network,
			connectionType = NetworkProviderConnectionType.RPC,
			nodeType = NetworkProviderNodeType.Default,
		}) => {
			const config = tenderlyProviderConfigs.find(config =>
				config.networkSlug === network.slug &&
				config.connectionType === connectionType &&
				config.nodeType === nodeType
			)

			return config && (
				new ({
					[NetworkProviderConnectionType.RPC]: JsonRpcProvider,
					[NetworkProviderConnectionType.JSONRPC]: JsonRpcProvider,
					[NetworkProviderConnectionType.WebSocket]: WebSocketProvider,
				}[connectionType])(
					`${config.connectionType === NetworkProviderConnectionType.WebSocket ? 'wss' : 'https'}://${config.subdomain}.gateway.tenderly.co/${env.TENDERLY_WEB3_GATEWAY_API_KEY}`,
					network.chainId
				)
			)
		},

		getViemPublicClient: ({
			network,
			connectionType = NetworkProviderConnectionType.RPC,
			nodeType = NetworkProviderNodeType.Default,
		}) => {
			const config = tenderlyProviderConfigs.find(config =>
				config.networkSlug === network.slug &&
				config.connectionType === connectionType &&
				config.nodeType === nodeType
			)

			return config && (
				createPublicClient({
					chain: networkToViemChain(network),
					transport: {
						[NetworkProviderConnectionType.RPC]: http,
						[NetworkProviderConnectionType.JSONRPC]: http,
						[NetworkProviderConnectionType.WebSocket]: webSocket,
					}[connectionType](
						`${config.connectionType === NetworkProviderConnectionType.WebSocket ? 'wss' : 'https'}://${config.subdomain}.gateway.tenderly.co/${env.TENDERLY_WEB3_GATEWAY_API_KEY}`,
						{},
					),
				})
			)
		},
	},

	{
		provider: NetworkProvider.QuickNode,
		name: 'QuickNode',
		icon: QuickNodeIcon,

		getEthersProvider: ({
			network,
			connectionType = NetworkProviderConnectionType.RPC,
		}) => {
			const subdomain = env[`QUICKNODE_ENDPOINT_NAME_${network.chainId}`]

			const authToken = env[`QUICKNODE_ENDPOINT_AUTHENTICATION_TOKEN_${network.chainId}`]

			return subdomain && (
				new JsonRpcProvider(
					`${connectionType === NetworkProviderConnectionType.WebSocket ? 'wss' : 'https'}://${subdomain}.quiknode.pro/${authToken}/`,
					network.chainId
				)
			)
		},

		getViemPublicClient: ({
			network,
			connectionType = NetworkProviderConnectionType.RPC,
		}) => {
			const subdomain = env[`QUICKNODE_ENDPOINT_NAME_${network.chainId}`]

			const authToken = env[`QUICKNODE_ENDPOINT_AUTHENTICATION_TOKEN_${network.chainId}`]

			return subdomain && (
				createPublicClient({
					chain: networkToViemChain(network),
					transport: {
						[NetworkProviderConnectionType.RPC]: http,
						[NetworkProviderConnectionType.JSONRPC]: http,
						[NetworkProviderConnectionType.WebSocket]: webSocket,
					}[connectionType](
						`${connectionType === NetworkProviderConnectionType.WebSocket ? 'wss' : 'https'}://${subdomain}.quiknode.pro/${authToken}/`,
						{},
					),
				})
			)
		},
	},

	{
		provider: NetworkProvider.GatewayFm,
		name: 'Gateway.fm',
		icon: GatewayFmIcon,

		getEthersProvider: ({
			network,
			connectionType = NetworkProviderConnectionType.RPC,
			nodeType = NetworkProviderNodeType.Default,
		}) => {
			const config = gatewayFmProviderConfigs.find(config =>
				config.networkSlug === network.slug &&
				config.connectionType === connectionType &&
				config.nodeType === nodeType
			)

			if(!config) return undefined

			const apiKey = {
				'eu-north-1': env.GATEWAY_FM_API_KEY_EU_NORTH_1,
				'eu-central-2': env.GATEWAY_FM_API_KEY_EU_CENTRAL_2,
				'ap-southeast-1': env.GATEWAY_FM_API_KEY_AP_SOUTHEAST_1,
			}[config.region]

			return (
				new ({
					[NetworkProviderConnectionType.RPC]: JsonRpcProvider,
					[NetworkProviderConnectionType.JSONRPC]: JsonRpcProvider,
					[NetworkProviderConnectionType.WebSocket]: WebSocketProvider,
				}[connectionType])(
					`${config.endpointUrl}?apiKey=${apiKey}`,
					network.chainId
				)
			)
		},

		getViemPublicClient: ({
			network,
			connectionType = NetworkProviderConnectionType.RPC,
			nodeType = NetworkProviderNodeType.Default,
		}) => {
			const config = gatewayFmProviderConfigs.find(config =>
				config.networkSlug === network.slug &&
				config.connectionType === connectionType &&
				config.nodeType === nodeType
			)

			if(!config) return undefined

			const apiKey = {
				'eu-north-1': env.GATEWAY_FM_API_KEY_EU_NORTH_1,
				'eu-central-2': env.GATEWAY_FM_API_KEY_EU_CENTRAL_2,
				'ap-southeast-1': env.GATEWAY_FM_API_KEY_AP_SOUTHEAST_1,
			}[config.region]

			return (
				createPublicClient({
					chain: networkToViemChain(network),
					transport: {
						[NetworkProviderConnectionType.RPC]: http,
						[NetworkProviderConnectionType.JSONRPC]: http,
						[NetworkProviderConnectionType.WebSocket]: webSocket,
					}[connectionType](
						`${config.endpointUrl}?apiKey=${apiKey}`,
						{},
					),
				})
			)
		},
	},
	
	{
		provider: NetworkProvider.GetBlock,
		name: 'GetBlock',
		icon: GetBlockIcon,

		getEthersProvider: ({
			network,
			connectionType = NetworkProviderConnectionType.RPC,
			nodeType = NetworkProviderNodeType.Default,
		}) => {
			const config = getBlockProviderConfigs.find(config =>
				config.networkSlug === network.slug &&
				config.connectionType === connectionType &&
				config.nodeType === nodeType
			)

			return config && (
				new ({
					[NetworkProviderConnectionType.RPC]: JsonRpcProvider,
					[NetworkProviderConnectionType.JSONRPC]: JsonRpcProvider,
					[NetworkProviderConnectionType.WebSocket]: WebSocketProvider,
				}[connectionType])(
					`${config.connectionType === NetworkProviderConnectionType.WebSocket ? 'wss' : 'https'}://${config.subdomain}.getblock.io/${env.GETBLOCK_API_KEY}/${config.path}`,
					network.chainId
				)
			)
		},

		getViemPublicClient: ({
			network,
			connectionType = NetworkProviderConnectionType.RPC,
			nodeType = NetworkProviderNodeType.Default,
		}) => {
			const config = getBlockProviderConfigs.find(config =>
				config.networkSlug === network.slug &&
				config.connectionType === connectionType &&
				config.nodeType === nodeType
			)

			return config && (
				createPublicClient({
					chain: networkToViemChain(network),
					transport: {
						[NetworkProviderConnectionType.RPC]: http,
						[NetworkProviderConnectionType.JSONRPC]: http,
						[NetworkProviderConnectionType.WebSocket]: webSocket,
					}[connectionType](
						`${config.connectionType === NetworkProviderConnectionType.WebSocket ? 'wss' : 'https'}://${config.subdomain}.getblock.io/${env.GETBLOCK_API_KEY}/${config.path}`,
						{},
					),
				})
			)
		},
	},
	
	{
		provider: NetworkProvider.Blast,
		name: 'Blast',
		icon: BlastIcon,

		getEthersProvider: ({
			network,
			connectionType = NetworkProviderConnectionType.RPC,
			nodeType = NetworkProviderNodeType.Archive,
		}) => {
			const config = blastProviderConfigs.find(config =>
				config.networkSlug === network.slug &&
				config.connectionType === connectionType &&
				config.nodeType === nodeType
			)

			return config && (
				new ({
					[NetworkProviderConnectionType.RPC]: JsonRpcProvider,
					[NetworkProviderConnectionType.WebSocket]: WebSocketProvider,
				}[connectionType])(
					`${config.connectionType === NetworkProviderConnectionType.WebSocket ? 'wss' : 'https'}://${config.subdomain}.blastapi.io/${env.BLAST_PROJECT_ID}${config.path ?? ''}`,
					network.chainId
				)
			)
		},

		getViemPublicClient: ({
			network,
			connectionType = NetworkProviderConnectionType.RPC,
			nodeType = NetworkProviderNodeType.Default,
		}) => {
			const config = blastProviderConfigs.find(config =>
				config.networkSlug === network.slug &&
				config.connectionType === connectionType &&
				config.nodeType === nodeType
			)

			return config && (
				createPublicClient({
					chain: networkToViemChain(network),
					transport: {
						[NetworkProviderConnectionType.RPC]: http,
						[NetworkProviderConnectionType.WebSocket]: webSocket,
					}[connectionType](
						`${config.connectionType === NetworkProviderConnectionType.WebSocket ? 'wss' : 'https'}://${config.subdomain}.blastapi.io/${env.BLAST_PROJECT_ID}${config.path ?? ''}`,
						{},
					),
				})
			)
		},
	},
	
	{
		provider: NetworkProvider.Chainbase,
		name: 'Chainbase',
		icon: ChainbaseIcon,

		getEthersProvider: ({
			network,
			connectionType = NetworkProviderConnectionType.RPC,
			nodeType = NetworkProviderNodeType.Default,
		}) => {
			const config = chainbaseProviderConfigs.find(config =>
				config.networkSlug === network.slug &&
				config.connectionType === connectionType &&
				config.nodeType === nodeType
			)

			return config && (
				new ({
					[NetworkProviderConnectionType.RPC]: JsonRpcProvider,
					[NetworkProviderConnectionType.WebSocket]: WebSocketProvider,
				}[connectionType])(
					`${config.connectionType === NetworkProviderConnectionType.WebSocket ? 'wss' : 'https'}://${config.subdomain}.s.chainbase.online/v1/${env.CHAINBASE_API_KEY}`,
					network.chainId
				)
			)
		},

		getViemPublicClient: ({
			network,
			connectionType = NetworkProviderConnectionType.RPC,
			nodeType = NetworkProviderNodeType.Default,
		}) => {
			const config = chainbaseProviderConfigs.find(config =>
				config.networkSlug === network.slug &&
				config.connectionType === connectionType &&
				config.nodeType === nodeType
			)

			return config && (
				createPublicClient({
					chain: networkToViemChain(network),
					transport: {
						[NetworkProviderConnectionType.RPC]: http,
						[NetworkProviderConnectionType.WebSocket]: webSocket,
					}[connectionType](
						`${config.connectionType === NetworkProviderConnectionType.WebSocket ? 'wss' : 'https'}://${config.subdomain}.s.chainbase.online/v1/${env.CHAINBASE_API_KEY}`,
						{},
					),
				})
			)
		},
	},
] as const satisfies NetworkProviderConfig[]

export const networkProviderConfigByProvider = Object.fromEntries(
	networkProviderConfigs
		.map(networkProviderConfig => [networkProviderConfig.provider, networkProviderConfig])
) satisfies Record<NetworkProvider, NetworkProviderConfig>

// export const networkProviderConfigByNetworkSlug = Object.fromEntries(Object.entries({
// 	"arbitrum-one": [
// 		NetworkProvider.PocketNetwork,
// 		NetworkProvider.Figment,
// 	],
// 	"avalanche": [
// 		NetworkProvider.PocketNetwork,
// 		NetworkProvider.Figment,
// 	],
// 	"avalanche-fuji": [
// 		NetworkProvider.Figment,
// 	],
// 	"bsc": [
// 		NetworkProvider.Figment,
// 	],
// 	"celo": [
// 		NetworkProvider.Figment,
// 	],
// 	"celo-alfajores": [
// 		NetworkProvider.Figment,
// 	],
// 	"ethereum": [
// 		NetworkProvider.Alchemy,
// 		NetworkProvider.PocketNetwork,
// 		NetworkProvider.Figment,
// 		NetworkProvider.QuickNode,
// 	],
// 	"ethereum-ropsten": [
// 		// RpcProvider.Alchemy,
// 		NetworkProvider.PocketNetwork,
// 	],
// 	"ethereum-rinkeby": [
// 		NetworkProvider.Alchemy,
// 		NetworkProvider.PocketNetwork,
// 		NetworkProvider.Figment,
// 	],
// 	"ethereum-goerli": [
// 		// RpcProvider.Alchemy,
// 		NetworkProvider.PocketNetwork,
// 	],
// 	"fantom": [
// 		NetworkProvider.Figment,
// 	],
// 	"harmony-shard0": [
// 		NetworkProvider.PocketNetwork
// 	],
// 	"harmony-shard1": [],
// 	"oasis-paratime": [
// 		NetworkProvider.Figment,
// 	],
// 	"polygon": [
// 		NetworkProvider.PocketNetwork,
// 		NetworkProvider.Figment,
// 		NetworkProvider.QuickNode,
// 	],
// 	"polygon-mumbai": [
// 		NetworkProvider.Figment,
// 	],
// 	"optimism": [
// 		NetworkProvider.QuickNode,
// 	],
// 	"polygon-zkevm": [
// 		NetworkProvider.QuickNode,
// 	],
// })
// 	.map(([slug, networkProviders]) =>
// 		[
// 			slug,
// 			[
// 				...(networksBySlug[slug].rpc ?? [])
// 					.filter(rpcUrl => rpcUrl.startsWith('https://'))
// 					.map(rpcUrl => ({
// 						type: NetworkProvider.Default,
// 						name: new URL(rpcUrl).host,
// 						// name: `Default (${new URL(rpcUrl).host})`,
// 						get: ({ network }) => new providers.JsonRpcProvider(rpcUrl, networksBySlug[slug].chainId)
// 					})),
// 				...networkProviders
// 					.map(networkProvider => networkProviderConfigByProvider[networkProvider])
// 			]
// 		]
// 	)
// )

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


import { browser } from '$app/environment'

export const getEthersProvider = ({
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
	const providerConfig = networkProviderConfigByProvider[networkProvider]

	const ethersProvider = providerConfig?.getEthersProvider?.({
		network,
		connectionType,
		nodeType
	})

	return ethersProvider
}

export const getViemPublicClient = ({
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
	if(!browser) return

	const providerConfig = networkProviderConfigByProvider[networkProvider]

	const publicClient = providerConfig?.getViemPublicClient?.({
		network,
		connectionType,
		nodeType
	}) as PublicClient | undefined

	return publicClient
}
