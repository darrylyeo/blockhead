import type { Ethereum } from './types'
import { getEthersJS } from './ethers'
import { getWeb3 } from './web3'
import { getPortisProvider } from './providers/portis'

// Cache provider objects by EthereumNetwork, ProviderName, ProviderLibrary
export const providersCache: Partial<Record<Ethereum.Network, Partial<Record<Ethereum.ProviderName, {provider: any, wrapped: Partial<Record<Ethereum.ProviderLibrary, Ethereum.Provider>>} >> >> = {}

const getProviderFunctions: Record<Ethereum.ProviderName, any> = {
	'Portis': getPortisProvider,
	'Pocket Network': () => {}
}

export async function getProvider(network: Ethereum.Network = 'mainnet', providerName: Ethereum.ProviderName, library: Ethereum.ProviderLibrary = 'ethers'){
	if(!(network in providersCache))
		providersCache[network] = {}
	
	if(!(providerName in providersCache[network]))
		providersCache[network][providerName] = {
			provider: await getProviderFunctions[providerName](network),
			wrapped: {}
		}
	
	if(!(library in providersCache[network][providerName].wrapped)){
		const provider = providersCache[network][providerName].provider

		if(library === 'ethers'){
			const ethers = await getEthersJS()
			providersCache[network][providerName].wrapped[library] = new ethers.providers.Web3Provider(provider)
		}else if(library === 'web3'){
			const Web3 = await getWeb3()
			providersCache[network][providerName].wrapped[library] = new Web3(provider)
		}
	}

	return providersCache[network][providerName].wrapped[library]
}