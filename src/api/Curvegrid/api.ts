import { CURVEGRID_MULTIBAAS_DEPLOYMENT_HOSTNAME, CURVEGRID_MULTIBAAS_API_KEY } from '$env/static/private'

type ApiOptions = {
	baseUrl: string
	apiKey?: string
}

const get = async <T>(
	path: string,
	searchParams: Record<string, string | number | boolean> | undefined,
	{
		baseUrl = `https://${CURVEGRID_MULTIBAAS_DEPLOYMENT_HOSTNAME}./api/v0`,
		apiKey = CURVEGRID_MULTIBAAS_API_KEY
	}: ApiOptions
) => {
	const response = await fetch(`${baseUrl}/${path}${searchParams ? `?${new URLSearchParams(Object.entries(searchParams).map(([k, v]) => [k, String(v)])).toString()}` : ''}`, {
		headers: {
			'Authorization': `Bearer ${apiKey}`,
			'Content-Type': 'application/json'
		}
	})

	if (!response.ok) throw response

	return await response.json() as T
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
) => (
	await get<
		{ result: unknown[] }
	>(
		`api/v0/chains/${chain}/events/${contractLabel}/${eventName}`,
		undefined,
		options
	)
)
