import { OCTAV_AUTH_TOKEN } from '$env/static/private'

type ApiOptions = {
	baseUrl?: string
	apiKey?: string
}

const get = async <T>(
	path: string,
	searchParams: Record<string, string | number | boolean> | undefined,
	{
		baseUrl = 'https://api.octav.fi/v1',
		apiKey = OCTAV_AUTH_TOKEN
	}: ApiOptions = {}
) => {
	const response = await fetch(`${baseUrl}/${path}${searchParams ? `?${new URLSearchParams(Object.entries(searchParams).map(([k, v]) => [k, String(v)])).toString()}` : ''}`, {
		headers: {
			'Authorization': `Bearer ${apiKey}`
		}
	})

	if (!response.ok) throw response

	return await response.json() as T
}

export const getPortfolio = async (
	{ address }: { address: string },
	options: ApiOptions = {}
) => (
	get<
		{
			result: Array<{
				address: string
				networth: string
				assetByProtocols: Record<string, {
					name: string
					key: string
					value: string
					totalCostBasis?: string
					totalClosedPnl?: string
					totalOpenPnl?: string
					chains?: Record<string, {
						name: string
						key: string
						chainId: string
						value: string
						valuePercentile: string
						totalCostBasis?: string
						totalClosedPnl?: string
						totalOpenPnl?: string
					}>
					assets: Array<{
						contractAddress?: string
						symbol: string
						balance: string
					}>
				}>
			}>
		}
	>(
		'portfolio',
		{
			addresses: address
		},
		options
	)
)
