import { browser } from '$app/environment'

import { readable } from 'svelte/store'

export const matchesMediaQuery = (query: string) => readable(false, set => {
	if(!browser) return

	const mediaQueryList = globalThis.matchMedia(query)

	const onMatches = (e?: Event) => set(mediaQueryList.matches)

	onMatches()

	mediaQueryList.addEventListener?.('change', onMatches)
	mediaQueryList.addListener?.(onMatches)

	return () => {
		mediaQueryList.removeEventListener('change', onMatches)
		mediaQueryList.removeListener(onMatches)
	}
})
