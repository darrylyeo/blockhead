import { readable } from 'svelte/store'

import { promiseAllFulfilled } from './promiseAllFulfilled'

export const parallelLoaderStore = <T, Result>(items: T[], asyncMap: (item: T) => Promise<Result>) => (
	readable<{
		loading: boolean,
		data?: Map<T, Result>
	}>({ loading: true }, set => {
		const promiseMap = new Map(
			items.map(item => [
				item,
				asyncMap(item)
			])
		)

		const results: Map<T, Result> = new Map

		for (const [item, promise] of promiseMap.entries())
			promise.then(result => {
				results.set(item, result)
				set({
					loading: true,
					data: results
				})
			})
			.catch(() => {})
			// .catch(console.error)

		promiseAllFulfilled([...promiseMap.values()]).then(() => set({
			loading: false,
			data: results
		}))
	})

)
