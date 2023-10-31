import type { Ethereum } from '../../data/networks/types'
import { env } from '../../env'

type integer = number

type NftCollection = {
	contract_address: Ethereum.ContractAddress,
	exchange_name: string,
	floor_price: string,
	floor_price_change: number,
	last_floor_price: string,
	latest_trade_time: string,
	sales: integer,
	volume: string,
}

const request = async (
	endpoint: string,
	params: Record<string, string | number | undefined>,
) => (
	await fetch(`https://api.chainbase.online/v1/${endpoint}?${new URLSearchParams(Object.entries(params).filter(([_, value]) => value)).toString()}`, {
		method: 'GET', 
		headers: {
			accept: 'application/json',
			'x-api-key': env.CHAINBASE_API_KEY,
		},
	})
		.then(response => response.json())
)

// Balance API

// Token Balances

/**
 * Get native token balances
 * @description Returns the balance for a specified address.
 * @link https://docs.chainbase.com/reference/getaccountbalance
 * 
 * @param chain_id @type {integer} required chain network id, see [list of details](https://docs.chainbase.com/reference/supported-chains)
 * @param address @type {string} required A hex string referencing a wallet address
 * @param to_block @type {string} block decimal number, hex number or 'latest'
 */
export const getNativeTokenBalance = async ({
	chainId,
	address,
	toBlock,
}: {
	chainId: integer,
	address: Ethereum.Address,
	toBlock?: `${integer}` | `0x${string}` | 'latest',
}) => (
	await request('account/balance', {
		chain_id: chainId,
		address,
		to_block: toBlock,
	}) as {
		code: integer,
		message: string,
		data: string,
	}
)

/**
 * Get ERC20 token balances
 * @description Retrieve all token balances for all ERC20 tokens for a specified address.
 * By default, it will return all token balances for all ERC20 tokens that the address has ever received.
 * You can specify a contract address to check the balance of a non-standard contract.
 * @link https://docs.chainbase.com/reference/getaccounttokens
 * 
 * @param chain_id @type {integer} required chain network id, see [list of details](https://docs.chainbase.com/reference/supported-chains)
 * @param address @type {string} required A hex string referencing a wallet address
 * @param contract_address @type {string} The address of the token contract
 * @param limit @type {integer} The number of results to return
 * @param page @type {integer} The page number to return
 */
export const getErc20TokenBalances = async ({
	chainId,
	address,
	contractAddress,
	limit,
	page,
}: {
	chainId: integer,
	address: Ethereum.Address,
	contractAddress?: Ethereum.ContractAddress,
	limit?: integer,
	page?: integer,
}) => (
	await request('account/tokens', {
		chain_id: chainId,
		address,
		contract_address: contractAddress,
		limit,
		page,
	}) as {
		code: integer,
		message: string,
		data: {
			contract_address: Ethereum.ContractAddress,
			decimals: integer,
			name: string,
			symbol: string,
			total_supply: string,
			logos: {
				uri: string,
				width: integer,
				height: integer,
			}[],
			urls: {
				name: string,
				url: string,
			}[],
			current_usd_price: integer,
			balance: string,
		}[],
		next_page?: integer,
		count: integer,
	}
)

// NFT Balances

/**
 * Get NFTs owned by address
 * @description Get the list of NFTs owned by an account.
 * @link https://docs.chainbase.com/reference/getaccountnfts
 * 
 * @param chain_id @type {integer} required chain network id, see [list of details](https://docs.chainbase.com/reference/supported-chains)
 * @param address @type {string} required A hex string referencing a wallet address
 * @param contract_address @type {string} The address of the NFT contract
 * @param page @type {integer} The page offset
 * @param limit @type {integer} The desired page size limit. Less or equal than 100
 */
export const getNftsByAddress = async ({
	chainId,
	address,
	contractAddress,
	page,
	limit,
}: {
	chainId: integer,
	address: Ethereum.Address,
	contractAddress?: Ethereum.ContractAddress,
	page?: integer,
	limit?: integer,
}) => (
	await request('account/nfts', {
		chain_id: chainId,
		address,
		contract_address: contractAddress,
		page,
		limit,
	}) as {
		code: integer,
		message: string,
		data: {
			contract_address: string,
			erc_type: string,
			metadata?: {
				name: string;
				description: string;
				created_by: string;
				image: string;
				image_details: {
					bytes: number;
					format: string;
					height: number;
					sha256: string;
					width: number;
				};
				image_url: string;
				attributes: {
					trait_type: string;
					value: string;
				}[];
			},
			mint_time: string,
			mint_transaction_hash: Ethereum.TransactionID,
			name: string,
			owner: Ethereum.Address,
			symbol: string,
			token_id: string,
			token_uri: string,
			image_uri: string,
			total: integer,
			total_string: string,
			traits?: string,
			rarity_score?: number,
			rarity_rank?: integer,
			floor_prices?: {
				value: string,
				symbol: string,
				address: string,
			}[],
		}[],
		next_page?: integer,
		count: integer,
	}
)


// NFT API

// NFT Transfers

