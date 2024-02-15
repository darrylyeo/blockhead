// Types
import type { Ethereum } from '$/data/networks/types'


// Functions
import { getNftsByAddress as getNftsAirstack } from '$/api/airstack/index'
import { normalizeNftContracts as normalizeNftContractsAirstack } from '$/api/airstack/normalize'


// OpenGraph load
export const load = async ({
	layoutData: {
		address,
		network,
		quoteCurrency,
		nftContractsCount,
		nftContractsHasMore,
		nftsCount,
	},
}: {
	layoutData: Awaited<ReturnType<typeof import('../layout.opengraph').load>>
}) => {
	const nftsLimit = 100

	const result = (
		await getNftsAirstack({
			network,
			address,
			limit: nftsLimit,
			cursor: '',
		})
			.catch(() => undefined)
	)

	const hasMoreNfts = result && Boolean(result.TokenBalances.pageInfo.nextCursor)

	const nftContractsWithBalances = result && normalizeNftContractsAirstack(
		result
			.TokenBalances.TokenBalance		
	)

	const summary = nftContractsWithBalances && {
		quoteTotal: nftContractsWithBalances.reduce((sum, item) => sum + (item.conversion?.value ?? 0) * (item.nftsCount ?? item.nfts?.length ?? 0), 0),
		quoteCurrency,
		nftContractsCount, //: nftContractsWithBalances.length,
		nftContractsHasMore,
		nftsCount, // : nftContractsWithBalances.reduce((sum, item) => sum + (item.nfts?.length ?? 0), 0)
	}

	return {
		network,
		nftContractsWithBalances,
		hasMoreNfts,
		summary,
	}
}
