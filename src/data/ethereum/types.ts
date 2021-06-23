import type { Web3Provider } from '@ethersproject/providers'
import type { TickerSymbol } from '../currency/currency'

export namespace Ethereum {
	export type Network = {
		name: NetworkDisplayName,
		chainId: ChainID,
		shortName: string,
		slug: string,
		chain: ChainName,
		network: NetworkName,
		networkId: NetworkID,
		nativeCurrency: {
			'name': string,
			'symbol': TickerSymbol,
			'decimals': Number
		},
		rpc: string[],
		faucets: string[],
		explorers: {
			name: string,
			url: string,
			standard: string
		}[],
		infoURL: string
	}
	export type ChainID = number
	export type ChainName = string
	export type NetworkDisplayName = string
	export type NetworkID = number
	export type NetworkName = 'mainnet' | 'ropsten' | 'rinkeby' | 'goerli' | 'kovan' | 'classic' | string

	export type ProviderName = 'Ethers' | 'Infura' | 'MetaMask' | 'Portis' | 'Pocket Network' | 'Torus'
	export type ProviderLibrary = 'web3' | 'ethers'
	export type Provider = Web3Provider

	export type Address = string
	export type TransactionID = string
	export type BlockNumber = number

	export type ContractAddress = string
}

// https://github.com/ethereum-lists/chains
// https://chainid.network
export const evmNetworkByID: Record<Ethereum.NetworkID, Ethereum.NetworkName> = {
	1: 'mainnet',
	3: 'ropsten',
	4: 'rinkeby',
	5: 'goerli',
	42: 'kovan'
}