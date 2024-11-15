// Types
import type { Ethereum } from '$/data/networks/types'
import type { AbiType } from 'abitype'


// Functions
import { Evm } from './translate/index'
import type { TokenWithBalance } from '$/data/tokens'

export const normalizeTransaction = (
	transaction: Awaited<ReturnType<typeof Evm.getTransaction>>,
	network: Ethereum.Network,
): Ethereum.Transaction => ({
	network,
	transactionId: transaction.rawTransactionData.transactionHash! as Ethereum.TransactionId,

	blockNumber: transaction.rawTransactionData.blockNumber !== undefined ? BigInt(transaction.rawTransactionData.blockNumber) : undefined,
	blockTimestamp: transaction.rawTransactionData.timestamp * 1000,

	type: ({
		0: 'legacy',
		1: 'eip2930',
		2: 'eip1559',
	} as const)[transaction.txTypeVersion as 0 | 1 | 2],

	fromAddress: transaction.rawTransactionData.fromAddress! as Ethereum.Address,
	toAddress: transaction.rawTransactionData.toAddress! as Ethereum.Address,

	// input: transaction.rawTransactionData.input as `0x${string}`,
	// value: BigInt(transaction.rawTransactionData.value),

	gasUnitsSpent: transaction.rawTransactionData.gas !== undefined ? BigInt(transaction.rawTransactionData.gas) : undefined,
	gasUnitRate: transaction.rawTransactionData.gasPrice !== undefined ? BigInt(transaction.rawTransactionData.gasPrice) : undefined,

	erc20Transfers: [
		...(
			transaction.classificationData.sent
				?.map(transfer => normalizeAssetTransfer(transfer))
				.filter(transfer => 'token' in transfer)
			?? []
		),
		...(
			transaction.classificationData.received
				?.map(transfer => normalizeAssetTransfer(transfer))
				.filter(transfer => 'token' in transfer)
			?? []
		),
	],

	summary: {
		description: transaction.classificationData.description,
		category: transaction.classificationData.type,
		// source: transaction.classificationData.source,
		// protocol: transaction.classificationData.protocol,
	},
})

export const normalizeAssetTransfer = (
	transfer: NonNullable<Awaited<ReturnType<typeof Evm.getTransaction>>['classificationData']['sent']>[0]
): Ethereum.Erc20Transfer | Ethereum.NftTransfer => (
	'token' in transfer ?
		{
			token: transfer.token,

			fromAddress: transfer.from?.address as Ethereum.Address,
			toAddress: transfer.to?.address as Ethereum.Address,
			labels: {
				fromAddress: transfer.from?.name,
				toAddress: transfer.to?.name,
			},

			value: BigInt(Math.floor(Number(transfer.amount) * 10 ** transfer.token.decimals)),

			action: transfer.action,
		} as Ethereum.Erc20Transfer
	:
		{
			nftContract: {
				name: transfer.nft.name,
				symbol: transfer.nft.symbol,
				address: transfer.nft.address as Ethereum.Address
			},

			nftId: BigInt(transfer.nft.id),

			fromAddress: transfer.from?.address as Ethereum.Address,
			toAddress: transfer.to?.address as Ethereum.Address,
			labels: {
				fromAddress: transfer.from?.name,
				toAddress: transfer.to?.name,
			},

			value: BigInt(transfer.amount),

			action: transfer.action,
		} as Ethereum.NftTransfer
)

