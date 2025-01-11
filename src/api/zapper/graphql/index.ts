/**
 * Zapper GraphQL API
 * {@link https://protocol.zapper.xyz/docs/api}
 */


// Types/constants
import * as publicEnv from '$env/static/public'

const endpointUrl = `https://public.zapper.xyz/graphql`

export const networkNamesByChainId = {
	1: 'ETHEREUM_MAINNET',
	137: 'POLYGON_MAINNET', 
	10: 'OPTIMISM_MAINNET',
	8453: 'BASE_MAINNET',
	42161: 'ARBITRUM_MAINNET',
	324: 'ZKSYNC_MAINNET',
	81457: 'BLAST_MAINNET',
	69420: 'DEGEN_MAINNET',
	34443: 'MODE_MAINNET',
	5000: 'MANTLE_MAINNET',
	534352: 'SCROLL_MAINNET',
	1284: 'MOONBEAM_MAINNET',
	59144: 'LINEA_MAINNET',
	7777777: 'ZORA_MAINNET',
	1088: 'METIS_MAINNET',
	4893: 'WORLDCHAIN_MAINNET',
	1234: 'SHAPE_MAINNET',
	204: 'OPBNB_MAINNET',
	16350: 'APECHAIN_MAINNET',
	2221: 'MORPH_MAINNET',
	111188: 'BOB_MAINNET',
} as const satisfies Record<Ethereum.ChainId, string>

export const getNetworkName = (chainId: Ethereum.ChainId) => {
	if (!(chainId in networkNamesByChainId))
		throw new Error(`Zapper doesn't yet support chain ID ${chainId}.`)

	return networkNamesByChainId[chainId as keyof typeof networkNamesByChainId]
}


// gql.tada
import { initGraphQLTada } from 'gql.tada'

import type { introspection } from './graphql-env.ts'

const graphql = initGraphQLTada<{
	introspection: introspection,
}>()


// urql
import { Client, cacheExchange, fetchExchange } from '@urql/svelte'

const client = new Client({
	url: endpointUrl,
	exchanges: [
		cacheExchange,
		fetchExchange,
	],
	fetchOptions: () => ({
		headers: {
			'Authorization': `Basic ${globalThis.btoa(publicEnv.PUBLIC_ZAPPER_API_KEY)}`,
		},
	}),
})
