// Constants
import { testnetsForMainnet } from '$/data/networks'


// Param matcher
import type { ParamMatcher } from '@sveltejs/kit'

const isNetworkSlugFilecoin: ParamMatcher = param => (
	param === 'filecoin'
	|| (
		(testnetsForMainnet.get('filecoin') ?? [])
			.some(network => (
				param === network.slug
			))
	)
)

export const match = isNetworkSlugFilecoin
