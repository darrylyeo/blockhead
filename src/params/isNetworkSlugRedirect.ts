import type { ParamMatcher } from '@sveltejs/kit'

import { networkRedirectsBySlug } from '../data/networks'

const isNetworkSlugRedirect: ParamMatcher = (param) =>
	param in networkRedirectsBySlug

export const match = isNetworkSlugRedirect
