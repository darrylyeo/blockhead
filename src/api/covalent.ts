import type { QuoteCurrency, TickerSymbol } from '$/data/currencies'
import type { Ethereum } from '$/data/networks/types'
import type { AbiType } from 'abitype'

import * as publicEnv from '$env/static/public'

import { ConcurrentPromiseQueue } from '$/utils/ConcurrentPromiseQueue'
import { normalizeNftAttributes } from '$/utils/normalizeNftAttributes'


const COVALENT_URL = `https://api.covalenthq.com`


// https://www.covalenthq.com/docs/api/
export namespace Covalent {
	type integer = number
	type float = number
	type int32 = number
	type int64 = number
	type double = number
	type date_time = number // Date

	export type Day = string // 'YYYY-MM-DD'

	// https://covalenthq.com/docs/networks
	export const MainnetChainIDs = [1, 137, 43114, 56, 250, 2020, 30, 42161, 11297108109, 8217, 128, 1285, 25, 1313161554] as const
	export const TestnetChainIDs = [80001, 43113, 42, 97, 1287, 4002, 31, 421611, 11297108099, 1001, 256, 71393] as const
	export const ChainIDs = [...MainnetChainIDs, ...TestnetChainIDs] as const
	export type ChainId = typeof ChainIDs[number]

	export const quoteCurrencies = ['USD', 'CAD', 'EUR', 'SGD', 'INR', 'JPY', 'VND', 'CNY', 'KRW', 'RUB', 'TRY', 'ETH', 'BNB']
	export type QuoteCurrency = typeof quoteCurrencies[number]

	type Pagination = {
		has_more: boolean // true if we can paginate to get more data.
		page_number: int32 // The specific page being returned.
		page_size: int32 // The number of results per page.
		total_count: int32 // Total number of entries.
	}

	export type Response = {
		data: any
		error: boolean
		error_message: string
		error_code: number
	}


	type AddressData = {
		address: Ethereum.Address,
		updated_at: Date,
		next_update_at: Date,
		quote_currency: QuoteCurrency
	}

	export type ERCTokenStandard = 'erc20' | 'erc721' | 'erc1155'

	export type TokenContract = {
		contract_decimals: integer
		contract_name: string
		contract_ticker_symbol: TickerSymbol
		contract_address: Ethereum.ContractAddress
		supports_erc: ERCTokenStandard[]

		contract_logo_url: string
		logo_url: string
	}

	export type TokenContractWithBalance = TokenContract & {
		balance: integer
		quote: float
		quote_rate: float
	}
	export type ERC20TokenContractWithBalance = TokenContractWithBalance & {
		type: 'cryptocurrency' | 'stablecoin' | 'dust'
	}
	export type NFTContractWithBalance = TokenContractWithBalance & {
		type: 'nft'
		nft_data?: NFTWithBalance[]
	}
	export type NFTAttributes = Record<string, string> | {
		key?: string
		display_type?: string
		trait_type: string
		value: string | number
	}[]
	export type NFTWithBalance = {
		token_id: integer
		token_balance: integer
		token_url: string

		supports_erc: ERCTokenStandard[]

		token_price_wei: integer
		token_quote_rate_eth: string
		
		external_data?: {
			name: string
			description: string
			image: string
			image_256?: string
			image_512?: string
			image_1024?: string
			external_url: string
			animation_url: string
			attributes: NFTAttributes
		}

		owner: string
	}
	export type ERC20TokenOrNFTContractWithBalance = ERC20TokenContractWithBalance | NFTContractWithBalance
	export type TokenContractsWithBalances = AddressData & {
		items: ERC20TokenOrNFTContractWithBalance[]
	}

	export type AaveBalance = {
		atoken_contract_address: string
		atoken_contract_ticker_symbol: TickerSymbol
		atoken_contract_name: string
		atoken_contract_decimals: int32
		atoken_balance: integer
		borrow_balance: integer
		borrow_rate: double
		liquidity_rate: double
		origination_fee: integer
		peg_contract_decimals: int32
		peg_contract_address: string
		peg_contract_ticker_symbol: TickerSymbol
		logo_url: string
		quote_rate: float
		quote: float
		borrow_quote: float
	}
	export type AaveBalances = AddressData & {
		balancer: {
			balances: AaveBalance[]
		}
	}

