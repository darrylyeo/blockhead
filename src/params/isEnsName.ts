import type { ParamMatcher } from '@sveltejs/kit'

const isEnsName: ParamMatcher = (param) =>
	/[^.]+[.](?:eth|[^.]+)/.test(param)

export const match = isEnsName
