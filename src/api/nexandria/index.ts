/**
 * Nexandria API (2024-03-03)
 * @link https://docs.nexandria.com/address-endpoints/statement
 */

import * as publicEnv from '$env/static/public'

import { ConcurrentPromiseQueue } from '$/utils/ConcurrentPromiseQueue'

const queue = new ConcurrentPromiseQueue(1)

const get = async <T>(
	endpoint: string,
	params?: Record<string, string | number | boolean | undefined>,
) => {
	const searchParams = new URLSearchParams(
		Object.entries(params as Record<string, string>)
			.filter(([, value]) => value !== undefined)
	)
	const response = await queue.enqueue(() => (
		fetch(`https://api.nexandria.com/${endpoint}/?${`${searchParams}`}`, {
			headers: {
				'accept': 'application/json',
				'API-Key': publicEnv.PUBLIC_NEXANDRIA_API_KEY
			}
		})
	))

	if(!response.ok)
		throw await response.json()

	return await response.json() as T
}


// Types
import type { Ethereum } from '$/data/networks/types'



// Constants

/**
 * Chains supported
 * @link https://docs.nexandria.com/overview/chains-supported
 */
export const supportedChains: Record<Ethereum.ChainID, string> = {
	1: 'eth',
	169: 'manta-pacific',
	8453: 'base',
}



/**
 * Address Endpoints
 */


/**
 * Statement
 * @link https://docs.nexandria.com/address-endpoints/statement
 * 
 * This endpoint builds a Statement view, including all balance change transactions for a given address grouped by tokens.
 * 
 * Token standards covered: Native, ERC-20. [ERC-721 and ERC-1155 support is coming soon].
 * 
 * @param allow_contract
 *  * comma separated allow list of EVM addresses including “0x”
 *  * only the transfers for the specified contracts (i.e. tokens) are returned
 *  * use "`native`" to specify the native currency
 *  * supports only ERC20 contracts [ERC-721, ERC-1155 support coming soon]
 *  * if empty, all the transfers will be returned
 *  * do not specify both this and `block_contract`
 * 
 * @param allow_cp
 *  * comma separated allow list of chain IDscomma separated allow list of EVM addresses including “0x”
 *  * only the transfers originating from or going to the specified counterparty address(es) are returned
 *  * use "`native`" to specify the Zero address, typically used for fee/burn/mint transactions
 *  * if empty, all the transfers will be returned
 *  * do not specify both this and `block_cp`
 * 
 * @param block_contract
 *  * comma separated block list of EVM addresses including “0x”
 *  * transfers for the specified contracts (i.e. tokens) are not returned
 *  * use "`native`" to specify the native currency
 *  * supports only ERC20 contracts [ERC-721, ERC-1155 support coming soon]
 *  * if empty, all the transfers will be returned
 *  * do not specify both this and `allow_contract`
 * 
 * @param block_cp
 *  * comma separated allow list of chain IDscomma separated allow list of EVM addresses including “0x”
 *  * transfers originating from or going to the specified counterparty address(es) are not returned
 *  * use "`native`" to specify the Zero address, typically used for fee/burn/mint transactions
 *  * if empty, all the transfers will be returned
 *  * do not specify both this and `allow_cp`
 * 
 * 
 * Over a block range
 * @link https://docs.nexandria.com/address-endpoints/statement/over-a-block-range
 * 
 * Additional query Params
 * These are specific to Statement retrieval over a block range.
 * @param from starting block
 *  * Default value: 0
 * @param to ending block
 *  * Default value: latest
 * 
 * 
 * Over a time range
 * @link https://docs.nexandria.com/address-endpoints/statement/over-a-time-range
 * 
 * Additional query Params
 * These are specific to retrieval over a time range.
 * @param from_ts starting timestamp
 *  * Default value: 0
 * @param to_ts ending timestamp
 *  * Default value: now
 */
export const getStatement = async ({
	network,
	address,
	allowContract,
	blockContract,
	allowContractPositions,
	blockContractPositions,
	fromBlock,
	toBlock,
	fromTimestamp,
	toTimestamp,
}: (
	& {
		network: Ethereum.Network,
		address: Ethereum.Address,
	}
	& (
		| {
			allowContract: (Ethereum.ContractAddress | 'native')[],
			blockContract?: undefined,
		}
		| {
			allowContract?: undefined,
			blockContract: (Ethereum.ContractAddress | 'native')[]
		}
	)
	& (
		| {
			allowContractPositions?: (Ethereum.ContractAddress | 'native')[],
			blockContractPositions?: undefined,
		}
		| {
			allowContractPositions?: undefined,
			blockContractPositions?: (Ethereum.ContractAddress | 'native')[],
		}
	)
	& (
		| {
			fromBlock?: number | 'latest',
			toBlock?: number | 'latest',
			fromTimestamp?: undefined,
			toTimestamp?: undefined,
		}
		| {
			fromBlock?: undefined,
			toBlock?: undefined,
			fromTimestamp?: number,
			toTimestamp?: number,
		}
	)
)) => {
	if(!(network.chainId in supportedChains))
		throw new Error(`Nexandria doesn't currently support ${network.name}.`)

	return await get<{
		owner_info: {
			address: Ethereum.Address,
		},
		range: {
			from: {
				number: number,
				unix_timestamp: number,
			},
			to: {
				number: number,
				unix_timestamp: number,
			},
		},
		tokens: {
			end_balance: string,
			start_balance: string,
			token_info: {
				address: Ethereum.ContractAddress,
				name: string,
				symbol: string,
			},
			transfers: {
				amount: string,
				block: {
					number: number,
					unix_timestamp: number,
				},
				labels: string[],
				counterpart?: {
					address: Ethereum.Address,
				},
			}[],
		}[],
	}>(`${supportedChains[network.chainId]}/v1/address/${address}/statement`, {
		allow_contract: allowContract?.join(','),
		block_contract: blockContract?.join(','),
		allow_cp: allowContractPositions?.join(','),
		block_cp: blockContractPositions?.join(','),
		from: fromBlock,
		to: toBlock,
		from_ts: fromTimestamp,
		to_ts: toTimestamp,
	})
}


