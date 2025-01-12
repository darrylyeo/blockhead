// Constants
import { networkBySlug } from '$/data/networks'


// Functions
import { match as isNetworkSlugFilecoin } from '$/params/isNetworkSlugFilecoin'


// Param matcher
import type { ParamMatcher } from '@sveltejs/kit'

const isNetworkSlug: ParamMatcher = (param) => (
	networkBySlug.has(param)
	&& !isNetworkSlugFilecoin(param)
)

export const match = isNetworkSlug
