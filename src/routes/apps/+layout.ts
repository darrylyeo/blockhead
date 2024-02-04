// Constants
import { networksBySlug } from '$/data/networks'


// Functions
import { isTruthy } from '$/utils/isTruthy'


// Context
import type { MetaTagsProps } from 'svelte-meta-tags'

import type { LayoutLoad } from './$types'

export const load: LayoutLoad = async ({
	parent,
	params,
}) => {
	const data = await parent()

	const metaTags: MetaTagsProps = {
		...data.metaTags,
		title: (
			[
				[
					params.networkSlug && networksBySlug[params.networkSlug].name,
					'Apps'
				],
				[
					data.metaTags.title
				],
			]
				.map((parts) => (
					parts
						.filter(isTruthy)
						.join(' ')
				))
				.join(' | ')
		),
		description: 'Browse DeFi protocols and web3 apps on Blockhead.',
	}

	return {
		metaTags,
	}
}
