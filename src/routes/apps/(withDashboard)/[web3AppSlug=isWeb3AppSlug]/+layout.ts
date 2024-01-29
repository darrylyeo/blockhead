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

	const web3AppConfig = web3AppsBySlug[params.web3AppSlug]

	const currentView =
		params.accountId ?
			'Account'
		: false ?
			'Explorer'
		:
			'Dashboard'

	const metaTags: MetaTagsProps = {
		...data.metaTags,
		title: (
			[
				params.accountId,
				params.web3AppSlug && web3AppConfig && `${web3AppConfig.name}${currentView === 'Dashboard' ? '' : ` ${currentView}`}`,
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
