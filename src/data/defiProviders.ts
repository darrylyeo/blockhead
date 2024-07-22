export enum DefiProvider {
	LlamaFolio = 'LlamaFolio',
	Zapper = 'Zapper',
	ZerionDefiSdk = 'Zerion DeFi SDK',
}


import { DefiLlamaIcon, ZapperIcon, ZerionIcon } from '$/assets/icons'

export const defiProviderIcons: Record<DefiProvider, string> = {
	[DefiProvider.LlamaFolio]: DefiLlamaIcon,
	[DefiProvider.Zapper]: ZapperIcon,
	[DefiProvider.ZerionDefiSdk]: ZerionIcon,
}
