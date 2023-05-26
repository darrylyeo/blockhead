import { QueryStore } from '../runtime/stores/query'
import artifact from '$houdini/artifacts/ENSDomainsContainingQuery'
import { initClient } from '$houdini/plugins/houdini-svelte/runtime/client'

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
	await initClient()

	const store = new ENSDomainsContainingQueryStore()

	await store.fetch(params)

	return {
		ENSDomainsContainingQuery: store,
	}
}
