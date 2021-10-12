import { quintOut } from 'svelte/easing'

export function scaleFont(node: Element, { delay = 0, duration = 200, easing = quintOut }){
	// const {fontSize} = getComputedStyle(node)
	return {
		delay,
		duration,
		easing,
		css: (t, u) => t === 0 ? `font-size: 0` : ''
		// css: (t, u) => `font-size: calc(${t} * ${fontSize})`
	}
}