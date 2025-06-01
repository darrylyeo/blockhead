import type { ParamMatcher } from '@sveltejs/kit'

export const match: ParamMatcher = (param) => (
	/^[a-zA-Z0-9_-]+$/.test(param)
	&& param.length > 0
)