import type { ParamMatcher } from '@sveltejs/kit'

// import { isAddress } from 'ethers'

const isEthereumAddress: ParamMatcher = (param) =>
	/^0x[0-9a-f]{40}$/i.test(param)
	// isAddress(param)

export const match = isEthereumAddress
