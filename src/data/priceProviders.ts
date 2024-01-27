export enum OnchainPriceProvider {
	Chainlink = 'Chainlink',
	// CompoundOpenPriceFeed = 'Compound Open Price Feed',
	// Tellor = 'Tellor',
	// Umbrella = 'Umbrella',
}

export enum OffchainPriceProvider {
	Covalent = 'Covalent',
}

export enum PriceProvider {
	Chainlink = OnchainPriceProvider.Chainlink,
	Covalent = OffchainPriceProvider.Covalent,
}


import { ChainlinkIcon, CovalentIcon } from '$/assets/icons'

export const priceProviderIcons: Record<PriceProvider, string> = {
	[PriceProvider.Chainlink]: ChainlinkIcon,
	[PriceProvider.Covalent]: CovalentIcon,
}
