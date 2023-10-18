export enum VerifiableCredentialProvider {
	Disco = 'Disco',
}


import { DiscoIcon } from '../assets/icons'

export const verifiableCredentialProviderIcons = {
	[VerifiableCredentialProvider.Disco]: DiscoIcon,
} as const satisfies Record<VerifiableCredentialProvider, string>
