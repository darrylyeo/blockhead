// Types
import type { TadaDocumentNode } from 'gql.tada'


// Functions
import { getContextClient, queryStore } from '@urql/svelte'
import { fromStore } from 'svelte/store'

export const query = <
	Result extends Record<string, any>,
	Variables extends Record<string, any> = Record<string, any>
>(
	query: TadaDocumentNode<Result, Variables>,
	variables: Variables,
) => {
	const client = getContextClient()

	const wrappedResult = $derived(
		fromStore(
			queryStore({
				client,
				query,
				variables,
			})
		)
	)

	return wrappedResult.current
}
