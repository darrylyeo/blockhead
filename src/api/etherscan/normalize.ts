import type { Ethereum } from '$/data/networks/types'
import type { Etherscan } from './index'


export const normalizeBlock = (
	block: Awaited<ReturnType<typeof Etherscan.RpcProxy.getBlockByNumber<boolean>>>,
	network: Ethereum.Network
): Ethereum.Block => ({
	network,
	blockNumber: BigInt(block.number),
	finalityStatus: 'hash' in block && block.hash ? 'finalized' : 'pending',

	blockHash: block.hash ?? undefined,
	parentBlockHash: block.parentHash,
	timestamp: Number(block.timestamp) * 1000,
	nonce: block.nonce ? block.nonce : undefined,

	difficulty: BigInt(block.difficulty),
	totalDifficulty: BigInt(block.totalDifficulty),

	gasLimit: BigInt(block.gasLimit),
	gasUsed: BigInt(block.gasUsed),

	minerAddress: block.miner,
	extraData: block.extraData,
	baseFeePerGas: BigInt(block.baseFeePerGas),

	...(((transactions: (typeof block)['transactions']): transactions is `0x${string}`[] => typeof transactions[0] === 'string')(block.transactions) ? {
		transactionIds: block.transactions,
	} : {
		transactions: block.transactions.map(transaction => ({
			executionStatus: undefined,
			...normalizeRpcTransaction(network, transaction),
		})),
	}),
})

export const normalizeTransaction = (
	network: Ethereum.Network,
	transaction: Awaited<ReturnType<typeof Etherscan.Accounts.getTransactions>>[number]
): Ethereum.Transaction => ({
	network,
	transactionId: transaction.hash,

	executionStatus: transaction.isError === '0' ? 'successful' : 'failed',
	finalityStatus: Number(transaction.confirmations) > 0 ? 'finalized' : 'pending',

	nonce: Number(transaction.nonce),
	transactionIndex: Number(transaction.transactionIndex),
	blockNumber: BigInt(transaction.blockNumber),
	blockHash: transaction.blockHash,
	blockTimestamp: Number(transaction.timeStamp) * 1000,

	fromAddress: transaction.from,
	toAddress: transaction.to,

	input: transaction.input,
	value: BigInt(transaction.value),

	gasToken: network.nativeCurrency,
	gasUnitsSpent: BigInt(transaction.gasUsed),
	gasUnitRate: BigInt(transaction.gasPrice),
})

export const normalizeRpcTransaction = (
	network: Ethereum.Network,
	transaction: Awaited<ReturnType<typeof Etherscan.RpcProxy.getTransactionByHash>> | Awaited<ReturnType<typeof Etherscan.RpcProxy.getBlockByNumber<true>>>['transactions'][number]
): Omit<Ethereum.Transaction, 'executionStatus'> => ({
	network,
	transactionId: transaction.hash,

	finalityStatus: transaction.blockHash !== undefined ? 'finalized' : 'pending',

	nonce: Number(transaction.nonce),
	transactionIndex: Number(transaction.transactionIndex),
	blockNumber: BigInt(transaction.blockNumber),
	blockHash: transaction.blockHash,

	fromAddress: transaction.from,
	toAddress: transaction.to,

	input: transaction.input,
	value: BigInt(transaction.value),

	gasToken: network.nativeCurrency,
	gasUnitRate: BigInt(transaction.gasPrice),
})


export const normalizeRpcTransactionReceipt = (
	network: Ethereum.Network,
	transaction: Awaited<ReturnType<typeof Etherscan.RpcProxy.getTransactionReceipt>>
): Omit<Ethereum.Transaction, 'value'> => ({
	network,
	transactionId: transaction.transactionHash,

	executionStatus: Number(transaction.status) === 1 ? 'successful' : 'failed',
	finalityStatus: transaction.blockHash !== undefined ? 'finalized' : 'pending',

	transactionIndex: Number(transaction.transactionIndex),
	blockNumber: BigInt(transaction.blockNumber),
	blockHash: transaction.blockHash,

	fromAddress: transaction.from,
	toAddress: transaction.to,

	gasToken: network.nativeCurrency,
	gasUnitsSpent: BigInt(transaction.gasUsed),
	gasUnitRate: BigInt(transaction.effectiveGasPrice),

	logEvents: transaction.logs.map(normalizeLog),
})

export const normalizeLog = (log: Awaited<ReturnType<typeof Etherscan.RpcProxy.getTransactionReceipt>>['logs'][number]): Ethereum.TransactionLogEvent => ({
	topics: log.topics,
	data: log.data,

	contract: {
		address: log.address,
	},

	transactionHash: log.transactionHash,
	indexInTransaction: Number(log.transactionIndex),

	indexInBlock: Number(log.logIndex),
	blockNumber: BigInt(log.blockNumber),
	blockHash: log.blockHash,
})

export const normalizeContractSource = <SourcePath extends string>(metadata: Awaited<ReturnType<typeof Etherscan.Contracts.getSource>>) => {
	const moreMetadata = (() => {
		try {
			return JSON.parse(metadata.SourceCode.match(/^\{([\s\S]+)\}$/)?.[1]!)
		} catch {}
	})() as {
		language: string;
		sources: {
			[key in SourcePath]: {
				content: string;
			}
		};
		settings: {
			remappings: string[];
			optimizer: {
				enabled: boolean;
				runs: number;
			};
			metadata: {
				useLiteralContent: boolean;
				bytecodeHash: string;
			};
			outputSelection: {
				[key: string]: {
					[key: string]: string[];
				};
			};
			evmVersion: string;
			viaIR: boolean;
			libraries: {};
		}
	} | undefined

	return {
		swarmUri: metadata.SwarmSource,
		contractMetadata: {
			...moreMetadata,
			compiler: {
				version: metadata.CompilerVersion,
			},
			language: moreMetadata?.language,
			output: {
				abi: (() => {
					try {
						return JSON.parse(metadata.ABI)
					} catch {
						return []
					}
				})(),
			},
			settings: {
				evmVersion: moreMetadata?.settings.evmVersion ?? metadata.EVMVersion,
				libraries: moreMetadata?.settings.libraries, // metadata.Library,
				metadata: moreMetadata?.settings.metadata,
				compilationTarget: {
					[metadata.ContractName]: metadata.ContractName,
				},
				optimizer: {
					enabled: moreMetadata?.settings.optimizer.enabled ?? metadata.OptimizationUsed == '1',
					runs: moreMetadata?.settings.optimizer.runs ?? Number(metadata.Runs),
				},
			},
			sources: Object.fromEntries(
				Object.entries(
					moreMetadata?.sources ?? {
						[metadata.ContractName]: { content: metadata.SourceCode }
					}
				)
					.map(([path, { content, license, urls, keccak256 }]) => [
						path,
						{
							content,
							license: license || metadata.LicenseType,
							urls: urls || [
								metadata.SwarmSource,
							],
							keccak256,
						}
					])
			)
		} as Ethereum.ContractMetadata<SourcePath>,
	}
}
