import { THE_GRAPH_ENS_URL } from '../config'

// import { ApolloClient, createHttpLink, gql, InMemoryCache } from '@apollo/client/core'
// import { readableFromApolloRequest } from './apollo-store'

import { createClient, dedupExchange, fetchExchange, initClient, operationStore, query } from '@urql/svelte'
import { cacheExchange } from '@urql/exchange-graphcache'

export function initENSClient(){
	initClient({
		url: THE_GRAPH_ENS_URL,
		exchanges: [dedupExchange, cacheExchange({}), fetchExchange]
	})
}

// Lazy instantiate (incompatible with Sapper SSR)
// let client
// function getENSClient(){
// 	return client || (
// 		client = createClient({
// 			url: THE_GRAPH_ENS_URL,
// 			exchanges: [dedupExchange, cacheExchange({}), fetchExchange]
// 		})
// 	)
// }


// GraphQL Reference:
// https://thegraph.com/explorer/subgraph/ensdomains/ens
export namespace ENS {
	export type ID = string
	export type Int = number
	export type BigInt = string
	export type Bytes = string
	export type String = string

	export type Account = {
		id: string
		domains: Domain[]
		registrations: Registration[]
	}
	export type Resolver = {
		id: ID
		domain: Domain
		address: Bytes
		addr: Account
		texts: String[]
		coinTypes: Int[]
		events: ResolverEvent[]
	}
	export type ResolverEvent = {
		id: ID
		resolver: Resolver
		blockNumber: Int
		transactionID: Bytes
	}
	export type DomainEvent = {
		__typename: 'Transfer' | 'NewOwner' | 'NewResolver' | 'NewTTL'
		id: ID
		blockNumber: Int
		transactionID: Bytes

		owner?: Account
		resolver?: Resolver
		ttl?: BigInt
	}

	export type Domain = {
		id: ID
		name: String
		labelName: String
		labelhash: Bytes
		parent: Domain
		subdomains: Domain[]
		resolvedAddress: Account
		owner: Account
		resolver: Resolver
		ttl: BigInt
		isMigrated: Boolean
		events: DomainEvent[]
	}

	export type Registration = {
		id: ID
		domain: Domain
		registrationDate: BigInt
		expiryDate: BigInt
		registrant: Account
		labelName: String
	}
}


export function queryENSDomain(name) {
	return operationStore<{domains: ENS.Domain[]}>(`
		query ENSDomain($name: String!) {
			domains(where: {name: $name}) {
				id
				name
				parent { id name }
				subdomains { id name }
				resolvedAddress { id }
				owner { id }
				resolver {
					id
					address
					texts
					coinTypes
					events { id blockNumber transactionID }
				}
				ttl
				isMigrated
				events {
					__typename
					id
					blockNumber
					transactionID
					... on Transfer {
						owner { id }
					}
					... on NewOwner {
						owner { id }
					}
					... on NewResolver {
						resolver { id address }
					}
					... on NewTTL {
						ttl
					}
				}
			}
		}
	`, {
		name
	})
}

export function queryENSDomainsContaining(query) {
	return operationStore<{domains: ENS.Domain[]}>(`
		query ENSDomainContaining($query: String!) {
			domains(where: {name_contains: $query, name_not: $query}) {
				id
				name
				parent { id name }
				subdomains { id name }
				resolvedAddress { id }
				owner { id }
				resolver {
					id
					address
					texts
					coinTypes
					events { id blockNumber transactionID }
				}
				ttl
				isMigrated
				events {
					__typename
					id
					blockNumber
					transactionID
					... on Transfer {
						owner { id }
					}
					... on NewOwner {
						owner { id }
					}
					... on NewResolver {
						resolver { id address }
					}
					... on NewTTL {
						ttl
					}
				}
			}
		}
	`, {
		query
	})
}