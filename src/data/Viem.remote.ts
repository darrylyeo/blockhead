import { query } from '$app/server'
import type { EvmBlock } from '../schema/EvmBlock.ts'
import type { EvmNetwork } from '../schema/EvmNetwork.ts'
import type { EnsDomain } from '../schema/EnsDomain.ts'
import type { EvmActor } from '../schema/EvmActor.ts'
import { EvmActorType } from '../schema/EvmActor.ts'
import type { EvmTransaction } from '../schema/EvmTransaction.ts'
import type { Identity } from '../schema/Identity.ts'
import { IdentityType } from '../schema/Identity.ts'
import { EntityType } from '../schema/_Entity.ts'
import { normalize } from 'viem/ens'

export const getBlock = query(
	'unchecked',
	async ({
		network,
		blockNumber,
	}: {
		network: EvmNetwork['$id']
		blockNumber: bigint
	}) => {
		const { getBlock: getBlockAction } = await import('viem/actions')
		const { getViemClient } = await import('../api/Viem/api.js')
		const client = getViemClient(network)
		const block = await getBlockAction(client, { blockNumber })

		return {
			$type: EntityType.EvmBlock,
			$id: {
				$network: network,
				number: blockNumber,
				hash: block.hash
			},
			$fields: {
				timestamp: Number(block.timestamp) * 1000,
				gasUsed: block.gasUsed,
				gasLimit: block.gasLimit,
				baseFeePerGas: block.baseFeePerGas ?? 0n,
				$$transactions: [],
				$previousBlock: {
					$network: network,
					number: blockNumber - 1n
				}
			}
		} satisfies EvmBlock
	}
)

export const getBlockNumber = query(
	'unchecked',
	async ({
		network,
	}: {
		network: EvmNetwork['$id']
	}) => {
		const { getBlockNumber } = await import('viem/actions')
		const { getViemClient } = await import('../api/Viem/api.js')
		const client = getViemClient(network)
		const blockNumber = await getBlockNumber(client)
		
		return await getBlock({ network, blockNumber })
	}
)

export const getLatestBlocks = query(
	'unchecked',
	async ({
		network,
		count = 50
	}: {
		network: EvmNetwork['$id'],
		count?: number
	}) => {
		const { getBlockNumber } = await import('viem/actions')
		const { getViemClient } = await import('../api/Viem/api.js')
		const client = getViemClient(network)
		const latestBlockNumber = await getBlockNumber(client)
		
		const blockNumbers: bigint[] = []
		for (let i = 0; i < count; i++) {
			blockNumbers.push(latestBlockNumber - BigInt(i))
		}
		
		return await Promise.all(
			blockNumbers.map(blockNumber => getBlock({ network, blockNumber }))
		)
	}
)

export const getEnsNameFromAddress = query(
	'unchecked',
	async ({
		identity,
	}: {
		identity: Identity['$id']
	}): Promise<Identity | null> => {
		if (identity.type !== IdentityType.EvmActor) return null

		const { getEnsName } = await import('viem/actions')
		const { getViemClient } = await import('../api/Viem/api.js')
		const client = getViemClient(identity.actor.$network)
		const ensName = await getEnsName(client, { address: identity.actor.address })
		
		if (!ensName) return null
		
		const ensDomain = {
			$type: EntityType.EnsDomain,
			$id: {
				name: ensName as EnsDomain['$id']['name']
			},
			$fields: {
				$owner: identity.actor,
				$$actors: [identity.actor]
			}
		} satisfies EnsDomain

		return {
			$type: EntityType.Identity,
			$id: {
				type: IdentityType.EnsDomain,
				ensDomain: { name: ensDomain.$id.name }
			},
			$fields: {
				links: [{
					isPrimary: true,
					$actor: identity.actor
				}]
			}
		} satisfies Identity
	}
)

export const getAddressFromEns = query(
	'unchecked',
	async ({
		identity,
		network,
	}: {
		identity: Identity['$id']
		network?: EvmNetwork['$id']
	}): Promise<Identity | null> => {
		if (identity.type !== IdentityType.EnsDomain) return null

		const { getEnsAddress } = await import('viem/actions')
		const { getViemClient } = await import('../api/Viem/api.js')
		const resolvedNetwork = network ?? { chainId: 1 }
		const client = getViemClient(resolvedNetwork)
		const address = await getEnsAddress(client, { name: normalize(identity.ensDomain.name) })
		
		if (!address) return null
		
		const actor = {
			$type: EntityType.EvmActor,
			$id: {
				$network: resolvedNetwork,
				address: address as EvmActor['$id']['address']
			},
			$fields: {
				type: EvmActorType.EOA,
				$$transactions: []
			}
		} satisfies EvmActor

		return {
			$type: EntityType.Identity,
			$id: {
				type: IdentityType.EvmActor,
				actor: actor.$id
			},
			$fields: {
				links: [{
					isPrimary: true,
					$actor: actor.$id
				}]
			}
		} satisfies Identity
	}
)

export const getTransactions = query(
	'unchecked',
	async ({
		actor,
		fromBlock,
		toBlock,
	}: {
		actor: EvmActor['$id']
		fromBlock?: bigint
		toBlock?: bigint
	}) => {
		const { getLogs, getTransaction, getTransactionReceipt, getBlock } = await import('viem/actions')
		const { getViemClient } = await import('../api/Viem/api.js')
		const client = getViemClient(actor.$network)

		const logs = await getLogs(client, {
			address: actor.address,
			fromBlock: fromBlock ?? 'earliest',
			toBlock: toBlock ?? 'latest',
		})

		const uniqueTxHashes = new Set<string>()
		for (const log of logs) {
			if (log.transactionHash) {
				uniqueTxHashes.add(log.transactionHash)
			}
		}

		const transactions = await Promise.all(
			Array.from(uniqueTxHashes).map(async (hash) => {
				const [tx, receipt] = await Promise.all([
					getTransaction(client, { hash: hash as `0x${string}` }),
					getTransactionReceipt(client, { hash: hash as `0x${string}` }).catch(() => null)
				])

				const txId = {
					$network: actor.$network,
					hash: tx.hash
				}

				let timestamp = 0
				if (receipt?.blockNumber) {
					const block = await getBlock(client, { blockNumber: receipt.blockNumber })
					timestamp = Number(block.timestamp) * 1000
				}

				return {
					$type: EntityType.EvmTransaction,
					$id: txId,
					$fields: {
						$fromActor: {
							$network: actor.$network,
							address: tx.from
						},
						$toActor: tx.to ? {
							$network: actor.$network,
							address: tx.to
						} : {
							$network: actor.$network,
							address: '0x0000000000000000000000000000000000000000' as `0x${string}`
						},
						value: tx.value,
						timestamp,
						$trace: {
							$transaction: txId,
							traceAddress: []
						},
						$$events: []
					}
				} satisfies EvmTransaction
			})
		)

		return transactions
	}
) 