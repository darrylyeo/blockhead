/**
 * Noves › Pricing API
 * {@link https://docs.noves.fi/reference/pricing-api-quickstart}
 */


// Types
import type { Ethereum } from '$/data/networks/types'
import type { int32, int64, double } from '..'

type Exchange = {
	name: string | null
}

type BaseToken = {
	address: string | null
	symbol: string | null
	name: string | null
}


// Context
import * as publicEnv from '$env/static/public'


// Functions
const request = async <T>(
	endpoint: string,
	params?: Record<string, string | number | boolean | undefined>,
	method: 'GET' | 'POST' = 'GET',
	body?: object,
) => {
	const response = await fetch(
		`https://pricing.noves.fi/${endpoint}${
			params
				? `?${`${new URLSearchParams(
					Object.entries(params)
						.filter(([, value]) => value !== undefined)
						.map(([key, value]) => [key, String(value)])
				)}`}`
				: ''
		}`,
		{
			method,
			headers: {
				'Content-Type': 'application/json',
				'apiKey': publicEnv.PUBLIC_NOVES_API_KEY,
			},
			...body && {
				body: JSON.stringify(body),
			},
		},
	)

	if(!response.ok)
		throw await response.json()

	return await response.json() as T
}


/**
 * Cosmos
 */
export namespace Cosmos {
	/**
	 * /cosmos/chains
	 * 
	 * Returns a list with the names of the Cosmos ecosystem blockchains currently supported by this API. Use the provided chain names when calling other endpoints.
	 * 
	 * {@link https://docs.noves.fi/reference/get_cosmos-chains}
	 */
	export const getChains = async () => (
		await request<
			{
				name: string | null
				ecosystem: 'cosmos'
			}[]
		>(
			'cosmos/chains',
		)
	)

	/**
	 * /cosmos/priceFromPool
	 * 
	 * Given a liquidity pool address and a token address, returns the current price for the requested token (baseToken) in the pool, in terms of the other token (quoteToken) in the pool.
	 * 
	 * {@link https://docs.noves.fi/reference/get_cosmos-pricefrompool}
	 */
	export const getPriceFromPool = async ({
		chain,
		poolAddress,
		tokenAddress,
	}: {
		// Query Params
		/** Name of the chain */
		chain: string
		/** Address of the liquidity pool */
		poolAddress: string
		/** Address of the token */
		tokenAddress: string
	}) => (
		await request<
			{
				chain: string | null
				exchange: {
					name: string | null
				}
				poolAddress: string | null
				baseToken: {
					address: string | null
					symbol: string | null
					name: string | null
					decimals: int32
				}
				quoteToken: {
					address: string | null
					symbol: string | null
					name: string | null
					decimals: int32
				}
				price: {
					amount: string | null
				}
			}
		>(
			'cosmos/priceFromPool',
			{
				chain,
				poolAddress,
				tokenAddress,
			},
		)
	)
}


/**
 * EVM
 */
export namespace Evm {
	/**
	 * /evm/chains
	 * 
	 * Returns a list with the names of the EVM blockchains currently supported by this API. Use the provided chain names when calling other endpoints.
	 * 
	 * {@link https://docs.noves.fi/reference/get_evm-chains-2}
	 */
	export const getChains = async () => (
		await request<
			{
				name: string | null
				ecosystem: 'evm'
				evmChainId: int64 | null
			}[]
		>(
			'evm/chains',
		)
	)

	/**
	 * /evm/price
	 * 
	 * This is our main / general pricing endpoint.
	 * 
	 * It returns the price for any token or lpToken at the given block/timestamp. If no block or timestamp is passed, the price for the latest block will be returned.
	 * 
	 * {@link https://docs.noves.fi/reference/get_evm-price}
	 */
	export const getPrice = async ({
		chain,
		tokenAddress,
		priceType,
		timestamp,
		blockNumber,
	}: {
		// Path Params
		/** The chain to query */
		chain: string
		/** The address of the token to price */
		tokenAddress: Ethereum.ContractAddress

		// Query Params
		/** Possible values: dexHighestLiquidity */
		priceType?: 'dexHighestLiquidity'
		timestamp?: int64
		blockNumber?: int64
	}) => (
		await request<
			{
				chain: string | null
				block: string | null
				token: {
					address: string | null
					symbol: string | null
					name: string | null
				}
				price: {
					amount: string | null
					currency: string | null
					status: string | null
				}
				pricedBy: {
					poolAddress: string | null
					exchange: Exchange
					liquidity: double | null
					baseToken: BaseToken
				}
				priceType: string | null
				priceStatus: string | null
			}
		>(
			'evm/price',
			{
				chain,
				tokenAddress,
				blockNumber,
				priceType,
				timestamp,
			},
		)
	)