/**
 * Get NFT transfers by collection
 * @description Get the historical transfer transactions for a specified contract address.
 * @link https://docs.chainbase.com/reference/getnfttransfers
 * 
 * @param chain_id @type {integer} required chain network id, see [list of details](https://docs.chainbase.com/reference/supported-chains)
 * @param contract_address @type {string} The address of the NFT contract
 * @param token_id @type {string} NFT token id in hex or num string
 * @param address @type {string} A hex string referencing a wallet address
 * @param from_block @type {string} Inclusive from block number (hex string or int)
 * @param to_block @type {string} Inclusive to block number (hex string, int, or 'latest')
 * @param from_timestamp @type {integer} Inclusive start timestamp
 * @param end_timestamp @type {integer} Inclusive end timestamp
 * @param page @type {integer} The page offset
 * @param limit @type {integer} The desired page size limit. Less or equal than 100
 */
export const getNftTransfers = async ({
	chainId,
	contractAddress,
	tokenId,
	address,
	fromBlock,
	toBlock,
	fromTimestamp,
	endTimestamp,
	page,
	limit,
}: {
	chainId: integer,
	contractAddress?: Ethereum.ContractAddress,
	tokenId?: string,
	address?: Ethereum.Address,
	fromBlock?: Ethereum.BlockNumber,
	toBlock?: Ethereum.BlockNumber,
	fromTimestamp?: integer,
	endTimestamp?: integer,
	page?: integer,
	limit?: integer,
}) => (
	await request('nft/transfers', {
		chain_id: chainId,
		contract_address: contractAddress,
		token_id: tokenId,
		address,
		from_block: fromBlock,
		to_block: toBlock,
		from_timestamp: fromTimestamp,
		end_timestamp: endTimestamp,
		page,
		limit,
	}) as {
		code: integer,
		message: string,
		data: {
			block_number: integer,
			block_timestamp: string,
			transaction_hash: string,
			transaction_index: integer,
			log_index: integer,
			from_address: Ethereum.Address,
			to_address: Ethereum.Address,
			operator_address: Ethereum.Address,
			token_id: string,
			value: string,
		}[],
		next_page?: integer,
		count: integer,
	}
)

// NFT Metadata

/** 
 * Get NFT Metadata
 * @description Get the metadata associated with the specified NFT.
 * @link https://docs.chainbase.com/reference/getnftmetadata
 * 
 * @param chain_id @type {integer} required chain network id, see [list of details](https://docs.chainbase.com/reference/supported-chains)
 * @param contract_address @type {string} The address of the NFT contract
 * @param token_id @type {string} NFT token id in hex or num string
 */
export const getNftMetadata = async ({
	chainID,
	contractAddress,
	tokenId,
}: {
	chainID: integer,
	contractAddress: Ethereum.ContractAddress,
	tokenId: string,
}) => (
	await request('nft/metadata', {
		chain_id: chainID,
		contract_address: contractAddress,
		token_id: tokenId,
	}) as {
		code: integer,
		message: string,
		data: {
			blockchain: string,
			contract_address: Ethereum.ContractAddress,
			token_id: string,
			erc_type: string,
			name: string,
			owner: string,
			symbol: string,
			image_uri: string,
			mint_time: integer,
			mint_transaction_hash: Ethereum.TransactionID,
			token_uri: string,
			metadata?: string,
			traits?: string,
			rarity_score?: number,
			rarity_rank?: integer,
		},
	}
)

/**
 * Get NFT rarity
 * @link https://docs.chainbase.com/reference/getnftmetadata
 * 
 * @param chain_id @type {integer} required chain network id, see [list of details](https://docs.chainbase.com/reference/supported-chains)
 * @param contract_address @type {string} The address of the NFT contract
 * @param token_id @type {string} NFT token id in hex or num string
 * @param rank_min @type {integer}
 * @param rank_max @type {integer}
 * @param page @type {integer} The page offset
 * @param limit @type {integer}
 */
export const getNftRarity = async ({
	chainId,
	contractAddress,
	tokenId,
	rankMin,
	rankMax,
	page,
	limit,
}: {
	chainId: integer,
	contractAddress: Ethereum.ContractAddress,
	tokenId?: string,
	rankMin?: integer,
	rankMax?: integer,
	page?: integer,
	limit?: integer,
}) => (
	await request('nft/rarity', {
		chain_id: chainId,
		contract_address: contractAddress,
		token_id: tokenId,
		rank_min: rankMin,
		rank_max: rankMax,
		page,
		limit,
	}) as {
		code: integer,
		message: string,
		data: {
			token_id: string,
			rank: integer,
			rank_share: integer,
			score: number,
			total_supply: integer,
			properties: {
				trait_type: string,
				value: string,
				rate: number,
				total: integer,
			}[],
		}[],
		next_page?: integer,
		count: integer,
	}
)

// NFT Collections

/**
 * Get NFT collection metadata
 * @description Query NFT collection metadata.
 * @link https://docs.chainbase.com/reference/getnftcollection
 * 
 * @param chain_id @type {integer} required chain network id, see [list of details](https://docs.chainbase.com/reference/supported-chains)
 * @param contract_address @type {string} required The address of the NFT contract
 */
