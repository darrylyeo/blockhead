export enum VerifiableCredentialProvider {
	Disco = 'Disco',
}


import { DiscoIcon } from '$/assets/icons'

export const verifiableCredentialProviders = {
	[VerifiableCredentialProvider.Disco]: {
		name: 'Disco',
		icon: DiscoIcon,
	},
} as const satisfies Record<VerifiableCredentialProvider, {
	name: string
	icon?: string
}>
