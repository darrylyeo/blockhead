// Types
import type { paths } from './api.d.ts'


// Methods
import { Fetcher, type FetchReturnType } from 'openapi-typescript-fetch'

const fetcher = Fetcher.for<paths>()

fetcher.configure({
	baseUrl: 'https://filfox.info/api/v1',
	use: [
		async (url, init, next) => {
			const response = await next(url, init)

			if(!response.ok)
				throw new Error(`Error ${response.status}: ${response.statusText}`)

			return response.data as FetchReturnType<typeof next>['data']
		},
	],
})
