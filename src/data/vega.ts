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

export function recentTransactionsStream(graphqlEndpoint, filter) {
    return readable([], set => {
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

        let newTransactionsBuffer = [];
        let transactions = [];
        let currentTime = null;
        let timeElapsedMA = DEFAULT_BLOCKTIME;

        function onNewTransactions(newTransactions){
            const newTime = new Date();
            let timeElapsed = currentTime ? differenceInMilliseconds(newTime, currentTime) : DEFAULT_BLOCKTIME;
            timeElapsedMA = timeElapsedMA === 0 
                ? timeElapsed 
                : ((TIME_SMOOTH_PERIOD * timeElapsedMA) + timeElapsed) / (TIME_SMOOTH_PERIOD + 1);
            currentTime = newTime
            console.log(`Received ${newTransactions.length} trades (${timeElapsed}ms)`);

            newTransactionsBuffer.push(...aggregate(newTransactions));

            showNewTransactions()
        }

        let showingNewTransactions = false
        async function showNewTransactions(){
            if(showingNewTransactions)
                return

            showingNewTransactions = true
            while(showingNewTransactions && newTransactionsBuffer.length){
                console.log(newTransactionsBuffer.length)

                const tx = newTransactionsBuffer.shift();
                if (!filter || filter(tx)) {
                    transactions = transactions.concat(tx).slice(-1 * NUM_TRADES);
                    set(transactions);
                }

                let timeBetweenDrips = timeElapsedMA / ((1 - BUCKET_RESERVE) * newTransactionsBuffer.length)
                console.log(`Moving average blocktime = ${timeElapsedMA}, drip every = ${timeBetweenDrips}, bucket size = ${newTransactionsBuffer.length}`);
                await new Promise(r => setInterval(r, timeBetweenDrips))
                // await new Promise(r => requestAnimationFrame(r))
            }
            showingNewTransactions = false
        }

        const client = new SubscriptionClient(graphqlEndpoint, { reconnect: true });
        const req = client.request({ query: TRADES_QUERY }).subscribe({
            next(res) { 
                const newTransactions = res?.data?.trades
                if(newTransactions?.length)
                    onNewTransactions(newTransactions)
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
            showingNewTransactions = false
        };
    }); 
}