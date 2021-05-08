import { localStorageWritable } from '../local-storage'
import type { Ethereum } from './types'
import type { PriceFeedProvider } from './price/price-feed-provider'
import type { AnalyticsProvider } from '../analytics/provider'
import type { QuoteCurrency } from '../currency/currency'

export const ethereumChainID = localStorageWritable<Ethereum.ChainID>('ethereum-network', 1)
export const preferredEthereumProvider = localStorageWritable<Ethereum.ProviderName>('preferred-ethereum-provider', 'Portis')
export const preferredOracleProvider = localStorageWritable<PriceFeedProvider>('preferred-price-feed-provider', 'Chainlink')
export const preferredAnalyticsProvider = localStorageWritable<AnalyticsProvider>('preferred-analytics-provider', 'Covalent')
export const preferredQuoteCurrency = localStorageWritable<QuoteCurrency>('preferred-quote-currency', 'USD')