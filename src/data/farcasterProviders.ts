export enum FarcasterProvider {
	Hub = 'Hub',
	Neynar = 'Neynar',
}


import { FarcasterIcon, NeynarIcon } from '$/assets/icons'

export const farcasterProviderIcons: Record<FarcasterProvider, string> = {
	[FarcasterProvider.Hub]: FarcasterIcon,
	[FarcasterProvider.Neynar]: NeynarIcon,
}
