// Context
import type { MetaTagsProps } from 'svelte-meta-tags'

import type { PageLoad } from './$types'

export const load: PageLoad = async ({
	parent,
}) => {
	const data = await parent()

	const metaTags: MetaTagsProps = {
		...data.metaTags,
		title: `Portfolio | Blockhead`,
		description: `Track token balances, DeFi positions, and NFTs across multiple wallets & EVM chains with Blockhead's portfolio tracker.`,
	}

	return {
		metaTags,
	}
}
