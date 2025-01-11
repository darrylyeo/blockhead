export enum TokenBalancesProvider {
	RpcProvider = 'RPC Provider',
	Airstack = 'Airstack',
	Alchemy_Liquality = 'Alchemy (Liquality)',
	Blockscout = 'Blockscout',
	Chainbase = 'Chainbase',
	Covalent = 'Covalent',
	Decommas = 'Decommas',
	LlamaFolio = 'LlamaFolio',
	Moralis = 'Moralis',
	Nexandria = 'Nexandria',
	Noves = 'Noves',
	OneInch_Balance = '1inch',
	QuickNode = 'QuickNode',
	Zapper = 'Zapper',
	ZerionDefiSdk = 'Zerion DeFi SDK',
}


import { AirstackIcon, BlockscoutIcon, ChainbaseIcon, CovalentGoldRushIcon, DecommasIcon, LiqualityIcon, LlamaFolioIcon, MoralisIcon, NexandriaIcon, NovesIcon, OneInchIcon, QuickNodeIcon, ZapperIcon, ZerionIcon } from '$/assets/icons'

export const tokenBalancesProviderIcons = {
	[TokenBalancesProvider.Airstack]: AirstackIcon,
	[TokenBalancesProvider.Alchemy_Liquality]: LiqualityIcon,
	[TokenBalancesProvider.Blockscout]: BlockscoutIcon,
	[TokenBalancesProvider.Chainbase]: ChainbaseIcon,
	[TokenBalancesProvider.Covalent]: CovalentGoldRushIcon,
	[TokenBalancesProvider.Decommas]: DecommasIcon,
	[TokenBalancesProvider.LlamaFolio]: LlamaFolioIcon,
	[TokenBalancesProvider.Moralis]: MoralisIcon,
	[TokenBalancesProvider.Nexandria]: NexandriaIcon,
	[TokenBalancesProvider.Noves]: NovesIcon,
	[TokenBalancesProvider.OneInch_Balance]: OneInchIcon,
	[TokenBalancesProvider.QuickNode]: QuickNodeIcon,
	[TokenBalancesProvider.Zapper]: ZapperIcon,
	[TokenBalancesProvider.ZerionDefiSdk]: ZerionIcon,
} as const satisfies Record<Exclude<TokenBalancesProvider, TokenBalancesProvider.RpcProvider>, string>
