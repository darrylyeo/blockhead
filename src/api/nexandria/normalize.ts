import type { Ethereum } from '$/data/networks/types'
import type { TokenWithBalance } from '$/data/tokens'
import type { getPointInTimeBalances } from '.'


export const normalizeTokenBalance = (
	tokenBalance: Awaited<ReturnType<typeof getPointInTimeBalances>>['tokens'][0],
	chainId: Ethereum.ChainId,
): TokenWithBalance => ({
	token: {
		chainId,
		address: tokenBalance.token_type === 'ERC20' ? tokenBalance.address : undefined,
		decimals: 100,
		name: tokenBalance.name,
		symbol: tokenBalance.symbol,
	},

	balance: tokenBalance.native_balance && BigInt(Number(tokenBalance.native_balance.replace(/,/g, '')) * 10 ** 100),
	// balance: tokenBalance.native_balance && tokenBalance.decimals && BigInt(tokenBalance.native_balance.replace(/,/g, '') * 10 ** tokenBalance.decimals),

	...'fiat_value' in tokenBalance && {
		conversion: {
			currency: 'USD',
			value: Number(tokenBalance.fiat_value.replace(/,/g, '')),
		},
	},
})
