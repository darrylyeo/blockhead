export enum FarcasterProvider {
	Hub = 'Hub',
	Airstack = 'Airstack',
	Neynar = 'Neynar',
	Pinata = 'Pinata',
}


import { AirstackIcon, FarcasterIcon, NeynarIcon, PinataIcon } from '$/assets/icons'

export const farcasterProviders = {
	[FarcasterProvider.Hub]: {
		name: 'Hub',
		icon: FarcasterIcon,
	},
	[FarcasterProvider.Airstack]: {
		name: 'Airstack',
		icon: AirstackIcon,
	},
	[FarcasterProvider.Neynar]: {
		name: 'Neynar',
		icon: NeynarIcon,
	},
	[FarcasterProvider.Pinata]: {
		name: 'Pinata',
		icon: PinataIcon,
	},
} as const satisfies Record<FarcasterProvider, {
	name: string
	icon?: string
}>
