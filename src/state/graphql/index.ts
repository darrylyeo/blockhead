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
import { createClient, fetchExchange } from '@urql/svelte'
import schema from './schema.json'
import { cacheExchange, type KeyGenerator } from '@urql/exchange-graphcache'

export const client = createClient({
	url: 'local:',
	exchanges: [
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
				EoaActor: getEntityId[EntityType.Actor] as unknown as KeyGenerator,
				ContractActor: getEntityId[EntityType.Actor] as unknown as KeyGenerator,
				NativeToken: getEntityId[EntityType.Token] as unknown as KeyGenerator,
				Erc20Token: getEntityId[EntityType.Token] as unknown as KeyGenerator,
				NativeBalance: getEntityId[EntityType.Balance] as unknown as KeyGenerator,
				Erc20Balance: getEntityId[EntityType.Balance] as unknown as KeyGenerator,
				TransferEvent: getEntityId[EntityType.Event] as unknown as KeyGenerator,
				SwapEvent: getEntityId[EntityType.Event] as unknown as KeyGenerator,
				ApprovalEvent: getEntityId[EntityType.Event] as unknown as KeyGenerator,
			},
		}),
		fetchExchange,
	],
	fetch,
	requestPolicy: 'cache-first',
})
