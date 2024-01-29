// Types/constants
import type { MetaTagsProps } from 'svelte-meta-tags'


// Context
import type { PageLoad } from './$types'

export const load: PageLoad = async ({
	parent,
}) => {
	const data = await parent()

	const metaTags: MetaTagsProps = {
		...data.metaTags,
		description: 'Explore transactions, blocks, accounts and smart contracts across Ethereum, Polygon, Gnosis Chain, and other EVM chains.',
	}

	return {
		metaTags,
	}
}
