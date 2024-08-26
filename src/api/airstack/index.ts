// Types/constants
import type { Ethereum } from '$/data/networks/types'

export const airstackNetworkNames = {
	1: 'ethereum',
	137: 'polygon',
	8453: 'base',
	7777777: 'zora',
	666666666: 'degen',
} as Record<Ethereum.ChainId, string>


// gql.tada
import { initGraphQLTada } from 'gql.tada'
import type { introspection } from './graphql-env'
const graphql = initGraphQLTada<{
	introspection: introspection,
}>()


// urql
import { Client, fetchExchange } from '@urql/svelte'
import * as publicEnv from '$env/static/public'

const client = new Client({
	url: 'https://api.airstack.xyz/gql',
	exchanges: [
		fetchExchange,
	],
	fetchOptions: () => ({
		headers: {
			authorization: publicEnv.PUBLIC_AIRSTACK_API_KEY,
		},
	})
})

import { handleUrqlResult } from '$/utils/urql'


// Fragments
export const Token = graphql(`
	fragment Token on Token @_unmask {
		address
		baseURI
		blockchain
		chainId
		contractMetaData {
			description
			externalLink
			feeRecipient
			image
			name
			sellerFeeBasisPoints
		}
		contractMetaDataURI
		decimals
		id
		lastTransferBlock
		lastTransferHash
		lastTransferTimestamp
		logo {
			external
			large
			medium
			original
			small
		}
		name
		projectDetails {
			collectionName
			description
			discordUrl
			externalUrl
			twitterUrl
		}
		rawContractMetaData
		symbol
		tokenTraits
		totalSupply
		type
	}
`)

export const TokenBalance = graphql(`
	fragment TokenBalance on TokenBalance {
		amount
		blockchain
		chainId
		formattedAmount
		id
		lastUpdatedBlock
		lastUpdatedTimestamp
		token {
			...Token
		}
		tokenAddress
		tokenType
	}
`, [
	Token,
])


// Queries
export const getToken = async ({
	address,
	chainId,
}: {
	address: Ethereum.Address
	chainId: Ethereum.ChainId
}) => {
	if (!(chainId in airstackNetworkNames))
		throw new Error(`Airstack doesn't yet support chain ID ${chainId}.`)

	return await client
		.query(
			graphql(`
				query Token(
					$address: Address!
					$blockchain: TokenBlockchain!
				) {
					Tokens(
						input: {
							blockchain: $blockchain
							filter: {
								address: {
									_eq: $address
								}
							}
						}
					) {
						Token {
							...Token
						}
					}
				}
			`, [
				Token,
			]),
			{
				address,
				blockchain: airstackNetworkNames[chainId],
			},
		)
		.toPromise()
		.then(handleUrqlResult)
}

export const getTokenBalances = async ({
	address,
	network,
	limit = 50,
	cursor,
}: {
	address: Ethereum.Address,
	network: Ethereum.Network,
	limit: number,
	cursor: string,
}) => {
	if (!(network.chainId in airstackNetworkNames))
		throw new Error(`Airstack doesn't yet support ${network.name}.`)

	return await client
		.query(
			graphql(`
				query TokenBalances(
					$address: Identity!
					$blockchain: TokenBlockchain!
					$limit: Int!
					$cursor: String!
				) {
					TokenBalances(
						input: {
							blockchain: $blockchain
							filter: {
								owner: {
									_in: [$address]
								}
								tokenType: {
									_in: [ERC20]
								}
							}
							limit: $limit
							cursor: $cursor
						}
					) {
						TokenBalance {
							...TokenBalance
						}
						pageInfo {
							nextCursor
							prevCursor
						}
					}
				}
			`, [
				TokenBalance,
			]),
			{
				address,
				blockchain: airstackNetworkNames[network.chainId],
				limit,
				cursor,
			},
		)
		.toPromise()
		.then(handleUrqlResult)
}

