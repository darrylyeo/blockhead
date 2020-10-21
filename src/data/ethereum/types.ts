import type { Web3Provider } from '@ethersproject/providers'

export namespace Ethereum {
	export type Network = 'mainnet' | 'rinkeby' | 'kovan'
	export type ProviderName = 'Portis' | 'Pocket Network'
	export type ProviderLibrary = 'web3' | 'ethers'
	export type Provider = Web3Provider
}