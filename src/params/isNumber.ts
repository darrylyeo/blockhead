import type { ParamMatcher } from '@sveltejs/kit'

import { isNumber } from '$/utils/isNumber'

export const match: ParamMatcher = isNumber
