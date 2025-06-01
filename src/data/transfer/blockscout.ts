import type { Hash } from '$/entities/scalars'
import type { ChainId } from '$/entities/network'
import type { Transfer } from '$/entities/transfer'
import { TransferStandard, TransferCategory } from '$/entities/transfer'

// Base token transfer entity
type TokenTransfer = {
	hash: string
	index?: number
	value?: string
}

export const fetch = async ({
	chainId,
	id
}: {
	chainId: ChainId
	id: string
}) => {
	const { createClient, graphql } = await import('$/api/blockscout/graphql/index')

	try {
		return (
			await createClient(chainId)
				.query(
					graphql(`
						query GetTokenTransfer($id: String!) {
							tokenTransfer(id: $id) {
								id
								fromAddressHash
								toAddressHash
								amount
								tokenContractAddressHash
								transactionHash
								blockNumber
								logIndex
								tokenIds
								amounts
								token {
									name
									symbol
									type
									decimals
								}
								transaction {
									blockHash
									block {
										timestamp
									}
								}
							}
						}
					`),
					{
						id
					}
				)
				.toPromise()
				.then(({ data, error }) => {
					if (error)
						throw error

					if (!data?.tokenTransfer)
						throw new Error('Transfer not found')

					return {
						...data.tokenTransfer,
						chainId,
						fetchedAt: Math.floor(Date.now() / 1000),
					}
				})
		)
	} catch (error) {
		if (error instanceof Error) {
			if (error.message.includes('404')) {
				throw new Error(`Transfer ${id} not found on chain ${chainId}`)
			}
		}
		throw new Error(`Blockscout API error: ${error instanceof Error ? error.message : 'Unknown error'}`)
	}
}

export const normalize = (data: any, { chainId, id }: { chainId: ChainId, id: string }): Transfer => {
	const tokenType = data.token?.type?.toUpperCase()
	
	return {
		id: data.id,
		chainId,
		standard: (
			tokenType?.includes('ERC-721') ? TransferStandard.Erc721 :
			tokenType?.includes('ERC-1155') ? TransferStandard.Erc1155 :
			TransferStandard.Erc20
		),
		category: (
			data.fromAddressHash === '0x0000000000000000000000000000000000000000' ? TransferCategory.Mint :
			data.toAddressHash === '0x0000000000000000000000000000000000000000' ? TransferCategory.Burn :
			TransferCategory.Transfer
		),
		from: { address: data.fromAddressHash },
		to: { address: data.toAddressHash },
		...data.blockNumber && { blockNumber: BigInt(data.blockNumber) },
		...data.logIndex !== undefined && { 
			indexInBlock: data.logIndex,
			indexInTransaction: data.logIndex 
		},
		...data.transaction?.block?.timestamp && { 
			timestamp: Math.floor(new Date(data.transaction.block.timestamp).getTime() / 1000) 
		},
		...data.transactionHash && { transactionHash: data.transactionHash },
		...data.transaction?.blockHash && { blockHash: data.transaction.blockHash },
		...tokenType?.includes('ERC-721') && {
			nftData: {
				tokenAddress: data.tokenContractAddressHash,
				tokenId: data.tokenIds?.[0] || '0',
				collectionName: data.token?.name || 'Unknown',
				collectionSymbol: data.token?.symbol || 'UNKNOWN',
			}
		},
		...tokenType?.includes('ERC-1155') && {
			multiTokenData: {
				tokenAddress: data.tokenContractAddressHash,
				tokenIds: data.tokenIds || [],
				amounts: data.amounts || [],
				collectionName: data.token?.name || 'Unknown',
				collectionSymbol: data.token?.symbol || 'UNKNOWN',
				isBatchTransfer: (data.tokenIds?.length || 0) > 1,
				totalTokenTypes: data.tokenIds?.length || 0,
				totalAmount: data.amounts?.reduce((sum: bigint, amt: string) => sum + BigInt(amt), 0n).toString() || '0',
				tokens: (data.tokenIds || []).map((tokenId: string, index: number) => ({
					tokenId,
					amount: data.amounts?.[index] || '0',
					amountFormatted: data.amounts?.[index] ? 
						(Number(data.amounts[index]) / Math.pow(10, data.token?.decimals || 0)).toFixed(6) : '0',
				})),
			}
		},
		...!tokenType?.includes('ERC-721') && !tokenType?.includes('ERC-1155') && {
			tokenData: {
				tokenAddress: data.tokenContractAddressHash,
				amount: data.amount || '0',
				amountFormatted: data.amount ? 
					(Number(data.amount) / Math.pow(10, data.token?.decimals || 18)).toFixed(6) : '0',
				symbol: data.token?.symbol || 'UNKNOWN',
				name: data.token?.name || 'Unknown',
				decimals: data.token?.decimals || 18,
			}
		},
	}
}
