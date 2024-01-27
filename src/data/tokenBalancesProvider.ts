export enum TokenBalancesProvider {
	RpcProvider = 'RPC Provider',
	Airstack = 'Airstack',
	Beryx = 'Beryx',
	Chainbase = 'Chainbase',
	Covalent = 'Covalent',
	Decommas = 'Decommas',
	Liquality = 'Liquality',
	Moralis = 'Moralis',
	QuickNode = 'QuickNode',
	Zapper = 'Zapper',
	ZerionDefiSdk = 'Zerion DeFi SDK',
}


import { AirstackIcon, BeryxIcon, ChainbaseIcon, CovalentIcon, DecommasIcon, LiqualityIcon, MoralisIcon, QuickNodeIcon, ZapperIcon, ZerionIcon } from '$/assets/icons'

export const tokenBalancesProviderIcons = {
	[TokenBalancesProvider.Airstack]: AirstackIcon,
	[TokenBalancesProvider.Beryx]: BeryxIcon,
	[TokenBalancesProvider.Chainbase]: ChainbaseIcon,
	[TokenBalancesProvider.Covalent]: CovalentIcon,
	[TokenBalancesProvider.Decommas]: DecommasIcon,
	[TokenBalancesProvider.Liquality]: LiqualityIcon,
	[TokenBalancesProvider.Moralis]: MoralisIcon,
	[TokenBalancesProvider.QuickNode]: QuickNodeIcon,
	[TokenBalancesProvider.Zapper]: ZapperIcon,
	[TokenBalancesProvider.ZerionDefiSdk]: ZerionIcon,
} as const satisfies Record<Exclude<TokenBalancesProvider, TokenBalancesProvider.RpcProvider>, string>
