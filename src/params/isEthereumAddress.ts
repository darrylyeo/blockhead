import type { ParamMatcher } from '@sveltejs/kit'

import { isAddress } from '@ethersproject/address'

const isEthereumAddress: ParamMatcher = (param) =>
	isAddress(param)

export const match = isEthereumAddress
