export enum MoxieProvider {
	TheGraph = 'The Graph',
}


import { TheGraphIcon } from '$/assets/icons'

export const moxieProviderIcons: Record<MoxieProvider, string> = {
	[MoxieProvider.TheGraph]: TheGraphIcon,
}
