import * as publicEnv from '$env/static/public'
import { ConcurrentPromiseQueue } from '$/utils/ConcurrentPromiseQueue'

const queue = new ConcurrentPromiseQueue(1)

const get = async <T>(
	endpoint: string,
	params?: Record<string, string | number | boolean | undefined>,
) => {
	const response = await queue.enqueue(() => (
		fetch(`https://api.covalenthq.com/${endpoint}/?${`${new URLSearchParams(params as Record<string, string>)}`}`, {
			headers: {
				'Authorization': `Bearer ${publicEnv.PUBLIC_COVALENT_API_KEY}`,
			}
		})
	))

	switch(response.headers.get('content-type')) {
		case 'application/json': {
			const responseJson: Response<T> = await response.json()

			if(responseJson.error)
				throw new Error(responseJson.error_message)

			return responseJson.data
		}

		case 'text/html':
		default: {
			const error = new DOMParser().parseFromString(await response.text(), 'text/html').body.innerText.trim()
			throw new Error(error)
		}
	}
}

export type Response<T> = {
	data: T,
	error: false,
	error_message: null,
	error_code: null,
} | {
	error: true
	error_message: string,
	error_code: number,
}


type integer = number
type double = number
type datetime = `${number}-${number}-${number}T${number}:${number}:${number}.${number}Z`
type safelong = `${bigint}`

type ErcInterface = `erc${20 | 165 | 721 | 1155}`



/**
 * Class A
 * APIs that return enriched blockchain data applicable to all blockchain networks, eg: token balances, transactions, log events, etc.
 */


/**
 * Balances
 */

/**
 * Get token balances for address
 * @link https://www.covalenthq.com/docs/api/balances/get-token-balances-for-address/
 * 
 * Commonly used to fetch the native, fungible (ERC20), and non-fungible (ERC721 & ERC1155) tokens held by an address. Response includes spot prices and other metadata.
 * 
 * Costs: 1.00 Credits
 * Processing: Realtime
 * 
 * Path Params
 * @param {string} chainName The chain name eg: `eth-mainnet`.
 * @param {string} walletAddress The requested address. Passing in an `ENS`, `RNS`, `Lens Handle`, or an `Unstoppable Domain` resolves automatically.
 * 
 * Query Params
 * @param {string} quote-currency The currency to convert. Supports `USD`, `CAD`, `EUR`, `SGD`, `INR`, `JPY`, `VND`, `CNY`, `KRW`, `RUB`, `TRY`, `NGN`, `ARS`, `AUD`, `CHF`, and `GBP`.
 * @param {boolean} nft If true, NFTs will be included in the response.
 * @param {boolean} no-nft-fetch If true, only NFTs that have been cached will be included in the response. Helpful for faster response times.
 * @param {boolean} no-spam If true, the suspected spam tokens are removed. Supports eth-mainnet and matic-mainnet.
 * @param {boolean} no-nft-asset-metadata If true, the response shape is limited to a list of collections and token ids, omitting metadata and asset information. Helpful for faster response times and wallets holding a large number of NFTs.
 */
export const getTokenBalancesForAddress = <
	NoNftAssetMetadata extends boolean | undefined = false,
>({
	chainName,
	walletAddress,
	quoteCurrency = 'USD',
	nft = false,
	noNftFetch = false,
	noSpam = false,
	noNftAssetMetadata = false,
}: {
	chainName: string | number
	walletAddress: string
	quoteCurrency?: string
	nft?: boolean
	noNftFetch?: boolean
	noSpam?: boolean
	noNftAssetMetadata?: NoNftAssetMetadata
}) => (
	get<BalancesResponse<NoNftAssetMetadata>>(`v1/${chainName}/address/${walletAddress}/balances_v2`, {
		'quote-currency': quoteCurrency,
		'nft': nft,
		'no-nft-fetch': noNftFetch,
		'no-spam': noSpam,
		'no-nft-asset-metadata': noNftAssetMetadata,
	})
)

export type BalancesResponse<NoNftAssetMetadata extends boolean | undefined> = {
	/** The requested address. */
	address: string,

	/** The requested chain ID eg: `1`. */
	chain_id: integer,

	/** The requested chain name eg: `eth-mainnet`. */
	chain_name: string,

	/** The requested quote currency eg: `USD`. */
	quote_currency: string,

	/** The timestamp when the response was generated. Useful to show data staleness to users. */
	updated_at: datetime,

	/** DEPRECATED */
	next_update_at: datetime,

	/** List of response items. */
	items: {
		/** Use contract decimals to format the token balance for display purposes - divide the balance by `10^{contract_decimals}`. */
		contract_decimals: integer,

		/** The string returned by the `name()` method. */
		contract_name: string,

		/** The ticker symbol for this contract. This field is set by a developer and non-unique across a network. */
		contract_ticker_symbol: string,

		/** Use the relevant `contract_address` to lookup prices, logos, token transfers, etc. */
		contract_address: string,

		/** A list of supported standard ERC interfaces, eg: `ERC20` and `ERC721`. */
		supports_erc: ErcInterface[] | null,

		/** The contract logo URL. */
		logo_url: string,

		/** The balance item logo URLs. */
		logo_urls: {
			/** The token logo URL. */
			token_logo_url: string,

			/** The protocol logo URL. */
			protocol_logo_url: string,

			/** The chain logo URL. */
			chain_logo_url: string,
		},

		/** The timestamp when the token was transferred. */
		last_transferred_at: datetime,

		/** Indicates if a token is the chain's native gas token, eg: ETH on Ethereum. */
		native_token: boolean,

		/** One of `cryptocurrency`, `stablecoin`, `nft` or `dust`. */
		type: string,

		/** Denotes whether the token is suspected spam. */
		is_spam: boolean,

		/** The asset balance. Use `contract_decimals` to scale this balance for display purposes. */
		balance: safelong, // integer

		/** The exchange rate for the requested quote currency. */
		quote_rate: double,

		/** The current balance converted to fiat in `quote-currency`. */
		quote: double,

		/** A prettier version of the quote for rendering purposes. */
		pretty_quote: string,

		/** The protocol metadata. */
		protocol_metadata: {
			/** The name of the protocol. */
			protocol_name: string,
		},

		/** NFT-specific data. */
		nft_data: NoNftAssetMetadata extends true
			? {
				/** The token's id. */
				token_id: string,

				token_balance: safelong,
			}[]
			: NftWithMetadata[],
	}[]
}

/**
 * Get historical token balances for address
 * @link https://www.covalenthq.com/docs/api/balances/get-historical-token-balances-for-address/
 * 
 * Commonly used to fetch the historical native, fungible (ERC20), and non-fungible (ERC721 & ERC1155) tokens held by an address at a given block height or date. Response includes daily prices and other metadata.
 * 
 * Costs: 1.00 Credits
 * Processing: Realtime
 * 
 * Path Params
 * @param {string} chainName The chain name eg: `eth-mainnet`.
 * @param {string} walletAddress The requested address. Passing in an `ENS`, `RNS`, `Lens Handle`, or an `Unstoppable Domain` resolves automatically.
 * 
 * Query Params
 * @param {string} quote-currency The currency to convert. Supports `USD`, `CAD`, `EUR`, `SGD`, `INR`, `JPY`, `VND`, `CNY`, `KRW`, `RUB`, `TRY`, `NGN`, `ARS`, `AUD`, `CHF`, and `GBP`.
 * @param {boolean} nft If true, NFTs will be included in the response.
 * @param {boolean} no-nft-fetch If true, only NFTs that have been cached will be included in the response. Helpful for faster response times.
 * @param {boolean} no-spam If true, the suspected spam tokens are removed. Supports eth-mainnet and matic-mainnet.
 * @param {boolean} no-nft-asset-metadata If true, the response shape is limited to a list of collections and token ids, omitting metadata and asset information. Helpful for faster response times and wallets holding a large number of NFTs.
 * @param {integer} block-height Ending block to define a block range. Omitting this parameter defaults to the latest block height.
 * @param {string} date Ending date to define a block range (YYYY-MM-DD). Omitting this parameter defaults to the current date.
 */
export const getHistoricalTokenBalancesForAddress = <
	NoNftAssetMetadata extends boolean | undefined | undefined = false,
>({
	chainName,
	walletAddress,
	quoteCurrency = 'USD',
	nft = false,
	noNftFetch = false,
	noSpam = false,
	noNftAssetMetadata = false,
	blockHeight = 'latest',
	date,
}: {
	chainName: string | number
	walletAddress: string
	quoteCurrency?: string
	nft?: boolean
	noNftFetch?: boolean
	noSpam?: boolean
	noNftAssetMetadata?: NoNftAssetMetadata
	blockHeight?: integer | `0x${string}` | 'earliest' | 'latest'
	date?: string
}) => (
	get<HistoricalBalancesResponse<NoNftAssetMetadata>>(`v1/${chainName}/address/${walletAddress}/historical_balances`, {
		'quote-currency': quoteCurrency,
		'nft': nft,
		'no-nft-fetch': noNftFetch,
		'no-spam': noSpam,
		'no-nft-asset-metadata': noNftAssetMetadata,
		'block-height': blockHeight,
		'date': date,
	})
)

export type HistoricalBalancesResponse<NoNftAssetMetadata extends boolean | undefined | undefined = false> = {
	/** The requested address. */
	address: string,

	/** The requested chain ID eg: `1`. */
	chain_id: integer,

	/** The requested chain name eg: `eth-mainnet`. */
	chain_name: string,

	/** The requested quote currency eg: `USD`. */
	quote_currency: string,

	/** The timestamp when the response was generated. Useful to show data staleness to users. */
	updated_at: datetime,

	/** DEPRECATED */
	next_update_at: datetime,

	/** List of response items. */
	items: {
		/** Use contract decimals to format the token balance for display purposes - divide the balance by `10^{contract_decimals}`. */
		contract_decimals: integer,

		/** The string returned by the `name()` method. */
		contract_name: string,

		/** The ticker symbol for this contract. This field is set by a developer and non-unique across a network. */
		contract_ticker_symbol: string,

		/** Use the relevant `contract_address` to lookup prices, logos, token transfers, etc. */
		contract_address: string,

		/** A list of supported standard ERC interfaces, eg: `ERC20` and `ERC721`. */
		supports_erc: ErcInterface[] | null,

		/** The contract logo URL. */
		logo_url: string,

		/** The height of the block. */
		block_height: integer,

		/** The block height when the token was last transferred. */
		last_transferred_block_height: integer,

		/** The timestamp when the token was transferred. */
		last_transferred_at: datetime,

		/** Indicates if a token is the chain's native gas token, eg: ETH on Ethereum. */
		native_token: boolean,

		/** One of `cryptocurrency`, `stablecoin`, `nft` or `dust`. */
		type: string,

		/** Denotes whether the token is suspected spam. */
		is_spam: boolean,

		/** The asset balance. Use `contract_decimals` to scale this balance for display purposes. */
		balance: safelong, // integer

		/** The exchange rate for the requested quote currency. */
		quote_rate: double,

		/** The current balance converted to fiat in `quote-currency`. */
		quote: double,

		/** A prettier version of the quote for rendering purposes. */
		pretty_quote: string,

		/** NFT-specific data. */
		nft_data: NoNftAssetMetadata extends true
			? {
				/** The token's id. */
				token_id: string,

				token_balance: safelong,
			}[]
			: NftWithMetadata[],
	}[]
}

/**
 * Get native token balance for address
 * @link https://www.covalenthq.com/docs/api/balances/get-native-token-balance/
 * 
 * Commonly used to get the native token balance for an address. This endpoint is required because native tokens are usually not ERC20 tokens and sometimes you want something lightweight.
 * 
 * Costs: 0.50 Credits
 * Processing: Realtime
 * 
 * Path Params
 * @param {string} chainName The chain name eg: `eth-mainnet`.
 * @param {string} walletAddress The requested address. Passing in an `ENS`, `RNS`, `Lens Handle`, or an `Unstoppable Domain` resolves automatically.
 * 
 * Query Params
 * @param {string} quote-currency The currency to convert. Supports `USD`, `CAD`, `EUR`, `SGD`, `INR`, `JPY`, `VND`, `CNY`, `KRW`, `RUB`, `TRY`, `NGN`, `ARS`, `AUD`, `CHF`, and `GBP`.
 * @param {integer} block-height Ending block to define a block range. Omitting this parameter defaults to the latest block height.
 */
export const getNativeTokenBalanceForAddress = ({
	chainName,
	walletAddress,
	quoteCurrency = 'USD',
	blockHeight = 'latest',
}: {
	chainName: string | number
	walletAddress: string
	quoteCurrency?: string
	blockHeight?: integer | `0x${string}` | 'earliest' | 'latest'
}) => (
	get<TokenBalanceNativeResponse>(`v1/${chainName}/address/${walletAddress}/balances_native`, {
		'quote-currency': quoteCurrency,
		'block-height': blockHeight,
	})
)

export type TokenBalanceNativeResponse = {
	/** The requested address. */
	address: string,

	/** The requested chain ID eg: `1`. */
	chain_id: integer,

	/** The requested chain name eg: `eth-mainnet`. */
	chain_name: string,

	/** The requested quote currency eg: `USD`. */
	quote_currency: string,

	/** The timestamp when the response was generated. Useful to show data staleness to users. */
	updated_at: datetime,

	/** DEPRECATED */
	next_update_at: datetime,

	/** List of response items. */
	items: {
		/** Use contract decimals to format the token balance for display purposes - divide the balance by `10^{contract_decimals}`. */
		contract_decimals: integer,

		/** The string returned by the `name()` method. */
		contract_name: string,

		/** The ticker symbol for this contract. This field is set by a developer and non-unique across a network. */
		contract_ticker_symbol: string,

		/** Use the relevant `contract_address` to lookup prices, logos, token transfers, etc. */
		contract_address: string,

		/** A list of supported standard ERC interfaces, eg: `ERC20` and `ERC721`. */
		supports_erc: ErcInterface[] | null,

		/** The contract logo URL. */
		logo_url: string,

		/** The height of the block. */
		block_height: integer,

		/** The block height when the token was last transferred. */
		last_transferred_block_height: integer,

		/** The timestamp when the token was transferred. */
		last_transferred_at: datetime,

		/** Indicates if a token is the chain's native gas token, eg: ETH on Ethereum. */
		native_token: boolean,

		/** One of `cryptocurrency`, `stablecoin`, `nft` or `dust`. */
		type: string,

		/** Denotes whether the token is suspected spam. */
		is_spam: boolean,

		/** The asset balance. Use `contract_decimals` to scale this balance for display purposes. */
		balance: safelong, // integer

		/** The exchange rate for the requested quote currency. */
		quote_rate: double,

		/** The current balance converted to fiat in `quote-currency`. */
		quote: double,

		/** A prettier version of the quote for rendering purposes. */
		pretty_quote: string,
	}[]
}

/**
 * Get historical portfolio value over time
 * @link https://www.covalenthq.com/docs/api/balances/get-historical-portfolio-value-over-time/
 * 
 * Commonly used to render a daily portfolio balance for an address broken down by the token. The timeframe is user-configurable, defaults to 30 days.
 * 
 * Costs: 2.00 Credits per 30 days
 * Processing: Realtime
 * 
 * Path Params
 * @param {string} chainName The chain name eg: `eth-mainnet`.
 * @param {string} walletAddress The requested address. Passing in an `ENS`, `RNS`, `Lens Handle`, or an `Unstoppable Domain` resolves automatically.
 * 
 * Query Params
 * @param {string} quote-currency The currency to convert. Supports `USD`, `CAD`, `EUR`, `SGD`, `INR`, `JPY`, `VND`, `CNY`, `KRW`, `RUB`, `TRY`, `NGN`, `ARS`, `AUD`, `CHF`, and `GBP`.
 * @param {integer} days The number of days to return data for. Defaults to 30 days.
 */
export const getHistoricalPortfolioForWalletAddress = ({
	chainName,
	walletAddress,
	quoteCurrency = 'USD',
	days = 30,
}: {
	chainName: string | number
	walletAddress: string
	quoteCurrency?: string
	days?: integer
}) => (
	get<PortfolioResponse>(`v1/${chainName}/address/${walletAddress}/portfolio_v2`, {
		'quote-currency': quoteCurrency,
		'days': days,
	})
)

export type PortfolioResponse = {
	/** The requested address. */
	address: string,

	/** The timestamp when the response was generated. Useful to show data staleness to users. */
	updated_at: datetime,

	/** DEPRECATED */
	next_update_at: datetime,

	/** The requested quote currency eg: `USD`. */
	quote_currency: string,

	/** The requested chain ID eg: `1`. */
	chain_id: integer,

	/** The requested chain name eg: `eth-mainnet`. */
	chain_name: string,

	/** List of response items. */
	items: {
		/** Use the relevant `contract_address` to lookup prices, logos, token transfers, etc. */
		contract_address: string,

		/** Use contract decimals to format the token balance for display purposes - divide the balance by `10^{contract_decimals}`. */
		contract_decimals: integer,

		/** The string returned by the `name()` method. */
		contract_name: string,

		/** The ticker symbol for this contract. This field is set by a developer and non-unique across a network. */
		contract_ticker_symbol: string,

		/** The contract logo URL. */
		logo_url: string,

		holdings: {
			/** The exchange rate for the requested quote currency. */
			quote_rate: double,

			timestamp: datetime,

			close: {
				/** The asset balance. Use `contract_decimals` to scale this balance for display purposes. */
				balance: safelong, // integer

				/** The current balance converted to fiat in `quote-currency`. */
				quote: double,

				/** A prettier version of the quote for rendering purposes. */
				pretty_quote: string,
			},

			high: {
				/** The asset balance. Use `contract_decimals` to scale this balance for display purposes. */
				balance: safelong, // integer

				/** The current balance converted to fiat in `quote-currency`. */
				quote: double,

				/** A prettier version of the quote for rendering purposes. */
				pretty_quote: string,
			},

			low: {
				/** The asset balance. Use `contract_decimals` to scale this balance for display purposes. */
				balance: safelong, // integer

				/** The current balance converted to fiat in `quote-currency`. */
				quote: double,

				/** A prettier version of the quote for rendering purposes. */
				pretty_quote: string,
			},

			open: {
				/** The asset balance. Use `contract_decimals` to scale this balance for display purposes. */
				balance: safelong, // integer

				/** The current balance converted to fiat in `quote-currency`. */
				quote: double,

				/** A prettier version of the quote for rendering purposes. */
				pretty_quote: string,
			},
		},
	}[]
}

/**
 * Get ERC20 token transfers for address
 * @link https://www.covalenthq.com/docs/api/balances/get-erc20-token-transfers-for-address/
 * 
 * Commonly used to render the transfer-in and transfer-out of a token along with historical prices from an address.
 * 
 * Costs: 0.05 Credits per item
 * Processing: Realtime
 * 
 * Path Params
 * @param {string} chainName The chain name eg: `eth-mainnet`.
 * @param {string} walletAddress The requested address. Passing in an `ENS`, `RNS`, `Lens Handle`, or an `Unstoppable Domain` resolves automatically.
 * 
 * Query Params
 * @param {string} quote-currency The currency to convert. Supports `USD`, `CAD`, `EUR`, `SGD`, `INR`, `JPY`, `VND`, `CNY`, `KRW`, `RUB`, `TRY`, `NGN`, `ARS`, `AUD`, `CHF`, and `GBP`.
 * @param {string} contract-address The requested contract address. Passing in an `ENS`, `RNS`, `Lens Handle`, or an `Unstoppable Domain` resolves automatically.
 * @param {integer} starting-block The block height to start from, defaults to `0`.
 * @param {integer} ending-block The block height to end at, defaults to current block height.
 * @param {integer} page-size Number of items per page. Omitting this parameter defaults to `100`.
 * @param {integer} page-number 0-indexed page number to begin pagination.
 */
