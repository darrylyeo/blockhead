// Types/constants
import type { MetaTagsProps } from 'svelte-meta-tags'


// Context
import { farcasterFrameRoutes } from './farcasterFrameRoutes'


// Functions
import { openGraphImageGeneratorMeta } from '$/opengraph/imageGenerator'
import { serializeFarcasterFrameServerMeta } from '$/api/farcaster/frame'


// Outputs
import type { PageLoad } from './$types'

export const load: PageLoad = async ({
	url,
	parent,
}) => {
	const data = await parent()

	const openGraphImageMeta = openGraphImageGeneratorMeta({
		pageUrl: url,
		altText: data.metaTags.title,
	})

	const metaTags: MetaTagsProps = {
		...data.metaTags,
		openGraph: {
			...data.metaTags.openGraph,
			images: [
				openGraphImageMeta,
			],
		},
		additionalMetaTags: serializeFarcasterFrameServerMeta({
			image: {
				url: openGraphImageMeta.url,
			},
			...farcasterFrameRoutes['/'],
		}),
	}

	return {
		metaTags,
	}
}
