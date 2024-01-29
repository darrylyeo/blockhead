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
		title: `Blockhead | track, visualize & explore all of crypto, DeFi & web3`,
	}

	return {
		metaTags,
	}
}