export const getNftCollectionMetadata = async ({
	chainId,
	contractAddress,
}: {
	chainId: integer,
	contractAddress: Ethereum.ContractAddress,
}) => (
	await request('nft/collection', {
		chain_id: chainId,
		contract_address: contractAddress,
	}) as {
		code: integer,
		message: string,
		data: {
			contract_address: Ethereum.ContractAddress,
			name: string,
			symbol: string,
			description: string,
			owner: string,
			deploy_block_number?: integer,
			erc_type: string,
			banner_image_url: string,
			image_url: string,
			media_info?: string,
			traits?: string,
			floor_prices?: {
				value: string,
				symbol: string,
				address: string,
			}[],
		},
	}
)

/**
 * Get NFT collection items
 * @description Query NFT collection items metadata.
 * @link https://docs.chainbase.com/reference/getnftcollectionitems
 * 
 * @param chain_id @type {integer} required chain network id, see [list of details](https://docs.chainbase.com/reference/supported-chains)
 * @param contract_address @type {string} required The address of the NFT contract
 * @param page @type {integer} The page offset
 * @param limit @type {integer} The desired page size limit. Less or equal than 100
 */
export const getNftCollectionItems = async ({
	chainId,
	contractAddress,
	page = 1,
	limit = 10,
}: {
	chainId: integer,
	contractAddress: Ethereum.ContractAddress,
	page?: integer,
	limit?: integer,
}) => (
	await request('nft/collection/items', {
		chain_id: chainId,
		contract_address: contractAddress,
		page,
		limit,
	}) as {
		code: integer,
		message: string,
		data: {
			blockchain: string,
			contract_address: Ethereum.ContractAddress,
			token_id: string,
			erc_type: string,
			name: string,
			owner: string,
			symbol: string,
			image_uri: string,
			mint_time: integer,
			mint_transaction_hash: Ethereum.TransactionID,
			token_uri: string,
			metadata?: string,
			traits?: string,
			rarity_score?: number,
			rarity_rank?: integer,
		}[],
		next_page?: integer,
		count: integer,
	}
)

/**
 * Search for NFT collections using names and contract addresses
 * @description Return a list of NFT Collection search results.
 * Search by name or query a specified contract address.
 * 
 * @param chain_id @type {integer} required chain network id, see [list of details](https://docs.chainbase.com/reference/supported-chains)
 * @param name @type {string} required Fuzzy search for NFT names.
 * @param contract_address @type {string} Used to accurately query specified collection.
 * @param to_block @type {string} block decimal number, hex number or 'latest'
 * @param page @type {integer} The page offset
 * @param limit @type {integer} The desired page size limit. Less or equal than 100
 */
export const searchNftCollections = async ({
	chainId,
	name,
	contractAddress,
	toBlock,
	page,
	limit,
}: {
	chainId: integer,
	name: string,
	contractAddress?: Ethereum.ContractAddress,
	toBlock?: `${integer}` | `0x${string}` | 'latest',
	page?: integer,
	limit?: integer,
}) => (
	await request('nft/search', {
		chain_id: chainId,
		name,
		contract_address: contractAddress,
		to_block: toBlock,
		page,
		limit,
	}) as {
		code: integer,
		message: string,
		data: {
			blockchain: string,
			contract_address: Ethereum.ContractAddress,
			token_id: string,
			erc_type: string,
			name: string,
			owner: Ethereum.Address,
			symbol: string,
			image_uri: string,
			mint_time: integer,
			mint_transaction_hash: Ethereum.TransactionID,
			token_uri: string,
			metadata?: string,
			traits?: string,
			rarity_score?: number,
			rarity_rank?: integer,
		}[],
		next_page?: integer,
		count: integer,
	}
)

// NFT Ownership

/**
 * Get NFT owner by token
 * @description Get the current owner for a specified NFT token.
 * @link https://docs.chainbase.com/reference/getnftowner
 * 
 * @param chain_id @type {integer} required chain network id, see [list of details](https://docs.chainbase.com/reference/supported-chains)
 * @param contract_address @type {string} required The address of the NFT contract
 * @param token_id @type {string} required NFT token id in hex or num string
 * @param to_block @type {string} block decimal number, hex number or 'latest'
 */
export const getNftOwner = async ({
	chainId,
	contractAddress,
	tokenId,
	toBlock,
}: {
	chainId: integer,
	contractAddress: Ethereum.ContractAddress,
	tokenId: string,
	toBlock?: `${integer}` | `0x${string}` | 'latest',
}) => (
	await request('nft/owner', {
		chain_id: chainId,
		contract_address: contractAddress,
		token_id: tokenId,
		to_block: toBlock,
	}) as {
		code: integer,
		message: string,
		data: Ethereum.Address,
	}
)

/**
 * Get NFT owners by collection
 * @description Get all owners for a specified NFT collection.
 * @link https://docs.chainbase.com/reference/getnftowners
 * 
 * @param chain_id @type {integer} required chain network id, see [list of details](https://docs.chainbase.com/reference/supported-chains)
 * @param contract_address @type {string} required The address of the NFT contract
 * @param page @type {integer} The page offset
 * @param limit @type {integer} The desired page size limit. Less or equal than 100
 */
export const getNftOwners = async ({
	chainId,
	contractAddress,
	page,
	limit,
}: {
	chainId: integer,
	contractAddress: Ethereum.ContractAddress,
	page?: integer,
	limit?: integer,
}) => (
	await request('nft/owners', {
		chain_id: chainId,
		contract_address: contractAddress,
		page,
		limit,
	}) as {
		code: integer,
		message: string,
		data: {
			address: Ethereum.Address,
			total: integer,
		}[],
	}
)