export const getErc20TransfersForWalletAddress = ({
	chainName,
	walletAddress,
	quoteCurrency = 'USD',
	contractAddress,
	startingBlock = 'earliest',
	endingBlock = 'latest',
	pageSize = 100,
	pageNumber = 0,
}: {
	chainName: string | number
	walletAddress: string
	quoteCurrency?: string
	contractAddress?: string
	startingBlock?: integer | `0x${string}` | 'earliest' | 'latest'
	endingBlock?: integer | `0x${string}` | 'earliest' | 'latest'
	pageSize?: integer
	pageNumber?: integer
}) => (
	get<Erc20TransfersResponse>(`v1/${chainName}/address/${walletAddress}/transfers_v2`, {
		'quote-currency': quoteCurrency,
		'contract-address': contractAddress,
		'starting-block': startingBlock,
		'ending-block': endingBlock,
		'page-size': pageSize,
		'page-number': pageNumber,
	})
)

export type Erc20TransfersResponse = {
	/** The requested address. */
	address: string,

	/** The timestamp when the response was generated. Useful to show data staleness to users. */
	updated_at: datetime,

	/** DEPRECATED */
	next_update_at: datetime,

	/** The requested quote currency eg: `USD`. */
	quote_currency: string,

	/** The requested chain ID eg: `1`. */
	chain_id: integer,

	/** The requested chain name eg: `eth-mainnet`. */
	chain_name: string,

	/** List of response items. */
	items: {
		/** The block signed timestamp in UTC. */
		block_signed_at: datetime,

		/** The height of the block. */
		block_height: integer,

		/** The requested transaction hash. */
		tx_hash: string,

		/** The offset is the position of the tx in the block. */
		tx_offset: integer,

		/** Whether or not transaction is successful. */
		successful: boolean,

		/** The sender's wallet address. */
		from_address: string,

		/** The label of `from` address. */
		from_address_label: string | null,

		/** The receiver's wallet address. */
		to_address: string,

		/** The label of `to` address. */
		to_address_label: string | null,

		/** The value attached to this tx. */
		value: safelong, // integer

		/** The value attached in `quote-currency` to this tx. */
		value_quote: double,

		/** A prettier version of the quote for rendering purposes. */
		pretty_value_quote: string,

		/** The gas spent for this tx. */
		gas_offered: integer,

		/** The gas price at the time of this tx. */
		gas_price: integer,

		/** The gas spent for this tx. */
		gas_spent: integer,

		/** The transaction's `gas_price` * `gas_spent`, denoted in wei. */
		fees_paid: safelong, // string

		/** The gas spent in `quote-currency` denomination. */
		gas_quote: double,

		/** A prettier version of the quote for rendering purposes. */
		pretty_gas_quote: string,

		/** The native gas exchange rate for the requested quote currency. */
		gas_quote_rate: double,

		transfers: {
			/** The block signed timestamp in UTC. */
			block_signed_at: datetime,

			/** The requested transaction hash. */
			tx_hash: string,

			/** The sender's wallet address. */
			from_address: string,

			/** The label of `from` address. */
			from_address_label: string | null,

			/** The receiver's wallet address. */
			to_address: string,

			/** The label of `to` address. */
			to_address_label: string | null,

			/** Use contract decimals to format the token balance for display purposes - divide the balance by `10^{contract_decimals}`. */
			contract_decimals: integer,

			/** The string returned by the `name()` method. */
			contract_name: string,

			/** The ticker symbol for this contract. This field is set by a developer and non-unique across a network. */
			contract_ticker_symbol: string,

			/** Use the relevant `contract_address` to lookup prices, logos, token transfers, etc. */
			contract_address: string,

			/** The contract logo URL. */
			logo_url: string,

			/** Categorizes token transactions as either `transfer-in` or `transfer-out`, indicating whether tokens are being received or sent from an account. */
			transfer_type: 'IN' | 'OUT', // string

			/** The delta attached to this transfer. */
			delta: safelong // integer

			/** The asset balance. Use `contract_decimals` to scale this balance for display purposes. */
			balance: integer | null,

			/** The exchange rate for the requested quote currency. */
			quote_rate: double,

			/** The current delta converted to fiat in `quote-currency`. */
			delta_quote: double,

			/** A prettier version of the quote for rendering purposes. */
			pretty_delta_quote: string,

			/** The current balance converted to fiat in `quote-currency`. */
			balance_quote: double | null,

			/** Additional details on which transfer events were invoked. Defaults to true. */
			method_calls: {
				/** The address of the sender. */
				sender_address: string,

				method: string,
			}[] | null,

			/** The explorer links for this transaction. */
			explorers: {
				/** The name of the explorer. */
				label: string | null,

				/** The URL of the explorer. */
				url: string,
			}[],
		}[]
	}[]

	/** Pagination metadata. */
	pagination: {
		/** True is there is another page. */
		has_more: boolean,

		/** The requested page number. */
		page_number: integer,

		/** The requested number of items on the current page. */
		page_size: integer,

		/** The total number of items across all pages for this request. */
		total_count: integer,
	}
}

/**
 * Get token holders as of any block height (v2)
 * @link https://www.covalenthq.com/docs/api/balances/get-token-holders-as-of-any-block-height-v2/
 * 
 * Commonly used to get a list of all the token holders for a specified ERC20 or ERC721 token. Returns historic token holders when block-height is set (defaults to latest). Useful for building pie charts of token holders.
 * 
 * Costs: 0.02 Credits per item
 * Processing: Realtime
 * 
 * Path Params
 * @param {string} chainName The chain name eg: `eth-mainnet`.
 * @param {string} tokenAddress The requested address. Passing in an `ENS`, `RNS`, `Lens Handle`, or an `Unstoppable Domain` resolves automatically.
 * 
 * Query Params
 * @param {integer} block-height Ending block to define a block range. Omitting this parameter defaults to the latest block height.
 * @param {string} date Ending date to define a block range (YYYY-MM-DD). Omitting this parameter defaults to the current date.
 * @param {integer} page-size Number of items per page. Note: Currently, only values of `100` and `1000` are supported. Omitting this parameter defaults to 100.
 * @param {integer} page-number 0-indexed page number to begin pagination.
 */
export const getTokenHoldersV2ForTokenAddress = ({
	chainName,
	tokenAddress,
	blockHeight = 'latest',
	date,
	pageSize = 100,
	pageNumber = 0,
}: {
	chainName: string | number
	tokenAddress: string
	blockHeight?: integer | `0x${string}` | 'earliest' | 'latest'
	date?: string
	pageSize?: integer
	pageNumber?: integer
}) => (
	get<TokenHoldersResponse>(`v1/${chainName}/tokens/${tokenAddress}/token_holders_v2`, {
		'block-height': blockHeight,
		'date': date,
		'page-size': pageSize,
		'page-number': pageNumber,
	})
)

export type TokenHoldersResponse = {
	/** The timestamp when the response was generated. Useful to show data staleness to users. */
	updated_at: datetime,

	/** The requested chain ID eg: `1`. */
	chain_id: integer,

	/** The requested chain name eg: `eth-mainnet`. */
	chain_name: string,

	/** List of response items. */
	items: {
		/** Use contract decimals to format the token balance for display purposes - divide the balance by `10^{contract_decimals}`. */
		contract_decimals: integer,

		/** The string returned by the `name()` method. */
		contract_name: string,

		/** The ticker symbol for this contract. This field is set by a developer and non-unique across a network. */
		contract_ticker_symbol: string,

		/** Use the relevant `contract_address` to lookup prices, logos, token transfers, etc. */
		contract_address: string,

		/** A list of supported standard ERC interfaces, eg: `ERC20` and `ERC721`. */
		supports_erc: ErcInterface[] | null,

		/** The contract logo URL. */
		logo_url: string,

		/** The requested address. */
		address: string,

		/** The asset balance. Use `contract_decimals` to scale this balance for display purposes. */
		balance: safelong, // integer

		/** Total supply of this token. */
		total_supply: integer,

		/** The height of the block. */
		block_height: integer,
	}[]

	/** Pagination metadata. */
	pagination: {
		/** True is there is another page. */
		has_more: boolean,

		/** The requested page number. */
		page_number: integer,

		/** The requested number of items on the current page. */
		page_size: integer,

		/** The total number of items across all pages for this request. */
		total_count: integer,
	}
}


/**
 * NFT - Core Rendering
 */

export type NftWithMetadata = {
	/** The token's id. */
	token_id: string,

	token_url: string | null,

	/** The original minter. */
	original_owner: string | null,

	external_data: NftExternalData,

	/** If `true`, the asset data is available from the Covalent CDN. */
	asset_cached: boolean,

	/** If `true`, the image data is available from the Covalent CDN. */
	image_cached: boolean,
}

export type NftExternalData = {
	name: string,

	description: string,

	asset_url: string | null,

	asset_file_extension: string | null,

	asset_mime_type: string | null,

	asset_size_bytes: `${number}` | null,

	image: string,

	image_256: string,

	image_512: string,

	image_1024: string,

	animation_url: string | null,

	external_url: string | null,

	attributes: {
		trait_type: string,

		value: string,
	}[],
}

/**
 * Get NFTs for address
 * @link https://www.covalenthq.com/docs/api/balances/get-nfts-for-address/
 * 
 * Commonly used to render the NFTs (including ERC721 and ERC1155) held by an address.
 * 
 * Costs: 1.00 Credits
 * Processing: Realtime
 * 
 * Path Params
 * @param {string} chainName The chain name eg: `eth-mainnet`.
 * @param {string} walletAddress The requested address. Passing in an `ENS`, `RNS`, `Lens Handle`, or an `Unstoppable Domain` resolves automatically.
 * 
 * Query Params
 * @param {boolean} no-spam If true, the suspected spam tokens are removed. Supports eth-mainnet and matic-mainnet.
 * @param {boolean} no-nft-asset-metadata If true, the response shape is limited to a list of collections and token ids, omitting metadata and asset information. Helpful for faster response times and wallets holding a large number of NFTs.
 * @param {boolean} with-uncached By default, this endpoint only works on chains where we've cached the assets and the metadata. When set to true, the API will fetch metadata from upstream servers even if it's not cached - the downside being that the upstream server can block or rate limit the call and therefore resulting in time outs or slow response times on the Covalent side.
 */
export const getNftsForAddress = <
	NoNftAssetMetadata extends boolean | undefined = false,
>({
	chainName,
	walletAddress,
	noSpam = false,
	noNftAssetMetadata = false,
	withUncached = false,
}: {
	chainName: string | number
	walletAddress: string
	noSpam?: boolean
	noNftAssetMetadata?: NoNftAssetMetadata
	withUncached?: boolean
}) => (
	get<NftAddressBalanceNftResponse<NoNftAssetMetadata>>(`v1/${chainName}/address/${walletAddress}/balances_nft`, {
		'no-spam': noSpam,
		'no-nft-asset-metadata': noNftAssetMetadata,
		'with-uncached': withUncached,
	})
)

export type NftAddressBalanceNftResponse<NoNftAssetMetadata extends boolean | undefined> = {
	/** The requested address. */
	address: string,

	/** The timestamp when the response was generated. Useful to show data staleness to users. */
	updated_at: datetime,

	/** List of response items. */
	items: {
		/** The string returned by the `name()` method. */
		contract_name: string,

		/** The ticker symbol for this contract. This field is set by a developer and non-unique across a network. */
		contract_ticker_symbol: string,

		/** Use the relevant `contract_address` to lookup prices, logos, token transfers, etc. */
		contract_address: string,

		/** A list of supported standard ERC interfaces, eg: `ERC20` and `ERC721`. */
		supports_erc: ErcInterface[] | null,

		/** Denotes whether the token is suspected spam. Supports `eth-mainnet` and `matic-mainnet`. */
		is_spam: boolean,

		/** The timestamp when the token was transferred. */
		last_transferred_at: datetime,

		/** The asset balance. Use `contract_decimals` to scale this balance for display purposes. */
		balance: safelong, // integer

		balance24h: safelong, // integer

		type: 'nft', // string

		/** The current floor price converted to fiat in `quote-currency`. The floor price is determined by the last minimum sale price within the last 30 days across all the supported markets where the collection is sold on. */
		floor_price_quote: double | null,

		/** A prettier version of the floor price quote for rendering purposes. */
		pretty_floor_price_quote: string | null,

		/** The current floor price in native currency. The floor price is determined by the last minimum sale price within the last 30 days across all the supported markets where the collection is sold on. */
		floor_price_native_quote: double | null,

		nft_data: NoNftAssetMetadata extends true
			? {
				/** The token's id. */
				token_id: string,

				token_balance: safelong,
			}[]
			: NftWithMetadata[],
	}[]
}

/**
 * Get NFTs from contract with metadata
 * @link https://www.covalenthq.com/docs/api/balances/get-nfts-from-contract-with-metadata/
 * 
 * Commonly used to get NFT token IDs with metadata from a collection. Useful for building NFT card displays.
 * 
 * Costs: 15.00 Credits
 * Processing: Realtime
 * 
 * Path Params
 * @param {string} chainName The chain name eg: `eth-mainnet`.
 * @param {string} contractAddress The requested contract address. Passing in an `ENS`, `RNS`, `Lens Handle`, or an `Unstoppable Domain` resolves automatically.
 * 
 * Query Params
 * @param {boolean} no-metadata Omit metadata.
 * @param {integer} page-size Number of items per page. Omitting this parameter defaults to 100.
 * @param {integer} page-number 0-indexed page number to begin pagination.
 * @param {string} traits-filter Filters NFTs based on a specific trait. If this filter is used, the API will return all NFTs with the specified trait. Accepts comma-separated values, is case-sensitive, and requires proper URL encoding.
 * @param {string} values-filter Filters NFTs based on a specific trait value. If this filter is used, the API will return all NFTs with the specified trait value. If used with "traits-filter", only NFTs matching both filters will be returned. Accepts comma-separated values, is case-sensitive, and requires proper URL encoding.
 * @param {boolean} with-uncached By default, this endpoint only works on chains where we've cached the assets and the metadata. When set to true, the API will fetch metadata from upstream servers even if it's not cached - the downside being that the upstream server can block or rate limit the call and therefore resulting in time outs or slow response times on the Covalent side.
 */
export const getNftsFromContractWithMetadata = <
	NoNftAssetMetadata extends boolean | undefined = false,
>({
	chainName,
	contractAddress,
	noMetadata = false,
	pageSize = 100,
	pageNumber = 0,
	traitsFilter,
	valuesFilter,
	withUncached = false,
}: {
	chainName: string | number
	contractAddress: string
	noMetadata?: NoNftAssetMetadata
	pageSize?: integer
	pageNumber?: integer
	traitsFilter?: string
	valuesFilter?: string
	withUncached?: boolean
}) => (
	get<NftMetadataResponse<NoNftAssetMetadata>>(`v1/${chainName}/nft/${contractAddress}/metadata`, {
		'no-metadata': noMetadata,
		'page-size': pageSize,
		'page-number': pageNumber,
		'traits-filter': traitsFilter,
		'values-filter': valuesFilter,
		'with-uncached': withUncached,
	})
)

export type NftMetadataResponse<NoNftAssetMetadata extends boolean | undefined> = {
	/** The timestamp when the response was generated. Useful to show data staleness to users. */
	updated_at: datetime,

	/** List of response items. */
	items: {
		/** The string returned by the `name()` method. */
		contract_name: string,

		/** The ticker symbol for this contract. This field is set by a developer and non-unique across a network. */
		contract_ticker_symbol: string,

		/** Use the relevant `contract_address` to lookup prices, logos, token transfers, etc. */
		contract_address: string,

		/** Denotes whether the token is suspected spam. Supports `eth-mainnet` and `matic-mainnet`. */
		is_spam: boolean,

		type: string,

		nft_data: NoNftAssetMetadata extends true
			? {
				/** The token's id. */
				token_id: string,

				token_balance: safelong,
			}[]
			: NftWithMetadata[],
	}[]

	/** Pagination metadata. */
	pagination: {
		/** True is there is another page. */
		has_more: boolean,

		/** The requested page number. */
		page_number: integer,

		/** The requested number of items on the current page. */
		page_size: integer,

		/** The total number of items across all pages for this request. */
		total_count: integer,
	}
}

/**
 * Get single NFT with cached metadata from contract
 * @link https://www.covalenthq.com/docs/api/balances/get-single-nft-with-cached-metadata-from-contract/
 * 
 * Commonly used to get a single NFT metadata by token ID from a collection. Useful for building NFT card displays.
 *  
 * Costs: 2.00 Credits
 * Processing: Realtime
 * 
 * Path Params
 * @param {string} chainName The chain name eg: `eth-mainnet`.
 * @param {string} contract-address The requested contract address. Passing in an `ENS`, `RNS`, `Lens Handle`, or an `Unstoppable Domain` resolves automatically.
 * @param {string} tokenId The requested token ID.
 * 
 * Query Params
 * @param {boolean} no-metadata Omit metadata.
 * @param {boolean} with-uncached By default, this endpoint only works on chains where we've cached the assets and the metadata. When set to `true`, the API will fetch metadata from upstream servers even if it's not cached - the downside being that the upstream server can block or rate limit the call and therefore resulting in time outs or slow response times on the Covalent side.
 */
export const getSingleNftWithCachedMetadataFromContract = ({
	chainName,
	contractAddress,
	tokenId,
	noMetadata = false,
	withUncached = false,
}: {
	chainName: string | number
	contractAddress: string
	tokenId: string
	noMetadata?: boolean
	withUncached?: boolean
}) => (
	get<NftMetadataResponse<true>>(`v1/${chainName}/nft/${contractAddress}/metadata/${tokenId}`, {
		'no-metadata': noMetadata,
		'with-uncached': withUncached,
	})
)

/**
 * Get NFT transactions for contract
 * @link https://www.covalenthq.com/docs/api/balances/get-nft-transactions-contract/
 * 
 * Commonly used to get all transactions of an NFT token. Useful for building a transaction history table or price chart.
 * 
 * Costs: 0.10 Credits per item
 * Processing: Realtime
 * 
 * Path Params
 * @param {string} chainName The chain name eg: `eth-mainnet`.
 * @param {string} contractAddress The requested contract address. Passing in an `ENS`, `RNS`, `Lens Handle`, or an `Unstoppable Domain` resolves automatically.
 * @param {string} tokenId The requested token ID.
 * 
 * Query Params
 * @param {boolean} no-spam If `true`, the suspected spam tokens are removed. Supports `eth-mainnet` and `matic-mainnet`.
 */
export const getNftTransactionsForContractTokenId = ({
	chainName,
	contractAddress,
	tokenId,
	noSpam = false,
}: {
	chainName: string | number
	contractAddress: string
	tokenId: string
	noSpam?: boolean
}) => (
	get<NftTransactionsResponse>(`v1/${chainName}/tokens/${contractAddress}/nft_transactions/${tokenId}`, {
		'no-spam': noSpam,
	})
)

