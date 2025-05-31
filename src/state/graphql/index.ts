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
import { createClient } from '@urql/svelte'
import schema from './schema.json'
import { cacheExchange } from '@urql/exchange-graphcache'

export const client = createClient({
	url: 'local:',
	exchanges: [
		cacheExchange({
			schema,
			keys: {
				Actor: (data: any) => `${data.chainId}:${data.address}`,
				App: (data: any) => data.slug,
				Balance: (data: any) => `${data.chainId}:${data.id}`,
				Block: (data: any) => `${data.chainId}:${data.blockNumber || data.blockHash}`,
				Contract: (data: any) => `${data.chainId}:${data.address}`,
				Event: (data: any) => `${data.chainId}:${data.id}`,
				Network: (data: any) => `${data.chainId}`,
				Nft: (data: any) => `${data.chainId}:${data.contractAddress}:${data.tokenId}`,
				Storage: (data: any) => `${data.chainId}:${data.id}`,
				Token: (data: any) => `${data.chainId}:${data.address}`,
				Trace: (data: any) => `${data.chainId}:${data.id}`,
				Transaction: (data: any) => `${data.chainId}:${data.id}`,
				Transfer: (data: any) => `${data.chainId}:${data.id}`,
				Validator: (data: any) => `${data.chainId}:${data.index}`,
				// Interface implementations
				EoaActor: (data: any) => `${data.chainId}:${data.address}`,
				ContractActor: (data: any) => `${data.chainId}:${data.address}`,
				NativeToken: (data: any) => `${data.chainId}:${data.address}`,
				Erc20Token: (data: any) => `${data.chainId}:${data.address}`,
				NativeBalance: (data: any) => `${data.chainId}:${data.id}`,
				Erc20Balance: (data: any) => `${data.chainId}:${data.id}`,
				TransferEvent: (data: any) => `${data.chainId}:${data.id}`,
				SwapEvent: (data: any) => `${data.chainId}:${data.id}`,
				ApprovalEvent: (data: any) => `${data.chainId}:${data.id}`,
			},
		}),
	],
})
