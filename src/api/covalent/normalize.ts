// Types
import type { AbiType } from 'abitype'
import type { QuoteCurrency } from '$/data/currencies'
import type { Ethereum } from '$/data/networks/types'
import type { TokenWithBalance } from '$/data/tokens'
import type { BlockResponse, Transaction, Erc20TransfersResponse, LogEvent, NftAddressBalanceNftResponse, getTokenBalancesForAddress } from '../covalent/index'

export type Erc20Transfer = Pick<Ethereum.Transaction,
	| 'network'
	| 'transactionId'

	| 'blockNumber'
	| 'blockHash'
	| 'blockTimestamp'

	| 'fromAddress'
	| 'toAddress'
	| 'labels'

	| 'conversion'

	| 'logEvents'
> & {
	value: bigint,
	transferredToken: Ethereum.Erc20Token,
}


// Functions
import { normalizeNftAttributes } from '$/utils/normalizeNftAttributes'

export const normalizeBlock = (
    block: BlockResponse['items'][number],
    network: Ethereum.Network,
): Pick<
	Ethereum.Block,
	| 'network'
	| 'finalityStatus'
	| 'blockNumber'
	| 'timestamp'
> => ({
	network,
	blockNumber: BigInt(block.height),
	finalityStatus: 'finalized',

	timestamp: new Date(block.signed_at).valueOf(),
})

export const normalizeTransaction = (
	transaction: Transaction | Erc20TransfersResponse['items'][number],
	network: Ethereum.Network,
	quoteCurrency: QuoteCurrency
): Ethereum.Transaction & {
	erc20Transfers?: Erc20Transfer[]
} => ({
	network,
	transactionId: transaction.tx_hash as Ethereum.TransactionID,

	executionStatus: transaction.successful ? 'successful' : 'failed',
	finalityStatus: 'block_height' in transaction ? 'finalized' : 'pending',

	nonce: undefined,
	transactionIndex: transaction.tx_offset,

	blockNumber: BigInt(transaction.block_height),
	blockHash: undefined,
	blockTimestamp: new Date(transaction.block_signed_at).valueOf(),

	fromAddress: transaction.from_address as Ethereum.Address,
	toAddress: transaction.to_address as Ethereum.Address,
	labels: {
		fromAddress: transaction.from_address_label ?? undefined,
		toAddress: transaction.to_address_label ?? undefined,
	},

	value: BigInt(transaction.value),

	gasToken: network.nativeCurrency,
	gasUnitsOffered: BigInt(transaction.gas_offered),
	gasUnitsSpent: BigInt(transaction.gas_spent),
	gasUnitRate: BigInt(transaction.gas_price),
	gasValue: BigInt(transaction.gas_spent) * BigInt(transaction.gas_price),

	...(transaction.value_quote !== null && {
		conversion: {
			quoteCurrency,

			value: transaction.value_quote,

			gasUnitRate: transaction.gas_quote_rate ?? undefined,
			gasValue: transaction.gas_quote ?? undefined,
		},
	}),

	...('log_events' in transaction && {
		logEvents: transaction.log_events
			.sort((logEvent1, logEvent2) => logEvent1.log_offset - logEvent2.log_offset)
			.map((logEvent, indexInTransaction) => normalizeLogEvent(logEvent, indexInTransaction))
	}),

	...('transfers' in transaction && {
		erc20Transfers: transaction.transfers.map(transfer => (
			normalizeErc20Transfer(transfer, network, quoteCurrency))
		)
	}),
})

export const normalizeLogEvent = (
	logEvent: LogEvent,
	indexInTransaction?: number,
): Ethereum.TransactionLogEvent => ({
	indexInTransaction,
	transactionHash: logEvent.tx_hash as Ethereum.TransactionID,

	indexInBlock: logEvent.log_offset,
	blockNumber: BigInt(logEvent.block_height),

	topics: logEvent.raw_log_topics as Ethereum.TopicHash[],
	data: logEvent.raw_log_data ?? undefined,

	contract: {
		name: logEvent.sender_name ?? undefined,
		address: logEvent.sender_address as Ethereum.ContractAddress,
		symbol: logEvent.sender_contract_ticker_symbol ?? undefined,
		decimals: logEvent.sender_contract_decimals ?? undefined,
		icon: logEvent.sender_logo_url,
		label: logEvent.sender_address_label ?? undefined,
	},

	decoded: logEvent.decoded
		? {
			name: logEvent.decoded.name,
			signature: logEvent.decoded.signature,
			params: logEvent.decoded.params?.map(logEvent => ({
				name: logEvent.name,
				type: logEvent.type as AbiType,
				value: logEvent.value ?? '',
				indexed: logEvent.indexed,
				decoded: logEvent.decoded,
			})) ?? [],
		}
		: undefined,
})

