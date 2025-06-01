import type { Hash } from '$/entities/scalars'
import type { ChainId } from '$/entities/network'
import type { Transfer } from '$/entities/transfer'
import { TransferStandard, TransferCategory } from '$/entities/transfer'
import { getSupportedChains } from '$/data/utils'

export const fetch = async (chainId: ChainId, transactionHash: Hash) => {
	if (!getSupportedChains('1inch').includes(chainId)) {
		throw new Error(`Chain ${chainId} not supported by 1inch traces API`)
	}
	
	const { fetcher } = await import('$/api/1inch/index')
	
	try {
		const response = await fetcher.path('/v1.0/{chainId}/traces/{txHash}').method('get').create()({
			chainId: chainId.toString(),
			txHash: transactionHash,
		})
		
		return {
			...response,
			chainId,
			transactionHash,
			fetchedAt: Math.floor(Date.now() / 1000),
		}
	} catch (error) {
		if (error instanceof Error) {
			if (error.message.includes('404')) {
				throw new Error(`Transaction ${transactionHash} not found on chain ${chainId}`)
			}
			if (error.message.includes('429')) {
				throw new Error('1inch API rate limit exceeded. Please try again later')
			}
		}
		throw new Error(`1inch API error: ${error instanceof Error ? error.message : 'Unknown error'}`)
	}
}

export const normalize = ({ chainId, transactionHash, fetchedAt, ...traceData }: any, _chainId: ChainId, _transactionHash: Hash): Transfer[] => {
	if (!traceData.traces || !Array.isArray(traceData.traces)) {
		return []
	}
	
	return traceData.traces
		.filter((trace: any) => trace.type === 'call' && trace.callType === 'transfer')
		.map((trace: any, index: number) => ({
			id: `${transactionHash}-${index}`,
			chainId,
			standard: TransferStandard.Native,
			category: TransferCategory.Transfer,
			from: { address: trace.from },
			to: { address: trace.to },
			...(trace.blockNumber && { blockNumber: BigInt(trace.blockNumber) }),
			indexInTransaction: index,
			timestamp: Math.floor(Date.now() / 1000),
			transactionHash,
			nativeData: {
				amount: trace.value || '0',
				gasUsed: trace.gasUsed,
			},
			metadata: {
				source: '1inch',
				lastUpdated: fetchedAt,
				...(trace.error && { error: trace.error }),
			},
		}))
		.filter(Boolean) as any
}
