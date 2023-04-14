import type { Ethereum } from '../data/networks/types'

import { Client, cacheExchange, fetchExchange } from '@urql/svelte'


let client: Client

export const getClient = () => client ||= (
	new Client({
		url: 'https://api.airstack.xyz/gql',
		exchanges: [
			cacheExchange,
			fetchExchange,
		],
	})
)


export const airstackNetworkNames = {
	1: 'ethereum',
	137: 'polygon',
} as Record<Ethereum.ChainID, string>
