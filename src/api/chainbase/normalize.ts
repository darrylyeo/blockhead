// Types
import type { Ethereum } from '../../data/networks/types'
import type { TokenWithBalance } from '../../data/tokens'
import type { getNftsByAddress, getBlockByNumber, getTransaction, getErc20TokenBalances } from './index'


// Functions
import { normalizeNftAttributes } from '../../utils/normalizeNftAttributes'

export const normalizeNftContracts = (nfts: Awaited<ReturnType<typeof getNftsByAddress>>['data']): Ethereum.NftContractWithNfts[] => (
	[
		...nfts
			? Map.groupBy(nfts, nft => nft.contract_address).entries()
			: []
	]
		.map(([contractAddress, nfts]: [Ethereum.ContractAddress, Awaited<ReturnType<typeof getNftsByAddress>>['data']]): Ethereum.NftContractWithNfts => ({
			address: contractAddress,
			ercTokenStandards: [nfts[0].erc_type as Ethereum.ERCTokenStandard],
			nfts: nfts.map(nft => ({
				owner: nft.owner,

				tokenId: nft.token_id,
				tokenUri: nft.token_uri,

				metadata: {
					name: nft.metadata?.name,
					description: nft.metadata?.description,
					image: nft.metadata?.image_url,
					attributes: nft.metadata?.attributes && normalizeNftAttributes(nft.metadata.attributes),
				}
			})),
		}))
)

export const normalizeBlock = (
	block: Awaited<ReturnType<typeof getBlockByNumber>>['data'],
	network: Ethereum.Network
): Ethereum.Block => ({
	network,
	blockNumber: BigInt(block.number),
	finalityStatus: 'finalized',

	blockHash: block.hash as Ethereum.BlockHash,
	parentBlockHash: block.parent_hash as Ethereum.BlockHash,
	timestamp: Number(block.timestamp),
	nonce: block.nonce as Ethereum.BlockNonce,

	difficulty: block.difficulty !== undefined ? BigInt(block.difficulty) : undefined,

	gasLimit: BigInt(block.gas_limit),
	gasUsed: BigInt(block.gas_used),

	minerAddress: block.miner as Ethereum.Address,
	extraData: block.extra_data,
	baseFeePerGas: BigInt(block.base_fee_per_gas),
})

export const normalizeTransaction = (
	transaction: Awaited<ReturnType<typeof getTransaction>>['data'],
	network: Ethereum.Network
): Ethereum.Transaction => ({
	network,
	transactionId: transaction.transaction_hash,

	executionStatus: transaction.status === 1 ? 'successful' : 'failed',
	finalityStatus: 'finalized',

	blockNumber: BigInt(transaction.block_number),
	blockTimestamp: new Date(transaction.block_timestamp).valueOf(),

	transactionIndex: transaction.transaction_index,
	nonce: transaction.nonce,

	fromAddress: transaction.from_address,
	toAddress: transaction.to_address,

	input: transaction.input as Ethereum.TransactionInput,
	value: BigInt(transaction.value),

	gasToken: network.nativeCurrency,
	gasUnitsOffered: BigInt(transaction.gas),
	gasUnitsSpent: BigInt(transaction.gas_used),
	gasUnitRate: BigInt(transaction.effective_gas_price),
	gasValue: BigInt(transaction.tx_fee),
})

export const normalizeTokenBalance = (asset: Awaited<ReturnType<typeof getErc20TokenBalances>>['data'][number]): TokenWithBalance => ({
	token: {
		address: asset.contract_address,
		name: asset.name,
		symbol: asset.symbol,
		decimals: asset.decimals,
		icon: asset.logos?.[0]?.uri,
	},
	balance: BigInt(asset.balance),
})
