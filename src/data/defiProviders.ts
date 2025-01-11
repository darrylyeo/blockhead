export enum DefiProvider {
	LlamaFolio = 'LlamaFolio',
	Zapper = 'Zapper',
	ZerionDefiSdk = 'ZerionDefiSdk',
}


import { LlamaFolioIcon, ZapperIcon, ZerionIcon } from '$/assets/icons'

export const defiProviders = {
	[DefiProvider.LlamaFolio]: {
		name: 'LlamaFolio',
		icon: LlamaFolioIcon,
	},
	[DefiProvider.Zapper]: {
		name: 'Zapper',
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
