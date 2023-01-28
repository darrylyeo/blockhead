import type { ParamMatcher } from '@sveltejs/kit'

const isEnsName: ParamMatcher = (param) =>
	/(?:[^.]+[.])*?(?:eth|xyz|luxe|kred|art|club|test)/.test(param)

export const match = isEnsName
