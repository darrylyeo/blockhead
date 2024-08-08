export enum EasProvider {
	Easscan = 'Easscan',
}


import { EthereumAttestationServiceIcon } from '$/assets/icons'

export const easProviderIcons: Record<EasProvider, string> = {
	[EasProvider.Easscan]: EthereumAttestationServiceIcon,
}
