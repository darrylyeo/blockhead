// Polyfills

import process from 'process'
import { Buffer } from 'buffer'

globalThis.global = globalThis
globalThis.Buffer = Buffer
globalThis.process = process

import fromAsync from 'array-from-async'
Array.fromAsync ||= fromAsync


// Shims
import shimMapGroupBy from 'map.groupby'
shimMapGroupBy.shim()

import shimObjectGroupBy from 'object.groupby'
shimObjectGroupBy.shim()

import shimRegexpEscape from 'regexp.escape'
shimRegexpEscape.shim()


// SvelteKit

export const prerender = 'auto'

const isStatic = !!process.env.SVELTE_BUILD_STATIC
export const trailingSlash = isStatic ? 'always' : 'never'
