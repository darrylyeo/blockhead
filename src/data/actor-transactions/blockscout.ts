import type { Address, Hash } from '$/entities/scalars'
import type { ChainId } from '$/entities/network'
import type { Transaction } from '$/entities/transaction'
import { TransactionFormat, TransactionStatus, TransactionCategory } from '$/entities/transaction'

export const fetch = async ({
	chainId,
	address,
	transactionLimit = 10,
	transactionOffset = 0
}: {
	chainId: ChainId
	address: Address
	transactionLimit?: number
	transactionOffset?: number
}) => {
	const { createClient, graphql } = await import('$/api/blockscout/graphql/index')

	try {
		return (
			await createClient(chainId)
				.query(
					graphql(`
						query GetAddressTransactions($hash: AddressHash!, $transactionLimit: Int!, $transactionOffset: String) {
							address(hash: $hash) {
								transactions(first: $transactionLimit, after: $transactionOffset) {
									edges {
										node {
											hash
											nonce
											index
											fromAddressHash
											toAddressHash
											value
											gas
											gasPrice
											gasUsed
											input
											blockNumber
											blockHash
											status
											hasErrorInInternalTransactions
											error
											revertReason
											maxFeePerGas
											maxPriorityFeePerGas
											type
											block {
												timestamp
												baseFeePerGas
											}
										}
									}
									pageInfo {
										hasNextPage
										hasPreviousPage
										startCursor
										endCursor
									}
								}
							}
						}
					`),
					{
						hash: address,
						transactionLimit,
						transactionOffset: transactionOffset > 0 ? transactionOffset.toString() : undefined
					}
				)
				.toPromise()
				.then(({ data, error }) => {
					if (error)
						throw error

					if (!data?.address?.transactions)
						throw new Error('Transactions not found')

					return data.address.transactions
				})
		)
	} catch (error) {
		if (error instanceof Error) {
			if (error.message.includes('404')) {
				throw new Error(`Address ${address} not found on chain ${chainId}`)
			}
			if (error.message.includes('too complex')) {
				throw new Error('Query too complex, try reducing transaction limit')
			}
		}
		throw new Error(`Blockscout API error: ${error instanceof Error ? error.message : 'Unknown error'}`)
	}
}

export const normalize = (data: Awaited<ReturnType<typeof fetch>>, chainId: ChainId, address: Address): Transaction[] => 
	data?.edges?.map(({ node }: { node: any }) => ({
		id: node.hash,
		chainId,
		format: (
			node.type === 'eip4844' ? TransactionFormat.Type3Blob :
			node.type === 'eip1559' ? TransactionFormat.Type2DynamicFee :
			node.type === 'eip2930' ? TransactionFormat.Type1AccessList :
			TransactionFormat.Type0Legacy
		),
		status: (
			node.status === 'ok' ? TransactionStatus.Confirmed :
			node.status === 'error' ? TransactionStatus.Failed :
			node.blockNumber ? TransactionStatus.Included :
			TransactionStatus.Pending
		),
		categories: [
			!node.toAddressHash ? TransactionCategory.ContractCreation :
			node.input && node.input !== '0x' && node.input.length >= 10 ? TransactionCategory.ContractCall :
			TransactionCategory.Transfer
		],
		from: node.fromAddressHash,
		...node.toAddressHash && { to: node.toAddressHash },
		value: node.value || '0',
		nonce: node.nonce || 0,
		gasLimit: node.gas || '0',
		isSuccess: node.status === 'ok',
		...node.blockNumber && {
			blockNumber: Number(node.blockNumber),
			transactionIndex: node.index || 0,
			blockHash: node.blockHash,
		},
		...node.block?.timestamp && {
			timestamp: Math.floor(new Date(node.block.timestamp).getTime() / 1000)
		},
		...node.gasUsed && {
			gasUsed: node.gasUsed,
			gasFee: node.gasPrice && node.gasUsed && (BigInt(node.gasUsed) * BigInt(node.gasPrice)).toString(),
			networkFee: node.gasPrice && node.gasUsed && (BigInt(node.gasUsed) * BigInt(node.gasPrice)).toString(),
			...node.gas && { gasEfficiency: Number((BigInt(node.gasUsed) * 100n) / BigInt(node.gas)) },
		},
		...node.gasPrice && { gasPrice: node.gasPrice },
		...node.input && node.input !== '0x' && {
			input: node.input,
			size: Math.ceil(node.input.length / 2),
		},
		...node.error && { error: node.error },
		...node.revertReason && { revertReason: node.revertReason },
	})).filter(Boolean) ?? [] 