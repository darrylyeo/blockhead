import type { ParamMatcher } from '@sveltejs/kit'

import { isEvmAddress } from '$/utils/isEvmAddress'
// import { isAddress } from 'ethers'

export const match: ParamMatcher = isEvmAddress
// export const match: ParamMatcher = isAddress
