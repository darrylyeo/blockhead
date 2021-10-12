import { readable } from 'svelte/store'

export const colorTheme = readable<'dark' | 'light'>('dark', set => {
	const prefersDark = globalThis.matchMedia('(prefers-color-scheme: dark)')

	set(prefersDark.matches ? 'dark' : 'light')
	prefersDark.addEventListener('change', ({matches}) =>
		set(matches ? 'dark' : 'light')
	)
})