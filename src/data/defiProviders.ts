export enum DefiProvider {
	Zapper = 'Zapper',
	ZerionDefiSdk = 'Zerion DeFi SDK',
}


import { ZapperIcon, ZerionIcon } from '../assets/icons'

export const defiProviderIcons: Record<DefiProvider, string> = {
	[DefiProvider.Zapper]: ZapperIcon,
	[DefiProvider.ZerionDefiSdk]: ZerionIcon,
}