/**
 * Get NFT owner history by token
 * @description Get the list of historical owner addresses for a specified NFT token.
 * @link https://docs.chainbase.com/reference/getnftownerhistory
 * 
 * @param chain_id @type {integer} required chain network id, see [list of details](https://docs.chainbase.com/reference/supported-chains)
 * @param contract_address @type {string} required The address of the NFT contract
 * @param token_id @type {string} required NFT token id in hex or num string
 * @param from_block @type {string} Inclusive from block number (hex string or int)
 * @param to_block @type {string} Inclusive to block number (hex string, int, or 'latest')
 * @param from_timestamp @type {integer} Inclusive start timestamp
 * @param end_timestamp @type {integer} Inclusive end timestamp
 * @param page @type {integer} The page offset
 * @param limit @type {integer} The desired page size limit. Less or equal than 100
 */
export const getNftOwnerHistory = async ({
	chainId,
	contractAddress,
	tokenId,
	fromBlock,
	toBlock,
	fromTimestamp,
	endTimestamp,
	page,
	limit,
}: {
	chainId: integer,
	contractAddress?: Ethereum.ContractAddress,
	tokenId?: string,
	fromBlock?: Ethereum.BlockNumber,
	toBlock?: Ethereum.BlockNumber,
	fromTimestamp?: integer,
	endTimestamp?: integer,
	page?: integer,
	limit?: integer,
}) => (
	await request('nft/owner/history', {
		chain_id: chainId,
		contract_address: contractAddress,
		token_id: tokenId,
		from_block: fromBlock,
		to_block: toBlock,
		from_timestamp: fromTimestamp,
		end_timestamp: endTimestamp,
		page,
		limit,
	}) as {
		code: integer,
		message: string,
		data: {
			block_number: integer,
			block_timestamp: string,
			transaction_hash: string,
			transaction_index: integer,
			log_index: integer,
			from_address: Ethereum.Address,
			to_address: Ethereum.Address,
			operator_address: Ethereum.Address,
			token_id: string,
			value: string,
		}[],
		next_page?: integer,
		count: integer,
	}
)

// NFT Marketplace Data

/**
 * Get floor price by collection
 * @description Get the current floor price of an NFT collection.
 * @link https://docs.chainbase.com/reference/getnftfloorprice
 * 
 * @param chain_id @type {integer} required chain network id, see [list of details](https://docs.chainbase.com/reference/supported-chains)
 * @param contract_address @type {string} required The address of the NFT contract
 */
export const getNftFloorPrice = async ({
	chainId,
	contractAddress,
}: {
	chainId: integer,
	contractAddress: Ethereum.ContractAddress,
}) => (
	await request('nft/floor_price', {
		chain_id: chainId,
		contract_address: contractAddress,
	}) as {
		code: integer,
		message: string,
		data: {
			floor_price: string,
			symbol: string,
			updated_at: string,
		},
	}
)

/**
 * Get trending collections by marketplace
 * @description Get the trending NFT collections on marketplaces over a period of time.
 * @link https://docs.chainbase.com/reference/getnftcollectiontrending
 * 
 * @param chain_id @type {integer} required chain network id, see [list of details](https://docs.chainbase.com/reference/supported-chains)
 * @param range @type {string} 1h, 12h, 24h, 1d, 7d, 15d, 30d, 60d, 90d, default 7d
 * @param exchange_name @type {string} 'opensea', 'x2y2', 'looksrare'. Default 'all'.
 * @param sort @type {string} volume_desc, volume_asc, sales_desc, sales_asc, floor_price_change_desc, floor_price_change_asc. Default volume_desc.
 * @param page @type {integer} The page offset
 * @param limit @type {integer} The desired page size limit. Less or equal than 100
 */
export const getNftTrendingCollections = async ({
	chainId,
	range = '7d',
	exchangeName = 'all',
	sort = 'volume_desc',
	page,
	limit,
}: {
	chainId: integer,
	range?: '1h' | '12h' | '24h' | '1d' | '7d' | '15d' | '30d' | '60d' | '90d',
	exchangeName?: 'opensea' | 'x2y2' | 'looksrare' | 'all',
	sort?: 'volume_desc' | 'volume_asc' | 'sales_desc' | 'sales_asc' | 'floor_price_change_desc' | 'floor_price_change_asc',
	page?: integer,
	limit?: integer,
}) => (
	await request('nft/collection/trending', {
		chain_id: chainId,
		range,
		exchange_name: exchangeName,
		sort,
		page,
		limit,
	}) as {
		code: integer,
		message: string,
		data: {
			avg_price: number,
			collection: NftCollection,
		}[],
		next_page?: integer,
		count: integer,
	}
)

// Token API

// Token Metadata

/**
 * Get token metadata
 * @description Get the metadata of a specified token.
 * @link https://docs.chainbase.com/reference/gettokenmetadata
 * 
 * @param chain_id @type {integer} required chain network id, see [list of details](https://docs.chainbase.com/reference/supported-chains)
 * @param contract_address @type {string} required The address of the token contract.
 */
