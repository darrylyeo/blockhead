export enum DefiProvider {
	LlamaFolio = 'LlamaFolio',
	ZapperGraphql = 'ZapperGraphql',
	ZapperRest = 'ZapperRest',
	ZerionDefiSdk = 'ZerionDefiSdk',
}


import { LlamaFolioIcon, ZapperIcon, ZerionIcon } from '$/assets/icons'

export const defiProviders = {
	[DefiProvider.LlamaFolio]: {
		name: 'LlamaFolio',
		icon: LlamaFolioIcon,
	},
	[DefiProvider.ZapperGraphql]: {
		name: 'Zapper › GraphQL',
		icon: ZapperIcon,
	},
	[DefiProvider.ZapperRest]: {
		name: 'Zapper › REST API',
		icon: ZapperIcon,
	},
	[DefiProvider.ZerionDefiSdk]: {
		name: 'Zerion DeFi SDK',
		icon: ZerionIcon,
	},
} as const satisfies Record<DefiProvider, {
	name: string
	icon?: string
}>
