export type CurrentPriceProvider = APIPriceProvider | PriceFeedProvider

export type APIPriceProvider = 'Covalent'

export type PriceFeedProvider = 'Chainlink' | 'Tellor' | 'Umbrella' | 'Compound Open Price Feed'