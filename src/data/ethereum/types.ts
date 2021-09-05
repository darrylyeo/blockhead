import type { BaseProvider } from '@ethersproject/providers'
import type { TickerSymbol } from '../currency/currency'

export namespace Ethereum {
	export type Network = {
		slug: string,
		name: NetworkDisplayName,
		chainId: ChainID,
		slip44?: number,
		shortName: string,
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
			standard: string,
			icon?: string,
		}[],
		infoURL: string,
		icon?: string,
		ens?: {
			registry: ContractAddress
		}
		parent?: {
			chain: `eip155-${ChainID}`,
			type: 'L2' | 'shard'
		},
	}
	export type ChainID = number
	export type ChainName = string
	export type NetworkDisplayName = string
	export type NetworkID = number
	export type NetworkName = 'mainnet' | 'ropsten' | 'rinkeby' | 'goerli' | 'kovan' | 'classic' | string

	export type ProviderName = 'Ethers' | 'Infura' | 'Alchemy' | 'MetaMask' | 'Portis' | 'Pocket Network' | 'Torus' | 'Etherscan'
	export type Provider = BaseProvider

	export type TransactionProvider = 'Covalent' | 'Etherspot'

	export type TransactionID = string
	export type TransactionIndex = number
	export type TransactionNonce = number

	export type BlockNumber = number
	export type BlockHash = string

	export type Address = string

	export type ContractAddress = string
	export type Contract = {
		name?: string,
		address: ContractAddress,
		chainId?: Ethereum.ChainID,
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