export enum NftProvider {
	Covalent = 'Covalent',
	NftPort = 'NFTPort',
}


import { CovalentIcon, NFTPortIcon } from '../assets/icons'

export const nftProviderIcons: Record<NftProvider, string> = {
	[NftProvider.Covalent]: CovalentIcon,
	[NftProvider.NftPort]: NFTPortIcon,
}
