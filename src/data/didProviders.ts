export enum DidProvider {
	Ceramic = 'Ceramic Network',
}


import { CeramicIcon } from '$/assets/icons'

export const didProviders = {
	[DidProvider.Ceramic]: {
		name: 'Ceramic Network',
		icon: CeramicIcon,
	},
} as const satisfies Record<DidProvider, {
	name: string
	icon?: string
}>