	export type BalancerPoolToken = TokenContractWithBalance & {
		total_supply: integer
		swap_fee: float
	}
	export type BalancerUnderlyingToken = TokenContract & {
		weight: float
	}
	export type BalancerBalance = {
		pool: BalancerPoolToken
		assets: BalancerUnderlyingToken
	}
	export type BalancerBalances = AddressData & {
		balancer: {
			balances: BalancerBalance[]
		}
	}

	export type CompoundActivityItem = {
		act_at: date_time
		tx_hash: string
		act: string
		description: string
		amount: number
		ctoken_amount: number
		
		contract_address: string
		contract_logo_url: string
		contract_decimals: int32
		contract_ticker_symbol: TickerSymbol

		ctoken_contract_decimals: int32
		ctoken_contract_ticker_symbol: TickerSymbol
		quote_rate: float
		quote: float
		successful: boolean
		gas_offered: int64
		gas_spent: int64
		gas_price: int64
		gas_quote: float
	}
	export type CompoundActivity = AddressData & {
		items: CompoundActivityItem[]
		pagination: Pagination
	}

	export type CompoundSupplyToken = TokenContract & {
		balance: integer
		interest_accrued: integer
		balance_quote: float
		interest_accrued_quote: float
		quote_rate: float
		apr: float
	}
	export type CompoundBorrowToken = TokenContract & {
		balance: integer
		interest_accrued: integer
		balance_quote: float
		interest_accrued_quote: float
		quote_rate: float
		apr: float
	}
	export type CompoundBalance = TokenContract & {
		account_address: string
		source: string
		supply_tokens: CompoundSupplyToken[]
		borrow_tokens: CompoundBorrowToken[]
		total_supply_eth: integer
		total_borrow_eth: integer
		total_collateral_eth: integer
		total_borrowing_power_eth: integer
		total_supply_eth_quote: float
		total_borrow_eth_quote: float
		total_collateral_eth_quote: float
		total_borrowing_power_eth_quote: float
		comp_accrued_quote: float
		comp_balance_quote: float
		comp_balance: integer
		comp_accrued: integer
	}
	export type CompoundBalances = AddressData & {
		compound: {
			balances: CompoundBalance[]
		}
	}

	export type CurvePoolToken = TokenContract & {
		balance: integer
		supply: integer
		fee: integer
	}
	export type CurveBalance = {
		pool: CurvePoolToken
		underlying: TokenContractWithBalance[]
	}
	export type CurveBalances = AddressData & {
		balancer: {
			curve: CurveBalance[]
		}
	}

	export type MakerVaultAction = {
		act_at: Date
		act: 'GENERATE' | 'DEPOSIT' | 'OPEN' | 'WITHDRAW' | 'LIQUIDATE' | 'PAY_BACK' | 'GIVE'
		description: string
		tx_hash: string
		amount: integer
		ticker_symbol: TickerSymbol
		quote_rate: float
		contract_decimals: int32
	}
	export type MakerVault = {
		id: int32
		owner: string
		ilk: string
		ink: integer
		art: integer
		debt: integer
		art_contract_decimals: int32
		ink_contract_decimals: int32
		debt_quote_rate: float
		debt_quote: float
		collateral_quote_rate: float
		collateral_quote: float
		collateral_logo_url: string
		urn: string
		vault_source: string
		ratio: string
		liq_price: string
		breakdown_acts: MakerVaultAction[]
	}
	export type MakerBalances = {
		count_vaults: int32
		breakdown_vault: MakerVault[]
	}

	export type UniswapV1PoolToken = TokenContractWithBalance & {
		total_supply: integer
	}
	export type UniswapV1Balance = {
		token_0: TokenContractWithBalance
		token_1: TokenContractWithBalance
		pool_token: UniswapV1PoolToken
	}
	export type UniswapV1Balances = AddressData & {
		uniswap_v2: {
			balances: UniswapV1Balance[]
		}
	}

	export type UniswapV1LiquidityTransaction = {
		act_at: date_time
		act: 'ADD_LIQUIDITY' | 'REMOVE_LIQUIDITY'
		description: string
		tx_hash: string

		token_0: TokenContractWithBalance
		token_1: TokenContractWithBalance
		pool_token: UniswapV1PoolToken
	}
	export type UniswapV2LiquidityTransactions = AddressData & {
		items: UniswapV1LiquidityTransaction
		pagination: Pagination
	}

