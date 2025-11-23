import { query } from '$app/server'
import { CURVEGRID_MULTIBAAS_DEPLOYMENT_HOSTNAME } from '$env/static/private'

export const getContractEvents = query(
	'unchecked',
	async ({
		baseUrl,
		chain,
		contractLabel,
		eventName
	}: {
		baseUrl?: string,
		chain: string,
		contractLabel: string,
		eventName: string
	}) => {
		const { getContractEvents } = await import('../api/Curvegrid/api.ts')

		const resolvedBaseUrl = baseUrl ?? `https://${CURVEGRID_MULTIBAAS_DEPLOYMENT_HOSTNAME}.multibaas.com`

		const result = await getContractEvents(
			{
				chain,
				contractLabel,
				eventName
			},
			{ baseUrl: resolvedBaseUrl }
		)

		// TODO: Map to EvmEvent[]
		return result.result as unknown[]
	}
)
