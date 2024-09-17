// Types
import type { Ethereum } from '$/data/networks/types'

import type { FragmentOf } from 'gql.tada'
import type { MoxieToken, MoxieSubjectToken } from '..'

import type {
	Token,
	Order,
	AuctionDetail,
	BlockInfo,
	User,
} from '.'


export type MoxieBlockInfo = Pick<Ethereum.Block, 'network' | 'blockHash' | 'blockNumber' | 'timestamp'>

export type MoxieUser = {
	id: number
	address: string
	totalMoxieBid: bigint
}

export type MoxieOrder = {
	id: string
	sellAmount: bigint
	buyAmount: bigint
	price: number
	volume: bigint
	timestamp: number
	auctionId: string
	auction: Pick<MoxieAuction, 'id' | 'auctioningToken' | 'biddingToken'>
	user: MoxieUser
	userWalletAddress: string
	status: string
	txHash: string
	blockInfo: MoxieBlockInfo
	isExactOrder: boolean
	encodedOrderId: `0x${string}`
	lastUpdatedIndex: bigint
	finalizedBuyAmount: bigint
	finalizedSellAmount: bigint
	refundAmount: bigint
	finalTxHash: string | undefined
}

export type MoxieAuction = {
	id: string
	auctionId: string
	exactOrder: MoxieOrder | undefined
	highestPriceBidOrder: MoxieOrder | undefined
	lowestPriceBidOrder: MoxieOrder | undefined
	auctioningToken: MoxieSubjectToken
	biddingToken: MoxieToken
	auctionEndDate: number
	orderCancellationEndDate: number
	startingTimeStamp: number
	minimumBiddingAmountPerOrder: bigint
	minFundingThreshold: bigint
	minBuyAmount: bigint
	auctionSupply: bigint
	allowListManager: string
	allowListSigner: string
	currentVolume: bigint
	volumeClearingPriceOrder: bigint
	currentClearingOrderSellAmount: bigint
	currentClearingOrderBuyAmount: bigint
	currentClearingOrderUserId: string
	currentClearingPrice: number
	currentBiddingAmount: bigint
	currentSubjectTokenBidAmount: bigint
	currentClearingOrderId: string
	isAtomicClosureAllowed: boolean
	isPrivateAuction: boolean
	interestScore: number
	uniqueBidders: bigint
	isCleared: boolean
	totalOrders: bigint
	activeOrderCount: bigint
	txHash: string
	blockInfo: MoxieBlockInfo
	minimumPriceInMoxie: number
}


// Functions
export const normalizeToken = <
	T extends MoxieToken | MoxieSubjectToken
>(
	token: FragmentOf<typeof Token>,
	chainId: Ethereum.ChainId,
) => ({
	chainId,
	address: token.id as Ethereum.ContractAddress,
	symbol: token.symbol,
	decimals: Number(token.decimals),
} as T)

export const normalizeBlockInfo = (
	blockInfo: FragmentOf<typeof BlockInfo>,
): MoxieBlockInfo => ({
	id: blockInfo.id,
	blockHash: blockInfo.hash,
	blockNumber: BigInt(blockInfo.blockNumber),
	timestamp: Number(BigInt(blockInfo.timestamp)) * 1000,
})

export const normalizeUser = (
	user: FragmentOf<typeof User>,
): MoxieUser => ({
	id: Number(user.id),
	address: user.address,
	totalMoxieBid: BigInt(user.totalMoxieBid),
})

