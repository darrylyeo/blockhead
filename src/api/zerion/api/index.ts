/**
 * Zerion API (2023-12-20)
 * @link https://developers.zerion.io/reference/intro/getting-started
 */

import { env } from '$/env'

import { ConcurrentPromiseQueue } from '$/utils/ConcurrentPromiseQueue'

const queue = new ConcurrentPromiseQueue(1)

const get = async <T>(
	endpoint: string,
	params?: Record<string, string | number | boolean | undefined>,
) => {
	const response = await queue.enqueue(() => (
		fetch(`https://api.zerion.io/${endpoint}/?${`${new URLSearchParams(params as Record<string, string>)}`}`, {
			headers: {
				'accept': 'application/json',
				'authorization': `Basic ${env.ZERION_API_KEY}`,
			}
		})
	))

	if(response.status === 200 || response.status === 202) {
		const responseJson = await response.json() as T
		return responseJson
	}

	const responseJson = await response.json() as {
		errors: {
			title: string,
			detail: string,
		}[],
	}
	throw responseJson
}


// Types
type url = string
type float = number
type uint8 = number
type integer = number
type double = number

type Currency = (
	| 'usd' 
	| 'eth' 
	| 'btc' 
	| 'usd' 
	| 'eur' 
	| 'krw' 
	| 'rub' 
	| 'gbp' 
	| 'aud' 
	| 'cad' 
	| 'inr' 
	| 'jpy' 
	| 'nzd' 
	| 'try' 
	| 'zar' 
	| 'cny' 
	| 'chf'
)



/**
 * Wallets
 * @link https://developers.zerion.io/reference/wallets
 */


/**
 * Get wallet's portfolio
 * @link https://developers.zerion.io/reference/getwalletportfolio
 * 
 * This endpoint returns the portfolio overview of a web3 wallet.
 * 
 * If the address was not added before it is possible that this endpoint will return `202` status. It means that portfolio for the wallet is not prepared yet, but will be available soon. In that case the client have to request this endpoint periodically, while `200` status wasn't returned.
 * 
 * > NOTE: Don't forget to stop retries after some reasonable period of time. If the `200` status is not returned within 2 minutes it most probably means that some unexpected error occurred and the client should stop the polling.
 * 
 * > NOTE: Consider all IDs as abstract strings, without making any assumptions about their format or relying on such assumptions. There is a non-zero probability that IDs may change in the future, and this should not result in any breaking changes.
 * 
 * Path Params
 * @param {string} address The web3 wallet address
 * 
 * Query Params
 * @param {string} currency Denominated currency value of returned prices
 */
export const getPortfolioByAddress = async ({
	address,
	currency = 'usd',
}: {
	address: string,
	currency?: string,
}) => (
	get<{
		links: {
			self: {
				url: string,
			},
		},
		data: {
			type: string,
			id: string,
		},
		attributes: {
			positions_distribution_by_type: {
				/**
				 * Total value of asset on the wallet in selected currency
				 */
				wallet: float,

				/**
				 * Total value of deposited assets in selected currency
				 */
				deposited: float,

				/**
				 * Total value of borrowed assets in selected currency
				 */
				borrowed: float,

				/**
				 * Total value of locked assets in selected currency
				 */
				locked: float,

				/**
				 * Total value of staked assets in selected currency
				 */
				staked: float,
			},

			positions_distribution_by_chain: {

			},

			/**
			 * Total portfolio values across all wallet positions and NFT
			 */
			total: {
				/**
				 * Total value of all positions
				 */
				positions: float,
			}

			/**
			 * Portfolio changes
			 */
			changes: {
				/**
				 * Daily absolute portfolio change value
				 */
				absolute_1d: float,

				/**
				 * Daily portfolio change percent
				 */
				percent_1d: float,
			},
		},
	}>(`v1/wallets/${address}/portfolio`, {
		currency,
	})
)


/**
 * Get list of wallet's fungible positions
 * @link https://developers.zerion.io/reference/listwalletpositions
 * 
 * This endpoint returns a list of wallet positions.
 * 
 * If the address was not added before it is possible that this endpoint will return `202` status. It means that positions for the wallet are not prepared yet, but will be available soon. In that case the client have to request this endpoint periodically, while `200` status wasn't returned.
 * 
 * > NOTE: Don't forget to stop retries after some reasonable period of time. If the `200` status is not returned within 2 minutes it most probably means that some unexpected error occurred and the client should stop the polling.
 * 
 * > NOTE: This endpoint supports a lot of filters, sorting and pagination parameters. Make sure that a request URL length is in a safe range for your platform. Usually, 2000 characters are the safe limit in virtually any combination of client and server software.
 * 
 * > NOTE: Consider all IDs as abstract strings, without making any assumptions about their format or relying on such assumptions. There is a non-zero probability that IDs may change in the future, and this should not result in any breaking changes.
 * 
 * Path Params
 * @param {string} address The web3 wallet address
 * 
 * Query Params
 * @param {string} currency Denominated currency value of returned prices
 * @param {string[] | null} filter[position_types] Keep only positions with these types.
 * @param {string[]} filter[protocol_ids] Keep only positions of these protocols.
 * @param {string[]} filter[chain_ids] Keep only positions from these chains. Available chain ids can be found in chains endpoints.
 * @param {string[]} filter[fungible_ids] Keep only positions related to given fungible assets.
 * @param {string} filter[trash] Filter positions based on the `is_trash` flag. If no flag is specified, then `only_non_trash` is applied.
 * @param {string} sort Choose how the result should be ordering
 */
export const getFungiblePositionsByAddress = async ({
	address,
	currency = 'usd',
	filter,
	sort,
}: {
	address: string,
	currency?: Currency,
	filter: {
		position_types: ('deposit' | 'loan' | 'locked' | 'staked' | 'reward' | 'wallet' | 'airdrop' | 'margin')[] | null,
		protocolIds: string[],
		chainIds: string[],
		fungibleIds: string[],
		trash: string,
	},
	sort?: '-value' | 'value',
}) => (
	get<{
		links: {
			self: url,
		},

		data: {
			type: string,

			id: string,
		}[],
	}>(`v1/wallets/${address}/positions`, {
		currency,
		'filter[position_types]': filter.position_types?.join(','),
		'filter[protocol_ids]': filter.protocolIds.join(','),
		'filter[chain_ids]': filter.chainIds.join(','),
		'filter[fungible_ids]': filter.fungibleIds.join(','),
		'filter[trash]': filter.trash,
		sort,
	})
)


/**
 * Get list of wallet's transactions
 * 
 * This endpoint returns a list of wallet transactions.
 * 
 * > NOTE: This endpoint supports a lot of filters, sorting and pagination parameters. Make sure that a request URL length is in a safe range for your platform. Usually, 2000 characters are the safe limit in virtually any combination of client and server software.
 * 
 * > NOTE: Consider all IDs as abstract strings, without making any assumptions about their format or relying on such assumptions. There is a non-zero probability that IDs may change in the future, and this should not result in any breaking changes.
 * 
 * Path Params
 * @param {string} address The web3 wallet address
 * 
 * Query Params
 * @param {string} currency Denominated currency value of returned prices
 * @param {object} page Pagination parameters
 * @param {string} filter[search_query] Query for a full-text search.
 * @param {string[]} filter[operation_types] Return only transactions with specified types.
 * @param {string[]} filter[asset_types] Return only transactions that contain specified asset types.
 * @param {string[]} filter[chain_ids] Return only transactions from specified chains. You can find available chain ids in chain endpoints.
 * @param {string[]} filter[fungible_ids] Return only transactions with fungibles with specified ids.
 * @param {string} filter[min_mined_at] Return only transactions since specific date. Timestamp in milliseconds.
 * @param {string} filter[max_mined_at] Return only transactions until specific date. Timestamp in milliseconds.
 * @param {string} filter[trash] Filter transactions based on the `is_trash` flag. If no flag is specified, then `no_filter` is applied.
 */
