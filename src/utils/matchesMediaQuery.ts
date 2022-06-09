import { readable } from 'svelte/store'

export const matchesMediaQuery = (query: string) => readable(false, set => {
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
