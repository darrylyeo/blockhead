// Types
import type { Ethereum } from '$/data/networks/types'


// Functions
import {
	getNftsByAddress as getNftsAirstack,
	getNftContractsCountByAddress as getNftContractsCountByAddressAirstack,
} from '$/api/airstack/index'
import { normalizeNftContracts as normalizeNftContractsAirstack } from '$/api/airstack/normalize'


// OpenGraph load
export const load = async ({
	fetch,
	layoutData: {
		address,
		network,
		quoteCurrency,
	},
}: {
	fetch: typeof globalThis.fetch,
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

	const nftContractsWithBalances: Ethereum.NftContractWithNfts[] | undefined = result && normalizeNftContractsAirstack(
		result
			.TokenBalances.TokenBalance		
	)

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

	const summary = nftContractsWithBalances && {
		quoteTotal: nftContractsWithBalances.reduce((sum, item) => sum + (item.conversion?.value ?? 0) * (item.nftsCount ?? item.nfts?.length ?? 0), 0),
		quoteCurrency,
		nftContractsCount, //: nftContractsWithBalances.length,
		nftContractsHasMore,
		nftsCount: nftContractsWithBalances.reduce((sum, item) => sum + (item.nfts?.length ?? 0), 0),
	}

	const nftContractsWithBalancesFilteredByImages = nftContractsWithBalances && await Promise.all(
		nftContractsWithBalances.map(async contract => ({
			...contract,
			nfts: contract.nfts && (
				await Promise.all(
					contract.nfts
						.map(nft => ({
							nft,
							src: (
								nft['metadata']['image_256']
								|| nft['metadata']['image']
							),
						}))
						.filter(({ src }) => src)
						.map(async ({ nft, src }) => ({
							nft,
							response: (
								await fetch(
									src,
									{
										method: 'HEAD',
									},
								)
									.catch(() => undefined)
							),
						}))
				)
			)
				.filter(({ response }) => (
					response?.headers.get('content-type')?.startsWith('image/')
				))
				.map(({ nft }) => (
					nft
				))
		}))
	)

	return {
		network,
		nftContractsWithBalances,
		nftContractsWithBalancesFilteredByImages,
		hasMoreNfts,
		summary,
	}
}
