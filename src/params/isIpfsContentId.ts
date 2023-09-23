import type { ParamMatcher } from '@sveltejs/kit'

import { decodeIpfsCid } from '../api/ipfs/contentId'

const isIpfsContentId: ParamMatcher = (param) => {
	try {
		decodeIpfsCid(param)
		return true
	} catch {
		return false
	}
}

export const match = isIpfsContentId
