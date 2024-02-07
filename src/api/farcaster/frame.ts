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


import { isTruthy } from '$/utils/isTruthy'

export const serializeFarcasterFrameServerMeta = (frameMeta: FarcasterFrameServerMeta) => (
	[
		{
			property: 'fc:frame',
			content: frameMeta.version ?? 'vNext',
		},
		{
			property: 'fc:frame:image',
			content: frameMeta.image.url,
		},
		frameMeta.image.refreshPeriod && {
			property: 'fc:frame:refresh_period',
			content: `${frameMeta.image.refreshPeriod}`,
		},
		...frameMeta.buttons
			?.flatMap((button, index) => [
				{
					property: `fc:frame:button:${index + 1}`,
					content: button.label,
				},
				button.action && {
					property: `fc:frame:button:${index + 1}:action`,
					content: button.action,
				},
			])
			?? [],
		frameMeta.postUrl && {
			property: 'fc:frame:post_url',
			content: frameMeta.postUrl,
		},
	]
		.filter(isTruthy)
)


import { text } from '@sveltejs/kit'

export const createFarcasterFrameServerResponse = (frameMeta: FarcasterFrameServerMeta) => text(
	`
		<!DOCTYPE html>
		<html>
			<head>
				${
					serializeFarcasterFrameServerMeta(frameMeta)
						.map(({ property, content }) => (
							`<meta property="${property.replace(/"/, '&quot;')}" content="${content.replace(/"/, '&quot;')}" />`
						))
						.join('\n')
				}
			</head>
		</html>
	`.trim()
)
