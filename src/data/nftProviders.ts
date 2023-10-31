export enum NftProvider {
	Airstack = 'Airstack',
	Chainbase = 'Chainbase',
	Covalent = 'Covalent',
	Liquality = 'Liquality',
	NftPort = 'NFTPort',
}


import { AirstackIcon, ChainbaseIcon, CovalentIcon, LiqualityIcon, NFTPortIcon } from '../assets/icons'

export const nftProviderIcons: Record<NftProvider, string> = {
	[NftProvider.Airstack]: AirstackIcon,
	[NftProvider.Chainbase]: ChainbaseIcon,
	[NftProvider.Covalent]: CovalentIcon,
	[NftProvider.Liquality]: LiqualityIcon,
	[NftProvider.NftPort]: NFTPortIcon,
}
