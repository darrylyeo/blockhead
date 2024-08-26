export enum TokenBalancesProvider {
	RpcProvider = 'RPC Provider',
	Airstack = 'Airstack',
	Beryx = 'Beryx',
	Blockscout = 'Blockscout',
	Chainbase = 'Chainbase',
	Covalent = 'Covalent',
	Decommas = 'Decommas',
	Liquality = 'Liquality',
	LlamaFolio = 'LlamaFolio',
	Moralis = 'Moralis',
	Nexandria = 'Nexandria',
	QuickNode = 'QuickNode',
	Zapper = 'Zapper',
	ZerionDefiSdk = 'Zerion DeFi SDK',
}


import { AirstackIcon, BeryxIcon, BlockscoutIcon, ChainbaseIcon, CovalentGoldRushIcon, DecommasIcon, LiqualityIcon, LlamaFolioIcon, MoralisIcon, NexandriaIcon, QuickNodeIcon, ZapperIcon, ZerionIcon } from '$/assets/icons'

export const tokenBalancesProviderIcons = {
	[TokenBalancesProvider.Airstack]: AirstackIcon,
	[TokenBalancesProvider.Beryx]: BeryxIcon,
	[TokenBalancesProvider.Blockscout]: BlockscoutIcon,
	[TokenBalancesProvider.Chainbase]: ChainbaseIcon,
	[TokenBalancesProvider.Covalent]: CovalentGoldRushIcon,
	[TokenBalancesProvider.Decommas]: DecommasIcon,
	[TokenBalancesProvider.Liquality]: LiqualityIcon,
	[TokenBalancesProvider.LlamaFolio]: LlamaFolioIcon,
	[TokenBalancesProvider.Moralis]: MoralisIcon,
	[TokenBalancesProvider.Nexandria]: NexandriaIcon,
	[TokenBalancesProvider.QuickNode]: QuickNodeIcon,
	[TokenBalancesProvider.Zapper]: ZapperIcon,
	[TokenBalancesProvider.ZerionDefiSdk]: ZerionIcon,
} as const satisfies Record<Exclude<TokenBalancesProvider, TokenBalancesProvider.RpcProvider>, string>
