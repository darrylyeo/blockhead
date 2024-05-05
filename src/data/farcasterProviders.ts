export enum FarcasterProvider {
	Hub = 'Hub',
	Airstack = 'Airstack',
	Neynar = 'Neynar',
	Pinata = 'Pinata',
}


import { AirstackIcon, FarcasterIcon, NeynarIcon, PinataIcon } from '$/assets/icons'

export const farcasterProviderIcons: Record<FarcasterProvider, string> = {
	[FarcasterProvider.Hub]: FarcasterIcon,
	[FarcasterProvider.Airstack]: AirstackIcon,
	[FarcasterProvider.Neynar]: NeynarIcon,
	[FarcasterProvider.Pinata]: PinataIcon,
}