export const getTokenMetadata = async ({
	chainId,
	contractAddress,
}: {
	chainId: integer,
	contractAddress: Ethereum.ContractAddress,
}) => (
	await request('token/metadata', {
		chain_id: chainId,
		contract_address: contractAddress,
	}) as {
		code: integer,
		message: string,
		data: {
			contract_address: Ethereum.ContractAddress,
			decimals: integer,
			name: string,
			symbol: string,
			total_supply?: string,
			logos: {
				uri: string,
				width: integer,
				height: integer,
			}[],
			urls: {
				name: string,
				url: string,
			}[],
			current_usd_price?: integer,
		},
	}
)

// Token Transfers

/**
 * Get token transfers by contract
 * @description Retrieves historical token transfer transactions for any ERC20 contract.
 * @link https://docs.chainbase.com/reference/gettokentransfers
 * 
 * @param chain_id @type {integer} required chain network id, see [list of details](https://docs.chainbase.com/reference/supported-chains)
 * @param contract_address @type {string} The address of the token contract
 * @param address @type {string} A hex string referencing a wallet address
 * @param from_block @type {string} Inclusive from block number (hex string or int)
 * @param to_block @type {string} Inclusive to block number (hex string, int, or 'latest')
 * @param from_timestamp @type {integer} Inclusive start timestamp
 * @param end_timestamp @type {integer} Inclusive end timestamp
 * @param page @type {integer} The page offset
 * @param limit @type {integer} The desired page size limit. Less or equal than 100
 */
export const getTokenTransfers = async ({
	chainId,
	contractAddress,
	address,
	fromBlock,
	toBlock,
	fromTimestamp,
	endTimestamp,
	page,
	limit,
}: {
	chainId: integer,
	contractAddress?: Ethereum.ContractAddress,
	address?: Ethereum.Address,
	fromBlock?: Ethereum.BlockNumber,
	toBlock?: Ethereum.BlockNumber,
	fromTimestamp?: integer,
	endTimestamp?: integer,
	page?: integer,
	limit?: integer,
}) => (
	await request('token/transfers', {
		chain_id: chainId,
		contract_address: contractAddress,
		address,
		from_block: fromBlock,
		to_block: toBlock,
		from_timestamp: fromTimestamp,
		end_timestamp: endTimestamp,
		page,
		limit,
	}) as {
		code: integer,
		message: string,
		data: {
			block_number: integer,
			block_timestamp: string,
			transaction_hash: string,
			transaction_index: integer,
			log_index: integer,
			from_address: Ethereum.Address,
			to_address: Ethereum.Address,
			value: string,
		}[],
		next_page?: integer,
		count: integer,
	}
)

// Token Holders

/**
 * Get token holders
 * @description Get the list of holders of the specified contract.
 * @link https://docs.chainbase.com/reference/gettokenholders
 * 
 * @param chain_id @type {integer} required chain network id, see [list of details](https://docs.chainbase.com/reference/supported-chains)
 * @param contract_address @type {string} required The address of the token contract
 * @param page @type {integer} The page offset
 * @param limit @type {integer} The desired page size limit. Less or equal than 100
 */
export const getTokenHolders = async ({
	chainId,
	contractAddress,
	page,
	limit,
}: {
	chainId: integer,
	contractAddress: Ethereum.ContractAddress,
	page?: integer,
	limit?: integer,
}) => (
	await request('token/holders', {
		chain_id: chainId,
		contract_address: contractAddress,
		page,
		limit,
	}) as {
		code: integer,
		message: string,
		data: Ethereum.Address[],
		next_page?: integer,
		count: integer,
	}
)

/**
 * Get top token holders
 * @description Get the list of top holders of the specified contract.
 * @link https://docs.chainbase.com/reference/gettokentopholders
 * 
 * @param chain_id @type {integer} required chain network id, see [list of details](https://docs.chainbase.com/reference/supported-chains)
 * @param contract_address @type {string} required The address of the token contract
 * @param page @type {integer} The page offset
 * @param limit @type {integer} The desired page size limit. Less or equal than 100
 */
export const getTokenTopHolders = async ({
	chainId,
	contractAddress,
	page,
	limit,
}: {
	chainId: integer,
	contractAddress: Ethereum.ContractAddress,
	page?: integer,
	limit?: integer,
}) => (
	await request('token/top-holders', {
		chain_id: chainId,
		contract_address: contractAddress,
		page,
		limit,
	}) as {
		code: integer,
		message: string,
		data: {
			wallet_address: Ethereum.Address,
			original_amount: string,
			amount?: string,
			usd_value?: string,
		}[],
		next_page?: integer,
		count: integer,
	}
)

// Market Data

/**
 * Get token price
 * @description Get the price of the specified token.
 * @link https://docs.chainbase.com/reference/gettokenprice
 * 
 * @param chain_id @type {integer} required chain network id, see [list of details](https://docs.chainbase.com/reference/supported-chains)
 * @param contract_address @type {string} required The address of the token contract
 */
export const getTokenPrice = async ({
	chainId,
	contractAddress,
}: {
	chainId: integer,
	contractAddress: Ethereum.ContractAddress,
}) => (
	await request('token/price', {
		chain_id: chainId,
		contract_address: contractAddress,
	}) as {
		code: integer,
		message: string,
		data: {
			price: number,
			symbol: string,
			decimals: integer,
			updated_at: string,
		},
	}
)