export const normalizeOrder = (
	order: FragmentOf<typeof Order>,
	chainId: Ethereum.ChainId,
): MoxieOrder => ({
	id: order.id,
	sellAmount: BigInt(order.sellAmount),
	buyAmount: BigInt(order.buyAmount),
	price: Number(order.price),
	volume: BigInt(order.volume * 10 ** Number(order.auction!.auctioningToken.decimals)),
	timestamp: Number(BigInt(order.timestamp)) * 1000,
	auctionId: Number(order.auctionId),
	auction: {
		id: order.auction!.id,
		auctioningToken: normalizeToken<MoxieSubjectToken>(order.auction!.auctioningToken, chainId),
		biddingToken: normalizeToken<MoxieToken>(order.auction!.biddingToken, chainId),
	},
	user: normalizeUser(order.user),
	userWalletAddress: order.userWalletAddress,
	status: order.status,
	txHash: order.txHash,
	blockInfo: normalizeBlockInfo(order.blockInfo),
	isExactOrder: order.isExactOrder,
	encodedOrderId: order.encodedOrderId,
	lastUpdatedIndex: BigInt(order.lastUpdatedIndex),
	finalizedBuyAmount: BigInt(order.finalizedBuyAmount),
	finalizedSellAmount: BigInt(order.finalizedSellAmount),
	refundAmount: BigInt(order.refundAmount),
	finalTxHash: order.finalTxHash,
})

export const normalizeAuction = (
	auction: FragmentOf<typeof AuctionDetail>,
	chainId: Ethereum.ChainId,
): MoxieAuction => ({
	id: auction.id,
	auctionId: auction.auctionId,
	exactOrder: (
		auction.exactOrder
			? normalizeOrder(auction.exactOrder, chainId)
			: undefined
	),
	highestPriceBidOrder: (
		auction.highestPriceBidOrder
			? normalizeOrder(auction.highestPriceBidOrder, chainId)
			: undefined
	),
	lowestPriceBidOrder: (
		auction.lowestPriceBidOrder
			? normalizeOrder(auction.lowestPriceBidOrder, chainId)
			: undefined
	),
	auctioningToken: normalizeToken<MoxieSubjectToken>(auction.auctioningToken, chainId),
	biddingToken: normalizeToken<MoxieToken>(auction.biddingToken, chainId),
	auctionEndDate: Number(auction.auctionEndDate) * 1000,
	orderCancellationEndDate: Number(auction.orderCancellationEndDate) * 1000,
	startingTimeStamp: Number(auction.startingTimeStamp) * 1000,
	minimumBiddingAmountPerOrder: BigInt(auction.minimumBiddingAmountPerOrder),
	minFundingThreshold: BigInt(auction.minFundingThreshold),
	minBuyAmount: BigInt(auction.minBuyAmount),
	auctionSupply: BigInt(auction.auctionSupply),
	allowListManager: auction.allowListManager,
	allowListSigner: auction.allowListSigner,
	currentVolume: BigInt(auction.currentVolume * 10 ** Number(auction.auctioningToken.decimals)),
	volumeClearingPriceOrder: BigInt(auction.volumeClearingPriceOrder),
	currentClearingOrderSellAmount: BigInt(auction.currentClearingOrderSellAmount),
	currentClearingOrderBuyAmount: BigInt(auction.currentClearingOrderBuyAmount),
	currentClearingOrderUserId: auction.currentClearingOrderUserId,
	currentClearingPrice: Number(auction.currentClearingPrice),
	currentBiddingAmount: BigInt(auction.currentBiddingAmount),
	currentSubjectTokenBidAmount: BigInt(auction.currentSubjectTokenBidAmount),
	currentClearingOrderId: auction.currentClearingOrderId,
	isAtomicClosureAllowed: auction.isAtomicClosureAllowed,
	isPrivateAuction: auction.isPrivateAuction,
	interestScore: Number(auction.interestScore),
	uniqueBidders: BigInt(auction.uniqueBidders),
	isCleared: auction.isCleared,
	totalOrders: BigInt(auction.totalOrders),
	activeOrderCount: BigInt(auction.activeOrderCount),
	txHash: auction.txHash,
	blockInfo: normalizeBlockInfo(auction.blockInfo),
	minimumPriceInMoxie: Number(auction.minimumPriceInMoxie),
})
