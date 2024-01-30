import { Client, cacheExchange, fetchExchange } from '@urql/svelte'

import { env } from '$/env'


let client: Client

export const getClient = () => client ||= (
	new Client({
		url: 'https://api.airstack.xyz/gql',
		exchanges: [
			// cacheExchange,
			fetchExchange,
		],
		fetchOptions: () => ({
			headers: {
				authorization: env.AIRSTACK_API_KEY,
			},
		})
	})
)


import type { Ethereum } from '$/data/networks/types'

export const airstackNetworkNames = {
	1: 'ethereum',
	137: 'polygon',
	8453: 'base',
	7777777: 'zora',
} as Record<Ethereum.ChainID, string>
