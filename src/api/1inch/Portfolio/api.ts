// Types
import type { paths } from './openapi.d.ts'


// Context
import { ONEINCH_API_KEY } from '$env/static/private'


// Methods
import { Fetcher } from 'openapi-typescript-fetch'

type ApiOptions = {
	baseUrl?: string
	apiKey?: string
}

const getFetcher = ({
	baseUrl = 'https://api.1inch.dev',
	apiKey = ONEINCH_API_KEY
}: ApiOptions = {}) => {
	const fetcher = Fetcher.for<paths>()

	fetcher.configure({
		baseUrl,
		init: {
			headers: new Headers({
				'Authorization': `Bearer ${apiKey}`
			}),
		},
	})

	return fetcher
}

// TODO: Endpoint returns 404 Not Found - API may not be publicly available
// export const getPortfolioValue = async (
// 	{
// 		chainId,
// 		address
// 	}: {
// 		chainId: number
// 		address: string
// 	},
// 	options: ApiOptions = {}
// ) => {
// 	const fetcher = getFetcher(options)
// 	const getCurrentValue = fetcher.path('/portfolio/v4/general/current_value').method('get').create()
// 	const { data } = await getCurrentValue({
// 		addresses: [address],
// 		chain_id: chainId
// 	})
// 	return data as {
// 		result: Array<{
// 			contract_address: string
// 			symbol: string
// 			name: string
// 			decimals: number
// 			amount: string
// 			logo_url?: string
// 		}>
// 	}
// }

export const getProfitAndLoss = async (
	{
		chainId,
		address
	}: {
		chainId: number
		address: string
	},
	options: ApiOptions = {}
) => {
	const fetcher = getFetcher(options)
	const getProfitAndLoss = fetcher.path('/portfolio/v4/general/profit_and_loss').method('get').create()
	const { data } = await getProfitAndLoss({
		addresses: [address],
		chain_id: chainId
	})
	return data
}

// TODO: Endpoint returns 404 Not Found - API may not be publicly available
// export const getDefiPositions = async (
// 	{
// 		chainId,
// 		address
// 	}: {
// 		chainId: number
// 		address: string
// 	},
// 	options: ApiOptions = {}
// ) => {
// 	const fetcher = getFetcher(options)
// 	const getProtocolsDetails = fetcher.path('/portfolio/v4/overview/protocols/details').method('get').create()
// 	const { data } = await getProtocolsDetails({
// 		addresses: [address],
// 		chain_id: chainId
// 	})
// 	return data as {
// 		result: Array<{
// 			protocol: {
// 				key: string
// 				name: string
// 				logo_url?: string
// 			}
// 			pool?: {
// 				address: string
// 				name?: string
// 			}
// 			net_worth: number
// 			assets: Array<{
// 				contract_address: string
// 				amount: string
// 			}>
// 		}>
// 	}
// }

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
) => {
	const fetcher = getFetcher(options)
	const getValueChart = fetcher.path('/portfolio/v4/general/value_chart').method('get').create()
	const { data } = await getValueChart({
		addresses: [address],
		chain_id: chainId,
		...(fromTimestamp ? { from_timestamp: fromTimestamp } : {}),
		...(toTimestamp ? { to_timestamp: toTimestamp } : {})
	})
	return data as {
		result: Array<{
			timestamp: number
			balances: Array<{
				contract_address: string
				amount: string
			}>
		}>
	}
}
