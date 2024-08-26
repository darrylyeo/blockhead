// Types
import type { Ethereum } from '$/data/networks/types'
import type { TokenWithBalance } from '$/data/tokens'
import type {
	Token,
	TokenBalance,
	getNftsByAddress,
	getFarcasterCastByHash,
	getFarcasterUserByName,
	getFarcasterTrendingCasts,
	getFarcasterChannels
} from '.'
import type { FragmentOf } from 'gql.tada'


// Functions
import { isTruthy } from '$/utils/isTruthy'
import { normalizeNftAttributes } from '$/utils/normalizeNftAttributes'
import { extractCastEmbeds, type FarcasterCast, type FarcasterUser, type FarcasterChannel } from '../farcaster'

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
			ercTokenStandards: [contractsWithBalances[0].token?.type?.toLowerCase() as Ethereum.ErcTokenStandard].filter(isTruthy),
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

export const normalizeToken = (
	token: FragmentOf<typeof Token>,
	chainId: Ethereum.ChainId,
): Ethereum.Erc20Token => ({
	chainId: chainId || (token.chainId ? Number(token.chainId) : undefined),
	address: token.address as Ethereum.ContractAddress,

	name: token.name,
	symbol: token.symbol,
	decimals: token.decimals,

	icon: (
		token.contractMetaData?.image
		?? token.logo.external
		?? token.logo.small
		?? token.logo.medium
		?? token.logo.large
		?? token.logo.original
	),

	totalSupply: (
		token.totalSupply
			? BigInt(token.totalSupply)
			: undefined
	),
})

export const normalizeTokenBalance = (
	tokenWithBalance: FragmentOf<typeof TokenBalance>,
	chainId: Ethereum.ChainId
): TokenWithBalance => ({
	token: normalizeToken(
		tokenWithBalance.token,
		chainId
	),
	balance: BigInt(tokenWithBalance.amount)
})

export const normalizeFarcasterCast = (
	farcasterCast: NonNullable<NonNullable<NonNullable<Awaited<ReturnType<typeof getFarcasterCastByHash>>>['FarcasterCasts']>['Cast']>[number]
): FarcasterCast => ({
	id: farcasterCast.hash,
	text: farcasterCast.text,
	...extractCastEmbeds({
		embeds: farcasterCast.embeds?.map(embed => ({
			url: embed.url,
		})),
		text: farcasterCast.text,
	}),

	author: farcasterCast.castedBy && normalizeFarcasterUser(farcasterCast.castedBy),

	timestamp: new Date(farcasterCast.castedAtTimestamp).valueOf(),

	reactions: {
		likesCount: farcasterCast.numberOfLikes,
		recastsCount: farcasterCast.numberOfRecasts,
	},

	...(
		farcasterCast.channel ?
			{
				channel: {
					id: farcasterCast.channel.channelId,
					url: farcasterCast.channel.url,
				},
			}
		: farcasterCast.rootParentUrl ?
			{
				channel: {
					url: farcasterCast.rootParentUrl,
				},
			}
		:
			undefined
	)
})

export const normalizeFarcasterTrendingCast = (
	farcasterTrendingCast: NonNullable<NonNullable<NonNullable<Awaited<ReturnType<typeof getFarcasterTrendingCasts>>>['TrendingCasts']>['TrendingCast']>[number]
): FarcasterCast => (
	normalizeFarcasterCast(farcasterTrendingCast.cast)
)

export const normalizeFarcasterUser = (
	farcasterUser: NonNullable<NonNullable<NonNullable<Awaited<ReturnType<typeof getFarcasterUserByName>>>['Socials']>['Social']>[number]
): FarcasterUser => ({
	id: Number(farcasterUser.profileTokenId), 
	name: farcasterUser.profileName,
	displayName: farcasterUser.profileDisplayName,

	avatar: {
		url: farcasterUser.profileImageContentValue?.image?.medium ?? undefined,
	},

	bio: {
		text: farcasterUser.profileBio,
	},

	custodyAddress: farcasterUser.profileTokenAddress as Ethereum.Address,

	summary: {
		...farcasterUser.followerCount !== null && {
			followerCount: farcasterUser.followerCount,
		},
		...farcasterUser.followingCount !== null && {
			followingCount: farcasterUser.followingCount,
		},
	},
})

export const normalizeFarcasterChannel = (
	channel: NonNullable<NonNullable<NonNullable<Awaited<ReturnType<typeof getFarcasterChannels>>>['FarcasterChannels']>['FarcasterChannel']>[number]
): FarcasterChannel => ({
	id: channel.channelId,
	url: channel.url,
	name: channel.name,
	image: channel.imageUrl,
	leads: channel.hostIds,

	summary: {
		followerCount: channel.followerCount,
	},
})
