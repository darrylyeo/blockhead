// Types/constants
import type { Block, Transaction, SmartContract } from './index'
import type { Ethereum } from '$/data/networks/types'
import type { Abi } from 'abitype'


// Functions
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
			// parameters: transaction.decoded_input.parameters,
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
	source?: 'Sourcify' | 'Bytecode Match',
	sourcifyUrl?: string,
	contractState?: {
		creationBytecode?: Ethereum.ContractBytecode,
		runtimeBytecode?: Ethereum.ContractBytecode,
		isSelfDestructed?: boolean,
	},
	contractMetadata?: Ethereum.ContractMetadata<string>,
} => ({
	source: (
		smartContract.is_verified_via_sourcify ?
			'Sourcify'
		: smartContract.is_verified_via_eth_bytecode_db ?
			'Bytecode Match'
		:
			undefined
	),
	...smartContract.sourcify_repo_url && {
		sourcifyUrl: smartContract.sourcify_repo_url,
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
