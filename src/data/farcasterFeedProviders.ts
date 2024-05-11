import { FarcasterProvider, farcasterProviderIcons } from './farcasterProviders'

export enum FarcasterFeedProvider {
	Airstack = FarcasterProvider.Airstack,
	Neynar = FarcasterProvider.Neynar,
	Pinata = FarcasterProvider.Pinata,

	OpenRank = 'OpenRank',
}


import { OpenRankIcon } from '$/assets/icons'

export const farcasterFeedProviderIcons: Record<FarcasterFeedProvider, string> = {
	...farcasterProviderIcons,
	[FarcasterFeedProvider.OpenRank]: OpenRankIcon,
}
