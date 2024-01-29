// Context
import type { MetaTagsProps } from 'svelte-meta-tags'

import type { LayoutLoad } from './$types'

export const load: LayoutLoad = async ({
	parent,
}) => {
	const data = await parent()

	const metaTags: MetaTagsProps = {
		...data.metaTags,
		title: `Apps | ${data.metaTags.title}`,
		description: 'Browse DeFi protocols and web3 apps on Blockhead.',
	}

	return {
		metaTags,
	}
}