/**
 * Get token price history
 * @description Get the historical price of the specified token.
 * @link https://docs.chainbase.com/reference/gettokenpricehistory
 * 
 * @param chain_id @type {integer} required chain network id, see [list of details](https://docs.chainbase.com/reference/supported-chains)
 * @param contract_address @type {string} required The address of the token contract
 * @param from_timestamp @type {integer} Inclusive start timestamp
 * @param end_timestamp @type {integer} Inclusive end timestamp, the interval should not exceed 90 days
 */
export const getTokenPriceHistory = async ({
	chainId,
	contractAddress,
	fromTimestamp,
	endTimestamp,
}: {
	chainId: integer,
	contractAddress: Ethereum.ContractAddress,
	fromTimestamp: integer,
	endTimestamp: integer,
}) => (
	await request('token/price/history', {
		chain_id: chainId,
		contract_address: contractAddress,
		from_timestamp: fromTimestamp,
		end_timestamp: endTimestamp,
	}) as {
		code: integer,
		message: string,
		data: {
			price: number,
			symbol: string,
			decimals: integer,
			updated_at: string,
		}[],
	}
)

// Domain API

// ENS Domain Endpoints

/**
 * Get ENS domains
 * @description Gets a list of ENS domains held by a given address.
 * @link https://docs.chainbase.com/reference/getensdomains
 * 
 * @param chain_id @type {integer} required chain network id, see [list of details](https://docs.chainbase.com/reference/supported-chains)
 * @param address @type {string} required A hex string referencing a wallet address
 * @param to_block @type {string} block decimal number, hex number or 'latest'
 */
export const getEnsDomains = async ({
	chainId,
	address,
	toBlock,
}: {
	chainId: integer,
	address: Ethereum.Address,
	toBlock?: `${integer}` | `0x${string}` | 'latest',
}) => (
	await request('ens/domains', {
		chain_id: chainId,
		address,
		to_block: toBlock,
	}) as {
		code: integer,
		message: string,
		data: {
			name?: string,
			address?: Ethereum.Address,
			registrant?: Ethereum.Address,
			owner?: Ethereum.Address,
			resolver?: Ethereum.Address,
			registrant_time: string,
			expiration_time: string,
			token_id: string,
			text_records: {
				key: string,
				value: string,
			}[],
		}[],
	}
)

/**
 * Resolve ENS domain
 * @description Resolves a ETH address given an ENS Domain.
 * @link https://docs.chainbase.com/reference/getensrecords
 * 
 * @param chain_id @type {integer} required chain network id, see [list of details](https://docs.chainbase.com/reference/supported-chains)
 * @param domain @type {string} required ENS Domain
 * @param to_block @type {string} block decimal number, hex number or 'latest'
 */
export const resolveEnsDomain = async ({
	chainId,
	domain,
	toBlock,
}: {
	chainId: integer,
	domain: string,
	toBlock?: `${integer}` | `0x${string}` | 'latest',
}) => (
	await request('ens/records', {
		chain_id: chainId,
		domain,
		to_block: toBlock,
	}) as {
		code: integer,
		message: string,
		data: {
			name?: string,
			address?: Ethereum.Address,
			registrant?: Ethereum.Address,
			owner?: Ethereum.Address,
			resolver?: Ethereum.Address,
			registrant_time: string,
			expiration_time: string,
			token_id: string,
			text_records: {
				key: string,
				value: string,
			}[],
		},
	}
)

/**
 * Reverse resolve ENS domain
 * @description Reverse resolves a given ETH address to its ENS domain.
 * @link https://docs.chainbase.com/reference/getensreverse
 * 
 * @param chain_id @type {integer} required chain network id, see [list of details](https://docs.chainbase.com/reference/supported-chains)
 * @param address @type {string} required A hex string referencing a wallet address
 * @param to_block @type {string} block decimal number, hex number or 'latest'
 */
export const reverseResolveEnsDomain = async ({
	chainId,
	address,
	toBlock,
}: {
	chainId: integer,
	address: Ethereum.Address,
	toBlock?: `${integer}` | `0x${string}` | 'latest',
}) => (
	await request('ens/reverse', {
		chain_id: chainId,
		address,
		to_block: toBlock,
	}) as {
		code: integer,
		message: string,
		data: {
			name?: string,
			address?: Ethereum.Address,
			registrant?: Ethereum.Address,
			owner?: Ethereum.Address,
			resolver?: Ethereum.Address,
			registrant_time: string,
			expiration_time: string,
			token_id: string,
			text_records: {
				key: string,
				value: string,
			}[],
		},
	}
)

// SPACE ID Domain Endpoints

/**
 * Resolve SPACE ID domain
 * @description Resolves a BNB address given an BNB Domain.
 * @link https://docs.chainbase.com/reference/getspaceidrecords
 * 
 * @param chain_id @type {integer} required chain network id, see [list of details](https://docs.chainbase.com/reference/supported-chains)
 * @param domain @type {string} required SPACE ID domain
 * @param to_block @type {string} block decimal number, hex number or 'latest'
 */
