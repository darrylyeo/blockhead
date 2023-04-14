// Polyfills

import process from 'process'
import { Buffer } from 'buffer'

globalThis.global = globalThis
globalThis.Buffer = Buffer
globalThis.process = process


// Shims

import { shim as shimArrayPrototypeGroup } from 'array.prototype.group'
import { shim as shimArrayPrototypeGroupToMap } from 'array.prototype.groupToMap'

shimArrayPrototypeGroup()
shimArrayPrototypeGroupToMap()


// SvelteKit

export const prerender = 'auto'

const isStatic = !!process.env.SVELTE_BUILD_STATIC
export const trailingSlash = isStatic ? 'always' : 'never'
