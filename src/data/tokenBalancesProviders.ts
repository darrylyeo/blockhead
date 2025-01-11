export enum TokenBalancesProvider {
	RpcProvider = 'RpcProvider',
	Airstack = 'Airstack',
	Alchemy_Liquality = 'Alchemy_Liquality',
	Blockscout = 'Blockscout',
	Chainbase = 'Chainbase',
	Covalent = 'Covalent',
	Decommas = 'Decommas',
	LlamaFolio = 'LlamaFolio',
	Moralis = 'Moralis',
	Nexandria = 'Nexandria',
	Noves = 'Noves',
	OneInch_Balance = 'OneInch_Balance',
	QuickNode = 'QuickNode',
	ZapperGraphql = 'ZapperGraphql',
	ZapperRest = 'ZapperRest',
	ZerionDefiSdk = 'ZerionDefiSdk',
}


import { AirstackIcon, BlockscoutIcon, ChainbaseIcon, CovalentGoldRushIcon, DecommasIcon, LiqualityIcon, LlamaFolioIcon, MoralisIcon, NexandriaIcon, NovesIcon, OneInchIcon, QuickNodeIcon, ZapperIcon, ZerionIcon } from '$/assets/icons'

export const tokenBalancesProviders = {
	[TokenBalancesProvider.RpcProvider]: {
		name: 'RPC Provider',
	},
	[TokenBalancesProvider.Airstack]: {
		name: 'Airstack',
		icon: AirstackIcon,
	},
	[TokenBalancesProvider.Alchemy_Liquality]: {
		name: 'Alchemy (Liquality)',
		icon: LiqualityIcon,
	},
	[TokenBalancesProvider.Blockscout]: {
		name: 'Blockscout',
		icon: BlockscoutIcon,
	},
	[TokenBalancesProvider.Chainbase]: {
		name: 'Chainbase',
		icon: ChainbaseIcon,
	},
	[TokenBalancesProvider.Covalent]: {
		name: 'Covalent',
		icon: CovalentGoldRushIcon,
	},
	[TokenBalancesProvider.Decommas]: {
		name: 'Decommas',
		icon: DecommasIcon,
	},
	[TokenBalancesProvider.LlamaFolio]: {
		name: 'LlamaFolio',
		icon: LlamaFolioIcon,
	},
	[TokenBalancesProvider.Moralis]: {
		name: 'Moralis',
		icon: MoralisIcon,
	},
	[TokenBalancesProvider.Nexandria]: {
		name: 'Nexandria',
		icon: NexandriaIcon,
	},
	[TokenBalancesProvider.Noves]: {
		name: 'Noves',
		icon: NovesIcon,
	},
	[TokenBalancesProvider.OneInch_Balance]: {
		name: '1inch',
		icon: OneInchIcon,
	},
	[TokenBalancesProvider.QuickNode]: {
		name: 'QuickNode',
		icon: QuickNodeIcon,
	},
	[TokenBalancesProvider.ZapperGraphql]: {
		name: 'Zapper › GraphQL',
		icon: ZapperIcon,
	},
	[TokenBalancesProvider.ZapperRest]: {
		name: 'Zapper › REST API',
		icon: ZapperIcon,
	},
	[TokenBalancesProvider.ZerionDefiSdk]: {
		name: 'Zerion',
		icon: ZerionIcon,
	},
} as const satisfies Record<TokenBalancesProvider, {
	name: string
	icon?: string
}>
