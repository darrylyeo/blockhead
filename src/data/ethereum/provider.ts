import type { Ethereum } from './types'
import { getDefaultProvider, providers } from 'ethers'
import { getMetaMask } from './providers/metamask'
import { getTorusOpenLogin } from './providers/torus'
import { getPortis } from './providers/portis'
// import { getPocketNetwork } from './providers/pocket-network'
import { getMoralisJSONRPCEndpoint } from '../moralis/endpoints'
import { env } from '../../env'
import { getNetworkRPC } from './networks'
import { memoized } from '../../utils/memoized'

export const getProviderAndInstance = memoized(async (network: Ethereum.Network, providerName: Ethereum.ProviderName) => {
	return await {
		'Auto': async network => {
			return {
				provider: new providers.JsonRpcProvider(
					getNetworkRPC(network)
				)
			}
		},

		'Ethers': async network => {
			return {
				provider: getDefaultProvider(network.chainId, {
					alchemy: env.ALCHEMY_API_KEY_MAINNET,
					etherscan: env.ETHERSCAN_API_KEY,
					infura: env.INFURA_PROJECT_ID,
					pocket: {
						applicationId: env.POCKET_APP_PUBLIC_KEY,
						applicationSecretKey: env.POCKET_SECRET_KEY
					},
					// quorum: 2
				})
			}
		},

		'Infura': async network => {
			return {
				provider: new providers.InfuraProvider(network.chainId, {
					infura: env.INFURA_PROJECT_ID
				})
			}
		},
	
		'Alchemy': async network => {
			return {
				provider: new providers.AlchemyProvider(network.chainId, env.ALCHEMY_API_KEY_MAINNET)
			}
		},
	
		'MetaMask': async network => {
			const provider: providers.BaseProvider = await getMetaMask(network)

			return {
				provider,
				disconnect(){
					
				}
			}
		},
	
		'Torus': async network => {
			const { instance, provider } = await getTorusOpenLogin(network)

			return {
				provider,
				instance,
				disconnect(){
					instance.logout()
				}
			}
		},
	
		'Portis': async network => {
			const instance = await getPortis(network)

			return {
				provider: new providers.Web3Provider(instance.provider),
				instance,
				disconnect(){
					instance.logout()
				}
			}
		},
	
		'Pocket Network': async network => {
			// const { instance, provider } = await getPocketNetwork(network)
			// return { instance, provider }
	
	
			// const getUrl = providers.PocketProvider.getUrl
			// providers.PocketProvider.getUrl = (...args) => {
			// 	const connection = getUrl(...args)
			// 	// connection.url = connection.url.replace('eth-mainnet.gateway.pokt.network', 'eth-archival.gateway.pokt.network')
			// 	connection.url = connection.url.replace('eth-mainnet.gateway.pokt.network', 'eth-trace.gateway.pokt.network')
			// 	return connection
			// }
	
			return {
				provider: new providers.PocketProvider(network.chainId, {
					applicationId: env.POCKET_GATEWAY_ID,
					applicationSecretKey: env.POCKET_SECRET_KEY,
					loadBalancer: true
				})
			}
	
			// const provider = new providers.PocketProvider(network.chainId, POCKET_GATEWAY_ID)
			// return { instance: provider, provider }
		},

		'Moralis': async network => {
			return {
				provider: new providers.WebSocketProvider(
					getMoralisJSONRPCEndpoint({
						network,
						protocol: 'wss'
					})
				)
			}
		},

		'Etherscan': async network => {
			return {
				provider: new providers.EtherscanProvider(network.chainId, env.ETHERSCAN_API_KEY)
			}
		},
	}[providerName]?.(network)
})


export const getEthersProvider = async (network: Ethereum.Network, providerName: Ethereum.ProviderName) => {
	const { provider } = await getProviderAndInstance(network, providerName)
	return provider
}