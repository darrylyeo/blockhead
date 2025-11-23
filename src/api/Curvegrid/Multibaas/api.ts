import { CURVEGRID_MULTIBAAS_DEPLOYMENT_HOSTNAME, CURVEGRID_MULTIBAAS_API_KEY } from '$env/static/private'

type ApiOptions = {
	baseUrl?: string
	apiKey?: string
}

const get = async <T>(
	path: string,
	searchParams: Record<string, string | number | boolean> | undefined,
	{
		baseUrl = `https://${CURVEGRID_MULTIBAAS_DEPLOYMENT_HOSTNAME}.multibaas.com/api/v0`,
		apiKey = CURVEGRID_MULTIBAAS_API_KEY
	}: ApiOptions = {}
) => {
	const response = await fetch(`${baseUrl}${path}${searchParams ? `?${new URLSearchParams(Object.entries(searchParams).map(([k, v]) => [k, String(v)])).toString()}` : ''}`, {
		headers: {
			'Authorization': `Bearer ${apiKey}`,
			'Content-Type': 'application/json'
		}
	})

	if (!response.ok) throw response

	const data = await response.json() as { result: T }
	return data.result
}

export const getBlock = async (
	{
		chain,
		block
	}: {
		chain: string
		block: string | number
	},
	options: ApiOptions = {}
) => (
	get<unknown>(
		`/chains/${chain}/blocks/${block}`,
		undefined,
		options
	)
)

export const getTransaction = async (
	{
		chain,
		hash
	}: {
		chain: string
		hash: string
	},
	options: ApiOptions = {}
) => (
	get<unknown>(
		`/chains/${chain}/transactions/${hash}`,
		undefined,
		options
	)
)

export const getTransactionReceipt = async (
	{
		chain,
		hash
	}: {
		chain: string
		hash: string
	},
	options: ApiOptions = {}
) => (
	get<unknown>(
		`/chains/${chain}/transactions/receipt/${hash}`,
		undefined,
		options
	)
)

export const getTransactions = async (
	{
		chain,
		wallet_address
	}: {
		chain: string
		wallet_address: string
	},
	options: ApiOptions = {}
) => (
	get<unknown[]>(
		`/chains/${chain}/txm/${wallet_address}`,
		undefined,
		options
	)
)

export const getAddressDetails = async (
	{
		chain,
		addressOrAlias
	}: {
		chain: string
		addressOrAlias: string
	},
	options: ApiOptions = {}
) => (
	get<unknown>(
		`/chains/${chain}/addresses/${addressOrAlias}`,
		undefined,
		options
	)
)