export const getTransactionsByAddress = async ({
	address,
	currency = 'usd',
	filter,
}: {
	address: string,
	currency?: Currency,
	filter: {
		searchQuery: string,
		operationTypes: string[],
		assetTypes: string[],
		chainIds: string[],
		fungibleIds: string[],
		minMinedAt: string,
		maxMinedAt: string,
		trash: string,
	},
}) => (
	get<{
		links: {
			self: url,

			next: url,
		},

		data: Transaction[],
	}>(`v1/wallets/${address}/transactions`, {
		currency,
		'filter[search_query]': filter.searchQuery,
		'filter[operation_types]': filter.operationTypes.join(','),
		'filter[asset_types]': filter.assetTypes.join(','),
		'filter[chain_ids]': filter.chainIds.join(','),
		'filter[fungible_ids]': filter.fungibleIds.join(','),
		'filter[min_mined_at]': filter.minMinedAt,
		'filter[max_mined_at]': filter.maxMinedAt,
		'filter[trash]': filter.trash,
	})
)

type Transaction = {
	type: string,
	id: string,
	attributes: {
		/**
		 * Type of concrete transaction.
		 * `approve` `borrow` `burn` `cancel` `claim` `deploy` `deposit` `execute` `mint` `receive` `repay` `send` `stake` `trade` `unstake` `withdraw`
		 */
		operation_type: 'approve' | 'borrow' | 'burn' | 'cancel' | 'claim' | 'deploy' | 'deposit' | 'execute' | 'mint' | 'receive' | 'repay' | 'send' | 'stake' | 'trade' | 'unstake' | 'withdraw',

		/**
		 * Hash of the transaction.
		 */
		hash: string,

		/**
		 * Number of a block where the transaction was mined.
		 */
		mined_at_block: number,

		/**
		 * Timestamp string in ISO 8601 format when the transaction was mined.
		 */
		mined_at: string,

		/**
		 * Address of a sender of the transaction. It could be a smart contract address too.
		 */
		sent_from: string,

		/**
		 * Address of a recipient of the transaction. It could a be smart contract address too.
		 */
		sent_to: string,

		/**
		 * Status of the transaction.
		 * `confirmed` `failed` `pending`
		 */
		status: 'confirmed' | 'failed' | 'pending',

		/**
		 * Nonce of the transaction.
		 */
		nonce: number,

		/**
		 * The fee that was paid for the transaction.
		 */
		fee: {
			/**
			 * Displayable name of the fungible fungible.
			 */
			fungible_info: {
				name: string,

				/**
				 * Displayable symbol of the fungible fungible.
				 */
				symbol: string,

				/**
				 * Brief description of the fungible.
				 */
				description: string | null,

				/**
				 * Icon related to object.
				 */
				icon: {
					/**
					 * URL of the icon.
					 */
					url: url | null,
				},

				/**
				 * Whether this fungible verified or not
				 */
				flags: {
					verified: boolean,
				},

				/**
				 * Implementation details of the fungible on various chains.
				 */
				implementations: {
					/**
					 * Unique id of the chain.
					 */
					chain_id: string,

					/**
					 * Implementation address on the chain.
					 */
					address: string,

					/**
					 * Number of decimals points of the implementation.
					 */
					decimals: number,
				}[],
			},

			/**
			 * The fee value in requested currency.
			 */
			value: float,
		},
		
		/**
		 * List of transfers. An empty list is returned if the transaction does not have any transfers.
		 */
		transfers: {
			/**
			 * Displayable name of the fungible fungible.
			 */
			fungible_info: {
				name: string,

				/**
				 * Displayable symbol of the fungible fungible.
				 */
				symbol: string,

				/**
				 * Brief description of the fungible.
				 */
				description: string | null,

				/**
				 * Icon related to object.
				 */
				icon: {
					/**
					 * URL of the icon.
					 */
					url: url | null,
				},

				/**
				 * Whether this fungible verified or not
				 */
				flags: {
					verified: boolean,
				},

				/**
				 * Implementation details of the fungible on various chains.
				 */
				implementations: {
					/**
					 * Unique id of the chain.
					 */
					chain_id: string,

					/**
					 * Implementation address on the chain.
					 */
					address: string,

					/**
					 * Number of decimals points of the implementation.
					 */
					decimals: number,
				}[],
			},

			/**
			 * Direction of the transfer.
			 * `in` `out` `self`
			 */
			direction: string,

			/**
			 * The integral representation of the quantity (123.45678 -> 12345678).
			 */
			quantity: {
				int: string,

				/**
				 * Decimal number precision of the quantity - digits after the floating point.
				 */
				decimals: number,

				/**
				 * Float representation of the quantity.
				 */
				float: float,

				/**
				 * String representation of the quantity.
				 */
				numeric: string,
			},

			/**
			 * Value of the transfer in requested currency.
			 */
			value: float,

			/**
			 * Historical price of the asset.
			 */
			price: float,

			/**
			 * Address of the sender of the transfer.
			 */
			sender: string,

			/**
			 * Address of the recipient of the transfer.
			 */
			recipient: string,
		}[],

		/**
		 * List of approvals. An empty list is returned if the transaction does not have any approvals.
		 */
		approvals: {
			/**
			 * Displayable name of the fungible fungible.
			 */
			fungible_info: {
				name: string,

				/**
				 * Displayable symbol of the fungible fungible.
				 */
				symbol: string,

				/**
				 * Brief description of the fungible.
				 */
				description: string | null,

				/**
				 * Icon related to object.
				 */
				icon: {
					/**
					 * URL of the icon.
					 */
					url: url | null,
				},

				/**
				 * Whether this fungible verified or not
				 */
				flags: {
					verified: boolean,
				},

				/**
				 * Implementation details of the fungible on various chains.
				 */
				implementations: {
					/**
					 * Unique id of the chain.
					 */
					chain_id: string,

					/**
					 * Implementation address on the chain.
					 */
					address: string,

					/**
					 * Number of decimals points of the implementation.
					 */
					decimals: number,
				}[],
			},

			/**
			 * The integral representation of the quantity (123.45678 -> 12345678).
			 */
			quantity: {
				int: string,

				/**
				 * Decimal number precision of the quantity - digits after the floating point.
				 */
				decimals: number,

				/**
				 * Float representation of the quantity.
				 */
				float: float,

				/**
				 * String representation of the quantity.
				 */
				numeric: string,
			},

			/**
			 * Value of the transfer in requested currency.
			 */
			value: float,

			/**
			 * Address of the sender of the approval.
			 */
			sender: string,
		}[],

		/**
		 * Implementation details of the fungible on various chains.
		 */
		relationships: {
			chain: {
				links: {
					/**
					 * URL to the current chain.
					 */
					related: string,
				},

				data: {
					/**
					 * Chain resource type.
					 */
					type: string,

					/**
					 * Chain unique identifier.
					 */
					id: string,
				},
			},
		},
	},
}


/**
 * Get a list of a wallet's NFT positions
 * @link https://developers.zerion.io/reference/listwalletnftpositions
 * 
 * This endpoint returns a list of the NFT positions held by a specific wallet.
 * 
 * If the wallet address has not been previously added, this endpoint may return a `202` status code. This indicates that the wallet's positions are not yet available, but will be in the near future. In this case, the client should periodically request this endpoint until a `200` status code is returned.
 * 
 * > NOTE: It is important to stop retrying after a reasonable period of time. If a `200` status code is not returned within 2 minutes, it is likely that an unexpected error has occurred and the client should stop polling.
 * 
 * > NOTE: This endpoint provides support for filters, sorting, and pagination parameters. Ensure that the length of the request URL falls within a safe range for your platform. Typically, a length of 2000 characters is a safe limit for most combinations of client and server software.
 * 
 * > NOTE: Consider all IDs as abstract strings, without making any assumptions about their format or relying on such assumptions. There is a non-zero probability that IDs may change in the future, and this should not result in any breaking changes.
 * 
 * Path Params
 * @param {string} address The web3 wallet address
 * 
 * Query Params
 * @param {string[]} filter[chain_ids] Keep only positions from the specified chains. Available chains IDs can be found in chains endpoint.
 * @param {string[]} filter[collections_ids] Keep only positions from collections with specified IDs. The IDs are returned inside the 'collection' field of each NFT.
 * @param {string} sort The order of NFTs in the result.
 * @param {string[]} include Array of related resources to be included to the response. This parameter corresponds to the JSON API schema.
 * @param {string} currency Denominated currency value of returned prices
 * @param {object} page Pagination parameters
 * @param {string} after Set a start cursor for a page in the pagination. Omit it to return the first page.
 * @param {number} size Set maximum number of items per a page in the pagination.
 */
