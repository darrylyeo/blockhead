import type { FarcasterUserId } from '../farcaster'

export type Channel = {
	name: string;
	parent_url: string;
	image: string;
	channel_id: string;
	lead_fid: FarcasterUserId;
}

export const getFarcasterChannelList = async () => (
	await fetch('https://raw.githubusercontent.com/neynarxyz/farcaster-channels/main/warpcast.json')
		.then(response => response.json()) as Promise<Channel[]>
)
