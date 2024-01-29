// Types/constants
import type { MetaTagsProps } from 'svelte-meta-tags'
import { web3AppsBySlug } from '$/data/web3Apps'


// Functions
import { isTruthy } from '$/utils/isTruthy'


// Context
import type { LayoutLoad } from './$types'

export const load: LayoutLoad = async ({
	parent,
	params,
}) => {
	const data = await parent()

	const web3AppSlug = 'ipfs'
	const web3AppConfig = web3AppsBySlug[web3AppSlug]

	const currentView =
		false ?
			'Account'
		: params.ipfsContentId || params.ipnsName || params.ipfsContentPath ?
			'Explorer'
		:
			'Dashboard'

	const metaTags: MetaTagsProps = {
		...data.metaTags,
		title: (
			[
				'',
				`${web3AppConfig.name}${currentView === 'Dashboard' ? '' : ` ${currentView}`}`,
				data.metaTags.title,
			]
				.filter(isTruthy)
				.join(' | ')
		),
	}

	return {
		web3AppConfig,
		metaTags,
	}
}
