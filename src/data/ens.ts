import { THE_GRAPH_ENS_URL } from '../config'

import { ApolloClient, createHttpLink, gql, InMemoryCache } from '@apollo/client/core'
import { readableFromApolloRequest } from './apollo-store'


// Lazy instantiate (incompatible with Sapper SSR)
let client
function getENSClient(){
	return client || (
		client = new ApolloClient({
			cache: new InMemoryCache(),
			link: createHttpLink({
				uri: THE_GRAPH_ENS_URL,
			})
		})
	)
}


// GraphQL Reference:
// https://thegraph.com/explorer/subgraph/ensdomains/ens
export namespace ENS {
	export type ID = string
	export type Int = number

	export type Account = {
		id: string
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
		id: ID
		blockNumber: Int
		transactionID: Bytes
	}
	export type BigInt = string
	export type Bytes = string

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
}


const sanitize = name => name.replace(/\)/g, '')


export function queryENSDomain(domain) {
	return readableFromApolloRequest<{domains: ENS.Domain[]}>(getENSClient().subscribe({
		query: gql`
			query {
				domains(domain: "${sanitize(domain)}") {
					id
					name
					labelName
					labelhash
					parent { id name labelName labelhash }
					subdomains { id name labelName labelhash }
					resolvedAddress { id }
					owner { id }
					resolver {
						id
						address
						addr { id }
						texts
						coinTypes
						events { id blockNumber transactionID }
					}
					ttl
					isMigrated
					events { id blockNumber transactionID }
				}
			}
		`
	}))
}