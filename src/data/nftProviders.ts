export enum NftProvider {
	Covalent = 'Covalent',
	Liquality = 'Liquality',
	NftPort = 'NFTPort',
}


import { CovalentIcon, LiqualityIcon, NFTPortIcon } from '../assets/icons'

export const nftProviderIcons: Record<NftProvider, string> = {
	[NftProvider.Covalent]: CovalentIcon,
	[NftProvider.Liquality]: LiqualityIcon,
	[NftProvider.NftPort]: NFTPortIcon,
}
