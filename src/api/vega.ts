import { readable } from 'svelte/store'
import { gql, NormalizedCacheObject } from '@apollo/client/core'
import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client/core'
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'


const VEGA_NODE_URL = 'lb.n.vega.xyz' // 'n06.n.vega.xyz'


// Everything must be lazy instantiated; web sockets are incompatible with Sapper SSR

let client: ApolloClient<NormalizedCacheObject>
function getVegaClient(){
	return client || (
		client = new ApolloClient({
			cache: new InMemoryCache({
				// possibleTypes: {
				// 	AssetSource: ['BuiltinAsset', 'ERC20'],
				// }

				// typePolicies: {
				// 	Trade: {
				// 		fields: {
				// 			market: {
				// 				merge(existing, incoming, { mergeObjects }) {
				// 					console.log('merge', existing, incoming)
				// 					return mergeObjects(existing, incoming);
				// 				},
				// 			}
				// 		}
				// 	}
				// }
			}),

			// Use Web Socket link for subscriptions, and regular HTTPS link for queries
			// https://www.apollographql.com/docs/react/data/subscriptions/#3-use-different-transports-for-different-operations
			link: split(
				({ query }) => {
					const definition = getMainDefinition(query)
					return (
						definition.kind === 'OperationDefinition' &&
						definition.operation === 'subscription'
					)
				},
				new WebSocketLink({
					uri: `wss://${VEGA_NODE_URL}/query`,
					options: {
						reconnect: true
					}
				}),
				new HttpLink({
					uri: `https://${VEGA_NODE_URL}/query`
				}),
			)
		})
	)
}


// GraphQL Reference:
// https://docs.ethonline.vega.xyz/graphql/market.doc.html
export namespace Vega {
	type Int = number
	type String = string

	export type MarketID = String
	export type Market = {
		id: MarketID
		name: String
		tradableInstrument: TradableInstrument
		decimalPlaces: Int
	}

	type TradableInstrument = {
		instrument: Instrument
	}
	type Instrument = {
		name: String
		baseName: String
		quoteName: String
		product: Product
	}

	type Product = Future
	type Future = {
		maturity: String
		asset: Asset
		oracle: Oracle
	}

	export type AssetID = String
	export type Asset = {
		id: AssetID
		name: String
		symbol: String
		totalSupply: String
		decimals: Int
		source: AssetSource
		infrastructureFeeAccount: Account
	}

	type AssetSource = BuiltinAsset | ERC20
	type BuiltinAsset = {
		id: String
		name: String
		symbol: String
		totalSupply: String
		decimals: Int
		maxFaucetAmountMint: String
	}
	type ERC20 = {
		contractAddress: String
	}

	type Account = {
		balance: String
		asset: Asset
		type: AccountType
		market: Market
	}
	type AccountType = 'Insurance' | 'Settlement' | 'Margin' | 'General' | 'FeeInfrastructure' | 'FeeLiquidity' | 'LockWithdraw'

	type Oracle = EthereumEvent
	type EthereumEvent = {
		contractId: String
		event: String
	}

	type PartyID = String
	type Party = {
		id: PartyID
	}

	export type Side = 'SIDE_BUY' | 'SIDE_SELL' | 'NONE'

	export type TradeID = String
	export type Trade = {
		id: TradeID
		market: Market
		buyer: Party
		seller: Party
		aggressor: Side
		price: Int
		size: Int
		createdAt: Date

		takerId: PartyID
		makerId: PartyID
	}

	export type TransactionID = TradeID
	export type Transaction = {
		id: TransactionID
		market: Market
		price: Int
		size: Int
		aggressor: Side
		takerId: PartyID
		trades: Trade[]
	}
}

export const makerAction: Record<Vega.Side, string> = {
	SIDE_BUY: 'bought',
	SIDE_SELL: 'sold',
	NONE: 'traded' // auction or similar
}
export const takerAction: Record<Vega.Side, string> = {
	SIDE_BUY: 'sold',
	SIDE_SELL: 'bought',
	NONE: 'traded' // auction or similar
}


const ASSETS_QUERY = gql`
	query VegaAssets {
		assets {
			id
			name
			symbol
			totalSupply
			decimals
			source {
				... on BuiltinAsset {
					id
					name
					symbol
					totalSupply
					decimals
					maxFaucetAmountMint
				}
				... on ERC20 {
					contractAddress
				}
			}
			infrastructureFeeAccount {
				balance
				asset { id }
				type
				market { id }
			}
		}
	}
`

const MARKETS_QUERY = gql`
	query VegaMarkets {
		markets {
			id
			name
			tradableInstrument {
				instrument {
					id
					name
					baseName
					quoteName
					product {
						... on Future {
							maturity
							asset { id }
							oracle {
								... on EthereumEvent { contractId event }
							}
						}
					}
				}
			}
			decimalPlaces
		}
	}
`

const RECENT_TRADES_QUERY = gql`
	subscription VegaRecentTrades {
		trades {
			id
			market { id }
			buyer { id }
			seller { id }
			aggressor
			price
			size
			createdAt
		}
	}
`

const RECENT_TRADES_FOR_MARKET_QUERY = gql`
	subscription VegaRecentTradesForMarket($marketId: String) {
		trades(marketId: $marketId) {
			id
			market { id, decimalPlaces }
			buyer { id }
			seller { id }
			aggressor
			price
			size
			createdAt
		}
	}
`


