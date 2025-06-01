import type { Hash } from '$/entities/scalars'
import type { ChainId } from '$/entities/network'
import type { Trace } from '$/entities/trace'
import { TraceType, CallType } from '$/entities/trace'

export const fetch = async (chainId: ChainId, transactionHash: Hash) => {
	const { getViemClient } = await import('$/api/viem/index')
	
	try {
		const client = getViemClient(chainId)
		
		// Use direct RPC call for debug_traceTransaction since it's not in viem's standard types
		let traces: any = null
		try {
			traces = await (client.transport as any).request({
				method: 'debug_traceTransaction',
				params: [
					transactionHash,
					{
						tracer: 'callTracer',
						tracerConfig: {
							withLog: true,
							timeout: '60s',
						},
					},
				],
			})
		} catch (debugError) {
			// Fallback: just get basic transaction data if debug API is not available
			console.warn(`Debug tracing not available: ${debugError}`)
		}
		
		// Get transaction receipt for additional context
		const [receipt, transaction] = await Promise.allSettled([
			client.getTransactionReceipt({ hash: transactionHash as `0x${string}` }),
			client.getTransaction({ hash: transactionHash as `0x${string}` }),
		])
		
		return {
			traces,
			receipt: receipt.status === 'fulfilled' ? receipt.value : null,
			transaction: transaction.status === 'fulfilled' ? transaction.value : null,
			chainId,
			fetchedAt: Math.floor(Date.now() / 1000),
		}
	} catch (error) {
		if (error instanceof Error) {
			if (error.message.includes('not found')) {
				throw new Error(`Transaction ${transactionHash} not found on chain ${chainId}`)
			}
		}
		throw new Error(`Viem trace error: ${error instanceof Error ? error.message : 'Unknown error'}`)
	}
}

// Recursively process trace tree
const processTrace = (
	trace: any,
	traceAddress: number[],
	chainId: ChainId,
	transactionHash: Hash,
	blockNumber: number,
	timestamp: number
): any[] => {
	const traces: any[] = []
	
	// Determine trace type
	let traceType: TraceType = TraceType.Call
	if (trace.type === 'CREATE' || trace.type === 'CREATE2') {
		traceType = trace.type === 'CREATE2' ? TraceType.Create2 : TraceType.Create
	} else if (trace.type === 'SELFDESTRUCT' || trace.type === 'SUICIDE') {
		traceType = TraceType.SelfDestruct
	}
	
	// Calculate gas metrics
	const gasUsed = BigInt(trace.gasUsed || '0')
	const gasLimit = BigInt(trace.gas || '0')
	
	const baseTrace = {
		id: `${transactionHash}-${traceAddress.join('-')}`,
		chainId,
		type: traceType,
		blockNumber,
		transactionIndex: 0, // Would need transaction data
		traceAddress,
		subtraces: trace.calls ? trace.calls.length : 0,
		timestamp,
		gasLimit: gasLimit.toString(),
		gasUsed: gasUsed.toString(),
		isSuccess: !trace.error,
		error: trace.error,
		revertReason: trace.revertReason,
		depth: traceAddress.length,
		input: trace.input || '0x',
		output: trace.output || '0x',
	}
	
	if (traceType === TraceType.Call) {
		// Map call types
		let callType: CallType = CallType.Call
		if (trace.type === 'DELEGATECALL') callType = CallType.DelegateCall
		else if (trace.type === 'STATICCALL') callType = CallType.StaticCall
		else if (trace.type === 'CALLCODE') callType = CallType.CallCode
		
		// Extract method signature from input
		const methodSignature = trace.input && trace.input.length >= 10 ? 
			trace.input.slice(0, 10) as Hash : undefined
		
		traces.push({
			...baseTrace,
			callData: {
				callType,
				from: trace.from,
				to: trace.to,
				value: trace.value || '0',
				methodSignature,
				methodName: undefined, // Would need ABI decoding
				functionSelector: methodSignature,
				isPrecompile: trace.to && 
					['0x0000000000000000000000000000000000000001', 
					 '0x0000000000000000000000000000000000000002',
					 '0x0000000000000000000000000000000000000003',
					 '0x0000000000000000000000000000000000000004',
					 '0x0000000000000000000000000000000000000005',
					 '0x0000000000000000000000000000000000000006',
					 '0x0000000000000000000000000000000000000007',
					 '0x0000000000000000000000000000000000000008',
					 '0x0000000000000000000000000000000000000009'].includes(trace.to.toLowerCase()),
				isLibraryCall: callType === CallType.DelegateCall || callType === CallType.CallCode,
				isDelegateChain: callType === CallType.DelegateCall,
			},
		})
	} else if (traceType === TraceType.Create || traceType === TraceType.Create2) {
		traces.push({
			...baseTrace,
			createData: {
				creator: trace.from,
				createdContract: trace.to,
				value: trace.value || '0',
				initCode: trace.input || '0x',
				deployedBytecode: trace.output,
				salt: traceType === TraceType.Create2 ? undefined : undefined, // Would need transaction input parsing
				creationGasCost: gasUsed.toString(),
				deploymentCost: gasUsed.toString(),
				contractSize: trace.output ? (trace.output.length - 2) / 2 : undefined,
			},
		})
	} else if (traceType === TraceType.SelfDestruct) {
		traces.push({
			...baseTrace,
			selfDestructData: {
				contract: trace.from,
				refundAddress: trace.to,
				balance: trace.value || '0',
				initiator: trace.from,
				storageCleared: true,
				codeRemoved: true,
			},
		})
	}
	
	// Process child traces recursively
	if (trace.calls && Array.isArray(trace.calls)) {
		trace.calls.forEach((childTrace: any, index: number) => {
			const childTraces = processTrace(
				childTrace,
				[...traceAddress, index],
				chainId,
				transactionHash,
				blockNumber,
				timestamp
			)
			traces.push(...childTraces)
		})
	}
	
	return traces
}

export const normalize = (data: any, chainId: ChainId, transactionHash: Hash) => {
	const { traces, receipt, transaction } = data
	
	// If no trace data available, return empty array
	if (!traces) {
		return []
	}
	
	// Get block number and timestamp from receipt/transaction
	const blockNumber = receipt ? Number(receipt.blockNumber) : 
		transaction ? Number(transaction.blockNumber) : 0
	
	const timestamp = data.fetchedAt || Math.floor(Date.now() / 1000)
	
	// Process the root trace and all child traces
	const processedTraces = processTrace(
		traces,
		[],
		chainId,
		transactionHash,
		blockNumber,
		timestamp
	)
	
	return processedTraces
}