export const getNftPositionsByAddress = async ({
	address,
	currency = 'usd',
	filter,
	sort,
	include,
	page,
}: {
	address: string,
	currency?: Currency,
	filter: {
		chainIds: string[],
		collectionsIds: string[],
	},
	sort: (
		| '-created_at'
		| 'created_at'
		| '-floor_price'
		| 'floor_price'
	),
	include: (
		| 'nfts'
		| 'nft_collections'
		| 'wallet_nft_collections'
	)[],
	page: {
		after: string | null,
		size: uint8,
	},
}) => (
	get<{
		links: {
			self: url,
		},

		data: {
			/**
			 * NFT position's unique ID.
			 */
			id: string,

			attributes: {
				/**
				 * The date and the time when the position was updated in ISO format.
				 */
				changed_at: string,

				/**
				 * The quantity of the NFT position.
				 */
				amount: string,

				/**
				 * The lowest price (floor) of the position's NFT. Measured in the requested currency.
				 */
				price: float,

				/**
				 * The lowest value of the NFT position (floor). Measured in the requested currency.
				 */
				value: float,

				/**
				 * NFT position's unique ID.
				 */
				nft_info: {
					/**
					 * Address of the contract of the NFT.
					 */
					contract_address: string,

					/**
					 * Unique identifier of the NFT inside the contract.
					 */
					token_id: string | null,

					/**
					 * Name of the NFT.
					 */
					name: string,

					/**
					 * The standard that the NFT contract follows, e.g. ERC-721.
					 */
					interface: 'erc721' | 'erc1155',

					/**
					 * The URL of the preview image
					 */
					content: {
						/**
						 * URL to the content.
						 */
						preview: {
							url: url,
						},

						/**
						 * MIME content type
						 */
						content_type: string,
					},
				},

				/**
				 * Indicates whether the NFT spam or not.
				 */
				flags: {
					is_spam: boolean,
				},

				/**
				 * Represents an NFT collection short info.
				 */
				collection_info: {
					/**
					 * The name of the collection.
					 */
					name: string,

					/**
					 * The description of the collection.
					 */
					description: string,

					/**
					 * Icon related to object.
					 */
					content: {
						/**
						 * URL of the icon.
						 */
						icon: {
							url: url | null,
						},

						/**
						 * URL to the content.
						 */
						banner: {
							url: url,
						},

						/**
						 * MIME content type
						 */
						content_type: string,
					},
				},

				/**
				 * The blockchain on which the NFT position exists.
				 */
				chain: {
					/**
					 * URL to the current chain.
					 */
					related: url,

					data: {
						/**
						 * Chain resource type.
						 */
						type: string,

						/**
						 * Chain unique identifier.
						 */
						id: string,
					},
				},

				/**
				 * The NFT which represents the position.
				 */
				nft: {
					data: {
						/**
						 * NFTs resource type.
						 */
						type: string,

						/**
						 * Unique identifier of the NFT.
						 */
						id: string,
					},
				},

				/**
				 * The NFT collection which the NFT belongs to.
				 */
				nft_collection: {
					data: {
						/**
						 * NFT collections resource type.
						 */
						type: string,

						/**
						 * Unique NFT collection ID.
						 */
						id: integer,
					},
				},
			},
		}[],

		included: (NftContainer | NftCollectionContainer | WalletNftCollectionContainer)[],
	}>(`v1/wallets/${address}/nft-positions`, {
		currency,
		'filter[chain_ids]': filter.chainIds.join(','),
		'filter[collections_ids]': filter.collectionsIds.join(','),
		sort,
		include: include.join(','),
		'page[after]': page.after ?? undefined,
		'page[size]': page.size,
	})
)

/**
 * Represents a non-fungible token (NFT).
 */
type NftContainer = {
	/**
	 * NFTs resource type.
	 */
	type: string,

	/**
	 * Unique identifier of the NFT.
	 */
	id: string,

	/**
	 * Represents attributes of a non-fungible token (NFT) corresponding to JSON API specification.
	 */
	attributes: {
		/**
		 * The address of the contract that manages the NFT.
		 */
		contract_address: string,

		/**
		 * The unique identifier for the NFT within its contract.
		 */
		token_id: string,

		/**
		 * The standard that the NFT contract follows, e.g. ERC-721.
		 * `erc721` `erc1155`
		 */
		interface: 'erc721' | 'erc1155',

		/**
		 * Metadata associated with the NFT.
		 */
		metadata: {
			/**
			 * The name of the NFT
			 */
			name: string,

			/**
			 * The description of the NFT
			 */
			description: string,

			/**
			 * The list of tags associated with the NFT
			 */
			tags: string[],

			content: {
				/**
				 * The URL of the preview image
				 */
				preview: {
					/**
					 * URL to the content
					 */
					url: url,

					/**
					 * MIME content type
					 */
					content_type: string,
				},

				/**
				 * The URL of the full-size image
				 */
				detail: {
					/**
					 * URL to the content
					 */
					url: url,

					/**
					 * MIME content type
					 */
					content_type: string,
				},

				/**
				 * The URL of the audio file
				 */
				audio: {
					/**
					 * URL to the content
					 */
					url: url,

					/**
					 * MIME content type
					 */
					content_type: string,
				},

				/**
				 * The URL of the video file
				 */
				video: {
					/**
					 * URL to the content
					 */
					url: url,

					/**
					 * MIME content type
					 */
					content_type: string,
				},
			},

			/**
			 * The list of attributes associated with the NFT
			 */
			attributes: {
				/**
				 * Attribute key. The key is not unique and is it possible to have several attributes with the same key.
				 */
				key: string,

				/**
				 * Attribute value
				 */
				value: string,
			}[],
		},

		market_data: {
			/**
			 * The prices associated with the NFT expressed in the currency specified in the request parameters.
			 */
			prices: {
				/**
				 * The lowest known price for the NFT.
				 */
				floor: float,
			},
		},

		/**
		 * A list of relevant URLs.
		 */
		external_links: {
			/**
			 * Type of the link
			 */
			type: string,

			/**
			 * Displayable name of the link
			 */
			name: string,

			/**
			 * Link to the external resource
			 */
			url: url,
		}[],

		/**
		 * Various chain related boolean flags
		 */
		flags: {
			/**
			 * Indicates whether the NFT spam or not.
			 */
			is_spam: boolean,
		},
	},

	/**
	 * Represents relationships of a non-fungible token (NFT) corresponding to JSON API specification.
	 */
	relationships: {
		/**
		 * The blockchain on which the NFT exists.
		 */
		chain: {
			links: {
				/**
				 * URL to the current chain.
				 */
				related: url,
			},

			data: {
				/**
				 * Chain resource type.
				 */
				type: string,

				/**
				 * Chain unique identifier.
				 */
				id: string,
			},
		},

		/**
		 * The collection that the NFT belongs to.
		 */
		nft_collection: {
			data: {
				/**
				 * NFT collections resource type.
				 */
				type: string,

				/**
				 * Unique NFT collection ID.
				 */
				id: integer,
			},
		},
	},
}

type NftCollectionContainer = {
	/**
	 * NFT collections resource type.
	 */
	type: string,

	/**
	 * Unique NFT collection ID.
	 */
	id: integer,

	/**
	 * Represents an NFT collection attributes corresponding to JSON API specification.
	 */
	attributes: {
		/**
		 * Metadata associated with the NFT.
		 */
		metadata: {
			/**
			 * The name of the collection.
			 */
			name: string,

			/**
			 * The description of the collection.
			 */
			description: string,

			content: {
				/**
				 * Icon related to object.
				 */
				icon: {
					/**
					 * URL of the icon.
					 */
					url: url | null,
				},

				/**
				 * The URL for the collection's banner image.
				 */
				banner: {
					/**
					 * URL to the content
					 */
					url: url,

					/**
					 * MIME content type
					 */
					content_type: string,
				},
			},

			/**
			 * The symbol for the payment token used by the collection.
			 */
			payment_token_symbol: string,

			/**
			 * Contains marketplace data for a collection of NFTs.
			 */
			market_data: {
				/**
				 * Prices associated with the NFT collection expressed in the currency specified in the request parameters.
				 */
				prices: {
					/**
					 * The lowest known price for an NFT in the collection.
					 */
					floor: float,
				},
			},
		},
	},
}