let getVegaAssetsPromise: Promise<Record<Vega.AssetID, Vega.Asset>>
export const getVegaAssets = () => getVegaAssetsPromise || (getVegaAssetsPromise =
	getVegaClient().query({query: ASSETS_QUERY})
		.then(result => {
			const assets: Vega.Asset[] = result?.data?.assets
			console.log('Vega Assets', assets)

			const assetsByID: Record<Vega.AssetID, Vega.Asset> = {}
			for(const asset of assets)
				assetsByID[asset.id] = asset

			return assetsByID
		})
)


let getVegaMarketsPromise: Promise<Record<Vega.MarketID, Vega.Market>>
export const getVegaMarkets = () => getVegaMarketsPromise || (getVegaMarketsPromise =
	getVegaClient().query({query: MARKETS_QUERY})
		.then(async result => {
			const markets: Vega.Market[] = result?.data?.markets

			// const assets = await getVegaAssets()
			// for(const market of markets){
			// 	console.log(market.tradableInstrument.instrument.product.asset)
			// 	market.tradableInstrument.instrument.product.asset = assets[market.tradableInstrument.instrument.product.asset.id]
			// }

			const marketsByID: Record<Vega.MarketID, Vega.Market> = {}
			for(const market of markets)
				marketsByID[market.id] = market

			return marketsByID
		})
)


// convert string from API response with implied fixed decimals to a number
function formatDecimal(value, decimalPlaces) {
	return value * 0.1 ** decimalPlaces
}

// Aggregate trades with the same aggressor into transactions
function aggregateTrades(trades: Vega.Trade[]) {
	const transactions: Vega.Transaction[] = []
	for(const trade of trades){
		const taker = trade.aggressor === 'SIDE_BUY' ? trade.buyer : trade.seller
		const maker = trade.aggressor === 'SIDE_BUY' ? trade.seller : trade.buyer

		trade.price = formatDecimal(trade.price, trade.market.decimalPlaces)
		trade.size = Number(trade.size)

		trade.createdAt = new Date(trade.createdAt)
		trade.takerId = taker.id
		trade.makerId = maker.id

		const last = transactions[transactions.length - 1]
		if (last && trade.takerId === last.takerId && trade.aggressor === last.aggressor) {
			// Add to last transaction
			last.trades.push(trade)
			last.size += trade.size
		} else {
			// New transaction
			transactions.push({
				id: trade.id,
				market: trade.market,
				price: trade.price,
				size: trade.size,
				aggressor: trade.aggressor,
				takerId: trade.takerId,
				trades: [trade],
			})
		}
	}
	return transactions
}



const BUFFER_RESERVE_RATIO = 0.0 // 0.5
const TIME_SMOOTH_PERIOD = 40
const DEFAULT_BLOCKTIME = 800

export function recentTransactionsStream(marketId = 'all', filter, limit = 20) {
	return readable<Vega.Transaction[]>([], set => {
		const subscription = getVegaClient().subscribe(
			marketId === 'all' ? {
				query: RECENT_TRADES_QUERY
			} : {
				query: RECENT_TRADES_FOR_MARKET_QUERY,
				variables: { marketId },
				// fetchPolicy: 'cache-first'
			}
		).subscribe({
			async next(result) {
				const newTrades = result?.data?.trades

				const markets = await getVegaMarkets()
				console.log('result?.data', result?.data)
				console.log('markets', markets)
				for(const trade of newTrades){
					console.log(trade.market, trade.market.decimalPlaces)
					trade.market = markets[trade.market.id]
				}

				if(newTrades?.length)
					onNewTrades(newTrades)
			},
			error(e) {
				console.error('GraphQL error:', e)
			},
			complete() {
				console.log('GraphQL request finished.')
			}
		})


		// Buffer to emit transactions one by one over time
		const buffer: Vega.Transaction[] = []
		let lastTime = Date.now()
		let tradesPerMinute
		let smoothedElapsedTime = 0 // Moving average elapsed time between updates

		function onNewTrades(newTrades: Vega.Trade[]){
			const currentTime = Date.now()
			let elapsedTime = currentTime ? currentTime - lastTime : DEFAULT_BLOCKTIME
			lastTime = currentTime
			
			smoothedElapsedTime = smoothedElapsedTime === 0 
				? elapsedTime
				: ((TIME_SMOOTH_PERIOD * smoothedElapsedTime) + elapsedTime) / (TIME_SMOOTH_PERIOD + 1)
				
			tradesPerMinute = newTrades.length / (elapsedTime / 1000 / 60)
			console.log(`${newTrades.length} new trades in the last ${elapsedTime}ms (${tradesPerMinute} trades per minute)`)

			buffer.push(...aggregateTrades(newTrades))

			emitOverTime()
		}

		let isRunning = false
		async function emitOverTime(){
			if(isRunning)
				return

			isRunning = true
			while(isRunning && buffer.length){
				emit(buffer.shift())

				const waitTime = smoothedElapsedTime / ((1 - BUFFER_RESERVE_RATIO) * buffer.length)
				console.log(`Average elapsed time = ${smoothedElapsedTime}, drip every = ${waitTime}, remaining in buffer = ${buffer.length}`)

				const startTime = Date.now()
				if(waitTime > 2)
					while(Date.now() < startTime + waitTime)
						await new Promise(r => requestAnimationFrame(r))
			}
			isRunning = false
		}


		let recentTransactions = []
		function emit(transaction: Vega.Transaction){
			if (!filter || filter(transaction)) {
				recentTransactions = [...recentTransactions, transaction].slice(-limit)
				set(recentTransactions)
			}
		}

		return () => {
			subscription.unsubscribe()
			isRunning = false
		}
	}) 
}