	export type UniswapV2PoolToken = TokenContractWithBalance & {
		total_supply: integer
	}
	export type UniswapV2Balance = {
		token_0: TokenContractWithBalance
		token_1: TokenContractWithBalance
		pool_token: UniswapV2PoolToken
	}
	export type UniswapV2Balances = AddressData & {
		uniswap_v2: {
			balances: UniswapV1Balance[]
		}
	}

	export type Parameter = {
		name: string // The name of the parameter.
		type: string // The type of the parameter.
		indexed: boolean // The index of the parameter.
		decoded: boolean // The decoded value of the parameter.
		value: any // The value of the parameter.
	}
	export type DecodedLogEvent = {
		name: string // The name of the decoded item.
		signature: string // The signature of the decoded item.
		params: Parameter[] // The parameters of the decoded item.
	}
	export type LogEvent = {
		block_signed_at: date_time // The signed time of the block.
		block_height: int64 // The height of the block.
		tx_offset: int64 // The transaction offset.
		log_offset: int64 // The log offset.
		tx_hash: string // The transaction hash.
		_raw_log_topics_bytes: {
			empty: boolean
		}
		raw_log_topics: string[],
		sender_contract_decimals: int32 // Smart contract decimals.
		sender_name: string // Smart contract name.
		sender_contract_ticker_symbol: string // Smart contract ticker symbol.
		sender_address: string // The address of the sender.
		sender_address_label: string // The label of the sender address.
		sender_logo_url: string // Smart contract URL.
		raw_log_data: string // The log events in raw.
		decoded: DecodedLogEvent // The decoded item.
	}
	export type LogEvents = {
		items: LogEvent[]
		pagination: Pagination
	}

	export type Transaction = {
		block_signed_at: date_time // The signed time of the block.
		block_height: int32 // The height of the block.
		tx_hash: string // The transaction hash.
		tx_offset: int32 // The transaction offset.
		successful: boolean // The transaction status.
		from_address: string // The address where the transaction is from.
		from_address_label: string // The label of from address.
		to_address: string // The address where the transaction is to.
		to_address_label: string // The label of to address.
		value: number // The value attached to this tx.
		value_quote: double // The value attached in quote-currency to this tx.
		gas_offered: int64 // The gas offered for this tx.
		gas_spent: int64 // The gas spent for this tx.
		gas_price: int64 // The gas price at the time of this tx.
		gas_quote: double // The gas spent in quote-currency denomination.
		gas_quote_rate: double // Historical ETH price at the time of tx.
		log_events?: LogEvent[]
	}
	export type Transactions = AddressData & {
		items: Transaction[]
		pagination: Pagination
	}

	export type ERC20TokenTransfer = {
		block_signed_at: date_time // The signed time of the block.
		tx_hash: string // The transaction hash.
		from_address: string // The address where the transfer is from.
		from_address_label: string // The label of from address.
		to_address: string // The address where the transfer is to.
		to_address_label: string // The label of to address.
		contract_decimals: int32 // Smart contract decimals.
		contract_name: string // Smart contract name.
		contract_ticker_symbol: string // Smart contract ticker symbol.
		contract_address: string // Smart contract address.
		logo_url: string // Smart contract URL.
		transfer_type: 'IN' | 'OUT' // IN/OUT.
		delta: number // The delta attached to this transfer.
		balance: number // The transfer balance. Use contract_decimals to scale this balance for display purposes.
		quote_rate: double // The current spot exchange rate in quote-currency.
		delta_quote: double // The current delta converted to fiat in quote-currency.
		balance_quote: double // The current balance converted to fiat in quote-currency.
		method_calls: MethodCall[] // Additional details on which transfer events were invoked. Defaults to true.
	}
	type MethodCall = {
		sender_address: string // The address of the sender.
		method: string // The name of the decoded item.
	}
	export type TransactionWithErc20Transfers = Transaction & {
		transfers: ERC20TokenTransfer[]
	}
	export type ERC20TokenTransfers = AddressData & {
		items: TransactionWithErc20Transfers[]
		pagination: Pagination
	}

