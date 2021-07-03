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
			name: string,
			symbol: TickerSymbol,
			decimals: Number
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

	export type ProviderName = 'Ethers' | 'Infura' | 'Alchemy' | 'MetaMask' | 'Portis' | 'Pocket Network' | 'Torus'
	export type ProviderLibrary = 'web3' | 'ethers'
	export type Provider = Web3Provider

	export type Address = string
	export type TransactionID = string
	export type BlockNumber = number

	export type ContractAddress = string
	export type Contract = {
		name?: string,
		address: ContractAddress,
		abi?: object
	}
	export type ERC20Token = Contract & {
		name: string,
		symbol: TickerSymbol,
		decimals: Number,
		icon?: string
	}
	export type ERC721Token = Contract & {
		name: string,
		symbol: TickerSymbol,
		icon?: string
	}
	export type ERC1155Token = Contract & {
		name: string,
		symbol: TickerSymbol,
		icon?: string
	}
	export type NFT = ERC721Token | ERC1155Token
}