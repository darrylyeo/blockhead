import type { Hash } from '$/entities/scalars'
import type { ChainId } from '$/entities/network'
import type { Block, BlockCharacteristics } from '$/entities/block'
import { BlockRole, BlockStatus, ConsensusType } from '$/entities/block'

export const fetch = async ({
	chainId,
	identifier
}: {
	chainId: ChainId
	identifier: string | number
}) => {
	const { createClient, graphql } = await import('$/api/blockscout/graphql/index')

	// Determine if identifier is a hash or number
	const isHash = typeof identifier === 'string' && identifier.startsWith('0x')
	
	if (isHash) {
		return (
			await createClient(chainId)
				.query(
					graphql(`
						query GetBlockByHash($hash: FullHash!) {
							block(hash: $hash) {
								hash
								number
								timestamp
								parentHash
								minerHash
								difficulty
								totalDifficulty
								size
								gasLimit
								gasUsed
								baseFeePerGas
								consensus
								nonce
								isEmpty
							}
						}
					`),
					{
						hash: identifier
					}
				)
				.toPromise()
				.then(({ data, error }) => {
					if (error)
						throw error

					if (!data?.block)
						throw new Error('Block not found')

					return data.block
				})
		)
	} else {
		return (
			await createClient(chainId)
				.query(
					graphql(`
						query GetBlockByNumber($number: Int!) {
							block(number: $number) {
								hash
								number
								timestamp
								parentHash
								minerHash
								difficulty
								totalDifficulty
								size
								gasLimit
								gasUsed
								baseFeePerGas
								consensus
								nonce
								isEmpty
							}
						}
					`),
					{
						number: parseInt(identifier.toString())
					}
				)
				.toPromise()
				.then(({ data, error }) => {
					if (error)
						throw error

					if (!data?.block)
						throw new Error('Block not found')

					return data.block
				})
		)
	}
}

export const normalize = (data: any, { chainId }: { chainId: ChainId, identifier: string | number }) => {
	return {
		chainId,
		blockNumber: data.height ?? data.number,
		blockHash: data.hash,
		...(data.timestamp ? { 
			timestamp: Math.floor(new Date(data.timestamp).getTime() / 1000) 
		} : {}),
		...(data.parentHash ? { parentHash: data.parentHash } : {}),
		...(data.size ? { size: data.size } : {}),
		...(data.gasLimit ? { gasLimit: data.gasLimit } : {}),
		...(data.gasUsed ? { 
			gasUsed: data.gasUsed,
			gasUsedPercentage: data.gasLimit ? (Number(data.gasUsed) / Number(data.gasLimit)) * 100 : 0
		} : {}),
		...(data.transactionsCount !== undefined ? { transactionCount: data.transactionsCount } : {}),
		...(data.difficulty ? { difficulty: data.difficulty } : {}),
		...(data.totalDifficulty ? { totalDifficulty: data.totalDifficulty } : {}),
		...(data.nonce ? { nonce: data.nonce } : {}),
		...(data.miner ? { miner: data.miner } : {}),
		...(data.rewards ? { rewards: data.rewards } : {}),
		...(data.baseFeePerGas ? { baseFeePerGas: data.baseFeePerGas } : {}),
		role: 'canonical' as const,
		status: 'confirmed' as const,
		consensusType: 'pos' as const,
	}
}