	export type BlockItem = {
		signed_at: date_time
		height: int32
	}
	export type BlockItems = {
		items: BlockItem[]
		pagination: Pagination
	}


	export type HistoricalPricePoint = {
		date: Day
		price: float
	}
	export type HistoricalPrices = TokenContract & {
		quote_currency: QuoteCurrency
		prices: HistoricalPricePoint[]
	}
}

type ChainIDParameters = {
	chainId: Covalent.ChainId
}
type QuoteCurrencyParameters = {
	quoteCurrency?: Covalent.QuoteCurrency
}
type PaginationParameters = {
	pageNumber?: number
	pageSize?: number
}


const queue = new ConcurrentPromiseQueue(1)

const formatParams = params =>
	new URLSearchParams(
		// @ts-ignore
		Object.fromEntries(
			Object.entries(params)
				.filter(([, v]) => v !== undefined)
				.map(([k, v]) => [k.replace(/[A-Z]/g, c => '-' + c.toLowerCase()), v])
		)
	)

const makeRequest = <T>(endpoint: string, params: any) =>
	queue.enqueue(() =>
		fetch(`${COVALENT_URL}${endpoint}/?${`${formatParams(params)}`}`, {
			headers: {
				'Authorization': `Bearer ${publicEnv.PUBLIC_COVALENT_API_KEY}`,
			}
		})
			.then(async response => {
				if(response.ok)
					return response.json()

				if(response.headers.get('content-type').includes('application/json')){
					const {error, error_message, error_code}: Covalent.Response = await response.json()
					// console.error(error, endpoint, params)
					throw new Error(error_message)
				}
				
				const error = new DOMParser().parseFromString(await response.text(), 'text/html').documentElement.innerText.trim()
				// throw new Error(await response.text())
				// console.error(error, endpoint, params)
				throw new Error(error)
			})
			.then(({data}: Covalent.Response) => { 
				return data as T
			})
	)


export const getTokenAddressBalances = (
	{address, nft, chainId, quoteCurrency}:
	{address: Ethereum.Address, nft?: boolean} & ChainIDParameters & QuoteCurrencyParameters
) =>
	makeRequest<Covalent.TokenContractsWithBalances>(`/v1/${chainId}/address/${address}/balances_v2`, {nft, quoteCurrency})

// post-/v1/${chainId}/address/${address}/register/


export const getAaveBalances = (
	{address, chainId, quoteCurrency}:
	{address: Ethereum.Address} & ChainIDParameters & QuoteCurrencyParameters
) =>
	makeRequest<Covalent.AaveBalances>(`/v1/${chainId}/address/${address}/stacks/aave/balances`, {quoteCurrency})

export const getBalancerBalances = (
	{address, chainId, quoteCurrency}:
	{address: Ethereum.Address} & ChainIDParameters & QuoteCurrencyParameters
) =>
	makeRequest<Covalent.BalancerBalances>(`/v1/${chainId}/address/${address}/stacks/balancer/balances`, {quoteCurrency})

export const getCompoundActivity = (
	{address, chainId, quoteCurrency}:
	{address: Ethereum.Address} & ChainIDParameters & QuoteCurrencyParameters
) =>
	makeRequest<Covalent.CompoundActivity>(`/v1/${chainId}/address/${address}/stacks/compound/acts`, {quoteCurrency})

export const getCompoundBalances = (
	{address, chainId, quoteCurrency}:
	{address: Ethereum.Address} & ChainIDParameters & QuoteCurrencyParameters
) =>
	makeRequest<Covalent.CompoundBalances>(`/v1/${chainId}/address/${address}/stacks/compound/balances`, {quoteCurrency})

export const getCurveBalances = (
	{address, chainId, quoteCurrency}:
	{address: Ethereum.Address} & ChainIDParameters & QuoteCurrencyParameters
) =>
	makeRequest<Covalent.CurveBalances>(`/v1/${chainId}/address/${address}/stacks/curve/balances`, {quoteCurrency})

export const getMakerBalances = (
	{address, chainId, quoteCurrency}:
	{address: Ethereum.Address} & ChainIDParameters & QuoteCurrencyParameters
) =>
	makeRequest<Covalent.MakerBalances>(`/v1/${chainId}/address/${address}/stacks/makerdao`, {quoteCurrency})

