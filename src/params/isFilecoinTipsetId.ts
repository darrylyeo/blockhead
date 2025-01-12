import type { ParamMatcher } from '@sveltejs/kit'
import { isFilecoinTipsetId } from '$/utils/isFilecoinTipsetId'

export const match: ParamMatcher = isFilecoinTipsetId
