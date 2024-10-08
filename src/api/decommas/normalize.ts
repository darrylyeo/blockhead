// Types
import type { Ethereum } from '$/data/networks/types'
import type { TokenWithBalance } from '$/data/tokens'
import type { TTransaction, TTxDetail, TNft, TNftMetadata, TCoinWithAmount, TToken } from '@decommas/sdk'


// Functions
export const normalizeTransaction = (
	transaction: TTransaction | TTxDetail,
	network: Ethereum.Network,
): Ethereum.Transaction => ({
	network,
	transactionId: transaction.hash as Ethereum.TransactionId,

	executionStatus: transaction.status ? 'successful' : 'failed',
	finalityStatus: 'finalized',

	blockNumber: BigInt(transaction.blockNumber),
	blockTimestamp: transaction.blockTimestamp * 1000,

	...('transactionIndex' in transaction && {
		transactionIndex: transaction.transactionIndex
	}),

	fromAddress: transaction.fromAddress as Ethereum.Address,
	...(!transaction.deployedContract ? {
		toAddress: transaction.toAddress as Ethereum.Address,
	} : {
		deployedContractAddress: transaction.deployedContract as Ethereum.ContractAddress,
	}),

	inputDecoded: {
		methodName: transaction.method,
		methodHash: transaction.methodHash === '0x' ? undefined : transaction.methodHash,
	},
	value: BigInt(transaction.value),

	gasToken: network.nativeCurrency,
	gasUnitsSpent: BigInt(transaction.gasUsed),
	gasUnitRate: BigInt(transaction.gasPrice),
	gasValue: BigInt(transaction.gasUsed) * BigInt(transaction.gasPrice),

	tags: transaction.transactionTags,
})

export const normalizeNftContracts = (
	nftsWithMetadata: { nft: TNft, metadata: TNftMetadata | undefined }[],
	owner: Ethereum.Address
): Ethereum.NftContractWithNfts[] => (
	[
		...nftsWithMetadata
			? Map.groupBy(nftsWithMetadata, ({ nft }) => nft.contractAddress).entries()
			: []
	]
		.map(([contractAddress, nftsWithMetadata]: [Ethereum.ContractAddress, { nft: TNft, metadata: TNftMetadata | undefined }[]]) => ({
			address: contractAddress,
			name: nftsWithMetadata[0].metadata?.collectionName ?? '',
			symbol: '',

			ercTokenStandards: [(nftsWithMetadata[0].metadata ?? nftsWithMetadata[0].nft).contractType.replace('-', '').toLowerCase() as Ethereum.ErcTokenStandard],
			
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

export const normalizeToken = (
	token: TToken,
	chainId: Ethereum.ChainId
): Ethereum.Erc20Token => ({
	chainId,
	address: token.address as Ethereum.ContractAddress,

	name: token.name,
	symbol: token.symbol,
	decimals: token.decimals,

	icon: token.logoUrl,

	totalSupply: (
		token.totalSupply
			? BigInt(token.totalSupply)
			: undefined
	),

	conversion: {
		currency: 'USD',
		value: Number(token.actualPrice) * 0.1 ** token.decimals * Number(token.actualPrice),
		rate: Number(token.actualPrice),
	},
})

export const normalizeTokenBalance = (
	tokenWithAmount: TCoinWithAmount,
	address: Ethereum.ContractAddress,
): TokenWithBalance => ({
	token: {
		chainId: tokenWithAmount.chainId,
		address,

		name: tokenWithAmount.name,
		symbol: tokenWithAmount.symbol,
		decimals: tokenWithAmount.decimals,

		icon: tokenWithAmount.logoUrl,
	},

	balance: BigInt(tokenWithAmount.amount),

	...tokenWithAmount.actualPrice !== null && {
		conversion: {
			currency: 'USD',
			value: Number(tokenWithAmount.amount) * 0.1 ** tokenWithAmount.decimals * Number(tokenWithAmount.actualPrice),
			rate: Number(tokenWithAmount.actualPrice),
		},
	},
})
