// Based on
// https://github.com/timhall/svelte-apollo/blob/master/src/observable.ts

import type { FetchResult, Observable, ObservableQuery } from '@apollo/client'
import { ApolloError } from '@apollo/client/core'
import type { Readable } from 'svelte/store'
import { readable } from 'svelte/store'


export interface Loading {
	loading: true
	data?: undefined
	error?: undefined
}
export interface Error {
	loading: false
	data?: undefined
	error: ApolloError | Error
}
export interface Data<TData = unknown> {
	loading: false
	data: TData | null | undefined
	error?: undefined
}

export type Result<TData = unknown> = Loading | Error | Data<TData>

export function readableFromApolloRequest<TData = unknown>(
	observable: Observable<FetchResult<TData>>,
	initialValue: Result<TData> = {
		loading: true,
		data: undefined,
		error: undefined,
	}
): Readable<Result<TData>> {
	const store = readable<Result<TData>>(initialValue, set => {
		const skipDuplicate = initialValue?.data !== undefined
		let skipped = false

		const subscription = observable.subscribe(
			result => {
				if (skipDuplicate && !skipped) {
					skipped = true
					return
				}

				if (result.errors) {
					const error = new ApolloError({ graphQLErrors: result.errors })
					set({ loading: false, data: undefined, error })
				} else {
					// console.log('result.data', result.data)
					set({ loading: false, data: result.data, error: undefined })
				}
			},
            error =>
                set({ loading: false, data: undefined, error })
		)

		return () => subscription.unsubscribe()
	})

	return store
}