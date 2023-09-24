import type { Ethereum } from '../../data/networks/types'
import type { UniswapV3 } from './index'

import { Client, cacheExchange, fetchExchange, gql } from '@urql/svelte'

export namespace UniswapV3Subgraph {
	export const subgraphUrls = {
		1: {
			hosted: 'https://api.thegraph.com/subgraphs/name/messari/uniswap-v3-ethereum',
			decentralized: 'https://gateway-arbitrum.network.thegraph.com/api/2b7eeacb471d383c093a79133a0a17a4/subgraphs/id/4cKy6QQMc5tpfdx8yxfYeb9TLZmgLQe44ddW1G7NwkA6',
		},
		10: {
			hosted: 'https://api.thegraph.com/subgraphs/name/messari/uniswap-v3-optimism',
		},
		56: {
			hosted: 'https://api.thegraph.com/subgraphs/name/messari/uniswap-v3-bsc',
		},
		137: {
			hosted: 'https://api.thegraph.com/subgraphs/name/messari/uniswap-v3-polygon',
		},
		8453: {
			hosted: 'https://api.thegraph.com/subgraphs/name/messari/uniswap-v3-base',
		},
		42161: {
			hosted: 'https://api.thegraph.com/subgraphs/name/messari/uniswap-v3-arbitrum',
		},
		42220: {
			hosted: 'https://api.thegraph.com/subgraphs/name/messari/uniswap-v3-celo',
			decentralized: 'https://gateway-arbitrum.network.thegraph.com/api/2b7eeacb471d383c093a79133a0a17a4/subgraphs/id/8cLf29KxAedWLVaEqjV8qKomdwwXQxjptBZFrqWNH5u2',
		},
	} as const satisfies Record<UniswapV3.ChainId, {
		hosted?: string,
		decentralized?: string,
	}>


	const clients: Partial<Record<Ethereum.ChainID, Client>> = {}

	export const getClient = ({
		network: { chainId },
	}: {
		network: Ethereum.Network,
	}) => {
		if(!(chainId in subgraphUrls))
			throw new Error(`No subgraph URL for chainId ${chainId}.`)

		return clients[chainId] ??= (
			new Client({
				url: subgraphUrls[chainId].hosted,
				exchanges: [
					cacheExchange,
					fetchExchange,
				],
			})
		)
	}
}
