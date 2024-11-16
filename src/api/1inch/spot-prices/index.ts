// Types
import type { paths } from './api.d.ts'


// Context
import * as publicEnv from '$env/static/public'


// Methods
import { Fetcher, type FetchReturnType } from 'openapi-typescript-fetch'

const fetcher = Fetcher.for<paths>()

fetcher.configure({
	baseUrl: '/api-proxy/https://api.1inch.dev/price',
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

export const getSpotPrices = fetcher.path('/v1.1/{chain}/{addresses}').method('get').create()
