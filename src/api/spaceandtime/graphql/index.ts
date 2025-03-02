// Types/constants
import type { Ethereum } from '$/data/networks/types'

const endpointUrl = 'https://api.spaceandtime.dev/v1/graphql'


// Auth
import { getAccessToken } from '../gateway/auth'


// gql.tada
import { graphql as graphqlEthereum } from './ethereum'

import { graphql as graphqlPolygon } from './polygon'


// urql
import { Client, cacheExchange, fetchExchange } from '@urql/svelte'
import { supportedNetworks } from '..'
import { handleUrqlResult } from '$/utils/urql'

const clients = new Map<Ethereum.ChainId, Client>()

const getClient = async (
	chainId: Ethereum.ChainId,
) => {
	if (clients.has(chainId))
		return clients.get(chainId)!

	const schemaId = supportedNetworks[chainId]?.schemaId
	if (!schemaId)
		throw new Error(`Space and Time schema not found for chainId ${chainId}.`)


	const accessToken = await getAccessToken()

	const client = new Client({
		url: endpointUrl,
		exchanges: [
			// cacheExchange, // omit `__typename` fields in GraphQL queries to avoid triggering SQL errors
			fetchExchange,
		],
		fetchOptions: () => ({
			headers: {
				'Authorization': `Bearer ${accessToken}`,
				'Schema': schemaId,
			},
		}),
	})

	clients.set(chainId, client)

	return client
}
