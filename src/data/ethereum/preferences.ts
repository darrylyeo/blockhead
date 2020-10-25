
import type { Ethereum } from './types'
import type { PriceFeedProvider } from './price/price-feed-provider'
import { localStorageWritable } from '../local-storage'

type BaseCurrency = 'USD' | 'GBP'

export const ethereumNetwork = localStorageWritable<Ethereum.Network>('ethereum-network', 'mainnet')
export const preferredEthereumProvider = localStorageWritable<Ethereum.ProviderName>('preferred-ethereum-provider', 'Portis')
export const preferredPriceFeedProvider = localStorageWritable<PriceFeedProvider>('preferred-price-feed-provider', 'Chainlink')
export const preferredBaseCurrency = localStorageWritable<BaseCurrency>('preferred-base-currency', 'USD')