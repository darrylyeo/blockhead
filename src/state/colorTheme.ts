import { derived } from 'svelte/store'
import { matchesMediaQuery } from '../utils/matchesMediaQuery'

export const colorTheme = derived(
	matchesMediaQuery('(prefers-color-scheme: dark)'),
	($matches) => (
		$matches
			? 'dark'
			: 'light'
	)
)
