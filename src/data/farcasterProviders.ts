export enum FarcasterProvider {
	Hub = 'Hub',
	Neynar = 'Neynar',
	Pinata = 'Pinata',
}


import { FarcasterIcon, NeynarIcon, PinataIcon } from '$/assets/icons'

export const farcasterProviderIcons: Record<FarcasterProvider, string> = {
	[FarcasterProvider.Hub]: FarcasterIcon,
	[FarcasterProvider.Neynar]: NeynarIcon,
	[FarcasterProvider.Pinata]: PinataIcon,
}
