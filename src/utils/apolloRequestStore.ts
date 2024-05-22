// Based on
// https://github.com/timhall/svelte-apollo/blob/e305cc246345823263f511ed387d6e84ee720b26/src/observable.ts

import type { FetchResult, Observable, ObservableQuery } from '@apollo/client'
import { ApolloError } from '@apollo/client/core'
import { readable } from 'svelte/store'

import type { ApolloResult } from './apolloResult'


export const apolloRequestStore = <TData = unknown>(
	observable: Observable<FetchResult<TData>>,
	initialValue: ApolloResult<TData> = {
		loading: true,
		data: undefined,
		error: undefined,
	}
) => (
	readable<ApolloResult<TData>>(initialValue, set => {
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
)
