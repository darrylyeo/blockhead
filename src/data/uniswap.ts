import { readable } from 'svelte/store'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { THE_GRAPH_UNISWAP_API_URL } from '../config'


// Lazy instantiate (incompatible with Sapper SSR)
let client
function getClient(){
	return client || (
		client = new SubscriptionClient(THE_GRAPH_UNISWAP_API_URL, { reconnect: true })
	)
}


// GraphQL Reference:
// https://thegraph.com/docs/graphql-api#schema
export namespace Uniswap {
	export type Transaction = {

	}
}


const TRADES_QUERY = `
	subscription {
		uniswapFactories(first: 5) {
			id
			pairCount
			pairs {
			id
			}
			totalVolumeUSD
		}
		tokens(first: 5) {
			id
			symbol
			name
			decimals
		}
	}
`


export function recentTransactionsStream(filter, limit = 20) {
	return readable<Uniswap.Transaction[]>([], set => {
		const request = getClient().request({ query: TRADES_QUERY }).subscribe({
			next(res) { 
				const newTrades = res?.data?.tokens
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

		const onNewTrades = console.log
	})
}