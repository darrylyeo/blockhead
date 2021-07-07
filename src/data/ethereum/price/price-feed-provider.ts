export type CurrentPriceProvider = APIPriceProvider | OracleProvider

export type APIPriceProvider = 'Covalent'

export type OracleProvider = 'Chainlink' | 'Tellor' | 'Umbrella' | 'Compound Open Price Feed'