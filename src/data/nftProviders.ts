export enum NftProvider {
	Airstack = 'Airstack',
	Blockscout = 'Blockscout',
	Chainbase = 'Chainbase',
	Covalent = 'Covalent',
	Decommas = 'Decommas',
	Liquality = 'Liquality',
	NftPort = 'NftPort',
}


import { AirstackIcon, BlockscoutIcon, ChainbaseIcon, CovalentGoldRushIcon, DecommasIcon, LiqualityIcon, NFTPortIcon } from '$/assets/icons'

export const nftProviders = {
	[NftProvider.Airstack]: {
		name: 'Airstack',
		icon: AirstackIcon,
	},
	[NftProvider.Blockscout]: {
		name: 'Blockscout › REST API',
		icon: BlockscoutIcon,
	},
	[NftProvider.Chainbase]: {
		name: 'Chainbase',
		icon: ChainbaseIcon,
	},
	[NftProvider.Covalent]: {
		name: 'Covalent › GoldRush',
		icon: CovalentGoldRushIcon,
	},
	[NftProvider.Decommas]: {
		name: 'Decommas',
		icon: DecommasIcon,
	},
	[NftProvider.Liquality]: {
		name: 'Liquality (Alchemy)',
		icon: LiqualityIcon,
	},
	[NftProvider.NftPort]: {
		name: 'NFTPort',
		icon: NFTPortIcon,
	},
} as const satisfies Record<NftProvider, {
	name: string,
	icon?: string,
}>