/**
 * The NFT collection held by the wallet.
 */
type WalletNftCollectionContainer = {
	/**
	 * NFT collection resource type.
	 */
	type: string,

	/**
	 * NFT collection's unique ID.
	 */
	id: integer,

	/**
	 * Represents an NFT collection short info.
	 */
	attributes: {
		/**
		 * The earliest changed_at date and time alongside all wallet's positions from the collection.
		 */
		min_changed_at: string | null,

		/**
		 * The most recent changed_at date and time alongside all wallet's positions from the collection.
		 */
		max_changed_at: string | null,

		/**
		 * The total quantity of the wallet's NFT positions from the collection.
		 */
		nfts_count: string,

		/**
		 * The lowest price (floor) of the all wallet's NFTs positions from the collection. Measured in the requested currency.
		 */
		total_floor_price: float,

		/**
		 * Represents an NFT collection short info.
		 */
		collection_info: {
			/**
			 * The name of the collection.
			 */
			name: string,

			/**
			 * The description of the collection.
			 */
			description: string,

			content: {
				/**
				 * Icon related to object.
				 */
				icon: {
					/**
					 * URL of the icon.
					 */
					url: url | null,
				},

				/**
				 * The URL for the collection's banner image.
				 */
				banner: {
					/**
					 * URL to the content
					 */
					url: url,

					/**
					 * MIME content type
					 */
					content_type: string,
				},
			},
		},
	},

	relationships: {
		/**
		 * The blockchain on which the NFT collection exists.
		 */
		chains: {
			links: {
				/**
				 * URL to the current chain.
				 */
				related: url,
			},

			data: {
				/**
				 * Chain resource type.
				 */
				type: string,

				/**
				 * Chain unique identifier.
				 */
				id: string,
			},

			/**
			 * The NFT collection itself.
			 */
			nft_collection: {
				data: {
					/**
					 * NFT collections resource type.
					 */
					type: string,

					/**
					 * Unique NFT collection ID.
					 */
					id: integer,
				},
			},
		}[],
	},
}


/**
 * Get a list of NFT collections held by a wallet
 * @link https://developers.zerion.io/reference/listwalletnftcollections
 * 
 * This endpoint returns a list of the NFT collections held by a specific wallet.
 * 
 * If the wallet address has not been previously added, this endpoint may return a `202` status code. This indicates that the wallet's collections are not yet available, but will be in the near future. In this case, the client should periodically request this endpoint until a `200` status code is returned.
 * 
 * > NOTE: It is important to stop retrying after a reasonable period of time. If a `200` status code is not returned within 2 minutes, it is likely that an unexpected error has occurred and the client should stop polling.
 * 
 * > NOTE: This endpoint provides support for filters, sorting. Ensure that the length of the request URL falls within a safe range for your platform. Typically, a length of 2000 characters is a safe limit for most combinations of client and server software.
 * 
 * > NOTE: Consider all IDs as abstract strings, without making any assumptions about their format or relying on such assumptions. There is a non-zero probability that IDs may change in the future, and this should not result in any breaking changes.
 * 
 * Path Params
 * @param {string} address The web3 wallet address
 * 
 * Query Params
 * @param {string[]} filter[chain_ids] Keep only collections from the specified chains. Available chain IDs can be found in the chains endpoint.
 * @param {string} sort The order of NFTs in the result.
 * @param {string} currency Denominated currency value of returned prices
 * @param {string[]} include Array of related resources to be included to the response. This parameter corresponds to the JSON API schema.
 */
export const getNftCollectionsByAddress = async ({
	address,
	filter,
	sort,
	currency,
	include,
}: {
	address: string,
	filter: {
		chainIds: string[],
	},
	sort: '-max_changed_at' | 'max_changed_at' | 'total_floor_price' | '-total_floor_price',
	currency: Currency,
	include: ('nft_collections')[],
}) => (
	get<{
		links: {
			self: url,
		},

		data: {
			/**
			 * NFT collection held by the wallet.
			 */
			type: string,

			/**
			 * NFT collection's unique ID.
			 */
			id: integer,

			attributes: {
				/**
				 * The earliest `changed_at` date and time alongside all wallet's positions from the collection.
				 */
				min_changed_at: string | null,

				/**
				 * The most recent `changed_at` date and time alongside all wallet's positions from the collection.
				 */
				max_changed_at: string | null,

				/**
				 * The total quantity of the wallet's NFT positions from the collection.
				 */
				nfts_count: string,

				/**
				 * The lowest price (floor) of the all wallet's NFTs positions from the collection. Measured in the requested currency.
				 */
				total_floor_price: float,

				/**
				 * Represents an NFT collection short info.
				 */
				collection_info: {
					/**
					 * The name of the collection.
					 */
					name: string,

					/**
					 * The description of the collection.
					 */
					description: string,

					content: {
						/**
						 * Icon related to object.
						 */
						icon: {
							/**
							 * URL of the icon.
							 */
							url: url | null,
						},

						/**
						 * The URL for the collection's banner image.
						 */
						banner: {
							/**
							 * URL to the content
							 */
							url: url,

							/**
							 * MIME content type
							 */
							content_type: string,
						},
					},
				},
			},

			relationships: {
				/**
				 * The blockchain on which the NFT collection exists.
				 */
				chains: {
					links: {
						/**
						 * URL to the current chain.
						 */
						related: url,
					},

					data: {
						/**
						 * Chain resource type.
						 */
						type: string,

						/**
						 * Chain unique identifier.
						 */
						id: string,
					},
				}[],

				/**
				 * The NFT collection itself.
				 */
				nft_collection: {
					data: {
						/**
						 * NFT collections resource type.
						 */
						type: string,

						/**
						 * Unique NFT collection ID.
						 */
						id: integer,
					},
				},
			},

			included: (NftCollectionContainer)[],
		}[],
	}>(`v1/wallets/${address}/nft-collections`, {
		'filter[chain_ids]': filter.chainIds.join(','),
		sort,
		currency,
		include: include.join(','),
	})
)


/**
 * Get wallet's NFT portfolio
 * @link https://developers.zerion.io/reference/getwalletnftportfolio
 * 
 * This endpoint returns the NFT portfolio overview of a web3 wallet.
 * 
 * If the address was not added before it is possible that this endpoint will return `202` status. It means that portfolio for the wallet is not prepared yet, but will be available soon. In that case the client have to request this endpoint periodically, while `200` status wasn't returned.
 * 
 * > NOTE: Don't forget to stop retries after some reasonable period of time. If the `200` status is not returned within 2 minutes it most probably means that some unexpected error occurred and the client should stop the polling.
 * 
 * Path Params
 * @param {string} address The web3 wallet address
 * 
 * Query Params
 * @param {string} currency Denominated currency value of returned prices
 */
export const getNftPortfolioByAddress = async ({
	address,
	currency,
}: {
	address: string,
	currency: Currency,
}) => (
	get<{
		links: {
			self: url,
		},

		data: {
			/**
			 * NFT portfolio unique ID.
			 */
			id: string,

			attributes: {
				/**
				 * Positions distribution by chain.
				 */
				positions_distribution_by_chain: {
				},
			},
		},
	}>(`v1/wallets/${address}/nft-portfolio`, {
		currency,
	})
)



/**
 * Fungibles
 * @link https://developers.zerion.io/reference/fungibles
 */


