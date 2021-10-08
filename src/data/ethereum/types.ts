import type { BaseProvider } from '@ethersproject/providers'
import type { TickerSymbol } from '../currency/currency'

export namespace Ethereum {
	export type Network = {
		slug: string,
		name: NetworkDisplayName,
		chainId: ChainID,
		slip44?: number,
		shortName?: string,
		chain?: ChainName,
		network?: NetworkName,
		networkId?: NetworkID,
		nativeCurrency: NativeCurrency,
		rpc: string[],
		faucets?: string[],
		explorers?: {
			name: string,
			url: string,
			standard?: string,
			icon?: string,
		}[],
		infoURL?: string,
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

	export type NativeCurrency = {
		name: string,
		symbol: TickerSymbol,
		decimals: number
	}

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
		decimals: number,
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

	export type GasAmount = number
	export type GasRate = number

	export type Transaction = {
		network: Network,

		transactionID: TransactionID,
		nonce: TransactionNonce,
		transactionIndex: TransactionIndex,
		blockNumber: BlockNumber,
		blockHash: BlockHash,
		date: number,

		isSuccessful: boolean,

		fromAddress: Address,
		fromAddressLabel?: string,
		toAddress: Address,
		toAddressLabel?: string,

		value: number,

		gasToken: NativeCurrency | ERC20Token,
		gasOffered?: GasAmount,
		gasSpent: GasAmount,
		gasRate: GasRate,
		gasValue: number,

		logEvents?: TransactionLogEvent[]
	}
	export type TransactionLogEvent = {
		indexInTransaction: number
		transactionHash: TransactionID

		indexInBlock: number
		blockNumber?: BlockNumber
		blockHash?: BlockHash

		topics: TopicHash[]
		data: string

		contract: Partial<Ethereum.Contract & Ethereum.ERC20Token & Ethereum.ERC721Token & Ethereum.ERC1155Token> & {
			label: string
		}

		removed?: boolean

		decoded: TransactionLogEventDecoded
	}
	export type TransactionLogEventDecoded = {
		name: string
		signature: string
		params: ContractFunctionParameter[]
	}
	export type ContractFunctionParameter = {
		name: ContractFunctionParameterName
		type: 'address' | 'uint256' | 'bytes32'
		indexed: boolean
		decoded: boolean
		value: any
	}
	export type ContractFunctionParameterName = string
	export type TopicHash = string
}