/**
 * Neighbors
 * @link https://docs.nexandria.com/address-endpoints/neighbors
 * 
 * The ultimate Social Graph endpoint - this returns a list of all the neighbors, i.e. the addresses the given address has interacted with, along with all the transfers to/from those neighbors. This can help you build your social applications quickly at a very low cost.
 * 
 * Token standards covered when determining neighbors: Native, ERC-20. [ERC-721 and ERC-1155 support is coming soon].
 * 
 * @param allow_contract
 *  * comma separated allow list of EVM addresses including “0x”
 *  * only the transfers for the specified contracts (i.e. tokens) are considered while identifying the neighbors
 *  * use "`native`" to specify the native currency
 *  * supports only ERC20 contracts [ERC-721, ERC-1155 support coming soon]
 *  * if empty, all the transfers will be returned
 *  * do not specify both this and `block_contract`
 * 
 * @param allow_cp
 *  * comma separated allow list of chain IDscomma separated allow list of EVM addresses including “0x”
 *  * only the specified counterparties are returned in the list of neighbors
 *  * use "`native`" to specify the Zero address, typically used for fee/burn/mint transactions
 *  * if empty, all the neighbors will be returned
 *  * do not specify both this and `block_cp`
 * 
 * @param block_contract
 *  * comma separated block list of EVM addresses including “0x”
 *  * transfers for the specified contracts (i.e. tokens) are not considered while identifying the neighbors
 *  * use "`native`" to specify the native currency
 *  * supports only ERC20 contracts [ERC-721, ERC-1155 support coming soon]
 *  * if empty, all the transfers will be considered to identify the neighbors
 *  * do not specify both this and `allow_contract`
 * 
 * @param block_cp
 *  * comma separated block list of chain IDscomma separated block list of EVM addresses including “0x”
 *  * specified counterparties are blocked from the list of neighbors
 *  * use "`native`" to specify the Zero address, typically used for fee/burn/mint transactions
 *  * if empty, all the neighbors will be returned
 *  * do not specify both this and `allow_cp`
 * 
 * @param details
 *  * a list of neighbors, along with the details of all the transfers (token, block, amount) with each neighbor, are returned by default
 *  * use "`summary`" to get only a high level summary. It returns a list of neighbors along with only the number of transfers to and from that neighbor.
 * 
 * 
 * Over a block range
 * @link https://docs.nexandria.com/address-endpoints/neighbors/over-a-block-range
 * 
 * Additional query Params
 * These are specific to Neighbors retrieval over a block range.
 * @param from starting block
 *  * Default value: 0
 * @param to ending block
 *  * Default value: latest
 * 
 * 
 * Over a time range
 * @link https://docs.nexandria.com/address-endpoints/neighbors/over-a-time-range
 * 
 * Additional query Params
 * These are specific to Neighbors retrieval over a time range.
 * @param from_ts starting timestamp
 *  * Default value: 0
 * @param to_ts ending timestamp
 *  * Default value: now
 */
