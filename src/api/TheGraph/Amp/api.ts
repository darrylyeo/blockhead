import { THEGRAPH_AMP_AUTH_TOKEN } from '$env/static/private'

type ApiOptions = {
	baseUrl?: string
	apiKey?: string
}

const post = async <T>(
	path: string,
	body: unknown,
	{
		baseUrl = "https://gateway.amp.staging.edgeandnode.com/api",
		apiKey = THEGRAPH_AMP_AUTH_TOKEN
	}: ApiOptions = {}
) => {
	const response = await fetch(`${baseUrl}/${path}`, {
		method: "POST",
		headers: {
			"Authorization": `Bearer ${apiKey}`,
			"Content-Type": "application/json"
		},
		body: JSON.stringify(body)
	})

	if (!response.ok) throw response

	return await response.json() as T
}

export const queryAmp = async (
	{
		query: sqlQuery,
		dataset = "edgeandnode/ethereum_mainnet@0.0.1"
	}: {
		query: string
		dataset?: string
	},
	options: ApiOptions = {}
) => (
	post<
		{
			data: any[]
			metadata: {
				row_count: number
				execution_time_ms: number
			}
		}
	>	(
		'',
		{
			dataset,
			query: sqlQuery
		},
		options
	)
)

