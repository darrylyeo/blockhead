import type { Hash } from '$/entities/scalars'
import type { ChainId } from '$/entities/network'
import type { Trace } from '$/entities/trace'
import { TraceType, CallType } from '$/entities/trace'

export const fetch = async ({
	chainId,
	id
}: {
	chainId: ChainId
	id: string
}) => {
	const { createClient, graphql } = await import('$/api/blockscout/graphql/index')

	// Parse the trace ID to extract transaction hash
	const transactionHash = id.split('-')[0]

	return (
		await createClient(chainId)
			.query(
				graphql(`
					query GetTransactionTraces($hash: FullHash!) {
						transaction(hash: $hash) {
							hash
							internalTransactions {
								blockNumber
								transactionIndex
								index
								callType
								fromAddressHash
								toAddressHash
								value
								gasLimit
								gasUsed
								gas
								gasPrice
								input
								output
								error
								success
								createdContractAddressHash
								createdContractCode
								traceAddress
								subtraces
								type
							}
						}
					}
				`),
				{
					hash: transactionHash
				}
			)
			.toPromise()
			.then(({ data, error }) => {
				if (error)
					throw error

				if (!data?.transaction)
					throw new Error('Transaction not found')

				return data.transaction
			})
	)
}

export const normalize = (data: any, { chainId, id }: { chainId: ChainId, id: string }) => {
	const transaction = data.transaction
	const internalTxs = transaction.internalTransactions || []

	const traces: any[] = []

	internalTxs.forEach((itx: any, index: number) => {
		// Determine trace type
		let traceType: TraceType = TraceType.Call
		if (itx.type === 'create' || itx.type === 'create2') {
			traceType = itx.type === 'create2' ? TraceType.Create2 : TraceType.Create
		} else if (itx.type === 'suicide' || itx.type === 'selfdestruct') {
			traceType = TraceType.SelfDestruct
		} else if (itx.type === 'reward') {
			traceType = TraceType.Reward
		}

		// Parse trace address - convert from blockscout format
		const traceAddress = itx.traceAddress ? 
			itx.traceAddress.split(',').map((n: string) => parseInt(n.trim())) : [index]

		// Calculate gas metrics
		const gasLimit = BigInt(itx.gasLimit || itx.gas || '0')
		const gasUsed = BigInt(itx.gasUsed || '0')
		const gasPrice = BigInt(itx.gasPrice || '0')
		const gasCost = gasUsed * gasPrice

		const baseTrace = {
			id: `${id}-${traceAddress.join('-')}`,
			chainId,
			type: traceType,
			blockNumber: itx.blockNumber,
			transactionIndex: itx.transactionIndex || 0,
			traceAddress,
			subtraces: itx.subtraces || 0,
			timestamp: Math.floor(Date.now() / 1000), // Would need block data for accurate timestamp
			gasLimit: gasLimit.toString(),
			gasUsed: gasUsed.toString(),
			gasPrice: gasPrice.toString(),
			gasCost: gasCost.toString(),
			isSuccess: itx.success !== false && !itx.error,
			error: itx.error,
			depth: traceAddress.length,
			input: itx.input || '0x',
			output: itx.output || '0x',
		}

		if (traceType === TraceType.Call) {
			// Map blockscout call types to our enum
			let callType: CallType = CallType.Call
			if (itx.callType === 'delegatecall') callType = CallType.DelegateCall
			else if (itx.callType === 'staticcall') callType = CallType.StaticCall
			else if (itx.callType === 'callcode') callType = CallType.CallCode

			traces.push({
				...baseTrace,
				callData: {
					callType,
					from: itx.fromAddressHash,
					to: itx.toAddressHash,
					value: itx.value || '0',
					methodSignature: itx.input?.slice(0, 10),
					isPrecompile: false, // Can't determine from blockscout data
					isLibraryCall: false, // Can't determine from blockscout data
					isDelegateChain: callType === CallType.DelegateCall,
				},
			})
		} else if (traceType === TraceType.Create || traceType === TraceType.Create2) {
			traces.push({
				...baseTrace,
				createData: {
					creator: itx.fromAddressHash,
					createdContract: itx.createdContractAddressHash,
					value: itx.value || '0',
					initCode: itx.input || '0x',
					deployedBytecode: itx.createdContractCode,
					creationGasCost: gasCost.toString(),
					deploymentCost: gasCost.toString(),
				},
			})
		} else if (traceType === TraceType.SelfDestruct) {
			traces.push({
				...baseTrace,
				selfDestructData: {
					contract: itx.fromAddressHash,
					refundAddress: itx.toAddressHash,
					balance: itx.value || '0',
					initiator: itx.fromAddressHash,
					storageCleared: true, // Assume true for self-destruct
					codeRemoved: true,
				},
			})
		}
	})

	return traces
}
