export enum FilecoinTransactionProvider {
	Beryx = 'Beryx',
}


import { BeryxIcon } from '$/assets/icons'

export const filecoinTransactionProviderIcons: Record<FilecoinTransactionProvider, string> = {
	[FilecoinTransactionProvider.Beryx]: BeryxIcon,
}
