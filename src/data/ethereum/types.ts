import type { Web3Provider } from '@ethersproject/providers'

export namespace Ethereum {
	export type Network = 'mainnet' | 'ropsten' | 'rinkeby' | 'goerli' | 'kovan' | 'classic'
	export type ProviderName = 'Portis' | 'Pocket Network'
	export type ProviderLibrary = 'web3' | 'ethers'
	export type Provider = Web3Provider

	export type Address = string
	export type TransactionID = string
	export type BlockNumber = number
}