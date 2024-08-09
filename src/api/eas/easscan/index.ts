/**
 * Easscan GraphQL API
 * @link https://docs.attest.org/docs/developer-tools/api
 */


// Types/constants
export const graphqlEndpoints = [
	{
		label: 'Ethereum',
		chainId: 1,
		endpoint: 'https://easscan.org/graphql',
	},
	{
		label: 'Ethereum (Sepolia)',
		chainId: 11155111,
		endpoint: 'https://sepolia.easscan.org/graphql',
	},
	{
		label: 'Arbitrum',
		chainId: 42161,
		endpoint: 'https://arbitrum.easscan.org/graphql',
	},
	{
		label: 'Base',
		chainId: 8453,
		endpoint: 'https://base.easscan.org/graphql',
	},
	{
		label: 'Base (Goerli)',
		chainId: 59144,
		endpoint: 'https://base-goerli.easscan.org/graphql',
	},
	{
		label: 'Linea',
		chainId: 534352,
		endpoint: 'https://linea.easscan.org/graphql',
	},
	{
		label: 'Optimism',
		chainId: 10,
		endpoint: 'https://optimism.easscan.org/graphql',
	},
	{
		label: 'Optimism (Goerli)',
		chainId: 1101,
		endpoint: 'https://optimism-goerli-bedrock.easscan.org/graphql',
	},
] as const satisfies {
	label: string,
	chainId: number,
	endpoint: string,
}[]


// gql.tada
import { initGraphQLTada } from 'gql.tada'

import type { introspection } from './graphql-env.ts'

const graphql = initGraphQLTada<{
	introspection: introspection,
}>()


// urql
import { Client, cacheExchange, fetchExchange } from '@urql/svelte'
import type { Ethereum } from '$/data/networks/types.js'
import { handleUrqlResult } from '$/utils/urql.js'

const clients = new Map<Ethereum.ChainId, Client>()

export const getClient = ({
	chainId,
}: {
	chainId: Ethereum.ChainId
}) => {
	if(clients.has(chainId))
		return clients.get(chainId)!

	const endpointUrl = graphqlEndpoints.find(e => e.chainId === chainId)?.endpoint

	if(!endpointUrl)
		throw new Error(`Ethereum Attestation Service does not yet support chain ID ${chainId}.`)

	const client = new Client({
		url: endpointUrl,
		exchanges: [
			cacheExchange,
			fetchExchange,
		],
	})

	clients.set(chainId, client)

	return client
}


// Fragments
const Schema = graphql(`
	fragment Schema on Schema @_unmask {
		id
		time
		schema
		_count {
			attestations
			schemaNames
		}
		creator
		id
		index
		resolver
		revocable
		schema
		schemaNames {
			attesterAddress
			id
			isCreator
			name
			schema {
				id
				time
				schema
				_count {
					attestations
					schemaNames
				}
				creator
				id
				index
				resolver
				revocable
				schema
				schemaNames {
					attesterAddress
					id
					isCreator
					name
					schema {
						id
						time
						schema
						_count {
							attestations
							schemaNames
						}
						creator
						id
						index
						resolver
						revocable
						schema
						# schemaNames {
							
						# }
						time
						txid
					}
					schemaId
					time
				}
				time
				txid
			}
			schemaId
			time
		}
		time
		txid
	}
`)

const Attestation = graphql(`
	fragment Attestation on Attestation @_unmask {
		id
		attester
		data
		decodedDataJson
		expirationTime
		ipfsHash
		isOffchain
		recipient
		refUID
		revocable
		revocationTime
		revoked
		schema {
			...Schema
		}
		schemaId
		time
		timeCreated
		txid
	}
`, [
	Schema,
])


// Queries
export const getSchemas = async ({
	chainId,
	orderByTime = 'desc',
	take = 100,
	skip = 0,
}: {
	chainId: number,
	orderByTime: 'asc' | 'desc',
	take: number,
	skip: number,
}) => (
	await getClient({ chainId })
		.query(
			graphql(`
				query Schemas(
					$orderByTime: SortOrder
					$take: Int!
					$skip: Int!
				) {
					schemata(
						orderBy: {
							time: $orderByTime
						}
						take: $take
						skip: $skip
					) {
						...Schema
						attestations {
							...Attestation
						}
					}
				}
			`, [
				Attestation
			]),
			{
				orderByTime,
				take,
				skip,
			},
		)
		.toPromise()
		.then(handleUrqlResult)
)

export const getSchema = async ({
	chainId,
	schemaId,
}: {
	chainId: number,
	schemaId: string,
}) => (
	await getClient({ chainId })
		.query(
			graphql(`
				query Schema(
					$schemaId: String!
				) {
					schema(
						where: {
							id: $schemaId
						}
					) {
						...Schema
					}
				}
			`, [
				Schema
			]),
			{ schemaId },
		)
		.toPromise()
		.then(handleUrqlResult)
)

export const getAttestations = async ({
	chainId,
	orderByTime = 'desc',
	take = 100,
	skip = 0,
}: {
	chainId: number,
	orderByTime: 'asc' | 'desc',
	take: number,
	skip: number,
}) => (
	await getClient({ chainId })
		.query(
			graphql(`
				query Attestations(
					$orderByTime: SortOrder
					$take: Int!
					$skip: Int!
				) {
					attestations(
						orderBy: {
							time: $orderByTime
						}
						take: $take
						skip: $skip
					) {
						...Attestation
					}
				}
			`, [
				Attestation
			]),
			{
				orderByTime,
				take,
				skip,
			},
		)
		.toPromise()
		.then(handleUrqlResult)
)

export const getAttestation = async ({
	chainId,
	attestationId,
}: {
	chainId: number,
	attestationId: string,
}) => (
	await getClient({ chainId })
		.query(
			graphql(`
				query Attestation(
					$attestationId: String!
				) {
					attestation(
						where: {
							id: $attestationId
						}
					) {
						...Attestation
					}
				}
			`, [
				Attestation
			]),
			{
				attestationId,
			},
		)
		.toPromise()
		.then(handleUrqlResult)
)
