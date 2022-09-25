import type { ENSDomainsContainingQuery$input, ENSDomainsContainingQuery$result, QueryStore, QueryStoreFetchParams} from '$houdini'

export declare class ENSDomainsContainingQueryStore extends QueryStore<ENSDomainsContainingQuery$result, ENSDomainsContainingQuery$input> {
	constructor() {
		// @ts-ignore
		super({})
	}
}

export const GQL_ENSDomainsContainingQuery: ENSDomainsContainingQueryStore

export declare const load_ENSDomainsContainingQuery: (params: QueryStoreFetchParams<ENSDomainsContainingQuery$result, ENSDomainsContainingQuery$input>) => Promise<{ENSDomainsContainingQuery: ENSDomainsContainingQueryStore}>

export default ENSDomainsContainingQueryStore
