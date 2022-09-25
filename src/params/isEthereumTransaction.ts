import type { ParamMatcher } from '@sveltejs/kit'

const isEthereumTransaction: ParamMatcher = (param) =>
	/^0x[0-9a-f]{64}$/i.test(param)

export const match = isEthereumTransaction
