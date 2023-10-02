export enum TokenBalancesProvider {
	RpcProvider = 'RPC Provider',
	Airstack = 'Airstack',
	Beryx = 'Beryx',
	Covalent = 'Covalent',
	Liquality = 'Liquality',
	Moralis = 'Moralis',
	QuickNode = 'QuickNode',
	Zapper = 'Zapper',
	ZerionDefiSdk = 'Zerion DeFi SDK',
}


import { AirstackIcon, BeryxIcon, CovalentIcon, LiqualityIcon, MoralisIcon, QuickNodeIcon, ZapperIcon, ZerionIcon } from '../assets/icons'

export const tokenBalancesProviderIcons: Record<TokenBalancesProvider, string> = {
	[TokenBalancesProvider.Airstack]: AirstackIcon,
	[TokenBalancesProvider.Beryx]: BeryxIcon,
	[TokenBalancesProvider.Covalent]: CovalentIcon,
	[TokenBalancesProvider.Liquality]: LiqualityIcon,
	[TokenBalancesProvider.Moralis]: MoralisIcon,
	[TokenBalancesProvider.QuickNode]: QuickNodeIcon,
	[TokenBalancesProvider.Zapper]: ZapperIcon,
	[TokenBalancesProvider.ZerionDefiSdk]: ZerionIcon,
}
