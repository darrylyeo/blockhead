export enum FilecoinTransactionProvider {
	Beryx = 'Beryx',
	Filfox = 'Filfox',
}


import { BeryxIcon, FilfoxIcon } from '$/assets/icons'

export const filecoinTransactionProviders = {
	[FilecoinTransactionProvider.Beryx]: {
		name: 'Zondax › Beryx',
		icon: BeryxIcon,
	},
	[FilecoinTransactionProvider.Filfox]: {
		name: 'Filfox',
		icon: FilfoxIcon,
	},
} as const satisfies Record<FilecoinTransactionProvider, {
	name: string
	icon?: string
}>
