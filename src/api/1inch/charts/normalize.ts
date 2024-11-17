// Types
import type { CoinWithHistoricalPrices } from '$/data/coins'
import type { QuoteCurrency } from '$/data/currencies'
import type { FetchReturnType } from 'openapi-typescript-fetch'
import type { getTokenPriceHistory } from './index'


// Functions
export const normalizeHistoricalPrices = (
	result: FetchReturnType<typeof getTokenPriceHistory>,
	coin: any,
	quoteCurrency: QuoteCurrency
): CoinWithHistoricalPrices => ({
	coin,
	quoteCurrency,
	prices: result.data.map(item => ({
		time: new Date(item.timestamp * 1000).toISOString().slice(0, 10),
		price: item.close
	}))
})
