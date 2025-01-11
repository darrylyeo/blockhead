export enum Erc20TokenProvider {
	Airstack = 'Airstack',
	Blockscout = 'Blockscout',
	Chainbase = 'Chainbase',
	Decommas = 'Decommas',
	Moralis = 'Moralis',
	RpcProvider = 'RpcProvider',
}


import { AirstackIcon, BlockscoutIcon, ChainbaseIcon, DecommasIcon, MoralisIcon } from '$/assets/icons'

export const erc20TokenProviders = {
	[Erc20TokenProvider.Airstack]: {
		name: 'Airstack',
		icon: AirstackIcon,
	},
	[Erc20TokenProvider.Blockscout]: {
		name: 'Blockscout',
		icon: BlockscoutIcon,
	},
	[Erc20TokenProvider.Chainbase]: {
		name: 'Chainbase',
		icon: ChainbaseIcon,
	},
	[Erc20TokenProvider.Decommas]: {
		name: 'Decommas',
		icon: DecommasIcon,
	},
	[Erc20TokenProvider.Moralis]: {
		name: 'Moralis',
		icon: MoralisIcon,
	},
	[Erc20TokenProvider.RpcProvider]: {
		name: 'Node Client',
	},
} as const satisfies Record<Erc20TokenProvider, {
	name: string
	icon?: string
}>
