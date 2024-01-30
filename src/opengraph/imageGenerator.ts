// Types
import type { OpenGraph } from 'svelte-meta-tags'

export type OpenGraphImageGeneratorParams = {
	timestamp: number,
	width: number,
	height: number,
}


// Functions
export const openGraphImageGeneratorMeta = ({
	pageUrl,
	width = 1728,
	height = 1080,
	altText,
}: {
	pageUrl: URL,
	width?: number,
	height?: number
	altText?: string,
}) => {
	const params: OpenGraphImageGeneratorParams = {
		timestamp: Date.now(),
		width,
		height,
	}

	const imageGeneratorUrl = `${pageUrl.protocol}//${pageUrl.host}${pageUrl.pathname}?${new URLSearchParams(params)}`

	return {
		url: imageGeneratorUrl,
		width,
		height,
		alt: altText,
	} as NonNullable<OpenGraph['images']>[number]
}
