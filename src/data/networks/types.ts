import type { Branded, BrandedString } from '../../utils/branded'
import type { Provider as EthersProvider, Block as EthersBlock } from 'ethers'
import type { TickerSymbol } from '../currencies'
import type { Abi as AbiType, ExtractAbiFunctionNames, ExtractAbiFunction, ExtractAbiFunctions, AbiStateMutability, AbiParametersToPrimitiveTypes, AbiParameterToPrimitiveType } from 'abitype'
import type { PublicClient as ViemPublicClient } from 'viem'
import type { AbiEventParametersToPrimitiveTypes } from 'viem/dist/types/types/contract'

export namespace Ethereum {
	export type NetworkSlug = BrandedString<'NetworkSlug'>

	export type Network = {
		slug: NetworkSlug,
		name: NetworkDisplayName,
		chainId: ChainID,
		slip44?: Slip44,
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
	export type ChainID = Branded<number, 'ChainId'>
	export type Slip44 = Branded<number, 'Slip44'>
	export type ChainName = BrandedString<'ChainName'>
	export type NetworkDisplayName = BrandedString<'NetworkDisplayName'>
	export type NetworkID = Branded<number, 'NetworkID'>
	export type NetworkName = 'mainnet' | 'ropsten' | 'rinkeby' | 'goerli' | 'kovan' | 'classic' | 'polygon' | string

	export type NativeCurrency = {
		name: string,
		symbol: TickerSymbol,
		decimals: number
	}

	export type Provider = EthersProvider
	export type PublicClient = ViemPublicClient

	export type TransactionID = BrandedString<'TransactionID'>
	export type TransactionIndex = number
	export type TransactionNonce = number

	export type BlockNumber = number
	export type BlockHash = BrandedString<'BlockHash'>

	export type Block = EthersBlock

	export type Address = BrandedString<'Address'>

	export type ContractAddress = Address
	export type Contract = {
		name?: string,
		address: ContractAddress,
		chainId?: Ethereum.ChainID,
		abi?: object
	}

	export type ContractBytecode = `0x${string}`

	export type ERC20Token = Contract & {
		name: string,
		symbol: TickerSymbol,
		decimals: number,
		icon?: string
	}
	export type ERC721TokenContract = Contract & {
		name: string,
		symbol: TickerSymbol,
		icon?: string
	}
	export type ERC1155TokenContract = Contract & {
		name: string,
		symbol: TickerSymbol,
		icon?: string
	}
	export type NftContract = (ERC721TokenContract | ERC1155TokenContract) & {
		ercTokenStandards?: ERCTokenStandard[]

		metadata: {
			description?: string
			bannerImage?: string
			logoImage?: string
		}
	}
	export type Nft = {
		contract?: NftContract,
		owner: Ethereum.Address,

		tokenId: number
		tokenUri?: string
		
		metadata: {
			name?: string,
			description?: string
			image?: string
			attributes?: NftAttribute[]
			animationUrl?: string,
			[key: string]: any,
		}
	}
	export type NftAttribute = {
		key?: string
		displayType?: string
		traitType: string
		value: string | number
	}
	export type NftWithBalance = Nft & {
		erc1155Balance?: number
	}
	export type NftContractWithBalance = NftContract & {
		balance: number
		quote?: number
		quoteRate?: number

		nfts: NftWithBalance[]
	}

	export type ERCTokenStandard = 'erc20' | 'erc721' | 'erc1155'

	export type GasAmount = bigint
	export type GasRate = bigint

	export type Abi = AbiType
	export type AbiPart<Abi extends AbiType> = Abi[number]
	export type AbiMethod<Abi extends AbiType, TAbiStateMutability extends AbiStateMutability = AbiStateMutability> = ExtractAbiFunctions<Abi, TAbiStateMutability>
	export type AbiMethodName<Abi extends AbiType> = ExtractAbiFunctionNames<Abi>
	export type AbiMethodArgs<Abi extends AbiType, MethodName extends AbiMethodName<Abi>> = AbiParametersToPrimitiveTypes<ExtractAbiFunction<Abi, MethodName>['inputs']>
	export type AbiMethodArg<Abi extends AbiType, MethodName extends AbiMethodName<Abi>, ArgumentIndex extends number> = AbiParameterToPrimitiveType<ExtractAbiFunction<Abi, MethodName>['inputs'][ArgumentIndex]>

	export type TransactionContractCallParameters<
		Abi extends AbiType,
		MethodName extends AbiMethodName<Abi>,
		MethodArgs = AbiMethodArgs<Abi, MethodName>,
	> = {
		network: Network,
		contractAddress: ContractAddress,
		contractAbi: Abi,
		contractMethod: MethodName,
		contractMethodArgs: MethodArgs,

		fromAddress: Address,
		nonce?: TransactionNonce,
		payableAmount?: bigint,
		gasAmount?: GasAmount,
	} & ({
		isEip1559: true,
		maxFeePerGas?: bigint,
		maxPriorityFeePerGas?: bigint,
	} | {
		isEip1559: false,
		gasPrice?: GasRate,
	}) & {
		accessList?: {
			address: Address,
			storageKeys: `0x${string}`[],
		}[],
	}

	export type Transaction = {
		network: Network,

		transactionID: TransactionID,
		nonce?: TransactionNonce,
		transactionIndex: TransactionIndex,
		blockNumber: BlockNumber,
		blockHash?: BlockHash,
		date: number,

		isSuccessful: boolean,

		fromAddress: Address,
		fromAddressLabel?: string,
		toAddress: Address,
		toAddressLabel?: string,

		value: number | string, // bigint

		gasToken: NativeCurrency | ERC20Token,
		gasOffered?: GasAmount,
		gasSpent: GasAmount,
		gasRate: GasRate,
		gasValue: number | string, // bigint

		logEvents?: TransactionLogEvent[]
	}
	export type TransactionLogEvent = {
		indexInTransaction: number
		transactionHash: TransactionID

		indexInBlock?: number
		blockNumber?: BlockNumber
		blockHash?: BlockHash

		topics: TopicHash[]
		data: string

		contract: Partial<Ethereum.Contract & Ethereum.ERC20Token & Ethereum.ERC721TokenContract & Ethereum.ERC1155TokenContract> & {
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
	export type TopicHash = BrandedString<'TopicHash'>

	export type ContractMetadata<SourcePath extends string> = {
		compiler: {
			version: string
		},
		language: 'Solidity' | string,
		output: {
			abi: Abi,
			devdoc?: {
				kind: 'dev' | string,
				methods: {},
				version: number,
			},
			userdoc?: {
				kind: 'user' | string,
				methods: {},
				version: number,
			}
		},
		settings: {
			compilationTarget: { [key in SourcePath]: string },
			evmVersion: 'istanbul' | string,
			libraries: {},
			metadata: {
				bytecodeHash: 'ipfs' | string,
			},
			optimizer: {
				enabled: boolean,
				runs: number,
			},
			remappings: [],
		},
		sources: {
			[key in SourcePath]: {
				content?: string,
				keccak256: `0x${string}`, // 64
				license: string,
				urls?: string[],
			}
		},
		version?: number,
	}
}
