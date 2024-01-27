import type { ParamMatcher } from '@sveltejs/kit'

import { isDidUrl } from '$/api/ceramic/did'

export const match: ParamMatcher = isDidUrl
