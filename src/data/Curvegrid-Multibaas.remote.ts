import { query } from '$app/server'

export const getContractEvents = query(
	'unchecked',
	async ({
		baseUrl,
		chain,
		contractLabel,
		eventName
	}: {
		baseUrl: string,
		chain: string,
		contractLabel: string,
		eventName: string
	}) => {
		const { getContractEvents } = await import('../api/Curvegrid/api.js')

		const result = await getContractEvents(
			{
				chain,
				contractLabel,
				eventName
			},
			{ baseUrl }
		)

		// TODO: Map to EvmEvent[]
		return result.result as unknown[]
	}
)
