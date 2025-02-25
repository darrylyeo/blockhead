import type { Ethereum } from '$/data/networks/types'
import type { SimulationOutput } from '@tenderly/sdk'

export const normalizeSimulationOutput = (
	output: SimulationOutput,
	network: Ethereum.Network,
): Ethereum.Transaction => {
	const blockNumber = output.blockNumber !== undefined ? BigInt(output.blockNumber) : undefined

	const trace = output.trace! && (
		normalizeTransactionTraces(
			output.trace,
			output.gasUsed ? BigInt(output.gasUsed) : undefined
		)
	)

	return {
		network,

		executionStatus: output.status === true ? 'successful' : 'failed',
		revertReason: trace?.result?.error,

		blockNumber,

		transactionIndex: 0,
		nonce: 0,
		type: ({
			0: 'legacy',
			1: 'eip2930',
			2: 'eip1559',
		} as const)[trace?.type as `${0 | 1 | 2}`],

		fromAddress: trace?.action.fromAddress,
		toAddress: trace?.action.toAddress,

		input: trace?.action.input,
		inputDecoded: undefined,
		value: trace?.action.value,

		gasToken: network.nativeCurrency,
		gasUnitsSpent: output.gasUsed ? BigInt(output.gasUsed) : undefined,

		trace,

		logEvents: (
			output.logs
				?.map((log, i) => (
					normalizeLogEvent(
						log,
						i,
						network,
					)
				))
		),
	}
}

const normalizeTransactionTraces = (
	traces: NonNullable<SimulationOutput['trace']>,
	blockNumber?: Ethereum.BlockNumber,
): Ethereum.Trace => {
	const rootTrace = traces[0]
	const childTraces = Map.groupBy(
		traces.slice(1),
		trace => (
			trace.trace_address?.slice(0, -1).join(',') ?? ''
		)
	)

	const buildTraceTree = (trace: typeof rootTrace): Ethereum.Trace => {
		const key = trace.trace_address?.join(',') ?? ''
		const children = childTraces.get(key) ?? []

		return {
			blockNumber,

			type: trace.type?.toLowerCase() ?? 'call',

			action: {
				fromAddress: trace.from as Ethereum.Address,
				toAddress: trace.to as Ethereum.Address,
				callType: trace.type?.toLowerCase() ?? 'call',
				input: trace.input as Ethereum.TransactionInput,
				value: BigInt(trace.value ?? 0),
				gasUnits: BigInt(trace.gas ?? 0),
			},
			result: {
				gasUsed: BigInt(trace.gas_used ?? 0),
				output: trace.output as Ethereum.TransactionInput,
			},
			subtraces: children.map(buildTraceTree),
		}
	}

	return buildTraceTree(rootTrace)
}

const normalizeLogEvent = (
	log: NonNullable<SimulationOutput['logs']>[number],
	indexInTransaction: number,
	network: Ethereum.Network,
): Ethereum.TransactionLogEvent => ({
	topics: log.raw?.topics as Ethereum.TopicHash[],
	data: log.raw?.data,

	contract: {
		network,
		address: log.raw?.address as Ethereum.Address,
	},

	removed: false,

	decoded: {
		name: log.name,
		signature: '', // TODO: Generate signature from inputs
		params: log.inputs ?? []
	},

	indexInTransaction,
})
