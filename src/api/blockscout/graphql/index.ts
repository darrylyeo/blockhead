// Types/constants
import type { ChainId } from '$/entities/network'

export const networks = {
	1: 'https://eth.blockscout.com/api/v1/graphql',
	137: 'https://polygon.blockscout.com/api/v1/graphql',
	8453: 'https://base.blockscout.com/api/v1/graphql',
} as const satisfies Record<ChainId, string>


// gql.tada
import { initGraphQLTada } from 'gql.tada'
import type { introspection } from './api.d.ts'
export const graphql = initGraphQLTada<{
	introspection: introspection,
}>()


// urql
import { Client, fetchExchange } from '@urql/svelte'
import { cacheExchange } from '@urql/exchange-graphcache'

export const createClient = (chainId: ChainId = 1) => (
	new Client({
		url: networks[chainId as keyof typeof networks],
		exchanges: [
			cacheExchange({
				keys: {
					Address: (data: any) => data.hash as string,
					Block: (data: any) => data.hash as string,
					InternalTransaction: (data: any) => data.id as string,
					SmartContract: (data: any) => data.addressHash as string,
					Token: (data: any) => data.contractAddressHash as string,
					TokenTransfer: (data: any) => data.id as string,
					Transaction: (data: any) => data.hash as string,
				},
				resolvers: {},
				updates: {},
			}),
			fetchExchange,
		],
		fetchOptions: {
			headers: {
				'Content-Type': 'application/json',
			},
		},
	})
)
