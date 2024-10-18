export enum FilecoinTokenBalancesProvider {
	Beryx = 'Beryx',
}

import { BeryxIcon } from '$/assets/icons'

export const filecoinTokenBalancesProviderIcons = {
	[FilecoinTokenBalancesProvider.Beryx]: BeryxIcon,
} as const satisfies Record<FilecoinTokenBalancesProvider, string>
