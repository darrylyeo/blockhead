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
	export type BigInt = string
	export type Bytes = string

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
		id: ID
		blockNumber: Int
		transactionID: Bytes
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
	return readableFromApolloRequest<{domains: ENS.Domain[]}>(getENSClient().subscribe({
		query: gql`
			query getENSDomainByName($name: String!) {
				domains(where: {name_contains: $name}) {
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
		`,
		variables: {
			name
		}
	}))
}