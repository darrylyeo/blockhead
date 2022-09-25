import type { ParamMatcher } from '@sveltejs/kit'

import { networksBySlug } from '../data/ethereum/networks'

const isNetworkSlug: ParamMatcher = (param) =>
	param in networksBySlug

export const match = isNetworkSlug