export const getUniswapV1Balances = (
	{address, chainId, quoteCurrency}:
	{address: Ethereum.Address} & ChainIDParameters & QuoteCurrencyParameters
) =>
	makeRequest<Covalent.UniswapV1Balances>(`/v1/${chainId}/address/${address}/stacks/uniswap_v1/balances`, {quoteCurrency})

export const getUniswapV1Transactions = (
	{address, chainId, quoteCurrency}:
	{address: Ethereum.Address} & ChainIDParameters & QuoteCurrencyParameters
) =>
	makeRequest<Covalent.UniswapV2LiquidityTransactions>(`/v1/${chainId}/address/${address}/stacks/uniswap_v2/acts`, {quoteCurrency})

export const getUniswapV2Balances = (
	{address, chainId, quoteCurrency}:
	{address: Ethereum.Address} & ChainIDParameters & QuoteCurrencyParameters
) =>
	makeRequest<Covalent.UniswapV1Balances>(`/v1/${chainId}/address/${address}/stacks/uniswap_v2/balances`, {quoteCurrency})

export const getTransactionsByAddress = (
	{address, includeLogs = false, chainId, pageNumber, pageSize, quoteCurrency}:
	{address: Ethereum.Address, includeLogs?: boolean} & ChainIDParameters & PaginationParameters & QuoteCurrencyParameters
) =>
	makeRequest<Covalent.Transactions>(`/v1/${chainId}/address/${address}/transactions_v2`, {noLogs: !includeLogs, pageNumber, pageSize, quoteCurrency})

export const getERC20TokenTransfers = (
	{address, contractAddress, chainId, pageNumber, pageSize, quoteCurrency}:
	{address: Ethereum.Address, contractAddress: Ethereum.ContractAddress} & ChainIDParameters & PaginationParameters & QuoteCurrencyParameters
) =>
	makeRequest<Covalent.ERC20TokenTransfers>(`/v1/${chainId}/address/${address}/transfers_v2`, {contractAddress, pageNumber, pageSize, quoteCurrency})


export const getBlock = (
	{blockNumber = 'latest', chainId, pageNumber, pageSize}:
	{blockNumber: Ethereum.BlockNumber | 'latest'} & ChainIDParameters & PaginationParameters
) =>
	makeRequest<Covalent.BlockItems>(`/v1/${chainId}/block_v2/${blockNumber}`, {pageNumber, pageSize})

export const getLogEventsByContract = (
	{contractAddress, startingBlock, endingBlock, chainId, pageNumber, pageSize, quoteCurrency}:
	{contractAddress: Ethereum.ContractAddress, startingBlock: Ethereum.BlockNumber, endingBlock: Ethereum.BlockNumber} & ChainIDParameters & PaginationParameters & QuoteCurrencyParameters
) =>
	makeRequest<Covalent.LogEvents>(`/v1/${chainId}/events/address/${contractAddress}`, {startingBlock, endingBlock, pageNumber, pageSize, quoteCurrency})

export const getLogEventsByTopicHash = (
	{topic, startingBlock, endingBlock, senderAddress, chainId, pageNumber, pageSize, quoteCurrency}:
	{topic: string | string[], startingBlock: Ethereum.BlockNumber, endingBlock: Ethereum.BlockNumber, senderAddress?: Ethereum.Address} & ChainIDParameters & PaginationParameters & QuoteCurrencyParameters
) =>
	makeRequest<Covalent.LogEvents>(`/v1/${chainId}/events/topics/${topic}`, {startingBlock, endingBlock, senderAddress, pageNumber, pageSize, quoteCurrency})

export const getTransaction = (
	{transactionHash, includeLogs = false, chainId, pageNumber, pageSize, quoteCurrency}:
	{transactionHash: Ethereum.TransactionId, includeLogs?: boolean} & ChainIDParameters & PaginationParameters & QuoteCurrencyParameters
) =>
	makeRequest<Covalent.Transactions>(`/v1/${chainId}/transaction_v2/${transactionHash}`, {noLogs: !includeLogs, pageNumber, pageSize, quoteCurrency})