	/**
	 * /evm/priceFromPool
	 * 
	 * This is an endpoint with narrow functionality, used mostly by pricing oracles and similar systems.
	 * 
	 * Given a liquidity pool address and a token address, it returns the current price for the requested token (baseToken) in the pool, in terms of the other token (quoteToken) in the pool.
	 * 
	 * {@link https://docs.noves.fi/reference/get_evm-chain-pricefrompool-pooladdress-basetokenaddress}
	 */
	export const priceFromPool = async ({
		chain,
		poolAddress,
		baseTokenAddress,
	}: {
		/** The chain to query */
		chain: string
		/** The address of the pool contract */
		poolAddress: Ethereum.ContractAddress
		/** The address of the token to price */
		baseTokenAddress: Ethereum.ContractAddress
	}) => (
		await request<
			{
				chain: string | null
				exchange: {
					name: string | null
				}
				poolAddress: string | null
				baseToken: {
					address: string | null
					symbol: string | null
					name: string | null
					decimals: int32
				}
				quoteToken: {
					address: string | null
					symbol: string | null
					name: string | null
					decimals: int32
				}
				price: {
					amount: string | null
				}
			}
		>(
			'evm/priceFromPool',
			{
				chain,
				poolAddress,
				baseTokenAddress,
			},
		)
	)

	/**
	 * /evm/preFetch
	 * 
	 * Takes an array of tokens that need pricing. Each token needs an address, a chain identifier, and the type of price desired.
	 * 
	 * Valid values for 'priceType' are: dexHighestLiquidity, coingecko.
	 * 
	 * For the 'chain' field, pull the list of valid names from the /chains endpoint.
	 * 
	 * Block number or timestamp are optional (you only need to pass one of those, or none if you want to pre-fetch the token for current time).
	 * 
	 * Returns an array of results for each token that you passed. If any of the results have a status of "findingSolution", you can call the regular /price endpoint for a final answer on that token in about ~2 minutes.
	 * 
	 * {@link https://docs.noves.fi/reference/post_evm-prefetch}
	 */
	export const preFetch = async ({
		tokens,
	}: {
		// Body Params
		tokens: {
			tokenAddress: string | null
			chain: string | null 
			priceType: string | null
			timestamp: int64
			blockNumber: int64 | null
		}[]
	}) => (
		await request<
			{
				tokens: {
					request: {
						tokenAddress: string | null
						chain: string | null
						priceType: string | null
						timestamp: int64 | null
						blockNumber: int64 | null
					}
					result: {
						blockNumber: int64 | null
						priceStatus: string | null
						token: {
							price: string | null
							priceType: string | null
							pricedBy: {
								error: string | null
							}
						}
					}
					error: string | null
				}[]
			}
		>(
			'evm/preFetch',
			{},
			'POST',
			{
				tokens,
			},
		)
	)
}


/**
 * Move
 */
export namespace Move {
	/**
	 * /move/chains
	 * 
	 * Returns a list with the names of the Move blockchains currently supported by this API.
	 * Use the provided chain names when calling other endpoints.
	 * 
	 * {@link https://docs.noves.fi/reference/get_move-chains}
	 */
	export const getChains = async () => (
		await request<
			{
				name: string | null
				ecosystem: 'move'
			}[]
		>(
			'move/chains',
		)
	)

	/**
	 * /priceFromPool
	 * 
	 * Given a liquidity pool address and a token address, returns the current price for the requested token (baseToken) in the pool, in terms of the other token (quoteToken) in the pool.
	 * 
	 * {@link https://docs.noves.fi/reference/get_move-chain-pricefrompool-pooladdress-basetokenaddress}
	 */
	export const priceFromPool = async ({
		chain,
		poolAddress,
		baseTokenAddress,
	}: {
		// Path Params
		/** The chain to query */
		chain: string
		/** The address of the pool contract */
		poolAddress: string
		/** The address of the token to price */
		baseTokenAddress: string
	}) => (
		await request<
			{
				chain: string | null
				exchange: {
					name: string | null
				}
				poolAddress: string | null
				baseToken: {
					address: string | null
					symbol: string | null
					name: string | null
					decimals: int32
				}
				quoteToken: {
					address: string | null
					symbol: string | null
					name: string | null
					decimals: int32
				}
				price: {
					amount: string | null
				}
			}
		>(
			`move/${chain}/priceFromPool/${poolAddress}/${baseTokenAddress}`,
		)
	)
}
