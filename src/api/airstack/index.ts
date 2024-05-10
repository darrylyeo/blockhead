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
					$address: Identity!, 
					$blockchain: TokenBlockchain!, 
					$limit: Int!, 
					$cursor: String!
				) {
					TokenBalances(
						input: {
							filter: {
								owner: {
									_in: [$address]
								}
								tokenType: {
									_in: [ERC20]
								}
							}
							blockchain: $blockchain
							limit: $limit
							cursor: $cursor
						}
					) {
						TokenBalance {
							tokenAddress
							amount
							tokenType
							blockchain
							chainId
							formattedAmount
							id
							lastUpdatedBlock
							lastUpdatedTimestamp
							token {
								address
								baseURI
								chainId
								blockchain
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
							filter: {
								owner: {
									_in: [$address]
								}
								tokenType: {
									_in: [ERC721, ERC1155]
								}
							},
							blockchain: $blockchain,
							limit: $limit,
							cursor: $cursor
						}
					) {
						TokenBalance {
							tokenAddress
							tokenNfts {
								id
								address
								tokenId
								type
								rawMetaData
								chainId
								contentType
								blockchain
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
								tokenURI
								totalSupply
							}
							owner {
								addresses
								identity
							}
							tokenId
							amount
							blockchain
							chainId
							formattedAmount
							id
							lastUpdatedTimestamp
							lastUpdatedBlock
							tokenType
							token {
								address
								blockchain
								baseURI
								chainId
								contractMetaData {
									description
									externalLink
									feeRecipient
									image
									name
									sellerFeeBasisPoints
								}
								type
								totalSupply
								tokenTraits
								symbol
								rawContractMetaData
								projectDetails {
									collectionName
									description
									discordUrl
									externalUrl
									twitterUrl
								}
								name
								logo {
									external
									large
									medium
									original
									small
								}
								lastTransferTimestamp
								lastTransferHash
								lastTransferBlock
								id
								decimals
								contractMetaDataURI
							}
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
								filter: {
									owner: {
										_in: [$address]
									}
									tokenType: {
										_in: [ERC721, ERC1155]
									}
								}
								blockchain: $blockchain
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
									filter: {
										owner: {
											_in: [$address]
										},
										tokenType: {
											_in: [ERC721, ERC1155]
										}
									}
									blockchain: $blockchain
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
		dappName
		userId
		userAddress
		userCreatedAtBlockTimestamp
		userCreatedAtBlockNumber
		userHomeURL
		userRecoveryAddress
		userAssociatedAddresses
		profileBio
		profileDisplayName
		profileImage
		profileUrl
		profileName
		profileCreatedAtBlockTimestamp
		profileCreatedAtBlockNumber
		fnames
		blockchain
		chainId
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
		connectedAddresses {
			address
			blockchain
			chainId
			timestamp
		}
		coverImageURI
		dappSlug
		dappVersion
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
		profileHandle
		profileImageContentValue {
			image {
				extraSmall
				large
				medium
				original
				small
			}
			audio {
				original
			}
			animation_url {
				original
			}
			json
			video {
				original
			}
		}
		profileLastUpdatedAtBlockNumber
		profileLastUpdatedAtBlockTimestamp
		profileMetadata
		profileTokenAddress
		profileTokenId
		profileTokenIdHex
		profileTokenUri
		twitterUserName
		updatedAt
		userLastUpdatedAtBlockNumber
		userLastUpdatedAtBlockTimestamp
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
							filter: {
								dappName: {
									_eq: farcaster
								}
								userId: {
									_eq: $userId
								}
							}
							blockchain: ethereum
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
							filter: {
								dappName: {
									_eq: farcaster
								}
								profileName: {
									_eq: $userName
								}
							}
							blockchain: ethereum
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
		embeds
		fid
		frame {
			castedAtTimestamp
			buttons {
				action
				id
				index
				label
				target
			}
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
		parentFid
		parentHash
		parentUrl
		rawText
		rootParentHash
		rootParentUrl
		socialCapitalValue {
			formattedValue
			hash
			rawValue
		}
		channel {
			id
			channelId
			url,
		}
		castedBy {
			...FarcasterUser
		}
		parentCast {
			id
		}
		quotedCast {
			id
		}
		text
		url
	}
`, [
	FarcasterUser,
])

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
							filter: {
								castedAtTimestamp: {
									_gt: "2020-01-01T00:00:00.000000000Z"
								}
							}
							limit: $limit
							cursor: $cursor
							blockchain: ALL
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
							filter: {
								castedBy: {
									_in: [$userId]
								}
							}
							limit: $limit
							cursor: $cursor
							blockchain: ALL
						}
					) {
						Cast {
							...FarcasterCast
						}
						pageInfo {
							hasPrevPage
							hasNextPage	
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
							filter: {
								hash: {
									_eq: $hash
								}
							}
							blockchain: ALL
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