type Fungible = {
	/**
	 * Fungible resource type.
	 */
	type: string,

	/**
	 * Fungible unique identifier.
	 */
	id: string,

	attributes: {
		/**
		 * Displayable name of the fungible.
		 */
		name: string,

		/**
		 * Displayable symbol of the fungible.
		 */
		symbol: string,

		/**
		 * Brief description of the fungible.
		 */
		description: string | null,

		/**
		 * Icon related to object.
		 */
		icon: {
			/**
			 * URL of the icon.
			 */
			url: url | null,
		},

		/**
		 * Whether this fungible verified or not
		 */
		flags: {
			verified: boolean,
		},

		/**
		 * Implementation details of the fungible on various chains.
		 */
		implementations: {
			/**
			 * Unique id of the chain.
			 */
			chain_id: string,

			/**
			 * Implementation address on the chain.
			 */
			address: string,

			/**
			 * Number of decimals points of the implementation.
			 */
			decimals: number,
		}[],
		
		market_data: {
			/**
			 * Total market supply of fungible
			 */
			total_supply: double,
			
			/**
			 * Circulating value of fungible
			 */
			circulating_supply: double,

			/**
			 * Total market capitalization of fungible in selected currency
			 */
			fully_diluted_valuation: double,

			/**
			 * Circulating market capitalization of fungible in selected currency
			 */
			market_cap: double,

			/**
			 * Latest fungible price
			 */
			price: double | null,

			changes: {
				/**
				 * Price relative change in percent for 1 day
				 */
				percent_change_1d: double | null,

				/**
				 * Price relative change in percent for 30 days
				 */
				percent_change_30d: double | null,

				/**
				 * Price relative change in percent for 90 days
				 */
				percent_change_90d: double | null,

				/**
				 * Price relative change in percent for 1 year
				 */
				percent_change_365d: double | null,
			},
		},
	},

	relationships: {
		/**
		 * Chart data for the last hour.
		 */
		chart_hour: {
			links: {
				/**
				 * URL to the current chart.
				 */
				related: url,
			},

			data: {
				/**
				 * Chart resource type.
				 */
				type: string,

				/**
				 * Chart unique identifier.
				 */
				id: string,
			},
		},

		/**
		 * Chart data for the last day.
		 */
		chart_day: {
			links: {
				/**
				 * URL to the current chart.
				 */
				related: url,
			},

			data: {
				/**
				 * Chart resource type.
				 */
				type: string,

				/**
				 * Chart unique identifier.
				 */
				id: string,
			},
		},

		/**
		 * Chart data for the last week.
		 */
		chart_week: {
			links: {
				/**
				 * URL to the current chart.
				 */
				related: url,
			},

			data: {
				/**
				 * Chart resource type.
				 */
				type: string,

				/**
				 * Chart unique identifier.
				 */
				id: string,
			},
		},

		/**
		 * Chart data for the last month.
		 */
		chart_month: {
			links: {
				/**
				 * URL to the current chart.
				 */
				related: url,
			},

			data: {
				/**
				 * Chart resource type.
				 */
				type: string,

				/**
				 * Chart unique identifier.
				 */
				id: string,
			},
		},

		/**
		 * Chart data for the last year.
		 */
		chart_year: {
			links: {
				/**
				 * URL to the current chart.
				 */
				related: url,
			},

			data: {
				/**
				 * Chart resource type.
				 */
				type: string,

				/**
				 * Chart unique identifier.
				 */
				id: string,
			},
		},

		/**
		 * Chart data for the all time.
		 */
		chart_max: {
			links: {
				/**
				 * URL to the current chart.
				 */
				related: url,
			},

			data: {
				/**
				 * Chart resource type.
				 */
				type: string,

				/**
				 * Chart unique identifier.
				 */
				id: string,
			},
		},
	},
}


/**
 * Get a list of fungible assets
 * @link https://developers.zerion.io/reference/getfungibles
 * 
 * This endpoint returns a paginated list of fungible assets supported by Zerion. It also provides the ability to search for fungibles.
 * If no fungible assets are found for given filters, the empty list with 200 status is returned.
 * 
 * > NOTE: This endpoint supports a lot of filters, sorting, and pagination parameters. Ensure your request URL length is within a safe range for your platform. Usually, 2000 characters are the safe limit in virtually any combination of client and server software.
 * 
 * > NOTE: The `filter[implementation_address]` parameter ignores `filter[search_query]`. It may be changed in the future.
 * 
 * > NOTE: Consider all IDs as abstract strings, without making any assumptions about their format or relying on such assumptions. There is a non-zero probability that IDs may change in the future, and this should not result in any breaking changes.
 * 
 * Query Params
 * @param {string} currency Denominated currency value of returned prices
 * @param {object} page Pagination parameters
 * @param {string} filter[search_query] Query for a full-text search.
 * @param {string} filter[implementation_chain_id] Keep only fungibles from this chain. Available chain ids can be found in chains endpoints.
 * @param {string} filter[implementation_address] Keep only fungibles deployed at given address. Is it possible that different fungibles are deployed at the same address on different chains.
 * @param {string[]} filter[fungible_ids] Keep only fungibles with the given ids
 * @param {string} sort Choose how the result should be ordering
 */
export const getFungibles = async ({
	currency,
	page,
	filter,
	sort,
}: {
	currency: Currency,
	page: {
		after: string | null,
		size: uint8,
	},
	filter: {
		searchQuery: string,
		implementationChainId: string,
		implementationAddress: string,
		fungibleIds: string[],
	},
	sort: (
		| '-market_data.market_cap'
		| 'market_data.market_cap'
		| '-market_data.price.last'
		| 'market_data.price.last'
		| '-market_data.price.percent_change_1d'
		| 'market_data.price.percent_change_1d'
		| '-market_data.price.percent_change_30d'
		| 'market_data.price.percent_change_30d'
		| '-market_data.price.percent_change_90d'
		| 'market_data.price.percent_change_90d'
		| '-market_data.price.percent_change_365d'
		| 'market_data.price.percent_change_365d'
	),
}) => (
	get<{
		links: {
			self: url,
			first: url,
			next: url,
			prev: url,
		},

		/**
		 * Object, representing fungible asset.
		 */
		data: Fungible[],
	}>(`v1/fungibles`, {
		currency,
		'page[after]': page.after ?? undefined,
		'page[size]': page.size,
		'filter[search_query]': filter.searchQuery,
		'filter[implementation_chain_id]': filter.implementationChainId,
		'filter[implementation_address]': filter.implementationAddress,
		'filter[fungible_ids]': filter.fungibleIds.join(','),
	})
)


/**
 * Get fungible asset by ID
 * @link https://developers.zerion.io/reference/getfungiblebyid
 * 
 * This endpoint returns a fungible asset by unique identifier
 * 
 * Path Params
 * @param {string} fungibleId Unique fungible ID
 * 
 * Query Params
 * @param {string} currency Denominated currency value of returned prices
 */
export const getFungibleById = async ({
	fungibleId,
	currency,
}: {
	fungibleId: string,
	currency: Currency,
}) => (
	get<{
		links: {
			self: url,
		},

		/**
		 * Object, representing fungible asset.
		 */
		data: Fungible,
	}>(`v1/fungibles/${fungibleId}`, {
		currency,
	})
)


/**
 * Get a chart for a fungible asset
 * @link https://developers.zerion.io/reference/getfungiblechart
 * 
 * This endpoint returns the chart for the fungible asset for a selected period
 * 
 * Path Params
 * @param {string} fungible_id Unique fungible ID
 * @param {string} chart_period Chart period
 * 
 * Query Params
 * @param {string} currency Denominated currency value of returned prices
 */
export const getFungibleChart = async ({
	fungibleId,
	chartPeriod,
	currency,
}: {
	fungibleId: string,
	chartPeriod: '1d' | '7d' | '30d' | '365d' | 'max',
	currency: Currency,
}) => (
	get<{
		links: {
			self: url,
		},

		data: {
			/**
			 * Fungible chart resource type.
			 */
			type: string,

			/**
			 * Fungible chart unique identifier.
			 */
			id: string,

			attributes: {
				/**
				 * Begin timestamp of the chart.
				 */
				begin_at: string,

				/**
				 * End timestamp of the chart.
				 */
				end_at: string,

				stats: {
					/**
					 * First chart value.
					 */
					first: double,

					/**
					 * Minimum value on the chart.
					 */
					min: double,

					/**
					 * Average chart value.
					 */
					avg: double,

					/**
					 * Maximum value on the chart.
					 */
					max: double,

					/**
					 * Last chart value.
					 */
					last: double,
				},

				/**
				 * Sorted list of chart points.
				 */
				points: (
					/**
					 * Chart point - tuple of two items, the first one is timestamp, the second one is a price in requested currency
					 */
					[integer, number]
				)[],
			},
		},
	}>(`v1/fungibles/${fungibleId}/charts/${chartPeriod}`, {
		currency,
	})
)



