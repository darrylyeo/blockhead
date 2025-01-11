// Functions
import { getTokenBalances as getTokenBalancesZapper } from '$/api/zapper/rest/index'
import { normalizeTokenBalance as normalizeTokenBalanceZapper } from '$/api/zapper/rest/normalize'


// OpenGraph load
export const load = async ({
	layoutData: {
		address,
		network,
		quoteCurrency,
	},
}: {
	layoutData: Awaited<ReturnType<typeof import('../layout.opengraph').load>>
}) => {
	const balances = (
		await getTokenBalancesZapper({
			network,
			address,
			quoteCurrency,
		})
			.catch((error) => undefined)
	)
		?.map(normalizeTokenBalanceZapper)
		.sort((a, b) => (b.conversion?.value ?? 0) - (a.conversion?.value ?? 0))

	const summary = {
		quoteTotal: balances?.reduce((sum, tokenWithBalance) => sum + (tokenWithBalance.conversion?.value ?? 0), 0) ?? 0,
		quoteCurrency,
		balancesCount: balances?.filter(tokenWithBalance => tokenWithBalance.balance > 0).length ?? 0,
	}

	return {
		network,
		balances,
		summary,
	}
}
