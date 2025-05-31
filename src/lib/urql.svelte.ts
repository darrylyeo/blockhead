import { getContextClient, queryStore } from '@urql/svelte'
import { fromStore } from 'svelte/store'

export const query = <
	Data = any,
	Variables extends Record<string, any> = Record<string, any>
>(
	query: string,
	variables: Variables,
) => {
	const client = getContextClient()
	
	const store = queryStore<Data, Variables>({
		client,
		query,
		variables,
	})

	return fromStore(store)
}
