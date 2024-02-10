// Types/constants
import type { MetaTagsProps } from 'svelte-meta-tags'


// Context
import { farcasterFrameRoutes } from './farcasterFrameRoutes'


// Functions
import { openGraphImageGeneratorMeta } from '$/opengraph/imageGenerator'
import { serializeFarcasterFrameServerMeta } from '$/api/farcaster/frame'
import { createRedirectUrl, renderButtonFromAction } from '$/utils/farcasterFrameRoutes'
import { isTruthy } from '$/utils/isTruthy'


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

	const farcasterFrameServerMeta = serializeFarcasterFrameServerMeta({
		image: {
			url: openGraphImageMeta.url,
			aspectRatio: '1.91:1',
		},
		postUrl: createRedirectUrl({
			url,
			appRoute: url.href,
			frameRoute: '/',
		}),
		buttons: (
			await Promise.all(
				farcasterFrameRoutes['/'].actions
					?.map(async actionResolver => {
						const action = 
							actionResolver && typeof actionResolver === 'function' ?
								await actionResolver?.({
									svelteKitRouteParams: params,
								})
							:
								actionResolver

						return renderButtonFromAction({
							url,
							action,
						})
					}),
			)
		)
			.filter(isTruthy),
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
