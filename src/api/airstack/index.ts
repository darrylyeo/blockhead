// Types/constants
import type { Ethereum } from '$/data/networks/types'

export const airstackNetworkNames = {
	1: 'ethereum',
	137: 'polygon',
	8453: 'base',
	7777777: 'zora',
} as Record<Ethereum.ChainID, string>


// gql.tada
import { initGraphQLTada } from 'gql.tada'
import type { introspection } from './graphql-env'
const graphql = initGraphQLTada<{
	introspection: introspection,
}>()


// urql
import { Client, fetchExchange } from '@urql/svelte'
import { env } from '$/env'

const client = new Client({
	url: 'https://api.airstack.xyz/gql',
	exchanges: [
		fetchExchange,
	],
	fetchOptions: () => ({
		headers: {
			authorization: env.AIRSTACK_API_KEY,
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
