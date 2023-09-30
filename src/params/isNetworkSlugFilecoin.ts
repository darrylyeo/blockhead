import type { ParamMatcher } from '@sveltejs/kit'

const isNetworkSlugFilecoin: ParamMatcher = param => param === 'filecoin'

export const match = isNetworkSlugFilecoin
