import type { Ethereum } from '../../networks/types'


import { providers } from 'ethers'
import { getMetaMask } from './metamask'
import { getTorusOpenLogin } from './torus'
import { getPortis } from './portis'
import { memoized } from '../../../utils/memoized'


export const getWalletProviderAndInstance = memoized(async (network: Ethereum.Network, walletName: string) => {
	return await {
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
	}[walletName]?.(network)
})


export const getWalletProvider = async (network: Ethereum.Network, providerName: Ethereum.ProviderName) => {
	const { provider } = await getWalletProviderAndInstance(network, providerName)
	return provider
}