// /v1/${chainId}/networks/aave/assets/
// /v1/${chainId}/networks/augur/affiliate_fee/
// /v1/${chainId}/networks/compound/assets/
// /v1/${chainId}/networks/uniswap_v2/assets/


export const getHistoricalPricesByTickerSymbol = (
	{quoteCurrency, tickerSymbol, from, to, chainId, pageNumber, pageSize}:
	QuoteCurrencyParameters & {tickerSymbol: TickerSymbol, from: Covalent.Day, to: Covalent.Day} & ChainIDParameters & PaginationParameters
) =>
	makeRequest<Covalent.HistoricalPrices[]>(`/v1/pricing/historical/${chainId}/${quoteCurrency}/${tickerSymbol}`, {from, to, pageNumber, pageSize})
	// makeRequest<Covalent.HistoricalPrices>(`/v1/pricing/historical/${quoteCurrency}/${tickerSymbol}`, {from, to, pageNumber, pageSize})

export const getHistoricalPricesByAddress = (
	{quoteCurrency, contractAddress, from, to, chainId, pageNumber, pageSize}:
	QuoteCurrencyParameters & {contractAddress: Ethereum.ContractAddress, from: Covalent.Day, to: Covalent.Day} & ChainIDParameters & PaginationParameters
) =>
	makeRequest<Covalent.HistoricalPrices[]>(`/v1/pricing/historical_by_address/${chainId}/${quoteCurrency}/${contractAddress}`, {from, to, pageNumber, pageSize})

export const getHistoricalPricesByAddresses = (
	{quoteCurrency, contractAddresses, from, to, chainId, pageNumber, pageSize}:
	QuoteCurrencyParameters & {contractAddresses: Ethereum.ContractAddress[], from: Covalent.Day, to: Covalent.Day} & ChainIDParameters & PaginationParameters
) =>
	makeRequest<Covalent.HistoricalPrices[]>(`/v1/pricing/historical_by_addresses_v2/${chainId}/${quoteCurrency}/${contractAddresses.join(',')}`, {from, to, pageNumber, pageSize})

export const getSpotPrices = (
	{tickers, pageNumber, pageSize}:
	{tickers: TickerSymbol[] } & PaginationParameters
) =>
	makeRequest<Covalent.HistoricalPrices[]>(`/v1/pricing/tickers`, {tickers, pageNumber, pageSize})

// /v1/pricing/volatility/
// /v1/${chainId}/tokens/${address}/token_holders_changes/
// /v1/${chainId}/tokens/${address}/token_holders/


export type Transaction = Ethereum.Transaction & {
	erc20Transfers?: Erc20Transfer[]
}
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

export const normalizeTransaction = (
	transaction: Covalent.Transaction | Covalent.TransactionWithErc20Transfers,
	network: Ethereum.Network,
	quoteCurrency: QuoteCurrency,
): Transaction => ({
	network,
	transactionId: transaction.tx_hash as Ethereum.TransactionId,

	executionStatus: transaction.successful ? 'successful' : 'failed',
	finalityStatus: 'block_height' in transaction ? 'finalized' : 'pending',

	nonce: undefined,
	transactionIndex: transaction.tx_offset,

	blockNumber: BigInt(transaction.block_height),
	blockHash: undefined,
	blockTimestamp: transaction.block_signed_at,

	fromAddress: transaction.from_address as Ethereum.Address,
	toAddress: transaction.to_address as Ethereum.Address,
	labels: {
		fromAddress: transaction.from_address_label,
		toAddress: transaction.to_address_label,
	},

	value: BigInt(transaction.value),

	gasToken: network.nativeCurrency,
	gasUnitsOffered: BigInt(transaction.gas_offered),
	gasUnitsSpent: BigInt(transaction.gas_spent),
	gasUnitRate: BigInt(transaction.gas_price),
	gasValue: BigInt(transaction.gas_spent) * BigInt(transaction.gas_price),

	conversion: {
		quoteCurrency,

		value: transaction.value_quote,

		gasUnitRate: transaction.gas_quote_rate,
		gasValue: transaction.gas_quote,
	},

	logEvents: transaction.log_events
		?.map(normalizeLogEvent)
		.sort((logEvent1, logEvent2) => (logEvent1.indexInTransaction ?? -1) - (logEvent2.indexInTransaction ?? -1)),

	...('transfers' in transaction && {
		erc20Transfers: transaction.transfers.map(transfer => (
			normalizeErc20Transfer(transfer, network, quoteCurrency))
		)
	}),
})

