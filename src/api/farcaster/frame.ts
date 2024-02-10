// Farcaster Frames
// https://docs.farcaster.xyz/reference/frames/spec


// Types
import type { FarcasterCastId, FarcasterUserId } from '.'

export type FarcasterFrameSignaturePacket<
	HasInputText extends boolean = boolean,
> = {
	untrustedData: {
		fid: FarcasterUserId,
		url: string,
		messageHash: `0x${string}`,
		timestamp: number,
		network: number,
		buttonIndex: 1 | 2 | 3 | 4,
		inputText?: HasInputText extends true ? string : never,
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
	action?: 'post' | 'post_redirect' | 'mint' | 'link',
	targetUrl?: string,
}

export type FarcasterFrameServerMeta = {
	version?: `${number}-${number}-${number}` | 'vNext',
	image: {
		url: string,
		aspectRatio?: `${1 | 1.91}:${1}`,
	},
	postUrl?: string,
	textInput?: string,
	buttons?: FarcasterFrameButton[],
}


// Functions
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
		frameMeta.image.aspectRatio && {
			property: 'fc:frame:image:aspect_ratio',
			content: frameMeta.image.aspectRatio,
		},
		frameMeta.textInput && {
			property: 'fc:frame:input:text',
			content: frameMeta.textInput,
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
				button.targetUrl && {
					property: `fc:frame:button:${index + 1}:target`,
					content: button.targetUrl,
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
