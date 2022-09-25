import type { ENSDomainQuery$input, ENSDomainQuery$result, QueryStore, QueryStoreFetchParams} from '$houdini'

export declare class ENSDomainQueryStore extends QueryStore<ENSDomainQuery$result, ENSDomainQuery$input> {
	constructor() {
		// @ts-ignore
		super({})
	}
}

export const GQL_ENSDomainQuery: ENSDomainQueryStore

export declare const load_ENSDomainQuery: (params: QueryStoreFetchParams<ENSDomainQuery$result, ENSDomainQuery$input>) => Promise<{ENSDomainQuery: ENSDomainQueryStore}>

export default ENSDomainQueryStore
