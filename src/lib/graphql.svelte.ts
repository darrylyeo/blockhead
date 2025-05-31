// Types
import type { TadaDocumentNode } from 'gql.tada'


// Functions
import { getContextClient, queryStore } from '@urql/svelte'
import { fromStore } from 'svelte/store'

export const query = <_TadaDocumentNode extends TadaDocumentNode>(
	query: _TadaDocumentNode,
	variables: _TadaDocumentNode extends TadaDocumentNode<any, infer Variables> ? Variables : never,
) => {
	const client = getContextClient()

	const store = queryStore({
		client,
		query,
		variables,
	})

	return fromStore(store)
}
