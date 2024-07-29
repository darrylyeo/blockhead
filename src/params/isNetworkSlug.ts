import type { ParamMatcher } from '@sveltejs/kit'

import { networkBySlug } from '$/data/networks'

const isNetworkSlug: ParamMatcher = (param) => (
	networkBySlug.has(param)
)

export const match = isNetworkSlug
