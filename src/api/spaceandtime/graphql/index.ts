// Types/constants
import type { Ethereum } from '$/data/networks/types'

const endpointUrl = 'https://api.spaceandtime.dev/v1/graphql'


// Auth
import { getAccessToken } from '../gateway/auth'


// urql
import { Client, cacheExchange, fetchExchange } from '@urql/svelte'
import { supportedNetworks } from '..'
import { handleUrqlResult } from '$/utils/urql'
import { getFragmentFields } from '$/utils/gql-tada'

const clients = new Map<Ethereum.ChainId, Client>()

const getClient = async (
	chainId: Ethereum.ChainId,
) => {
	if (clients.has(chainId))
		return clients.get(chainId)!

	const schemaId = supportedNetworks[chainId]?.schemaId
	if (!schemaId)
		throw new Error(`Space and Time schema not found for chainId ${chainId}.`)


	const accessToken = await getAccessToken()

	const client = new Client({
		url: endpointUrl,
		exchanges: [
			// cacheExchange, // omit `__typename` fields in GraphQL queries to avoid triggering SQL errors
			fetchExchange,
		],
		fetchOptions: () => ({
			headers: {
				'Authorization': `Bearer ${accessToken}`,
				'Schema': schemaId,
			},
		}),
	})

	clients.set(chainId, client)

	return client
}


// gql.tada
import { graphql as graphqlEthereum } from './ethereum'
import { EthereumBlock, EthereumTransaction } from './ethereum/fragments'

import { graphql as graphqlPolygon } from './polygon'
import { PolygonBlock, PolygonTransaction } from './polygon/fragments'


// Queries
export const getBlock = async ({
	chainId,
	blockNumber,
}: {
	chainId: Ethereum.ChainId,
	blockNumber: number,
}) => (
	await (await getClient(chainId))
		.query(
			(
				chainId === 1 ?
					graphqlEthereum(
						`
							query GetBlocks {
								ETHEREUM_BLOCKS(
									BLOCK_NUMBER: {
										Equals: ${blockNumber}
									}
								) {
									${getFragmentFields(EthereumBlock)}
								}
							}
						`,
					)
				: chainId === 137 ?
					graphqlPolygon(
						`
							query GetBlocks {
								POLYGON_BLOCKS(
									BLOCK_NUMBER: {
										Equals: ${blockNumber}
									}
								) {
									${getFragmentFields(PolygonBlock)}
								}
							}
						`,
					)
				:
					undefined as never
			),
			{}
		)
		.toPromise()
		.then(handleUrqlResult)
)

export const getTransactionsForBlock = async ({
	chainId,
	blockNumber,
	limit = 100,
}: {
	chainId: Ethereum.ChainId,
	blockNumber: number,
	limit?: number,
}) => (
	await (await getClient(chainId))
		.query(
			(
				chainId === 1 ?
					graphqlEthereum(
						`
							query GetTransactions($limit: Int) {
								ETHEREUM_TRANSACTIONS(
									BLOCK_NUMBER: {
										Equals: ${blockNumber}
									}
									Limit: $limit
								) {
									${getFragmentFields(EthereumTransaction)}
								}
							}
						`,
					)
				: chainId === 137 ?
					graphqlPolygon(
						`
							query GetTransactions($limit: Int) {
								POLYGON_TRANSACTIONS(
									BLOCK_NUMBER: {
										Equals: ${blockNumber}
									}
									Limit: $limit
								) {
									${getFragmentFields(PolygonTransaction)}
								}
							}
						`,
					)
				:
					undefined as never
			),
			{
				limit,
			}
		)
		.toPromise()
		.then(handleUrqlResult)
)

export const getTransaction = async ({
	chainId,
	hash,
}: {
	chainId: Ethereum.ChainId,
	hash: string,
}) => (
	await (await getClient(chainId))
		.query(
			(
				chainId === 1 ?
					graphqlEthereum(
						`
							query GetTransaction {
								ETHEREUM_TRANSACTIONS(
									TRANSACTION_HASH: {
										Equals: "${hash}"
									}
								) {
									${getFragmentFields(EthereumTransaction)}
								}
							}
						`,
					)
				: chainId === 137 ?
					graphqlPolygon(
						`
							query GetTransaction {
								POLYGON_TRANSACTIONS(
									TRANSACTION_HASH: {
										Equals: "${hash}"
									}
								) {
									${getFragmentFields(PolygonTransaction)}
								}
							}
						`,
					)
				:
					undefined as never
			),
			{}
		)
		.toPromise()
		.then(handleUrqlResult)
)
