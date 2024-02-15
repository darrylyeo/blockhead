import type { Ethereum } from '$/data/networks/types'
import type { TokenWithBalance } from '$/data/tokens'
import { normalizeNftAttributes } from '$/utils/normalizeNftAttributes'

export const normalizeNftContracts = (tokenBalances): Ethereum.NftContractWithNfts[] => (
	[
		...tokenBalances
			? Map.groupBy(tokenBalances, tokenWithBalance => tokenWithBalance.tokenAddress).entries()
			: []
	]
		.map(([contractAddress, contractsWithBalances]): Ethereum.NftContractWithNfts => ({
			chainId: contractsWithBalances.chainId && Number(contractsWithBalances.chainId),
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

export const normalizeTokenBalance = (tokenWithBalance): TokenWithBalance => ({
	token: {
		chainId: tokenWithBalance.chainId && Number(tokenWithBalance.chainId),
		address: tokenWithBalance.tokenAddress,
		name: tokenWithBalance.token.name,
		symbol: tokenWithBalance.token.symbol,
		decimals: tokenWithBalance.token.decimals,
	},
	balance: BigInt(tokenWithBalance.amount),
})