export type NftTransactionsResponse = {
	/** The timestamp when the response was generated. Useful to show data staleness to users. */
	updated_at: datetime,

	/** The requested chain ID eg: `1`. */
	chain_id: integer,

	/** The requested chain name eg: `eth-mainnet`. */
	chain_name: string,

	/** List of response items. */
	items: {
		/** Use contract decimals to format the token balance for display purposes - divide the balance by `10^{contract_decimals}`. */
		contract_decimals: integer,

		/** The string returned by the `name()` method. */
		contract_name: string,

		/** The ticker symbol for this contract. This field is set by a developer and non-unique across a network. */
		contract_ticker_symbol: string,

		/** Use the relevant `contract_address` to lookup prices, logos, token transfers, etc. */
		contract_address: string,

		/** A list of supported standard ERC interfaces, eg: `ERC20` and `ERC721`. */
		supports_erc: ErcInterface[] | null,

		nft_transactions: {
			/** The block signed timestamp in UTC. */
			block_signed_at: datetime,

			/** The height of the block. */
			block_height: integer,

			/** The requested transaction hash. */
			tx_hash: string,

			/** The offset is the position of the tx in the block. */
			tx_offset: integer,

			/** Whether or not transaction is successful. */
			successful: boolean,

			/** The sender's wallet address. */
			from_address: string,

			/** The label of `from` address. */
			from_address_label: string | null,

			/** The receiver's wallet address. */
			to_address: string,

			/** The label of `to` address. */
			to_address_label: string | null,

			/** The value attached to this tx. */
			value: safelong, // integer

			/** The value attached in `quote-currency` to this tx. */
			value_quote: double,

			/** A prettier version of the quote for rendering purposes. */
			pretty_value_quote: string,

			gas_offered: integer,

			/** The gas spent for this tx. */
			gas_spent: integer,

			/** The gas price at the time of this tx. */
			gas_price: integer,

			/** The transaction's `gas_price` * `gas_spent`, denoted in wei. */
			fees_paid: safelong, // string

			/** The gas spent in `quote-currency` denomination. */
			gas_quote: double,

			/** A prettier version of the quote for rendering purposes. */
			pretty_gas_quote: string,

			gas_quote_rate: double,

			/** The log events. */
			log_events: {
				/** The block signed timestamp in UTC. */
				block_signed_at: datetime,

				/** The height of the block. */
				block_height: integer,

				/** The offset is the position of the tx in the block. */
				tx_offset: integer,

				/** The offset is the position of the log entry within an event log. */
				log_offset: integer,

				/** The requested transaction hash. */
				tx_hash: string,

				/** The log topics in raw data. */
				raw_log_topics: string[],

				/** Use contract decimals to format the token balance for display purposes - divide the balance by `10^{contract_decimals}`. */
				sender_contract_decimals: integer | null,

				/** The name of the sender. */
				sender_name: string | null,

				/** The ticker symbol for this contract. This field is set by a developer and non-unique across a network. */
				sender_contract_ticker_symbol: string | null,

				/** The address of the sender. */
				sender_address: string,

				/** The label of the sender address. */
				sender_address_label: string | null,

				/** The contract logo URL. */
				sender_logo_url: string,

				/** The log events in raw. */
				raw_log_data: string | null,

				/** The decoded item. */
				decoded: {
					name: string,

					signature: string,

					params: {
						name: string,

						type: string,

						indexed: boolean,

						decoded: boolean,

						value: string,
					}[],
				} | null,
			}[],
		}[],

		/** Denotes whether the token is suspected spam. Supports `eth-mainnet` and `matic-mainnet`. */
		is_spam: boolean,
	}[]
}

/**
 * Get traits for a collection
 * @link https://www.covalenthq.com/docs/api/nft/get-list-of-traits-collection/
 * 
 * Commonly used to fetch and render the traits of a collection as seen in rarity calculators.
 * 
 * Costs: 2.00 Credits
 * Processing: Batch
 * 
 * Path Params
 * @param {string} chainName The chain name eg: `eth-mainnet`.
 * @param {string} collectionContract The requested collection address. Passing in an `ENS`, `RNS`, `Lens Handle`, or an `Unstoppable Domain` resolves automatically.
 */
export const getListOfTraitsCollection = ({
	chainName,
	collectionContract,
}: {
	chainName: string | number
	collectionContract: string
}) => (
	get<NftCollectionTraitsResponse>(`v1/${chainName}/nft/${collectionContract}/traits/`)
)

export type NftCollectionTraitsResponse = {
	/** The timestamp when the response was generated. Useful to show data staleness to users. */
	updated_at: datetime,

	/** The requested chain ID eg: `1`. */
	chain_id: integer,

	/** The requested chain name eg: `eth-mainnet`. */
	chain_name: string,

	/** List of response items. */
	items: {
		name: string,
	},
}

/**
 * Get trait summary for collection
 * @linkhttps://www.covalenthq.com/docs/api/nft/get-collection-trait-summary/
 * 
 * Commonly used to calculate rarity scores for a collection based on its traits.
 * 
 * Costs: 5.00 Credits
 * Processing: Batch
 * 
 * Path Params
 * @param {string} chainName The chain name eg: `eth-mainnet`.
 * @param {string} collectionContract The requested collection address. Passing in an `ENS`, `RNS`, `Lens Handle`, or an `Unstoppable Domain` resolves automatically.
 */
export const getCollectionTraitSummary = ({
	chainName,
	collectionContract,
}: {
	chainName: string | number
	collectionContract: string
}) => (
	get<NftCollectionTraitSummaryResponse>(`v1/${chainName}/nft/${collectionContract}/traits_summary/`)
)

export type NftCollectionTraitSummaryResponse = {
	/** The timestamp when the response was generated. Useful to show data staleness to users. */
	updated_at: datetime,

	/** List of response items. */
	items: {
		/** Trait name */
		name: string,

		/** Type of the value of the trait. */
		value_type: string,

		/** Populated for `numeric` traits. */
		value_numeric?: {
			/** Minimum value of the trait. */
			min: integer,

			/** Maximum value of the trait. */
			max: integer,
		},

		/** Populated for `string` traits. */
		value_string?: {
			/** String value */
			value: string,

			/** Number of distinct tokens that have this trait value. */
			token_count: integer,

			/** Percentage of tokens in the collection that have this trait. */
			trait_percentage: double,
		},

		attributes: {
			trait_type: string,

			values: {
				value: string,

				count: integer,
			}[],
		}[],
	}[],
}

/**
 * Get attributes for a collection trait
 * @link https://www.covalenthq.com/docs/api/nft/get-attribute-values-collection-trait/
 * 
 * Commonly used to get the count of unique values for traits within an NFT collection.
 * 
 * Costs: 2.00 Credits
 * Processing: Batch
 * 
 * Path Params
 * @param {string} chainName The chain name eg: `eth-mainnet`.
 * 
 * Query Params
 * @param {string} collectionContract The requested collection address. Passing in an `ENS`, `RNS`, `Lens Handle`, or an `Unstoppable Domain` resolves automatically.
 * @param {string} trait The requested trait.
 */
export const getAttributesForTraitInCollection = ({
	chainName,
	collectionContract,
	trait,
}: {
	chainName: string | number
	collectionContract: string
	trait: string
}) => (
	get<NftCollectionAttributesForTraitResponse>(`v1/${chainName}/nft/${collectionContract}/traits/${trait}/attributes/`)
)

export type NftCollectionAttributesForTraitResponse = {
	/** The timestamp when the response was generated. Useful to show data staleness to users. */
	updated_at: datetime,

	/** List of response items. */
	items: {
		trait_type: string,

		values: {
			value: string,

			count: integer,
		}[],
	}[],
}

/**
 * Get chain collections
 * @link https://www.covalenthq.com/docs/api/nft/get-chain-collections/
 * 
 * Commonly used to fetch the list of NFT collections with downloaded and cached off chain data like token metadata and asset files.
 * 
 * Costs: 0.01 Credits
 * Processing: Batch
 * 
 * Path Params
 * @param {string} chainName The chain name eg: `eth-mainnet`.
 * 
 * Query Params
 * @param {integer} page-size Number of items per page. Omitting this parameter defaults to 100.
 * @param {integer} page-number 0-indexed page number to begin pagination.
 * @param {boolean} no-spam If `true`, the suspected spam tokens are removed. Supports `eth-mainnet` and `matic-mainnet`.
 */
export const getChainCollections = ({
	chainName,
	pageSize = 100,
	pageNumber = 0,
	noSpam = false,
}: {
	chainName: string | number
	pageSize?: integer
	pageNumber?: integer
	noSpam?: boolean
}) => (
	get<ChainCollectionResponse>(`v1/${chainName}/nft/collections`, {
		'page-size': pageSize,
		'page-number': pageNumber,
		'no-spam': noSpam,
	})
)

export type ChainCollectionResponse = {
	/** The timestamp when the response was generated. Useful to show data staleness to users. */
	updated_at: datetime,

	/** The requested chain ID eg: `1`. */
	chain_id: integer,

	/** The requested chain name eg: `eth-mainnet`. */
	chain_name: string,

	/** List of response items. */
	items: {
		/** Use the relevant `contract_address` to lookup prices, logos, token transfers, etc. */
		contract_address: string,

		/** The string returned by the `name()` method. */
		contract_name: string,

		/** Denotes whether the token is suspected spam. Supports `eth-mainnet` and `matic-mainnet`. */
		is_spam: boolean,

		token_total_supply: integer,

		cached_metadata_count: integer,

		cached_asset_count: integer,

		last_scraped_at: datetime,
	}[],

	/** Pagination metadata. */
	pagination: {
		/** True is there is another page. */
		has_more: boolean,

		/** The requested page number. */
		page_number: integer,

		/** The requested number of items on the current page. */
		page_size: integer,

		/** The total number of items across all pages for this request. */
		total_count: integer,
	}
}


/**
 * NFT - Market Data
 */

/**
 * Get historical floor prices for a collection
 * @link https://www.covalenthq.com/docs/api/nft/get-nft-market-floor-price/
 * 
 * Commonly used to render a price floor chart for an NFT collection.
 * 
 * Costs: 2.00 Credits
 * Processing: Batch
 * 
 * Path Params
 * @param {string} chainName The chain name eg: `eth-mainnet`.
 * @param {string} contractAddress The requested contract address. Passing in an `ENS`, `RNS`, `Lens Handle`, or an `Unstoppable Domain` resolves automatically.
 * 
 * Query Params
 * @param {integer} days The number of days to return data for. Request up 365 days. Defaults to 30 days.
 * @param {string} quote-currency The currency to convert. Supports `USD`, `CAD`, `EUR`, `SGD`, `INR`, `JPY`, `VND`, `CNY`, `KRW`, `RUB`, `TRY`, `NGN`, `ARS`, `AUD`, `CHF`, and `GBP`..
 */
export const getNftMarketFloorPrice = ({
	chainName,
	contractAddress,
	days = 30,
	quoteCurrency = 'USD',
}: {
	chainName: string | number
	contractAddress: string
	days?: integer
	quoteCurrency?: string
}) => (
	get<NftMarketFloorPriceResponse>(`v1/${chainName}/nft_market/${contractAddress}/floor_price`, {
		'days': days,
		'quote-currency': quoteCurrency,
	})
)

export type NftMarketFloorPriceResponse = {
	/** The timestamp when the response was generated. Useful to show data staleness to users. */
	updated_at: datetime,

	/** The requested address. */
	address: string,

	/** The requested quote currency eg: `USD`. */
	quote_currency: string,

	/** The requested chain name eg: `eth-mainnet`. */
	chain_name: string,

	/** The requested chain ID eg: `1`. */
	chain_id: integer,

	/** List of response items. */
	items: {
		/** The timestamp of the date of sale. */
		date: datetime,

		/** The ticker symbol for the native currency. */
		native_ticker_symbol: string,

		/** The contract name of the native currency. */
		native_name: string,

		/** The current floor price in native currency. */
		floor_price_native_quote: double,

		/** The current floor price converted to fiat in `quote-currency`. */
		floor_price_quote: double,

		/** A prettier version of the floor price quote for rendering purposes. */
		pretty_floor_price_quote: string,
	}[],
}

/**
 * Get historical volume for a collection
 * @link https://www.covalenthq.com/docs/api/nft/get-nft-market-volume/
 * 
 * Commonly used to build a time-series chart of the transaction volume of an NFT collection.
 * 
 * Costs: 2.00 Credits
 * Processing: Batch
 * 	
 * Path Params
 * @param {string} chainName The chain name eg: `eth-mainnet`.
 * @param {string} contractAddress The requested contract address. Passing in an `ENS`, `RNS`, `Lens Handle`, or an `Unstoppable Domain` resolves automatically.
 * 
 * Query Params
 * @param {integer} days The number of days to return data for. Request up 365 days. Defaults to 30 days.
 * @param {string} quote-currency The currency to convert. Supports `USD`, `CAD`, `EUR`, `SGD`, `INR`, `JPY`, `VND`, `CNY`, `KRW`, `RUB`, `TRY`, `NGN`, `ARS`, `AUD`, `CHF`, and `GBP`.
 */
export const getNftMarketVolume = ({
	chainName,
	contractAddress,
	days = 30,
	quoteCurrency = 'USD',
}: {
	chainName: string | number
	contractAddress: string
	days?: integer
	quoteCurrency?: string
}) => (
	get<NftMarketVolumeResponse>(`v1/${chainName}/nft_market/${contractAddress}/volume`, {
		'days': days,
		'quote-currency': quoteCurrency,
	})
)

export type NftMarketVolumeResponse = {
	/** The timestamp when the response was generated. Useful to show data staleness to users. */
	updated_at: datetime,

	/** The requested address. */
	address: string,

	/** The requested quote currency eg: `USD`. */
	quote_currency: string,

	/** The requested chain name eg: `eth-mainnet`. */
	chain_name: string,

	/** The requested chain ID eg: `1`. */
	chain_id: integer,

	/** List of response items. */
	items: {
		/** The timestamp of the date of sale. */
		date: datetime,

		/** The ticker symbol for the native currency. */
		native_ticker_symbol: string,

		/** The contract name of the native currency. */
		native_name: string,

		/** The current volume converted to fiat in `quote-currency`. */
		volume_quote: double,

		/** The current volume in native currency. */
		volume_native_quote: double,

		/** A prettier version of the volume quote for rendering purposes. */
		pretty_volume_quote: string,
	}[],
}

/**
 * Get historical sales count for a collection
 * @link https://www.covalenthq.com/docs/api/nft/get-nft-market-sale-count/
 * 
 * Commonly used to build a time-series chart of the sales count of an NFT collection.
 * 
 * Costs: 2.00 Credits
 * Processing: Batch
 * 
 * Path Params
 * @param {string} chainName The chain name eg: `eth-mainnet`.
 * @param {string} contractAddress The requested contract address. Passing in an `ENS`, `RNS`, `Lens Handle`, or an `Unstoppable Domain` resolves automatically.
 * 
 * Query Params
 * @param {integer} days The number of days to return data for. Request up 365 days. Defaults to 30 days.
 * @param {string} quote-currency The currency to convert. Supports `USD`, `CAD`, `EUR`, `SGD`, `INR`, `JPY`, `VND`, `CNY`, `KRW`, `RUB`, `TRY`, `NGN`, `ARS`, `AUD`, `CHF`, and `GBP`.
 */
export const getNftMarketSaleCount = ({
	chainName,
	contractAddress,
	days = 30,
	quoteCurrency = 'USD',
}: {
	chainName: string | number
	contractAddress: string
	days?: integer
	quoteCurrency?: string
}) => (
	get<NftMarketSaleCountResponse>(`v1/${chainName}/nft_market/${contractAddress}/sale_count`, {
		'days': days,
		'quote-currency': quoteCurrency,
	})
)

export type NftMarketSaleCountResponse = {
	/** The timestamp when the response was generated. Useful to show data staleness to users. */
	updated_at: datetime,

	/** The requested address. */
	address: string,

	/** The requested quote currency eg: `USD`. */
	quote_currency: string,

	/** The requested chain name eg: `eth-mainnet`. */
	chain_name: string,

	/** The requested chain ID eg: `1`. */
	chain_id: integer,

	/** List of response items. */
	items: {
		/** The timestamp of the date of sale. */
		date: datetime,

		/* The total amount of sales for the current day. */
		sale_count: integer,
	}[],
}


/**
 * NFT - Ownership & Token Gating
 */

/**
 * Check ownership in NFT collection
 * @link https://www.covalenthq.com/docs/api/nft/check-ownership-in-nft-collection/
 * 
 * Commonly used to verify ownership of NFTs (including ERC-721 and ERC-1155) within a collection.
 * 
 * Costs: 1.00 Credits
 * Processing: Batch
 * 
 * Path Params
 * @param {string} chainName The chain name eg: `eth-mainnet`.
 * @param {string} walletAddress The requested address. Passing in an `ENS`, `RNS`, `Lens Handle`, or an `Unstoppable Domain` resolves automatically.
 * @param {string} collectionContract The requested collection address.
 */
export const checkOwnershipInNft = ({
	chainName,
	walletAddress,
	collectionContract,
}: {
	chainName: string | number
	walletAddress: string
	collectionContract: string
}) => (
	get<NftOwnershipForCollectionResponse>(`v1/${chainName}/address/${walletAddress}/collection/${collectionContract}/`)
)

export type NftOwnershipForCollectionResponse = {
	/** The timestamp when the response was generated. Useful to show data staleness to users. */
	updated_at: datetime,

	/** The requested address. */
	address: string,

	/** The requested collection. */
	collection: string,

	/** Denotes whether the token is suspected spam. Supports `eth-mainnet` and `matic-mainnet`. */
	is_spam: boolean,

	/** List of response items. */
	items: {
		/** The string returned by the `name()` method. */
		contract_name: string,

		/** The ticker symbol for this contract. This field is set by a developer and non-unique across a network. */
		contract_ticker_symbol: string,

		/** Use the relevant `contract_address` to lookup prices, logos, token transfers, etc. */
		contract_address: string,

		/** The token's id. */
		token_id: string,

		/** A list of supported standard ERC interfaces, eg: `ERC20` and `ERC721`. */
		supports_erc: ErcInterface[] | null,

		last_transfered_at: datetime,

		/** Nft balance. */
		balance: safelong, // integer

		balance24h: safelong, // integer

		type: string,

		nft_data: NftWithMetadata,
	}[],
}

/**
 * Check ownership in NFT collection for specific token
 * @link https://www.covalenthq.com/docs/api/nft/check-ownership-in-nft-collection-token/
 * 
 * Commonly used to verify ownership of a specific token (ERC-721 or ERC-1155) within a collection.
 * 
 * Costs: 1.00 Credits
 * Processing: Batch
 * 
 * Path Params
 * @param {string} chainName The chain name eg: `eth-mainnet`.
 * @param {string} walletAddress The requested address. Passing in an `ENS`, `RNS`, `Lens Handle`, or an `Unstoppable Domain` resolves automatically.
 * @param {string} collectionContract The requested collection address. Passing in an `ENS`, `RNS`, `Lens Handle`, or an `Unstoppable Domain` resolves automatically.
 * @param {string} tokenId The requested token ID.
 */
export const checkOwnershipForNft = ({
	chainName,
	walletAddress,
	collectionContract,
	tokenId,
}: {
	chainName: string | number
	walletAddress: string
	collectionContract: string
	tokenId: string
}) => (
	get<NftOwnershipForCollectionResponse>(`v1/${chainName}/address/${walletAddress}/collection/${collectionContract}/token/${tokenId}/`)
)


/**
 * Transactions
 */