export const resolveSpaceIdDomain = async ({
	chainId,
	domain,
	toBlock,
}: {
	chainId: integer,
	domain: string,
	toBlock?: `${integer}` | `0x${string}` | 'latest',
}) => (
	await request('space-id/records', {
		chain_id: chainId,
		domain,
		to_block: toBlock,
	}) as {
		code: integer,
		message: string,
		data: {
			name?: string,
			address?: Ethereum.Address,
			registrant?: Ethereum.Address,
			owner?: Ethereum.Address,
			resolver?: Ethereum.Address,
			registrant_time: string,
			expiration_time: string,
			token_id: string,
			text_records: {
				key: string,
				value: string,
			}[],
		},
	}
)

/**
 * Reverse resolve SPACE ID domain
 * @description Reverse resolves a given BNB address to its SPACE ID domain.
 * @link https://docs.chainbase.com/reference/getspaceidreverse
 * 
 * @param chain_id @type {integer} required chain network id, see [list of details](https://docs.chainbase.com/reference/supported-chains)
 * @param address @type {string} required A hex string referencing a wallet address
 * @param to_block @type {string} block decimal number, hex number or 'latest'
 */
export const reverseResolveSpaceIdDomain = async ({
	chainId,
	address,
	toBlock,
}: {
	chainId: integer,
	address: Ethereum.Address,
	toBlock?: `${integer}` | `0x${string}` | 'latest',
}) => (
	await request('space-id/reverse', {
		chain_id: chainId,
		address,
		to_block: toBlock,
	}) as {
		code: integer,
		message: string,
		data: {
			name?: string,
			address?: Ethereum.Address,
			registrant?: Ethereum.Address,
			owner?: Ethereum.Address,
			resolver?: Ethereum.Address,
			registrant_time: string,
			expiration_time: string,
			token_id: string,
			text_records: {
				key: string,
				value: string,
			}[],
		},
	}
)

// Basic API

// Block

/**
 * Get latest block number
 * @description Get the latest block height of blockchain network.
 * @link https://docs.chainbase.com/reference/getblocknumberlatest
 * 
 * @param chain_id @type {integer} required chain network id, see [list of details](https://docs.chainbase.com/reference/supported-chains)
 */
export const getBlockNumberLatest = async ({
	chainId,
}: {
	chainId: integer,
}) => (
	await request('block/number/latest', {
		chain_id: chainId,
	}) as {
		code: integer,
		message: string,
		data: {
			number: integer,
			hash: string,
		},
	}
)

/**
 * Get block by number
 * @description Get the detail of a block by the given block humber.
 * 
 * @param chain_id @type {integer} required chain network id, see [list of details](https://docs.chainbase.com/reference/supported-chains)
 * @param number @type {string} required Block number
 */
export const getBlockByNumber = async ({
	chainId,
	number,
}: {
	chainId: integer,
	number: Ethereum.BlockNumber,
}) => (
	await request('block/detail', {
		chain_id: chainId,
		number,
	}) as {
		code: integer,
		message: string,
		data: {
			number: integer,
			hash: string,
			parent_hash: string,
			timestamp: string,
			difficulty: string,
			extra_data: string,
			gas_limit: integer,
			gas_used: integer,
			base_fee_per_gas: integer,
			miner: string,
			mix_hash: string,
			nonce: string,
			receipts_root: string,
			sha3_uncles: string,
			size: integer,
			state_root: string,
			transactions_root: string,
			transactions_count: integer,
			uncles_count: integer,
			withdrawals_count: integer,
		},
	}
)

// Transaction

/**
 * Get transaction
 * @description Get the detail of a transaction given the transaction hash.
 * Provide the param "hash" or ("block_number" and "tx_index"). If both params are provided, "hash" will be used.
 * 
 * @param chain_id @type {integer} required chain network id, see [list of details](https://docs.chainbase.com/reference/supported-chains)
 * @param hash @type {string} The transaction hash
 * @param block_number @type {string} Block number of the transaction
 * @param tx_index @type {string} Index of the transaction
 */
export const getTransaction = async ({
	chainId,
	hash,
	blockNumber,
	txIndex,
}: {
	chainId: integer,
	hash?: Ethereum.TransactionID,
	blockNumber?: Ethereum.BlockNumber,
	txIndex?: integer,
}) => (
	await request('tx/detail', {
		chain_id: chainId,
		hash,
		block_number: blockNumber,
		tx_index: txIndex,
	}) as {
		code: integer,
		message: string,
		data: {
			type: integer,
			status: integer,
			block_number: integer,
			block_timestamp: string,
			transaction_hash: Ethereum.TransactionID,
			transaction_index: integer,
			from_address: Ethereum.Address,
			to_address: Ethereum.Address,
			value: string,
			input: string,
			nonce: integer,
			contract_address: Ethereum.ContractAddress,
			gas: integer,
			gas_price: integer,
			gas_used: integer,
			effective_gas_price: integer,
			cumulative_gas_used: integer,
			max_fee_per_gas: integer,
			max_priority_fee_per_gas: integer,
			tx_fee: integer,
			saving_fee: integer,
			burnt_fee: integer,
		},
	}
)

