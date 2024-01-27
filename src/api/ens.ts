import { ApolloClient, createHttpLink, gql, InMemoryCache } from '@apollo/client/core'
import { apolloRequestStore } from '$/utils/apolloRequestStore'
import type { BrandedString } from '$/utils/branded'


const THE_GRAPH_ENS_URL = 'https://api.thegraph.com/subgraphs/name/ensdomains/ens'


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
	export type String = string

	export type Name = BrandedString<'EnsName'>

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
		coinTypes: `${Int[]}` | null
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
		name: Name
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
	return apolloRequestStore<{domains: ENS.Domain[]}>(getENSClient().subscribe({
		query: gql`
			query ENSDomain($name: String!) {
				domains(where: {name: $name}) {
					__typename
					id
					name
					parent { id name }
					subdomains { id name }
					resolvedAddress { id }
					owner { id }
					resolver {
						__typename
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
		`,
		variables: {
			name
		}
	}))
}

export function queryENSDomainsContaining(query) {
	return apolloRequestStore<{domains: ENS.Domain[]}>(getENSClient().subscribe({
		query: gql`
			query ENSDomainContaining($query: String!) {
				domains(where: {name_contains: $query, name_not: $query}) {
					__typename
					id
					name
					parent { id name }
					subdomains { id name }
					resolvedAddress { id }
					owner { id }
					resolver {
						__typename
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
		`,
		variables: {
			query
		}
	}))
}