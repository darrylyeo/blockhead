import type { ParamMatcher } from '@sveltejs/kit'
import { isFilecoinTransactionId } from '../utils/isFilecoinTransactionId'

export const match: ParamMatcher = isFilecoinTransactionId
