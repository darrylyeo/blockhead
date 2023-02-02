import process from 'process'
import { Buffer } from 'buffer'

globalThis.global = globalThis
globalThis.Buffer = Buffer
globalThis.process = process


export const prerender = 'auto'

const isStatic = !!process.env.SVELTE_BUILD_STATIC
export const trailingSlash = isStatic ? 'always' : 'never'
