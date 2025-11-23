// Types
import type { paths } from './Multibaas/openapi.d.ts'


// Context
import { CURVEGRID_MULTIBAAS_DEPLOYMENT_HOSTNAME, CURVEGRID_MULTIBAAS_API_KEY } from '$env/static/private'


// Methods
import { Fetcher, type FetchReturnType } from 'openapi-typescript-fetch'

type ApiOptions = {
	baseUrl?: string
	apiKey?: string
}

const getFetcher = ({
	baseUrl = `https://${CURVEGRID_MULTIBAAS_DEPLOYMENT_HOSTNAME}.multibaas.com/api/v0`,
	apiKey = CURVEGRID_MULTIBAAS_API_KEY
}: ApiOptions) => {
	const fetcher = Fetcher.for<paths>()

	fetcher.configure({
		baseUrl,
		init: {
			headers: new Headers({
				'Authorization': `Bearer ${apiKey}`,
			}),
		},
		use: [
			async (url, init, next) => {
				const response = await next(url, init)

				if(!response.ok)
					throw response
			
				return response.data.result as FetchReturnType<typeof next>['result']
			},
		],
	})

	return fetcher
}

export const getContractEvents = async (
	{
		chain,
		contractLabel,
		eventName
	}: {
		chain: string
		contractLabel: string
		eventName: string
	},
	options: ApiOptions
) => {
	const fetcher = getFetcher(options)
	const listEvents = fetcher.path('/events').method('get').create()
	
	const { data } = await listEvents({
		chain: chain as 'ethereum',
		contract_label: contractLabel,
		event_signature: eventName
	})

	return { result: (data?.result ?? []) as unknown[] }
}
