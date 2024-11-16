// Types
import type { Ethereum } from '$/data/networks/types'
import type { getTokensForChain } from '../tokens'
import type { FetchReturnType } from 'openapi-typescript-fetch'


// Functions
export const normalizeToken = (
	token: FetchReturnType<typeof getTokensForChain>['tokens'][number],
): Ethereum.Erc20Token => ({
	name: token.name,
	address: token.address as `0x${string}`,
	chainId: token.chainId,
	symbol: token.symbol,
	decimals: token.decimals,

	icon: token.logoURI,
})
