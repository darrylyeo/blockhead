import type { Ethereum } from './types'
import { getEthersJS } from './ethers'
import { getWeb3 } from './web3'
import { getMetaMask } from './providers/metamask'
import { getPortis } from './providers/portis'
// import { getPocketNetwork } from './providers/pocket-network'

type ProviderCache = {
	// Provider object (e.g. Portis instance)
	instance: any,
	
	// Web3 provider object
	provider: any,
	
	// Web3 provider object wrapped by web3 or ethers library
	wrapped: Partial<Record<Ethereum.ProviderLibrary, Ethereum.Provider>>
}

// Cache provider objects by EthereumNetwork, ProviderName, ProviderLibrary
const providersCache: Partial<Record<Ethereum.Network, Partial<Record<Ethereum.ProviderName, ProviderCache>> >> = {}

const getProviderAndInstance: Record<Ethereum.ProviderName, (network: Ethereum.Network) => Promise<{ instance: any, provider: any }>> = {
	'MetaMask': async network => {
		const instance = await getMetaMask(network)
		return { instance, provider: instance }
	},

	'Portis': async network => {
		const instance = await getPortis(network)
		const { provider } = instance
		return { instance, provider }
	},

	'Pocket Network': async network => {
		return { instance: {}, provider: {} }
		// const { instance, provider } = await getPocketNetwork(network)
		// return { instance, provider }
	}
}

async function getCachedProvider(network: Ethereum.Network = 'mainnet', providerName: Ethereum.ProviderName){
	if(!(network in providersCache))
		providersCache[network] = {}
	
	if(!(providerName in providersCache[network])){
		const { instance, provider } = await getProviderAndInstance[providerName](network)
		providersCache[network][providerName] = {
			instance,
			provider,
			wrapped: {}
		}
	}
	
	return providersCache[network][providerName]
}

export async function getProviderInstance(network: Ethereum.Network, providerName: Ethereum.ProviderName){
	const { instance } = await getCachedProvider(network, providerName)

	return instance
}

export async function getProvider(network: Ethereum.Network, providerName: Ethereum.ProviderName, library: Ethereum.ProviderLibrary = 'ethers'){
	const { provider, wrapped } = await getCachedProvider(network, providerName)

	if(!(library in wrapped)){
		if(library === 'ethers'){
			const ethers = await getEthersJS()
			wrapped[library] = new ethers.providers.Web3Provider(provider)
		}else if(library === 'web3'){
			const Web3 = await getWeb3()
			wrapped[library] = new Web3(provider)
		}
	}

	return wrapped[library]
}