export type Transaction = {
	/** The block signed timestamp in UTC. */
	block_signed_at: datetime,

	/** The height of the block. */
	block_height: integer,

	/** The hash of the block. Use it to remove transactions from re-org-ed blocks. */
	block_hash: string,

	/** The requested transaction hash. */
	tx_hash: string,

	/** The offset is the position of the tx in the block. */
	tx_offset: integer,

	/** Indicates whether a transaction failed or succeeded. */
	successful: boolean,

	/** The sender's wallet address. */
	from_address: string,

	/** The address of the miner. */
	miner_address: string | null,

	/** The label of from address. */
	from_address_label: string | null,

	/** The receiver's wallet address. */
	to_address: string,

	/** The label of to address. */
	to_address_label: string | null,

	/** The value attached to this tx. */
	value: safelong, // string,

	/** The value attached in `quote-currency` to this tx. */
	value_quote: double | null,

	/** A prettier version of the quote for rendering purposes. */
	pretty_value_quote: string | null,

	/** The requested chain native gas token metadata. */
	gas_metadata: {
		/** Use contract decimals to format the token balance for display purposes - divide the balance by `10^{contract_decimals}`. */
		contract_decimals: integer,

		/** The string returned by the `name()` method. */
		contract_name: string,

		/** The ticker symbol for this contract. This field is set by a developer and non-unique across a network. */
		contract_ticker_symbol: string,

		/** Use the relevant `contract_address` to lookup prices, logos, token transfers, etc. */
		contract_address: string,

		/** A list of supported standard ERC interfaces, eg: `ERC20` and `ERC721`. */
		supports_erc: ErcInterface[] | null,

		/** The contract logo URL. */
		logo_url: string,
	} | null,

	gas_offered: integer, // string

	/** The gas spent for this tx. */
	gas_spent: integer, // string

	/** The gas price at the time of this tx. */
	gas_price: integer, // string

	/** The total transaction fees (`gas_price` * `gas_spent`) paid for this tx, denoted in wei. */
	fees_paid: safelong, // string

	/** The gas spent in quote-currency denomination. */
	gas_quote: double | null,

	/** A prettier version of the quote for rendering purposes. */
	pretty_gas_quote: string | null,

	/** The native gas exchange rate for the requested `quote-currency`. */
	gas_quote_rate: double | null,

	/** The explorer links for this transaction. */
	explorers: {
		/** The name of the explorer. */
		label: string | null,

		/** The URL of the explorer. */
		url: string,
	}[],

	/** The details for the dex transaction. */
	dex_details?: {
		/** The offset is the position of the log entry within an event log. */
		log_offset: integer,

		/** Stores the name of the protocol that facilitated the event. */
		protocol_name: string,

		/** Stores the contract address of the protocol that facilitated the event. */
		protocol_address: string,

		/** The protocol logo URL. */
		protocol_logo_url: string,

		/** Stores the aggregator responsible for the event. */
		aggregator_name: string,

		/** Stores the contract address of the aggregator responsible for the event. */
		aggregator_address: string,

		/** DEXs often have multiple version - e.g Uniswap V1, V2 and V3. The `version` field allows you to look at a specific version of the DEX. */
		version: integer,

		/** Similarly to the `version` field, `fork_version` gives you the version of the forked DEX. For example, most DEXs are a fork of Uniswap V2; therefore, `fork` = `aave` & `fork_version` = `2` */
		fork_version: integer,

		/** Many DEXs are a fork of an already established DEX. The fork field allows you to see which DEX has been forked. */
		fork: string,

		/** Stores the event taking place - e.g `swap`, `add_liquidity` and `remove_liquidity`. */
		event: string,

		/** Stores the address of the pair that the user interacts with. */
		pair_address: string,

		pair_lp_fee_bps: double,

		lp_token_address: string,

		lp_token_ticker: string,

		lp_token_num_decimals: integer,

		lp_token_name: string,

		lp_token_value: double,

		exchange_rate_usd: double,

		/** Stores the address of token 0 in the specific pair. */
		token_0_address: string,

		/** Stores the ticker symbol of token 0 in the specific pair. */
		token_0_ticker: string,

		/** Stores the number of contract decimals of token 0 in the specific pair. */
		token_0_num_decimals: integer,

		/** Stores the contract name of token 0 in the specific pair. */
		token_0_name: string,

		/** Stores the address of token 1 in the specific pair. */
		token_1_address: string,

		/** Stores the ticker symbol of token 1 in the specific pair. */
		token_1_ticker: string,

		/** Stores the number of contract decimals of token 1 in the specific pair. */
		token_1_num_decimals: integer,

		/** Stores the contract name of token 1 in the specific pair. */
		token_1_name: string,

		/** Stores the amount of token 0 used in the transaction. For example, 1 ETH, 100 USDC, 30 UNI, etc. */
		token_0_amount: double,

		token_0_quote_rate: double,

		token_0_usd_quote: double,

		pretty_token_0_usd_quote: string,

		token_0_logo_url: string,

		/** Stores the amount of token 1 used in the transaction. For example, 1 ETH, 100 USDC, 30 UNI, etc. */
		token_1_amount: double,

		token_1_quote_rate: double,

		token_1_usd_quote: double,

		pretty_token_1_usd_quote: string,

		token_1_logo_url: string,

		/** Stores the wallet address that initiated the transaction (i.e the wallet paying the gas fee). */
		sender: string,

		/** Stores the recipient of the transaction - recipients can be other wallets or smart contracts. For example, if you want to Swap tokens on Uniswap, the Uniswap router would typically be the recipient of the transaction. */
		recipient: string,
	},

	/** The details for the NFT sale transaction. */
	nft_sale_details?: {
		/** The offset is the position of the log entry within an event log. */
		log_offset: integer,

		/** Stores the topic event hash. All events have a unique topic event hash. */
		topic0: string,

		/** Stores the contract address of the protocol that facilitated the event. */
		protocol_contract_address: string,

		/** Stores the name of the protocol that facilitated the event. */
		protocol_name: string,

		/** The protocol logo URL. */
		protocol_logo_url: string,

		/** Stores the address of the transaction recipient. */
		to:	string,

		/** Stores the address of the transaction sender. */
		from: string,

		/** Stores the address selling the NFT. */
		maker: string,

		/** Stores the address buying the NFT. */
		taker: string,

		/** Stores the NFTs token ID. All NFTs have a token ID. Within a collection, these token IDs are unique. If the NFT is transferred to another owner, the token id remains the same, as this number is its identifier within a collection. For example, if a collection has 10K NFTs then an NFT in that collection can have a token ID from 1-10K. */
		token_id: double,

		/** Stores the address of the collection. For example, Bored Ape Yacht Club */
		collection_address: string,

		/** Stores the name of the collection. */
		collection_name: string,

		/** Stores the address of the token used to purchase the NFT. */
		token_address: string,

		/** Stores the name of the token used to purchase the NFT. */
		token_name: string,

		/** Stores the ticker symbol of the token used to purchase the NFT. */
		ticker_symbol: string,

		/** Stores the number decimal of the token used to purchase the NFT. */
		num_decimals: integer,

		contract_quote_rate: double,

		/** The token amount used to purchase the NFT. For example, if the user purchased an NFT for 1 ETH. The nft_token_price field will hold 1. */
		nft_token_price: double,

		/** The USD amount used to purchase the NFT. */
		nft_token_price_usd: double,

		pretty_nft_token_price_usd: string,

		/** The price of the NFT denominated in the chains native token. Even if a seller sells their NFT for DAI or MANA, this field denominates the price in the native token (e.g. ETH, AVAX, FTM, etc.) */
		nft_token_price_native: double,

		pretty_nft_token_price_native: string,

		/** Stores the number of NFTs involved in the sale. It's quick routine to see multiple NFTs involved in a single sale. */
		token_count: integer,

		num_token_ids_sold_per_sale: integer,

		num_token_ids_sold_per_tx: integer,

		num_collections_sold_per_sale: integer,

		num_collections_sold_per_tx: integer,

		trade_type: string,

		trade_group_type: string,
	},

	/** The details for the lending protocol transaction. */
	lending_details?: {
		/** The offset is the position of the log entry within an event log. */
		log_offset: integer,

		/** Stores the name of the lending protocol that facilitated the event. */
		protocol_name: string,

		/** Stores the contract address of the lending protocol that facilitated the event. */
		protocol_address: string,

		/** The protocol logo URL. */
		protocol_logo_url: string,

		/** Lending protocols often have multiple version (e.g. Aave V1, V2 and V3). The `version` field allows you to look at a specific version of the Lending protocol. */
		version: string,

		/** Many lending protocols are a fork of an already established protocol. The fork column allows you to see which lending protocol has been forked. */
		fork: string,

		/** Similarly to the `version` column, `fork_version` gives you the version of the forked lending protocol. For example, most lending protocols in the space are a fork of Aave V2; therefore, `fork` = `aave` & `fork_version` = `2` */
		fork_version: string,

		/** Stores the event taking place - e.g `borrow`, `deposit`, `liquidation`, 'repay' and 'withdraw'. */
		event: string,

		/** Stores the name of the LP token issued by the lending protocol. LP tokens can be debt or interest bearing tokens. */
		lp_token_name: string,

		/** Stores the number decimal of the LP token. */
		lp_decimals: integer,

		/** Stores the ticker symbol of the LP token. */
		lp_ticker_symbol: string,

		/** Stores the token address of the LP token. */
		lp_token_address: string,

		/** Stores the amount of LP token used in the event (e.g. 1 aETH, 100 cUSDC, etc). */
		lp_token_amount: double,

		/** Stores the total USD amount of all the LP Token used in the event. */
		lp_token_price: double,

		/** Stores the exchange rate between the LP and underlying token. */
		exchange_rate: double,

		/** Stores the USD price of the LP Token used in the event. */
		exchange_rate_usd: double,

		/** Stores the name of the token going into the lending protocol (e.g the token getting deposited). */
		token_name_in: string,

		/** Stores the number decimal of the token going into the lending protocol. */
		token_decimal_in: integer,

		/** Stores the address of the token going into the lending protocol. */
		token_address_in: string,

		/** Stores the ticker symbol of the token going into the lending protocol. */
		token_ticker_in: string,

		/** Stores the logo URL of the token going into the lending protocol. */
		token_logo_in: string,

		/** Stores the amount of tokens going into the lending protocol (e.g 1 ETH, 100 USDC, etc). */
		token_amount_in: double,

		/** Stores the total USD amount of all tokens going into the lending protocol. */
		amount_in_usd: double,

		pretty_amount_in_usd: string,

		/** Stores the name of the token going out of the lending protocol (e.g the token getting deposited). */
		token_name_out: string,

		/** Stores the number decimal of the token going out of the lending protocol. */
		token_decimals_out: integer,

		/** Stores the address of the token going out of the lending protocol. */
		token_address_out: string,

		/** Stores the ticker symbol of the token going out of the lending protocol. */
		token_ticker_out: string,

		/** Stores the logo URL of the token going out of the lending protocol. */
		token_logo_out: string,

		/** Stores the amount of tokens going out of the lending protocol (e.g 1 ETH, 100 USDC, etc). */
		token_amount_out: double,

		/** Stores the total USD amount of all tokens going out of the lending protocol. */
		amount_out_usd: double,

		pretty_amount_out_usd: string,

		/** Stores the type of loan the user is taking out. Lending protocols enable you to take out a stable or variable loan. Only relevant to borrow events. */
		borrow_rate_mode: string,

		/** Stores the interest rate of the loan. Only relevant to borrow events. */
		borrow_rate: double,

		on_behalf_of: string,

		/** Stores the wallet address liquidating the loan. Only relevant to liquidation events. */
		liquidator: string,

		/** Stores the wallet address of the user initiating the event. */
		user: string,
	},

	/** The log events. */
	log_events: {
		/** The block signed timestamp in UTC. */
		block_signed_at: datetime,

		/** The height of the block. */
		block_height: integer,

		/** The offset is the position of the tx in the block. */
		tx_offset: integer,

		/** The offset is the position of the log entry within an event log. */
		log_offset: integer,

		/** The requested transaction hash. */
		tx_hash: string,

		/** The log topics in raw data. */
		raw_log_topics: string[],

		/** Use contract decimals to format the token balance for display purposes - divide the balance by 10^{contract_decimals}. */
		sender_contract_decimals: integer | null, 

		/** The name of the sender. */
		sender_name: string | null,

		sender_contract_ticker_symbol: string | null,

		/** The address of the sender. */
		sender_address: string,

		/** The label of the sender address. */
		sender_address_label: string | null,

		/** The contract logo URL. */
		sender_logo_url: string,

		/** The log events in raw. */
		raw_log_data: string | null,

		/** The decoded item. */
		decoded: {
			name: string,

			signature: string,

			params: {
				name: string,

				type: string,

				indexed: boolean,

				decoded: boolean,

				value: string,
			}[]
		} | null,
	}[],

	/** The details related to the safe transaction. */
	safe_details: {
		/** The address that signed the safe transaction. */
		owner_address: string,

		/** The signature of the owner for the safe transaction. */
		signature: string,

		/** The type of safe signature used. */
		signature_type: string,
	},
}

/**
 * Get a transaction
 * @link https://www.covalenthq.com/docs/api/transactions/get-a-transaction/
 * 
 * Commonly used to fetch and render a single transaction including its decoded log events. Additionally return semantically decoded information for DEX trades, lending and NFT sales.
 * 
 * Costs: 0.10 Credits
 * Processing: Realtime
 * 
 * > Enriched data when using `with-dex`, `with-lending` and `with-nft-sales` is currently behind by ~40mins.
 *   Safe data for L2 chains is currently available by using `with-safe`. L1 data is coming soon.
 * 
 * Path Params
 * @param {string} chainName The chain name eg: `eth-mainnet`.
 * @param {string} txHash The transaction hash.
 * 
 * Query Params
 * @param {string} quote-currency The currency to convert. Supports `USD`, `CAD`, `EUR`, `SGD`, `INR`, `JPY`, `VND`, `CNY`, `KRW`, `RUB`, `TRY`, `NGN`, `ARS`, `AUD`, `CHF`, and `GBP`.
 * @param {boolean} no-logs Omit log events.
 * @param {boolean} with-dex Decoded DEX details including protocol (e.g. Uniswap), event (e.g 'add_liquidity') and tokens involved with historical prices. Additional 0.05 credits charged if data available.
 * @param {boolean} with-nft-sales Decoded NFT sales details including marketplace (e.g. Opensea) and cached media links. Additional 0.05 credits charged if data available.
 * @param {boolean} with-lending Decoded lending details including protocol (e.g. Aave), event (e.g. 'deposit') and tokens involved with prices. Additional 0.05 credits charged if data available.
 * @param {boolean} with-safe Include safe details.
 */
export const getTransaction = ({
	chainName,
	txHash,
	quoteCurrency = 'USD',
	noLogs = false,
	// withDex = false,
	withNftSales = false,
	// withLending = false,
	withSafe = false,
}: {
	chainName: string | number
	txHash: string
	quoteCurrency?: string
	noLogs?: boolean
	// withDex?: boolean
	withNftSales?: boolean
	// withLending?: boolean
	withSafe?: boolean
}) => (
	get<
		TransactionResponse
	>(
		`v1/${chainName}/transaction_v2/${txHash}`,
		{
			'quote-currency': quoteCurrency,
			'no-logs': noLogs,
			// 'with-dex': withDex,
			'with-nft-sales': withNftSales,
			// 'with-lending': withLending,
			'with-safe': withSafe,
		},
	)
)

export type TransactionResponse = {
	/** The timestamp when the response was generated. Useful to show data staleness to users. */
	updated_at: datetime,

	/** The requested chain ID eg: `1`. */
	chain_id: integer,

	/** The requested chain name eg: `eth-mainnet`. */
	chain_name: string,

	/** List of response items. */
	items: Transaction[],
}

/**
 * Get transaction summary for address
 * @link https://www.covalenthq.com/docs/api/transactions/get-transaction-summary-for-address/
 * 
 * Commonly used to fetch the earliest and latest transactions, and the transaction count for a wallet. Calculate the age of the wallet and the time it has been idle and quickly gain insights into their engagement with web3.
 * 
 * Costs: 1.00 Credits
 * Processing: Batch
 * 
 * Path Params
 * @param {string} chainName The chain name eg: `eth-mainnet`.
 * @param {string} walletAddress The requested address. Passing in an `ENS`, `RNS`, `Lens Handle`, or an `Unstoppable Domain` resolves automatically.
 * 
 * Query Params
 * @param {string} quote-currency The currency to convert. Supports `USD`, `CAD`, `EUR`, `SGD`, `INR`, `JPY`, `VND`, `CNY`, `KRW`, `RUB`, `TRY`, `NGN`, `ARS`, `AUD`, `CHF`, and `GBP`.
 * @param {boolean} no-logs Omit log events.
 * @param {boolean} with-safe Include safe details.
 */
export const getTransactionSummaryForAddress = ({
	chainName,
	walletAddress,
	quoteCurrency = 'USD',
	noLogs = false,
	withSafe = false,
}: {
	chainName: string | number
	walletAddress: string
	quoteCurrency?: string
	noLogs?: boolean
	withSafe?: boolean
}) => (
	get<TransactionsSummaryResponse>(`v1/${chainName}/address/${walletAddress}/transactions_summary`, {
		'quote-currency': quoteCurrency,
		'no-logs': noLogs,
		'with-safe': withSafe,
	})
)

export type TransactionsSummaryResponse = {
	/** The timestamp when the response was generated. Useful to show data staleness to users. */
	updated_at: datetime,

	/** The requested address. */
	address: string,

	/** The requested chain ID eg: `1`. */
	chain_id: integer,

	/** The requested chain name eg: `eth-mainnet`. */
	chain_name: string,

	/** List of response items. */
	items: {
		/** The total number of transactions. */
		total_count: integer,

		/** The earliest transaction detected. */
		earliest_transaction: {
			/** The block signed timestamp in UTC. */
			block_signed_at: datetime,

			/** The requested transaction hash. */
			tx_hash: string,

			/** The link to the transaction details using the Covalent API. */
			tx_detail_link: string,
		},

		/** The latest transaction detected. */
		latest_transaction: {
			/** The block signed timestamp in UTC. */
			block_signed_at: datetime,

			/** The requested transaction hash. */
			tx_hash: string,

			/** The link to the transaction details using the Covalent API. */
			tx_detail_link: string,
		},
	}[],
}

/**
 * Get earliest transactions for address (v3)
 * https://www.covalenthq.com/docs/api/transactions/get-earliest-transactions-for-address-v3/
 * 
 * Commonly used to fetch and render the earliest transactions involving an address. Frequently seen in wallet applications.
 * 
 * Costs: 0.10 Credits per item
 * Processing: Realtime
 * 
 * Path Params
 * @param {string} chainName The chain name eg: `eth-mainnet`.
 * @param {string} walletAddress The requested address. Passing in an `ENS`, `RNS`, `Lens Handle`, or an `Unstoppable Domain` resolves automatically.
 * 
 * Query Params
 * @param {string} quote-currency The currency to convert. Supports `USD`, `CAD`, `EUR`, `SGD`, `INR`, `JPY`, `VND`, `CNY`, `KRW`, `RUB`, `TRY`, `NGN`, `ARS`, `AUD`, `CHF`, and `GBP`.
 * @param {boolean} no-logs Omit log events.
 * @param {boolean} with-safe Include safe details.
 */
export const getEarliestTransactionsForAddress = ({
	chainName,
	walletAddress,
	quoteCurrency = 'USD',
	noLogs = false,
	withSafe = false,
}: {
	chainName: string | number
	walletAddress: string
	quoteCurrency?: string
	noLogs?: boolean
	withSafe?: boolean
}) => (
	get<TransactionsTimeBucketResponse>(`v1/${chainName}/bulk/transactions/${walletAddress}`, {
		'quote-currency': quoteCurrency,
		'no-logs': noLogs,
		'with-safe': withSafe,
	})
)

export type TransactionsTimeBucketResponse = {
	/** The requested address. */
	address: string,

	/** The timestamp when the response was generated. Useful to show data staleness to users. */
	updated_at: datetime,

	/** DEPRECATED */
	next_update_at: datetime,

	/** The requested quote currency eg: `USD`. */
	quote_currency: string,

	/** The requested chain ID eg: `1`. */
	chain_id: integer,

	/** The requested chain name eg: `eth-mainnet`. */
	chain_name: string,

	complete: boolean,

	/** The current bucket of the response. */
	current_bucket: integer,

	links: {
		/** URL link to the next page. */
		prev: string | null,

		/** URL link to the previous page. */
		next: string | null,
	},

	/** List of response items. */
	items: Transaction[],
}

/**
 * Get recent transactions for address (v3)
 * @link https://www.covalenthq.com/docs/api/transactions/get-recent-transactions-for-address-v3/
 * 
 * Commonly used to fetch and render the most recent transactions involving an address. Frequently seen in wallet applications.
 * 
 * > Safe data for L2 chains is currently available by using `with-safe`. L1 data is coming soon.
 * 
 * Costs: 0.10 Credits per item
 * Processing: Realtime
 * 
 * Path Params
 * @param {string} chainName The chain name eg: `eth-mainnet`.
 * @param {string} walletAddress The requested address. Passing in an `ENS`, `RNS`, `Lens Handle`, or an `Unstoppable Domain` resolves automatically.
 * 
 * Query Params
 * @param {string} quote-currency The currency to convert. Supports `USD`, `CAD`, `EUR`, `SGD`, `INR`, `JPY`, `VND`, `CNY`, `KRW`, `RUB`, `TRY`, `NGN`, `ARS`, `AUD`, `CHF`, and `GBP`.
 * @param {boolean} no-logs Omit log events.
 * @param {boolean} block-signed-at-asc Sort the transactions in ascending chronological order. By default, it's set to `false` and returns transactions in descending chronological order.
 * @param {boolean} with-safe Include safe details.
 */
