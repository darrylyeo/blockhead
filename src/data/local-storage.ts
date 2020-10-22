import type { Writable } from 'svelte/store'
import { writable, get } from 'svelte/store'

// Writable Svelte store that syncs JSON value to localStorage
export function localStorageWritable<T>(localStorageKey, value): Writable<T> {
	const store = writable(value)

	const json = globalThis.localStorage?.getItem(localStorageKey)	
	if(json)
		store.set(JSON.parse(json))
	
	return {
		set(value) {console.log('set', value)
			globalThis.localStorage.setItem(localStorageKey, JSON.stringify(value))
			store.set(value)
		},

		update(callback) {
			const value = callback(get(store))
			this.set(value)
		},

		subscribe: store.subscribe
	}
}