/**
 * Get transactions by account
 * @description Returns the transactions from the address.
 * 
 * @param chain_id @type {string} required chain network id, see [list of details](https://docs.chainbase.com/reference/supported-chains)
 * @param address @type {string} required A hex string referencing a wallet address
 * @param from_block @type {string} Inclusive from block number (hex string or int)
 * @param to_block @type {string} Inclusive to block number (hex string, int, or 'latest')
 * @param from_timestamp @type {integer} Inclusive from block number (hex string or int)
 * @param end_timestamp @type {integer} Inclusive end timestamp
 * @param page @type {integer} The page offset
 * @param limit @type {integer} The desired page size limit. Less or equal than 100
 */
export const getTransactionsByAccount = async ({
	chainId,
	address,
	fromBlock,
	toBlock,
	fromTimestamp,
	endTimestamp,
	page,
	limit,
}: {
	chainId: integer,
	address: Ethereum.Address,
	fromBlock?: Ethereum.BlockNumber,
	toBlock?: Ethereum.BlockNumber,
	fromTimestamp?: integer,
	endTimestamp?: integer,
	page?: integer,
	limit?: integer,
}) => (
	await request('account/txs', {
		chain_id: chainId,
		address,
		from_block: fromBlock,
		to_block: toBlock,
		from_timestamp: fromTimestamp,
		end_timestamp: endTimestamp,
		page,
		limit,
	}) as {
		code: integer,
		message: string,
		data: {
			block_number: integer,
			block_timestamp: string,
			transaction_hash: string,
			transaction_index: integer,
			log_index: integer,
			from_address: Ethereum.Address,
			to_address: Ethereum.Address,
			value: string,
		}[],
		next_page?: integer,
		count: integer,
	}
)

// Events

/**
 * Get events by contract
 * @description Gets the list of events for the specified contract.
 * 
 * @param chain_id @type {string} required chain network id, see [list of details](https://docs.chainbase.com/reference/supported-chains)
 * @param contract_address @type {string} required A hex string referencing a contract address
 * @param from_block @type {string} Inclusive from block number (hex string or int)
 * @param to_block @type {string} Inclusive to block number (hex string, int, or 'latest')
 * @param from_timestamp @type {integer} Inclusive from block number (hex string or int)
 * @param end_timestamp @type {integer} Inclusive end timestamp
 * @param page @type {integer} The page offset
 * @param limit @type {integer} The desired page size limit. Less or equal than 100
 */
export const getEventsByContract = async ({
	chainId,
	contractAddress,
	fromBlock,
	toBlock,
	fromTimestamp,
	endTimestamp,
	page,
	limit,
}: {
	chainId: integer,
	contractAddress: Ethereum.ContractAddress,
	fromBlock?: Ethereum.BlockNumber,
	toBlock?: Ethereum.BlockNumber,
	fromTimestamp?: integer,
	endTimestamp?: integer,
	page?: integer,
	limit?: integer,
}) => (
	await request('contract/events', {
		chain_id: chainId,
		contract_address: contractAddress,
		from_block: fromBlock,
		to_block: toBlock,
		from_timestamp: fromTimestamp,
		end_timestamp: endTimestamp,
		page,
		limit,
	}) as {
		code: integer,
		message: string,
		data: {
			block_number: integer,
			block_timestamp: string,
			transaction_hash: string,
			transaction_index: integer,
			log_index: integer,
			from_address: Ethereum.Address,
			to_address: Ethereum.Address,
			value: string,
		}[],
		next_page?: integer,
		count: integer,
	}
)

/**
 * Contract call
 * @description Calls a specific function for the specified contract.
 * 
 * @param chain_id @type {string} required chain network id, see [list of details](https://docs.chainbase.com/reference/supported-chains)
 * @param contract_address @type {string} required A hex string referencing a contract address
 * @param function_name @type {string} required The name of the function to call
 * @param abi @type {string} required The ABI of the contract
 * @param params @type {string} required The parameters of the function to call
 * @param to_block @type {string} Inclusive to block number (hex string, int, or 'latest')
 */
// export const contractCall = async ({
// 	chainId,
// 	contractAddress,
// 	functionName,
// 	abi,
// 	params,
// 	toBlock,
// }: {
// 	chainId: integer,
// 	contractAddress: Ethereum.ContractAddress,
// 	functionName: string,
// 	abi: string,
// 	params: string[],
// 	toBlock?: Ethereum.BlockNumber,
// }) => (
// 	await post('contract/call', {
// 		chain_id: chainId,
// 		contract_address: contractAddress,
// 		function_name: functionName,
// 		abi,
// 		params,
// 		to_block: toBlock,
// 	}) as {
// 		code: integer,
// 		message: string,
// 		data: {
// 			block_number: integer,
// 			block_timestamp: string,
// 			transaction_hash: string,
// 			transaction_index: integer,
// 			log_index: integer,
// 			from_address: Ethereum.Address,
// 			to_address: Ethereum.Address,
// 			value: string,
// 		}[],
// 		next_page?: integer,
// 		count: integer,
// 	}
// )


export const normalizeNftContracts = (nfts: Awaited<ReturnType<typeof getNftsByAddress>>['data']): Ethereum.NftContractWithNfts[] => (console.log({nfts})||
	[
		...nfts
			?.groupToMap(nft => nft.contract_address)
			.entries()
		?? []
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
					attributes: nft.metadata?.attributes,
				}
			})),
		}))
)
