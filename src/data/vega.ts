import { readable } from 'svelte/store'
import { SubscriptionClient } from 'subscriptions-transport-ws'
// import { graphql } from 'graphql'

export namespace Vega {
    type TraderID = string
    type Trader = {
        id: TraderID
    }

    type Aggressor = 'SIDE_BUY' | 'SIDE_SELL'

    export type TradeID = string
    export type Trade = {
        id: TradeID
        price: number
        size: number
        aggressor: Aggressor
        buyer: Trader
        seller: Trader
        takerId: TraderID
        makerId: TraderID
    }

    export type TransactionID = TradeID
    export type Transaction = {
        id: TransactionID
        size: number
        aggressor: Aggressor,
        takerId: TraderID,
        trades: Trade[],
    }
}

const TRADES_QUERY = `
    subscription {
        trades { id price size aggressor buyer { id } seller { id } }
    }
`

const SHOW_MAX_TRADES = 20
const BUFFER_RESERVE_RATIO = 0.0 // 0.5
const TIME_SMOOTH_PERIOD = 40
const MARKET_DECIMALS = 5    //TODO: get from market framework API
const DEFAULT_BLOCKTIME = 800

// convert string from API response with implied fixed decimals to a number
function formatDecimal(val, decimals) {
    return Number(val.slice(0, val.length - decimals) + '.' + val.slice(-decimals))
}

export function recentTransactionsStream(graphqlEndpoint, filter) {
    return readable<Vega.Transaction[]>([], set => {
        function aggregate(trades: Vega.Trade[]) {
            const transactions: Vega.Transaction[] = []
            for(const trade of trades){
                const taker = trade.aggressor === 'SIDE_BUY' ? trade.buyer : trade.seller
                const maker = trade.aggressor === 'SIDE_BUY' ? trade.seller : trade.buyer

                trade.price = formatDecimal(trade.price, MARKET_DECIMALS)
                trade.size = Number(trade.size)
                trade.takerId = taker.id
                trade.makerId = maker.id

                const last = transactions[transactions.length-1]
                if (last && trade.takerId === last.takerId && trade.aggressor === last.aggressor) {
                    // Add to last transaction
                    last.trades.push(trade)
                    last.size += trade.size
                } else {
                    // New transaction
                    transactions.push({
                        id: trade.id,
                        size: trade.size,
                        aggressor: trade.aggressor,
                        takerId: trade.takerId,
                        trades: [trade],
                    })
                }
            }
            return transactions
        }

        const streamBuffer: Vega.Transaction[] = []
        let trades = []
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

            streamBuffer.push(...aggregate(newTrades))

            smoothShowNewTrades()
        }

        let isRunning = false
        async function smoothShowNewTrades(){
            if(isRunning)
                return

            isRunning = true
            while(isRunning && streamBuffer.length){
                const tx = streamBuffer.shift()
                if (!filter || filter(tx)) {
                    trades = [...trades, tx].slice(-SHOW_MAX_TRADES)
                    set(trades)
                }

                const waitTime = smoothedElapsedTime / ((1 - BUFFER_RESERVE_RATIO) * streamBuffer.length)
                console.log(`Average elapsed time = ${smoothedElapsedTime}, drip every = ${waitTime}, remaining in buffer = ${streamBuffer.length}`)

                // if(waitTime <= 30)
                //     await new Promise(r => requestAnimationFrame(r))
                // if(streamBuffer.length >= 60){
                //     await new Promise(r => requestAnimationFrame(r))
                // }
                // else if(streamBuffer.length >= 30){
                //     await new Promise(r => requestAnimationFrame(r))
                //     await new Promise(r => requestAnimationFrame(r))
                // }
                // else
                //     await new Promise(r => setInterval(r, waitTime))

                const startTime = Date.now()
                while(Date.now() < startTime + waitTime)
                    await new Promise(r => requestAnimationFrame(r))
            }
            isRunning = false
        }

        const client = new SubscriptionClient(graphqlEndpoint, { reconnect: true })
        const req = client.request({ query: TRADES_QUERY }).subscribe({
            next(res) { 
                const newTrades = res?.data?.trades
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

        return function stop() {
            req.unsubscribe()
            isRunning = false
        }
    }) 
}