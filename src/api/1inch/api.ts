import { ONEINCH_API_KEY } from '$env/static/private'

type ApiOptions = {
	baseUrl?: string
	apiKey?: string
}

const get = async <T>(
	path: string,
	searchParams: Record<string, string | number | boolean> | undefined,
	{
		baseUrl = 'https://api.1inch.dev',
		apiKey = ONEINCH_API_KEY
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

export const getPortfolioValue = async (
	{
		chainId,
		address
	}: {
		chainId: number
		address: string
	},
	options: ApiOptions = {}
) => (
	get<
		{
			result: Array<{
				contract_address: string
				symbol: string
				name: string
				decimals: number
				amount: string
				logo_url?: string
			}>
		}
	>(
		'portfolio/portfolio/v4/general/current_value',
		{
			chain_id: chainId,
			addresses: address,
			use_profit_and_loss: true
		},
		options
	)
)

export const getProfitAndLoss = async (
	{
		chainId,
		address
	}: {
		chainId: number
		address: string
	},
	options: ApiOptions = {}
) => (
	get(
		'portfolio/portfolio/v4/general/profit_and_loss',
		{
			chain_id: chainId,
			addresses: address
		},
		options
	)
)

export const getNfts = async (
	{
		chainId,
		address
	}: {
		chainId: number
		address: string
	},
	options: ApiOptions = {}
) => (
	get<
		{
			result: Array<{
				contract_address: string
				token_id: string
				name?: string
				description?: string
				image_url?: string
				collection?: {
					name: string
					slug?: string
				}
			}>
		}
	>(
		`nft/v5/${chainId}/nft/balances`,
		{
			wallet_address: address
		},
		options
	)
)

export const getDefiPositions = async (
	{
		chainId,
		address
	}: {
		chainId: number
		address: string
	},
	options: ApiOptions = {}
) => (
	get<
		{
			result: Array<{
				protocol: {
					key: string
					name: string
					logo_url?: string
				}
				pool?: {
					address: string
					name?: string
				}
				net_worth: number
				assets: Array<{
					contract_address: string
					amount: string
				}>
			}>
		}
	>(
		'portfolio/portfolio/v4/general/defi_positions',
		{
			chain_id: chainId,
			addresses: address
		},
		options
	)
)

export const getHistoricalBalances = async (
	{
		chainId,
		address,
		fromTimestamp,
		toTimestamp
	}: {
		chainId: number
		address: string
		fromTimestamp?: number
		toTimestamp?: number
	},
	options: ApiOptions = {}
) => (
	get<
		{
			result: Array<{
				timestamp: number
				balances: Array<{
					contract_address: string
					amount: string
				}>
			}>
		}
	>(
		'portfolio/portfolio/v4/general/historical_balances',
		{
			chain_id: chainId,
			addresses: address,
			...(fromTimestamp ? { from_timestamp: fromTimestamp } : {}),
			...(toTimestamp ? { to_timestamp: toTimestamp } : {})
		},
		options
	)
)