export const normalizeLogEvent = (logEvent: Covalent.LogEvent): Ethereum.TransactionLogEvent => ({
	indexInTransaction: logEvent.log_offset,
	transactionHash: logEvent.tx_hash as Ethereum.TransactionId,

	indexInBlock: logEvent.tx_offset,
	blockNumber: BigInt(logEvent.block_height),
	// blockHash: ,

	topics: logEvent.raw_log_topics as Ethereum.TopicHash[],
	data: logEvent.raw_log_data,

	contract: {
		name: logEvent.sender_name,
		address: logEvent.sender_address as Ethereum.ContractAddress,
		symbol: logEvent.sender_contract_ticker_symbol,
		decimals: logEvent.sender_contract_decimals,
		icon: logEvent.sender_logo_url !== 'null' ?  logEvent.sender_logo_url : undefined,
		label: logEvent.sender_address_label !== 'null' ? logEvent.sender_address_label : undefined,
	},

	decoded: logEvent.decoded && {
		name: logEvent.decoded.name,
		signature: logEvent.decoded.signature,
		params: logEvent.decoded.params?.map(logEvent => ({
			name: logEvent.name,
			type: logEvent.type as AbiType,
			value: logEvent.value ?? '', // logEvent.value === null, logEvent.decoded === false
			indexed: logEvent.indexed,
			decoded: logEvent.decoded,
		})) ?? [],
	}
})

export const normalizeErc20Transfer = (
	transfer: Covalent.ERC20TokenTransfer,
	network: Ethereum.Network,
	quoteCurrency: QuoteCurrency,
): Erc20Transfer => ({
	network,
	transactionId: transfer.tx_hash as Ethereum.TransactionId,

	blockTimestamp: transfer.block_signed_at,

	fromAddress: transfer.from_address as Ethereum.Address,
	toAddress: transfer.to_address as Ethereum.Address,
	labels: {
		fromAddress: transfer.from_address_label,
		toAddress: transfer.to_address_label,
	},

	value: BigInt(transfer.delta),

	transferredToken: {
		symbol: transfer.contract_ticker_symbol,
		address: transfer.contract_address as Ethereum.Address,
		name: transfer.contract_name,
		icon: transfer.logo_url,
		decimals: transfer.contract_decimals
	},

	conversion: {
		quoteCurrency,
		value: transfer.delta_quote,
		rate: transfer.quote_rate,
	},

	logEvents: transfer.method_calls?.map(methodCall => ({
		contract: {
			address: methodCall.sender_address
		},
		decoded: {
			name: methodCall.method
		}
	})),
})

export const normalizeNftContract = (nftContractWithBalance: Covalent.NFTContractWithBalance, quoteCurrency: QuoteCurrency): Ethereum.NftContractWithNfts => ({
	name: nftContractWithBalance.contract_name,
	address: nftContractWithBalance.contract_address,
	symbol: nftContractWithBalance.contract_ticker_symbol,
	ercTokenStandards: nftContractWithBalance.supports_erc?.filter(erc => erc !== 'erc20'),
	metadata: {
		description: undefined,
		bannerImage: undefined,
		logoImage: nftContractWithBalance.contract_logo_url || nftContractWithBalance.logo_url,
	},

	conversion: {
		quoteCurrency,
		value: nftContractWithBalance.quote,
		rate: nftContractWithBalance.quote_rate,
	},

	nftsCount: nftContractWithBalance.balance,
	nfts: nftContractWithBalance.nft_data?.map(normalizeNft),
})

export const normalizeNft = (nftWithBalance: Covalent.NFTWithBalance): Ethereum.Nft => ({
	owner: nftWithBalance.owner as Ethereum.Address,

	tokenId: BigInt(nftWithBalance.token_id),
	tokenUri: nftWithBalance.token_url,

	metadata: {
		...nftWithBalance.external_data,
		attributes: nftWithBalance.external_data?.attributes && normalizeNftAttributes(nftWithBalance.external_data?.attributes),
	},
})
