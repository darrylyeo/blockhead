export enum VerifiedCredentialProvider {
	Disco = 'Disco',
}


import { DiscoIcon } from '../assets/icons'

export const verifiedCredentialProviderIcons = {
	[VerifiedCredentialProvider.Disco]: DiscoIcon,
} as const satisfies Record<VerifiedCredentialProvider, string>
