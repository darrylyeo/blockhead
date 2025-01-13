export enum FilecoinTransactionProvider {
	Beryx = 'Beryx',
}


import { BeryxIcon } from '$/assets/icons'

export const filecoinTransactionProviders = {
	[FilecoinTransactionProvider.Beryx]: {
		name: 'Zondax › Beryx',
		icon: BeryxIcon,
	},
} as const satisfies Record<FilecoinTransactionProvider, {
	name: string
	icon?: string
}>
