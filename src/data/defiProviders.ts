export enum DefiProvider {
	LlamaFolio = 'LlamaFolio',
	Zapper = 'Zapper',
	ZerionDefiSdk = 'Zerion DeFi SDK',
}


import { LlamaFolioIcon, ZapperIcon, ZerionIcon } from '$/assets/icons'

export const defiProviderIcons: Record<DefiProvider, string> = {
	[DefiProvider.LlamaFolio]: LlamaFolioIcon,
	[DefiProvider.Zapper]: ZapperIcon,
	[DefiProvider.ZerionDefiSdk]: ZerionIcon,
}
