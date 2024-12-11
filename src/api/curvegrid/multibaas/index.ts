// Types
import type { paths } from './api.d.ts'


// Context
import * as publicEnv from '$env/static/public'


// Methods
import { Fetcher, type FetchReturnType } from 'openapi-typescript-fetch'

const fetcher = Fetcher.for<paths>()

fetcher.configure({
	baseUrl: `https://${publicEnv.PUBLIC_CURVEGRID_MULTIBAAS_DEPLOYMENT_HOSTNAME}.multibaas.com/api/v0`,
	init: {
		headers: new Headers({
			'Authorization': `Bearer ${publicEnv.PUBLIC_CURVEGRID_MULTIBAAS_API_KEY}`,
		}),
	},
	use: [
		async (url, init, next) => {
			const response = await next(url, init)

			if(!response.ok)
				throw new Error(`Error ${response.status}: ${response.statusText}`)
		
			return response.data.result as FetchReturnType<typeof next>['result']
		},
	],
})

export const getBlock = fetcher.path('/chains/{chain}/blocks/{block}').method('get').create()
export const getTransaction = fetcher.path('/chains/{chain}/transactions/{hash}').method('get').create()
export const getTransactionReceipt = fetcher.path('/chains/{chain}/transactions/receipt/{hash}').method('get').create()
export const getTransactions = fetcher.path('/chains/{chain}/txm/{wallet_address}').method('get').create()
