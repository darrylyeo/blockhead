// Types/constants
import type { TokenInfo, Token, TokenBalance, AddressNftCollection, AddressNftInstanceCollection, Block, Transaction, SmartContract } from './index'
import type { Ethereum } from '$/data/networks/types'
import type { TokenWithBalance } from '$/data/tokens'
import type { Abi } from 'abitype'


// Functions
import { normalizeNftAttributes } from '$/utils/normalizeNftAttributes'

export const normalizeToken = (
	token: TokenInfo | Token,
	chainId: Ethereum.ChainId
): Ethereum.Erc20Token => ({
	chainId,
	address: token.address as Ethereum.ContractAddress,

	name: token.name,
	symbol: token.symbol,
	decimals: Number(token.decimals),
	icon: 'icon_url' in token ? token.icon_url : undefined,

	totalSupply: (
		token.total_supply !== null
			? BigInt(token.total_supply)
			: undefined
	),

	conversion: {
		quoteCurrency: 'USD',
		rate: Number(token.exchange_rate),
	},
})

export const normalizeTokenBalance = (
	tokenBalance: TokenBalance,
	chainId: Ethereum.ChainId
): TokenWithBalance => ({
	token: normalizeToken(
		tokenBalance.token,
		chainId,
	),

	balance: BigInt(tokenBalance.value),
})

export const normalizeNft = (
	nft: AddressNftInstanceCollection,
): Ethereum.Nft => ({
	owner: nft.holder_address_hash as Ethereum.Address,
	
	tokenId: BigInt(nft.id),
	tokenUri: nft.external_app_url,

	metadata: {
		...(
			nft.metadata
				? normalizeNftAttributes(nft.metadata as Record<string, string>)
				: []
		),

		image: (
			nft.image_url
			|| nft.animation_url
			|| (nft.metadata as Record<string, string>)?.image
			|| (nft.metadata as Record<string, string>)?.error
		),
	}
})

export const normalizeNftContract = (
	nftCollection: AddressNftCollection,
	network: Ethereum.Network
): Ethereum.NftContractWithNfts => ({
	chainId: network.chainId,
	address: nftCollection.token.address as Ethereum.ContractAddress,

	ercTokenStandards: (
		[
			nftCollection.token_instances[0]?.token_type?.toLowerCase(),
		]
			.filter(Boolean) as Ethereum.ErcTokenStandard[]
	),

	name: nftCollection.token.name,
	symbol: nftCollection.token.symbol,

	nfts: (
		nftCollection.token_instances
			.map(nft => (
				normalizeNft(nft)
			))
	),
	nftsCount: Number(nftCollection.amount),
})

