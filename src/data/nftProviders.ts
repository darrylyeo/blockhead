export enum NftProvider {
	Airstack = 'Airstack',
	Chainbase = 'Chainbase',
	Covalent = 'Covalent',
	Decommas = 'Decommas',
	Liquality = 'Liquality',
	NftPort = 'NFTPort',
}


import { AirstackIcon, ChainbaseIcon, CovalentIcon, DecommasIcon, LiqualityIcon, NFTPortIcon } from '../assets/icons'

export const nftProviderIcons: Record<NftProvider, string> = {
	[NftProvider.Airstack]: AirstackIcon,
	[NftProvider.Chainbase]: ChainbaseIcon,
	[NftProvider.Covalent]: CovalentIcon,
	[NftProvider.Decommas]: DecommasIcon,
	[NftProvider.Liquality]: LiqualityIcon,
	[NftProvider.NftPort]: NFTPortIcon,
}