export const getRecentTransactionsForAddress = ({
	chainName,
	walletAddress,
	quoteCurrency = 'USD',
	noLogs = false,
	blockSignedAtAsc = false,
	withSafe = false,
}: {
	chainName: string | number
	walletAddress: string
	quoteCurrency?: string
	noLogs?: boolean
	blockSignedAtAsc?: boolean
	withSafe?: boolean
}) => (
	get<RecentTransactionsResponse>(`v1/${chainName}/address/${walletAddress}/transactions_v3`, {
		'quote-currency': quoteCurrency,
		'no-logs': noLogs,
		'block-signed-at-asc': blockSignedAtAsc,
		'with-safe': withSafe,
	})
)

export type RecentTransactionsResponse	= {
	/** The requested address. */
	address: string,

	/** The timestamp when the response was generated. Useful to show data staleness to users. */
	updated_at: datetime,

	/** DEPRECATED */
	next_update_at: datetime,

	/** The requested quote currency eg: `USD`. */
	quote_currency: string,

	/** The requested chain ID eg: `1`. */
	chain_id: integer,

	/** The requested chain name eg: `eth-mainnet`. */
	chain_name: string,

	/** The current page of the response. */
	current_page: integer,

	links: {
		/** URL link to the next page. */
		prev: string | null,

		/** URL link to the previous page. */
		next: string | null,
	},

	/** List of response items. */
	items: Transaction[],
}

/**
 * Get paginated transactions for address (v3)
 * @link https://www.covalenthq.com/docs/api/transactions/get-paginated-transactions-for-address-v3/
 * 
 * Commonly used to fetch the transactions involving an address including the decoded log events in a paginated fashion.
 * 
 * Costs: 0.10 Credits per item
 * Processing: Realtime
 * 
 * > This endpoint returns paginated transactions, starting with the earliest transactions on page 0. For the most recent transactions, refer to the Get recent transactions for address (v3) endpoint.
 *   Safe data for L2 chains is currently available by using `with-safe`. L1 data is coming soon.
 * 
 * Path Params
 * @param {string} chainName The chain name eg: `eth-mainnet`.
 * @param {string} walletAddress The requested address. Passing in an `ENS`, `RNS`, `Lens Handle`, or an `Unstoppable Domain` resolves automatically.
 * @param {integer} page The requested page, 0-indexed.
 * 
 * Query Params
 * @param {string} quote-currency The currency to convert. Supports `USD`, `CAD`, `EUR`, `SGD`, `INR`, `JPY`, `VND`, `CNY`, `KRW`, `RUB`, `TRY`, `NGN`, `ARS`, `AUD`, `CHF`, and `GBP`.
 * @param {boolean} no-logs Omit log events.
 * @param {boolean} block-signed-at-asc Sort the transactions in ascending chronological order. By default, it's set to `false` and returns transactions in descending chronological order.
 * @param {boolean} with-safe Include safe details.
 */
export const getPaginatedTransactionsForAddress = ({
	chainName,
	walletAddress,
	page = 0,
	quoteCurrency = 'USD',
	noLogs = false,
	blockSignedAtAsc = false,
	withSafe = false,
}: {
	chainName: string | number
	walletAddress: string
	page: integer
	quoteCurrency?: string
	noLogs?: boolean
	blockSignedAtAsc?: boolean
	withSafe?: boolean
}) => (
	get<TransactionsPageResponse>(`v1/${chainName}/address/${walletAddress}/transactions_v3/page/${page}`, {
		'quote-currency': quoteCurrency,
		'no-logs': noLogs,
		'block-signed-at-asc': blockSignedAtAsc,
		'with-safe': withSafe,
	})
)

export type TransactionsPageResponse = {
	/** The requested address. */
	address: string,

	/** The timestamp when the response was generated. Useful to show data staleness to users. */
	updated_at: datetime,

	/** DEPRECATED */
	next_update_at: datetime,

	/** The requested quote currency eg: `USD`. */
	quote_currency: string,

	/** The requested chain ID eg: `1`. */
	chain_id: integer,

	/** The requested chain name eg: `eth-mainnet`. */
	chain_name: string,

	/** The current page of the response. */
	current_page: integer,

	links: {
		/** URL link to the next page. */
		prev: string | null,

		/** URL link to the previous page. */
		next: string | null,
	},

	/** List of response items. */
	items: Transaction[],
}

/**
 * Get bulk time bucket transactions for address (v3)
 * @link https://www.covalenthq.com/docs/api/transactions/get-time-bucket-transactions-for-address-v3/
 * 
 * Commonly used to fetch all transactions including their decoded log events in a 15-minute time bucket interval.
 * 
 * Costs: 0.10 Credits per item
 * Processing: Realtime
 * 
 * > Safe data for L2 chains is currently available by using `with-safe`. L1 data is coming soon.
 * 
 * Path Params
 * @param {string} chainName The chain name eg: `eth-mainnet`.
 * @param {string} walletAddress The requested address. Passing in an `ENS`, `RNS`, `Lens Handle`, or an `Unstoppable Domain` resolves automatically.
 * @param {integer} timeBucket The 0-indexed 15-minute time bucket. E.g. 27 Feb 2023 05:23 GMT = 1677475383 (Unix time). 1677475383/900=1863861 timeBucket.
 * @param {string} quote-currency The currency to convert. Supports `USD`, `CAD`, `EUR`, `SGD`, `INR`, `JPY`, `VND`, `CNY`, `KRW`, `RUB`, `TRY`, `NGN`, `ARS`, `AUD`, `CHF`, and `GBP`.
 * @param {boolean} no-logs Omit log events.
 * @param {boolean} with-safe Include safe details.
 */
export const getBulkTimeBucketTransactionsForAddress = ({
	chainName,
	walletAddress,
	timeBucket,
	quoteCurrency = 'USD',
	noLogs = false,
	withSafe = false,
}: {
	chainName: string | number
	walletAddress: string
	timeBucket: integer
	quoteCurrency?: string
	noLogs?: boolean
	withSafe?: boolean
}) => (
	get<TransactionsTimeBucketResponse>(`v1/${chainName}/bulk/transactions/${walletAddress}/${timeBucket}`, {
		'quote-currency': quoteCurrency,
		'no-logs': noLogs,
		'with-safe': withSafe,
	})
)

/**
 * Get all transactions in a block (v3)
 * @link https://www.covalenthq.com/docs/api/transactions/get-all-transactions-in-a-block/
 * 
 * Commonly used to fetch all transactions including their decoded log events in a block and further flag interesting wallets or transactions.
 * 
 * Costs: 0.10 Credits per item
 * Processing: Realtime
 * 
 * Path Params
 * @param {string} chainName The chain name eg: `eth-mainnet`.
 * @param {string} blockHeight The requested block height.
 * 
 * Query Params
 * @param {string} quote-currency The currency to convert. Supports `USD`, `CAD`, `EUR`, `SGD`, `INR`, `JPY`, `VND`, `CNY`, `KRW`, `RUB`, `TRY`, `NGN`, `ARS`, `AUD`, `CHF`, and `GBP`.
 * @param {boolean} no-logs Omit log events.
 * @param {boolean} with-safe Include safe details.
 */
export const getAllTransactionsInABlock = ({
	chainName,
	blockHeight,
	quoteCurrency = 'USD',
	noLogs = false,
	withSafe = false,
}: {
	chainName: string | number
	blockHeight: integer | `0x${string}` | 'earliest' | 'latest'
	quoteCurrency?: string
	noLogs?: boolean
	withSafe?: boolean
}) => (
	get<TransactionsBlockResponse>(`v1/${chainName}/block/${blockHeight}/transactions_v3`, {
		'quote-currency': quoteCurrency,
		'no-logs': noLogs,
		'with-safe': withSafe,
	})
)

export type TransactionsBlockResponse = {
	/** The timestamp when the response was generated. Useful to show data staleness to users. */
	updated_at: datetime,

	/** The requested chain ID eg: `1`. */
	chain_id: integer,

	/** The requested chain name eg: `eth-mainnet`. */
	chain_name: string,

	/** List of response items. */
	items: Transaction[],
}

/**
 * Get all transactions in a block by page (v3)
 * @link https://www.covalenthq.com/docs/api/transactions/get-all-transactions-in-a-block-by-page/
 * 
 * Commonly used to fetch all transactions including their decoded log events in a block and further flag interesting wallets or transactions.
 * 
 * Costs: 0.10 Credits per item
 * Processing: Realtime
 * 
 * Path Params
 * @param {string} chainName The chain name eg: `eth-mainnet`.
 * @param {string} blockHeight The requested block height. Also accepts `latest` to get latest block.
 * @param {integer} page The requested 0-indexed page number.
 * 
 * Query Params
 * @param {string} quote-currency The currency to convert. Supports `USD`, `CAD`, `EUR`, `SGD`, `INR`, `JPY`, `VND`, `CNY`, `KRW`, `RUB`, `TRY`, `NGN`, `ARS`, `AUD`, `CHF`, and `GBP`.
 * @param {boolean} no-logs Omit log events.
 * @param {boolean} with-safe Include safe details.
 */
export const getAllTransactionsInABlockByPage = ({
	chainName,
	blockHeight,
	page = 0,
	quoteCurrency = 'USD',
	noLogs = false,
	withSafe = false,
}: {
	chainName: string | number
	blockHeight: integer | `0x${string}` | 'earliest' | 'latest'
	page: integer
	quoteCurrency?: string
	noLogs?: boolean
	withSafe?: boolean
}) => (
	get<TransactionsBlockPageResponse>(`v1/${chainName}/block/${blockHeight}/transactions_v3/page/${page}`, {
		'quote-currency': quoteCurrency,
		'no-logs': noLogs,
		'with-safe': withSafe,
	})
)

export type TransactionsBlockPageResponse = {
	/** The timestamp when the response was generated. Useful to show data staleness to users. */
	updated_at: datetime,

	/** The requested chain ID eg: `1`. */
	chain_id: integer,

	/** The requested chain name eg: `eth-mainnet`. */
	chain_name: string,

	links: {
		/** URL link to the next page. */
		prev: string | null,

		/** URL link to the previous page. */
		next: string | null,
	},

	/** List of response items. */
	items: Transaction[],
}


/**
 * Security
 */

/**
 * Get token approvals for address
 * @link https://www.covalenthq.com/docs/api/security/get-token-approvals-for-address/
 * 
 * Commonly used to get a list of approvals across all token contracts categorized by spenders for a wallet’s assets.
 * 
 * Costs: 2.00 Credits
 * Processing: Realtime
 * 
 * Path Params
 * @param {string} chainName The chain name eg: `eth-mainnet`.
 * @param {string} walletAddress The requested address. Passing in an `ENS`, `RNS`, `Lens Handle`, or an `Unstoppable Domain` resolves automatically.
 */
export const getTokenApprovalsForAddress = ({
	chainName,
	walletAddress,
}: {
	chainName: string | number
	walletAddress: string
}) => (
	get<ApprovalsResponse>(`v1/${chainName}/approvals/${walletAddress}/`)
)

export type ApprovalsResponse = {
	/** The requested address. */
	address: string,

	/** The timestamp when the response was generated. Useful to show data staleness to users. */
	updated_at: datetime,

	/** The requested quote currency eg: `USD`. */
	quote_currency: string,

	/** The requested chain ID eg: `1`. */
	chain_id: integer,

	/** The requested chain name eg: `eth-mainnet`. */
	chain_name: string,

	/** List of response items. */
	items: {
		/** The address for the token that has approvals. */
		token_address: string,

		/** The name for the token that has approvals. */
		token_address_label: string | null,

		/** The ticker symbol for this contract. This field is set by a developer and non-unique across a network. */
		ticker_symbol: string | null,

		/** Use contract decimals to format the token balance for display purposes - divide the balance by `10^{contract_decimals}`. */
		contract_decimals: integer | null,

		/** The contract logo URL. */
		logo_url: string,

		/** The exchange rate for the requested quote currency. */
		quote_rate: double | null,

		/** Wallet balance of the token. */
		balance: safelong, // integer

		/** Value of the wallet balance of the token. */
		balance_quote: double | null,

		/** A prettier version of the quote for rendering purposes. */
		pretty_balance_quote: string | null,

		/** Total amount at risk across all spenders. */
		value_at_risk: integer,

		/** Value of total amount at risk across all spenders. */
		value_at_risk_quote: double | null,

		/** A prettier version of the quote for rendering purposes. */
		pretty_value_at_risk_quote: string | null,

		/** Contracts with non-zero approvals for this token. */
		spenders: {
			/** The height of the block. */
			block_height: integer,

			/** The offset is the position of the tx in the block. */
			tx_offset: integer,

			/** The offset is the position of the log entry within an event log. */
			log_offset: integer,

			/** The block signed timestamp in UTC. */
			block_signed_at: datetime,

			/** Most recent transaction that updated approval amounts for the token. */
			tx_hash: string,

			/** Address of the contract with approval for the token. */
			spender_address: string,

			/** Name of the contract with approval for the token. */
			spender_address_label: string | null,

			/** Remaining number of tokens granted to the spender by the approval. */
			allowance: 'UNLIMITED' | safelong, // string

			/** Value of the remaining allowance specified by the approval. */
			allowance_quote: double | null,

			/** A prettier version of the quote for rendering purposes. */
			pretty_allowance_quote: string | null,

			/** Amount at risk for spender. */
			value_at_risk: safelong, // integer

			/** Value of amount at risk for spender. */
			value_at_risk_quote: double | null,

			/** A prettier version of the quote for rendering purposes. */
			pretty_value_at_risk_quote: string | null,

			/** The risk factor. */
			risk_factor: 'LOW RISK' | 'CONSIDER REVOKING' | 'HIGH RISK, REVOKE NOW' | null // double
		}[],
	}[],
}

/**
 * Get NFT approvals for address
 * @link https://www.covalenthq.com/docs/api/security/get-nft-approvals/
 * 
 * Commonly used to get a list of NFT approvals across all token contracts categorized by spenders for a wallet’s assets.
 * 
 * Costs: 2.00 Credits
 * Processing: Realtime
 * 
 * Path Params
 * @param {string} chainName The chain name eg: `eth-mainnet`.
 * @param {string} walletAddress The requested address. Passing in an `ENS`, `RNS`, `Lens Handle`, or an `Unstoppable Domain` resolves automatically.
 */
export const getNftApprovals = ({
	chainName,
	walletAddress,
}: {
	chainName: string | number
	walletAddress: string
}) => (
	get<NftApprovalsResponse>(`v1/${chainName}/nft/approvals/${walletAddress}/`)
)

export type NftApprovalsResponse = {
	/** The timestamp when the response was generated. Useful to show data staleness to users. */
	updated_at: datetime,

	/** The requested chain ID eg: `1`. */
	chain_id: integer,

	/** The requested chain name eg: `eth-mainnet`. */
	chain_name: string,

	/** The requested address. */
	address: string,

	/** List of response items. */
	items: {
		/** Use the relevant `contract_address` to lookup prices, logos, token transfers, etc. */
		contract_address: string,

		/** The label of the contract address. */
		contract_address_label: string | null,

		/** The ticker symbol for this contract. This field is set by a developer and non-unique across a network. */
		contract_ticker_symbol: string | null,

		/** List of asset balances held by the user. */
		token_balances: {
			/** The token's id. */
			token_id: string,

			/** The NFT's token balance. */
			token_balance: safelong // integer
		}[],

		/** Contracts with non-zero approvals for this token. */
		spenders: {
			/** The height of the block. */
			block_height: integer,

			/** The offset is the position of the tx in the block. */
			tx_offset: integer,

			/** The offset is the position of the log entry within an event log. */
			log_offset: integer,

			/** The block signed timestamp in UTC. */
			block_signed_at: datetime,

			/** Most recent transaction that updated approval amounts for the token. */
			tx_hash: string,

			/** Address of the contract with approval for the token. */
			spender_address: string,

			/** Name of the contract with approval for the token. */
			spender_address_label: string | null,

			/** The token ids approved. */
			token_ids_approved: 'ALL', // string

			/** Remaining number of tokens granted to the spender by the approval. */
			allowance: 'UNLIMITED' | safelong, // string
		}[],
	}[],
}


/**
 * Base
 */

export type LogEvent = {
	/** The block signed timestamp in UTC. */
	block_signed_at: datetime,

	/** The block height. */
	block_height: integer,

	/** The offset is the position of the tx in the block. */
	tx_offset: integer,

	/** The offset is the position of the log entry within an event log. */
	log_offset: integer,

	/** The requested transaction hash. */
	tx_hash: string,

	/** The log topics in raw data. */
	raw_log_topics: string[],

	/** Use contract decimals to format the token balance for display purposes - divide the balance by `10^{contract_decimals}`. */
	sender_contract_decimals: integer | null,

	/** The name of the sender. */
	sender_name: string | null,

	sender_contract_ticker_symbol: string | null,

	/** The address of the sender. */
	sender_address: string,

	/** The label of the sender address. */
	sender_address_label: string | null,

	/** The contract logo URL. */
	sender_logo_url: string,

	/** The log events in raw. */
	raw_log_data: string | null,

	/** The decoded item. */
	decoded: {
		name: string,

		signature: string,

		params: {
			name: string,

			type: string,

			indexed: boolean,

			decoded: boolean,

			value: string,
		}[],
	} | null,
}

/**
 * Get a block
 * @link https://www.covalenthq.com/docs/api/base/get-a-block/
 * 
 * Commonly used to fetch and render a single block for a block explorer.
 * 
 * Costs: 1.00 Credits
 * Processing: Realtime
 * 
 * Path Params
 * @param {string} chainName The chain name eg: `eth-mainnet`.
 * @param {string} blockHeight The block height or `latest` for the latest block available.
 * 
 * Query Params
 * @param {boolean} no-logs Omit log events.
 * @param {boolean} no-miner-rewards Omit miner rewards.
 */
export const getBlock = ({
	chainName,
	blockHeight,
	noLogs = false,
}: {
	chainName: string | number
	blockHeight: integer | `0x${string}` | 'earliest' | 'latest'
	noLogs?: boolean
}) => (
	get<BlockResponse>(`v1/${chainName}/block_v2/${blockHeight}`, {
		'no-logs': noLogs,
	})
)

export type BlockResponse = {
	/** The timestamp when the response was generated. Useful to show data staleness to users. */
	updated_at: datetime,

	/** The requested chain ID eg: `1`. */
	chain_id: integer,

	/** The requested chain name eg: `eth-mainnet`. */
	chain_name: string,

	/** List of response items. */
	items: {
		/** The block signed timestamp in UTC. */
		signed_at: datetime,

		/** The block height. */
		height: integer,
	}[],
}

/**
 * Get block heights
 * @link https://www.covalenthq.com/docs/api/base/get-block-heights/
 * 
 * Commonly used to get all the block heights within a particular date range. Useful for rendering a display where you sort blocks by day.
 * 
 * Costs: 1.00 Credits
 * Processing: Realtime
 * 
 * Path Params
 * @param {string} chainName The chain name eg: `eth-mainnet`.
 * @param {string} startDate The start date in `YYYY-MM-DD` format.
 * @param {string} endDate The end date in `YYYY-MM-DD` format.
 * 
 * Query Params
 * @param {integer} page-size Number of items per page. Omitting this parameter defaults to 100.
 * @param {integer} page-number 0-indexed page number to begin pagination.
 */
export const getBlockHeights = ({
	chainName,
	startDate,
	endDate,
	pageSize = 100,
	pageNumber = 0,
}: {
	chainName: string | number
	startDate: string
	endDate: string
	pageSize?: integer
	pageNumber?: integer
}) => (
	get<BlockHeightsResponse>(`v1/${chainName}/block_v2/${startDate}/${endDate}`, {
		'page-size': pageSize,
		'page-number': pageNumber,
	})
)

