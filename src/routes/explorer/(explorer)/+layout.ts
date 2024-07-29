// Constants
import { networkBySlug } from '$/data/networks'


// Context
import type { MetaTagsProps } from 'svelte-meta-tags'

import type { LayoutLoad } from './$types'

export const load: LayoutLoad = async ({
	parent,
	params,
}) => {
	const data = await parent()

	const explorerNetwork = networkBySlug.get(params.networkSlug!)

	const metaTags: MetaTagsProps = {
		...data.metaTags,
		title: `${explorerNetwork.name} ${data.metaTags.title}`,
		description: `Explore ${explorerNetwork.name} transactions, blocks, accounts, smart contracts and more on Blockhead.`,
	}

	return {
		metaTags,
	}
}
