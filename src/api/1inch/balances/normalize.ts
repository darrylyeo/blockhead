// Types
import type { TokenWithBalance } from '$/data/tokens'
import type { getTokensForChain } from '../tokens'
import type { getBalances } from '../balances'
import type { FetchReturnType } from 'openapi-typescript-fetch'


// Functions
import { normalizeToken } from '../tokens/normalize'

export const normalizeTokenBalance = (
	token: FetchReturnType<typeof getTokensForChain>['tokens'][number],
	balance: FetchReturnType<typeof getBalances>[number],
): TokenWithBalance => ({
	token: normalizeToken(token),
	balance: BigInt(balance),
})