export const getNftsByAddress = async ({
	address,
	network,
	limit = 50,
	cursor,
}: {
	address: Ethereum.Address,
	network: Ethereum.Network,
	limit: number,
	cursor: string,
}) => {
	if(!(network.chainId in airstackNetworkNames))
		throw new Error(`Airstack doesn't yet support ${network.name}.`)

	return await client
		.query(
			graphql(`
				query NftBalances(
					$address: Identity!
					$blockchain: TokenBlockchain!
					$limit: Int!
					$cursor: String!
				) {
					TokenBalances(
						input: {
							blockchain: $blockchain
							filter: {
								owner: {
									_in: [$address]
								}
								tokenType: {
									_in: [ERC721, ERC1155]
								}
							}
							limit: $limit
							cursor: $cursor
						}
					) {
						TokenBalance {
							amount
							blockchain
							chainId
							formattedAmount
							id
							lastUpdatedBlock
							lastUpdatedTimestamp
							owner {
								addresses
								identity
							}
							token {
								...Token
							}
							tokenAddress
							tokenId
							tokenNfts {
								address
								blockchain
								chainId
								contentType
								# contentValue {
								# 	audio
								# 	animation_url {
								# 		original
								# 	}
								# 	image {
								# 		extraSmall
								# 		large
								# 		medium
								# 		original
								# 		small
								# 	}
								# 	video
								# }
								id
								lastTransferBlock
								lastTransferHash
								lastTransferTimestamp
								metaData {
									animationUrl
									attributes {
										displayType
										maxValue
										trait_type
										value
									}
									backgroundColor
									description
									externalUrl
									image
									imageData
									name
									youtubeUrl
								}
								rawMetaData
								tokenId
								tokenURI
								totalSupply
								type
							}
							tokenType
						}
						pageInfo {
							nextCursor
							prevCursor
						}
					}
				}
			`, [
				Token,
			]),
			{
				address,
				blockchain: airstackNetworkNames[network.chainId],
				limit,
				cursor,
			},
		)
		.toPromise()
		.then(handleUrqlResult)
}

export const getNftContractsCountByAddress = async ({
	address,
	network,
	timeout,
}: {
	address: Ethereum.Address,
	network: Ethereum.Network,
	timeout?: number,
}) => {
	if(!(network.chainId in airstackNetworkNames))
		throw new Error(`Airstack doesn't yet support ${network.name}.`)

	const limit = 200
	let nftContractsCount = 0
	let cursor = ''

	let hasTimedOut = false
	if(timeout)
		setTimeout(() => {
			hasTimedOut = true
		}, timeout)

	while(!hasTimedOut){
		const result = await client
			.query(
				graphql(`
					query NftBalances(
						$address: Identity!
						$blockchain: TokenBlockchain!
						$limit: Int!
						$cursor: String!
					) {
						TokenBalances(
							input: {
								blockchain: $blockchain
								filter: {
									owner: {
										_in: [$address]
									}
									tokenType: {
										_in: [ERC721, ERC1155]
									}
								}
								limit: $limit
								cursor: $cursor
							}
						) {
							pageInfo {
								nextCursor
							}
						}
					}
				`),
				{
					address,
					blockchain: airstackNetworkNames[network.chainId],
					limit,
					cursor,
				},
			)
			.toPromise()
			.then(handleUrqlResult)

		if(result?.TokenBalances?.pageInfo?.nextCursor){
			nftContractsCount += limit
			cursor = result.TokenBalances.pageInfo.nextCursor
		}

		else {
			const result = await client
				.query(
					graphql(`
						query NftBalances(
							$address: Identity!
							$blockchain: TokenBlockchain!
							$limit: Int!
							$cursor: String!
						) {
							TokenBalances(
								input: {
									blockchain: $blockchain
									filter: {
										owner: {
											_in: [$address]
										}
										tokenType: {
											_in: [ERC721, ERC1155]
										}
									}
									limit: $limit
									cursor: $cursor
								}
							) {
								TokenBalance {
									id
								}
							}
						}
					`),
					{
						address,
						blockchain: airstackNetworkNames[network.chainId],
						limit,
						cursor,
					},
				)
				.toPromise()
				.then(handleUrqlResult)

			nftContractsCount += result?.TokenBalances?.TokenBalance?.length ?? 0

			break
		}
	}

	return {
		nftContractsCount,
		hasMore: hasTimedOut,
	}
}

