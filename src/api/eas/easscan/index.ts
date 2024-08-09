/**
 * Easscan GraphQL API
 * @link https://docs.attest.org/docs/developer-tools/api
 */


// Types/constants
export const graphqlEndpoints = [
	{
		label: 'Ethereum',
		chainId: 1,
		endpoint: 'https://easscan.org/graphql',
	},
	{
		label: 'Ethereum (Sepolia)',
		chainId: 11155111,
		endpoint: 'https://sepolia.easscan.org/graphql',
	},
	{
		label: 'Arbitrum',
		chainId: 42161,
		endpoint: 'https://arbitrum.easscan.org/graphql',
	},
	{
		label: 'Base',
		chainId: 8453,
		endpoint: 'https://base.easscan.org/graphql',
	},
	{
		label: 'Base (Goerli)',
		chainId: 59144,
		endpoint: 'https://base-goerli.easscan.org/graphql',
	},
	{
		label: 'Linea',
		chainId: 534352,
		endpoint: 'https://linea.easscan.org/graphql',
	},
	{
		label: 'Optimism',
		chainId: 10,
		endpoint: 'https://optimism.easscan.org/graphql',
	},
	{
		label: 'Optimism (Goerli)',
		chainId: 1101,
		endpoint: 'https://optimism-goerli-bedrock.easscan.org/graphql',
	},
] as const satisfies {
	label: string,
	chainId: number,
	endpoint: string,
}[]


// gql.tada
import { initGraphQLTada } from 'gql.tada'

import type { introspection } from './graphql-env.ts'

const graphql = initGraphQLTada<{
	introspection: introspection,
}>()


// urql
import { Client, cacheExchange, fetchExchange } from '@urql/svelte'
import type { Ethereum } from '$/data/networks/types.js'
import { handleUrqlResult } from '$/utils/urql.js'

const clients = new Map<Ethereum.ChainId, Client>()

export const getClient = ({
	chainId,
}: {
	chainId: Ethereum.ChainId
}) => {
	if(clients.has(chainId))
		return clients.get(chainId)!

	const endpointUrl = graphqlEndpoints.find(e => e.chainId === chainId)?.endpoint

	if(!endpointUrl)
		throw new Error(`Ethereum Attestation Service does not yet support chain ID ${chainId}.`)

	const client = new Client({
		url: endpointUrl,
		exchanges: [
			cacheExchange,
			fetchExchange,
		],
	})

	clients.set(chainId, client)

	return client
}
