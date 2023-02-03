import { QueryStore } from '$houdini/plugins/houdini-svelte/runtime/stores'
import artifact from '$houdini/artifacts/ENSDomainQuery'

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
