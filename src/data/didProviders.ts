export enum DidProvider {
	Ceramic = 'Ceramic Network',
}


import { CeramicIcon } from '$/assets/icons'

export const didProviderIcons = {
	[DidProvider.Ceramic]: CeramicIcon,
} as const satisfies Record<DidProvider, string>
