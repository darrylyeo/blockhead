export enum NftProvider {
	Airstack = 'Airstack',
	Covalent = 'Covalent',
	Liquality = 'Liquality',
	NftPort = 'NFTPort',
}


import { AirstackIcon, CovalentIcon, LiqualityIcon, NFTPortIcon } from '../assets/icons'

export const nftProviderIcons: Record<NftProvider, string> = {
	[NftProvider.Airstack]: AirstackIcon,
	[NftProvider.Covalent]: CovalentIcon,
	[NftProvider.Liquality]: LiqualityIcon,
	[NftProvider.NftPort]: NFTPortIcon,
}
