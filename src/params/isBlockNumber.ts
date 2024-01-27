import type { ParamMatcher } from '@sveltejs/kit'

import { isBlockNumber } from '$/utils/isBlockNumber'

export const match: ParamMatcher = isBlockNumber
