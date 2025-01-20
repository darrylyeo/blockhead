import type { ParamMatcher } from '@sveltejs/kit'
import { isFilecoinTipsetCid } from '$/utils/isFilecoinTipsetCid'

export const match: ParamMatcher = isFilecoinTipsetCid
