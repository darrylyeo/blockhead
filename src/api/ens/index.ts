// Types
import type { BrandedString } from '$/utils/branded'

export namespace ENS {
	export type Name = BrandedString<'EnsName'>
	export type Domain = NonNullable<Awaited<ReturnType<typeof getEnsName>>>['domains'][number]
	export type Resolver = NonNullable<Domain['resolver']>
	export type DomainEvent = Domain['events'][number]
}


// gql.tada
import { initGraphQLTada } from 'gql.tada'

import type { introspection } from './graphql-env'

const graphql = initGraphQLTada<{
	introspection: introspection,
}>()


// urql
import { Client, fetchExchange } from '@urql/svelte'

const client = new Client({
	url: 'https://api.thegraph.com/subgraphs/name/ensdomains/ens',
	exchanges: [
		fetchExchange,
	],
})


// Fragments
const Domain = graphql(`
	fragment Domain on Domain @_unmask {
		__typename
		id
		name
		labelName
		labelhash
		parent {
			id
			name
		}
		subdomains {
			id
			name
		}
		resolvedAddress {
			__typename
			id
		}
		owner {
			__typename
			id
		}
		resolver {
			__typename
			id
			domain {
				id
			}
			address
			addr {
				id
			}
			texts
			coinTypes
			events {
				id
				blockNumber
				transactionID
			}
		}
		ttl
		isMigrated
		events {
			__typename
			id
			blockNumber
			transactionID
			... on Transfer {
				owner {
					id
				}
			}
			... on NewOwner {
				owner {
					id
				}
			}
			... on NewResolver {
				resolver {
					id
					address
				}
			}
			... on NewTTL {
				ttl
			}
		}
	}
`)


// Queries
export const getEnsName = async ({
	name,
}: {
	name: string,
}) => (
	await client
		.query(
			graphql(`
				query EnsName(
					$name: String!
				) {
					domains(
						where: {
							name: $name
						}
					) {
						...Domain
					}
				}
			`, [
				Domain,
			]),
			{
				name,
			},
		)
		.toPromise()
		.then(result => {
			if(result.error)
				throw result.error

			return result.data
		})
)

export const getEnsDomainsContaining = async ({
	query,
}: {
	query: string,
}) => (
	await client
		.query(
			graphql(`
				query ENSDomainsContainingQuery(
					$query: String!
				) {
					domains(
						where: {
							name_contains: $query
							name_not: $query
						}
					) {
						...Domain
					}
				}
			`, [
				Domain,
			]),
			{
				query,
			},
		)
		.toPromise()
		.then(result => {
			if(result.error)
				throw result.error

			return result.data
		})
)

export const getEnsDomainsByOwner = async (
	owner: string,
) => (
	await client
		.query(
			graphql(`
				query ENSDomainsByOwner($owner: String!) {
					domains(
						where: {
							owner: $owner
						}
					) {
						...Domain
					}
				}
			`, [
				Domain,
			]),
			{
				owner,
			},
		)
		.toPromise()
		.then(result => {
			if(result.error)
				throw result.error

			return result.data
		})
)
