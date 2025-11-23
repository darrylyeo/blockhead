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

export const getNfts = async (
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
	const getNftsByAddress = fetcher.path('/v1/byaddress').method('get').create()
	const { data } = await getNftsByAddress({
		chainIds: [chainId as 1 | 45 | 137 | 10 | 56 | 42161 | 43114 | 100 | 250 | 1313161554 | 8217 | 324 | 8453],
		address
	})
	
	if (!data?.assets) {
		return { result: [] }
	}

	const assetsArray = Array.isArray(data.assets) 
		? data.assets 
		: data.assets 
			? [data.assets] 
			: []

	return {
		result: assetsArray.map((asset) => ({
			contract_address: asset.asset_contract.address,
			token_id: String(asset.id),
			name: asset.name,
			description: asset.description,
			image_url: asset.image_url,
			collection: asset.collection ? {
				name: asset.collection.name,
				slug: typeof asset.collection.slug === 'string' ? asset.collection.slug : undefined
			} : undefined
		}))
	}
}

