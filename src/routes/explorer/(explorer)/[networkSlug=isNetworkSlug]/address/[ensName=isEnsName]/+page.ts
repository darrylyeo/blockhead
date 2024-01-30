// Types/constants
import type { MetaTagsProps } from 'svelte-meta-tags'


// Context
import type { PageLoad } from './$types'
import { openGraphImageGeneratorMeta } from '$/opengraph/imageGenerator'

export const load: PageLoad = async ({
	url,
	parent,
}) => {
	const data = await parent()

	const metaTags: MetaTagsProps = {
		...data.metaTags,
		openGraph: {
			...data.metaTags.openGraph,
			images: [
				openGraphImageGeneratorMeta({
					pageUrl: url,
					altText: data.metaTags.title,
				}),
			],
		},
	}

	return {
		metaTags,
	}
}
