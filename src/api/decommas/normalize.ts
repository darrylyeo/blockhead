import type { Ethereum } from '../../data/networks/types'
import type { TTxDetail, TNft, TNftMetadata } from '@decommas/sdk'


export const normalizeTransaction = (
	transaction: TTxDetail,
	network: Ethereum.Network,
): Ethereum.Transaction => ({
	network,
	transactionId: transaction.hash as Ethereum.TransactionID,

	executionStatus: transaction.status ? 'successful' : 'failed',
	finalityStatus: 'finalized',

	blockNumber: BigInt(transaction.blockNumber),
	blockTimestamp: transaction.blockTimestamp * 1000,

	transactionIndex: transaction.transactionIndex,

	fromAddress: transaction.fromAddress as Ethereum.Address,
	toAddress: transaction.toAddress as Ethereum.Address,

	value: BigInt(transaction.value),

	gasToken: network.nativeCurrency,
	gasUnitsSpent: BigInt(transaction.gasUsed),
	gasUnitRate: BigInt(transaction.gasPrice),
	gasValue: BigInt(transaction.gasUsed) * BigInt(transaction.gasPrice),

	// ...transaction.method && {
	// 	logEvents: [
	// 		{
	// 			topics: [],
	// 			decoded: {
	// 				name: transaction.method,
	// 			}
	// 		}
	// 	]
	// },
})


export const normalizeNftContracts = (
	nftsWithMetadata: { nft: TNft, metadata: TNftMetadata | undefined }[],
	owner: Ethereum.Address
): Ethereum.NftContractWithNfts[] => (
	[
		...nftsWithMetadata
			?.groupToMap(({ nft }) => nft.contractAddress)
			.entries()
		?? []
	]
		.map(([contractAddress, nftsWithMetadata]: [Ethereum.ContractAddress, { nft: TNft, metadata: TNftMetadata | undefined }[]]) => ({
			address: contractAddress,
			name: nftsWithMetadata[0].metadata?.collectionName ?? '',
			symbol: '',

			ercTokenStandards: [(nftsWithMetadata[0].metadata ?? nftsWithMetadata[0].nft).contractType.replace('-', '').toLowerCase() as Ethereum.ERCTokenStandard],
			
			nfts: nftsWithMetadata.map(({ nft, metadata }): Ethereum.NftWithBalance => ({
				owner,

				tokenId: BigInt(metadata?.tokenId ?? nft.tokenId),

				metadata: {
					name: metadata?.name,
					image: metadata?.imageUrl,
					animationUrl: metadata?.animationUrl,
				},
				
				erc1155Balance: Number(nft.amount),
			})),
		}))
)
