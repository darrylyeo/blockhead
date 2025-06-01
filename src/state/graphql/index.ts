// Context
import { dev } from '$app/environment'


// Types/constants
import { EntityType, getEntityId } from '$/entities'


// Functions
import { fetch } from './fetch'


// gql.tada
import { initGraphQLTada } from 'gql.tada'
import type { introspection } from './api.d.ts'
export const graphql = initGraphQLTada<{
	introspection: introspection,
	scalars: {
		Address: `0x${string}`
		Hash: `0x${string}`
		BigInt: bigint
		DateTime: string
		TokenAmount: bigint
		UsdAmount: bigint
		Percentage: number
		BasisPoints: number
	}
}>()


// urql
import { createClient, fetchExchange, type Exchange } from '@urql/svelte'
import schema from './schema.json'
import { cacheExchange, type KeyGenerator } from '@urql/exchange-graphcache'
// import { devtoolsExchange } from '@urql/devtools'

export const client = createClient({
	url: 'local:',
	exchanges: (
		[
			// dev && devtoolsExchange,
			cacheExchange({
				schema,
				keys: {
					[EntityType.Actor]: getEntityId[EntityType.Actor] as unknown as KeyGenerator,
					[EntityType.App]: getEntityId[EntityType.App] as unknown as KeyGenerator,
					[EntityType.Balance]: getEntityId[EntityType.Balance] as unknown as KeyGenerator,
					[EntityType.Block]: getEntityId[EntityType.Block] as unknown as KeyGenerator,
					[EntityType.Contract]: getEntityId[EntityType.Contract] as unknown as KeyGenerator,
					[EntityType.Event]: getEntityId[EntityType.Event] as unknown as KeyGenerator,
					[EntityType.Network]: getEntityId[EntityType.Network] as unknown as KeyGenerator,
					[EntityType.Nft]: getEntityId[EntityType.Nft] as unknown as KeyGenerator,
					[EntityType.Storage]: getEntityId[EntityType.Storage] as unknown as KeyGenerator,
					[EntityType.Token]: getEntityId[EntityType.Token] as unknown as KeyGenerator,
					[EntityType.Trace]: getEntityId[EntityType.Trace] as unknown as KeyGenerator,
					[EntityType.Transaction]: getEntityId[EntityType.Transaction] as unknown as KeyGenerator,
					[EntityType.Transfer]: getEntityId[EntityType.Transfer] as unknown as KeyGenerator,
					[EntityType.Validator]: getEntityId[EntityType.Validator] as unknown as KeyGenerator,
					Actor_Eoa: getEntityId[EntityType.Actor] as unknown as KeyGenerator,
					Actor_Contract: getEntityId[EntityType.Actor] as unknown as KeyGenerator,
					Token_Native: getEntityId[EntityType.Token] as unknown as KeyGenerator,
					Token_Erc20: getEntityId[EntityType.Token] as unknown as KeyGenerator,
					Token_Erc721: getEntityId[EntityType.Token] as unknown as KeyGenerator,
					Token_Erc1155: getEntityId[EntityType.Token] as unknown as KeyGenerator,
					Balance_Native: getEntityId[EntityType.Balance] as unknown as KeyGenerator,
					Balance_Erc20: getEntityId[EntityType.Balance] as unknown as KeyGenerator,
					Balance_Erc721: getEntityId[EntityType.Balance] as unknown as KeyGenerator,
					Balance_Erc1155: getEntityId[EntityType.Balance] as unknown as KeyGenerator,
					Event_Transfer: getEntityId[EntityType.Event] as unknown as KeyGenerator,
					Event_Swap: getEntityId[EntityType.Event] as unknown as KeyGenerator,
					Event_Approval: getEntityId[EntityType.Event] as unknown as KeyGenerator,
					Event_Custom: getEntityId[EntityType.Event] as unknown as KeyGenerator,
					Block_Canonical: getEntityId[EntityType.Block] as unknown as KeyGenerator,
					Block_Uncle: getEntityId[EntityType.Block] as unknown as KeyGenerator,
					Block_Orphaned: getEntityId[EntityType.Block] as unknown as KeyGenerator,
					Block_Pending: getEntityId[EntityType.Block] as unknown as KeyGenerator,
				},
			}),
			fetchExchange,
		]
			.filter((x): x is Exchange => x !== undefined)
	),
	fetch,
	requestPolicy: 'cache-first',
})
