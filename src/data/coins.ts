import type { Ethereum } from './networks/types'
import type { QuoteCurrency, TickerSymbol } from './currencies'

export type Coin = (
	| {
		chainId: Ethereum.ChainId
		contractAddress: Ethereum.ContractAddress
		symbol?: TickerSymbol
	}
	| {
		chainId?: Ethereum.ChainId
		erc20Token: Ethereum.Erc20Token
	}
	| {
		symbol: TickerSymbol
	}
)

export type CoinWithHistoricalPrices = {
	coin: Coin
	quoteCurrency: QuoteCurrency
	prices: PriceAtTime[]
}

export type PriceAtTime = {
	time: number
	price: number
}