export const normalizeErc20Transfer = (
	transfer: Erc20TransfersResponse['items'][number]['transfers'][number],
	network: Ethereum.Network,
	quoteCurrency: QuoteCurrency,
): Erc20Transfer => ({
	network,
	transactionId: transfer.tx_hash as Ethereum.TransactionID,

	blockTimestamp: new Date(transfer.block_signed_at).valueOf(),

	fromAddress: transfer.from_address as Ethereum.Address,
	toAddress: transfer.to_address as Ethereum.Address,
	labels: {
		fromAddress: transfer.from_address_label ?? undefined,
		toAddress: transfer.to_address_label ?? undefined,
	},

	value: BigInt(transfer.delta),

	transferredToken: {
		chainId: network.chainId,
		symbol: transfer.contract_ticker_symbol,
		address: transfer.contract_address as Ethereum.Address,
		name: transfer.contract_name,
		icon: transfer.logo_url,
		decimals: transfer.contract_decimals,
	},

	conversion: {
		quoteCurrency,
		value: transfer.delta_quote,
		rate: transfer.quote_rate,
	},

	logEvents: transfer.method_calls?.map(methodCall => ({
		contract: {
			address: methodCall.sender_address as Ethereum.ContractAddress,
		},
		decoded: {
			name: methodCall.method,
		},
	})),
})

export const normalizeNftContract = (
	nftContractWithBalance: NftAddressBalanceNftResponse<false>['items'][number],
	quoteCurrency: QuoteCurrency,
	owner: Ethereum.Address,
): Ethereum.NftContractWithNfts => ({
	name: nftContractWithBalance.contract_name,
	address: nftContractWithBalance.contract_address as Ethereum.ContractAddress,
	symbol: nftContractWithBalance.contract_ticker_symbol,
	ercTokenStandards: nftContractWithBalance.supports_erc?.filter(erc => erc !== 'erc20' && erc !== 'erc165') as Ethereum.ErcTokenStandard[],
	metadata: {
		description: undefined,
		bannerImage: undefined,
	},

	conversion: nftContractWithBalance.floor_price_native_quote
		? {
			quoteCurrency,
			value: nftContractWithBalance.floor_price_native_quote,
			rate: nftContractWithBalance.floor_price_quote ?? undefined,
		}
		: undefined,

	nftsCount: Number(nftContractWithBalance.balance),
	nfts: nftContractWithBalance.nft_data?.map(nft => normalizeNft(nft, owner)),
})

export const normalizeNft = (
	nftWithBalance: NftAddressBalanceNftResponse<false>['items'][number]['nft_data'][number],
	owner: Ethereum.Address,
): Ethereum.Nft => ({
	owner,
	originalOwner: nftWithBalance.original_owner as Ethereum.Address,

	tokenId: BigInt(nftWithBalance.token_id),
	tokenUri: nftWithBalance.token_url ?? undefined,

	metadata: {
		...nftWithBalance.external_data,
		attributes: nftWithBalance.external_data?.attributes && normalizeNftAttributes(nftWithBalance.external_data.attributes),
	},
})

export const normalizeTokenBalance = (
	tokenBalance: Awaited<ReturnType<typeof getTokenBalancesForAddress>>['items'][number],
	quoteCurrency: QuoteCurrency,
	chainId: Ethereum.ChainID,
): TokenWithBalance => ({
	token: {
		chainId,
		address: tokenBalance.contract_address as Ethereum.ContractAddress,
		name: tokenBalance.contract_name,
		symbol: tokenBalance.contract_ticker_symbol || tokenBalance.contract_name,
		decimals: tokenBalance.contract_decimals,
		icon: tokenBalance.logo_url,
	},
	balance: BigInt(tokenBalance.balance),
	conversion: {
		currency: quoteCurrency,
		value: tokenBalance.quote,
		rate: tokenBalance.quote_rate,
	},
})
