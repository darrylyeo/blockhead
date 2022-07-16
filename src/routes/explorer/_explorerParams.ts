import { derived, writable, type Readable } from 'svelte/store'


// Param stores

export const networkSlug = writable('')
export const query = writable('')


// Derived path store

export const derivedPath: Readable<string> = derived([
	networkSlug,
	query
], ([
	$networkSlug,
	$query
], set) => set(
	`/explorer${
		$networkSlug ?
			`/${$networkSlug}${
				$query ?
					`/${$query}`
				:
					''
			}`
		:
			''
	}`
))
