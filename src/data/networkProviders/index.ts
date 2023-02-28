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
import { getMoralisJSONRPCEndpoint } from '../../api/moralis/endpoints'
import { figmentProviderConfigs } from './figment'


// Icons
import { AlchemyIcon, EtherscanIcon, FigmentIcon, InfuraIcon, MoralisIcon, PocketIcon, QuickNodeIcon } from '../../assets/icons'


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
				network.providers?.[0],
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
	// 		infura: env.INFURA_PROJECT_ID,
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
		get: ({ network }) => (
			new InfuraProvider(
				network.chainId,
				env.INFURA_PROJECT_ID,
				env.INFURA_PROJECT_SECRET
			)
		)
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
		get: ({ network }) => (
			new PocketProvider(
				network.chainId,
				env.POCKET_NETWORK_PORTAL_ID,
				env.POCKET_NETWORK_SECRET_KEY
			)
		)
	},

	{
		provider: NetworkProvider.Moralis,
		name: 'Moralis',
		icon: MoralisIcon,

		get: ({
			network,
			connectionType = NetworkProviderConnectionType.WebSocket,
		}) => (
			new ({
				[NetworkProviderConnectionType.RPC]: JsonRpcProvider,
				[NetworkProviderConnectionType.JSONRPC]: JsonRpcProvider,
				[NetworkProviderConnectionType.WebSocket]: WebSocketProvider,
			}[connectionType])(
				getMoralisJSONRPCEndpoint({
					network,
					protocol: 'wss'
				}),
				network.chainId,
			)
		)
	},

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
			const figmentProviderConfig = figmentProviderConfigs.find(figmentProviderConfig =>
				figmentProviderConfig.networkSlug === network.slug &&
				figmentProviderConfig.connectionType === connectionType &&
				figmentProviderConfig.nodeType === nodeType
			)

			if(!figmentProviderConfig)
				throw new Error(`Couldn't find a Figment node matching the configuration`)

			return (
				new ({
					[NetworkProviderConnectionType.RPC]: JsonRpcProvider,
					[NetworkProviderConnectionType.JSONRPC]: JsonRpcProvider,
					[NetworkProviderConnectionType.WebSocket]: WebSocketProvider,
				}[connectionType])(
					`${figmentProviderConfig.connectionType === NetworkProviderConnectionType.WebSocket ? 'wss' : 'https'}://${figmentProviderConfig.subdomain}.datahub.figment.io/apikey/${env.FIGMENT_DATA_HUB_APP_API_KEY}`,
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
			}[network.chainId]}.quiknode.pro/${{
				1: env.QUICKNODE_ENDPOINT_AUTHENTICATION_TOKEN_1,
				10: env.QUICKNODE_ENDPOINT_AUTHENTICATION_TOKEN_10,
				137: env.QUICKNODE_ENDPOINT_AUTHENTICATION_TOKEN_137,
			}[network.chainId]}/`,
			network.chainId
		)
		
	}
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
	]
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
	const providerConfig = networkProviderConfigByProvider[networkProvider]

	const ethersProvider = providerConfig?.get({
		network,
		connectionType,
		nodeType
	})

	// console.log('ethersProvider', ethersProvider)

	return ethersProvider
})