const FarcasterUser = graphql(`
	fragment FarcasterUser on Social @_unmask {
		blockchain
		chainId
		connectedAddresses {
			address
			blockchain
			chainId
			timestamp
		}
		coverImageContentValue {
			animation_url {
				original
			}
			audio {
				original
			}
			image {
				extraSmall
				large
				medium
				original
				small
			}
			json
			video {
				original
			}
		}
		coverImageURI
		dappName
		dappSlug
		dappVersion
		fnames
		followerCount
		followerTokenAddress
		followingCount
		handleTokenAddress
		handleTokenId
		id
		identity
		isDefault
		isFarcasterPowerUser
		location
		metadataURI
		profileBio
		profileCreatedAtBlockNumber
		profileCreatedAtBlockTimestamp
		profileDisplayName
		profileHandle
		profileImage
		profileImageContentValue {
			audio {
				original
			}
			animation_url {
				original
			}
			image {
				extraSmall
				large
				medium
				original
				small
			}
			json
			video {
				original
			}
		}
		profileLastUpdatedAtBlockNumber
		profileLastUpdatedAtBlockTimestamp
		profileMetadata
		profileName
		profileTokenAddress
		profileTokenId
		profileTokenIdHex
		profileTokenUri
		profileUrl
		socialCapital {
			socialCapitalRank
			socialCapitalScore
			socialCapitalScoreRaw
		}
		twitterUserName
		updatedAt
		userAddress
		userAssociatedAddresses
		userCreatedAtBlockNumber
		userCreatedAtBlockTimestamp
		userHomeURL
		userLastUpdatedAtBlockNumber
		userLastUpdatedAtBlockTimestamp
		userRecoveryAddress
		userId
		website
	}
`)

export const getFarcasterUserById = async ({
	userId,
}: {
	userId: number,
}) => {
	return await client
		.query(
			graphql(`
				query FarcasterUser(
					$userId: String!
				) {
					Socials(
						input: {
							blockchain: ethereum
							filter: {
								dappName: {
									_eq: farcaster
								}
								userId: {
									_eq: $userId
								}
							}
						}
					) {
						Social {
							...FarcasterUser
						}
						pageInfo {
							hasNextPage
							hasPrevPage
							nextCursor
							prevCursor
						}
					}
				}
			`, [
				FarcasterUser,
			]),
			{
				userId: String(userId),
			},
		)
		.toPromise()
		.then(handleUrqlResult)
}

export const getFarcasterUserByName = async ({
	userName,
}: {
	userName: string,
}) => {
	return await client
		.query(
			graphql(`
				query FarcasterUserByUsername(
					$userName: String!
				) {
					Socials(
						input: {
							blockchain: ethereum
							filter: {
								dappName: {
									_eq: farcaster
								}
								profileName: {
									_eq: $userName
								}
							}
						}
					) {
						Social {
							...FarcasterUser
						}
						pageInfo {
							hasNextPage
							hasPrevPage
							nextCursor
							prevCursor
						}
					}
				}
			`, [
				FarcasterUser,
			]),
			{
				userName,
			},
		)
		.toPromise()
		.then(handleUrqlResult)
}

const FarcasterCast = graphql(`
	fragment FarcasterCast on FarcasterCast @_unmask {
		castedAtTimestamp
		castedBy {
			...FarcasterUser
		}
		channel {
			channelId
			id
			url,
		}
		embeds
		fid
		frame {
			buttons {
				action
				id
				index
				label
				target
			}
			castedAtTimestamp
			frameHash
			frameUrl
			imageAspectRatio
			imageUrl
			inputText
			postUrl
			state
		}
		hash
		id
		mentions {
			fid
			position
		}
		numberOfLikes
		numberOfRecasts
		numberOfReplies
		parentCast {
			id
		}
		parentFid
		parentHash
		quotedCast {
			id
		}
		rawText
		rootParentUrl
		socialCapitalValue {
			formattedValue
			hash
			rawValue
		}
		text
		url
	}
`, [
	FarcasterUser,
])

