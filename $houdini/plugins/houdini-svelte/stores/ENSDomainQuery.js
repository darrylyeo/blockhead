import { QueryStore } from '../runtime/stores/query'
import artifact from '$houdini/artifacts/ENSDomainQuery'
import { initClient } from '$houdini/plugins/houdini-svelte/runtime/client'

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
	await initClient()

	const store = new ENSDomainQueryStore()

	await store.fetch(params)

	return {
		ENSDomainQuery: store,
	}
}
