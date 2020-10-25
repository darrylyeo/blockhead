import type { Ethereum } from './types'
import { getEthersJS } from './ethers'
import { getWeb3 } from './web3'
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

const getProviderFunctions: Record<Ethereum.ProviderName, any> = {
	'Portis': async () => {
		const instance = await getPortis()
		const { provider } = instance
		return { instance, provider }
	},
	'Pocket Network': async () => {
		// const instance = await getPocketNetwork()
		// const { provider } = instance
		// return { instance, provider }
	}
}

async function getProviderCache(network: Ethereum.Network = 'mainnet', providerName: Ethereum.ProviderName){
	if(!(network in providersCache))
		providersCache[network] = {}
	
	if(!(providerName in providersCache[network])){
		const { instance, provider } = await getProviderFunctions[providerName](network)
		providersCache[network][providerName] = {
			instance,
			provider,
			wrapped: {}
		}
	}
	
	return providersCache[network][providerName]
}

export async function getProviderInstance(network: Ethereum.Network, providerName: Ethereum.ProviderName){
	const { instance } = await getProviderCache(network, providerName)

	return instance
}

export async function getProvider(network: Ethereum.Network, providerName: Ethereum.ProviderName, library: Ethereum.ProviderLibrary = 'ethers'){
	const { provider, wrapped } = await getProviderCache(network, providerName)

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