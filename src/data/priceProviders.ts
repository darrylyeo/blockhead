export enum OnchainPriceProvider {
	Chainlink = 'Chainlink',
	// CompoundOpenPriceFeed = 'Compound Open Price Feed',
	// Tellor = 'Tellor',
	// Umbrella = 'Umbrella',
}

export enum OffchainPriceProvider {
	// Covalent = 'Covalent',
	QuickNode_Odos = 'Odos (QuickNode)',
}

export enum PriceProvider {
	Chainlink = OnchainPriceProvider.Chainlink,
	// Covalent = OffchainPriceProvider.Covalent,
	QuickNode_Odos = OffchainPriceProvider.QuickNode_Odos,
}


import { ChainlinkIcon, CovalentGoldRushIcon, OdosIcon } from '$/assets/icons'

export const priceProviderIcons: Record<PriceProvider, string> = {
	[PriceProvider.Chainlink]: ChainlinkIcon,
	// [PriceProvider.Covalent]: CovalentGoldRushIcon,
	[PriceProvider.QuickNode_Odos]: OdosIcon,
}