export const getNeighbors = async ({
	network,
	address,
	allowContract,
	blockContract,
	allowContractPositions,
	blockContractPositions,
	details,
	fromBlock,
	toBlock,
	fromTimestamp,
	toTimestamp,
}: (
	& {
		network: Ethereum.Network,
		address: Ethereum.Address,
	}
	& (
		| {
			allowContract: (Ethereum.ContractAddress | 'native')[],
			blockContract?: undefined,
		}
		| {
			allowContract?: undefined,
			blockContract: (Ethereum.ContractAddress | 'native')[]
		}
	)
	& (
		| {
			allowContractPositions?: (Ethereum.ContractAddress | 'native')[],
			blockContractPositions?: undefined,
		}
		| {
			allowContractPositions?: undefined,
			blockContractPositions?: (Ethereum.ContractAddress | 'native')[],
		}
	)
	& {
		details?: 'summary',
		fromBlock?: number | 'latest',
		toBlock?: number | 'latest',
		fromTimestamp?: number,
		toTimestamp?: number,
	}
)) => {
	if(!(network.chainId in supportedChains))
		throw new Error(`Nexandria doesn't currently support ${network.name}.`)

	return await get<{
		neighbors: {
			neighbor_info: {
				address: Ethereum.Address,
			},
			transfers: {
				amount: string,
				block: {
					number: number,
					unix_timestamp: number,
				},
				labels: string[],
				token: {
					address: Ethereum.ContractAddress,
					name: string,
					symbol: string,
				},
			}[],
		}[],
		owner_info: {
			address: Ethereum.Address,
		},
		range: {
			from: {
				number: number,
				unix_timestamp: number,
			},
			to: {
				number: number,
				unix_timestamp: number,
			},
		},
	}>(`${supportedChains[network.chainId]}/v1/address/${address}/neighbors`, {
		allow_contract: allowContract?.join(','),
		block_contract: blockContract?.join(','),
		allow_cp: allowContractPositions?.join(','),
		block_cp: blockContractPositions?.join(','),
		details,
		from: fromBlock,
		to: toBlock,
		from_ts: fromTimestamp,
		to_ts: toTimestamp,
	})
}


/**
 * Timeseries of balances
 * @link https://docs.nexandria.com/address-endpoints/timeseries-of-balances
 * 
 * This API gives access to balances of all the tokens for a given address at any number of points in time, in a single fast RPC. The response also includes corresponding fiat values (in USD) for popular tokens.
 * 
 * Tokens covered: Native, ERC-20. [ERC-721 and ERC-1155 support is coming soon].
 * 
 * 
 * For specific blocks
 * @link https://docs.nexandria.com/address-endpoints/timeseries-of-balances/for-specific-blocks
 * @param blocks
 *  * comma separate list of blocks at which to retrieve the balances
 * @param details
 *  * Default value: all
 *  * specify “&details=summary” to get only the block number, timestamp & fiat value back
 * 
 * 
 * For specific timestamps
 * @link https://docs.nexandria.com/address-endpoints/timeseries-of-balances/for-specific-timestamps
 * @param num
 * 	* number of data points
 * @param span
 *  * specifies the time duration between two points
 *  * possible values of units: min, h, d, w, mo, yr
 *  * exactly one of span or range has to be specified. specifying both or specifying neither will return an error
 * 
 */
export const getTimeseriesOfBalances = async ({
	network,
	address,
	blocks,
	details,
	num,
	span,
	range,
	shift,
}: (
	& {
		network: Ethereum.Network,
		address: Ethereum.Address,
	}
	& (
		| {
			blocks: number[],
			details?: 'summary' | 'all',
		}
		| (
			& {
				num: number,
			}
			& (
				| {
					span: `${number}${'min' | 'h' | 'd' | 'w' | 'mo' | 'yr'}`,
				}
				| {
					range: `${number}${'min' | 'h' | 'd' | 'w' | 'mo' | 'yr'}`,
				}
			)
			& {
				shift: `${number}${'min' | 'h' | 'd' | 'w' | 'mo' | 'yr'}`,
			}
		)
	)
)) => {
	if(!(network.chainId in supportedChains))
		throw new Error(`Nexandria doesn't currently support ${network.name}.`)

	return await get<{
		data: {
			balances: (
				| {
					fiat_value: string,
					is_native: true,
					name: string,
					native_balance: `${number}`,
					symbol: string,
				}
				| {
					address: Ethereum.Address,
					name: string,
					native_balance: `${number}`,
					symbol: string,
				}
			)[],
			block: number,
			fiat_value: `${number}`,
			timestamp: number,
		}[],
	}>(`${supportedChains[network.chainId]}/v1/address/${address}/timeseries`, {
		network: supportedChains[network.chainId]!,
		blocks: blocks.join(','),
		details,
		num,
		span,
		range,
		shift,
	})
}


/**
 * Point-in-time balances
 * @link https://docs.nexandria.com/address-endpoints/point-in-time-balances
 * 
 * This endpoint returns the balances of all the tokens at the specified block for the given address. Includes fiat values (in USD) for the popular tokens.
 * 
 * Token standards covered: Native, ERC-20, ERC-721. [ERC-1155 support coming soon]
 * 
 * @param block
 *  * the block at which the balance is requested
 *  * Default value: latest
 */
export const getPointInTimeBalances = async ({
	network,
	address,
	block,
}: {
	network: Ethereum.Network,
	address: Ethereum.Address,
	block?: number | 'latest',
}) => {
	if(!(network.chainId in supportedChains))
		throw new Error(`Nexandria doesn't currently support ${network.name}.`)

	return await get<{
		tokens: (
			| {
				is_native: true,
				name: string,
				symbol: string,
				native_balance: `${number}`,
				fiat_value: string,
				token_type: 'NATIVE',
			}
			| {
				address: Ethereum.Address,
				name: string,
				sub_tokens?: {
					raw_id: `#0x${string}` | `#${number}`,
				}[],
				symbol: string,
				native_balance: `${number}`,
				token_type: 'ERC20',
			}
		)[],
	}>(`${supportedChains[network.chainId]}/v1/address/${address}/balances`, {
		block,
	})
}
