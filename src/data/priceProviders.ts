export enum OnchainPriceProvider {
	Chainlink = 'Chainlink',
	// CompoundOpenPriceFeed = 'Compound Open Price Feed',
	// Tellor = 'Tellor',
	// Umbrella = 'Umbrella',
}

export enum OffchainPriceProvider {
	CoinApi = 'CoinAPI',
	CoinGecko_Zapper = 'CoinGecko (Zapper)',
	CoinPaprika = 'CoinPaprika',
	Covalent = 'Covalent',
	Etherscan = 'Etherscan',
	OneInch_Charts = '1inch Charts',
	OneInch_SpotPrice = '1inch Spot Prices',
	QuickNode_Odos = 'Odos (QuickNode)',
}

export enum PriceProvider {
	Chainlink = OnchainPriceProvider.Chainlink,
	CoinApi = OffchainPriceProvider.CoinApi,
	CoinGecko_Zapper = OffchainPriceProvider.CoinGecko_Zapper,
	CoinPaprika = OffchainPriceProvider.CoinPaprika,
	Covalent = OffchainPriceProvider.Covalent,
	Etherscan = OffchainPriceProvider.Etherscan,
	OneInch_Charts = OffchainPriceProvider.OneInch_Charts,
	OneInch_SpotPrice = OffchainPriceProvider.OneInch_SpotPrice,
	QuickNode_Odos = OffchainPriceProvider.QuickNode_Odos,
}

export enum HistoricalPriceProvider {
	CoinPaprika = OffchainPriceProvider.CoinPaprika,
	Covalent = OffchainPriceProvider.Covalent,
	OneInch_Charts = OffchainPriceProvider.OneInch_Charts,
}


import { ChainlinkIcon, CoinApiIcon, CoinGeckoIcon, CoinPaprikaIcon, CovalentGoldRushIcon, EtherscanIcon, OneInchIcon, OdosIcon } from '$/assets/icons'

export const priceProviderIcons: Record<PriceProvider, string> = {
	[PriceProvider.Chainlink]: ChainlinkIcon,
	[PriceProvider.CoinApi]: CoinApiIcon,
	[PriceProvider.CoinGecko_Zapper]: CoinGeckoIcon,
	[PriceProvider.CoinPaprika]: CoinPaprikaIcon,
	[PriceProvider.Covalent]: CovalentGoldRushIcon,
	[PriceProvider.Etherscan]: EtherscanIcon,
	[PriceProvider.OneInch_Charts]: OneInchIcon,
	[PriceProvider.OneInch_SpotPrice]: OneInchIcon,
	[PriceProvider.QuickNode_Odos]: OdosIcon,
}
