import type { Token } from 'graphql'
import { COVALENT_URL, COVALENT_API_KEY } from '../../config'
import type { BaseCurrency, TickerSymbol } from '../currency/currency'
import type { Ethereum } from '../ethereum/types'

// https://www.covalenthq.com/docs/api/
export namespace Covalent {
	type integer = number
	type float = number
	type int32 = number
	type int64 = number
	type double = number
	type date_time = Date

	export type Day = string // 'YYYY-MM-DD'


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


	export type QuoteCurrency = BaseCurrency // 'USD' | 'CAD'| 'INR' | 'ETH' | 'EUR'

	interface AddressData {
		address: Ethereum.Address,
		updated_at: Date,
		next_update_at: Date,
		quote_currency: QuoteCurrency
	}

	export interface Contract {
		contract_decimals: integer
		contract_name: string
		contract_ticker_symbol: TickerSymbol
		contract_address: Ethereum.ContractAddress

		contract_logo_url: string
		logo_url: string
	}

	export interface TokenWithBalance extends Contract {
		balance: integer
		quote: float
		quote_rate: float
	}

	export type NFT = {
		token_id: integer
		token_balance: integer
		token_url: string
	}

	export type TokenBalances = AddressData & {
		items: (TokenWithBalance & NFT & {
			external_data: {
				name: string
				description: string
				image: string
				external_url: string
				attributes: {}
			}
		})[]
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

	export type BalancerPoolToken = TokenWithBalance & {
		total_supply: integer
		swap_fee: float
	}
	export type BalancerUnderlyingToken = Token & {
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

	export type CompoundSupplyToken = Contract & {
		balance: integer
		interest_accrued: integer
		balance_quote: float
		interest_accrued_quote: float
		quote_rate: float
		apr: float
	}
	export type CompoundBorrowToken = Contract & {
		balance: integer
		interest_accrued: integer
		balance_quote: float
		interest_accrued_quote: float
		quote_rate: float
		apr: float
	}
	export type CompoundBalance = Contract & {
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

	export type CurvePoolToken = Contract & {
		balance: integer
		supply: integer
		fee: integer
	}
	export type CurveBalance = {
		pool: CurvePoolToken
		underlying: TokenWithBalance[]
	}
	export type CurveBalances = AddressData & {
		balancer: {
			curve: CurveBalance[]
		}
	}

	export type MakerVaultAtion = {
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
		breakdown_acts: MakerVaultAtion[]
	}
	export type MakerBalances = {
		count_vaults: int32
		breakdown_vault: MakerVault[]
	}

	export type UniswapV1PoolToken = TokenWithBalance & {
		total_supply: integer
	}
	export type UniswapV1Balance = {
		token_0: TokenWithBalance
		token_1: TokenWithBalance
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

		token_0: TokenWithBalance
		token_1: TokenWithBalance
		pool_token: UniswapV1PoolToken
	}
	export type UniswapV2LiquidityTransactions = AddressData & {
		items: UniswapV1LiquidityTransaction
		pagination: Pagination
	}

	export type UniswapV2PoolToken = TokenWithBalance & {
		total_supply: integer
	}
	export type UniswapV2Balance = {
		token_0: TokenWithBalance
		token_1: TokenWithBalance
		pool_token: UniswapV2PoolToken
	}
	export type UniswapV2Balances = AddressData & {
		uniswap_v2: {
			balances: UniswapV1Balance[]
		}
	}

	export type Parameter = {
		name: string
		type: string
		indexed: boolean
		decoded: boolean
		value: {}
	}
	export type LogEvent = {
		block_signed_at: date_time
		block_height: int64
		tx_offset: int64
		log_offset: int64
		tx_hash: string
		raw_log_topics: string[]
		sender_address: string
		sender_address_label: string
		raw_log_data: string
		decoded: {
			name: string
			signature: string
			params: Parameter[]
		}
	}
	export type LogEvents = {
		items: LogEvent[]
		pagination: Pagination
	}

	export type Transaction = {
		block_signed_at: date_time
		tx_hash: string
		tx_offset: int32
		successful: boolean
		from_address: string
		from_address_label: string
		to_address: string
		to_address_label: string
		value: number // The value attached to this tx.
		value_quote: float // The value attached in quote-currency to this tx.
		gas_offered: int64 // The gas offered for this tx.
		gas_spent: int64 // The gas spent for this tx.
		gas_price: int64 // The gas price at the time of this tx.
		gas_quote: float // The gas spent in quote-currency denomination.
		gas_quote_rate: float // Historical ETH price at the time of tx.
		log_events?: LogEvent[]
	}
	export type Transactions = AddressData & {
		items: Transaction[]
		pagination: Pagination
	}

	export type ERC20TokenTransfer = Transaction & {
		block_signed_at: date_time
		tx_hash: string
		from_address: string
		from_address_label: string
		to_address: string
		to_address_label: string
		contract_decimals: int32
		contract_name: string
		contract_ticker_symbol: TickerSymbol
		contract_address: string
		logo_url: string
		transfer_type: string
		delta: number
		balance: number
		quote_rate: float
		delta_quote: float
		balance_quote: float
	}
	export type ERC20TokenTransaction = Transaction & {
		transfers: ERC20TokenTransfer[]
	}
	export type ERC20TokenTransfers = AddressData & {
		items: ERC20TokenTransaction[]
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
	export type HistoricalPrices = Contract & {
		quote_currency: QuoteCurrency
		prices: HistoricalPricePoint[]
	}
}


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
	fetch(`${COVALENT_URL}${endpoint}/?${`${formatParams({key: COVALENT_API_KEY, ...params})}`}`)
		.then(async response => {
			if(response.ok)
				return response.json()
			// else try {
			// 	const {error, error_message, error_code}: Covalent.Response = await response.json()
			// 	throw new Error(error_message)
			// }
			// catch(e){
			// 	throw new Error(await response.text())
			// }
			const {error, error_message, error_code}: Covalent.Response = await response.json()
			throw new Error(error_message)
		})
		.then(({data}: Covalent.Response) => { 
			console.log(data)
			return data as T
		})


export const getTokenAddressBalances = (
	{address, nft, quoteCurrency}:
	{address: Ethereum.Address, nft?: boolean, quoteCurrency?: Covalent.QuoteCurrency}
) =>
	makeRequest<Covalent.TokenBalances>(`/v1/1/address/${address}/balances_v2`, {nft, quoteCurrency})

// post-/v1/1/address/${address}/register/


export const getAaveBalances = (
	{address, quoteCurrency}:
	{address: Ethereum.Address, quoteCurrency?: Covalent.QuoteCurrency}
) =>
	makeRequest<Covalent.AaveBalances>(`/v1/1/address/${address}/stacks/aave/balances`, {quoteCurrency})

export const getBalancerBalances = (
	{address, quoteCurrency}:
	{address: Ethereum.Address, quoteCurrency?: Covalent.QuoteCurrency}
) =>
	makeRequest<Covalent.BalancerBalances>(`/v1/1/address/${address}/stacks/balancer/balances`, {quoteCurrency})

export const getCompoundActivity = (
	{address, quoteCurrency}:
	{address: Ethereum.Address, quoteCurrency?: Covalent.QuoteCurrency}
) =>
	makeRequest<Covalent.CompoundActivity>(`/v1/1/address/${address}/stacks/compound/acts`, {quoteCurrency})

export const getCompoundBalances = (
	{address, quoteCurrency}:
	{address: Ethereum.Address, quoteCurrency?: Covalent.QuoteCurrency}
) =>
	makeRequest<Covalent.CompoundBalances>(`/v1/1/address/${address}/stacks/compound/balances`, {quoteCurrency})

export const getCurveBalances = (
	{address, quoteCurrency}:
	{address: Ethereum.Address, quoteCurrency?: Covalent.QuoteCurrency}
) =>
	makeRequest<Covalent.CurveBalances>(`/v1/1/address/${address}/stacks/curve/balances`, {quoteCurrency})

export const getMakerBalances = (
	{address, quoteCurrency}:
	{address: Ethereum.Address, quoteCurrency?: Covalent.QuoteCurrency}
) =>
	makeRequest<Covalent.MakerBalances>(`/v1/1/address/${address}/stacks/makerdao`, {quoteCurrency})

export const getUniswapV1Balances = (
	{address, quoteCurrency}:
	{address: Ethereum.Address, quoteCurrency?: Covalent.QuoteCurrency}
) =>
	makeRequest<Covalent.UniswapV1Balances>(`/v1/1/address/${address}/stacks/uniswap_v1/balances`, {quoteCurrency})

export const getUniswapV1Transactions = (
	{address, quoteCurrency}:
	{address: Ethereum.Address, quoteCurrency?: Covalent.QuoteCurrency}
) =>
	makeRequest<Covalent.UniswapV2LiquidityTransactions>(`/v1/1/address/${address}/stacks/uniswap_v2/acts`, {quoteCurrency})

export const getUniswapV2Balances = (
	{address, quoteCurrency}:
	{address: Ethereum.Address, quoteCurrency?: Covalent.QuoteCurrency}
) =>
	makeRequest<Covalent.UniswapV1Balances>(`/v1/1/address/${address}/stacks/uniswap_v2/balances`, {quoteCurrency})

export const getTransactionsByAddress = (
	{address, includeLogs = false, pageNumber, pageSize, quoteCurrency}:
	{address: Ethereum.Address, includeLogs?: boolean, pageNumber?: number, pageSize?: number, quoteCurrency?: Covalent.QuoteCurrency}
) =>
	makeRequest<Covalent.Transactions>(`/v1/1/address/${address}/transactions_v2`, {noLogs: !includeLogs, pageNumber, pageSize, quoteCurrency})

export const getERC20TokenTransfers = (
	{address, contractAddress, pageNumber, pageSize, quoteCurrency}:
	{address: Ethereum.Address, contractAddress: Ethereum.ContractAddress, pageNumber?: number, pageSize?: number, quoteCurrency?: Covalent.QuoteCurrency}
) =>
	makeRequest<Covalent.ERC20TokenTransfers>(`/v1/1/address/${address}/transfers_v2`, {contractAddress, pageNumber, pageSize, quoteCurrency})


export const getBlock = (
	{blockNumber = 'latest', pageNumber, pageSize}:
	{blockNumber: Ethereum.BlockNumber | 'latest', pageNumber?: number, pageSize?: number}
) =>
	makeRequest<Covalent.BlockItems>(`/v1/1/block_v2/${blockNumber}`, {pageNumber, pageSize})

export const getLogEventsByContract = (
	{contractAddress, startingBlock, endingBlock, pageNumber, pageSize, quoteCurrency}:
	{contractAddress: Ethereum.ContractAddress, startingBlock: Ethereum.BlockNumber, endingBlock: Ethereum.BlockNumber, pageNumber?: number, pageSize?: number, quoteCurrency?: Covalent.QuoteCurrency}
) =>
	makeRequest<Covalent.LogEvents>(`/v1/1/events/address/${contractAddress}`, {startingBlock, endingBlock, pageNumber, pageSize, quoteCurrency})

export const getLogEventsByTopicHash = (
	{topic, startingBlock, endingBlock, senderAddress, pageNumber, pageSize, quoteCurrency}:
	{topic: string | string[], startingBlock: Ethereum.BlockNumber, endingBlock: Ethereum.BlockNumber, senderAddress?: Ethereum.Address, pageNumber?: number, pageSize?: number, quoteCurrency?: Covalent.QuoteCurrency}
) =>
	makeRequest<Covalent.LogEvents>(`/v1/1/events/topics/${topic}`, {startingBlock, endingBlock, senderAddress, pageNumber, pageSize, quoteCurrency})

export const getTransaction = (
	{transactionHash, includeLogs = false, pageNumber, pageSize, quoteCurrency}:
	{transactionHash: Ethereum.TransactionID, includeLogs?: boolean, pageNumber?: number, pageSize?: number, quoteCurrency?: Covalent.QuoteCurrency}
) =>
	makeRequest<Covalent.Transactions>(`/v1/1/transaction_v2/${transactionHash}`, {noLogs: !includeLogs, pageNumber, pageSize, quoteCurrency})


// /v1/1/networks/aave/assets/
// /v1/1/networks/augur/affiliate_fee/
// /v1/1/networks/compound/assets/
// /v1/1/networks/uniswap_v2/assets/


export const getHistoricalPrices = (
	{quoteCurrency, tickerSymbol, from, to, pageNumber, pageSize}:
	{quoteCurrency: Covalent.QuoteCurrency, tickerSymbol: TickerSymbol, from: Covalent.Day, to: Covalent.Day, pageNumber?: number, pageSize?: number}
) =>
	makeRequest<Covalent.HistoricalPrices>(`/v1/pricing/historical/${quoteCurrency}/${tickerSymbol}`, {from, to, pageNumber, pageSize})

// /v1/pricing/tickers/
// /v1/pricing/volatility/
// /v1/1/tokens/${address}/token_holders_changes/
// /v1/1/tokens/${address}/token_holders/
