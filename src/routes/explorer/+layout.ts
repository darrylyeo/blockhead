// Context
import type { MetaTagsProps } from 'svelte-meta-tags'

import type { LayoutLoad } from './$types'

export const load: LayoutLoad = async ({
	parent,
}) => {
	const data = await parent()

	const metaTags: MetaTagsProps = {
		...data.metaTags,
		title: `Explorer | ${data.metaTags.title}`,
		description: 'Explore transactions, blocks, accounts and smart contracts across Ethereum, Polygon, Gnosis Chain, and other EVM chains.',
	}

	return {
		metaTags,
	}
}
