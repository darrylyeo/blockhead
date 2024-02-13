// Types/constants
import type { QuoteCurrency } from '$/data/currencies'
import type { TokenWithBalance } from '$/data/tokens'
import { type getTokenBalances } from '.'


// Functions
export const normalizeTokenBalance = (
	tokenBalance: Awaited<ReturnType<typeof getTokenBalances>>[number],
	quoteCurrency: QuoteCurrency,
): TokenWithBalance => ({
	token: {
		address: tokenBalance.token.address,
		decimals: tokenBalance.token.decimals,
		name: tokenBalance.token.name,
		symbol: tokenBalance.token.symbol,
		icon: `https://storage.googleapis.com/zapper-fi-assets/tokens/${tokenBalance.network}/${tokenBalance.token.address.toLowerCase()}.png`
	},

	balance: BigInt(tokenBalance.token.balanceRaw),

	conversion: {
		currency: quoteCurrency,
		value: tokenBalance.token.balanceUSD,
		rate: tokenBalance.token.price,
	},
})
