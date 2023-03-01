export enum TokenBalancesProvider {
	Covalent = 'Covalent',
	Liquality = 'Liquality',
	Moralis = 'Moralis',
	QuickNode = 'QuickNode',
	Zapper = 'Zapper',
	ZerionDefiSdk = 'Zerion DeFi SDK',
}


import { CovalentIcon, LiqualityIcon, MoralisIcon, QuickNodeIcon, ZapperIcon, ZerionIcon } from '../assets/icons'

export const tokenBalancesProviderIcons: Record<TokenBalancesProvider, string> = {
	[TokenBalancesProvider.Covalent]: CovalentIcon,
	[TokenBalancesProvider.Liquality]: LiqualityIcon,
	[TokenBalancesProvider.Moralis]: MoralisIcon,
	[TokenBalancesProvider.QuickNode]: QuickNodeIcon,
	[TokenBalancesProvider.Zapper]: ZapperIcon,
	[TokenBalancesProvider.ZerionDefiSdk]: ZerionIcon,
}
