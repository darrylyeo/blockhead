import type { ParamMatcher } from '@sveltejs/kit'

import { moxieSubjectIdRegex } from '$/api/moxie/index'

const isMoxieSubjectId: ParamMatcher = (param) => (
	moxieSubjectIdRegex.test(param)
)

export const match = isMoxieSubjectId
