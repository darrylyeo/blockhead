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

	const web3AppSlug = 'farcaster'
	const web3AppConfig = web3AppsBySlug[web3AppSlug]

	const currentView =
		params.farcasterCastId ?
			'Account'
		: params.farcasterUserId || params.farcasterUserName ?
			'Explorer'
		:
			'Dashboard'

	const metaTags: MetaTagsProps = {
		...data.metaTags,
		title: (
			[
				params.farcasterUserId || params.farcasterUserName,
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
