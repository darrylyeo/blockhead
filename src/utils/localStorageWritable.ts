import type { Writable } from 'svelte/store'
import { writable, get } from 'svelte/store'

// Writable Svelte store that syncs JSON value to localStorage
export const localStorageWritable = <Value, SerializedValue = Value>(
	localStorageKey: string,
	value: SerializedValue,
	deserialize: ((_: SerializedValue) => Value) = _ => _ as unknown as Value,
	serialize: ((_: Value) => SerializedValue) = _ => _ as unknown as SerializedValue,
) => {
	const json = globalThis.localStorage?.getItem(localStorageKey)

	const store = writable(deserialize(json ? JSON.parse(json) : value))

	globalThis.addEventListener?.('storage', e => {
		if(e.key === localStorageKey) {
			const json = e.newValue
			if(json)
				store.set(deserialize(JSON.parse(json)))
		}
	})

	return {
		set(value) {
			// console.log('Set', localStorageKey, value)
			globalThis.localStorage?.setItem(localStorageKey, JSON.stringify(serialize(value)))
			store.set(value)
		},

		update(callback) {
			const value = callback(get(store))
			this.set(value)
		},

		subscribe: store.subscribe
	} as Writable<Value>
}
