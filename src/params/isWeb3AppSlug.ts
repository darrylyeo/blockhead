import type { ParamMatcher } from '@sveltejs/kit'

import { web3AppsBySlug } from '$/data/web3Apps'

const isWeb3AppSlug: ParamMatcher = (param) =>
	param in web3AppsBySlug

export const match = isWeb3AppSlug