/**
 * Chains
 * @link https://developers.zerion.io/reference/chains
 */


type Chain = {
	/**
	 * Chain resource type.
	 */
	type: string,

	/**
	 * Chain unique identifier.
	 */
	id: string,

	attributes: {
		/**
		 * Community used chain ID
		 */
		external_id: string,

		/**
		 * Human readable chain name
		 */
		name: string,

		/**
		 * Icon related to object.
		 */
		icon: {
			/**
			 * URL of the icon.
			 */
			url: url | null,
		},

		/**
		 * Chain explorer data
		 */
		explorer: {
			/**
			 * Human readable explorer name
			 */
			name: string,

			/**
			 * URL with placeholders that leads to a token page
			 */
			token_url_format: url,

			/**
			 * URL with placeholders that points to a transaction page
			 */
			tx_url_format: url,

			/**
			 * URL leads to the explorer homepage
			 */
			home_url: url,
		},

		/**
		 * Chain RPC servers data
		 */
		rpc: {
			/**
			 * URL with placeholders of RPC server which can be used for project purposes
			 */
			internal_server_url_format: url,

			/**
			 * List of URL of public RPC servers which can be used by everyone
			 */
			public_servers_url: url[],
		},

		/**
		 * Various chain related boolean flags
		 */
		flags: {
			/**
			 * Whether trading is supported on Zerion for this chain or not
			 */
			supports_trading: boolean,

			/**
			 * Whether sending is supported on Zerion for this chain or not
			 */
			supports_sending: boolean,

			/**
			 * Whether bridges are supported on Zerion for this chain or not
			 */
			supports_bridge: boolean,
		},
	},

	relationships: {
		/**
		 * Native fungible
		 */
		native_fungible: {
			links: {
				/**
				 * URL to the current resource.
				 */
				related: url,
			},

			data: {
				/**
				 * Fungible resource type.
				 */
				type: string,

				/**
				 * Fungible unique identifier.
				 */
				id: string,
			},
		},

		/**
		 * Wrapped native fungible
		 */
		wrapped_native_fungible: {
			links: {
				/**
				 * URL to the current resource.
				 */
				related: url,
			},

			data: {
				/**
				 * Fungible resource type.
				 */
				type: string,

				/**
				 * Fungible unique identifier.
				 */
				id: string,
			},
		},
	},
}


/**
 * Get list of all chains
 * @link https://developers.zerion.io/reference/listchains
 * 
 * This endpoint returns list of all chains supported by Zerion
 */
export const getChains = async () => (
	get<{
		links: {
			self: url,
		},

		data: Chain[],
	}>(`v1/chains`)
)


/**
 * Get chain by ID
 * @link https://developers.zerion.io/reference/getchainbyid
 * 
 * This endpoint returns chain by unique chain identifier
 * 
 * Path Params
 * @param {string} chain_id Unique chain ID
 */
export const getChainById = async ({
	chainId,
}: {
	chainId: string,
}) => (
	get<{
		links: {
			self: url,
		},

		data: Chain,
	}>(`v1/chains/${chainId}`)
)



/**
 * Swap
 * @link https://developers.zerion.io/reference/swapfungibles
 */


/**
 * Get fungibles available for bridge
 * @link https://developers.zerion.io/reference/swapfungibles
 * 
 * This endpoint provides a list of fungibles available for bridge exchange. This endpoint is specifically designed for situations where the input and output chains are different.
 * 
 * Query Params
 * @param {object} input
 * * @param {string} chain_id Initial chain id the user want exchange fungibles from. If nothing specified then ethereum is used.
 * @param {object} output
 * * @param {string} chain_id Target chain id the user want receive fungibles on. If nothing specified then ethereum is used.
 * @param {string} direction The direction parameter is a parameter that determines the flow of fungibles involved in the transaction. It can have three possible values: 'input', 'output', or 'both'. The value 'input' indicates that the API endpoint will only return fungibles that the user can send. The value 'output' indicates that the API endpoint will only return fungibles that the user can receive. The value 'both' means that the API endpoint will return fungibles which are 'input' and 'output' at the same time. In other words - intersection for 'input' and output'. If nothing specified then both is used.
 */
export const getFungiblesForBridge = async ({
	input,
	output,
	direction,
}: {
	input: {
		chainId: string,
	},
	output: {
		chainId: string,
	},
	direction: 'input' | 'output' | 'both',
}) => (
	get<{
		links: {
			self: url,
		},

		data: Fungible[],
	}>(`v1/swap/fungibles/`, {
		input,
		output,
		direction,
	})
)


/**
 * Get available swap offers
 * @link https://developers.zerion.io/reference/swapoffers
 * 
 * This endpoint offers a comprehensive overview of relevant trades and bridge exchanges. A bridge exchange refers to the transfer of cryptocurrencies between different blockchain networks, while a trade pertains to an exchange of cryptocurrencies within the same network. In an effort to secure the optimal exchange rate for our users, our system sends requests to multiple exchange providers. Zerion only charges a commission fee of 0.5% on L2 and alternative L1 trades, which can be waived by obtaining our Genesis NFT. Our platform has the advantage of being an aggregator of various exchanges, ensuring that users will always get the best exchange rates available. Please note that due to the nature of the multiple requests and calculations involved, it is normal for this endpoint to have a relatively long timeout. You can expect a response time of around 5-10 seconds.
 * 
 * Query Params
 * @param {object} input Information about what the wallet wants to send.
 * * @param {string} from Address of the wallet which wants to trade or bridge. Could be omitted if only rate needed.
 * * @param {string} chain_id Initial chain ID the user want exchange assets from.
 * * @param {string} fungible_id Fungible ID which user wants to send. Interchangeable with asset_address.
 * * @param {string} asset_address Asset address which user wants to send. Interchangeable with fungible_id for fungibles. For the base asset there is no address. Use `0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee` instead.
 * * @param {number} amount Input asset amount in lowest units
 * @param {object} output Information about what the wallet wants to receive.
 * * @param {string} to Specifies the recipient of the assets being exchanged. If this parameter is not provided, the assets will be sent to the sender's own wallet address. Used for bridge exchanges only.
 * * @param {string} chain_id Target chain ID the user want receive assets on.
 * * @param {string} fungible_id Fungible ID which user wants to receive. Interchangeable with asset_address.
 * * @param {string} asset_address Asset address which user wants to receive. Interchangeable with fungible_id for fungibles. For the base asset there is no address. Use `0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee` instead.
 * * @param {number} amount Input asset amount in lowest units
 * @param {number} gas_price Gas price in wei. If nothing specified then current market classic gas price is used.
 * @param {string} liquidity_source_id The source to be used for exchanges search. If nothing specified then all is used.
 * @param {string} sort Order of output transactions result. If nothing specified then amount is used.
 * @param {float} slippage_percent Maximum slippage value for the transaction to be approved. Slippage is a term used in crypto exchanges to describe the difference between the expected price of a trade and the actual price at which the trade is executed. It occurs due to the volatility and liquidity of the market, and can result in a higher or lower price than expected. If nothing specified then 2 is used.
 * @param {object} integrator Integrator service related parameters.
 * * @param {float} fee_percent Parameter for trades on Layer-2 and alternative Layer-1 networks that allows integrators to add an additional fee for transaction, measured in percents. Integrators must also specify the address of the wallet that will receive the additional fee using the integrator[beneficiary] parameter If nothing specified then 0 is used..
 * * @param {string} beneficiary Parameter that integrator uses to specify the address of the wallet to receive additional fee associated with the transaction. This parameter is used in conjunction with the integrator[fee] parameter, which allows integrators to specify an additional fee for the exchange. Works only for trades on Layer-2 chains and alternative Layer-1 chains.
 */
