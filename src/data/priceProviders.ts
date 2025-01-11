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

export const priceProviders = {
	[OnchainPriceProvider.Chainlink]: {
		name: 'Chainlink',
		icon: ChainlinkIcon,
	},
	[OffchainPriceProvider.CoinApi]: {
		name: 'CoinAPI › Crypto Market Data',
		icon: CoinApiIcon,
	},
	[OffchainPriceProvider.CoinGecko_Zapper]: {
		name: 'CoinGecko (via Zapper)',
		icon: CoinGeckoIcon,
	},
	[OffchainPriceProvider.CoinPaprika]: {
		name: 'CoinPaprika',
		icon: CoinPaprikaIcon,
	},
	[OffchainPriceProvider.Covalent]: {
		name: 'Covalent › GoldRush',
		icon: CovalentGoldRushIcon,
	},
	[OffchainPriceProvider.Etherscan]: {
		name: 'Etherscan',
		icon: EtherscanIcon,
	},
	[OffchainPriceProvider.OneInch_Charts]: {
		name: '1inch › Charts API',
		icon: OneInchIcon,
	},
	[OffchainPriceProvider.OneInch_SpotPrice]: {
		name: '1inch › Spot Price API',
		icon: OneInchIcon,
	},
	[OffchainPriceProvider.QuickNode_Odos]: {
		name: 'Odos (via QuickNode)',
		icon: OdosIcon,
	},
} as const satisfies Record<PriceProvider, {
	name: string
	icon?: string
}>
