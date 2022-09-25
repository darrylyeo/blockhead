import { QueryStore } from '../runtime/stores'
import artifact from '../artifacts/ENSDomainsContainingQuery'

// create the query store

export class ENSDomainsContainingQueryStore extends QueryStore {
	constructor() {
		super({
			artifact,
			storeName: "ENSDomainsContainingQueryStore",
			variables: true,
		})
	}
}

export async function load_ENSDomainsContainingQuery(params) {
	const store = new ENSDomainsContainingQueryStore()

	await store.fetch(params)

	return {
		ENSDomainsContainingQuery: store,
	}
}

export const GQL_ENSDomainsContainingQuery = new ENSDomainsContainingQueryStore()

export default GQL_ENSDomainsContainingQuery
