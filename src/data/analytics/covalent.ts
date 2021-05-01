import type { Token } from 'graphql'
import type { TickerSymbol } from '../currency/currency'
import type { Ethereum } from '../ethereum/types'

import { COVALENT_URL } from '../../config'
import { env } from '../../config-secrets'
import { ConcurrentPromiseQueue } from '../../utils/concurrent-promise-queue'
const { COVALENT_API_KEY } = env

// https://www.covalenthq.com/docs/api/
export namespace Covalent {
	type integer = number
	type float = number
	type int32 = number
	type int64 = number
	type double = number
	type date_time = Date

	export type Day = string // 'YYYY-MM-DD'

	// https://covalenthq.com/docs/networks
	export const MainnetChainIDs = [1, 137, 43114, 56, 250] as const
	export const TestnetChainIDs = [80001, 43113] as const
	export const ChainIDs = [...MainnetChainIDs, ...TestnetChainIDs] as const
	export type ChainID = typeof ChainIDs[number]

	export const quoteCurrencies = ['USD', 'CAD', 'EUR', 'SGD', 'INR', 'JPY', 'VND', 'CNY', 'KRW', 'RUB', 'TRY', 'ETH']
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
		nft_data: NFTWithBalance[]
	}
	export type NFTWithBalance = {
		token_id: integer
		token_balance: integer
		token_url: string

		supports_erc: ERCTokenStandard[]

		token_price_wei: integer
		token_quote_rate_eth: string
		
		external_data: {
			name: string
			description: string
			image: string
			external_url: string
			attributes: {}
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
		name: string
		type: string
		indexed: boolean
		decoded: boolean
		value: any
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

	export type ERC20TokenTransfer = Transaction & TokenContract & {
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
	export type HistoricalPrices = TokenContract & {
		quote_currency: QuoteCurrency
		prices: HistoricalPricePoint[]
	}
}

type ChainIDParameters = {
	chainID: Covalent.ChainID
}
type QuoteCurrencyParameters = {
	quoteCurrency?: Covalent.QuoteCurrency
}
type PaginationParameters = {
	pageNumber?: number
	pageSize?: number
}


const queue = new ConcurrentPromiseQueue(3)

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
		fetch(`${COVALENT_URL}${endpoint}/?${`${formatParams({key: COVALENT_API_KEY, ...params})}`}`)
			.then(async response => {
				if(response.ok)
					return response.json()

				if(response.headers.get('content-type').includes('application/json')){
					const {error, error_message, error_code}: Covalent.Response = await response.json()
					throw new Error(error_message)
				}
				
				// throw new Error(await response.text())
				throw new Error(new DOMParser().parseFromString(await response.text(), 'text/html').documentElement.innerText)
			})
			.then(({data}: Covalent.Response) => { 
				console.log(data)
				return data as T
			})
	)


export const getTokenAddressBalances = (
	{address, nft, chainID, quoteCurrency}:
	{address: Ethereum.Address, nft?: boolean} & ChainIDParameters & QuoteCurrencyParameters
) =>
	makeRequest<Covalent.TokenContractsWithBalances>(`/v1/${chainID}/address/${address}/balances_v2`, {nft, quoteCurrency})

// post-/v1/${chainID}/address/${address}/register/


export const getAaveBalances = (
	{address, chainID, quoteCurrency}:
	{address: Ethereum.Address} & ChainIDParameters & QuoteCurrencyParameters
) =>
	makeRequest<Covalent.AaveBalances>(`/v1/${chainID}/address/${address}/stacks/aave/balances`, {quoteCurrency})

export const getBalancerBalances = (
	{address, chainID, quoteCurrency}:
	{address: Ethereum.Address} & ChainIDParameters & QuoteCurrencyParameters
) =>
	makeRequest<Covalent.BalancerBalances>(`/v1/${chainID}/address/${address}/stacks/balancer/balances`, {quoteCurrency})

export const getCompoundActivity = (
	{address, chainID, quoteCurrency}:
	{address: Ethereum.Address} & ChainIDParameters & QuoteCurrencyParameters
) =>
	makeRequest<Covalent.CompoundActivity>(`/v1/${chainID}/address/${address}/stacks/compound/acts`, {quoteCurrency})

export const getCompoundBalances = (
	{address, chainID, quoteCurrency}:
	{address: Ethereum.Address} & ChainIDParameters & QuoteCurrencyParameters
) =>
	makeRequest<Covalent.CompoundBalances>(`/v1/${chainID}/address/${address}/stacks/compound/balances`, {quoteCurrency})

export const getCurveBalances = (
	{address, chainID, quoteCurrency}:
	{address: Ethereum.Address} & ChainIDParameters & QuoteCurrencyParameters
) =>
	makeRequest<Covalent.CurveBalances>(`/v1/${chainID}/address/${address}/stacks/curve/balances`, {quoteCurrency})

export const getMakerBalances = (
	{address, chainID, quoteCurrency}:
	{address: Ethereum.Address} & ChainIDParameters & QuoteCurrencyParameters
) =>
	makeRequest<Covalent.MakerBalances>(`/v1/${chainID}/address/${address}/stacks/makerdao`, {quoteCurrency})

export const getUniswapV1Balances = (
	{address, chainID, quoteCurrency}:
	{address: Ethereum.Address} & ChainIDParameters & QuoteCurrencyParameters
) =>
	makeRequest<Covalent.UniswapV1Balances>(`/v1/${chainID}/address/${address}/stacks/uniswap_v1/balances`, {quoteCurrency})

export const getUniswapV1Transactions = (
	{address, chainID, quoteCurrency}:
	{address: Ethereum.Address} & ChainIDParameters & QuoteCurrencyParameters
) =>
	makeRequest<Covalent.UniswapV2LiquidityTransactions>(`/v1/${chainID}/address/${address}/stacks/uniswap_v2/acts`, {quoteCurrency})

export const getUniswapV2Balances = (
	{address, chainID, quoteCurrency}:
	{address: Ethereum.Address} & ChainIDParameters & QuoteCurrencyParameters
) =>
	makeRequest<Covalent.UniswapV1Balances>(`/v1/${chainID}/address/${address}/stacks/uniswap_v2/balances`, {quoteCurrency})

export const getTransactionsByAddress = (
	{address, includeLogs = false, chainID, pageNumber, pageSize, quoteCurrency}:
	{address: Ethereum.Address, includeLogs?: boolean} & ChainIDParameters & PaginationParameters & QuoteCurrencyParameters
) =>
	makeRequest<Covalent.Transactions>(`/v1/${chainID}/address/${address}/transactions_v2`, {noLogs: !includeLogs, pageNumber, pageSize, quoteCurrency})

export const getERC20TokenTransfers = (
	{address, contractAddress, chainID, pageNumber, pageSize, quoteCurrency}:
	{address: Ethereum.Address, contractAddress: Ethereum.ContractAddress} & ChainIDParameters & PaginationParameters & QuoteCurrencyParameters
) =>
	makeRequest<Covalent.ERC20TokenTransfers>(`/v1/${chainID}/address/${address}/transfers_v2`, {contractAddress, pageNumber, pageSize, quoteCurrency})


export const getBlock = (
	{blockNumber = 'latest', chainID, pageNumber, pageSize}:
	{blockNumber: Ethereum.BlockNumber | 'latest'} & ChainIDParameters & PaginationParameters
) =>
	makeRequest<Covalent.BlockItems>(`/v1/${chainID}/block_v2/${blockNumber}`, {pageNumber, pageSize})

export const getLogEventsByContract = (
	{contractAddress, startingBlock, endingBlock, chainID, pageNumber, pageSize, quoteCurrency}:
	{contractAddress: Ethereum.ContractAddress, startingBlock: Ethereum.BlockNumber, endingBlock: Ethereum.BlockNumber} & ChainIDParameters & PaginationParameters & QuoteCurrencyParameters
) =>
	makeRequest<Covalent.LogEvents>(`/v1/${chainID}/events/address/${contractAddress}`, {startingBlock, endingBlock, pageNumber, pageSize, quoteCurrency})

export const getLogEventsByTopicHash = (
	{topic, startingBlock, endingBlock, senderAddress, chainID, pageNumber, pageSize, quoteCurrency}:
	{topic: string | string[], startingBlock: Ethereum.BlockNumber, endingBlock: Ethereum.BlockNumber, senderAddress?: Ethereum.Address} & ChainIDParameters & PaginationParameters & QuoteCurrencyParameters
) =>
	makeRequest<Covalent.LogEvents>(`/v1/${chainID}/events/topics/${topic}`, {startingBlock, endingBlock, senderAddress, pageNumber, pageSize, quoteCurrency})

export const getTransaction = (
	{transactionHash, includeLogs = false, chainID, pageNumber, pageSize, quoteCurrency}:
	{transactionHash: Ethereum.TransactionID, includeLogs?: boolean} & ChainIDParameters & PaginationParameters & QuoteCurrencyParameters
) =>
	makeRequest<Covalent.Transactions>(`/v1/${chainID}/transaction_v2/${transactionHash}`, {noLogs: !includeLogs, pageNumber, pageSize, quoteCurrency})


// /v1/${chainID}/networks/aave/assets/
// /v1/${chainID}/networks/augur/affiliate_fee/
// /v1/${chainID}/networks/compound/assets/
// /v1/${chainID}/networks/uniswap_v2/assets/


export const getHistoricalPrices = (
	{quoteCurrency, tickerSymbol, from, to, pageNumber, pageSize}:
	QuoteCurrencyParameters & {tickerSymbol: TickerSymbol, from: Covalent.Day, to: Covalent.Day} & ChainIDParameters & PaginationParameters
) =>
	makeRequest<Covalent.HistoricalPrices>(`/v1/pricing/historical/${quoteCurrency}/${tickerSymbol}`, {from, to, pageNumber, pageSize})

// /v1/pricing/tickers/
// /v1/pricing/volatility/
// /v1/${chainID}/tokens/${address}/token_holders_changes/
// /v1/${chainID}/tokens/${address}/token_holders/