export const getSwapOffers = async ({
	input,
	output,
	gasPrice,
	liquiditySourceId,
	sort,
	slippagePercent,
	integrator,
}: {
	input: {
		from: string,
		chainId: string,
		fungibleId: string,
		assetAddress: string,
		amount: number,
	},
	output: {
		to: string,
		chainId: string,
		fungibleId: string,
		assetAddress: string,
		amount: number,
	},
	gasPrice: number,
	liquiditySourceId: string,
	sort: string,
	slippagePercent: float,
	integrator: {
		feePercent: float,
		beneficiary: string,
	},
}) => (
	get<{
		links: {
			self: url,
		},

		data: {
			/**
			 * Unique ID of the swap.
			 */
			id: string,

			attributes: {
				/**
				 * Indicates whether the wallet meets necessary preconditions for the transaction to be successfully completed.
				 */
				preconditions_met: {
					/**
					 * Indicates whether the wallet has authorized sufficient asset for the swap (True) or not (False).
					 */
					enough_allowance: boolean,

					/**
					 * Indicates whether the wallet has enough assets for the swap (True) or not (False).
					 */
					enough_balance: boolean,
				},

				/**
				 * The maximum amount of the asset the wallet will be charged.
				 */
				input_quantity_max: {
					/**
					 * The integral representation of the quantity (123.45678 -> 12345678).
					 */
					int: string,

					/**
					 * Decimal number precision of the quantity - digits after the floating point.
					 */
					decimals: uint8,

					/**
					 * Float representation of the quantity.
					 */
					float: float,

					/**
					 * String representation of the quantity.
					 */
					numeric: string,
				},

				/**
				 * The minimum amount of the asset the wallet will receive considering slippage.
				 */
				output_quantity_min: {
					/**
					 * The integral representation of the quantity (123.45678 -> 12345678).
					 */
					int: string,

					/**
					 * Decimal number precision of the quantity - digits after the floating point.
					 */
					decimals: uint8,

					/**
					 * Float representation of the quantity.
					 */
					float: float,

					/**
					 * String representation of the quantity.
					 */
					numeric: string,
				},

				/**
				 * The estimated amount of the asset the wallet will be charged.
				 */
				estimation: {
					/**
					 * The estimated amount of the asset the wallet will be charged.
					 */
					input_quantity: {
						/**
						 * The integral representation of the quantity (123.45678 -> 12345678).
						 */
						int: string,

						/**
						 * Decimal number precision of the quantity - digits after the floating point.
						 */
						decimals: uint8,

						/**
						 * Float representation of the quantity.
						 */
						float: float,

						/**
						 * String representation of the quantity.
						 */
						numeric: string,
					},

					/**
					 * The estimated amount of the asset the wallet will receive.
					 */
					output_quantity: {
						/**
						 * The integral representation of the quantity (123.45678 -> 12345678).
						 */
						int: string,
	
						/**
						 * Decimal number precision of the quantity - digits after the floating point.
						 */
						decimals: uint8,
	
						/**
						 * Float representation of the quantity.
						 */
						float: float,
	
						/**
						 * String representation of the quantity.
						 */
						numeric: string,
					},
					
					/**
					 * The estimated amount of gas required for a transaction.
					 */
					gas: number,
	
					/**
					 * The estimated time it will take for the output asset to be delivered to the user's wallet. Used only for bridge transactions, 0 otherwise.
					 */
					seconds: number,
				},

				liquidity_source: {
					/**
					 * The unique identifier of the liquidity source being used for the exchange.
					 */
					id: string,

					/**
					 * The name of the liquidity source.
					 */
					name: string,

					/**
					 * Icon related to object.
					 */
					icon: {
						/**
						 * URL of the icon.
						 */
						url: url | null,
					},
				},

				/**
				 * The address of the contract to which approval must be given. Approval is not needed for the base currency (for example ETH on ethereum chain). `null` when allowance is not required
				 */
				asset_spender: string | null,

				/**
				 * The type of slippage. Possible values are 'normal' and 'zero-slippage'.
				 * `normal` `zero-slippage`
				 */
				slippage_type: 'normal' | 'zero-slippage',

				/**
				 * An object representing a transaction that is to be signed by a wallet and to be sent to the blockchain. null if balance or allowance is not enough.
				 */
				transaction: {
					/**
					 * The address that the transaction is to be sent to, formatted in checksummed.
					 */
					to: string,

					/**
					 * The address that the transaction is to be signed by, formatted in checksummed format.
					 */
					from: string,

					/**
					 * The ID of the blockchain network, represented in hexadecimal format.
					 */
					chain_id: string,

					/**
					 * The amount of gas to be supplied for the transaction, which is set to be 15% higher than the estimation.
					 */
					gas: number,

					/**
					 * The data to be used as input for the transaction, represented in hexadecimal format.
					 */
					data: string,

					/**
					 * The amount of the blockchain's native asset to be sent with the transaction, represented in smaller units (wei).
					 */
					value: string,
				},

				fee: {
					protocol: {
						/**
						 * The Zerion fee without a fee waiver, expressed as a percentage.
						 */
						base_percent: float,

						/**
						 * The Zerion fee after considering the user's fee waiver, expressed as a percentage.
						 */
						percent: float,

						/**
						 * The Zerion fee after considering the user's fee waiver, taken of the output asset.
						 */
						quantity: {
							/**
							 * The integral representation of the quantity (123.45678 -> 12345678).
							 */
							int: string,

							/**
							 * Decimal number precision of the quantity - digits after the floating point.
							 */
							decimals: uint8,

							/**
							 * Float representation of the quantity.
							 */
							float: float,

							/**
							 * String representation of the quantity.
							 */
							numeric: string,
						},
					},

					integrator: {
						/**
						 * The fee charged by the integrator, expressed as a percentage.
						 */
						percent: float,

						/**
						 * The fee charged by the integrator, taken of the output asset.
						 */
						quantity: {
							/**
							 * The integral representation of the quantity (123.45678 -> 12345678).
							 */
							int: string,

							/**
							 * Decimal number precision of the quantity - digits after the floating point.
							 */
							decimals: uint8,

							/**
							 * Float representation of the quantity.
							 */
							float: float,

							/**
							 * String representation of the quantity.
							 */
							numeric: string,
						},
					},
				},
			},

			relationships: {
				input_chain: {
					links: {
						related: url,
					},

					data: {
						type: string,
						id: string,
					},
				},

				input_fungible: {
					links: {
						related: url,
					},

					data: {
						type: string,
						id: string,
					},
				},

				output_chain: {
					links: {
						related: url,
					},

					data: {
						type: string,
						id: string,
					},
				},

				output_fungible: {
					links: {
						related: url,
					},

					data: {
						type: string,
						id: string,
					},
				},
			},
		}[],
	}>(`v1/swap/offers`, {
		'input[from]': input.from,
		'input[chain_id]': input.chainId,
		'input[fungible_id]': input.fungibleId,
		'input[asset_address]': input.assetAddress,
		'input[amount]': input.amount,
		'output[to]': output.to,
		'output[chain_id]': output.chainId,
		'output[fungible_id]': output.fungibleId,
		'output[asset_address]': output.assetAddress,
		'output[amount]': output.amount,
		'gas_price': gasPrice,
		'liquidity_source_id': liquiditySourceId,
		'sort': sort,
		'slippage_percent': slippagePercent,
		'integrator[fee_percent]': integrator.feePercent,
		'integrator[beneficiary]': integrator.beneficiary,
	})
)



/**
 * Gas
 */


/**
 * Get list of all available gas prices
 * @link https://developers.zerion.io/reference/listgasprices
 * 
 * This endpoint provides real-time information on the current gas prices across all supported blockchain networks. Gas prices play a crucial role in the speed and cost of executing transactions on a blockchain, and fluctuate frequently based on network demand and usage. By using this endpoint, developers can stay up-to-date with the latest gas prices and adjust their application's transaction parameters accordingly to ensure optimal speed and cost efficiency.
 * 
 * Query Params
 * @param {string[]} filter[chain_ids] Return only gas prices from specified chains. You can find available chain ids in chain endpoints.
 * @param {string[]} filter[gas_types] Return only gas prices with specified gas-type.
 */
