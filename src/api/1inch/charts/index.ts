// Types
// import type { paths } from './api.d.ts'
type paths = any


// Context
import * as publicEnv from '$env/static/public'


// Methods
import { Fetcher, type FetchReturnType } from 'openapi-typescript-fetch'

const fetcher = Fetcher.for<paths>()

fetcher.configure({
	baseUrl: '/api-proxy/https://api.1inch.dev/charts',
	init: {
		headers: new Headers({
			'Authorization': `Bearer ${publicEnv.PUBLIC_ONEINCH_API_KEY}`,
		}),
	},
	use: [
		async (url, init, next) => {
			const response = await next(url, init)

			if(!response.ok)
				throw new Error(`Error ${response.status}: ${response.statusText}`)

			return response.data as FetchReturnType<typeof next>['data']
		},
	],
})

export const getTokenPriceHistory = fetcher.path('/v1.0/chart/line/{token0}/{token1}/{period}/{chainId}').method('get').create() 
