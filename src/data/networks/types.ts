// import type { Branded, BrandedString } from '$/utils/branded'
import type { QuoteCurrency, TickerSymbol } from '../currencies'
import type { Abi as _Abi, AbiType, ExtractAbiFunctionNames, ExtractAbiFunction, ExtractAbiFunctions, AbiStateMutability, AbiParametersToPrimitiveTypes, AbiParameterToPrimitiveType, AbiInternalType } from 'abitype'
import type { EIP1193Provider, PublicClient as ViemPublicClient } from 'viem'

export namespace Ethereum {
	export type NetworkSlug = string // BrandedString<'NetworkSlug'>

	export type Network = {
		slug: NetworkSlug,
		name: string,

		chainId: ChainId,
		slip44?: Slip44,
		shortName?: string,
		chain?: ChainName,
		network?: NetworkName,
		networkId?: NetworkId,

		nativeCurrency: NativeCurrency,

		colors?: string[],
		icon?: string,

		rpc?: string[],
		faucets?: string[],
		explorers?: {
			name?: string,
			url: string,
			standard?: string,
			icon?: string,
		}[],
		infoURL?: string,

		ens?: {
			registry: ContractAddress
		},

		parent?: {
			chain: `eip155-${ChainId}`,
			type: 'L2' | 'L3' | 'shard',
			bridges?: {
				name?: string,
				url: string,
			}[],
		},
	}
	export type ChainId = number // Branded<number, 'ChainId'>
	export type Slip44 = number // Branded<number, 'Slip44'>
	export type ChainName = string // BrandedString<'ChainName'>
	export type NetworkId = number // Branded<number, 'NetworkId'>
	export type NetworkName = 'mainnet' | 'ropsten' | 'rinkeby' | 'goerli' | 'kovan' | 'classic' | 'polygon' | string

	export type NativeCurrency = {
		name: string,
		symbol: TickerSymbol,
		decimals: number
	}

	export type Provider = EIP1193Provider
	export type PublicClient = ViemPublicClient

	export type TransactionId = `0x${string}` // BrandedString<'TransactionId'>
	export type TransactionIndex = number
	export type TransactionNonce = number

	export type BlockNumber = bigint
	export type BlockHash = `0x${string}` // BrandedString<'BlockHash'>
	export type BlockNonce = `0x${string}`
	export type BlockDifficulty = bigint
	
	export type Block = {
		network: Ethereum.Network,
		blockNumber: BlockNumber,

		finalityStatus?: 'pending' | 'finalized' | 'orphaned' | 'replaced',
		confirmations?: number,

		blockHash?: BlockHash,
		parentBlockHash: BlockHash,
		timestamp?: number,

		gasLimit: GasAmount,
		gasUsed: GasAmount,
		baseFeePerGas?: NativeCurrencyAmount,

		transactionsRoot?: `0x${string}`,
		receiptsRoot?: `0x${string}`,
		logsBloom?: `0x${string}`,
		
		minerAddress?: Address,
		difficulty?: BlockDifficulty,
		totalDifficulty?: BlockDifficulty,
		nonce?: BlockNonce,
		sha3Uncles?: `0x${string}`,
		mixHashOrPrevRandao?: `0x${string}`,

		extraData: string,

		transactions?: Transaction[],
		transactionIds?: TransactionId[],
	}

	export type Address = `0x${string}` // BrandedString<'Address'>

	export type ContractAddress = Address
	export type Contract = {
		name?: string,
		address: ContractAddress,
		chainId?: Ethereum.ChainId,
		abi?: object
	}

	export type ContractBytecode = `0x${string}`

	export type Erc20Token = Contract & {
		name: string
		symbol?: TickerSymbol
		decimals: number

		icon?: string

		totalSupply?: bigint

		conversion?: {
			quoteCurrency: QuoteCurrency
			rate?: number
		}
	}
	export type Erc721TokenContract = Contract & {
		name: string,
		symbol?: TickerSymbol,
		icon?: string
	}
	export type Erc1155TokenContract = Contract & {
		name: string,
		symbol?: TickerSymbol,
		icon?: string
	}
	export type NftContract = (Erc721TokenContract | Erc1155TokenContract) & {
		ercTokenStandards?: ErcTokenStandard[]

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

	export type ErcTokenStandard = 'erc20' | 'erc721' | 'erc1155'

	export type NativeCurrencyAmount = bigint
	export type GasAmount = bigint

	export type Erc20Transfer = {
		token: Ethereum.Erc20Token,

		fromAddress: Ethereum.Address,
		toAddress: Ethereum.Address,
		labels?: {
			fromAddress?: string,
			toAddress?: string,
		},

		value: bigint,

		conversion?: {
			quoteCurrency: QuoteCurrency,

			value: number,
			rate?: number,
		},

		transaction?: Ethereum.Transaction,
	}

	export type NftTransfer = {
		nftContract: NftContract,
		nftId: bigint,

		fromAddress: Address,
		toAddress: Address,
		labels: {
			fromAddress: string,
			toAddress: string,
		},

		value?: bigint,

		action: string,
	}

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
		transactionId: TransactionId,

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
			params: ContractFunctionParameter[],
		},
		value: NativeCurrencyAmount,

		gasToken: NativeCurrency | Erc20Token,
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

		trace?: Trace,
		logEvents?: TransactionLogEvent[],

		accessList?: AccessList,

		tags?: string[],

		signature?: {
			r: `0x${string}`,
			s: `0x${string}`,
			v?: 0 | 1,
			yParity?: number,
		},

		summary?: {
			description?: string,
			category?: string,
		},
	}
	export type Trace = {
		blockHash: BlockHash
		blockNumber: BlockNumber
		transactionHash: TransactionId
		transactionPosition: number

		type: string // 'call' | 'create' | 'suicide' | 'reward'

		action: {
			fromAddress: Address
			toAddress: Address

			callType: string
			input: TransactionInput
			value: NativeCurrencyAmount

			gasUnits: GasAmount
		}
		result: {
			gasUsed: GasAmount
			output: string
		}
		subtraces?: Trace[]
	}
	export type TransactionLogEvent = {
		topics?: TopicHash[],
		data?: string,

		contract: Partial<Ethereum.Contract & Ethereum.Erc20Token & Ethereum.Erc721TokenContract & Ethereum.Erc1155TokenContract> & {
			label?: string
		},

		removed?: boolean,

		decoded?: TransactionLogEventDecoded,

		indexInTransaction?: number,
		transactionHash?: TransactionId,

		indexInBlock?: number,
		blockNumber?: BlockNumber,
		blockHash?: BlockHash,
	}
	export type TransactionLogEventDecoded = {
		name: string,
		signature: string,
		params: ContractFunctionParameter[],
	}
	export type ContractFunctionParameter<
		_AbiType extends AbiType = AbiType,
		_ContractFunctionParameterName extends ContractFunctionParameterName = ContractFunctionParameterName,
		_AbiInternalType extends AbiInternalType = AbiInternalType,
	> = {
		name?: _ContractFunctionParameterName,
		type?: _AbiType,
		internalType?: _AbiInternalType,
		indexed?: boolean,
		decoded?: boolean,
		value: AbiParameterToPrimitiveType<
			{
				name: _ContractFunctionParameterName
				type: _AbiType
				internalType: _AbiInternalType
			},
			'inputs'
		>,
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