export const normalizeTransaction = (
	transaction: Transaction,
	network: Ethereum.Network
): Ethereum.Transaction => ({
	network,
	transactionId: transaction.hash as Ethereum.TransactionId,

	executionStatus: ({
		'ok': 'successful',
		'error': 'failed',
	} as const)[transaction.status] ?? 'successful',
	revertReason: transaction.revert_reason ?? undefined,

	finalityStatus: 'finalized',
	confirmations: transaction.confirmations,

	blockNumber: BigInt(transaction.block),
	blockTimestamp: new Date(transaction.timestamp).valueOf(),

	transactionIndex: transaction.position,
	nonce: transaction.nonce,
	type: {
		'0': 'legacy',
		'1': 'eip2930',
		'2': 'eip1559',
	}[transaction.type],

	fromAddress: transaction.from.hash as Ethereum.Address,
	toAddress: transaction.to.hash as Ethereum.Address,
	...transaction.created_contract && {
		deployedContractAddress: transaction.created_contract.hash as Ethereum.ContractAddress,
	},
	labels: {
		fromAddress: transaction.from.name,
		toAddress: transaction.to.name,
		...transaction.created_contract && {
			deployedContractAddress: transaction.created_contract.name,
		},
	},

	input: transaction.raw_input as Ethereum.TransactionInput,
	...transaction.decoded_input && {
		inputDecoded: {
			methodName: transaction.decoded_input.method_call.match(/^[^(]+/)?.[0],
			methodHash: transaction.decoded_input.method_id,
			params: transaction.decoded_input.parameters.map(param => ({
				name: param.name,
				type: param.type,
				value: param.value,
			})),
		},
	},
	value: BigInt(transaction.value),

	gasToken: network.nativeCurrency,
	gasUnitsOffered: BigInt(transaction.gas_limit),
	gasUnitsSpent: BigInt(transaction.gas_used),
	gasUnitRate: BigInt(transaction.gas_price),
	gasValue: BigInt(transaction.gas_used) * BigInt(transaction.gas_price),

	conversion: {
		quoteCurrency: 'USD',

		value: Number(transaction.value) * Number(transaction.exchange_rate),
		rate: Number(transaction.exchange_rate),

		gasUnitRate: Number(transaction.exchange_rate),
		gasValue: Number(transaction.gas_used) * Number(transaction.gas_price),
	},

	...(transaction.tx_tag || transaction.tx_types) && {
		tags: [
			...transaction.tx_tag ? [transaction.tx_tag] : [],
			...transaction.tx_types ?? [],
		],
	},
})

export const normalizeBlock = (
	block: Block,
	network: Ethereum.Network
): Ethereum.Block => ({
	network,
	blockNumber: BigInt(block.height),
	finalityStatus: 'finalized',

	blockHash: block.hash as Ethereum.BlockHash,
	parentBlockHash: block.parent_hash as Ethereum.BlockHash,
	timestamp: Number(block.timestamp),
	nonce: block.nonce as Ethereum.BlockNonce,

	difficulty: BigInt(block.difficulty),
	totalDifficulty: BigInt(block.total_difficulty),

	gasLimit: BigInt(block.gas_limit),
	gasUsed: BigInt(block.gas_used),

	...block.miner && {
		minerAddress: block.miner.hash as Ethereum.Address,
	},
	extraData: block.extra_data,
	baseFeePerGas: block.priority_fee ? BigInt(block.priority_fee) : undefined,
})

export const normalizeContractSource = (
	smartContract: SmartContract
): {
	repository?: {
		name?: 'Sourcify' | 'Bytecode Match',
		url?: string,
	},
	contractState?: {
		creationBytecode?: Ethereum.ContractBytecode,
		runtimeBytecode?: Ethereum.ContractBytecode,
		isSelfDestructed?: boolean,
	},
	contractMetadata?: Ethereum.ContractMetadata<string>,
} => ({
	repository: {
		name: (
			smartContract.is_verified_via_sourcify ?
				'Sourcify'
			: smartContract.is_verified_via_eth_bytecode_db ?
				'Bytecode Match'
			:
				undefined
		),
		url: smartContract.sourcify_repo_url,
	},
	contractState: {
		...smartContract.creation_bytecode && {
			creationBytecode: smartContract.creation_bytecode as Ethereum.ContractBytecode,
		},
		...smartContract.deployed_bytecode && {
			runtimeBytecode: smartContract.deployed_bytecode as Ethereum.ContractBytecode,
		},
		...'is_self_destructed' in smartContract && {
			isSelfDestructed: smartContract.is_self_destructed,
		},
	},
	...smartContract.is_verified && {
		contractMetadata: {
			name: smartContract.name,
			...smartContract.compiler_version && {
				compiler: {
					version: smartContract.compiler_version,
				},
			},
			language: smartContract.language ?? (smartContract.is_vyper_contract ? 'Vyper' : undefined),
			output: {
				...smartContract.abi && {
					abi: smartContract.abi as unknown as Abi,
				},
			},
			...smartContract.compiler_settings && {
				settings: {
					...smartContract.compiler_settings,
					optimizer: {
						...smartContract.compiler_settings.optimizer,
						runs: smartContract.optimizations_runs,
					},
				},
			},
			sources: {
				[smartContract.file_path ?? smartContract.name ?? '']: {
					content: smartContract.source_code,
				},
				...smartContract.additional_sources && Object.fromEntries(
					smartContract.additional_sources
						.map(source => [
							source.file_path,
							{
								content: source.source_code,
							}
						])
				),
			},
		},
	},
})