export const normalizeRawTransaction = (
	transaction: Awaited<ReturnType<typeof Evm.getRawTransaction>>,
	network: Ethereum.Network,
): Ethereum.Transaction => ({
	network,
	transactionId: transaction.rawTx.transactionHash as Ethereum.TransactionId,

	executionStatus: transaction.txReceipt.status === 1 ? 'successful' : 'failed',
	finalityStatus: 'finalized',

	blockNumber: BigInt(transaction.rawTx.blockNumber),
	blockHash: transaction.rawTx.blockHash as Ethereum.BlockHash,
	blockTimestamp: transaction.rawTx.timestamp * 1000,

	transactionIndex: transaction.rawTx.transactionIndex,
	nonce: transaction.rawTx.nonce,
	type: transaction.rawTx.type === 2 ? 'eip1559' : 'legacy',

	fromAddress: transaction.rawTx.from as Ethereum.Address,
	toAddress: transaction.rawTx.to as Ethereum.Address,
	// deployedContractAddress: transaction.rawTx.contractAddress as Ethereum.ContractAddress,

	input: transaction.rawTx.input as `0x${string}`,
	inputDecoded: (
		transaction.decodedInput ?
			{
				methodName: transaction.decodedInput.functionName,
				params: (
					transaction.decodedInput.parameters
						?.map(param => ({
							name: param.parameter.name,
							type: param.parameter.type as AbiType,
							internalType: param.parameter.internalType ?? undefined,
							indexed: param.parameter.indexed,
							value: param.result,
						}))
				),
			}
		: undefined
	),
	value: BigInt(transaction.rawTx.value),

	gasToken: network.nativeCurrency,
	gasUnitsOffered: BigInt(transaction.rawTx.gas),
	gasUnitsSpent: BigInt(transaction.txReceipt.gasUsed),
	gasUnitRate: BigInt(transaction.txReceipt.effectiveGasPrice),
	gasValue: BigInt(transaction.rawTx.transactionFee),

	trace: normalizeTransactionTraces(transaction.rawTraces),

	logEvents: (
		transaction.eventLogs
			.map(log => normalizeEventLog(log))
	),

	signature: {
		r: transaction.rawTx.r as `0x${string}`,
		s: transaction.rawTx.s as `0x${string}`,
		v: Number(transaction.rawTx.v) as 0 | 1,
	},
})

const normalizeTransactionTraces = (
	traces: Awaited<ReturnType<typeof Evm.getRawTransaction>>['rawTraces'],
): Ethereum.Trace => {
	type Trace = typeof traces[0]

	const rootTrace: Trace = traces[0]
	const childTraces = Map.groupBy(
		traces.slice(1),
		trace => (
			trace.traceAddress.slice(0, -1).join(',')
		)
	)

	const buildTraceTree = (trace: Trace): Ethereum.Trace => {
		const key = trace.traceAddress.join(',')
		const children = childTraces.get(key) ?? []

		return {
			blockHash: trace.blockHash as Ethereum.BlockHash,
			blockNumber: BigInt(trace.blockNumber) as Ethereum.BlockNumber,
			transactionHash: trace.transactionHash as Ethereum.TransactionId,
			transactionPosition: trace.transactionPosition,
			type: trace.type,
			action: {
				fromAddress: trace.action.from as Ethereum.Address,
				toAddress: trace.action.to as Ethereum.Address,
				callType: trace.action.callType,
				input: trace.action.input as Ethereum.TransactionInput,
				value: BigInt(trace.action.value) as Ethereum.NativeCurrencyAmount,
				gasUnits: BigInt(trace.action.gas),
			},
			result: {
				gasUsed: BigInt(trace.result.gasUsed) as Ethereum.GasAmount,
				output: trace.result.output,
			},
			subtraces: children?.map(buildTraceTree),
		}
	}

	return buildTraceTree(rootTrace)
}

export const normalizeEventLog = (
	log: Awaited<ReturnType<typeof Evm.getRawTransaction>>['eventLogs'][number],
): Ethereum.TransactionLogEvent => ({
	topics: log.raw.topics as Ethereum.TopicHash[],
	data: log.raw.data,
	contract: {
		address: log.address as Ethereum.ContractAddress
	},
	decoded: {
		name: log.decodedName,
		signature: log.decodedSignature,
		params: log.params.map(param => ({
			name: param.name,
			type: param.type as any,
			value: param.value,
		}))
	},
	indexInTransaction: log.logIndex,
})

export const normalizeTokenBalance = (
	tokenBalance: Awaited<ReturnType<typeof Evm.getTokenBalances>>[number],
	chainId: Ethereum.ChainId,
): TokenWithBalance => ({
	token: {
		chainId,
		address: tokenBalance.token.address,
		name: tokenBalance.token.name,
		symbol: tokenBalance.token.symbol,
		decimals: tokenBalance.token.decimals,
	},

	balance: BigInt(Number(tokenBalance.balance) * 10 ** tokenBalance.token.decimals),
})
