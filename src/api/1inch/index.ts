// Types/constants
export const SUPPORTED_CHAINS = [1, 137, 42161, 56, 43114, 250, 100, 10, 501] as const


// Context
import * as publicEnv from '$env/static/public'


// openapi-typescript-fetch
import { Fetcher } from 'openapi-typescript-fetch'

export type Paths = (
	& import('./balances/ethereum/api').paths
	& import('./balances/polygon/api').paths
	& import('./balances/arbitrum/api').paths
	& import('./balances/aurora/api').paths
	& import('./balances/avalanche/api').paths
	& import('./balances/base/api').paths
	& import('./balances/binance/api').paths
	& import('./balances/fantom/api').paths
	& import('./balances/gnosis/api').paths
	& import('./balances/linea/api').paths
	& import('./balances/optimism/api').paths
	& import('./balances/solana/api').paths
	& import('./swap/ethereum/api').paths
	& import('./swap/polygon/api').paths
	& import('./swap/arbitrum/api').paths
	& import('./swap/aurora/api').paths
	& import('./swap/avalanche/api').paths
	& import('./swap/binance/api').paths
	& import('./swap/fantom/api').paths
	& import('./swap/gnosis/api').paths
	& import('./swap/linea/api').paths
	& import('./swap/optimism/api').paths
	& import('./gas-prices/ethereum/api').paths
	& import('./gas-prices/polygon/api').paths
	& import('./gas-prices/arbitrum/api').paths
	& import('./gas-prices/aurora/api').paths
	& import('./gas-prices/avalanche/api').paths
	& import('./gas-prices/binance/api').paths
	& import('./gas-prices/fantom/api').paths
	& import('./gas-prices/gnosis/api').paths
	& import('./gas-prices/optimism/api').paths
	& import('./gas-prices/solana/api').paths
	& import('./spot-prices/arbitrum/api').paths
	& import('./spot-prices/aurora/api').paths
	& import('./spot-prices/avalanche/api').paths
	& import('./spot-prices/binance/api').paths
	& import('./spot-prices/fantom/api').paths
	& import('./spot-prices/gnosis/api').paths
	& import('./spot-prices/linea/api').paths
	& import('./spot-prices/optimism/api').paths
	& import('./spot-prices/polygon/api').paths
	& import('./spot-prices/solana/api').paths
	& import('./tx-broadcast/arbitrum/api').paths
	& import('./tx-broadcast/aurora/api').paths
	& import('./tx-broadcast/avalanche/api').paths
	& import('./tx-broadcast/binance/api').paths
	& import('./tx-broadcast/fantom/api').paths
	& import('./tx-broadcast/gnosis/api').paths
	& import('./tx-broadcast/optimism/api').paths
	& import('./tx-broadcast/polygon/api').paths
	& import('./tx-broadcast/solana/api').paths
	& import('./orderbook/ethereum/api').paths
	& import('./tokens/api').paths
	& import('./nft/api').paths
	& import('./charts/api').paths
	& import('./token-details/api').paths
	& import('./aggregation-2/api').paths
	& import('./balances-2/api').paths
	& import('./charts-2/api').paths
	& import('./fusion/orders-2/api').paths
	& import('./fusion/quoter-2/api').paths
	& import('./fusion/relayer-2/api').paths
	& import('./fusion-plus/orders-2/api').paths
	& import('./fusion-plus/quoter-2/api').paths
	& import('./fusion-plus/relayer-2/api').paths
	& import('./gas-prices-2/api').paths
	& import('./history-2/api').paths
	& import('./nft-2/api').paths
	& import('./orderbook-2/api').paths
	& import('./portfolio-2/api').paths
	& import('./spot-prices-2/api').paths
	& import('./tokens-2/api').paths
	& import('./traces-2/api').paths
	& import('./tx-broadcast-2/api').paths
	& import('./web3-2/api').paths
)

const services = {
	'/balances/': 'balance', '/allowances': 'balance',
	'/quote': 'swap', '/swap': 'swap', '/approve': 'swap', '/liquidity-sources': 'swap', '/tokens': 'swap',
	'/v1.5/': 'gas-price', '/v1.6/': 'gas-price',
	'/v1.1/': 'price',
	'/broadcast': 'tx-gateway',
	'/orders/': 'orderbook',
	'/token/': 'token',
	'/nft/': 'nft',
	'/chart/': 'charts',
	'/token-details/': 'token-details',
	'/history/': 'history',
	'/traces/': 'traces',
	'/portfolio/': 'portfolio'
}

const getBaseUrl = (path: string) => (
	path.includes('/sdk/') ?
		'https://api.1inch.dev'
	:
		`https://api.1inch.dev/${Object.entries(services).find(([key]) => path.includes(key))?.[1] ?? ''}`
)

export const fetcher = Fetcher.for<Paths>()

