// Functions
import { getTokenBalances as getTokenBalancesZapper } from '$/api/zapper/index'
import { normalizeTokenBalance as normalizeTokenBalanceZapper } from '$/api/zapper/normalize'


// OpenGraph load
export const load = async ({
	layoutData: {
		address,
		network,
	},
}: {
	layoutData: Awaited<ReturnType<typeof import('../layout.opengraph').load>>
}) => {
	const balances = (
		await getTokenBalancesZapper({
			network,
			address,
		})
			.catch((error) => undefined)
	)
		?.map(normalizeTokenBalanceZapper)
	
	const summary = {
		quoteTotal: balances?.reduce((sum, tokenWithBalance) => sum + (tokenWithBalance.conversion?.value ?? 0), 0) ?? 0,
	}

	return {
		network,
		balances,
		summary,
	}
}
