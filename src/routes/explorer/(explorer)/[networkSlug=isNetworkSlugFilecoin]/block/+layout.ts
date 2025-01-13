// Context
import type { MetaTagsProps } from 'svelte-meta-tags'

import type { LayoutLoad } from './$types'

export const load: LayoutLoad = async ({
	parent,
}) => {
	const data = await parent()

	const metaTags: MetaTagsProps = {
		...data.metaTags,
		title: `Block | ${data.metaTags.title}`,
	}

	return {
		metaTags,
	}
}
