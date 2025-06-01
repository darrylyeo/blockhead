import type { Hash } from '$/entities/scalars'
import type { ChainId } from '$/entities/network'
import type { Event } from '$/entities/event'
import { EventCategory, EventSeverity } from '$/entities/event'

export const fetch = async ({
	chainId,
	id
}: {
	chainId: ChainId
	id: string
}) => {
	const { createClient, graphql } = await import('$/api/blockscout/graphql/index')

	// Parse the event ID to extract transaction hash and log index
	const [transactionHash, logIndex] = id.split('-')

	return (
		await createClient(chainId)
			.query(
				graphql(`
					query GetTransaction($hash: FullHash!) {
						transaction(hash: $hash) {
							hash
							index
							fromAddressHash
							toAddressHash
							value
							status
							blockNumber
							blockHash
							block {
								timestamp
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

				return {
					transaction: data.transaction,
					logIndex: parseInt(logIndex || '0')
				}
			})
	)
}

export const normalize = (data: any, { chainId, id }: { chainId: ChainId, id: string }) => {
	const { transaction } = data
	
	if (!transaction) {
		throw new Error(`Transaction ${id} not found on chain ${chainId}`)
	}
	
	// Basic event data - blockscout doesn't expose logs directly in GraphQL
	return {
		id: `${chainId}-${id}`,
		chainId,
		category: EventCategory.Custom,
		severity: EventSeverity.Info,
		blockNumber: transaction.blockNumber,
		blockHash: transaction.blockHash,
		transactionHash: transaction.hash,
		transactionIndex: transaction.index || 0,
		logIndex: parseInt(id.split('-')[1] || '0'),
		address: transaction.toAddressHash || '0x0000000000000000000000000000000000000000',
		topics: [],
		data: '0x',
		removed: false,
		timestamp: transaction.block?.timestamp ? 
			Math.floor(new Date(transaction.block.timestamp).getTime() / 1000) : 0,
		customData: {
			eventType: 'transaction',
			metadata: {
				fromAddress: transaction.fromAddressHash,
				toAddress: transaction.toAddressHash,
				value: transaction.value,
				status: transaction.status,
			},
		}
	}
}
