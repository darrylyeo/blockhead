import type { Ethereum } from './types'
import { getDefaultProvider, providers } from 'ethers'
import { getWeb3 } from './web3'
import { getMetaMask } from './providers/metamask'
import { getTorusOpenLogin } from './providers/torus'
import { getPortis } from './providers/portis'
// import { getPocketNetwork } from './providers/pocket-network'
import { env } from '../../config-secrets'

type ProviderCache = {
	// Provider object (e.g. Portis instance)
	instance: any,
	
	// Web3 provider object
	provider: any,
	
	// Web3 provider object wrapped by web3 or ethers library
	wrapped: Partial<Record<Ethereum.ProviderLibrary, Ethereum.Provider>>
}

// Cache provider objects by EthereumChainID, ProviderName, ProviderLibrary
const providersCache: Partial<Record<Ethereum.ChainID, Partial<Record<Ethereum.ProviderName, ProviderCache>> >> = {}

const getProviderAndInstance: Record<Ethereum.ProviderName, (network: Ethereum.Network) => Promise<{ instance: any, provider: any }>> = {
	'Ethers': async network => {
		const provider = getDefaultProvider(network.chainId, {
			alchemy: env.ALCHEMY_API_KEY_MAINNET,
			// etherscan: env.ETHERSCAN_API_KEY,
			infura: env.INFURA_PROJECT_ID,
			// pocket: {
			// 	applicationId: env.POCKET_NETWORK_PPK,
			// 	applicationSecretKey: env.POCKET_NETWORK_PASSPHRASE
			// },
			// quorum: 2
		})

		return { instance: provider, provider }
	},

	'Infura': async network => {
		const provider = new providers.InfuraProvider(network.chainId, {
			infura: env.INFURA_PROJECT_ID
		})

		return { instance: provider, provider }
	},

	'Alchemy': async network => {
		const provider = new providers.AlchemyProvider(network.chainId, env.ALCHEMY_API_KEY_MAINNET)
		return { instance: provider, provider }
	},

	'MetaMask': async network => {
		const instance = await getMetaMask(network)
		return { instance, provider: instance }
	},

	'Torus': async network => {
		const { instance, provider } = await getTorusOpenLogin(network)
		return { instance, provider }
	},

	'Portis': async network => {
		const instance = await getPortis(network)
		const { provider } = instance
		return { instance, provider }
	},

	'Pocket Network': async network => {
		const { instance, provider } = await getPocketNetwork(network)
		return { instance, provider }
	}
}

async function getCachedProvider(network: Ethereum.Network, providerName: Ethereum.ProviderName){
	if(!(network.chainId in providersCache))
		providersCache[network.chainId] = {}
	
	if(!(providerName in providersCache[network.chainId])){
		const { instance, provider } = await getProviderAndInstance[providerName](network)
		providersCache[network.chainId][providerName] = {
			instance,
			provider,
			wrapped: {}
		}
	}
	
	return providersCache[network.chainId][providerName]
}

export async function getProviderInstance(network: Ethereum.Network, providerName: Ethereum.ProviderName){
	const { instance } = await getCachedProvider(network, providerName)

	return instance
}

export async function getProvider(network: Ethereum.Network, providerName: Ethereum.ProviderName, library: Ethereum.ProviderLibrary = 'ethers'){
	const { provider, wrapped } = await getCachedProvider(network, providerName)

	if(!(library in wrapped)){
		if(library === 'ethers'){
			wrapped[library] = new providers.Web3Provider(provider)
		}else if(library === 'web3'){
			const Web3 = await getWeb3()
			wrapped[library] = new Web3(provider)
		}
	}

	return wrapped[library]
}