export type BlockHeightsResponse = {
	/** The timestamp when the response was generated. Useful to show data staleness to users. */
	updated_at: datetime,

	/** The requested chain ID eg: `1`. */
	chain_id: integer,

	/** The requested chain name eg: `eth-mainnet`. */
	chain_name: string,

	/** List of response items. */
	items: {
		/** The block signed timestamp in UTC. */
		signed_at: datetime,

		/** The block height. */
		height: integer,
	}[],

	pagination: {
		/** True is there is another page. */
		has_more: boolean,

		/** The requested page number. */
		page_number: integer,

		/** The requested number of items on the current page. */
		page_size: integer,

		/** The total number of items across all pages for this request. */
		total_count: integer,
	},
}

/**
 * Get logs
 * @link https://www.covalenthq.com/docs/api/base/get-logs/
 * 
 * Commonly used to get all the event logs of the latest block, or for a range of blocks. Includes sender contract metadata as well as decoded logs.
 * 
 * Costs: 5.00 Credits per block
 * Processing: Batch
 * 
 * Path Params
 * @param {string} chainName The chain name eg: `eth-mainnet`.
 * 
 * Query Params
 * @param {integer} starting-block The first block to retrieve log events with. Accepts decimals, hexadecimals, or the strings `earliest` and `latest`.
 * @param {string} ending-block The last block to retrieve log events with. Accepts decimals, hexadecimals, or the strings `earliest` and `latest`.
 * @param {string} address The address of the log events sender contract.
 * @param {string} topics The topic hash(es) to retrieve logs with.
 * @param {string} block-hash The block hash to retrieve logs for.
 * @param {boolean} skip-decode Omit decoded log events.
 */
export const getLogs = ({
	chainName,
	startingBlock = 0,
	endingBlock,
	address,
	topics,
	blockHash,
	skipDecode,
}: {
	chainName: string | number
	startingBlock?: integer
	endingBlock?: integer | `0x${string}` | 'earliest' | 'latest'
	address?: string
	topics?: string
	blockHash?: string
	skipDecode?: boolean
}) => (
	get<GetLogsResponse>(`v1/${chainName}/events`, {
		'starting-block': startingBlock,
		'ending-block': endingBlock,
		address,
		topics,
		'block-hash': blockHash,
		'skip-decode': skipDecode,
	})
)

export type GetLogsResponse = {
	/** The timestamp when the response was generated. Useful to show data staleness to users. */
	updated_at: datetime,

	/** The requested chain ID eg: `1`. */
	chain_id: integer,

	/** The requested chain name eg: `eth-mainnet`. */
	chain_name: string,

	/** List of response items. */
	items: {
		/** The block signed timestamp in UTC. */
		block_signed_at: datetime,

		/** The block height. */
		block_height: integer,

		/** The block hash. */
		block_hash: string,

		/** The offset is the position of the tx in the block. */
		tx_offset: integer,

		/** The offset is the position of the log entry within an event log. */
		log_offset: integer,

		/** The requested transaction hash. */
		tx_hash: string,

		/** The log topics in raw data. */
		raw_log_topics: string[],

		/** The log events in raw. */
		raw_log_data: string | null,

		/** The decoded item. */
		decoded: {
			name: string,

			signature: string,

			params: {
				name: string,

				type: string,

				indexed: boolean,

				decoded: boolean,

				value: string,
			}[],
		} | null,
	}[],
}

/**
 * Get log events by contract address
 * @link https://www.covalenthq.com/docs/api/base/get-log-events-by-contract-address/
 * 
 * Commonly used to get all the event logs emitted from a particular contract address. Useful for building dashboards that examine on-chain interactions.
 * 
 * Costs: 0.01 Credits per item
 * Processing: Realtime
 * 
 * Path Params
 * @param {string} chainName The chain name eg: `eth-mainnet`.
 * @param {string} contractAddress The requested contract address. Passing in an `ENS`, `RNS`, `Lens Handle`, or an `Unstoppable Domain` resolves automatically.
 * 
 * Query Params
 * @param {integer} starting-block The first block to retrieve log events with. Accepts decimals, hexadecimals, or the strings `earliest` and `latest`.
 * @param {string} ending-block The last block to retrieve log events with. Accepts decimals, hexadecimals, or the strings `earliest` and `latest`.
 * @param {integer} page-size Number of items per page. Omitting this parameter defaults to 100.
 * @param {integer} page-number 0-indexed page number to begin pagination.
 */
export const getLogEventsByContractAddress = ({
	chainName,
	contractAddress,
	startingBlock = 0,
	endingBlock,
	pageSize = 100,
	pageNumber = 0,
}: {
	chainName: string | number
	contractAddress: string
	startingBlock?: integer
	endingBlock?: integer | `0x${string}` | 'earliest' | 'latest'
	pageSize?: integer
	pageNumber?: integer
}) => (
	get<LogEventsByAddressResponse>(`v1/${chainName}/events/address/${contractAddress}`, {
		'starting-block': startingBlock,
		'ending-block': endingBlock,
		'page-size': pageSize,
		'page-number': pageNumber,
	})
)

export type LogEventsByAddressResponse = {
	/** The timestamp when the response was generated. Useful to show data staleness to users. */
	updated_at: datetime,

	/** The requested chain ID eg: `1`. */
	chain_id: integer,

	/** The requested chain name eg: `eth-mainnet`. */
	chain_name: string,

	/** List of response items. */
	items: LogEvent[],

	pagination: {
		/** True is there is another page. */
		has_more: boolean,

		/** The requested page number. */
		page_number: integer,

		/** The requested number of items on the current page. */
		page_size: integer,

		/** The total number of items across all pages for this request. */
		total_count: integer,
	},
}

/**
 * Get log events by topic hash(es)
 * @link https://www.covalenthq.com/docs/api/base/get-log-events-by-topic-hash/
 * 
 * Commonly used to get all event logs of the same topic hash across all contracts within a particular chain. Useful for cross-sectional analysis of event logs that are emitted on-chain.
 * 
 * Costs: 0.01 Credits per item
 * Processing: Realtime
 * 
 * Path Params
 * @param {string} chainName The chain name eg: `eth-mainnet`.
 * @param {string} topicHash The endpoint will return event logs that contain this topic hash.
 * 
 * Query Params
 * @param {integer} starting-block The first block to retrieve log events with. Accepts decimals, hexadecimals, or the strings `earliest` and `latest`.
 * @param {string} ending-block The last block to retrieve log events with. Accepts decimals, hexadecimals, or the strings `earliest` and `latest`.
 * @param {string} secondary-topics Additional topic hash(es) to filter on - padded & unpadded address fields are supported. Separate multiple topics with a comma.
 * @param {integer} page-size Number of items per page. Omitting this parameter defaults to 100.
 * @param {integer} page-number 0-indexed page number to begin pagination.
 */
export const getLogEventsByTopicHash = ({
	chainName,
	topicHash,
	startingBlock = 0,
	endingBlock,
	secondaryTopics,
	pageSize = 100,
	pageNumber = 0,
}: {
	chainName: string | number
	topicHash: string
	startingBlock?: integer
	endingBlock?: integer | `0x${string}` | 'earliest' | 'latest'
	secondaryTopics?: string
	pageSize?: integer
	pageNumber?: integer
}) => (
	get<LogEventsByTopicHashResponse>(`v1/${chainName}/events/topics/${topicHash}`, {
		'starting-block': startingBlock,
		'ending-block': endingBlock,
		'secondary-topics': secondaryTopics,
		'page-size': pageSize,
		'page-number': pageNumber,
	})
)

export type LogEventsByTopicHashResponse = {
	/** The timestamp when the response was generated. Useful to show data staleness to users. */
	updated_at: datetime,

	/** The requested chain ID eg: `1`. */
	chain_id: integer,

	/** The requested chain name eg: `eth-mainnet`. */
	chain_name: string,

	/** List of response items. */
	items: LogEvent[],

	pagination: {
		/** True is there is another page. */
		has_more: boolean,

		/** The requested page number. */
		page_number: integer,

		/** The requested number of items on the current page. */
		page_size: integer,

		/** The total number of items across all pages for this request. */
		total_count: integer,
	},
}

/**
 * Get resolved address for registered address
 * @link https://www.covalenthq.com/docs/api/base/get-resolved-address-for-registered-address/
 * 
 * Commonly used to resolve ENS, RNS and Unstoppable Domains addresses.
 * 
 * Costs: 1.00 Credits
 * Processing: Realtime
 * 
 * Note: all our endpoints support address resolution natively allowing an ENS, RNS or Unstoppable Domains address to be passed in directly.
 * 
 * Path Params
 * @param {string} chainName The chain name eg: `eth-mainnet`.
 * @param {string} walletAddress The requested address. Passing in an `ENS`, `RNS`, `Lens Handle`, or an `Unstoppable Domain` resolves automatically.
 */
export const getResolvedAddressForRegisteredAddress = ({
	chainName,
	walletAddress,
}: {
	chainName: string | number
	walletAddress: string
}) => (
	get<ResolvedAddressResponse>(`v1/${chainName}/address/${walletAddress}/`)
)

export type ResolvedAddressResponse = {
	/** The timestamp when the response was generated. Useful to show data staleness to users. */
	updated_at: datetime,

	/** The requested chain ID eg: `1`. */
	chain_id: integer,

	/** The requested chain name eg: `eth-mainnet`. */
	chain_name: string,

	items: {
		/** The requested address. */
		address: string,

		name: string,
	}[],
}

/**
 * Get all chains
 * @link https://www.covalenthq.com/docs/api/base/get-all-chains/
 * 
 * Commonly used to build internal dashboards for all supported chains on Covalent.
 * 
 * Costs: 0.01 Credits
 * Processing: Realtime
 */
export const getAllChains = () => (
	get<AllChainsResponse>('v1/chains/')
)

export type AllChainsResponse = {
	/** The timestamp when the response was generated. Useful to show data staleness to users. */
	updated_at: datetime,

	items: {
		/** The chain name eg: `eth-mainnet`. */
		name: string,

		/** The requested chain ID eg: `1`. */
		chain_id: integer,

		/** True if the chain is a testnet. */
		is_testnet: boolean,

		/** Schema name to use for direct SQL. */
		db_schema_name: string,

		/** The chains label eg: `Ethereum Mainnet`. */
		label: string,

		/** The category label eg: `Ethereum`. */
		category_label: string,

		/** A svg logo url for the chain. */
		logo_url: string,

		/** A black png logo url for the chain. */
		black_logo_url: string,

		/** A white png logo url for the chain. */
		white_logo_url: string,

		/** The color theme for the chain. */
		color_theme: {
			/** The red color code. */
			red: integer,

			/** The green color code. */
			green: integer,

			/** The blue color code. */
			blue: integer,

			/** The alpha color code. */
			alpha: integer,

			/** The hexadecimal color code. */
			hex: string,

			/** The color represented in css rgb() functional notation. */
			css_rgb: string,
		},

		/** True if the chain is an AppChain. */
		is_appchain: boolean,

		/** The ChainItem the appchain is a part of. */
		appchain_of: string,
	}[],
}

/**
 * Get all chain statuses
 * @link https://www.covalenthq.com/docs/api/base/get-all-chain-statuses/
 * 
 * Commonly used to build internal status dashboards of all supported chains.
 * 
 * Costs: 1.00 Credits
 * Processing: Realtime
 */
export const getAllChainStatuses = () => (
	get<AllChainsStatusResponse>('v1/chains/status/')
)

export type AllChainsStatusResponse = {
	/** The timestamp when the response was generated. Useful to show data staleness to users. */
	updated_at: datetime,

	items: {
		/** The chain name eg: `eth-mainnet`. */
		name: string,

		/** The requested chain ID eg: `1`. */
		chain_id: integer,

		/** True if the chain is a testnet. */
		is_testnet: boolean,

		/** A svg logo url for the chain. */
		logo_url: string,

		/** A black png logo url for the chain. */
		black_logo_url: string,

		/** A white png logo url for the chain. */
		white_logo_url: string,

		/** True if the chain is an AppChain. */
		is_appchain: boolean,

		/** The height of the lastest block available. */
		synced_block_height: integer,

		/** The signed timestamp of lastest block available. */
		synced_blocked_signed_at: datetime,

		/** True if the chain has data and ready for querying. */
		has_data: boolean,
	}[],
}

/**
 * Get gas prices
 * @link https://www.covalenthq.com/docs/api/base/get-gas-prices/
 * 
 * Get real-time gas estimates for different transaction speeds on a specific network, enabling users to optimize transaction costs and confirmation times.
 * 
 * Costs: 1.00 Credits
 * Processing: Batch
 * 
 * > Currently support these event types: `erc20` token transfers, `nativetokens` transfers, and `uniswapv3` swap events.
 * 
 * Path Params
 * @param {string} chainName The chain name eg: `eth-mainnet`.
 * @param {string} eventType The desired event type to retrieve gas prices for. Supports `erc20` transfer events, `uniswapv3` swap events and `nativetokens` transfers.
 * 
 * Query Params
 * @param {string} quote-currency The currency to convert. Supports `USD`, `CAD`, `EUR`, `SGD`, `INR`, `JPY`, `VND`, `CNY`, `KRW`, `RUB`, `TRY`, `NGN`, `ARS`, `AUD`, `CHF`, and `GBP`.
 */
export const getGasPrices = ({
	chainName,
	eventType,
	quoteCurrency = 'USD',
}: {
	chainName: string | number
	eventType: 'erc20' | 'uniswapv3' | 'nativetokens'
	quoteCurrency?: string
}) => (
	get<GasPricesResponse>(`v1/${chainName}/event/${eventType}/gas_prices`, {
		'quote-currency': quoteCurrency,
	})
)

export type GasPricesResponse = {
	/** The requested chain ID eg: `1`. */
	chain_id: integer,

	/** The requested chain name eg: `eth-mainnet`. */
	chain_name: string,

	/** The requested quote currency eg: `USD`. */
	quote_currency: string,

	/** The timestamp when the response was generated. Useful to show data staleness to users. */
	updated_at: datetime,

	/** The requested event type. */
	event_type: string,

	/** The exchange rate for the requested quote currency. */
	gas_quote_rate: double,

	items: {
		/** The average gas price, in WEI, for the time interval. */
		gas_price: safelong, // string

		/** The average gas spent for the time interval. */
		gas_spent: safelong, // string

		/** The average gas spent in `quote-currency` denomination for the time interval. */
		gas_quote: double,

		/** Other fees, when applicable. For example: OP chain L1 fees. */
		other_fees: {
			/** The calculated L1 gas spent, when applicable, in quote-currency, for the specified time interval. */
			l1_gas_quote: double | null,
		},

		/** The sum of the L1 and L2 gas spent, in quote-currency, for the specified time interval. */
		total_gas_quote: double,

		/** A prettier version of the total average gas spent, in `quote-currency`, for the specified time interval, for rendering purposes. */
		pretty_total_gas_quote: string,

		/** The specified time interval. */
		interval: string,
	},
}

/**
 * Get cross-chain activity for address
 * @link https://www.covalenthq.com/docs/api/base/get-address-activity/
 * 
 * Commonly used to locate chains which an address is active on with a single API call.
 * 
 * Costs: 0.50 Credits
 * Processing: Realtime
 * 
 * Path Params
 * @param {string} walletAddress The requested wallet address. Passing in an `ENS`, `RNS`, `Lens Handle`, or an `Unstoppable Domain` resolves automatically.
 * 
 * Query Params
 * @param {boolean} testnets Set to `true` to include testnets with activity in the response. By default, it's set to `false` and only returns mainnet activity.
 */
export const getCrossChainActivity = ({
	walletAddress,
	testnets = false,
}: {
	walletAddress: string
	testnets?: boolean
}) => (
	get<ChainActivityResponse>(`v1/address/${walletAddress}/activity`, {
		testnets,
	})
)

export type ChainActivityResponse = {
	/** The timestamp when the response was generated. Useful to show data staleness to users. */
	updated_at: datetime,

	/** The requested address. */
	address: string,

	/** List of response items. */
	items: {
		/** The chain name eg: `eth-mainnet`. */
		name: string,

		/** The requested chain ID eg: `1`. */
		chain_id: safelong, 

		/** True if the chain is a testnet. */
		is_testnet: boolean,

		/** Schema name to use for direct SQL. */
		db_schema_name: string,

		/** The chains label eg: `Ethereum Mainnet`. */
		label: string,

		/** The category label eg: `Ethereum`. */
		category_label: string,

		/** A svg logo url for the chain. */
		logo_url: string,

		/** A black png logo url for the chain. */
		black_logo_url: string,

		/** A white png logo url for the chain. */
		white_logo_url: string,

		/** The color theme for the chain. */
		color_theme: {
			/** The red color code. */
			red: integer,

			/** The green color code. */
			green: integer,

			/** The blue color code. */
			blue: integer,

			/** The alpha color code. */
			alpha: integer,

			/** The hexadecimal color code. */
			hex: string,

			/** The color represented in css rgb() functional notation. */
			css_rgb: string,
		} | null,

		/** True if the chain is an AppChain. */
		is_appchain: boolean,

		/** The ChainItem the appchain is a part of. */
		appchain_of: null,

		/** The timestamp when the address was last seen on the chain. */
		last_seen_at: datetime,
	},
}



/**
 * Class B
 * APIs maintained by Covalent for a specific protocol on a specific blockchain, eg: Constant Product AMMs (`XY=K`) on various blockchains.
 */

/**
 * XY=K
 */

export type XykPool = {
	/** The pair address. */
	exchange: string,

	swap_count_24h: integer,

	/** The total liquidity converted to fiat in `quote-currency`. */
	total_liquidity_quote: double, // string

	volume_24h_quote: double, // string

	fee_24h_quote: double, // string

	/** Total supply of this pool token. */
	total_supply: safelong // integer // string

	/** The exchange rate for the requested quote currency. */
	quote_rate: double, // string

	/** The requested chain name eg: `eth-mainnet`. */
	chain_name: string,

	/** The requested chain ID eg: `1`. */
	chain_id: integer, // string

	/** The name of the DEX, eg: `uniswap_v2`. */
	dex_name: string,

	volume_7d_quote: double, // string

	annualized_fee: double, // string

	token_0: {
		/** Use the relevant `contract_address` to lookup prices, logos, token transfers, etc. */
		contract_address: string,

		/** The string returned by the `name()` method. */
		contract_name: string,

		volume_in_24h: safelong, // string,

		volume_out_24h: safelong, // string,

		/** The exchange rate for the requested quote currency. */
		quote_rate: string,

		reserve: safelong, // string,

		/** The contract logo URL. */
		logo_url: string,

		/** The ticker symbol for this contract. This field is set by a developer and non-unique across a network. */
		contract_ticker_symbol: string,

		/** Use contract decimals to format the token balance for display purposes - divide the balance by `10^{contract_decimals}`. */
		contract_decimals: integer, // string

		volume_in_7d: safelong, // string

		volume_out_7d: safelong, // string
	},

	token_1: {
		/** Use the relevant `contract_address` to lookup prices, logos, token transfers, etc. */
		contract_address: string,

		/** The string returned by the `name()` method. */
		contract_name: string,

		volume_in_24h: safelong, // string,

		volume_out_24h: safelong, // string,

		/** The exchange rate for the requested quote currency. */
		quote_rate: string,

		reserve: safelong, // string,

		/** The contract logo URL. */
		logo_url: string,

		/** The ticker symbol for this contract. This field is set by a developer and non-unique across a network. */
		contract_ticker_symbol: string,

		/** Use contract decimals to format the token balance for display purposes - divide the balance by `10^{contract_decimals}`. */
		contract_decimals: integer, // string

		volume_in_7d: safelong, // string

		volume_out_7d: safelong, // string
	},
}

