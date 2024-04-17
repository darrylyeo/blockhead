// Types
import type { Ethereum } from '$/data/networks/types'
import type { TokenWithBalance } from '$/data/tokens'
import type { getNftsByAddress, getTokenBalances } from '.'


// Functions
import { isTruthy } from '$/utils/isTruthy'
import { normalizeNftAttributes } from '$/utils/normalizeNftAttributes'

export const normalizeNftContracts = (
	tokenBalances: NonNullable<NonNullable<NonNullable<Awaited<ReturnType<typeof getNftsByAddress>>>['TokenBalances']>['TokenBalance']>,
): Ethereum.NftContractWithNfts[] => (
	Array.from(
		tokenBalances
			? (Map.groupBy(tokenBalances, tokenWithBalance => tokenWithBalance.tokenAddress) as Map<Ethereum.ContractAddress, typeof tokenBalances>)
				.entries()
			: [],
		([contractAddress, contractsWithBalances]): Ethereum.NftContractWithNfts => ({
			chainId: 'chainId' in contractsWithBalances[0] ? Number(contractsWithBalances[0].chainId) : undefined,
			address: contractAddress,
			name: contractsWithBalances[0].token?.name,
			symbol: contractsWithBalances[0].token?.symbol,
			ercTokenStandards: [contractsWithBalances[0].token?.type?.toLowerCase() as Ethereum.ERCTokenStandard].filter(isTruthy),
			metadata: {
				...contractsWithBalances[0].token?.contractMetaData,
				description: contractsWithBalances[0].token?.contractMetaData?.description ?? undefined,
				bannerImage: undefined,
				logoImage: contractsWithBalances[0].token?.contractMetaData?.image ?? undefined,
			},

			totalSupply: contractsWithBalances[0].token?.totalSupply ? BigInt(contractsWithBalances[0].token.totalSupply) : undefined,
			nftsCount: contractsWithBalances.reduce((sum, item) => sum + Number(item.amount), 0),
			nfts: contractsWithBalances
				.map(tokenWithBalance => tokenWithBalance.tokenNfts)
				.filter(isTruthy)
				.map((nft) => ({
					owner: nft.address,
					tokenId: nft.tokenId !== null ? BigInt(nft.tokenId) : undefined,
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
		})
	)
)

export const normalizeTokenBalance = (
	tokenWithBalance: NonNullable<NonNullable<NonNullable<Awaited<ReturnType<typeof getTokenBalances>>>['TokenBalances']>['TokenBalance']>[number]
): TokenWithBalance => ({
	token: {
		chainId: tokenWithBalance.chainId ? Number(tokenWithBalance.chainId) : undefined,
		address: tokenWithBalance.tokenAddress as Ethereum.ContractAddress,
		name: tokenWithBalance.token?.name ?? undefined,
		symbol: tokenWithBalance.token?.symbol ?? undefined,
		decimals: tokenWithBalance.token?.decimals ?? undefined,
	},
	balance: BigInt(tokenWithBalance.amount),
})