fetcher.configure({
	init: { headers: { 'Authorization': `Bearer ${publicEnv.PUBLIC_ONEINCH_API_KEY}` } },
	use: [async (url, init, next) => {
		const { pathname, search } = new URL(url)
		const response = await next(`${getBaseUrl(pathname)}${pathname}${search}`, init)
		if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`)
		return response.data
	}]
})

export const createClient = (apiKey: string = publicEnv.PUBLIC_ONEINCH_API_KEY) => ({
	baseUrl: 'https://api.1inch.dev',
	headers: {
		'Authorization': apiKey ? `Bearer ${apiKey}` : '',
		'Content-Type': 'application/json',
	},
	
	async fetchEndpoint<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
		const url = new URL(`${this.baseUrl}${endpoint}`)
		if (params) {
			Object.entries(params).forEach(([key, value]) => {
				url.searchParams.append(key, value)
			})
		}

		const response = await fetch(url.toString(), {
			headers: this.headers,
		})

		if (!response.ok) {
			throw new Error(`1inch API error: ${response.statusText}`)
		}

		return response.json()
	},
})


// Queries
export const balances = {
	1: fetcher.path('/v1.2/1/balances/{walletAddress}').method('get').create(),
	137: fetcher.path('/v1.2/137/balances/{walletAddress}').method('get').create(),
	42161: fetcher.path('/v1.2/42161/balances/{walletAddress}').method('get').create(),
	56: fetcher.path('/v1.2/56/balances/{walletAddress}').method('get').create(),
	43114: fetcher.path('/v1.2/43114/balances/{walletAddress}').method('get').create(),
	250: fetcher.path('/v1.2/250/balances/{walletAddress}').method('get').create(),
	100: fetcher.path('/v1.2/100/balances/{walletAddress}').method('get').create(),
	10: fetcher.path('/v1.2/10/balances/{walletAddress}').method('get').create(),
	501: fetcher.path('/v1.2/501/balances/{account}').method('get').create(),
}

export const swap = {
	1: {
		quote: fetcher.path('/v6.0/1/quote').method('get').create(),
		swap: fetcher.path('/v6.0/1/swap').method('get').create(),
		tokens: fetcher.path('/v6.0/1/tokens').method('get').create(),
	},
	137: {
		quote: fetcher.path('/v6.0/137/quote').method('get').create(),
		swap: fetcher.path('/v6.0/137/swap').method('get').create(),
		tokens: fetcher.path('/v6.0/137/tokens').method('get').create(),
	},
	42161: {
		quote: fetcher.path('/v6.0/42161/quote').method('get').create(),
		swap: fetcher.path('/v6.0/42161/swap').method('get').create(),
		tokens: fetcher.path('/v6.0/42161/tokens').method('get').create(),
	},
	56: {
		quote: fetcher.path('/v6.0/56/quote').method('get').create(),
		swap: fetcher.path('/v6.0/56/swap').method('get').create(),
		tokens: fetcher.path('/v6.0/56/tokens').method('get').create(),
	},
	43114: {
		quote: fetcher.path('/v6.0/43114/quote').method('get').create(),
		swap: fetcher.path('/v6.0/43114/swap').method('get').create(),
		tokens: fetcher.path('/v6.0/43114/tokens').method('get').create(),
	},
	250: {
		quote: fetcher.path('/v6.0/250/quote').method('get').create(),
		swap: fetcher.path('/v6.0/250/swap').method('get').create(),
		tokens: fetcher.path('/v6.0/250/tokens').method('get').create(),
	},
	100: {
		quote: fetcher.path('/v6.0/100/quote').method('get').create(),
		swap: fetcher.path('/v6.0/100/swap').method('get').create(),
		tokens: fetcher.path('/v6.0/100/tokens').method('get').create(),
	},
	10: {
		quote: fetcher.path('/v6.0/10/quote').method('get').create(),
		swap: fetcher.path('/v6.0/10/swap').method('get').create(),
		tokens: fetcher.path('/v6.0/10/tokens').method('get').create(),
	},
}

export const gasPrices = {
	1: fetcher.path('/v1.6/1').method('get').create(),
	137: fetcher.path('/v1.6/137').method('get').create(),
	42161: fetcher.path('/v1.6/42161').method('get').create(),
	56: fetcher.path('/v1.6/56').method('get').create(),
	43114: fetcher.path('/v1.6/43114').method('get').create(),
	250: fetcher.path('/v1.6/250').method('get').create(),
	100: fetcher.path('/v1.6/100').method('get').create(),
	10: fetcher.path('/v1.6/10').method('get').create(),
	501: fetcher.path('/v1.6/501').method('get').create(),
}

export const spotPrices = {
	1: fetcher.path('/v1.1/1').method('get').create(),
	137: fetcher.path('/v1.1/137').method('get').create(),
	42161: fetcher.path('/v1.1/42161').method('get').create(),
	56: fetcher.path('/v1.1/56').method('get').create(),
	43114: fetcher.path('/v1.1/43114').method('get').create(),
	250: fetcher.path('/v1.1/250').method('get').create(),
	100: fetcher.path('/v1.1/100').method('get').create(),
	10: fetcher.path('/v1.1/10').method('get').create(),
	501: fetcher.path('/v1.1/501').method('get').create(),
}

export const getTokenPriceHistory = fetcher.path('/v1.0/chart/line/{token0}/{token1}/{period}/{chainId}').method('get').create()
