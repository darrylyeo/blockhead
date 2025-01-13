// Types/constants
import { type AccountId, AccountIdType } from '$/data/accountId'


// Patterns
import { type StringPattern, stringPatterns } from '$/data/stringPatterns'
import { createExactMatcher } from './stringPatterns'

const accountIdPattern = createExactMatcher(
	(
		Object.values(AccountIdType) as unknown as StringPattern[]
	)
		.map(pattern => ({
			name: pattern,
			pattern: stringPatterns[pattern].pattern,
			complexity: stringPatterns[pattern].complexity,
		}))
)


// Functions
import { findMatchedCaptureGroupName } from '$/utils/findMatchedCaptureGroup'

export const resolveAccountIdType = (accountId: AccountId) => (
	findMatchedCaptureGroupName<AccountIdType>(accountIdPattern, accountId)
)
