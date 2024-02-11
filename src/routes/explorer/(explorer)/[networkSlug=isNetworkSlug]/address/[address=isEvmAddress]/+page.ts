// Types/constants
import type { MetaTagsProps } from 'svelte-meta-tags'


// Context
import { farcasterFrameRoutes } from './farcasterFrameRoutes'


// Functions
import { openGraphImageGeneratorMeta } from '$/opengraph/imageGenerator'
import { getInitialFarcasterFrameServerMeta } from '$/utils/farcasterFrameRoutes'


// Outputs
import type { PageLoad } from './$types'

export const load: PageLoad = async ({
	url,
	parent,
	params,
}) => {
	const data = await parent()

	const openGraphImageMeta = openGraphImageGeneratorMeta({
		pageUrl: url,
		altText: data.metaTags.title,
	})

	const farcasterFrameServerMeta = await getInitialFarcasterFrameServerMeta({
		url,
		routeParams: params,
		imageUrl: openGraphImageMeta.url,
		farcasterFrameRoutes,
	})

	const metaTags: MetaTagsProps = {
		...data.metaTags,
		openGraph: {
			...data.metaTags.openGraph,
			images: [
				openGraphImageMeta,
			],
		},
		additionalMetaTags: farcasterFrameServerMeta,
	}

	return {
		metaTags,
	}
}
