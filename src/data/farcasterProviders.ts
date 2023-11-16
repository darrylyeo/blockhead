export enum FarcasterProvider {
	Hub = 'Hub',
	Neynar = 'Neynar',
}


import { FarcasterIcon } from '../assets/icons'

export const farcasterProviderIcons: Record<FarcasterProvider, string> = {
	[FarcasterProvider.Hub]: FarcasterIcon,
	[FarcasterProvider.Neynar]: FarcasterIcon,
}
