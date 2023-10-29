import { Client, cacheExchange, fetchExchange } from '@urql/svelte'

import { env } from '../env'


let client: Client

export const getClient = () => client ||= (
	new Client({
		url: 'https://api.airstack.xyz/gql',
		exchanges: [
			// cacheExchange,
			fetchExchange,
		],
		fetchOptions: () => ({
			headers: {
				authorization: env.AIRSTACK_API_KEY,
			},
		})
	})
)


import type { Ethereum } from '../data/networks/types'

export const airstackNetworkNames = {
	1: 'ethereum',
	137: 'polygon',
} as Record<Ethereum.ChainID, string>


import { normalizeNftAttributes } from '../utils/normalizeNftAttributes'

export const normalizeNftContracts = (data): Ethereum.NftContractWithNfts[] => (
	[
		...data.TokenBalances.TokenBalance
			?.groupToMap(tokenWithBalance => tokenWithBalance.tokenAddress)
			.entries()
		?? []
	]
		.map(([contractAddress, contractsWithBalances]): Ethereum.NftContractWithNfts => ({
			chainId: Number(contractsWithBalances.chainId),
			address: contractAddress,
			name: contractsWithBalances[0].token.name,
			symbol: contractsWithBalances[0].token.symbol,
			ercTokenStandards: [contractsWithBalances[0].token.type?.toLowerCase()],
			metadata: {
				...contractsWithBalances[0].contractMetaData,
				description: contractsWithBalances[0].contractMetaData?.description,
				bannerImage: undefined,
				logoImage: contractsWithBalances[0].contractMetaData?.image,
			},

			totalSupply: BigInt(contractsWithBalances[0].token.totalSupply),
			nftsCount: contractsWithBalances.reduce((sum, item) => sum + Number(item.balance), 0),
			nfts: contractsWithBalances
				.map(tokenWithBalance => tokenWithBalance.tokenNfts)
				.map((nft) => ({
					owner: nft.address,
					tokenId: BigInt(nft.tokenId),
					tokenUri: nft.tokenURI,
					metadata: {
						...nft.metaData && {
							name: nft.metaData.name,
							description: nft.metaData.description,
							image: nft.metaData.image,
							attributes: nft.metaData.attributes ? normalizeNftAttributes(nft.metaData.attributes) : undefined,
						}
					},
				})),
		}))
)
