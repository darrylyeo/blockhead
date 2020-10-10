import { readable } from 'svelte/store';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { differenceInMilliseconds } from 'date-fns'
// import { graphql } from 'graphql';

const TRADES_QUERY = `subscription { trades { id price size aggressor buyer { id } seller { id } } }`;

const NUM_TRADES = 20;
const BUCKET_RESERVE = 0.5;
const TIME_SMOOTH_PERIOD = 40;
const DEFAULT_BLOCKTIME = 800;
const MARKET_DECIMALS = 5;    //TODO: get from market framework API

// convert string from API response with implied fixed decimals to a number
function apiDecimalStringToNumber(val, decimals) {
    return Number(val.slice(0, val.length - decimals) + '.' + val.slice(-decimals));
}

function takerId(trade) {
    return trade.aggressor === 'SIDE_BUY' ? trade.buyer.id : (trade.aggressor === 'SIDE_SELL' ? trade.seller.id : null);
}
function makerId(trade) {
    return trade.aggressor === 'SIDE_BUY' ? trade.seller.id : (trade.aggressor === 'SIDE_SELL' ? trade.buyer.id : null);
}

export function recentTrades(filter, graphqlEndpoint) {
    return readable([], set => {
        let newTrades = [];
        let trades = [];
        let lastUpdate = null;
        let dripInterval = null;
        let blockTimeMA = DEFAULT_BLOCKTIME;

        function aggregate(trades) {
            const result = [];
            trades.forEach(trade => {
                trade.price = apiDecimalStringToNumber(trade.price, MARKET_DECIMALS);
                trade.size = Number(trade.size);
                trade.takerId = takerId(trade);
                trade.makerId = makerId(trade);
                let last = result.length > 0 ? result[result.length-1] : {};
                if (trade.takerId === last.takerId && trade.aggressor === last.aggressor) {
                    last.trades.push(trade);
                    last.size += trade.size;
                } else {
                    result.push({
                        size: trade.size,
                        aggressor: trade.aggressor,
                        takerId: trade.takerId,
                        trades: [trade],
                        id: trade.id
                    })
                }
            });
            return result;
        }

        function drip() {
            const tx = newTrades.shift();
            if (newTrades.length === 0) console.log('Trade bucket empty!');
            if (!filter || filter(tx)) {
                trades = trades.concat(tx).slice(-1 * NUM_TRADES);
                set(trades);
            }
            if (dripInterval !== null && newTrades.length === 0) clearInterval(dripInterval);
        }

        const client = new SubscriptionClient(graphqlEndpoint, { reconnect: true });
        const req = client.request({ query: TRADES_QUERY }).subscribe({
            next(res) { 
                if (res && res.data && res.data.trades) {
                    const updateTime = new Date();
                    let blockTime = lastUpdate ? differenceInMilliseconds(updateTime, lastUpdate) : DEFAULT_BLOCKTIME;
                    blockTimeMA = blockTimeMA === 0 
                        ? blockTime 
                        : ((TIME_SMOOTH_PERIOD * blockTimeMA) + blockTime) / (TIME_SMOOTH_PERIOD + 1);
                    lastUpdate = updateTime
                    console.log(`Received ${res.data.trades.length} trades (${blockTime}ms)`);
                    newTrades = newTrades.concat(aggregate(res.data.trades));
                    let timeBetweenDrips = blockTimeMA / ((1 - BUCKET_RESERVE) * newTrades.length)
                    if (dripInterval !== null) clearInterval(dripInterval);
                    console.log(`Moving average blocktime = ${blockTimeMA}, drip every = ${timeBetweenDrips}, bucket size = ${newTrades.length}`);
                    dripInterval = setInterval(drip, timeBetweenDrips);
                }
            },
            error(e) {
                console.error('GraphQL error:', e);
            },
            complete() {
                console.log('GraphQL request finished.');
            }
        })

        return function stop() {
            req.unsubscribe();
            if (dripInterval !== null) {
                clearInterval(dripInterval);
                dripInterval = null;
            }
        };
    }); 
}