export const getFarcasterTrendingCasts = async ({
	criteria,
	timeFrame = 'one_day',
	limit = 50,
	cursor,
}: {
	criteria: 'social_capital_value' | 'likes' | 'recasts' | 'replies' | 'likes_recasts_replies',
	timeFrame: 'one_hour' | 'two_hours' | 'eight_hours' | 'one_day' | 'two_days' | 'seven_days',
	limit: number,
	cursor: string,
}) => {
	return await client
		.query(
			graphql(`
				query FarcasterTrendingCasts(
					$criteria: TrendingCastsCriteria!
					$timeFrame: TrendingCastTimeFrame!
					$limit: Int!
					$cursor: String!
				) {
					TrendingCasts(
						input: {
							blockchain: ALL
							criteria: $criteria
							timeFrame: $timeFrame
							limit: $limit
							cursor: $cursor
						}
					) {
						TrendingCast {
							cast {
								...FarcasterCast
							}
							criteria
							criteriaCount
							hash
							id
							socialCapitalValueFormatted
							socialCapitalValueRaw
							timeFrom
							timeTo
						}
						pageInfo {
							hasNextPage
							hasPrevPage
							nextCursor
							prevCursor
						}
					}
				}
			`, [
				FarcasterCast,
			]),
			{
				criteria,
				timeFrame,
				limit,
				cursor,
			},
		)
		.toPromise()
		.then(handleUrqlResult)
}

export const getFarcasterCasts = async ({
	limit = 50,
	cursor,
}: {
	limit: number,
	cursor: string,
}) => {
	return await client
		.query(
			graphql(`
				query FarcasterCasts(
					$limit: Int!
					$cursor: String!
				) {
					FarcasterCasts(
						input: {
							blockchain: ALL
							filter: {
								castedAtTimestamp: {
									_gt: "2020-01-01T00:00:00.000000000Z"
								}
							}
							limit: $limit
							cursor: $cursor
						}
					) {
						Cast {
							...FarcasterCast
						}
						pageInfo {
							hasNextPage
							hasPrevPage
							nextCursor
							prevCursor
						}
					}
				}
			`, [
				FarcasterCast,
			]),
			{
				limit,
				cursor,
			},
		)
		.toPromise()
		.then(handleUrqlResult)
}

export const getFarcasterCastsByUserId = async ({
	userId,
	limit = 50,
	cursor,
}: {
	userId: number,
	limit: number,
	cursor: string,
}) => {
	return await client
		.query(
			graphql(`
				query FarcasterCastsByUserId(
					$userId: Identity!
					$limit: Int!
					$cursor: String!
				) {
					FarcasterCasts(
						input: {
							blockchain: ALL
							filter: {
								castedBy: {
									_in: [$userId]
								}
							}
							limit: $limit
							cursor: $cursor
						}
					) {
						Cast {
							...FarcasterCast
						}
						pageInfo {
							hasNextPage
							hasPrevPage	
							nextCursor
							prevCursor
						}
					}
				}
			`, [
				FarcasterCast,
			]),
			{
				userId: String(userId),
				limit,
				cursor,
			},
		)
		.toPromise()
		.then(handleUrqlResult)
}

export const getFarcasterCastsByChannel = async ({
	castParentUrl,
	limit = 50,
	cursor,
}: {
	castParentUrl: string,
	limit: number,
	cursor: string,
}) => {
	return await client
		.query(
			graphql(`
				query FarcasterCastsByChannel(
					$castParentUrl: String!
					$limit: Int!
					$cursor: String!
				) {
					FarcasterCasts(
						input: {
							blockchain: ALL
							filter: {
								rootParentUrl: {
									_eq: $castParentUrl
								}
							}
							limit: $limit
							cursor: $cursor
						}
					) {
						Cast {
							...FarcasterCast
						}
						pageInfo {
							hasNextPage
							hasPrevPage
							nextCursor
							prevCursor
						}
					}
				}
			`, [
				FarcasterCast,
			]),
			{
				castParentUrl,
				limit,
				cursor,
			},
		)
		.toPromise()
		.then(handleUrqlResult)
}

