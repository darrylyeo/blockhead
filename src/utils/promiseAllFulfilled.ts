export const promiseAllFulfilled = <T>(promises: Promise<T>[]) =>
	Promise.allSettled<T>(promises)
		.then(results =>
			Object.values(results)
				.filter(({ status }) => status === 'fulfilled')
				.map(({ value }) => value as T)
		)
