export enum TokenBalancesProvider {
	Covalent = 'Covalent',
	Moralis = 'Moralis',
	QuickNode = 'QuickNode',
	Zapper = 'Zapper',
	ZerionDefiSdk = 'Zerion DeFi SDK',
}


import { CovalentIcon, MoralisIcon, QuickNodeIcon, ZapperIcon, ZerionIcon } from '../assets/icons'

export const tokenBalancesProviderIcons: Record<TokenBalancesProvider, string> = {
	[TokenBalancesProvider.Covalent]: CovalentIcon,
	[TokenBalancesProvider.Moralis]: MoralisIcon,
	[TokenBalancesProvider.QuickNode]: QuickNodeIcon,
	[TokenBalancesProvider.Zapper]: ZapperIcon,
	[TokenBalancesProvider.ZerionDefiSdk]: ZerionIcon,
}
