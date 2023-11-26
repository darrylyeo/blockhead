// Polyfills

import process from 'process'
import { Buffer } from 'buffer'

globalThis.global = globalThis
globalThis.Buffer = Buffer
globalThis.process = process

import fromAsync from 'array-from-async'
Array.fromAsync ||= fromAsync


// Shims

// import shimArrayPrototypeGroup from 'array.prototype.group'
// import shimArrayPrototypeGroupToMap from 'array.prototype.grouptomap'

// shimArrayPrototypeGroup.shim()
// shimArrayPrototypeGroupToMap.shim()

import shimRegexpEscape from 'regexp.escape'
shimRegexpEscape.shim()

Array.prototype.groupToMap ||= function(callbackFn, _this = this){
	const map = new Map()
	for (const item of _this) {
		const key = callbackFn(item)
		const group = map.get(key) || []
		group.push(item)
		map.set(key, group)
	}
	return map
}


// SvelteKit

export const prerender = 'auto'

const isStatic = !!process.env.SVELTE_BUILD_STATIC
export const trailingSlash = isStatic ? 'always' : 'never'
