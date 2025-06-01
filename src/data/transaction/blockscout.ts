import type { Hash } from '$/entities/scalars'
import type { ChainId } from '$/entities/network'
import type { Transaction } from '$/entities/transaction'
import { TransactionFormat, TransactionStatus, TransactionCategory } from '$/entities/transaction'

export const fetch = async ({
	chainId,
	hash
}: {
	chainId: ChainId
	hash: Hash
}) => {
	const { createClient, graphql } = await import('$/api/blockscout/graphql/index')

	return (
		await createClient(chainId)
			.query(
				graphql(`
					query GetTransaction($hash: HashFull!) {
						transaction(hash: $hash) {
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
							hasErrorInInternalTxs
							error
							revertReason
							maxFeePerGas
							maxPriorityFeePerGas
							type
							v
							r
							s
							block {
								timestamp
								baseFeePerGas
							}
						}
					}
				`),
				{
					hash
				}
			)
			.toPromise()
			.then(({ data, error }) => {
				if (error)
					throw error

				if (!data?.transaction)
					throw new Error('Transaction not found')

				return data.transaction
			})
	)
}

export const normalize = (data: any, variables: { chainId: ChainId, hash: Hash }) => {
	if (!data) throw new Error('Transaction not found')

	return {
		id: data.hash,
		format: (
			data.type === 3 ? TransactionFormat.Type3Blob :
			data.type === 2 ? TransactionFormat.Type2DynamicFee :
			data.type === 1 ? TransactionFormat.Type1AccessList :
			TransactionFormat.Type0Legacy
		),
		status: (
			data.status === 'ok' || data.status === 1 ? TransactionStatus.Confirmed :
			data.status === 'error' || data.status === 0 ? TransactionStatus.Failed :
			TransactionStatus.Pending
		),
		categories: [
			!data.toAddressHash ? TransactionCategory.ContractCreation :
			data.input?.slice(0, 10) === '0xa9059cbb' || data.input?.slice(0, 10) === '0x23b872dd' ? TransactionCategory.TokenTransfer :
			data.input && data.input !== '0x' && data.input.length > 2 ? TransactionCategory.ContractCall :
			TransactionCategory.Transfer
		],
		from: data.fromAddressHash,
		nonce: data.nonce ?? 0,
		isSuccess: data.status === 'ok' || data.status === 1,
		...(data.toAddressHash ? { to: data.toAddressHash } : {}),
		...(data.value ? { value: data.value } : {}),
		...(data.blockNumber ? { blockNumber: data.blockNumber } : {}),
		...(data.index !== undefined ? { transactionIndex: data.index } : {}),
		...(data.gas ? { gasLimit: data.gas } : {}),
		...(data.gasUsed ? { gasUsed: data.gasUsed } : {}),
		...(data.gasPrice ? { gasPrice: data.gasPrice } : {}),
		...(data.input && data.input !== '0x' ? { input: data.input } : {}),
		...(data.error ? { error: data.error } : {}),
		...(data.revertReason ? { revertReason: data.revertReason } : {}),
		...(data.hasErrorInInternalTxs ? { hasInternalErrors: data.hasErrorInInternalTxs } : {}),
		...(data.block?.timestamp ? { 
			timestamp: Math.floor(new Date(data.block.timestamp).getTime() / 1000) 
		} : {}),
		...(data.gasUsed && (data.gasPrice || data.maxFeePerGas) ? {
			gasFee: (BigInt(data.gasUsed) * BigInt(data.gasPrice || data.maxFeePerGas)).toString(),
			networkFee: (BigInt(data.gasUsed) * BigInt(data.gasPrice || data.maxFeePerGas)).toString(),
			...(data.gas ? { 
				gasEfficiency: (Number(data.gasUsed) / Number(data.gas)) * 100 
			} : {}),
		} : {}),
		...(data.maxFeePerGas ? { maxFeePerGas: data.maxFeePerGas } : {}),
		...(data.maxPriorityFeePerGas ? { maxPriorityFeePerGas: data.maxPriorityFeePerGas } : {}),
		...(data.block?.baseFeePerGas ? { baseFeePerGas: data.block.baseFeePerGas } : {}),
		...(data.v && data.r && data.s ? {
			signature: {
				v: data.v,
				r: data.r,
				s: data.s,
			}
		} : {}),
	}
} 