import type { ParamMatcher } from '@sveltejs/kit'
import { isFilecoinBlockCid } from '$/utils/isFilecoinBlockCid'

export const match: ParamMatcher = isFilecoinBlockCid
