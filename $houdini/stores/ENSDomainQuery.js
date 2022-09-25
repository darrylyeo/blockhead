import { QueryStore } from '../runtime/stores'
import artifact from '../artifacts/ENSDomainQuery'

// create the query store

export class ENSDomainQueryStore extends QueryStore {
	constructor() {
		super({
			artifact,
			storeName: "ENSDomainQueryStore",
			variables: true,
		})
	}
}

export async function load_ENSDomainQuery(params) {
	const store = new ENSDomainQueryStore()

	await store.fetch(params)

	return {
		ENSDomainQuery: store,
	}
}

export const GQL_ENSDomainQuery = new ENSDomainQueryStore()

export default GQL_ENSDomainQuery
