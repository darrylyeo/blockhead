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
