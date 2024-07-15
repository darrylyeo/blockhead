// import type { Branded, BrandedString } from '$/utils/branded'
import type { QuoteCurrency, TickerSymbol } from '../currencies'
import type { Abi as _Abi, AbiType, ExtractAbiFunctionNames, ExtractAbiFunction, ExtractAbiFunctions, AbiStateMutability, AbiParametersToPrimitiveTypes, AbiParameterToPrimitiveType } from 'abitype'
import type { EIP1193Provider, PublicClient as ViemPublicClient } from 'viem'

export namespace Ethereum {
	export type NetworkSlug = string // BrandedString<'NetworkSlug'>

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
			name?: string,
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
			type: 'L2' | 'L3' | 'shard',
			bridges?: {
				url: string,
			}[],
		},
	}
	export type ChainID = number // Branded<number, 'ChainId'>
	export type Slip44 = number // Branded<number, 'Slip44'>
	export type ChainName = string // BrandedString<'ChainName'>
	export type NetworkDisplayName = string // BrandedString<'NetworkDisplayName'>
	export type NetworkID = number // Branded<number, 'NetworkID'>
	export type NetworkName = 'mainnet' | 'ropsten' | 'rinkeby' | 'goerli' | 'kovan' | 'classic' | 'polygon' | string

	export type NativeCurrency = {
		name: string,
		symbol: TickerSymbol,
		decimals: number
	}

	export type Provider = EIP1193Provider
	export type PublicClient = ViemPublicClient

	export type TransactionID = `0x${string}` // BrandedString<'TransactionID'>
	export type TransactionIndex = number
	export type TransactionNonce = number

	export type BlockNumber = bigint
	export type BlockHash = `0x${string}` // BrandedString<'BlockHash'>
	export type BlockNonce = `0x${string}`
	export type BlockDifficulty = bigint
	
	export type Block = {
		network: Ethereum.Network,
		blockNumber: BlockNumber,
		finalityStatus: 'pending' | 'finalized' | 'orphaned' | 'replaced',

		blockHash?: BlockHash,
		parentBlockHash: BlockHash,
		timestamp?: number,
		nonce?: BlockNonce,

		difficulty: BlockDifficulty,
		totalDifficulty?: BlockDifficulty,

		gasLimit: GasAmount,
		gasUsed: GasAmount,

		minerAddress: Address,
		extraData: string,
		baseFeePerGas?: NativeCurrencyAmount,

		transactions?: Transaction[],
		transactionIds?: TransactionID[],
	}

	export type Address = `0x${string}` // BrandedString<'Address'>

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
		symbol?: TickerSymbol,
		decimals: number,
		icon?: string
	}
	export type ERC721TokenContract = Contract & {
		name: string,
		symbol?: TickerSymbol,
		icon?: string
	}
	export type ERC1155TokenContract = Contract & {
		name: string,
		symbol?: TickerSymbol,
		icon?: string
	}
	export type NftContract = (ERC721TokenContract | ERC1155TokenContract) & {
		ercTokenStandards?: ERCTokenStandard[]

		totalSupply?: bigint

		metadata?: {
			description?: string
			bannerImage?: string
			logoImage?: string
		},

		conversion?: {
			quoteCurrency: QuoteCurrency,

			value: number,
			rate?: number,
		}
	}
	export type Nft = {
		contract?: NftContract,
		owner: Ethereum.Address,
		originalOwner?: Ethereum.Address,

		tokenId: bigint
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
	export type NftContractWithNfts = NftContract & {
		nftsCount?: number
		nfts?: NftWithBalance[]
	}

	export type ERCTokenStandard = 'erc20' | 'erc721' | 'erc1155'

	export type NativeCurrencyAmount = bigint
	export type GasAmount = bigint

	export type AccessList = {
		address: Address,
		storageKeys: `0x${string}`[],
	}[]

	export type Abi = _Abi
	export type AbiPart<Abi extends _Abi> = Abi[number]
	export type AbiMethod<Abi extends _Abi, TAbiStateMutability extends AbiStateMutability = AbiStateMutability> = ExtractAbiFunctions<Abi, TAbiStateMutability>
	export type AbiMethodName<Abi extends _Abi> = ExtractAbiFunctionNames<Abi>
	export type AbiMethodArgs<Abi extends _Abi, MethodName extends AbiMethodName<Abi>> = AbiParametersToPrimitiveTypes<ExtractAbiFunction<Abi, MethodName>['inputs']>
	export type AbiMethodArg<Abi extends _Abi, MethodName extends AbiMethodName<Abi>, ArgumentIndex extends number> = AbiParameterToPrimitiveType<ExtractAbiFunction<Abi, MethodName>['inputs'][ArgumentIndex]>

	export type TransactionContractCallParameters<
		Abi extends _Abi,
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
		gasPrice?: NativeCurrencyAmount,
	}) & {
		accessList?: AccessList,
	}

	export type TransactionInput = `0x${string}`

	export type Transaction = {
		network: Network,
		transactionId: TransactionID,

		executionStatus?: 'failed' | 'successful',
		revertReason?: string,

		finalityStatus: 'pending' | 'finalized' | 'orphaned' | 'replaced',
		confirmations?: number,

		blockNumber?: BlockNumber,
		blockHash?: BlockHash,
		blockTimestamp?: number,

		transactionIndex?: TransactionIndex,
		nonce?: TransactionNonce,
		type: 'legacy' | 'eip2930' | 'eip1559',

		fromAddress: Address,
		toAddress?: Address,
		deployedContractAddress?: ContractAddress,
		labels?: {
			fromAddress?: string,
			toAddress?: string,
			deployedContractAddress?: string,
		},

		input?: TransactionInput,
		inputDecoded?: {
			methodName?: string,
			methodHash?: string,
		},
		value: NativeCurrencyAmount,

		gasToken: NativeCurrency | ERC20Token,
		gasUnitsOffered?: GasAmount,
		gasUnitsSpent?: GasAmount,
		gasUnitRate?: NativeCurrencyAmount,
		gasValue?: NativeCurrencyAmount,

		conversion?: {
			quoteCurrency: QuoteCurrency,

			value: number,
			rate?: number,

			gasUnitRate?: number,
			gasValue?: number,
		},

		logEvents?: TransactionLogEvent[],

		accessList?: AccessList,

		tags?: string[],
	}
	export type TransactionLogEvent = {
		topics?: TopicHash[],
		data?: string,

		contract: Partial<Ethereum.Contract & Ethereum.ERC20Token & Ethereum.ERC721TokenContract & Ethereum.ERC1155TokenContract> & {
			label?: string
		},

		removed?: boolean,

		decoded?: TransactionLogEventDecoded,

		indexInTransaction?: number,
		transactionHash?: TransactionID,

		indexInBlock?: number,
		blockNumber?: BlockNumber,
		blockHash?: BlockHash,
	}
	export type TransactionLogEventDecoded = {
		name: string,
		signature: string,
		params: ContractFunctionParameter[],
	}
	export type ContractFunctionParameter = {
		name?: ContractFunctionParameterName,
		type?: AbiType,
		indexed?: boolean,
		decoded?: boolean,
		value: any,
	}
	export type ContractFunctionParameterName = string
	export type TopicHash = `0x${string}` // BrandedString<'TopicHash'>

	export type ContractMetadata<SourcePath extends string> = {
		name?: string,
		compiler?: {
			version: string
		},
		language: 'Solidity' | string | undefined,
		output: {
			abi?: Abi,
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
		settings?: Partial<{
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
		}>,
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
