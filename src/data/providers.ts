// Types
import type { Ethereum } from './ethereum/types'
import type { Provider } from '@ethersproject/abstract-provider'
import type { JsonRpcProvider } from '@ethersproject/providers'
import { NetworkProvider, NetworkProviderConnectionType, NetworkProviderNodeType } from './providers-types'


// Constants
import { env } from '../env'
import { networksBySlug } from './ethereum/networks'


// APIs
import { getDefaultProvider, providers } from 'ethers'
import { getMoralisJSONRPCEndpoint } from './moralis/endpoints'

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
		get: ({ network }) => new providers.JsonRpcProvider(network.providers?.[0], network.chainId)
	},

	// {
	// 	type: NetworkProvider.Default,
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
		type: NetworkProvider.Infura,
		name: 'Infura',
		icon: '/apps/Infura.svg',

		get: ({ network }) => new providers.InfuraProvider(network.chainId, {
			infura: env.INFURA_PROJECT_ID
		})
	},

	{
		provider: NetworkProvider.Alchemy,
		name: 'Alchemy',
		icon: '/apps/Alchemy.svg',

		get: ({ network }) =>
			new providers.AlchemyProvider(
				network.chainId,
				{
					'ethereum': env.ALCHEMY_API_KEY_MAINNET,
					'ethereum-rinkeby': env.ALCHEMY_API_KEY_RINKEBY
				}[network.slug]
			)
	},

	{
		provider: NetworkProvider.PocketNetwork,
		name: 'Pocket Network',
		icon: '/apps/Pocket.svg',

		get: ({ network }) =>
			new providers.PocketProvider(network.chainId, {
				applicationId: env.POCKET_NETWORK_PORTAL_ID,
				applicationSecretKey: env.POCKET_NETWORK_SECRET_KEY,
				loadBalancer: true
			})
	},

	{
		provider: NetworkProvider.Moralis,
		name: 'Moralis',
		icon: '/apps/Moralis.svg',

		get: ({
			network,
			connectionType = NetworkProviderConnectionType.WebSocket,
		}) =>
			new providers.WebSocketProvider(
				getMoralisJSONRPCEndpoint({
					network,
					protocol: 'wss'
				})
			)
	},

	{
		provider: NetworkProvider.Etherscan,
		name: 'Etherscan',
		icon: '/apps/Etherscan.svg',

		get: ({ network }) =>
			new providers.EtherscanProvider(network.chainId, env.ETHERSCAN_API_KEY)
	},
]

export const networkProviderConfigByProvider = Object.fromEntries(networkProviderConfigs.map(networkProviderConfig => [networkProviderConfig.provider, networkProviderConfig]))

export const networkProviderConfigByNetworkSlug = Object.fromEntries(Object.entries({
	"arbitrum-one": [
		NetworkProvider.PocketNetwork,
	],
	"avalanche": [
		NetworkProvider.PocketNetwork,
	],
	"avalanche-fuji": [
	],
	"bsc": [
	],
	"celo": [
	],
	"celo-alfajores": [
	],
	"ethereum": [
		NetworkProvider.Alchemy,
		NetworkProvider.PocketNetwork,
	],
	"ethereum-ropsten": [
		// RpcProvider.Alchemy,
		NetworkProvider.PocketNetwork,
	],
	"ethereum-rinkeby": [
		NetworkProvider.Alchemy,
		NetworkProvider.PocketNetwork,
	],
	"ethereum-goerli": [
		// RpcProvider.Alchemy,
		NetworkProvider.PocketNetwork,
	],
	"fantom": [
	],
	"harmony-shard0": [
		NetworkProvider.PocketNetwork
	],
	"harmony-shard1": [],
	"oasis-paratime": [
	],
	"polygon": [
		NetworkProvider.PocketNetwork,
	],
	"polygon-mumbai": [
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


export const getEthersProvider = async ({
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

	console.log('ethersProvider', ethersProvider)

	return ethersProvider
}