export const getFarcasterCastByHash = async ({
	hash,
}: {
	hash: string,
}) => {
	return await client
		.query(
			graphql(`
				query FarcasterCastByHash(
					$hash: String!
				) {
					FarcasterCasts(
						input: {
							blockchain: ALL
							filter: {
								hash: {
									_eq: $hash
								}
							}
						}
					) {
						Cast {
							...FarcasterCast
						}
						pageInfo {
							hasNextPage
							hasPrevPage
							nextCursor
							prevCursor
						}
					}
				}
			`, [
				FarcasterCast,
			]),
			{
				hash,
			},
		)
		.toPromise()
		.then(handleUrqlResult)
}

export const getFarcasterCastByClientUrl = async ({
	clientUrl,
}: {
	clientUrl: string,
}) => {
	return await client
		.query(
			graphql(`
				query FarcasterCastByClientUrl(
					$clientUrl: String!
				) {
					FarcasterCasts(
						input: {
							blockchain: ALL
							filter: {
								url: {
									_eq: $clientUrl
								}
							}
						}
					) {
						Cast {
							...FarcasterCast
						}
						pageInfo {
							hasNextPage
							hasPrevPage
							nextCursor
							prevCursor
						}
					}
				}
			`, [
				FarcasterCast,
			]),
			{
				clientUrl,
			},
		)
		.toPromise()
		.then(handleUrqlResult)
}

export const getFarcasterCastReplies = async ({
	parentHash,
	limit = 50,
	cursor,
}: {
	parentHash: string,
	limit: number,
	cursor: string,
}) => {
	return await client
		.query(
			graphql(`
				query FarcasterReplies(
					$parentHash: String!
					$limit: Int!
					$cursor: String!
				) {
					FarcasterReplies(
						input: {
							blockchain: ALL
							filter: {
								parentHash: {
									_eq: $parentHash
								}
							}
							limit: $limit
							cursor: $cursor
						}
					) {
						Reply {
							...FarcasterCast
						}
						pageInfo {
							hasNextPage
							hasPrevPage
							nextCursor
							prevCursor
						}
					}
				}
			`, [
				FarcasterCast,
			]),
			{
				parentHash,
				limit,
				cursor,
			},
		)
		.toPromise()
		.then(handleUrqlResult)
}

const FarcasterChannel = graphql(`
	fragment FarcasterChannel on FarcasterChannel @_unmask {
		channelId
		createdAtTimestamp
		dappName
		dappSlug
		description
		followerCount
		id
		imageUrl
		leadIds
		name
		url
	}
`)

export const getFarcasterChannels = async ({
	limit = 50,
	cursor,
}: {
	limit: number,
	cursor: string,
}) => {
	return await client
		.query(
			graphql(`
				query FarcasterChannels(
					$limit: Int!
					$cursor: String!
				) {
					FarcasterChannels(
						input: {
							blockchain: ALL
							limit: $limit
							cursor: $cursor
							order: {
								createdAtTimestamp: DESC
								followerCount: DESC
							}
						}
					) {
						FarcasterChannel {
							...FarcasterChannel
						}
						pageInfo {
							hasNextPage
							hasPrevPage
							nextCursor
							prevCursor
						}
					}
				}
			`, [
				FarcasterChannel,
			]),
			{
				limit,
				cursor,
			},
		)
		.toPromise()
		.then(handleUrqlResult)
}

export const getFarcasterChannel = async ({
	channelId,
}: {
	channelId: string,
}) => {
	return await client
		.query(
			graphql(`
				query FarcasterChannel(
					$channelId: String!
				) {
					FarcasterChannels(
						input: {
							blockchain: ALL
							filter: {
								channelId: {
									_eq: $channelId
								}
							}
						}
					) {
						FarcasterChannel {
							...FarcasterChannel
						}
					}
				}
			`, [
				FarcasterChannel,
			]),
			{
				channelId,
			},
		)
		.toPromise()
		.then(handleUrqlResult)
}
