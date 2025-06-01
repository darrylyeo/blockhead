import type { ParamMatcher } from '@sveltejs/kit'

export const match: ParamMatcher = (param) => (
	/^\d+$/.test(param) && Number(param) >= 0 ?
		true
	: /^0x[a-fA-F0-9]{64}$/.test(param) ?
		true
	:
		false
)