export const getGasPrices = async ({
	filter,
}: {
	filter: {
		chainIds: string[],
		gasTypes: (
			| 'classic'
			| 'eip1559'
			| 'optimistic'
		)[],
	},
}) => (
	get<{
		/**
		 * List of gas prices
		 */
		data: {
			/**
			 * Gas price resource type.
			 */
			type: string,

			/**
			 * Gas price unique identifier.
			 */
			id: string,

			attributes: {
				/**
				 * Date and time when the price was updated in ISO format.
				 */
				updated_at: string,

				/**
				 * Format of the gas.
				 */
				gas_type: string,

				/**
				 * Object that stores information related to gas prices on the Optimism blockchain.
				 */
				info: (
					| GasPricesClassic
					| GasPricesEip1559
					| GasPricesOptimistic
				),
			},

			relationships: {
				/**
				 * Gas price related resources.
				 */
				chain: {
					links: {
						related: url,
					},

					data: {
						type: string,
						id: string,
					},
				},
			},

			links: {
				self: url,
			},
		}[],
	}>(`v1/gas-prices/`, {
		'filter[chain_ids]': filter.chainIds.join(','),
		'filter[gas_types]': filter.gasTypes.join(','),
	})
)

/**
 * Object that stores gas prices in classic format.
 */
type GasPricesClassic = {
	/**
	 * The gas price for a slow transaction.
	 */
	slow: number,

	/**
	 * The gas price for a standard transaction.
	 */
	standard: number,

	/**
	 * The gas price for a fast transaction.
	 */
	fast: number,

	/**
	 * The gas price for a rapid transaction.
	 */
	rapid: number | null,
}

/**
 * Object that stores gas prices under the EIP-1559 proposal: https://eips.ethereum.org/EIPS/eip-1559
 */
type GasPricesEip1559 = {
	/**
	 * The base fee is an algorithmically determined amount of gas that is required for a transaction to be included in a block. It is dynamically adjusted based on network demand and burned whenever a transaction is included in a block.
	 */
	base_fee: number,

	/**
	 * Object that stores information about the gas price for a slow transaction.
	 */
	fast: {
		/**
		 * The suggested gas price (in wei) that you are willing to pay in order to ensure acceptance of your transaction.
		 */
		priority_fee: number,

		/**
		 * The suggested upper limit for the gas price (in wei) that you are willing to pay in order to ensure acceptance of your transaction.
		 */
		max_fee: number,

		/**
		 * An estimation of the time, measured in seconds, required for a transaction to be confirmed on the blockchain.
		 */
		estimation_seconds: number,
	},

	/**
	 * Object that stores information about the gas price for a slow transaction.
	 */
	slow: {
		/**
		 * The suggested gas price (in wei) that you are willing to pay in order to ensure acceptance of your transaction.
		 */
		priority_fee: number,

		/**
		 * The suggested upper limit for the gas price (in wei) that you are willing to pay in order to ensure acceptance of your transaction.
		 */
		max_fee: number,

		/**
		 * An estimation of the time, measured in seconds, required for a transaction to be confirmed on the blockchain.
		 */
		estimation_seconds: number,
	},

	/**
	 * Object that stores information about the gas price for a slow transaction.
	 */
	rapid: {
		/**
		 * The suggested gas price (in wei) that you are willing to pay in order to ensure acceptance of your transaction.
		 */
		priority_fee: number,

		/**
		 * The suggested upper limit for the gas price (in wei) that you are willing to pay in order to ensure acceptance of your transaction.
		 */
		max_fee: number,

		/**
		 * An estimation of the time, measured in seconds, required for a transaction to be confirmed on the blockchain.
		 */
		estimation_seconds: number,
	},

	/**
	 * Object that stores information about the gas price for a standard transaction.
	 */
	standard: {
		/**
		 * The suggested gas price (in wei) that you are willing to pay in order to ensure acceptance of your transaction.
		 */
		priority_fee: number,

		/**
		 * The suggested upper limit for the gas price (in wei) that you are willing to pay in order to ensure acceptance of your transaction.
		 */
		max_fee: number,

		/**
		 * An estimation of the time, measured in seconds, required for a transaction to be confirmed on the blockchain.
		 */
		estimation_seconds: number,
	},
}

/**
 * Object that stores information related to gas prices on the Optimism blockchain.
 */
type GasPricesOptimistic = {
	/**
	 * The total cost of submitting a transaction to Ethereum. This cost is incurred in addition to the L2 execution fee and is typically the primary cost component of a transaction on Optimism.
	 */
	l1: number,

	/**
	 * The cost of computation and storage used in executing a transaction on Layer 2. This is equivalent to the gas used multiplied by the gas price attached to the transaction.
	 */
	l2: number,

	/**
	 * A fixed overhead cost denominated in gas that is included in the L1 data fee calculation. This value is currently set to 2100 and does not vary based on the size or complexity of the transaction.
	 */
	fixed_overhead: number,

	/**
	 * A dynamic overhead cost that scales the L1 fee paid by a fixed number. This value is currently set to 1.0 and is included in the L1 data fee calculation. The L1 gas price used to charge the data fee is automatically updated when new data is received from Ethereum, which may result in users paying a higher or lower than estimated L1 data fee by up to 25%.
	 */
	dynamic_overhead: number,
}



/**
 * NFTs
 */


type NftCollectionContainerNoMarketData = {
	/**
	 * NFT collections resource type.
	 */
	type: string,

	/**
	 * Unique NFT collection ID.
	 */
	id: string,

	attributes: {
		/**
		 * Metadata associated with the NFT.
		 */
		metadata: {
			/**
			 * The name of the collection.
			 */
			name: string,

			/**
			 * The description of the collection.
			 */
			description: string,

			content: {
				/**
				 * Icon related to object.
				 */
				icon: {
					/**
					 * URL of the icon.
					 */
					url: url | null,
				},

				/**
				 * The URL for the collection's banner image.
				 */
				banner: {
					/**
					 * URL to the content
					 */
					url: url,

					/**
					 * MIME content type
					 */
					content_type: string,
				},
			},

			/**
			 * The symbol for the payment token used by the collection.
			 */
			payment_token_symbol: string,
		},
	},
}


/**
 * Get list of NFTs
 * @link https://developers.zerion.io/reference/listnfts
 * 
 * This endpoint returns list of NFTs by using different parameters.
 * 
 * Query Params
 * @param {string of strings} filter[references]
 *   Keep only NFTs matching specified references.
 *   Reference format is `chain_id:contract_address:token_id`.
 *   References should be separated by comma `,`.
 *   `chain_id`- ID of the chain where NFT exists, can be found in /chains endpoint.
 *   `contract_address` address of the deployed contract which NFT belongs to.
 *   `token_id` id of the NFT withing specified `contract_address`.
 *   NOTE: parameter currently is mandatory and can not be omitted.
 * @param {string} currency Denominated currency value of returned prices
 * @param {string[]} include Array of related resources to be included to the response. This parameter corresponds to the JSON API schema.
 */
export const getNfts = async ({
	filter,
	currency,
	include,
}: {
	filter: {
		references: string[],
	},
	currency: Currency,
	include: string[],
}) => (
	get<{
		links: {
			self: url,
		},

		data: NftContainer[],

		included: NftCollectionContainerNoMarketData[],
	}>(`v1/nfts/`, {
		'filter[references]': filter.references.join(','),
		'currency': currency,
		'include': include.join(','),
	})
)


/**
 * Get single NFT by ID
 * @link https://developers.zerion.io/reference/getnftbyid
 * 
 * This endpoint returns single NFT by its unique identifier.
 * 
 * Path Params
 * @param {string} nft_id NFT unique identifier
 * 
 * Query Params
 * @param {string} currency Denominated currency value of returned prices
 * @param {string[]} include Array of related resources to be included to the response. This parameter corresponds to the JSON API schema.
 */
export const getNftById = async ({
	nftId,
	currency,
	include,
}: {
	nftId: string,
	currency: Currency,
	include: string[],
}) => (
	get<{
		links: {
			self: url,
		},

		data: NftContainer,
	}>(`v1/nfts/${nftId}`, {
		'currency': currency,
		'include': include.join(','),
	})
)
