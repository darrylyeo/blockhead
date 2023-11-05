import type { Ethereum } from '../data/networks/types'

import { Decommas, EvmChainName } from '@decommas/sdk'
import { env } from '../env'

export const decommas = new Decommas(env.DECOMMAS_API_KEY)

const fetch = decommas.address.httpRequest.__proto__.fetch
decommas.address.httpRequest.__proto__.fetch = function(endpoints, params, method){
	return fetch.call(
		this,
		endpoints,
		{ ...params, 'api-key': env.DECOMMAS_API_KEY },
		method
	)
}


export const chainIdByChainName = {
	[EvmChainName.ARBITRUM]: 42161,
	[EvmChainName.AVALANCHE]: 43114,
	[EvmChainName.BASE]: 8453,
	[EvmChainName.BSC]: 56,
	[EvmChainName.FANTOM]: 250,
	[EvmChainName.GNOSIS]: 100,
	[EvmChainName.LINEA]: 59144,
	[EvmChainName.MAINNET]: 1,
	[EvmChainName.OPBNB]: 204,
	[EvmChainName.OPTIMISM]: 10,
	[EvmChainName.POLYGON]: 137,
	[EvmChainName.ARBITRUM_NOVA]: 42170,
	[EvmChainName.POLYGON_ZKEVM]: 1101
} as const satisfies Record<EvmChainName, Ethereum.ChainID>

export const chainNameByChainId = Object.fromEntries(
	Object.entries(chainIdByChainName)
		.map(([chainName, chainId]) => [chainId, chainName])
) as Record<Ethereum.ChainID, EvmChainName>
