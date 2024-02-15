import { Client, cacheExchange, fetchExchange, gql } from '@urql/svelte'

import { env } from '$/env'


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


import type { Ethereum } from '$/data/networks/types'

export const airstackNetworkNames = {
	1: 'ethereum',
	137: 'polygon',
	8453: 'base',
	7777777: 'zora',
} as Record<Ethereum.ChainID, string>


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

	return await getClient().query(gql`
		query TokenBalances(
			$address: Identity!, 
			$blockchain: TokenBlockchain!, 
			$limit: Int!, 
			$cursor: String!
		) {
			TokenBalances(
				input: {
					filter: {
						owner: {_in: [$address]},
						tokenType: { _in: [ERC20] }
					},
					blockchain: $blockchain,
					limit: $limit,
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
	`, {
		address,
		blockchain: airstackNetworkNames[network.chainId],
		limit,
		cursor,
	})
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

	return await getClient().query(gql`
		query NftBalances(
			$address: Identity!, 
			$blockchain: TokenBlockchain!, 
			$limit: Int!, 
			$cursor: String!
		) {
			TokenBalances(
				input: {
					filter: {
						owner: {_in: [$address]},
						tokenType: { _in: [ERC721, ERC1155] }
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
	`,
	{
		address,
		blockchain: airstackNetworkNames[network.chainId],
		limit,
		cursor,
	})
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
}: {
	address: Ethereum.Address,
	network: Ethereum.Network,
}) => {
	if(!(network.chainId in airstackNetworkNames))
		throw new Error(`Airstack doesn't yet support ${network.name}.`)

	const client = getClient()

	const limit = 200
	let nftsCount = 0
	let cursor = ''

	while(true){
		const result = await client.query(
			gql`
				query NftBalances(
					$address: Identity!,
					$blockchain: TokenBlockchain!,
					$limit: Int!,
					$cursor: String!
				) {
					TokenBalances(
						input: {
							filter: {
								owner: {_in: [$address]},
								tokenType: { _in: [ERC721, ERC1155] }
							},
							blockchain: $blockchain,
							limit: $limit,
							cursor: $cursor
						}
					) {
						pageInfo {
							nextCursor
						}
					}
				}
			`,
			{
				address,
				blockchain: airstackNetworkNames[network.chainId],
				limit,
				cursor,
			}
		)
			.toPromise()
			.then(result => {
				if(result.error)
					throw result.error
	
				return result.data
			})

		if(result?.TokenBalances.pageInfo.nextCursor){
			nftsCount += limit
			cursor = result.TokenBalances.pageInfo.nextCursor
		}

		else {
			const result = await client.query(
				gql`
					query NftBalances(
						$address: Identity!,
						$blockchain: TokenBlockchain!,
						$limit: Int!,
						$cursor: String!
					) {
						TokenBalances(
							input: {
								filter: {
									owner: {_in: [$address]},
									tokenType: { _in: [ERC721, ERC1155] }
								},
								blockchain: $blockchain,
								limit: $limit,
								cursor: $cursor
							}
						) {
							TokenBalance {
								id
							}
						}
					}
				`,
				{
					address,
					blockchain: airstackNetworkNames[network.chainId],
					limit,
					cursor,
				}
			)
				.toPromise()
				.then(result => {
					if(result.error)
						throw result.error
		
					return result.data
				})

			return nftsCount + (result?.TokenBalances.TokenBalance.length as number ?? 0)
		}
	}
}
