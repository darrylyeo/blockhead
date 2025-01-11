export enum FilecoinTokenBalancesProvider {
	Beryx = 'Beryx',
}

import { BeryxIcon } from '$/assets/icons'

export const filecoinTokenBalancesProviders = {
	[FilecoinTokenBalancesProvider.Beryx]: {
		name: 'Beryx',
		icon: BeryxIcon,
	},
} as const satisfies Record<FilecoinTokenBalancesProvider, {
	name: string
	icon?: string
}>
