type RankedStringPattern = {
	name: string
	pattern: RegExp
	complexity: number
}

export const toRankedMatchGroups = (
	patterns: RankedStringPattern[],
) => (
	`(?:${
		patterns
			.sort((a, b) => b.complexity - a.complexity)
			.map(({ name, pattern }) => `(?<${name}>${pattern.source})`)
			.join('|')
	})`
)

export const createExactMatcher = (
	patterns: RankedStringPattern[],
) => (
	new RegExp(`^${toRankedMatchGroups(patterns)}$`)
)

export const createPartialMatcher = (
	patterns: RankedStringPattern[],
) => (
	new RegExp(toRankedMatchGroups(patterns), 'g')
)
