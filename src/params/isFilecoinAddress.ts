import type { ParamMatcher } from '@sveltejs/kit'
import { isFilecoinAddress } from '$/utils/isFilecoinAddress'

export const match: ParamMatcher = isFilecoinAddress