export type XykTransaction = {
	/** The block signed timestamp in UTC. */
	block_signed_at: datetime,

	/** The requested transaction hash. */
	tx_hash: string,

	act: 'SWAP' | string,

	/** The requested address. */
	address: string,

	amount_0: safelong | null, // amount0

	amount_1: safelong | null, // amount1

	amount_0_in: safelong, // amount0_in

	amount_0_out: safelong, // amount0_out

	amount_1_out: safelong, // amount1_out

	to_address: string,

	from_address: string | null,

	sender_address: string,

	total_quote: double,

	quote_currency: string,

	token_0: {
		/** Use contract decimals to format the token balance for display purposes - divide the balance by `10^{contract_decimals}`. */
		contract_decimals: integer, // string

		/** The string returned by the `name()` method. */
		contract_name: string,

		/** The ticker symbol for this contract. This field is set by a developer and non-unique across a network. */
		contract_ticker_symbol: string,

		/** Use the relevant `contract_address` to lookup prices, logos, token transfers, etc. */
		contract_address: string,

		/** A list of supported standard ERC interfaces, eg: `ERC20` and `ERC721`. */
		supports_erc: ErcInterface[] | null,

		/** The contract logo URL. */
		logo_url: string,
	},

	token_1: {
		/** Use contract decimals to format the token balance for display purposes - divide the balance by `10^{contract_decimals}`. */
		contract_decimals: integer, // string

		/** The string returned by the `name()` method. */
		contract_name: string,

		/** The ticker symbol for this contract. This field is set by a developer and non-unique across a network. */
		contract_ticker_symbol: string,

		/** Use the relevant `contract_address` to lookup prices, logos, token transfers, etc. */
		contract_address: string,

		/** A list of supported standard ERC interfaces, eg: `ERC20` and `ERC721`. */
		supports_erc: ErcInterface[] | null,

		/** The contract logo URL. */
		logo_url: string,
	},

	token_0_quote_rate: double,

	token_1_quote_rate: double,
}

/**
 * Get XY=K pools
 * @link https://www.covalenthq.com/docs/api/xyk/get-xyk-pools/
 * 
 * Commonly used to get all the pools of a particular DEX. Supports most common DEXs (Uniswap, SushiSwap, etc), and returns detailed trading data (volume, liquidity, swap counts, fees, LP token prices).
 * 
 * Costs: 1.00 Credits
 * Processing: Batch
 * 
 * The returned list of pools only contains the active ones and we define active as pools that have had atleast one swap in the last `days`.
 * 
 * Path Params
 * @param {string} chainName The chain name eg: `eth-mainnet`.
 * @param {string} dexName The DEX name eg: `uniswap_v2`.
 */
export const getXykPools = ({
	chainName,
	dexName,
}: {
	chainName: string | number
	dexName: string
}) => (
	get<PoolResponse>(`v1/${chainName}/xy=k/${dexName}/pools/`)
)

export type PoolResponse = {
	/** The timestamp when the response was generated. Useful to show data staleness to users. */
	updated_at: datetime,

	/** The requested chain ID eg: `1`. */
	chain_id: integer,

	/** The requested chain name eg: `eth-mainnet`. */
	chain_name: string,

	/** List of response items. */
	items: XykPool[],

	/** Pagination metadata. */
	pagination: {
		/** True is there is another page. */
		has_more: boolean,

		/** The requested page number. */
		page_number: integer,

		/** The requested number of items on the current page. */
		page_size: integer,

		/** The total number of items across all pages for this request. */
		total_count: integer,
	},
}

/**
 * Get XY=K pool by address
 * @link https://www.covalenthq.com/docs/api/xyk/get-xyk-pool-by-address/
 * 
 * Commonly used to get the 7 day and 30 day time-series data (volume, liquidity, price) of a particular liquidity pool in a DEX. Useful for building time-series charts on DEX trading activity.
 * 
 * Costs: 1.00 Credits
 * Processing: Batch
 * 
 * Path Params
 * @param {string} chainName The chain name eg: `eth-mainnet`.
 * @param {string} dexName The DEX name eg: `uniswap_v2`.
 * @param {string} poolAddress The pool contract address. Passing in an `ENS`, `RNS`, `Lens Handle`, or an `Unstoppable Domain` resolves automatically.
 */
export const getXykPoolByAddress = ({
	chainName,
	dexName,
	poolAddress,
}: {
	chainName: string | number
	dexName: string
	poolAddress: string
}) => (
	get<PoolByAddressResponse>(`v1/${chainName}/xy=k/${dexName}/pools/address/${poolAddress}/`)
)

export type PoolByAddressResponse = {
	/** The timestamp when the response was generated. Useful to show data staleness to users. */
	updated_at: datetime,

	/** The requested chain ID eg: `1`. */
	chain_id: integer,

	/** The requested chain name eg: `eth-mainnet`. */
	chain_name: string,

	items: XykPool[],

	/** Pagination metadata. */
	pagination: {
		/** True is there is another page. */
		has_more: boolean,

		/** The requested page number. */
		page_number: integer,

		/** The requested number of items on the current page. */
		page_size: integer,

		/** The total number of items across all pages for this request. */
		total_count: integer,
	},
}

/**
 * Get XY=K pools for ERC20 token address
 * @link https://www.covalenthq.com/docs/api/xyk/get-xyk-pools-for-erc20-token-address/
 * 
 * Commonly used to get all pools and the supported DEX for a token. Useful for building a table of top pairs across all supported DEXes that the token is trading on.
 * 
 * Costs: 1.00 Credits
 * Processing: Batch
 * 
 * Path Params
 * @param {string} chainName The chain name eg: `eth-mainnet`.
 * @param {string} tokenAddress The token contract address. Passing in an `ENS`, `RNS`, `Lens Handle`, or an `Unstoppable Domain` resolves automatically.
 * 
 * Query Params
 * @param {string} quote-currency The currency to convert. Supports `USD`, `CAD`, `EUR`, `SGD`, `INR`, `JPY`, `VND`, `CNY`, `KRW`, `RUB`, `TRY`, `NGN`, `ARS`, `AUD`, `CHF`, and `GBP`.
 * @param {string} dex-name The DEX name eg: `uniswap_v2`.
 */
export const getXykPoolsForTokenAddress = ({
	chainName,
	tokenAddress,
	quoteCurrency = 'USD',
	dexName,
}: {
	chainName: string | number
	tokenAddress: string
	quoteCurrency?: string
	dexName?: string
}) => (
	get<PoolsForTokenAddressResponse>(`v1/${chainName}/xy=k/tokens/address/${tokenAddress}/pools`, {
		'quote-currency': quoteCurrency,
		'dex-name': dexName,
	})
)

export type PoolsForTokenAddressResponse = {
	/** The timestamp when the response was generated. Useful to show data staleness to users. */
	updated_at: datetime,

	/** The requested address. */
	address: string,

	/** The requested chain ID eg: `1`. */
	chain_id: integer,

	/** The requested chain name eg: `eth-mainnet`. */
	chain_name: string,

	/** The requested quote currency eg: `USD`. */
	quote_currency: string,

	/** List of response items. */
	items: XykPool[],

	/** Pagination metadata. */
	pagination: {
		/** True is there is another page. */
		has_more: boolean,

		/** The requested page number. */
		page_number: integer,

		/** The requested number of items on the current page. */
		page_size: integer,

		/** The total number of items across all pages for this request. */
		total_count: integer,
	},
}

/**
 * Get XY=K pools for wallet address
 * @link https://www.covalenthq.com/docs/api/xyk/get-xyk-pools-for-wallet-address/
 * 
 * Commonly used to get all pools and supported DEX for a wallet. Useful for building a personal DEX UI showcasing pairs and supported DEXes associated to the wallet.
 * 
 * Costs: 1.00 Credits
 * Processing: Batch
 * 
 * > Supports only Ethereum, Binance Smart Chain and Polygon.
 * 
 * Path Params
 * @param {string} chainName The chain name eg: `eth-mainnet`.
 * @param {string} walletAddress The account address.
 * @param {integer} page The requested 0-indexed page number.
 * 
 * Query Params
 * @param {string} token-address The token contract address. Passing in an `ENS`, `RNS`, `Lens Handle`, or an `Unstoppable Domain` resolves automatically.
 * @param {string} quote-currency The currency to convert. Supports `USD`, `CAD`, `EUR`, `SGD`, `INR`, `JPY`, `VND`, `CNY`, `KRW`, `RUB`, `TRY`, `NGN`, `ARS`, `AUD`, `CHF`, and `GBP`.
 * @param {string} dex-name The DEX name eg: `uniswap_v2`.
 */
export const getXykPoolsForWalletAddress = ({
	chainName,
	walletAddress,
	page = 0,
	tokenAddress,
	quoteCurrency = 'USD',
	dexName,
}: {
	chainName: string | number
	walletAddress: string
	page: integer
	tokenAddress?: string
	quoteCurrency?: string
	dexName?: string
}) => (
	get<PoolsForWalletAddressResponse>(`v1/${chainName}/xy=k/address/${walletAddress}/pools/page/${page}`, {
		'token-address': tokenAddress,
		'quote-currency': quoteCurrency,
		'dex-name': dexName,
	})
)

export type PoolsForWalletAddressResponse = {
	/** The timestamp when the response was generated. Useful to show data staleness to users. */
	updated_at: datetime,

	address: string,

	/** The requested chain ID eg: `1`. */
	chain_id: integer,

	/** The requested chain name eg: `eth-mainnet`. */
	chain_name: string,

	/** The requested quote currency eg: `USD`. */
	quote_currency: string,

	/** List of response items. */
	items: XykPool[],

	/** Pagination metadata. */
	pagination: {
		/** True is there is another page. */
		has_more: boolean,

		/** The requested page number. */
		page_number: integer,

		/** The requested number of items on the current page. */
		page_size: integer,

		/** The total number of items across all pages for this request. */
		total_count: integer,
	},
}

/**
 * Get XY=K address exchange balances
 * @link https://www.covalenthq.com/docs/api/xyk/get-xyk-address-exchange-balances/
 * 
 * Commonly used to return balance of a wallet/contract address on a specific DEX.
 * 
 * Costs: 1.00 Credits
 * Processing: Batch
 * 
 * Path Params
 * @param {string} chainName The chain name eg: `eth-mainnet`.
 * @param {string} dexName The DEX name eg: `uniswap_v2`.
 * @param {string} accountAddress The account address.
 */
export const getXykAddressExchangeBalances = ({
	chainName,
	dexName,
	accountAddress,
}: {
	chainName: string | number
	dexName: string
	accountAddress: string
}) => (
	get<AddressExchangeBalancesResponse>(`v1/${chainName}/xy=k/${dexName}/address/${accountAddress}/balances/`)
)

export type AddressExchangeBalancesResponse = {
	/** The requested address. */
	address: string,

	/** The timestamp when the response was generated. Useful to show data staleness to users. */
	updated_at: datetime,

	/** The requested chain ID eg: `1`. */
	chain_id: integer,

	/** The requested chain name eg: `eth-mainnet`. */
	chain_name: string,

	/** List of response items. */
	items: {
		token_0: {
			/** Use contract decimals to format the token balance for display purposes - divide the balance by `10^{contract_decimals}`. */
			contract_decimals: integer,

			/** The ticker symbol for this contract. This field is set by a developer and non-unique across a network. */
			contract_ticker_symbol: string,

			/** Use the relevant `contract_address` to lookup prices, logos, token transfers, etc. */
			contract_address: string,

			/** The contract logo URL. */
			logo_url: string,

			/** The asset balance. Use `contract_decimals` to scale this balance for display purposes. */
			balance: safelong, // string

			quote: double,

			/** The exchange rate for the requested quote currency. */
			quote_rate: double,
		},

		token_1: {
			/** Use contract decimals to format the token balance for display purposes - divide the balance by `10^{contract_decimals}`. */
			contract_decimals: integer,

			/** The ticker symbol for this contract. This field is set by a developer and non-unique across a network. */
			contract_ticker_symbol: string,

			/** Use the relevant `contract_address` to lookup prices, logos, token transfers, etc. */
			contract_address: string,

			/** The contract logo URL. */
			logo_url: string,

			/** The asset balance. Use `contract_decimals` to scale this balance for display purposes. */
			balance: safelong, // string

			quote: double,

			/** The exchange rate for the requested quote currency. */
			quote_rate: double,
		},

		pool_token: {
			/** Use contract decimals to format the token balance for display purposes - divide the balance by `10^{contract_decimals}`. */
			contract_decimals: integer,

			/** The ticker symbol for this contract. This field is set by a developer and non-unique across a network. */
			contract_ticker_symbol: string,

			/** Use the relevant `contract_address` to lookup prices, logos, token transfers, etc. */
			contract_address: string,

			/** The contract logo URL. */
			logo_url: string,

			/** The asset balance. Use `contract_decimals` to scale this balance for display purposes. */
			balance: safelong, // string

			quote: double,

			/** The exchange rate for the requested quote currency. */
			quote_rate: double,

			/** Total supply of this pool token. */
			total_supply: safelong,
		},
	},
}

/**
 * Get XY=K network exchange tokens
 * @link https://www.covalenthq.com/docs/api/xyk/get-xyk-network-exchange-tokens/
 * 
 * Commonly used to retrieve all network exchange tokens for a specific DEX. Useful for building a top tokens table by total liquidity within a particular DEX.
 * 
 * Costs: 1.00 Credits
 * Processing: Batch
 * 
 * Path Params
 * @param {string} chainName The chain name eg: `eth-mainnet`.
 * @param {string} dexName The DEX name eg: `uniswap_v2`.
 */
export const getXykNetworkExchangeTokens = ({
	chainName,
	dexName,
}: {
	chainName: string | number
	dexName: string
}) => (
	get<NetworkExchangeTokensResponse>(`v1/${chainName}/xy=k/${dexName}/tokens/`)
)

export type NetworkExchangeTokensResponse = {
	/** The timestamp when the response was generated. Useful to show data staleness to users. */
	updated_at: datetime,

	/** The requested chain ID eg: `1`. */
	chain_id: integer,

	/** The requested chain name eg: `eth-mainnet`. */
	chain_name: string,

	/** List of response items. */
	items: {
		/** The requested chain name eg: `eth-mainnet`. */
		chain_name: string,

		/** The requested chain ID eg: `1`. */
		chain_id: safelong,

		/** The name of the DEX, eg: `uniswap_v2`. */
		dex_name: string,

		/** Use the relevant `contract_address` to lookup prices, logos, token transfers, etc. */
		contract_address: string,

		/** The string returned by the `name()` method. */
		contract_name: string,

		total_liquidity: safelong,

		total_volume24h: safelong,

		/** The contract logo URL. */
		logo_url: string,

		/** The ticker symbol for this contract. This field is set by a developer and non-unique across a network. */
		contract_ticker_symbol: string,

		/** Use contract decimals to format the token balance for display purposes - divide the balance by `10^{contract_decimals}`. */
		contract_decimals: integer,

		swap_count_24h: integer,

		/** The exchange rate for the requested quote currency. */
		quote_rate: double,

		/** The total liquidity converted to fiat in `quote-currency`. */
		total_liquidity_quote: double,

		total_volume_24h_quote: double,
	}[],

	/** Pagination metadata. */
	pagination: {
		/** True is there is another page. */
		has_more: boolean,

		/** The requested page number. */
		page_number: integer,

		/** The requested number of items on the current page. */
		page_size: integer,

		/** The total number of items across all pages for this request. */
		total_count: integer,
	},
}

/**
 * Get XY=K supported DEXes
 * @link https://www.covalenthq.com/docs/api/xyk/get-xyk-supported-dexes/
 * 
 * Commonly used to get all the supported DEXs available for the `xy=k` endpoints, along with the swap fees and factory addresses.
 * 
 * Costs: 0.01 Credits
 * Processing: Realtime
 */
export const getXykSupportedDexes = () => (
	get<SupportedDexesResponse>('v1/xy=k/supported_dexes/')
)

export type SupportedDexesResponse = {
	/** The timestamp when the response was generated. Useful to show data staleness to users. */
	updated_at: datetime,

	items: {
		/** The requested chain ID eg: `1`. */
		chain_id: safelong,

		/** The requested chain name eg: `eth-mainnet`. */
		chain_name: string,

		/** The name of the DEX, eg: `uniswap_v2`. */
		dex_name: string,

		factory_contract_address: string,

		router_contract_addresses: string[],

		swap_fee: double,
	}[],

	/** Pagination metadata. */
	pagination: {
		/** True is there is another page. */
		has_more: boolean,

		/** The requested page number. */
		page_number: integer,

		/** The requested number of items on the current page. */
		page_size: integer,

		/** The total number of items across all pages for this request. */
		total_count: integer,
	},
}

/**
 * Get XY=K DEX for pool address
 * @link https://www.covalenthq.com/docs/api/xyk/get-xyk-dex-for-pool-address/
 * 
 * Commonly used to get the corresponding supported DEX given a pool address, along with the swap fees, DEX's logo url, and factory addresses. Useful to identifying the specific DEX to which a pair address is associated.
 * 
 * Costs: 1.00 Credits
 * Processing: Batch
 * 
 * Path Params
 * @param {string} chainName The chain name eg: `eth-mainnet`.
 * @param {string} poolAddress The requested pool address.
 */
export const getXykDexForPoolAddress = ({
	chainName,
	poolAddress,
}: {
	chainName: string | number
	poolAddress: string
}) => (
	get<PoolToDexResponse>(`v1/${chainName}/xy=k/address/${poolAddress}/dex_name/`)
)

export type PoolToDexResponse = {
	/** The timestamp when the response was generated. Useful to show data staleness to users. */
	updated_at: datetime,

	/** The requested address. */
	address: string,

	/** The requested chain ID eg: `1`. */
	chain_id: safelong,

	/** The requested chain name eg: `eth-mainnet`. */
	chain_name: string,

	/** List of response items. */
	items: {
		extends: {
			/** The requested chain ID eg: `1`. */
			chain_id: safelong,

			/** The requested chain name eg: `eth-mainnet`. */
			chain_name: string,

			/** The name of the DEX, eg: `uniswap_v2`. */
			dex_name: string,

			factory_contract_address: string,

			router_contract_addresses: string[],

			swap_fee: double,
		},

		/** The dex logo URL. */
		logo_url: string,
	}[],
}

/**
 * Get XY=K swap count for exchange token
 * @link https://www.covalenthq.com/docs/api/xyk/get-xyk-single-network-exchange-token/
 * 
 * Commonly used to get historical daily swap count for a single network exchange token.
 * 
 * Costs: 1.00 Credits
 * Processing: Batch
 * 
 * Path Params
 * @param {string} chainName The chain name eg: `eth-mainnet`.
 * @param {string} dexName The DEX name eg: `uniswap_v2`.
 * @param {string} tokenAddress The token contract address. Passing in an `ENS`, `RNS`, `Lens Handle`, or an `Unstoppable Domain` resolves automatically.
 */
export const getXykSingleNetworkExchangeToken = ({
	chainName,
	dexName,
	tokenAddress,
}: {
	chainName: string | number
	dexName: string
	tokenAddress: string
}) => (
	get<SingleNetworkExchangeTokenResponse>(`v1/${chainName}/xy=k/${dexName}/tokens/address/${tokenAddress}/`)
)

