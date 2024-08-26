export enum Erc20TokenProvider {
	Airstack = 'Airstack',
	Blockscout = 'Blockscout',
	Chainbase = 'Chainbase',
	Decommas = 'Decommas',
	Moralis = 'Moralis',
	RpcProvider = 'RPC Provider',
}


import { AirstackIcon, BlockscoutIcon, ChainbaseIcon, DecommasIcon, MoralisIcon } from '$/assets/icons'

export const erc20TokenProviderIcons = {
	[Erc20TokenProvider.Airstack]: AirstackIcon,
	[Erc20TokenProvider.Blockscout]: BlockscoutIcon,
	[Erc20TokenProvider.Chainbase]: ChainbaseIcon,
	[Erc20TokenProvider.Decommas]: DecommasIcon,
	[Erc20TokenProvider.Moralis]: MoralisIcon,
} as const satisfies Record<Exclude<Erc20TokenProvider, Erc20TokenProvider.RpcProvider>, string>
