import type { FarcasterCastId, FarcasterUserId } from '.'

export type FarcasterFrameSignaturePacket = {
	untrustedData: {
		fid: FarcasterUserId,
		url: string,
		messageHash: `0x${string}`,
		timestamp: number,
		network: number,
		buttonIndex: 1 | 2 | 3 | 4,
		castId: {
			fid: FarcasterUserId,
			hash: FarcasterCastId,
		},
	},
	trustedData: {
		messageBytes: string,
	},
}

export type FarcasterFrameButton = {
	label: string,
	action?: 'submit' | 'redirect',
}

export type FarcasterFrameServerMeta = {
	version?: `${number}-${number}-${number}` | 'vNext',
	image: {
		url: string,
		refreshPeriod?: number,
	},
	postUrl?: string,
	buttons?: FarcasterFrameButton[],
}
