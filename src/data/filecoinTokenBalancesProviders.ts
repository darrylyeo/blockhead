export enum FilecoinTokenBalancesProvider {
	Beryx = 'Beryx',
	Filfox = 'Filfox',
}

import { BeryxIcon, FilfoxIcon } from '$/assets/icons'

export const filecoinTokenBalancesProviders = {
	[FilecoinTokenBalancesProvider.Beryx]: {
		name: 'Beryx',
		icon: BeryxIcon,
	},
	[FilecoinTokenBalancesProvider.Filfox]: {
		name: 'Filfox',
		icon: FilfoxIcon,
	},
} as const satisfies Record<FilecoinTokenBalancesProvider, {
	name: string
	icon?: string
}>
