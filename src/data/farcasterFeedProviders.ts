import { FarcasterProvider, farcasterProviderIcons } from './farcasterProviders'

export enum FarcasterFeedProvider {
	Airstack = FarcasterProvider.Airstack,
	Neynar = FarcasterProvider.Neynar,
	Pinata = FarcasterProvider.Pinata,
}


export const farcasterFeedProviderIcons: Record<FarcasterFeedProvider, string> = {
	...farcasterProviderIcons,
}
