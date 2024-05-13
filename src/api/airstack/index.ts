// Types/constants
import type { Ethereum } from '$/data/networks/types'

export const airstackNetworkNames = {
	1: 'ethereum',
	137: 'polygon',
	8453: 'base',
	7777777: 'zora',
	666666666: 'degen',
} as Record<Ethereum.ChainID, string>


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


// Queries
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
	if(!(network.chainId in airstackNetworkNames))
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
							amount
							blockchain
							chainId
							formattedAmount
							id
							lastUpdatedBlock
							lastUpdatedTimestamp
							token {
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
							tokenAddress
							tokenType
						}
						pageInfo {
							nextCursor
							prevCursor
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
		.then(result => {
			if(result.error)
				throw result.error

			return result.data
		})
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
			`),
			{
				address,
				blockchain: airstackNetworkNames[network.chainId],
				limit,
				cursor,
			},
		)
		.toPromise()
		.then(result => {
			if(result.error)
				throw result.error

			return result.data
		})
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
			.then(result => {
				if(result.error)
					throw result.error
	
				return result.data
			})

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
				.then(result => {
					if(result.error)
						throw result.error
		
					return result.data
				})

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
		.then(result => {
			if(result.error)
				throw result.error

			return result.data
		})
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
		.then(result => {
			if(result.error)
				throw result.error

			return result.data
		})
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
			id
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
		parentUrl
		quotedCast {
			id
		}
		rawText
		rootParentHash
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
		.then(result => {
			if(result.error)
				throw result.error

			return result.data
		})
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
		.then(result => {
			if(result.error)
				throw result.error

			return result.data
		})
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
		.then(result => {
			if(result.error)
				throw result.error

			return result.data
		})
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
		.then(result => {
			if(result.error)
				throw result.error

			return result.data
		})
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
		.then(result => {
			if(result.error)
				throw result.error

			return result.data
		})
}

const FarcasterChannel = graphql(`
	fragment FarcasterChannel on FarcasterChannel @_unmask {
		channelId
		createdAtTimestamp
		dappName
		dappSlug
		description
		followerCount
		hostIds
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
		.then(result => {
			if(result.error)
				throw result.error

			return result.data
		})
}
