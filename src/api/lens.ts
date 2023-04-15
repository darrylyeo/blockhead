import type { Ethereum } from '../data/networks/types'

export enum LensInstance {
	Polygon = 'Polygon',
	PolygonMumbai = 'PolygonMumbai',
	SandboxPolygonMumbai = 'SandboxPolygonMumbai',
}

export const lensInstances = {
	[LensInstance.Polygon]: {
		chainId: 137,
		apiUrl: 'https://api.lens.dev',
	},
	[LensInstance.PolygonMumbai]: {
		chainId: 80001,
		apiUrl: 'https://api-mumbai.lens.dev',
	},
	[LensInstance.SandboxPolygonMumbai]: {
		chainId: 80001,
		apiUrl: 'https://api-sandbox-mumbai.lens.dev',
	},
}


import type { BrandedString } from '../utils/branded'

export type LensName = BrandedString<`${string}.${'lens' | 'test'}`>

export type LensProfile = {}


import { Client, cacheExchange, fetchExchange, gql } from '@urql/svelte'

const clients: Partial<Record<LensInstance, Client>> = {}

export const getClient = ({
	instance = LensInstance.Polygon
}: {
	instance?: LensInstance
}) => clients[instance] ||= (
	new Client({
		url: lensInstances[instance].apiUrl,
		exchanges: [
			cacheExchange,
			fetchExchange,
		],
	})
)


export const getProfileByLensName = async ({
	instance,
	lensName,
}: {
	instance?: LensInstance,
	lensName: LensName,
}) => (
	await getClient({ instance }).query(gql`
		query Profile($handle: Handle!) {
			profile(request: { handle: $handle }) {
				id
				name
				bio
				attributes {
					displayType
					traitType
					key
					value
				}
				followNftAddress
				metadata
				isDefault
				picture {
					... on NftImage {
						contractAddress
						tokenId
						uri
						verified
					}
					... on MediaSet {
						original {
							url
							mimeType
						}
					}
					__typename
				}
				handle
				coverPicture {
					... on NftImage {
						contractAddress
						tokenId
						uri
						verified
					}
					... on MediaSet {
						original {
							url
							mimeType
						}
					}
					__typename
				}
				ownedBy
				dispatcher {
					address
					canUseRelay
				}
				stats {
					totalFollowers
					totalFollowing
					totalPosts
					totalComments
					totalMirrors
					totalPublications
					totalCollects
				}
				followModule {
					... on FeeFollowModuleSettings {
						type
						amount {
							asset {
								symbol
								name
								decimals
								address
							}
							value
						}
						recipient
					}
					... on ProfileFollowModuleSettings {
						type
					}
					... on RevertFollowModuleSettings {
						type
					}
				}
			}
		}
	`, {
		handle: lensName
	})
)

export const generateChallenge = async ({
	instance,
	address,
}: {
	instance?: LensInstance,
	address: Ethereum.Address,
}) => (
	await getClient({ instance }).query(gql`
		query Challenge($address: EthereumAddress!) {
			challenge(request: { address: $address }) {
				text
			}
		}
	`, {
		address
	})
)


export const authenticate = async ({
	instance,
	address,
	signature,
}: {
	instance?: LensInstance,
	address: Ethereum.Address,
	signature: string,
}) => (
	await getClient({ instance }).mutation(gql`
		mutation Authenticate(
			$address: EthereumAddress!
			$signature: Signature!
		) {
			authenticate(request: {
				address: $address,
				signature: $signature
			}) {
				accessToken
				refreshToken
			}
		}
	`, {
		address,
		signature,
	})
)


export const getProfilesOwnedByAddress = async ({
	instance,
	address,
	limit = 50,
}: {
	instance?: LensInstance,
	address: Ethereum.Address,
	limit?: number,
}) => (
	await getClient({ instance }).query(gql`
		query Profiles(
			$address: EthereumAddress!
			$limit: LimitScalar!
		) {
			profiles(request: { ownedBy: [$address], limit: $limit }) {
				items {
					id
					name
					bio
					attributes {
						displayType
						traitType
						key
						value
					}
					followNftAddress
					metadata
					isDefault
					picture {
						... on NftImage {
							contractAddress
							tokenId
							uri
							verified
						}
						... on MediaSet {
							original {
								url
								mimeType
							}
						}
						__typename
					}
					handle
					coverPicture {
						... on NftImage {
							contractAddress
							tokenId
							uri
							verified
						}
						... on MediaSet {
							original {
								url
								mimeType
							}
						}
						__typename
					}
					ownedBy
					dispatcher {
						address
						canUseRelay
					}
					stats {
						totalFollowers
						totalFollowing
						totalPosts
						totalComments
						totalMirrors
						totalPublications
						totalCollects
					}
					followModule {
						... on FeeFollowModuleSettings {
							type
							amount {
								asset {
									symbol
									name
									decimals
									address
								}
								value
							}
							recipient
						}
						... on ProfileFollowModuleSettings {
							type
						}
						... on RevertFollowModuleSettings {
							type
						}
					}
				}
				pageInfo {
					prev
					next
					totalCount
				}
			}
		}
	`, {
		address,
		limit,
	})
)
