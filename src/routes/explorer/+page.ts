// Context
import type { MetaTagsProps } from 'svelte-meta-tags'

import type { PageLoad } from './$types'

export const load: PageLoad = async ({
	parent,
}) => {
	const data = await parent()

	const metaTags: MetaTagsProps = {
		...data.metaTags,
		title: `Explorer | Blockhead`,
		description: 'Explore transactions, blocks, accounts and smart contracts across Ethereum, Polygon, Gnosis Chain, and other EVM chains.',
	}

	return {
		metaTags,
	}
}
