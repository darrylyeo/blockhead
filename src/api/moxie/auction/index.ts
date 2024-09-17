/**
 * Moxie Auction GraphQL API
 * @link https://developer.moxie.xyz/api/auction/overview
 */


// Types/constants
export const graphqlEndpoints = [
	{
		label: 'Base',
		chainId: 8453,
		endpoint: 'https://api.studio.thegraph.com/query/23537/moxie_auction_stats_mainnet/version/latest',
	},
] as const satisfies {
	label: string,
	chainId: number,
	endpoint: string,
}[]


// gql.tada
import { initGraphQLTada } from 'gql.tada'

import type { introspection } from './graphql-env.ts'

const graphql = initGraphQLTada<{
	introspection: introspection,
}>()


// urql
import { Client, cacheExchange, fetchExchange } from '@urql/svelte'
import type { Ethereum } from '$/data/networks/types.js'
import { handleUrqlResult } from '$/utils/urql.js'

const clients = new Map<Ethereum.ChainId, Client>()

export const getClient = ({
	chainId,
}: {
	chainId: Ethereum.ChainId
}) => {
	if(clients.has(chainId))
		return clients.get(chainId)!

	const endpointUrl = graphqlEndpoints.find(e => e.chainId === chainId)?.endpoint

	if(!endpointUrl)
		throw new Error(`Moxie does not yet support chain ID ${chainId}.`)

	const client = new Client({
		url: endpointUrl,
		exchanges: [
			cacheExchange,
			fetchExchange,
		],
	})

	clients.set(chainId, client)

	return client
}

// Fragments
export const Token = graphql(`
	fragment Token on Token @_unmask {
		id
		symbol
		decimals
	}
`)

export const BlockInfo = graphql(`
	fragment BlockInfo on BlockInfo @_unmask {
		id
		hash
		blockNumber
		timestamp
	}
`)

export const User = graphql(`
	fragment User on User @_unmask {
		id
		address
		totalMoxieBid
	}
`)

export const Order = graphql(`
	fragment Order on Order @_unmask {
		id
		sellAmount
		buyAmount
		price
		volume
		timestamp
		auctionId
		auction {
			id
			auctionId
			auctioningToken {
				...Token
			}
			biddingToken {
				...Token
			}
		}
		user {
			...User
		}
		userWalletAddress
		status
		txHash
		blockInfo {
			...BlockInfo
		}
		isExactOrder
		encodedOrderId
		lastUpdatedIndex
		finalizedBuyAmount
		finalizedSellAmount
		refundAmount
		finalTxHash
	}
`, [
	Token,
	User,
	BlockInfo,
])

export const AuctionDetail = graphql(`
	fragment AuctionDetail on AuctionDetail @_unmask {
		id
		auctionId
		exactOrder {
			...Order
		}
		highestPriceBidOrder {
			...Order
		}
		lowestPriceBidOrder {
			...Order
		}
		auctioningToken {
			...Token
		}
		biddingToken {
			...Token
		}
		auctionEndDate
		orderCancellationEndDate
		startingTimeStamp
		minimumBiddingAmountPerOrder
		minFundingThreshold
		minBuyAmount
		auctionSupply
		allowListManager
		allowListSigner
		currentVolume
		volumeClearingPriceOrder
		currentClearingOrderSellAmount
		currentClearingOrderBuyAmount
		currentClearingOrderUserId
		currentClearingPrice
		currentBiddingAmount
		currentSubjectTokenBidAmount
		currentClearingOrderId
		isAtomicClosureAllowed
		isPrivateAuction
		interestScore
		uniqueBidders
		isCleared
		totalOrders
		activeOrderCount
		txHash
		blockInfo {
			...BlockInfo
		}
		minimumPriceInMoxie
	}
`, [
	BlockInfo,
	Order,
	Token,
])


// Queries
export const getAuctions = async ({
	chainId,
	skip = 0,
	first = 100,
	orderBy = 'auctionEndDate',
	orderDirection = 'desc',
}: {
	chainId: number,
	skip: number,
	first: number,
	orderBy: 'auctionEndDate',
	orderDirection: 'asc' | 'desc',
}) => (
	await getClient({ chainId })
		.query(
			graphql(`
				query AuctionDetails(
					$skip: Int!
					$first: Int!
					$orderBy: AuctionDetail_orderBy!
					$orderDirection: OrderDirection!
				) {
					auctionDetails(
						skip: $skip
						first: $first
						orderBy: $orderBy
						orderDirection: $orderDirection
					) {
						...AuctionDetail
					}
				}
			`, [
				AuctionDetail,
			]),
			{
				skip,
				first,
				orderBy,
				orderDirection,
			},
		)
		.toPromise()
		.then(handleUrqlResult)
)

export const getAuction = async ({
	chainId,
	auctionId,
}: {
	chainId: number,
	auctionId: string,
}) => (
	await getClient({ chainId })
		.query(
			graphql(`
				query AuctionDetails(
					$auctionId: ID!
				) {
					auctionDetail(
						id: $auctionId
					) {
						...AuctionDetail
					}
				}
			`, [
				AuctionDetail,
			]),
			{
				auctionId,
			},
		)
		.toPromise()
		.then(handleUrqlResult)
)

export const getOrders = async ({
	chainId,
	filter,
	skip = 0,
	first = 100,
	orderBy = 'timestamp',
	orderDirection = 'desc',
}: {
	chainId: number
	filter: {
		auctionId?: string
		userId?: string
	}
	skip: number
	first: number
	orderBy: 'timestamp' | 'price'
	orderDirection: 'asc' | 'desc'
}) => (
	await getClient({ chainId })
		.query(
			graphql(`
				query Orders(
					$skip: Int!
					$first: Int!
					$orderBy: Order_orderBy!
					$orderDirection: OrderDirection!
					$where: Order_filter
				) {
					orders(
						skip: $skip
						first: $first
						orderBy: $orderBy
						orderDirection: $orderDirection
						where: $where
					) {
						...Order
					}
				}
			`, [
				Order,
			]),
			{
				skip,
				first,
				orderBy,
				orderDirection,
				where: {
					...filter?.auctionId && {
						auction_: {
							id: filter.auctionId,
						},
					},
					...filter?.userId && {
						user_: {
							id: filter.userId,
						},
					},
				},
			},
		)
		.toPromise()
		.then(handleUrqlResult)
)

export const getOrder = async ({
	chainId,
	orderId,
}: {
	chainId: number,
	orderId: string,
}) => (
	await getClient({ chainId })
		.query(
			graphql(`
				query Order(
					$orderId: ID!
				) {
					order(
						id: $orderId
					) {
						...Order
					}
				}
			`, [
				Order,
			]),
			{
				orderId,
			},
		)
		.toPromise()
		.then(handleUrqlResult)
)
