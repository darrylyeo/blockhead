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
		title: `Apps | Blockhead`,
		description: 'Browse DeFi protocols and web3 apps on Blockhead.',
	}

	return {
		metaTags,
	}
}
