// Functions
import { getTokenBalancesCount as getTokenBalancesCountZapper } from '$/api/zapper'
import { getNftContractsCountByAddress as getNftContractsCountByAddressAirstack } from '$/api/airstack'


// OpenGraph load
export const load = async ({
	layoutData: {
		address,
		network,
	},
}: {
	layoutData: Awaited<ReturnType<typeof import('./layout.opengraph').load>>
}) => {
	const tokensCount = await getTokenBalancesCountZapper({
		address,
		network,
	})
		.catch(() => undefined)

	const {
		nftContractsCount,
		hasMore: nftContractsHasMore,
	} = await getNftContractsCountByAddressAirstack({
		address,
		network,
		timeout: 1000,
	})
		.catch(() => undefined)
		?? {}

	const nftsCount = undefined


	return {
		tokensCount,
		nftContractsCount,
		nftContractsHasMore,
		nftsCount,
	}
}
