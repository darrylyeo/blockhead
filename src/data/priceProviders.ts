export enum OnchainPriceProvider {
	Chainlink = 'Chainlink',
	// CompoundOpenPriceFeed = 'Compound Open Price Feed',
	// Tellor = 'Tellor',
	// Umbrella = 'Umbrella',
}

export enum OffchainPriceProvider {
	CoinGecko_Zapper = 'CoinGecko (Zapper)',
	// Covalent = 'Covalent',
	Etherscan = 'Etherscan',
	QuickNode_Odos = 'Odos (QuickNode)',
}

export enum PriceProvider {
	Chainlink = OnchainPriceProvider.Chainlink,
	CoinGecko_Zapper = OffchainPriceProvider.CoinGecko_Zapper,
	// Covalent = OffchainPriceProvider.Covalent,
	Etherscan = OffchainPriceProvider.Etherscan,
	QuickNode_Odos = OffchainPriceProvider.QuickNode_Odos,
}


import { ChainlinkIcon, CoinGeckoIcon, CovalentGoldRushIcon, EtherscanIcon, OdosIcon } from '$/assets/icons'

export const priceProviderIcons: Record<PriceProvider, string> = {
	[PriceProvider.Chainlink]: ChainlinkIcon,
	[PriceProvider.CoinGecko_Zapper]: CoinGeckoIcon,
	// [PriceProvider.Covalent]: CovalentGoldRushIcon,
	[PriceProvider.Etherscan]: EtherscanIcon,
	[PriceProvider.QuickNode_Odos]: OdosIcon,
}
