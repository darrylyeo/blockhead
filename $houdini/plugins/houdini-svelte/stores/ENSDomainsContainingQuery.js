import { QueryStore } from '$houdini/plugins/houdini-svelte/runtime/stores'
import artifact from '$houdini/artifacts/ENSDomainsContainingQuery'

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
