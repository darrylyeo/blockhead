// Types
import type { Ethereum } from '$/data/networks/types'
import type { AbiType } from 'abitype'
import type { FetchReturnType } from 'openapi-typescript-fetch'
import type { getBlock, getTransaction, getTransactionReceipt, getAddressDetails } from '.'


// Functions
export const normalizeBlock = (
	block: FetchReturnType<typeof getBlock>['result'],
	network: Ethereum.Network,
): Ethereum.Block => ({
	network,
	blockNumber: BigInt(block.number),

	finalityStatus: 'finalized',
	
	blockHash: block.hash as `0x${string}`,
	parentBlockHash: block.parentHash as `0x${string}`,
	timestamp: Number(block.timestamp) * 1000,

	gasLimit: BigInt(block.gasLimit),
	gasUsed: BigInt(block.gasUsed),
	baseFeePerGas: !isNaN(Number(block.baseFeePerGas)) ? BigInt(block.baseFeePerGas) : undefined,

	transactionsRoot: block.transactionsRoot as `0x${string}`,
	receiptsRoot: block.receiptsRoot as `0x${string}`,
	logsBloom: block.logsBloom as `0x${string}`,

	minerAddress: block.miner as `0x${string}`,
	difficulty: BigInt(block.difficulty),
	totalDifficulty: undefined,
	nonce: block.nonce as `0x${string}`,
	sha3Uncles: block.sha3Uncles as `0x${string}`,

	extraData: block.extraData as `0x${string}`,

	transactions: block.transactions.map(transaction => (
		normalizeTransaction({ data: transaction }, network)
	)),
})

export const normalizeTransaction = (
	transaction: (
		| FetchReturnType<typeof getTransaction>['result']
		| { data: FetchReturnType<typeof getBlock>['result']['transactions'][number] }
	),
	network: Ethereum.Network,
): Ethereum.Transaction => ({
	network,
	transactionId: transaction.data.hash as `0x${string}`,

	// executionStatus: 'successful',
	...'isPending' in transaction && {
		finalityStatus: transaction.isPending ? 'pending' : 'finalized',
	},

	...'blockNumber' in transaction && transaction.blockNumber !== undefined && {
		blockNumber: BigInt(transaction.blockNumber),
	},
	...'blockHash' in transaction && transaction.blockHash !== undefined && {
		blockHash: transaction.blockHash as `0x${string}`,
	},

	nonce: Number(transaction.data.nonce),
	type: ({
		0: 'legacy',
		1: 'eip2930',
		2: 'eip1559',
	} as const)[Number(transaction.data.type) as 0 | 1 | 2],

	...'from' in transaction && transaction.from !== undefined && {
		fromAddress: transaction.from as `0x${string}`,
	},
	...'to' in transaction && transaction.to !== undefined && {
		toAddress: transaction.data.to as `0x${string}`,
	},
	labels: 'contract' in transaction && transaction.contract ? {
		toAddress: transaction.contract.name || transaction.contract.label
	} : undefined,

	input: transaction.data.input as `0x${string}`,
	...'method' in transaction && transaction.method && {
		inputDecoded: {
			methodName: transaction.method.name,
			methodHash: transaction.method.signature,
			params: (
				transaction.method.inputs
					.map(input => ({
						name: input.name,
						type: input.type as AbiType,
						value: input.value,
					}))
			),
		},
	},
	value: transaction.data.value ? BigInt(transaction.data.value) : 0n,

	gasToken: network.nativeCurrency,
	gasUnitsOffered: BigInt(transaction.data.gas),
	gasUnitRate: (
		transaction.data.maxFeePerGas ?
			BigInt(transaction.data.maxFeePerGas)
		: transaction.data.gasPrice ?
			BigInt(transaction.data.gasPrice)
		:
			undefined
	),

	signature: {
		v: Number(transaction.data.v) as 0 | 1,
		r: transaction.data.r as `0x${string}`,
		s: transaction.data.s as `0x${string}`,
	},
})

