// Types/constants
import type { MetaTagsProps } from 'svelte-meta-tags'


// Functions
import { openGraphImageGeneratorMeta } from '$/opengraph/imageGenerator'


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
	}

	return {
		metaTags,
	}
}
