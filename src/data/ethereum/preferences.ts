
import type { Ethereum } from './types'
import type { PriceFeedProvider } from './price-feed/price-feed-provider'
import { localStorageWritable } from '../local-storage'

export const ethereumNetwork = localStorageWritable<Ethereum.Network>('ethereum-network', 'mainnet')
export const preferredEthereumProvider = localStorageWritable<Ethereum.ProviderName>('preferred-ethereum-provider', 'Portis')
export const preferredPriceFeedProvider = localStorageWritable<PriceFeedProvider>('preferred-price-feed-provider', 'Chainlink')