export type SingleNetworkExchangeTokenResponse = {
	/** The timestamp when the response was generated. Useful to show data staleness to users. */
	updated_at: datetime,

	/** The requested chain ID eg: `1`. */
	chain_id: safelong,

	/** The requested chain name eg: `eth-mainnet`. */
	chain_name: string,

	/** List of response items. */
	items: {
		/** The pair address. */
		exchange: string,

		swap_count_24h: double, // string

		/** The total liquidity converted to fiat in `quote-currency`. */
		total_liquidity_quote: double,

		volume_24h_quote: double,

		fee_24h_quote: double,

		/** Total supply of this pool token. */
		total_supply: safelong, // string

		/** The exchange rate for the requested quote currency. */
		quote_rate: double, // string

		/** The requested chain ID eg: `1`. */
		chain_id: safelong,

		/** The name of the DEX, eg: `uniswap_v2`. */
		dex_name: string,

		volume_7d_quote: double, // string

		annualized_fee: double, // string

		token_0: {
			/** Use the relevant `contract_address` to lookup prices, logos, token transfers, etc. */
			contract_address: string,

			/** The string returned by the `name()` method. */
			contract_name: string,

			volume_in_24h: safelong, // string

			volume_out_24h: safelong, // string

			/** The exchange rate for the requested quote currency. */
			quote_rate: double, // string

			reserve: safelong, // string

			/** The contract logo URL. */
			logo_url: string,

			/** The ticker symbol for this contract. This field is set by a developer and non-unique across a network. */
			contract_ticker_symbol: string,

			/** Use contract decimals to format the token balance for display purposes - divide the balance by `10^{contract_decimals}`. */
			contract_decimals: integer,

			volume_in_7d: safelong, // string

			volume_out_7d: safelong, // string
		},

		token_1: {
			/** Use the relevant `contract_address` to lookup prices, logos, token transfers, etc. */
			contract_address: string,

			/** The string returned by the `name()` method. */
			contract_name: string,

			volume_in_24h: safelong, // string

			volume_out_24h: safelong, // string

			/** The exchange rate for the requested quote currency. */
			quote_rate: double, // string

			reserve: safelong, // string

			/** The contract logo URL. */
			logo_url: string,

			/** The ticker symbol for this contract. This field is set by a developer and non-unique across a network. */
			contract_ticker_symbol: string,

			/** Use contract decimals to format the token balance for display purposes - divide the balance by `10^{contract_decimals}`. */
			contract_decimals: integer,

			volume_in_7d: safelong, // string

			volume_out_7d: safelong, // string
		},

		// token0_reserve_quote: string
		token_0_reserve_quote: double,

		// token1_reserve_quote: string
		token_1_reserve_quote: double,

		volume_timeseries_7d: {
			/** The name of the DEX, eg: `uniswap_v2`. */
			dex_name: string,

			/** The requested chain ID eg: `1`. */
			chain_id: safelong,

			dt: datetime, // string

			/** The pair address. */
			exchange: string,

			// sum_amount_0_in: string,
			sum_amount0in: safelong,

			// sum_amount_0_out: string,
			sum_amount0out: safelong,

			// sum_amount_1_in: string,
			sum_amount1in: safelong,

			// sum_amount_1_out: string,
			sum_amount1out: safelong,

			volume_quote: double | null, // string

			// token_0_quote_rate: string,
			token0_quote_rate: double | null,

			// token_1_quote_rate: string,
			token1_quote_rate: double | null,

			swap_count_24: integer, // string
		}[],

		volume_timeseries_30d: {
			/** The name of the DEX, eg: `uniswap_v2`. */
			dex_name: string,

			/** The requested chain ID eg: `1`. */
			chain_id: safelong,

			dt: datetime, // string

			/** The pair address. */
			exchange: string,

			// sum_amount_0_in: string,
			sum_amount0in: safelong,

			// sum_amount_0_out: string,
			sum_amount0out: safelong,

			// sum_amount_1_in: string,
			sum_amount1in: safelong,

			// sum_amount_1_out: string,
			sum_amount1out: safelong,

			volume_quote: double | null, // string

			// token_0_quote_rate: string,
			token0_quote_rate: double | null,

			// token_1_quote_rate: string,
			token1_quote_rate: double | null,

			swap_count_24: integer, // string
		}[],

		liquidity_timeseries_7d: {
			/** The name of the DEX, eg: `uniswap_v2`. */
			dex_name: string,

			/** The requested chain ID eg: `1`. */
			chain_id: safelong,

			dt: datetime, // string

			/** The pair address. */
			exchange: string,

			r0_c: safelong, // string

			r1_c: safelong, // string

			liquidity_quote: double | null, // string

			// token_0_quote_rate: string,
			token0_quote_rate: double | null,

			// token_1_quote_rate: string,
			token1_quote_rate: double | null,
		}[],

		liquidity_timeseries_30d: {
			/** The name of the DEX, eg: `uniswap_v2`. */
			dex_name: string,

			/** The requested chain ID eg: `1`. */
			chain_id: safelong,

			dt: datetime, // string

			/** The pair address. */
			exchange: string,

			r0_c: safelong, // string

			r1_c: safelong, // string

			liquidity_quote: double | null, // string

			// token_0_quote_rate: string,
			token0_quote_rate: double | null,

			// token_1_quote_rate: string,
			token1_quote_rate: double | null,
		}[],

		price_timeseries_7d: {
			/** The name of the DEX, eg: `uniswap_v2`. */
			dex_name: string,

			/** The requested chain ID eg: `1`. */
			chain_id: safelong,

			dt: datetime, // string

			/** The pair address. */
			exchange: string,

			// price_of_token_0_in_token_1: string,
			price_of_token0_in_token1: double,

			// price_of_token_0_in_token_1_description: string,
			price_of_token0_in_token1_description: string,

			// price_of_token_1_in_token_0: string,
			price_of_token1_in_token0: double,

			// price_of_token_1_in_token_0_description: string,
			price_of_token1_in_token0_description: string,

			/** The requested quote currency eg: `USD`. */
			quote_currency: string,

			// price_of_token_0_in_quote_currency: string,
			price_of_token0_in_quote_currency: double | null,

			// price_of_token_1_in_quote_currency: string,
			price_of_token1_in_quote_currency: double | null,
		}[],

		price_timeseries_30d: {
			/** The name of the DEX, eg: `uniswap_v2`. */
			dex_name: string,

			/** The requested chain ID eg: `1`. */
			chain_id: safelong,

			dt: datetime, // string

			/** The pair address. */
			exchange: string,

			// price_of_token_0_in_token_1: string,
			price_of_token0_in_token1: double,

			// price_of_token_0_in_token_1_description: string,
			price_of_token0_in_token1_description: string,

			// price_of_token_1_in_token_0: string,
			price_of_token1_in_token0: double,

			// price_of_token_1_in_token_0_description: string,
			price_of_token1_in_token0_description: string,

			/** The requested quote currency eg: `USD`. */
			quote_currency: string,

			// price_of_token_0_in_quote_currency: string,
			price_of_token0_in_quote_currency: double | null,

			// price_of_token_1_in_quote_currency: string,
			price_of_token1_in_quote_currency: double | null,
		}[],
	}[],

	/** Pagination metadata. */
	pagination: {
		/** True is there is another page. */
		has_more: boolean,

		/** The requested page number. */
		page_number: integer,

		/** The requested number of items on the current page. */
		page_size: integer,

		/** The total number of items across all pages for this request. */
		total_count: integer,
	},
}

/**
 * Get XY=K transactions for account address
 * @link https://www.covalenthq.com/docs/api/xyk/get-xyk-transactions-for-account-address/
 * 
 * Commonly used to get all the DEX transactions of a wallet. Useful for building tables of DEX activity segmented by wallet.
 * 
 * Costs: 1.00 Credits
 * Processing: Batch
 * 
 * Path Params
 * @param {string} chainName The chain name eg: `eth-mainnet`.
 * @param {string} dexName The DEX name eg: `uniswap_v2`.
 * @param {string} accountAddress The account address. Passing in an `ENS` or `RNS` resolves automatically.
 */
export const getXykTransactionsForAccountAddress = ({
	chainName,
	dexName,
	accountAddress,
}: {
	chainName: string | number
	dexName: string
	accountAddress: string
}) => (
	get<TransactionsForAccountAddressResponse>(`v1/${chainName}/xy=k/${dexName}/address/${accountAddress}/transactions/`)
)

export type TransactionsForAccountAddressResponse = {
	/** The timestamp when the response was generated. Useful to show data staleness to users. */
	updated_at: datetime,

	/** The requested chain ID eg: `1`. */
	chain_id: integer,

	/** The requested chain name eg: `eth-mainnet`. */
	chain_name: string,

	/** List of response items. */
	items: XykTransaction[],

	/** Pagination metadata. */
	pagination: {
		/** True is there is another page. */
		has_more: boolean,

		/** The requested page number. */
		page_number: integer,

		/** The requested number of items on the current page. */
		page_size: integer,

		/** The total number of items across all pages for this request. */
		total_count: integer,
	},
}

/**
 * Get XY=K transactions for token address
 * @link https://www.covalenthq.com/docs/api/xyk/get-xyk-transactions-for-token-address/
 * 
 * Commonly used to get all the transactions of a token within a particular DEX. Useful for getting a per-token view of DEX activity.
 * 
 * Costs: 1.00 Credits
 * Processing: Batch
 * 
 * Path Params
 * @param {string} chainName The chain name eg: `eth-mainnet`.
 * @param {string} dexName The DEX name eg: `uniswap_v2`.
 * @param {string} tokenAddress The token contract address. Passing in an `ENS`, `RNS`, `Lens Handle`, or an `Unstoppable Domain` resolves automatically.
 */
export const getXykTransactionsForTokenAddress = ({
	chainName,
	dexName,
	tokenAddress,
}: {
	chainName: string | number
	dexName: string
	tokenAddress: string
}) => (
	get<TransactionsForTokenAddressResponse>(`v1/${chainName}/xy=k/${dexName}/tokens/address/${tokenAddress}/transactions/`)
)

export type TransactionsForTokenAddressResponse = {
	/** The timestamp when the response was generated. Useful to show data staleness to users. */
	updated_at: datetime,

	/** The requested chain ID eg: `1`. */
	chain_id: integer,

	/** The requested chain name eg: `eth-mainnet`. */
	chain_name: string,

	/** List of response items. */
	items: XykTransaction[],

	/** Pagination metadata. */
	pagination: {
		/** True is there is another page. */
		has_more: boolean,

		/** The requested page number. */
		page_number: integer,

		/** The requested number of items on the current page. */
		page_size: integer,

		/** The total number of items across all pages for this request. */
		total_count: integer,
	},
}

/**
 * Get XY=K transactions for exchange
 * @link https://www.covalenthq.com/docs/api/xyk/get-xyk-transactions-for-exchange/
 * 
 * Commonly used for getting all the transactions of a particular DEX liquidity pool. Useful for building a transactions history table for an individual pool.
 * 
 * Costs: 1.00 Credits
 * Processing: Batch
 * 
 * Path Params
 * @param {string} chainName The chain name eg: `eth-mainnet`.
 * @param {string} dexName The DEX name eg: `uniswap_v2`.
 * @param {string} poolAddress The pool contract address. Passing in an `ENS`, `RNS`, `Lens Handle`, or an `Unstoppable Domain` resolves automatically.
 */
export const getXykTransactionsForExchange = ({
	chainName,
	dexName,
	poolAddress,
}: {
	chainName: string | number
	dexName: string
	poolAddress: string
}) => (
	get<TransactionsForExchangeResponse>(`v1/${chainName}/xy=k/${dexName}/pools/address/${poolAddress}/transactions/`)
)

export type TransactionsForExchangeResponse = {
	/** The timestamp when the response was generated. Useful to show data staleness to users. */
	updated_at: datetime,

	/** The requested chain ID eg: `1`. */
	chain_id: integer,

	/** The requested chain name eg: `eth-mainnet`. */
	chain_name: string,

	/** List of response items. */
	items: XykTransaction[],

	/** Pagination metadata. */
	pagination: {
		/** True is there is another page. */
		has_more: boolean,

		/** The requested page number. */
		page_number: integer,

		/** The requested number of items on the current page. */
		page_size: integer,

		/** The total number of items across all pages for this request. */
		total_count: integer,
	},
}

/**
 * Get XY=K ecosystem chart data
 * @link https://www.covalenthq.com/docs/api/xyk/get-xyk-ecosystem-chart-data/
 * 
 * Commonly used to get a 7d and 30d time-series chart of DEX activity. Includes volume and swap count.
 * 
 * Costs: 1.00 Credits
 * Processing: Batch
 * 
 * Path Params
 * @param {string} chainName The chain name eg: `eth-mainnet`.
 * @param {string} dexName The DEX name eg: `uniswap_v2`.
 */
export const getXykEcosystemChartData = ({
	chainName,
	dexName,
}: {
	chainName: string | number
	dexName: string
}) => (
	get<EcosystemChartDataResponse>(`v1/${chainName}/xy=k/${dexName}/ecosystem/`)
)

export type EcosystemChartDataResponse = {
	/** The timestamp when the response was generated. Useful to show data staleness to users. */
	updated_at: datetime,

	/** The requested chain ID eg: `1`. */
	chain_id: integer,

	/** The requested chain name eg: `eth-mainnet`. */
	chain_name: string,

	/** List of response items. */
	items: {
		/** The name of the DEX, eg: `uniswap_v2`. */
		dex_name: string,

		/** The requested chain ID eg: `1`. */
		chain_id: integer,

		/** The requested quote currency eg: `USD`. */
		quote_currency: string,

		gas_token_price_quote: double,

		total_swaps24h: integer,

		total_active_pairs7d: integer,

		total_fees24h: double,

		volume_chart7d: {
			/** The name of the DEX, eg: `uniswap_v2`. */
			dex_name: string,

			/** The requested chain ID eg: `1`. */
			chain_id: integer,

			dt: datetime,

			/** The requested quote currency eg: `USD`. */
			quote_currency: string,

			volume_quote: double,

			swap_count_24: integer,
		}[],

		volume_chart30d: {
			/** The name of the DEX, eg: `uniswap_v2`. */
			dex_name: string,

			/** The requested chain ID eg: `1`. */
			chain_id: integer,

			dt: datetime,

			/** The requested quote currency eg: `USD`. */
			quote_currency: string,

			volume_quote: double,

			swap_count_24: integer,
		}[],

		liquidity_chart7d: {
			/** The name of the DEX, eg: `uniswap_v2`. */
			dex_name: string,

			/** The requested chain ID eg: `1`. */
			chain_id: integer,

			dt: datetime,

			/** The requested quote currency eg: `USD`. */
			quote_currency: string,

			liquidity_quote: double,
		}[],

		liquidity_chart30d: {
			/** The name of the DEX, eg: `uniswap_v2`. */
			dex_name: string,

			/** The requested chain ID eg: `1`. */
			chain_id: integer,

			dt: datetime,

			/** The requested quote currency eg: `USD`. */
			quote_currency: string,

			liquidity_quote: double,
		}[],
	}[],
}

/**
 * Get XY=K health data
 * @link https://www.covalenthq.com/docs/api/xyk/get-xyk-health-data/
 * 
 * Commonly used to ping the health of `xy=k` endpoints to get the synced block height per chain.
 * 
 * Costs: 1.00 Credits
 * Processing: Realtime
 * 
 * Path Params
 * @param {string} chainName The chain name eg: `eth-mainnet`.
 * @param {string} dexName The DEX name eg: `uniswap_v2`.
 */
export const getXykHealthData = ({
	chainName,
	dexName,
}: {
	chainName: string | number
	dexName: string
}) => (
	get<HealthDataResponse>(`v1/${chainName}/xy=k/${dexName}/health/`)
)

export type HealthDataResponse = {
	/** The timestamp when the response was generated. Useful to show data staleness to users. */
	updated_at: datetime,

	/** The requested chain ID eg: `1`. */
	chain_id: integer,

	/** The requested chain name eg: `eth-mainnet`. */
	chain_name: string,

	/** List of response items. */
	items: {
		synced_block_height: integer,

		synced_block_signed_at: datetime,

		latest_block_height: integer,

		latest_block_signed_at: datetime,
	}[],

	/** Pagination metadata. */
	pagination: {
		/** True is there is another page. */
		has_more: boolean,

		/** The requested page number. */
		page_number: integer,

		/** The requested number of items on the current page. */
		page_size: integer,

		/** The total number of items across all pages for this request. */
		total_count: integer,
	},
}


/**
 * Pricing
 */

/**
 * Get historical token prices
 * @link https://www.covalenthq.com/docs/api/pricing/get-historical-token-prices/
 * 
 * Commonly used to get historic prices of a token between date ranges. Supports native tokens.
 * 
 * Costs: 1.00 Credits
 * Processing: Batch
 * 
 * Path Params
 * @param {string} chainName The chain name eg: `eth-mainnet`.
 * @param {string} quoteCurrency The currency to convert. Supports `USD`, `CAD`, `EUR`, `SGD`, `INR`, `JPY`, `VND`, `CNY`, `KRW`, `RUB`, `TRY`, `NGN`, `ARS`, `AUD`, `CHF`, and `GBP`.
 * @param {string} contractAddress Contract address for the token. Passing in an `ENS`, `RNS`, `Lens Handle`, or an `Unstoppable Domain` resolves automatically. Supports multiple contract addresses separated by commas.
 * 
 * Query Params
 * @param {string} from The start day of the historical price range (YYYY-MM-DD).
 * @param {string} to The end day of the historical price range (YYYY-MM-DD).
 * @param {boolean} prices-at-asc Sort the prices in chronological ascending order. By default, it's set to `false` and returns prices in chronological descending order.
 */
export const getHistoricalTokenPrices = ({
	chainName,
	quoteCurrency = 'USD',
	contractAddress,
	from,
	to,
	pricesAtAsc = false,
}: {
	chainName: string | number
	quoteCurrency: string
	contractAddress: string
	from: string
	to: string
	pricesAtAsc: boolean
}) => (
	get<TokenPricesResponse>(`v1/pricing/historical_by_addresses_v2/${chainName}/${quoteCurrency}/${contractAddress}`, {
		'from': from,
		'to': to,
		'prices-at-asc': pricesAtAsc,
	})
)

export type TokenPricesResponse = {
	/** Use contract decimals to format the token balance for display purposes - divide the balance by `10^{contract_decimals}`. */
	contract_decimals: integer,

	/** The string returned by the `name()` method. */
	contract_name: string,

	/** The ticker symbol for this contract. This field is set by a developer and non-unique across a network. */
	contract_ticker_symbol: string,

	/** Use the relevant `contract_address` to lookup prices, logos, token transfers, etc. */
	contract_address: string,

	/** A list of supported standard ERC interfaces, eg: ERC20 and ERC721. */
	supports_erc: ErcInterface[] | null,

	/** The contract logo URL. */
	logo_url: string,

	update_at: datetime,

	/** The requested quote currency eg: `USD`. */
	quote_currency: string,

	/** List of response items. */
	prices: {
		contract_metadata: {
			/** Use contract decimals to format the token balance for display purposes - divide the balance by `10^{contract_decimals}`. */
			contract_decimals: integer,

			/** The string returned by the `name()` method. */
			contract_name: string,

			/** The ticker symbol for this contract. This field is set by a developer and non-unique across a network. */
			contract_ticker_symbol: string,

			/** Use the relevant `contract_address` to lookup prices, logos, token transfers, etc. */
			contract_address: string,

			/** A list of supported standard ERC interfaces, eg: ERC20 and ERC721. */
			supports_erc: ErcInterface[] | null,

			/** The contract logo URL. */
			logo_url: string,
		},

		/** The date of the price capture. */
		date: datetime,

		/** The price in the requested quote-currency. */
		price: double,

		/** A prettier version of the price for rendering purposes. */
		pretty_price: string,
	}[],

	/** List of response items. */
	items: {
		contract_metadata: {
			/** Use contract decimals to format the token balance for display purposes - divide the balance by `10^{contract_decimals}`. */
			contract_decimals: integer,

			/** The string returned by the `name()` method. */
			contract_name: string,

			/** The ticker symbol for this contract. This field is set by a developer and non-unique across a network. */
			contract_ticker_symbol: string,

			/** Use the relevant `contract_address` to lookup prices, logos, token transfers, etc. */
			contract_address: string,

			/** A list of supported standard ERC interfaces, eg: ERC20 and ERC721. */
			supports_erc: ErcInterface[] | null,

			/** The contract logo URL. */
			logo_url: string,
		},

		/** The date of the price capture. */
		date: datetime,

		/** The price in the requested quote-currency. */
		price: double,

		/** A prettier version of the price for rendering purposes. */
		pretty_price: string,
	}[],

	/** Pagination metadata. */
	pagination: {
		/** True is there is another page. */
		has_more: boolean,

		/** The requested page number. */
		page_number: integer,

		/** The requested number of items on the current page. */
		page_size: integer,

		/** The total number of items across all pages for this request. */
		total_count: integer,
	},
}
