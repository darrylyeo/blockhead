import type { ParamMatcher } from '@sveltejs/kit'
import { isEvmTransactionId } from '../utils/isEvmTransactionId'

export const match: ParamMatcher = isEvmTransactionId
