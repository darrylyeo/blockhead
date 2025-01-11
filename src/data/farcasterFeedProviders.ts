import { FarcasterProvider, farcasterProviders } from './farcasterProviders'

export enum FarcasterFeedProvider {
	Airstack = FarcasterProvider.Airstack,
	Neynar = FarcasterProvider.Neynar,
	Pinata = FarcasterProvider.Pinata,

	OpenRank = 'OpenRank',
}


import { OpenRankIcon } from '$/assets/icons'

export const farcasterFeedProviders = {
	...farcasterProviders,

	[FarcasterFeedProvider.OpenRank]: {
		name: 'OpenRank',
		icon: OpenRankIcon,
	},
} as const satisfies Record<FarcasterFeedProvider, {
	name: string
	icon?: string
}>