export const normalizeTransactionReceipt = (
	transactionReceipt: FetchReturnType<typeof getTransactionReceipt>['result'],
	network: Ethereum.Network,
): Omit<Ethereum.Transaction, 'type' | 'value' | 'fromAddress'> => ({
	network,
	transactionId: transactionReceipt.data.transactionHash as `0x${string}`,
	transactionIndex: Number(transactionReceipt.data.transactionIndex),

	executionStatus: transactionReceipt.data.status === '0x1' ? 'successful' : 'failed',
	finalityStatus: 'finalized',

	blockNumber: transactionReceipt.data.blockNumber ? BigInt(transactionReceipt.data.blockNumber) : undefined,
	blockHash: transactionReceipt.data.blockHash as `0x${string}`,

	deployedContractAddress: transactionReceipt.data.contractAddress !== '0x0000000000000000000000000000000000000000' ? transactionReceipt.data.contractAddress as `0x${string}` : undefined,

	gasToken: network.nativeCurrency,
	gasUnitsSpent: BigInt(transactionReceipt.data.gasUsed),
	gasUnitsOffered: BigInt(transactionReceipt.data.gasUsed),
	gasUnitRate: BigInt(transactionReceipt.data.effectiveGasPrice),

	logEvents: transactionReceipt.data.logs.map(log => normalizeLogEvent(log)),
})

export const normalizeLogEvent = (
	log: FetchReturnType<typeof getTransactionReceipt>['result']['data']['logs'][number],
): Ethereum.TransactionLogEvent => ({
	topics: log.topics as [`0x${string}`, ...`0x${string}`[]],
	data: log.data as `0x${string}`,

	contract: {
		address: log.address as `0x${string}`
	},

	removed: log.removed,

	indexInTransaction: Number(log.logIndex),
	transactionHash: log.transactionHash as `0x${string}`,

	indexInBlock: Number(log.logIndex),
	blockNumber: BigInt(log.blockNumber),
	blockHash: log.blockHash as `0x${string}`
})

export const normalizeAddressDetails = (
	addressDetails: FetchReturnType<typeof getAddressDetails>['result'],
): {
	source: {
		name?: string,
		url?: string,
	},
	contractState?: {
		runtimeBytecode?: Ethereum.ContractBytecode,
	},
	contractMetadata?: Ethereum.ContractMetadata,
} => {
	const contract = addressDetails.contractLookup?.[0]
	const verifiedSource = contract?.verifiedSource
	const verifiedLink = contract?.verifiedLink
	const codeAt = addressDetails.codeAt
	
	const abi = contract?.abi ? JSON.parse(contract.abi) : undefined
	const devdoc = contract?.devdoc ? JSON.parse(contract.devdoc) : {}
	const userdoc = contract?.userdoc ? JSON.parse(contract.userdoc) : {}

	let source
	try {
		if(contract?.source)
			source = JSON.parse(contract.source)
	}catch(e){}

	return {
		source: {
			name: (
				verifiedSource && (
					{
						'etherscan': 'Etherscan',
					}[verifiedSource]
					?? verifiedSource
				)
			),
			url: verifiedLink,
		},
		...codeAt && {
			contractState: {
				runtimeBytecode: codeAt as `0x${string}`,
			},
		},
		...contract && {
			contractMetadata: {
				name: contract.name,
				compiler: {
					version: abi?.compiler?.version
				},
				language: abi?.language,
				output: {
					abi,
					devdoc,
					userdoc
				},
				settings: abi?.settings,
				sources: (
					source && Array.isArray(source) ?
						Object.fromEntries(
							(source as unknown as { path: string, content: string }[])
								.map(item => [
									item.path,
									{
										content: item.content,
									}
								])
						)
					: contract.source ?
						{
							[contract.name ?? '[Contract Code]']: {
								content: contract.source,
							},
						}
					:
						undefined
				),
			}
		}
	}
}
