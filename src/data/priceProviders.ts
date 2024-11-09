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
	QuickNode_Odos = 'Odos (QuickNode)',
}

export enum PriceProvider {
	Chainlink = OnchainPriceProvider.Chainlink,
	CoinApi = OffchainPriceProvider.CoinApi,
	CoinGecko_Zapper = OffchainPriceProvider.CoinGecko_Zapper,
	CoinPaprika = OffchainPriceProvider.CoinPaprika,
	Covalent = OffchainPriceProvider.Covalent,
	Etherscan = OffchainPriceProvider.Etherscan,
	QuickNode_Odos = OffchainPriceProvider.QuickNode_Odos,
}

export enum HistoricalPriceProvider {
	CoinPaprika = OffchainPriceProvider.CoinPaprika,
	Covalent = OffchainPriceProvider.Covalent,
}


import { ChainlinkIcon, CoinApiIcon, CoinGeckoIcon, CoinPaprikaIcon, CovalentGoldRushIcon, EtherscanIcon, OdosIcon } from '$/assets/icons'

export const priceProviderIcons: Record<PriceProvider, string> = {
	[PriceProvider.Chainlink]: ChainlinkIcon,
	[PriceProvider.CoinApi]: CoinApiIcon,
	[PriceProvider.CoinGecko_Zapper]: CoinGeckoIcon,
	[PriceProvider.CoinPaprika]: CoinPaprikaIcon,
	[PriceProvider.Covalent]: CovalentGoldRushIcon,
	[PriceProvider.Etherscan]: EtherscanIcon,
	[PriceProvider.QuickNode_Odos]: OdosIcon,
}
