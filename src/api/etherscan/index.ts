import * as publicEnv from '$env/static/public'

import ky, { type Options } from 'ky'

import { ConcurrentPromiseQueue } from '$/utils/ConcurrentPromiseQueue'

import type { Ethereum } from '$/data/networks/types'
import { networkByChainId } from '$/data/networks'

const endpointByChainId = {
	1: 'https://api.etherscan.io/api',
	3: 'https://api-ropsten.etherscan.io/api',
	4: 'https://api-rinkeby.etherscan.io/api',
	5: 'https://api-goerli.etherscan.io/api',
	10: 'https://api-optimistic.etherscan.io/api',
	25: 'https://api.cronoscan.com/api',
	42: 'https://api-kovan.etherscan.io/api',
	56: 'https://api.bscscan.com/api',
	97: 'https://api-testnet.bscscan.com/api',
	137: 'https://api.polygonscan.com/api',
	250: 'https://api.ftmscan.com/api',
	420: 'https://api-goerli-optimistic.etherscan.io/api',
	1284: 'https://api-moonbeam.moonscan.io/api',
	1285: 'https://api-moonriver.moonscan.io/api',
	1287: 'https://api-moonbase.moonscan.io/api',
	4002: 'https://api-testnet.ftmscan.com/api',
	8453: 'https://api.basescan.org/api',
	84531: 'https://api-goerli.basescan.org/api',
	42170: 'https://api-nova.arbiscan.io/api',
	42161: 'https://api.arbiscan.io/api',
	43114: 'https://api.snowtrace.io/api',
	43113: 'https://api-testnet.snowtrace.io/api',
	80001: 'https://api-testnet.polygonscan.com/api',
	421611: 'https://api-testnet.arbiscan.io/api',
	421613: 'https://api-goerli.arbiscan.io/api',
	11155111: 'https://api-sepolia.etherscan.io/api',
} as const satisfies Record<Ethereum.ChainId, string>

export const chainIdByDomain = Object.fromEntries(
	Object.entries(endpointByChainId)
		.map(([chainId, endpointUrl]) => [
			new URL(endpointUrl).origin.replace(/[/][/]api[-.]/, '//'),
			// new URL(endpointUrl).origin.replace(/(?<=[/][/])api[-.]/, ''),
			chainId
		])
) satisfies Record<string, Ethereum.ChainId>

type ChainId = keyof typeof endpointByChainId


const queue = new ConcurrentPromiseQueue(3)

const get = async <T, IsRpcProxyCall extends boolean = false>(
	chainId: ChainId,
	options: Options,
	isRpcProxyCall?: IsRpcProxyCall = false,
): Promise<T> => {
	const endpointUrl = endpointByChainId[chainId]

	if(!endpointUrl)
		throw new Error(`Etherscan doesn't support ${networkByChainId.get(chainId).name}.`)

	const getJson = async <T>(url: string, options: Options) => await ky.get(url, options).json<T>()

	return await queue.enqueue(async () => (
		await getJson<
			IsRpcProxyCall extends true
				? { jsonrpc: string, id: number, result: T }
				: { status: number, result: T }
		>(
			endpointUrl,
			{
				...options,
				searchParams: {
					...options?.searchParams as Record<string, string | number>,
					apikey: publicEnv[`PUBLIC_ETHERSCAN_API_KEY_${chainId}`],
				}
			}
		)
			.then(
				isRpcProxyCall
					? ({ result, message }) => {
						if(message?.startsWith('NOTOK')) throw result ?? message
						return result
					}
					: ({ status, result, message }) => {
						if (message?.startsWith('NOTOK')) throw result ?? message
						if (status != 1) throw result ?? message
						return result
					}
			)
	))
}

const post = async (
	chainId: ChainId,
	options: Options,
) => {
	const endpointUrl = endpointByChainId[chainId]

	if(!endpointUrl)
		throw new Error(`Etherscan doesn't support ${networkByChainId.get(chainId).name}.`)

	const postText = async (url: string, options: Options) => await ky.post(url, options).text()

	return await queue.enqueue(async () => (
		await postText(
			endpointUrl,
			{
				...options,
				json: {
					...options?.json as Record<string, string | number>,
					apikey: publicEnv[`PUBLIC_ETHERSCAN_API_KEY_${chainId}`],
				},
			}
		)
			.then((result) => {
				if (result.startsWith('Error')) throw result
				return result
			})
	))
}


/**
 * Etherscan API
 * @see https://etherscan.io/apis
 * @see https://docs.etherscan.io/api-endpoints
 */
export namespace Etherscan {
	/**
	 * Accounts
	 * @see https://docs.etherscan.io/api-endpoints/accounts
	 */
	export namespace Accounts {
		type Transaction = {
			blockNumber: `${Ethereum.BlockNumber}`,
			timeStamp: `${number}`,
			hash: Ethereum.TransactionId,
			nonce: `${Ethereum.TransactionNonce}`,
			blockHash: Ethereum.BlockHash,
			transactionIndex: `${Ethereum.TransactionIndex}`,
			from: Ethereum.Address,
			to: Ethereum.Address,
			value: `${number}`,
			gas: `${Ethereum.GasAmount}`,
			gasPrice: `${Ethereum.NativeCurrencyAmount}`,
			isError: '0' | '1',
			txreceipt_status: '0' | '1',
			input: `0x${string}`,
			contractAddress: Ethereum.ContractAddress | '',
			cumulativeGasUsed: `${number}`,
			gasUsed: `${number}`,
			confirmations: `${number}`,
			methodId: `0x${string}`,
			functionName: string,
		}

		type InternalTransaction = {
			blockNumber: `${Ethereum.BlockNumber}`,
			timeStamp: `${number}`,
			from: Ethereum.Address,
			to: Ethereum.Address,
			value: `${number}`,
			contractAddress: Ethereum.ContractAddress | '',
			input: '' | `0x${string}`,
			type: 'call',
			gas: `${Ethereum.GasAmount}`,
			gasUsed: `${Ethereum.GasAmount}`,
			isError: '0' | '1',
			errCode: '',
		}

		/**
		 * Get Ether Balance for a Single Address
		 * Returns the Ether balance of a given address.
		 * 
		 * @param address the `string` representing the address to check for balance
		 * @param tag the `string` pre-defined block parameter, either `earliest`, `pending` or `latest`
		 * 
		 * 📖 Tip: The `result` is returned in **wei**.
		 */
		export const getBalance = async ({
			chainId,
			address,
			tag = 'latest',
		}: {
			chainId: ChainId,
			address: Ethereum.Address,
			tag?: 'earliest' | 'pending' | 'latest',
		}) => await get(chainId, {
			searchParams: {
				module: 'account',
				action: 'balance',
				address,
				tag,
			},
		}) as `${string}`

		/**
		 * Get Ether Balance for Multiple Addresses in a Single Call
		 * Returns the balance of the accounts from a list of addresses.
		 * 
		 * @param address the `string`s representing the addresses to check for balance, separated by `,`. up to **20 addresses** per call
		 * @param tag the `integer` pre-defined block parameter, either `earliest`, `pending` or `latest`
		 * 
		 * 📖 Tip: The `result` is returned in **wei**.
		 */
		export const getBalanceMulti = async ({
			chainId,
			address,
		}: {
			chainId: ChainId,
			address: Ethereum.Address,
		}) => await get(chainId, {
			searchParams: {
				module: 'account',
				action: 'balanceMulti',
				address: [address].flat().join(','),
				tag: 'latest',
			},
		})

		/**
		 * Get a list of 'Normal' Transactions By Address
		 * Returns the list of transactions performed by an address, with optional pagination.
		 * > 📝 Note: This API endpoint returns a maximum of **10000 records** only.
		 * 
		 * @param address the `string` representing the addresses to check for balance
		 * @param start block the `integer` block number to start searching for transactions
		 * @param endblock the `integer` block number to stop searching for transactions
		 * @param page the `integer` page number, if pagination is enabled
		 * @param offset the number of transactions displayed per page
		 * @param sort the sorting preference, use `asc` to sort by ascending and `desc` to sort by descending
		 * 
		 * 💡 Tip: Specify a smaller `startblock` and `endblock` range for faster search results.
		 */
		export const getTransactions = async ({
			chainId,
			address,
			startBlock,
			endBlock,
			page = 1,
			offset = 10,
			sort = 'desc',
		}: {
			chainId: ChainId,
			address: Ethereum.Address,
			startBlock: Ethereum.BlockNumber,
			endBlock: Ethereum.BlockNumber,
			page?: number,
			offset?: number,
			sort?: 'asc' | 'desc',
		}) => await get(chainId, {
			searchParams: {
				module: 'account',
				action: 'txlist',
				address,
				startblock: Number(startBlock),
				endblock: Number(endBlock),
				page,
				offset,
				sort,
			},
		}) as Transaction[]

		/**
		 * Get a list of 'Internal' Transactions by Address
		 * Returns the list of internal transactions performed by an address, with optional pagination.
		 * > 📝 Note: This API endpoint returns a maximum of 10000 records only.
		 * 
		 * @param address the `string` representing the addresses to check for balance
		 * @param startblock the `integer` block number to start searching for transactions
		 * @param endblock the `integer` block number to stop searching for transactions
		 * @param page the `integer` page number, if pagination is enabled
		 * @param offset the number of transactions displayed per page
		 * @param sort the sorting preference, use `asc` to sort by ascending and `desc` to sort by descending
		 * 
		 * 💡 Tip: Specify a smaller `startblock` and `endblock` range for faster search results.
		 */
		export const getTransactionsInternal = async ({
			chainId,
			address,
			startBlock,
			endBlock,
			page = 1,
			offset = 10,
			sort = 'desc',
		}: {
			chainId: ChainId,
			address: Ethereum.Address,
			startBlock: Ethereum.BlockNumber,
			endBlock: Ethereum.BlockNumber,
			page?: number,
			offset?: number,
			sort?: 'asc' | 'desc',
		}) => await get(chainId, {
			searchParams: {
				module: 'account',
				action: 'txlistinternal',
				address,
				startblock: Number(startBlock),
				endblock: Number(endBlock),
				page,
				offset,
				sort,
			},
		}) as (InternalTransaction & {
			traceId: `${number}`,
		})[]

		/**
		 * Get 'Internal Transactions' by Transaction Hash
		 * Returns the list of internal transactions performed within a transaction.
		 * > 📝 Note: This API endpoint returns a maximum of **10000 records** only.
		 * 
		 * @param txhash the `string` representing the transaction hash to check for internal transactions
		 * 
		 * > The `isError` field returns `0` for **successful transactions** and `1` for **rejected/cancelled transactions**.
		 */
		export const getTransactionsInternalByHash = async ({
			chainId,
			transactionHash,
		}: {
			chainId: ChainId,
			transactionHash: string,
		}) => await get(chainId, {
			searchParams: {
				module: 'account',
				action: 'txlistinternal',
				txhash: transactionHash,
			},
		}) as InternalTransaction[]

		/**
		 * Get "Internal Transactions" by Block Range
		 * Returns the list of internal transactions performed within a block range, with optional pagination.
		 * > 📝 Note: This API endpoint returns a maximum of **10000 records** only.
		 * 
		 * @param startblock the integer block number to start searching for transactions
		 * @param endblock the integer block number to stop searching for transactions
		 * @param page the integer page number, if pagination is enabled
		 * @param offset the number of transactions displayed per page
		 * @param sort the sorting preference, use `asc` to sort by ascending and `desc` to sort by descending
		 * 
		 * > The `isError` field returns `0` for **successful transactions** and `1` for **rejected/cancelled transactions**.
		 */
		export const getTransactionsInternalByBlock = async ({
			chainId,
			startBlock,
			endBlock,
			page = 1,
			offset = 10,
			sort = 'desc',
		}: {
			chainId: ChainId,
			startBlock: Ethereum.BlockNumber,
			endBlock: Ethereum.BlockNumber,
			page?: number,
			offset?: number,
			sort?: 'asc' | 'desc',
		}) => await get(chainId, {
			searchParams: {
				module: 'account',
				action: 'txlistinternal',
				startblock: Number(startBlock),
				endblock: Number(endBlock),
				page,
				offset,
				sort,
			},
		}) as InternalTransaction[]

		/**
		 * Get a list of 'ERC20 - Token Transfer Events' by Address
		 * Returns the list of ERC20 token transfer events performed by an address, with optional pagination.
		 * > 📝 Note: This API endpoint returns a maximum of 10000 records only.
		 * 
		 * @param address the string representing the address to check for balance
		 * @param startblock the integer block number to start searching for transactions
		 * @param endblock the integer block number to stop searching for transactions
		 * @param page the integer page number, if pagination is enabled
		 * @param offset the number of transactions displayed per page
		 * @param sort the sorting preference, use `asc` to sort by ascending and `desc` to sort by descending Tip: Specify a smaller `startblock` and `endblock` range for faster search results.
		 * 
		 * Usage:
		 * * ERC-20 transfers from an **address**, specify the `address` parameter
		 * * ERC-20 transfers from a **contract address**, specify the `contract address` parameter
		 * * ERC-20 transfers from an **address** filtered by a token contract, specify both `address` and `contract address` parameters.
		 */
		export const getTransactionsToken = async ({
			chainId,
			address,
			contractAddress,
			startBlock,
			endBlock,
			page = 1,
			offset = 100,
			sort = 'desc',
		}: {
			chainId: ChainId,
		} & (
			{
				address: Ethereum.Address,
				contractAddress?: undefined,
			} | {
				address?: undefined,
				contractAddress: Ethereum.ContractAddress,
			} | {
				address: Ethereum.Address,
				contractAddress: Ethereum.ContractAddress,
			}
		) & {
			startBlock: Ethereum.BlockNumber,
			endBlock: Ethereum.BlockNumber,
			page?: number,
			offset?: number,
			sort?: 'asc' | 'desc',
		}) => await get(chainId, {
			searchParams: {
				module: 'account',
				action: 'tokentx',
				...(address && { address }),
				...(contractAddress && { contractaddress: contractAddress }),
				startblock: Number(startBlock),
				endblock: Number(endBlock),
				page,
				offset,
				sort,
			},
		}) as {
			blockNumber: number,
			timeStamp: `${number}`,
			hash: Ethereum.TransactionId,
			nonce: Ethereum.TransactionNonce,
			blockHash: Ethereum.BlockHash,
			from: Ethereum.Address,
			contractAddress: Ethereum.ContractAddress,
			to: Ethereum.Address,

			value: `${number}`,
			tokenName: string,
			tokenSymbol: string,
			tokenDecimal: `${number}`,

			transactionIndex: `${Ethereum.TransactionIndex}`,
			gas: `${Ethereum.GasAmount}`,
			gasPrice: `${Ethereum.NativeCurrencyAmount}`,
			gasUsed: `${Ethereum.GasAmount}`,
			cumulativeGasUsed: `${Ethereum.GasAmount}`,
			// input: string,
			confirmations: `${number}`,
		}[]

		/**
		 * Get a list of 'ERC721 - Token Transfer Events' by Address
		 * Returns the list of ERC-721 ( NFT ) tokens transferred by an address, with optional filtering by token contract.
		 * 
		 * @param address the `string` representing the addresses to check for balance
		 * @param contractaddress the `string` representing the token contract address to check for balance
		 * @param startblock the `integer` block number to start searching for transactions
		 * @param endblock the `integer` block number to stop searching for transactions
		 * @param page the `integer` page number, if pagination is enabled
		 * @param offset the number of transactions displayed per page
		 * @param sort the sorting preference, use `asc` to sort by ascending and `desc` to sort by descending Tip: Specify a smaller `startblock` and `endblock` range for faster search results.
		 * 
		 * Usage:
		 * * ERC-721 transfers from an **address**, specify the `address` parameter
		 * * ERC-721 transfers from a **contract address**, specify the `contract address` parameter
		 * * ERC-721 transfers from an **address** filtered by a **token contract**, specify both `address` and `contract address` parameters.
		 */
		export const getTransactionsTokenNFT = async ({
			chainId,
			address,
			contractAddress,
			startBlock,
			endBlock,
			page = 1,
			offset = 100,
			sort = 'desc',
		}: {
			chainId: ChainId,
		} & (
			{
				address: Ethereum.Address,
				contractAddress?: undefined,
			} | {
				address?: undefined,
				contractAddress: Ethereum.ContractAddress,
			} | {
				address: Ethereum.Address,
				contractAddress: Ethereum.ContractAddress,
			}
		) & {
			startBlock: Ethereum.BlockNumber,
			endBlock: Ethereum.BlockNumber,
			page?: number,
			offset?: number,
			sort?: 'asc' | 'desc',
		}) => await get(chainId, {
			searchParams: {
				module: 'account',
				action: 'tokennfttx',
				...(address && { address }),
				...(contractAddress && { contractaddress: contractAddress }),
				startblock: Number(startBlock),
				endblock: Number(endBlock),
				page,
				offset,
				sort,
			},
		}) as {
			blockNumber: number,
			timeStamp: `${number}`,
			hash: Ethereum.TransactionId,
			nonce: Ethereum.TransactionNonce,
			blockHash: Ethereum.BlockHash,
			from: Ethereum.Address,
			contractAddress: Ethereum.ContractAddress,
			to: Ethereum.Address,

			tokenID: `${number}`,
			tokenName: string,
			tokenSymbol: string,
			tokenDecimal: `${number}`,

			transactionIndex: `${Ethereum.TransactionIndex}`,
			gas: `${Ethereum.GasAmount}`,
			gasPrice: `${Ethereum.NativeCurrencyAmount}`,
			gasUsed: `${Ethereum.GasAmount}`,
			cumulativeGasUsed: `${Ethereum.GasAmount}`,
			// input: string,
			confirmations: `${number}`,
		}[]

		/**
		 * Get a list of 'ERC1155 - Token Transfer Events' by Address
		 * Returns the list of ERC-1155 ( Multi Token Standard ) tokens transferred by an address, with optional filtering by token contract.
		 * 
		 * @param address the string representing the address to check for balance
		 * @param contractaddress the string representing the token contract address to check for balance
		 * @param startblock the integer block number to start searching for transactions
		 * @param endblock the integer block number to stop searching for transactions
		 * @param page the integer page number, if pagination is enabled
		 * @param offset the number of transactions displayed per page
		 * @param sort the sorting preference, use `asc` to sort by ascending and `desc` to sort by descending Tip: Specify a smaller `startblock` and `endblock` range for faster search results.
		 * 
		 * Usage:
		 * * ERC-1155 transfers from an **address**, specify the `address` parameter
		 * * ERC-1155 transfers from a **contract address**, specify the `contract address` parameter
		 * * ERC-1155 transfers from an **address** filtered by a token contract, specify both `address` and `contract address` parameters.
		 */
		export const getErc1155Transfers = async ({
			chainId,
			address,
			contractAddress,
			startBlock,
			endBlock,
			page = 1,
			offset = 100,
			sort = 'desc',
		}: {
			chainId: ChainId,
		} & (
			{
				address: Ethereum.Address,
				contractAddress?: undefined,
			} | {
				address?: undefined,
				contractAddress: Ethereum.ContractAddress,
			} | {
				address: Ethereum.Address,
				contractAddress: Ethereum.ContractAddress,
			}
		) & {
			startBlock: Ethereum.BlockNumber,
			endBlock: Ethereum.BlockNumber,
			page?: number,
			offset?: number,
			sort?: 'asc' | 'desc',
		}) => await get(chainId, {
			searchParams: {
				module: 'account',
				action: 'token1155tx',
				...(address && { address }),
				...(contractAddress && { contractaddress: contractAddress }),
				startblock: Number(startBlock),
				endblock: Number(endBlock),
				page,
				offset,
				sort,
			},
		}) as {
			blockNumber: `${Ethereum.BlockNumber}`,
			timeStamp: `${number}`,
			hash: Ethereum.TransactionId,
			nonce: Ethereum.TransactionNonce,
			blockHash: Ethereum.BlockHash,
			from: Ethereum.Address,
			contractAddress: Ethereum.ContractAddress,
			to: Ethereum.Address,

			tokenID: `${number}`,
			tokenValue: `${number}`,
			tokenName: string,
			tokenSymbol: string,
			tokenDecimal: `${number}`,

			transactionIndex: `${Ethereum.TransactionIndex}`,
			gas: `${Ethereum.GasAmount}`,
			gasPrice: `${Ethereum.NativeCurrencyAmount}`,
			gasUsed: `${Ethereum.GasAmount}`,
			cumulativeGasUsed: `${Ethereum.GasAmount}`,
			// input: string,
			confirmations: `${number}`,
		}[]

		/**
		 * Get list of Blocks Mined by Address
		 * Returns the list of blocks mined by an address.
		 * Get list of Blocks Validated by Address
		 * Returns the list of blocks validated by an address.
		 * 
		 * @param address the `string` representing the address to check for balance
		 * @param blocktype the `string` pre-defined block type, either `blocks` for canonical blocks or `uncles` for uncle blocks only
		 * @param page the `integer` page number, if pagination is enabled
		 * @param offset the number of transactions displayed per page
		 * 
		 * > ⏳ Note: The `timeStamp` is represented in **Unix timestamp**.
		 */
		export const getBlocksMined = async ({
			chainId,
			address,
			blockType = 'blocks',
			page = 1,
			offset = 10,
		}: {
			chainId: ChainId,
			address: Ethereum.Address,
			blockType?: 'blocks' | 'uncles',
			page?: number,
			offset?: number,
		}) => await get(chainId, {
			searchParams: {
				module: 'account',
				action: 'getminedblocks',
				address,
				blocktype: blockType,
				page,
				offset,
			},
		}) as {
			blockNumber:`${Ethereum.BlockNumber}`,
			timeStamp: `${number}`,
			blockReward: `${number}`,
		}[]

		/**
		 * Get Beacon Chain Withdrawals by Address and Block Range
		 * Returns the beacon chain withdrawals made to an address.
		 * 
		 * @param address the `string` representing the address to check for beacon withdrawals
		 * @param contractaddress the `string` representing the token contract address to check for balance
		 * @param page the `integer` page number, if pagination is enabled
		 * @param offset the number of transactions displayed per page
		 * @param startblock the `integer` block number to start searching for transactions
		 * @param endblock the `integer` block number to stop searching for transactions
		 * @param sort the sorting preference, use `asc` to sort by ascending and `desc` to sort by descending
		 */
		export const getBalanceChainWithdrawals = async ({
			chainId,
			address,
			// contractAddress,
			page = 1,
			offset = 10,
			sort = 'asc',
		}: {
			chainId: ChainId,
			address: Ethereum.Address,
			// contractAddress: Ethereum.ContractAddress,
			page?: number,
			offset?: number,
			sort?: 'asc' | 'desc',
		}) => await get(chainId, {
			searchParams: {
				module: 'account',
				action: 'txsBeaconWithdrawal',
				address,
				// contractaddress: contractAddress,
				page,
				offset,
				sort,
			},
		}) as {
			withdrawalIndex: `${number}`,
			validatorIndex: `${number}`,
			address: Ethereum.Address,
			amount: `${number}`,
			blockNumber: `${Ethereum.BlockNumber}`,
			timestamp: `${number}`,
		}[]

		/**
		 * Get Historical Ether Balance for a Single Address By BlockNo (Pro)
		 * Returns the balance of an address at a certain block height.
		 * 
		 * @param address the integer block number to check balance for eg. 12697906
		 * 
		 * 📖 Tip: The `result` field is denoted in **wei**.
		 */
		export const getBalanceHistory = async ({
			chainId,
			address,
		}: {
			chainId: ChainId,
			address: Ethereum.Address,
		}) => await get(chainId, {
			searchParams: {
				module: 'account',
				action: 'balancehistory',
				address,
			},
		}) as `${bigint}`
	}

	/**
	 * Contracts
	 * @see https://docs.etherscan.io/api-endpoints/contracts
	 */
	export namespace Contracts {
		/**
		 * Get Contract ABI for Verified Contract Source Codes
		 * Returns the Contract Application Binary Interface ( ABI ) of a verified smart contract.
		 * > Find verified contracts ✅ on our [Verified Contracts Source Code](https://etherscan.io/contractsVerified) page.
		 * 
		 * @param address the `contract address` that has a verified source code
		 */
		export const getAbi = async ({
			chainId,
			contractAddress,
		}: {
			chainId: ChainId,
			contractAddress: Ethereum.ContractAddress,
		}) => await get(chainId, {
			searchParams: {
				module: 'contract',
				action: 'getabi',
				address: contractAddress,
			},
		}) as ReturnType<typeof JSON.stringify>

		/**
		 * Get Contract Source Code for Verified Contract Source Codes
		 * Returns the Solidity source code of a verified smart contract.
		 * 
		 * @param address the `contract address` that has a verified source code
		 */
		export const getSource = async ({
			chainId,
			contractAddress,
		}: {
			chainId: ChainId,
			contractAddress: Ethereum.Address,
		}) => await get(chainId, {
			searchParams: {
				module: 'contract',
				action: 'getsourcecode',
				address: contractAddress,
			},
		}).then((result: any) => result[0] as {
			SourceCode: string,
			ABI: ReturnType<typeof JSON.stringify>,
			ContractName: string,
			CompilerVersion: string,
			OptimizationUsed: `${number}`,
			Runs: `${number}`,
			ConstructorArguments: string,
			EVMVersion: string | "Default",
			Library: string,
			LicenseType: string,
			Proxy: `${number}`,
			Implementation: string,
			SwarmSource: string | `ipfs://${string}`
		})

		/**
		 * Get Contract Creator and Creation Tx Hash
		 * Returns a contract's deployer address and transaction hash it was created, up to 5 at a time.
		 * @param contractaddresses the `contract address`, up to 5 at a time
		 */
		export const getCreationMetadata = async ({
			chainId,
			contractAddresses,
		}: {
			chainId: ChainId,
			contractAddresses: Ethereum.ContractAddress[],
		}) => await get(chainId, {
			searchParams: {
				module: 'contract',
				action: 'getcontractcreation',
				contractaddresses: contractAddresses.join(','),
			},
		}) as {
			contractAddress: Ethereum.ContractAddress,
			contractCreator: Ethereum.Address,
			txHash: Ethereum.TransactionId,
		}[]

		/**
		 * Verify Source Code
		 * Submits a contract source code to Etherscan for verification.
		 * > 📝 Note: This endpoint is limited to **100 verifications/day**, regardless of API PRO tier.
		 * 1. Requires a valid [Etherscan API key](https://docs.etherscan.io/getting-started/viewing-api-usage-statistics), it will be rejected otherwise
		 * 2. Only supports HTTP POST due to max transfer size limitations for HTTP GET
		 * 3. Supports up to 10 different library pairs
		 * 4. Contracts that use "imports" will need to have the code concatenated into one file as we do not support "imports" in separate files.
		 * 5. List of [supported solc versions](https://etherscan.io/solcversions), only solc version v0.4.11 and above is supported e.g. v0.4.25+commit.59dbf8f1
		 * 6. Upon successful submission you will receive a GUID (50 characters) as a receipt
		 * 7. You may use this GUID to track the status of your submission
		 * 8. Verified Source Codes will be displayed at the [Verified Contracts](https://etherscan.io/contractsVerified) page.
		 * 
		 * @param sourceCode Contract Source Code (Flattened if necessary)
		 * @param codeformat solidity-single-file (default) or solidity-standard-json-input (for std-input-json-format support
		 * @param contractname ContractName (if codeformat=solidity-standard-json-input, then enter contractname as ex: erc20.sol:erc20)
		 * @param compilerversion see https://etherscan.io/solcversions for list of support versions
		 * @param optimizationUsed 0 = No Optimization, 1 = Optimization used (applicable when codeformat=solidity-single-file)
		 * @param runs set to 200 as default unless otherwise (applicable when codeformat=solidity-single-file)
		 * @param constructorArguements if applicable
		 * @param evmversion leave blank for compiler default, homestead, tangerineWhistle, spuriousDragon, byzantium, constantinople, petersburg, istanbul (applicable when codeformat=solidity-single-file)
		 * @param licenseType Valid codes 1-14 where 1=No License .. 14=Business Source License 1.1, see https://etherscan.io/contract-license-types
		 * @param libraryname1 if applicable, a matching pair with libraryAddress1 required
		 * @param libraryaddress1 if applicable, a matching pair with libraryName1 required
		 * @param libraryname2 if applicable, matching pair required
		 * @param libraryaddress2 if applicable, matching pair required
		 * @param libraryname3 if applicable, matching pair required
		 * @param libraryaddress3 if applicable, matching pair required
		 * @param libraryname4 if applicable, matching pair required
		 * @param libraryaddress4 if applicable, matching pair required
		 * @param libraryname5 if applicable, matching pair required
		 * @param libraryaddress5 if applicable, matching pair required
		 * @param libraryname6 if applicable, matching pair required
		 * @param libraryaddress6 if applicable, matching pair required
		 * @param libraryname7 if applicable, matching pair required
		 * @param libraryaddress7 if applicable, matching pair required
		 * @param libraryname8 if applicable, matching pair required
		 * @param libraryaddress8 if applicable, matching pair required
		 * @param libraryname9 if applicable, matching pair required
		 * @param libraryaddress9 if applicable, matching pair required
		 * @param libraryname10 if applicable, matching pair required
		 * @param libraryaddress10 if applicable, matching pair required
		 * 
		 * > 👇 Note: Upon successful submission, a **GUID** is returned, which can be used to check for **submission status**.
		 */
		export const verify = async ({
			chainId,
			sourceCode,
			codeFormat,
			contractName,
			compilerVersion,
			optimizationUsed,
			runs,
			constructorArguments: constructorArguments,
			evmVersion: evmVersion,
			licenseType,
			libraryName1,
			libraryAddress1,
			libraryName2,
			libraryAddress2,
			libraryName3,
			libraryAddress3,
			libraryName4,
			libraryAddress4,
			libraryName5,
			libraryAddress5,
			libraryName6,
			libraryAddress6,
			libraryName7,
			libraryAddress7,
			libraryName8,
			libraryAddress8,
			libraryName9,
			libraryAddress9,
			libraryName10,
			libraryAddress10,
		}: {
			chainId: ChainId,
			sourceCode: string,
			codeFormat: string,
			contractName: string,
			compilerVersion: string,
			optimizationUsed: number,
			runs: number,
			constructorArguments: string,
			evmVersion: string,
			licenseType: string,
			libraryName1?: string,
			libraryAddress1?: string,
			libraryName2?: string,
			libraryAddress2?: string,
			libraryName3?: string,
			libraryAddress3?: string,
			libraryName4?: string,
			libraryAddress4?: string,
			libraryName5?: string,
			libraryAddress5?: string,
			libraryName6?: string,
			libraryAddress6?: string,
			libraryName7?: string,
			libraryAddress7?: string,
			libraryName8?: string,
			libraryAddress8?: string,
			libraryName9?: string,
			libraryAddress9?: string,
			libraryName10?: string,
			libraryAddress10?: string,
		}) => await post(chainId, {
			json: {
				module: 'contract',
				action: 'verifysourcecode',
				sourceCode,
				codeformat: codeFormat,
				contractname: contractName,
				compilerversion: compilerVersion,
				optimizationUsed: optimizationUsed,
				runs,
				constructorArguements: constructorArguments,
				evmversion: evmVersion,
				licenseType: licenseType,
				libraryname1: libraryName1,
				libraryaddress1: libraryAddress1,
				libraryname2: libraryName2,
				libraryaddress2: libraryAddress2,
				libraryname3: libraryName3,
				libraryaddress3: libraryAddress3,
				libraryname4: libraryName4,
				libraryaddress4: libraryAddress4,
				libraryname5: libraryName5,
				libraryaddress5: libraryAddress5,
				libraryname6: libraryName6,
				libraryaddress6: libraryAddress6,
				libraryname7: libraryName7,
				libraryaddress7: libraryAddress7,
				libraryname8: libraryName8,
				libraryaddress8: libraryAddress8,
				libraryname9: libraryName9,
				libraryaddress9: libraryAddress9,
				libraryname10: libraryName10,
				libraryaddress10: libraryAddress10,
			},
		}) as string

		/**
		 * Check Source Code Verification Submission Status
		 */
		export const checkVerificationStatus = async ({
			chainId,
			guid,
		}: {
			chainId: ChainId,
			guid: string
		}) => await get(chainId, {
			searchParams: {
				module: 'contract',
				action: 'checkverifystatus',
				guid,
			},
		})

		/**
		 * Verify Proxy Contract
		 * Submits a proxy contract source code to Etherscan for verification.
 		 * 1. Requires a valid Etherscan API key, it will be rejected otherwise
 		 * 2. Current daily limit of 100 submissions per day per user (subject to change)
 		 * 3. Only supports HTTP post
 		 * 4. Upon successful submission you will receive a GUID (50 characters) as a receipt
 		 * 5. You may use this GUID to track the status of your submission
 		 * 6. Verified proxy contracts will display the "Read/Write as Proxy" of the implementation contract under the contract address's contract tab
		 * 
		 * @param expectedimplementation enforces a check to ensure the returned implementation contract address == address picked up by the verifier
		 */
		export const verifyProxyContract = async ({
			chainId,
			contractAddress,
			compareToContractAddress,
		}: {
			chainId: ChainId,
			contractAddress: Ethereum.ContractAddress,
			compareToContractAddress?: Ethereum.ContractAddress,
		}) => await post(chainId, {
			json: {
				module: 'contract',
				action: 'verifyproxycontract',
				address: contractAddress,
				expectedimplementation: compareToContractAddress,
			},
		}) as string

		/**
		 * Checking Proxy Contract Verification Submission Status
		 */
		export const checkProxyVerificationStatus = async ({
			chainId,
			guid,
		}: {
			chainId: ChainId,
			guid: string
		}) => await get(chainId, {
			searchParams: {
				module: 'contract',
				action: 'checkproxyverification',
				guid,
			},
		})
	}

	/**
	 * Transactions
	 * @see https://docs.etherscan.io/api-endpoints/stats
	 */
	export namespace Transactions {
		/**
		 * Check Contract Execution Status
		 * Returns the status code of a contract execution.
		 * 
		 * @param txhash the `string` representing the transaction hash to check the execution status
		 * 
		 * > 📖 Tip: The `isError` field returns `0` for **successful transactions** and `1` for **failed transactions**.
		 */
		export const getTransactionStatus = async ({
			chainId,
			transactionHash,
		}: {
			chainId: ChainId,
			transactionHash: Ethereum.TransactionId,
		}) => await get(chainId, {
			searchParams: {
				module: 'transaction',
				action: 'getstatus',
				txhash: transactionHash,
			},
		}) as {
			isError: '0' | '1',
			errDescription: string,
		}

		/**
		 * Check Transaction Receipt Status
		 * Returns the status code of a transaction execution.
		 * > 📝 Note: Only applicable for post **Byzantium Fork** transactions.
		 * 
		 * @param txhash the `string` representing the transaction hash to check the execution status
		 * 
		 * > 📖 Tip: The `status` field returns `0` for **failed transactions** and `1` for **successful transactions**.
		 */
		export const getTransactionReceiptStatus = async ({
			chainId,
			transactionHash,
		}: {
			chainId: ChainId,
			transactionHash: Ethereum.TransactionId,
		}) => await get(chainId, {
			searchParams: {
				module: 'transaction',
				action: 'gettxreceiptstatus',
				txhash: transactionHash,
			},
		}) as {
			status: '0' | '1',
		}
	}

	/**
	 * Blocks
	 * @see https://docs.etherscan.io/api-endpoints/blocks
	 */
	export namespace Blocks {
		/**
		 * Get Block And Uncle Rewards by BlockNo
		 * Returns the block reward and 'Uncle' block rewards.
		 * 
		 * @param blockno the `integer` block number to check block rewards for eg. `12697906`
		 * 
		 * > ​​⏳ Tip: The `timestamp` field is denoted in **Unix timestamp**​.
		 */
		export const getBlockReward = async ({
			chainId,
			blockNumber,
		}: {
			chainId: ChainId,
			blockNumber: number,
		}) => await get(chainId, {
			searchParams: {
				module: 'block',
				action: 'getblockreward',
				blockno: blockNumber,
			},
		}) as {
			blockNumber: `${Ethereum.BlockNumber}`,
			timeStamp: `${number}`,
			blockMiner: Ethereum.Address,
			blockReward: `${bigint}`,
			uncles: {
				miner: Ethereum.Address,
				unclePosition: `${Ethereum.BlockNumber}`,
				blockReward: `${bigint}`,
			}[],
			uncleInclusionReward: `${bigint}`,
		}

		/**
		 * Get Estimated Block Countdown Time by BlockNo
		 * Returns the estimated time remaining, in seconds, until a certain block is mined.
		 * 
		 * @param blockno the `integer` block number to estimate time remaining to be mined eg. `12697906`
		 */
		export const getBlockCountdown = async ({
			chainId,
			blockNumber,
		}: {
			chainId: ChainId,
			blockNumber: number,
		}) => await get(chainId, {
			searchParams: {
				module: 'block',
				action: 'getblockcountdown',
				blockno: blockNumber,
			},
		}) as {
			CurrentBlock: `${Ethereum.BlockNumber}`,
			CountdownBlock: `${Ethereum.BlockNumber}`,
			RemainingBlock: `${Ethereum.BlockNumber}`,
			EstimateTimeInSec: `${number}`,
		}

		/**
		 * Get Block Number by Timestamp
		 * Returns the block number that was mined at a certain timestamp.
		 * 
		 * @param timestamp the `integer` representing the Unix timestamp in **seconds**.
		 * @param closest the closest available block to the provided timestamp, either `before` or `after`
		 */
		export const getBlockNummberByTimestamp = async ({
			chainId,
			timestamp,
			closest,
		}: {
			chainId: ChainId,
			timestamp: number,
			closest: 'before' | 'after',
		}) => await get(chainId, {
			searchParams: {
				module: 'block',
				action: 'getblocknobytime',
				timestamp,
				closest,
			},
		}) as `${Ethereum.BlockNumber}`

		/**
		 * Get Daily Average Block Size (Pro)
		 * Returns the daily average block size within a date range.
		 * 
		 * @param startdate the starting date in `yyyy-MM-dd` format, eg. `2019-02-01`
		 * @param enddate the ending date in `yyyy-MM-dd` format, eg. `2019-02-28`
		 * @param sort the sorting preference, use `asc` to sort by ascending and `desc` to sort by descending
		 */
		export const getDailyAverageBlockSize = async ({
			chainId,
			startDate,
			endDate,
			sort,
		}: {
			chainId: ChainId,
			startDate: `${number}-${number}-${number}`,
			endDate: `${number}-${number}-${number}`,
			sort: 'asc' | 'desc',
		}) => await get(chainId, {
			searchParams: {
				module: 'stats',
				action: 'dailyavgblocksize',
				startdate: startDate,
				enddate: endDate,
				sort,
			},
		}) as {
			UTCDate: `${number}-${number}-${number}`,
			unixTimeStamp: `${number}`,
			blockSize_bytes: `${number}`,
		}[]

		/**
		 * Get Daily Block Count and Rewards (Pro)
		 * Returns the number of blocks mined daily and the amount of block rewards.
		 * 
		 * @param startdate the starting date in `yyyy-MM-dd` format, eg. `2019-02-01`
		 * @param enddate the ending date in `yyyy-MM-dd` format, eg. `2019-02-28`
		 * @param sort the sorting preference, use `asc` to sort by ascending and `desc` to sort by descending
		 */
		export const getDailyBlockCountAndRewards = async ({
			chainId,
			startDate,
			endDate,
			sort,
		}: {
			chainId: ChainId,
			startDate: `${number}-${number}-${number}`,
			endDate: `${number}-${number}-${number}`,
			sort: 'asc' | 'desc',
		}) => await get(chainId, {
			searchParams: {
				module: 'stats',
				action: 'dailyblkcount',
				startdate: startDate,
				enddate: endDate,
				sort,
			},
		}) as {
			UTCDate: `${number}-${number}-${number}`,
			unixTimeStamp: `${number}`,
			blockCount: number,
			blockRewards_Eth: `${number}`,
		}[]

		/**
		 * Get Daily Block Rewards (Pro)
		 * Returns the amount of block rewards distributed to miners daily.
		 * 
		 * @param startdate the starting date in `yyyy-MM-dd` format, eg. `2019-02-01`
		 * @param enddate the ending date in `yyyy-MM-dd` format, eg. `2019-02-28`
		 * @param sort the sorting preference, use `asc` to sort by ascending and `desc` to sort by descending
		 */
		export const getDailyBlockRewards = async ({
			chainId,
			startDate,
			endDate,
			sort,
		}: {
			chainId: ChainId,
			startDate: `${number}-${number}-${number}`,
			endDate: `${number}-${number}-${number}`,
			sort: 'asc' | 'desc',
		}) => await get(chainId, {
			searchParams: {
				module: 'stats',
				action: 'dailyblockrewards',
				startdate: startDate,
				enddate: endDate,
				sort,
			},
		}) as {
			UTCDate: `${number}-${number}-${number}`,
			unixTimeStamp: `${number}`,
			blockRewards_Eth: `${number}`,
		}[]

		/**
		 * Get Daily Average Time for A Block to be Included in the Ethereum Blockchain (Pro)
		 * Returns the daily average of time needed for a block to be successfully mined.
		 * 
		 * @param startdate the starting date in `yyyy-MM-dd` format, eg. `2019-02-01`
		 * @param enddate the ending date in `yyyy-MM-dd` format, eg. `2019-02-28`
		 * @param sort the sorting preference, use `asc` to sort by ascending and `desc` to sort by descending
		 */
		export const getDailyBlockInclusionTime = async ({
			chainId,
			startDate,
			endDate,
			sort,
		}: {
			chainId: ChainId,
			startDate: `${number}-${number}-${number}`,
			endDate: `${number}-${number}-${number}`,
			sort: 'asc' | 'desc',
		}) => await get(chainId, {
			searchParams: {
				module: 'stats',
				action: 'dailyavgblocktime',
				startdate: startDate,
				enddate: endDate,
				sort,
			},
		}) as {
			UTCDate: `${number}-${number}-${number}`,
			unixTimeStamp: `${number}`,
			blockTime_sec: `${number}`,
		}[]

		/**
		 * Get Daily Uncle Block Count and Rewards (Pro)
		 * Returns the number of 'Uncle' blocks mined daily and the amount of 'Uncle' block rewards.
		 * 
		 * @param startdate the starting date in `yyyy-MM-dd` format, eg. `2019-02-01`
		 * @param enddate the ending date in `yyyy-MM-dd` format, eg. `2019-02-28`
		 * @param sort the sorting preference, use `asc` to sort by ascending and `desc` to sort by descending
		 */
		export const getDailyUncleBlockCountAndRewards = async ({
			chainId,
			startDate,
			endDate,
			sort,
		}: {
			chainId: ChainId,
			startDate: `${number}-${number}-${number}`,
			endDate: `${number}-${number}-${number}`,
			sort: 'asc' | 'desc',
		}) => await get(chainId, {
			searchParams: {
				module: 'stats',
				action: 'dailyuncleblkcount',
				startdate: startDate,
				enddate: endDate,
				sort,
			},
		}) as {
			UTCDate: `${number}-${number}-${number}`,
			unixTimeStamp: `${number}`,
			uncleBlockCount: number,
			uncleBlockRewards_Eth: `${number}`,
		}[]
	}

	/**
	 * Logs
	 * @see https://docs.etherscan.io/api-endpoints/logs
	 */
	export namespace Logs {
		type EventLog = {
			address: Ethereum.Address,
			topics: Ethereum.TopicHash[],
			data: `0x${string}`,
			blockNumber: `${Ethereum.BlockNumber}`,
			timeStamp: `${number}`,
			gasPrice: `${Ethereum.NativeCurrencyAmount}`,
			gasUsed: `${Ethereum.GasAmount}`,
			logIndex: `0x${string}`,
			transactionHash: Ethereum.TransactionId,
			transactionIndex: `0x${string}`,
		}

		/**
		 * Get Event Logs by Address
		 * Returns the event logs from an address, with optional filtering by block range.
		 * 
		 * @param address the `string` representing the address to check for logs
		 * @param fromBlock the `integer` block number to start searching for logs eg. `12878196`
		 * @param toBlock the `integer` block number to stop searching for logs eg. `12879196`
		 * @param page the `integer` page number, if pagination is enabled
		 * @param offset the number of transactions displayed per page. limited to **1000 records** per query, use the `page` parameter for subsequent records
		 */
		export const getEventLogsByAddress = async ({
			chainId,
			address,
			fromBlock,
			toBlock,
			page = 1,
			offset = 1000,
		}: {
			chainId: ChainId,
			address: Ethereum.Address,
			fromBlock: Ethereum.BlockNumber,
			toBlock: Ethereum.BlockNumber,
			page?: number,
			offset?: number,
		}) => await get(chainId, {
			searchParams: {
				module: 'logs',
				action: 'getLogs',
				address,
				fromBlock: Number(fromBlock),
				toBlock: Number(toBlock),
				page,
				offset,
			},
		}) as EventLog[]

		/**
		 * Get Event Logs by Topics
		 * Returns the events log in a block range, filtered by topics.
		 * 
		 * @param fromBlock the `integer` block number to start searching for logs eg. `12878196`
		 * @param toBlock the `integer` block number to stop searching for logs eg. `12879196`
		 * @param topic the topic numbers to search for. limited totopic0, topic1, topic2, topic3
		 * @param topicOperator the topic operator when multiple topic combinations are used; limited to `and` or `or`
		 * @param page the `integer` page number, if pagination is enabled
		 * @param offset the number of transactions displayed per page. limited to **1000 records** per query, use the `page` parameter for subsequent records
		 * 
		 * Usage:
		 * * For a single topic, specify the topic number such as `topic0`, `topic1`, `topic2`, `topic3`
		 * * For multiple topics, specify the topic numbers **and** topic operator either `and` or `or` such as below
		 *   topic0_1_opr (and|or between topic0 & topic1), topic1_2_opr (and|or between topic1 & topic2) topic2_3_opr (and|or between topic2 & topic3), topic0_2_opr (and|or between topic0 & topic2) topic0_3_opr (and|or between topic0 & topic3), topic1_3_opr (and|or between topic1 & topic3)
		 */
		export const getEventLogsByTopics = async ({
			chainId,
			fromBlock,
			toBlock,
			topic0,
			topic1,
			topic2,
			topic3,
			topic01Operator,
			topic12Operator,
			topic23Operator,
			topic02Operator,
			topic03Operator,
			topic13Operator,
			page = 1,
			offset = 1000,
		}: {
			chainId: ChainId,
			fromBlock: Ethereum.BlockNumber,
			toBlock: Ethereum.BlockNumber,
			topic0: Ethereum.TopicHash,
			topic1: Ethereum.TopicHash,
			topic2: Ethereum.TopicHash,
			topic3: Ethereum.TopicHash,
			topic01Operator: 'and' | 'or',
			topic12Operator: 'and' | 'or',
			topic23Operator: 'and' | 'or',
			topic02Operator: 'and' | 'or',
			topic03Operator: 'and' | 'or',
			topic13Operator: 'and' | 'or',
			page?: number,
			offset?: number,
		}) => await get(chainId, {
			searchParams: {
				module: 'logs',
				action: 'getLogs',
				fromBlock: Number(fromBlock),
				toBlock: Number(toBlock),
				topic0,
				topic1,
				topic2,
				topic3,
				topic0_1_opr: topic01Operator,
				topic1_2_opr: topic12Operator,
				topic2_3_opr: topic23Operator,
				topic0_2_opr: topic02Operator,
				topic0_3_opr: topic03Operator,
				topic1_3_opr: topic13Operator,
				page,
				offset,
			},
		}) as EventLog[]

		/**
		 * Get Event Logs by Address filtered by Topics
		 * Returns the event logs from an address, filtered by topics and block range.
		 * 
		 * @param fromBlock the `integer` block number to start searching for logs eg. `12878196`
		 * @param toBlock the `integer` block number to stop searching for logs eg. `12879196`
		 * @param address the `string` representing the address to check for logs
		 * @param topic the topic numbers to search for. limited totopic0, topic1, topic2, topic3
		 * @param topicOperator the topic operator when multiple topic combinations are used; limited to `and` or `or`
		 * @param page the `integer` page number, if pagination is enabled
		 * @param offset the number of transactions displayed per page. limited to **1000 records** per query, use the `page` parameter for subsequent records
		 */
		export const getEventLogsByAddressAndTopics = async ({
			chainId,
			fromBlock,
			toBlock,
			address,
			topic0,
			topic1,
			topic2,
			topic3,
			topic01Operator,
			topic12Operator,
			topic23Operator,
			topic02Operator,
			topic03Operator,
			topic13Operator,
			page = 1,
			offset = 1000,
		}: {
			chainId: ChainId,
			fromBlock: Ethereum.BlockNumber,
			toBlock: Ethereum.BlockNumber,
			address: Ethereum.Address,
			topic0: Ethereum.TopicHash,
			topic1: Ethereum.TopicHash,
			topic2: Ethereum.TopicHash,
			topic3: Ethereum.TopicHash,
			topic01Operator: 'and' | 'or',
			topic12Operator: 'and' | 'or',
			topic23Operator: 'and' | 'or',
			topic02Operator: 'and' | 'or',
			topic03Operator: 'and' | 'or',
			topic13Operator: 'and' | 'or',
			page: number,
			offset: number,
		}) => await get(chainId, {
			searchParams: {
				module: 'logs',
				action: 'getLogs',
				fromBlock: Number(fromBlock),
				toBlock: Number(toBlock),
				address,
				topic0,
				topic1,
				topic2,
				topic3,
				topic0_1_opr: topic01Operator,
				topic1_2_opr: topic12Operator,
				topic2_3_opr: topic23Operator,
				topic0_2_opr: topic02Operator,
				topic0_3_opr: topic03Operator,
				topic1_3_opr: topic13Operator,
				page,
				offset,
			},
		}) as EventLog[]
	}

	/**
	 * Geth/Parity Proxy
	 * @see https://docs.etherscan.io/api-endpoints/geth-parity-proxy
	 * 
	 * > For the full documentation of available parameters and descriptions, please visit the official [Ethereum JSON-RPC](https://eth.wiki/json-rpc/API) docs.
	 * 
	 * > For compatibility with **Parity**, please prefix all hex strings with " **0x** ".
	 */
	export namespace RpcProxy {
		/**
		 * eth_blockNumber
		 * Returns the number of most recent block
		 */
		export const blockNumber = async ({
			chainId,
		}: {
			chainId: ChainId,
		}) => await get(chainId, {
			searchParams: {
				module: 'proxy',
				action: 'eth_blockNumber',
			},
		}, true) as `0x${string}`

		/**
		 * eth_getBlockByNumber
		 * Returns information about a block by block number.
		 * 
		 * @param tag the block number, in hex eg. `0xC36B3C`
		 * @param boolean the `boolean` value to show full transaction objects. when `true`, returns **full transaction objects** and their information, when `false` only returns a **list of transactions**.
		 */	
		export const getBlockByNumber = async <
			GetFullTransactionObjects extends boolean = false,
		>({
			chainId,
			tag,
			getFullTransactionObjects = true,
		}: {
			chainId: ChainId,
			tag: `0x${string}`,
			getFullTransactionObjects?: GetFullTransactionObjects,
		}) => await get(chainId, {
			searchParams: {
				module: 'proxy',
				action: 'eth_getBlockByNumber',
				tag,
				boolean: getFullTransactionObjects,
			},
		}, true) as (
			// Before EIP-1559
			| Record<string, never>

			// After EIP-1559
			| {
				baseFeePerGas: `0x${string}`,
			}
		) & {
			difficulty: `0x${string}`,
			extraData: `0x${string}`,
			gasLimit: `0x${string}`,
			gasUsed: `0x${string}`,
			hash: `0x${string}`,
			logsBloom: `0x${string}`,
			miner: Ethereum.Address,
			mixHash: `0x${string}`,
			nonce: `0x${string}`,
			number: `0x${string}`,
			parentHash: `0x${string}`,
			receiptsRoot: `0x${string}`,
			sha3Uncles: `0x${string}`,
			size: `0x${string}`,
			stateRoot: `0x${string}`,
			timestamp: `0x${string}`,
			totalDifficulty: `0x${string}`,
			transactions: GetFullTransactionObjects extends true
				? (
					// Before EIP-1559
					| {
						blockHash: `0x${string}`,
						blockNumber: `0x${string}`,
						from: `0x${string}`,
						gas: `0x${string}`,
						gasPrice: `0x${string}`,
						hash: `0x${string}`,
						input: `0x${string}`,
						nonce: `0x${string}`,
						to: `0x${string}`,
						transactionIndex: `0x${string}`,
						value: `0x${string}`,
						type: `0x${string}`,
						chainId: `0x${string}`,
						v: `0x${string}`,
						r: `0x${string}`,
						s: `0x${string}`,
					}

					// After EIP-1559
					| {
						blockHash: `0x${string}`,
						blockNumber: `0x${string}`,
						from: `0x${string}`,
						gas: `0x${string}`,
						gasPrice: `0x${string}`,
						maxFeePerGas: `0x${string}`,
						maxPriorityFeePerGas: `0x${string}`,
						hash: `0x${string}`,
						input: `0x${string}`,
						nonce: `0x${string}`,
						to: `0x${string}`,
						transactionIndex: `0x${string}`,
						value: `0x${string}`,
						type: `0x${string}`,
						accessList: {
							address: `0x${string}`,
							storageKeys: `0x${string}`[],
						}[],
						chainId: `0x${string}`,
						v: `0x${string}`,
						r: `0x${string}`,
						s: `0x${string}`,
					}
				)[]
				: `0x${string}`[],
			transactionsRoot: `0x${string}`,
			uncles: `0x${string}`,
		}

		/**
		 * eth_getUncleByBlockNumberAndIndex
		 * Returns information about a uncle by block number.
		 * 
		 * @param tag the block number, in hex eg. `0xC36B3C`
		 * @param index the position of the uncle's index in the block, in hex eg. `0x5`
		 */
		export const getUncleByBlockNumberAndIndex = async ({
			chainId,
			tag,
			index,
		}: {
			chainId: ChainId,
			tag: `0x${string}`,
			index: `0x${string}`,
		}) => await get(chainId, {
			searchParams: {
				module: 'proxy',
				action: 'eth_getUncleByBlockNumberAndIndex',
				tag,
				index,
			},
		}, true) as {
			baseFeePerGas: `0x${string}`,
			difficulty: `0x${string}`,
			extraData: `0x${string}`,
			gasLimit: `0x${string}`,
			gasUsed: `0x${string}`,
			hash: `0x${string}`,
			logsBloom: `0x${string}`,
			miner: Ethereum.Address,
			mixHash: `0x${string}`,
			nonce: `0x${string}`,
			number: `0x${string}`,
			parentHash: `0x${string}`,
			receiptsRoot: `0x${string}`,
			sha3Uncles: `0x${string}`,
			size: `0x${string}`,
			stateRoot: `0x${string}`,
			timestamp: `0x${string}`,
			transactionsRoot: `0x${string}`,
			uncles: `0x${string}`[],
		}

		/**
		 * eth_getBlockTransactionCountByNumber
		 * Returns the number of transactions in a block.
		 */
		export const getBlockTransactionCountByNumber = async ({
			chainId,
			tag,
		}: {
			chainId: ChainId,
			tag: `0x${string}`,
		}) => await get(chainId, {
			searchParams: {
				module: 'proxy',
				action: 'eth_getBlockTransactionCountByNumber',
				tag,
			},
		}, true) as `0x${string}`

		/**
		 * eth_getTransactionByHash
		 * Returns the information about a transaction requested by transaction hash.
		 * 
		 * @param txhash the `string` representing the hash of the transaction
		 */
		export const getTransactionByHash = async ({
			chainId,
			transactionId,
		}: {
			chainId: ChainId,
			transactionId: Ethereum.TransactionId,
		}) => await get(chainId, {
			searchParams: {
				module: 'proxy',
				action: 'eth_getTransactionByHash',
				txhash: transactionId,
			},
		}, true) as {
			blockHash: `0x${string}`,
			blockNumber: `0x${string}`,
			from: Ethereum.Address,
			gas: `0x${string}`,
			gasPrice: `0x${string}`,
			maxFeePerGas: `0x${string}`,
			maxPriorityFeePerGas: `0x${string}`,
			hash: `0x${string}`,
			input: `0x${string}`,
			nonce: `0x${string}`,
			to: Ethereum.Address,
			transactionIndex: `0x${string}`,
			value: `0x${string}`,
			type: `0x${string}`,
			accessList: string[],
			chainId: `0x${string}`,
			v: `0x${string}`,
			r: `0x${string}`,
			s: `0x${string}`,
		}

		/**
		 * eth_getTransactionByBlockNumberAndIndex
		 * Returns information about a transaction by block number and transaction index position.
		 * 
		 * @param tag the block number, in hex eg. `0x10FB78`
		 * @param index the position of the uncle's index in the block, in hex eg. `0x0`
		 */
		export const getTransactionByBlockNumberAndIndex = async ({
			chainId,
			
			tag,
			index,
		}: {
			chainId: ChainId,

			tag: `0x${string}`,
			index: `0x${string}`,
		}) => await get(chainId, {
			searchParams: {
				module: 'proxy',
				action: 'eth_getTransactionByBlockNumberAndIndex',
				tag,
				index,
			},
		}, true) as {
			blockHash: `0x${string}`,
			blockNumber: `0x${string}`,
			from: Ethereum.Address,
			gas: `0x${string}`,
			gasPrice: `0x${string}`,
			maxFeePerGas: `0x${string}`,
			maxPriorityFeePerGas: `0x${string}`,
			hash: `0x${string}`,
			input: `0x${string}`,
			nonce: `0x${string}`,
			to: Ethereum.Address,
			transactionIndex: `0x${string}`,
			value: `0x${string}`,
			type: `0x${string}`,
			accessList: string[],
			chainId: `0x${string}`,
			v: `0x${string}`,
			r: `0x${string}`,
			s: `0x${string}`,
			condition: null,
			creates: null,
		}

		/**
		 * eth_getTransactionCount
		 * Returns the number of transactions performed by an address.
		 * 
		 * @param address the `string` representing the address to get transaction count
		 * @param tag the `string` pre-defined block parameter, either `earliest`, `pending` or `latest`
		 */
		export const getTransactionCount = async ({
			chainId,
			address,
			tag,
		}: {
			chainId: ChainId,
			address: Ethereum.Address,
			tag: `0x${string}`,
		}) => await get(chainId, {
			searchParams: {
				module: 'proxy',
				action: 'eth_getTransactionCount',
				address,
				tag,
			},
		}, true) as `0x${string}`

		/**
		 * eth_sendRawTransaction
		 * Submits a pre-signed transaction for broadcast to the Ethereum network.
		 * 
		 * @param hex the `string` representing the signed raw transaction data to broadcast.
		 * 
		 * > 💡 Tip: Send a POST request if your hex string is particularly long.
		 * > ​🖋 For more information on creating a signed raw transaction, visit this [page](https://docs.etherscan.io/tutorials/signing-raw-transactions). ​
		 * ​> ⛏ Note: The result represents the **transaction hash** of the submitted raw transaction.
		 *   Use **eth_getTransactionReceipt** to retrieve full details.
		 */
		export const sendRawTransaction = async ({
			chainId,
			signature,
		}: {
			chainId: ChainId,
			signature: `0x${string}`,
		}) => await get(chainId, {
			searchParams: {
				module: 'proxy',
				action: 'eth_sendRawTransaction',
				hex: signature,
			},
		}, true) as `0x${string}`

		/**
		 * eth_getTransactionReceipt
		 * Returns the receipt of a transaction by transaction hash.
		 * 
		 * @param txhash the `string` representing the hash of the transaction
		 */
		export const getTransactionReceipt = async ({
			chainId,
			transactionId,
		}: {
			chainId: ChainId,
			transactionId: Ethereum.TransactionId,
		}) => await get(chainId, {
			searchParams: {
				module: 'proxy',
				action: 'eth_getTransactionReceipt',
				txhash: transactionId,
			},
		}, true) as {
			blockHash: `0x${string}`,
			blockNumber: `0x${string}`,
			contractAddress: Ethereum.Address | null,
			cumulativeGasUsed: `0x${string}`,
			effectiveGasPrice: `0x${string}`,
			from: Ethereum.Address,
			gasUsed: `0x${string}`,
			logs: {
				address: Ethereum.Address,
				topics: Ethereum.TopicHash[],
				data: `0x${string}`,
				blockNumber: `0x${string}`,
				transactionHash: Ethereum.TransactionId,
				transactionIndex: `0x${string}`,
				blockHash: Ethereum.BlockHash,
				logIndex: `0x${string}`,
				removed: boolean,
			}[],
			logsBloom: `0x${string}`,
			status: `0x${string}`,
			to: Ethereum.Address,
			transactionHash: Ethereum.TransactionId,
			transactionIndex: `0x${string}`,
			type: `0x${string}`,
		}

		/**
		 * eth_call
		 * Executes a new message call immediately without creating a transaction on the block chain.
		 * 
		 * @param to the `string` representing the address to interact with
		 * @param data the hash of the method signature and encoded parameters
		 * @param tag the `string` pre-defined block parameter, either `earliest`, `pending` or `latest`
		 * 
		 * > ​⛽ Note: The gas parameter is capped at 2x the current block gas limit.
		 */
		export const call = async ({
			chainId,
			toAddress,
			callData,
			tag,
		}: {
			chainId: ChainId,
			toAddress: Ethereum.Address,
			callData: `0x${string}`,
			tag: `0x${string}`,
		}) => await get(chainId, {
			searchParams: {
				module: 'proxy',
				action: 'eth_call',
				to: toAddress,
				data: callData,
				tag,
			},
		}, true) as `0x${string}`

		/**
		 * eth_getCode
		 * Returns code at a given address.
		 * 
		 * @param address the `string` representing the address to get code
		 * @param tag the `string` pre-defined block parameter, either `earliest`, `pending` or `latest`
		 */
		export const getCode = async ({
			chainId,
			address,
			tag,
		}: {
			chainId: ChainId,
			address: Ethereum.Address,
			tag: `0x${string}`,
		}) => await get(chainId, {
			searchParams: {
				module: 'proxy',
				action: 'eth_getCode',
				address,
				tag,
			},
		}, true) as `0x${string}`

		/**
		 * eth_getStorageAt
		 * Returns the value from a storage position at a given address.
		 * > This endpoint is still **experimental** and may have potential issues
		 * 
		 * @param address the `string` representing the address to get code
		 * @param position the hex code of the position in storage, eg `0x0`
		 * @param tag the `string` pre-defined block parameter, either `earliest`, `pending` or `latest`
		 */
		export const getStorageAt = async ({
			chainId,
			address,
			position,
			tag,
		}: {
			chainId: ChainId,
			address: Ethereum.Address,
			position: `0x${string}`,
			tag: `0x${string}`,
		}) => await get(chainId, {
			searchParams: {
				module: 'proxy',
				action: 'eth_getStorageAt',
				address,
				position,
				tag,
			},
		}, true) as `0x${string}`

		/**
		 * eth_gasPrice
		 * Returns the current price per gas in wei.
		 * 
		 * > 📖 Tip: The `result` is returned in **wei**.
		 */
		export const getGasPrice = async ({
			chainId,
		}: {
			chainId: ChainId,
		}) => await get(chainId, {
			searchParams: {
				module: 'proxy',
				action: 'eth_gasPrice',
			},
		}, true) as `0x${string}`

		/**
		 * eth_estimateGas
		 * Makes a call or transaction, which won't be added to the blockchain and returns the used gas.
		 * 
		 * @param data the hash of the method signature and encoded parameters
		 * @param to the `string` representing the address to interact with
		 * @param value the value sent in this transaction, in hex eg. `0xff22`
		 * @param gas the amount of gas provided for the transaction, in hex eg. `0x5f5e0ff`
		 * @param gasPrice the gas price paid for each unit of gas, in wei. post **EIP-1559**, the `gasPrice` has to be higher than the block's `baseFeePerGas`
		 * 
		 * > ⛽️ Note: The `gas` parameter is capped at **2x** the current block gas limit.
		 */
		export const estimateGas = async ({
			chainId,
			callData,
			toAddress,
			value,
			gas,
			gasPrice,
		}: {
			chainId: ChainId,
			callData: `0x${string}`,
			toAddress: Ethereum.Address,
			value: `0x${string}`,
			gas: `0x${string}`,
			gasPrice: `0x${string}`,
		}) => await get(chainId, {
			searchParams: {
				module: 'proxy',
				action: 'eth_gasPrice',
				data: callData,
				to: toAddress,
				value,
				gas,
				gasPrice,
			},
		}, true) as `0x${string}`
	}

	/**
	 * Tokens
	 * @see https://docs.etherscan.io/api-endpoints/tokens
	 */
	export namespace Tokens {
		/**
		 * Get ERC20-Token TotalSupply by ContractAddress
		 * Returns the current amount of an ERC-20 token in circulation.
		 * 
		 * @param contractaddress the `contract address` of the ERC-20 token
		 * 
		 * > ​📈 Tip: The result is returned in the token's **smallest decimal representation**.
		 *   Eg. a token with a balance of `215.241526476136819398` and 18 decimal places will be returned as `215241526476136819398`
		 */
		export const getDailyBlockRewards = async ({
			chainId,
			contractAddress,
		}: {
			chainId: ChainId,
			contractAddress: Ethereum.ContractAddress
		}) => await get(chainId, {
			searchParams: {
				module: 'stats',
				action: 'tokensupply',
				contractaddress: contractAddress,
			},
		}) as `${bigint}`

		/**
		 * Get ERC20-Token Account Balance for TokenContractAddress
		 * Returns the current balance of an ERC-20 token of an address.
		 * 
		 * @param contractaddress the `contract address` of the ERC-20 token
		 * @param address the `string` representing the address to check for token balance
		 * 
		 * > ​📈 Tip: The result is returned in the token's **smallest decimal representation**.
		 *   Eg. a token with a balance of `215.241526476136819398` and 18 decimal places will be returned as `215241526476136819398`
		 */
		export const getErc20TokenBalance = async ({
			chainId,
			contractAddress,
			address,
			tag = 'latest',
		}: {
			chainId: ChainId,
			contractAddress: Ethereum.ContractAddress,
			address: Ethereum.Address,
			tag: 'earliest' | 'pending' | 'latest',
		}) => await get(chainId, {
			searchParams: {
				module: 'account',
				action: 'tokenbalance',
				contractaddress: contractAddress,
				address,
				tag,
			},
		}) as `${bigint}`

		/**
		 * Get Historical ERC20-Token TotalSupply by ContractAddress & BlockNo (Pro)
		 * Returns the amount of an ERC-20 token in circulation at a certain block height.
		 * > 📝 Note: This endpoint is throttled to **2 calls/second** regardless of API Pro tier.
		 * 
		 * @param contractaddress the `contract address` of the ERC-20 token
		 * @param blockno the `integer` block number to check total supply for e.g. `12697906`
		 * 
		 * > ​📈 Tip: The result is returned in the token's **smallest decimal representation**.
		 *   Eg. a token with a balance of `215.241526476136819398` and 18 decimal places will be returned as `215241526476136819398`
		 */
		export const getHistoricalErc20TokenTotalSupply = async ({
			chainId,
			contractAddress,
			blockNumber,
		}: {
			chainId: ChainId,
			contractAddress: Ethereum.ContractAddress,
			blockNumber: number,
		}) => await get(chainId, {
			searchParams: {
				module: 'stats',
				action: 'tokensupplyhistory',
				contractaddress: contractAddress,
				blockno: blockNumber,
			},
		}) as `${bigint}`

		/**
		 * Get Historical ERC20-Token Account Balance for TokenContractAddress by BlockNo (Pro)
		 * Returns the balance of an ERC-20 token of an address at a certain block height.
		 * > 📝 Note: This endpoint is throttled to **2 calls/second** regardless of API Pro tier.
		 * 
		 * @param contractaddress the `contract address` of the ERC-20 token
		 * @param address the `string` representing the address to check for balance
		 * @param blockno the `integer` block number to check total supply for e.g. `12697906`
		 */
		export const getHistoricalErc20TokenBalance = async ({
			chainId,
			contractAddress,
			address,
			blockNumber,
		}: {
			chainId: ChainId,
			contractAddress: Ethereum.ContractAddress,
			address: Ethereum.Address,
			blockNumber: number,
		}) => await get(chainId, {
			searchParams: {
				module: 'account',
				action: 'tokenbalancehistory',
				contractaddress: contractAddress,
				address,
				blockno: blockNumber,
			},
		}) as `${number}`

		/**
		 * Get Token Holder List by Contract Address (Pro)
		 * Return the current ERC20 token holders and number of tokens held.
		 * 
		 * @param contractaddress the `contract address` of the ERC-20 token
		 * @param page the `integer` page number, if pagination is enabled
		 * @param offset the number of transactions displayed per page
		 */
		export const getErc20TokenHolders = async ({
			chainId,
			contractAddress,
			address,
			blockNumber,
		}: {
			chainId: ChainId,
			contractAddress: Ethereum.ContractAddress,
			address: Ethereum.Address,
			blockNumber: number,
		}) => await get(chainId, {
			searchParams: {
				module: 'token',
				action: 'tokenholderlist',
				contractaddress: contractAddress,
				address,
				blockno: blockNumber,
			},
		}) as {
			TokenHolderAddress: Ethereum.Address,
			TokenHolderQuantity: `${number}`
		}[]

		/**
		 * Get Token Info by ContractAddress (Pro)
		 * Returns project information and social media links of an ERC20/ERC721/ERC1155 token.
		 * > 📝 Note: This endpoint is throttled to **2 calls/second** regardless of API Pro tier.
		 * 
		 * @param contractaddress the `contract address` of the ERC-20/ERC-721 token to retrieve token info
		 */
		export const getTokenInfo = async ({
			chainId,
			contractAddress,
		}: {
			chainId: ChainId,
			contractAddress: Ethereum.ContractAddress,
		}) => await get(chainId, {
			searchParams: {
				module: 'token',
				action: 'tokeninfo',
				contractaddress: contractAddress,
			},
		}) as {
			contractAddress: Ethereum.ContractAddress,
			tokenName: number,
			symbol: string,
			divisor: `${number}`,
			tokenType: 'ERC20' | 'ERC721' | 'ERC1155',
			totalSupply: `${number}`,
			blueCheckmark: `${boolean}`,
			description: string | '',
			website: string | '',
			email: string | '',
			blog: string | '',
			reddit: string | '',
			slack: string | '',
			facebook: string | '',
			twitter: string | '',
			bitcointalk: string | '',
			github: string | '',
			telegram: string | '',
			wechat: string | '',
			linkedin: string | '',
			discord: string | '',
			whitepaper: string | '',
			tokenPriceUSD: `${number}`,
		}[]

		/**
		 * Get Address ERC20 Token Holding (Pro)
		 * Returns the ERC-20 tokens and amount held by an address.
		 * > 📝 Note: This endpoint is throttled to **2 calls/second** regardless of API Pro tier.
		 * 
		 * @param address the `string` representing the address to check for balance
		 * @param page the `integer` page number, if pagination is enabled
		 * @param offset the number of transactions displayed per page
		 */
		export const getErc20TokenBalances = async ({
			chainId,
			address,
			page = 1,
			offset = 100,
		}: {
			chainId: ChainId,
			address: Ethereum.Address,
			page?: number,
			offset?: number,
		}) => await get(chainId, {
			searchParams: {
				module: 'account',
				action: 'addresstokenbalance',
				address,
				page,
				offset,
			},
		}) as {
			TokenAddress: Ethereum.ContractAddress,
			TokenName: string,
			TokenSymbol: string,
			TokenQuantity: `${number}`,
			TokenDivisor: `${number}`,
		}[]

		/**
		 * Get Address ERC721 Token Holding (Pro)
		 * Returns the ERC-721 tokens and amount held by an address.
		 * > 📝 Note: This endpoint is throttled to **2 calls/second** regardless of API Pro tier.
		 * 
		 * @param address the `string` representing the address to check for balance
		 * @param page the `integer` page number, if pagination is enabled
		 * @param offset the number of transactions displayed per page
		 */
		export const getErc721TokenBalances = async ({
			chainId,
			address,
			page = 1,
			offset = 100,
		}: {
			chainId: ChainId,
			address: Ethereum.Address,
			page?: number,
			offset?: number,
		}) => await get(chainId, {
			searchParams: {
				module: 'account',
				action: 'addresstokennftbalance',
				address,
				page,
				offset,
			},
		}) as {
			TokenAddress: Ethereum.ContractAddress,
			TokenName: string,
			TokenSymbol: string,
			TokenQuantity: `${number}`,
		}[]

		/**
		 * Get Address ERC721 Token Inventory By Contract Address (Pro)
		 * Returns the ERC-721 token inventory of an address, filtered by contract address. 
		 * > 📝 Note: This endpoint is throttled to **2 calls/second** regardless of API Pro tier.
		 * 
		 * @param address the `string` representing the address to check for inventory
		 * @param contractaddress the `string` representing the ERC-721 token contractaddress to check for inventory
		 * @param page the `integer` page number, if pagination is enabled
		 * @param offset the number of records displayed per page; limited to **1000 records** per query, use the `page` parameter for subsequent records
		 */
		export const getErc721TokenInventory = async ({
			chainId,
			address,
			contractAddress,
			page = 1,
			offset = 100,
		}: {
			chainId: ChainId,
			address: Ethereum.Address,
			contractAddress: Ethereum.ContractAddress,
			page?: number,
			offset?: number,
		}) => await get(chainId, {
			searchParams: {
				module: 'account',
				action: 'addresstokennftinventory',
				address,
				contractaddress: contractAddress,
				page,
				offset,
			},
		}) as {
			TokenAddress: Ethereum.ContractAddress,
			TokenId: `${number}`,
		}[]
	}

	/**
	 * Gas Tracker
	 * @see https://docs.etherscan.io/api-endpoints/gas-tracker
	 */
	export namespace GasTracker {
		/**
		 * Get Estimation of Confirmation Time
		 * Returns the estimated time, in seconds, for a transaction to be confirmed on the blockchain.
		 * @param gasprice the price paid per unit of gas, in `wei`
		 * > 📝 Note: The `result` is returned in **seconds**.
		 */
		export const getConfirmationEstimate = async ({
			chainId,
			gasPrice,
		}: {
			chainId: ChainId,
			gasPrice: `${number}`,
		}) => await get(chainId, {
			searchParams: {
				module: 'gastracker',
				action: 'gasestimate',
				gasprice: gasPrice,
			},
		}) as `${number}`

		/**
		 * Get Gas Oracle
		 * Returns the current Safe, Proposed and Fast gas prices.
		 * > Post **EIP-1559** 🔥 changes:
		 *   * Safe/Proposed/Fast gas price recommendations are now modeled as Priority Fees.
		 *   * New field `suggestBaseFee`, the baseFee of the next pending block
		 *   * New field `gasUsedRatio` to estimate how busy the network is
		 *   Learn more about the gas changes in EIP-1559. 
		 * 
		 * @param startdate the starting date in `yyyy-MM-dd` format, eg. `2019-01-31`
		 * @param enddate the ending date in `yyyy-MM-dd format`, eg. `2019-02-28`
		 * @param sort the sorting preference, use `asc` to sort by ascending and `desc` to sort by descending
		 * 
		 * > ⛽️ Note: The gas prices are returned in **Gwei**.
		 */
		export const getGasOracle = async ({
			chainId,
		}: {
			chainId: ChainId,
		}) => await get(chainId, {
			searchParams: {
				module: 'gastracker',
				action: 'gasoracle',
			},
		}) as {
			LastBlock: `${number}`,
			SafeGasPrice: `${number}`,
			ProposeGasPrice: `${number}`,
			FastGasPrice: `${number}`,
			suggestBaseFee: `${number}`,
			gasUsedRatio: `${number},${number},${number},${number},${number}`,
		}

		/**
		 * Get Daily Average Gas Limit (Pro)
		 * Returns the historical daily average gas limit of the Ethereum network.
		 * 
		 * @param startdate the starting date in `yyyy-MM-dd` format, eg. `2019-01-31`
		 * @param enddate the ending date in `yyyy-MM-dd format`, eg. `2019-02-28`
		 * @param sort the sorting preference, use `asc` to sort by ascending and `desc` to sort by descending
		 */
		export const getDailyAverageGasLimit = async ({
			chainId,
			startDate,
			endDate,
			sort = 'asc',
		}: {
			chainId: ChainId,
			startDate: string,
			endDate: string,
			sort?: 'asc' | 'desc',
		}) => await get(chainId, {
			searchParams: {
				module: 'stats',
				action: 'dailyavggaslimit',
				startdate: startDate,
				enddate: endDate,
				sort,
			},
		}) as {
			UTCDate: `${number}-${number}-${number}`,
			unixTimeStamp: `${number}`,
			gasLimit: `${number}`,
		}[]


		/**
		 * Get Ethereum Daily Total Gas Used (Pro)
		 * Returns the total amount of gas used daily for transctions on the Ethereum network.
		 * 
		 * @param startdate the starting date in `yyyy-MM-dd` format, eg. `2019-01-31`
		 * @param enddate the ending date in `yyyy-MM-dd format`, eg. `2019-02-28`
		 * @param sort the sorting preference, use `asc` to sort by ascending and `desc` to sort by descending
		 */
		export const getDailyTotalGasUsed = async ({
			chainId,
			startDate,
			endDate,
			sort = 'asc',
		}: {
			chainId: ChainId,
			startDate: string,
			endDate: string,
			sort?: 'asc' | 'desc',
		}) => await get(chainId, {
			searchParams: {
				module: 'stats',
				action: 'dailygasused',
				startdate: startDate,
				enddate: endDate,
				sort,
			},
		}) as {
			UTCDate: `${number}-${number}-${number}`,
			unixTimeStamp: `${number}`,
			gasUsed: `${number}`,
		}[]

		/**
		 * Get Daily Average Gas Price (Pro)
		 * Returns the daily average gas price used on the Ethereum network.
		 * 
		 * @param startdate the starting date in `yyyy-MM-dd` format, eg. `2019-01-31`
		 * @param enddate the ending date in `yyyy-MM-dd format`, eg. `2019-02-28`
		 * @param sort the sorting preference, use `asc` to sort by ascending and `desc` to sort by descending
		 */
		export const getDailyAverageGasPrice = async ({
			chainId,
			startDate,
			endDate,
			sort = 'asc',
		}: {
			chainId: ChainId,
			startDate: string,
			endDate: string,
			sort?: 'asc' | 'desc',
		}) => await get(chainId, {
			searchParams: {
				module: 'stats',
				action: 'dailyavggasprice',
				startdate: startDate,
				enddate: endDate,
				sort,
			},
		}) as {
			UTCDate: `${number}-${number}-${number}`,
			unixTimeStamp: `${number}`,
			maxGasPrice_Wei: `${number}`,
			minGasPrice_Wei: `${number}`,
			avgGasPrice_Wei: `${number}`,
		}[]
	}

	/**
	 * Stats
	 * @see https://docs.etherscan.io/api-endpoints/stats-1
	 */
	export namespace Stats {
		/**
		 * Get Total Supply of Ether
		 * Returns the current amount of Ether in circulation excluding ETH2 Staking rewards and EIP1559 burnt fees.
		 */
		export const getTotalSupply = async ({
			chainId,
		}: {
			chainId: ChainId,
		}) => await get(chainId, {
			searchParams: {
				module: 'stats',
				action: 'ethsupply',
			},
		}) as `${bigint}`

		/**
		 * Get Total Supply of Ether 2
		 * Returns the current amount of Ether in circulation, ETH2 Staking rewards, EIP1559 burnt fees, and total withdrawn ETH from the beacon chain.
		 * > ​Note: The `EthSupply` is calculated **before** adding ETH minted as `Eth2Staking` rewards and subtracting `BurntFees` from EIP-1559. 
		 *   For more information, check out our [Ether Total Supply Dashboard](https://etherscan.io/stat/supply).
		 */
		export const getTotalSupply2 = async ({
			chainId,
		}: {
			chainId: ChainId,
		}) => await get(chainId, {
			searchParams: {
				module: 'stats',
				action: 'ethsupply2',
			},
		}) as {
			EthSupply: `${bigint}`,
			Eth2Staking: `${bigint}`,
			BurntFees: `${bigint}`,
			WithdrawnTotal: `${bigint}`,
		}

		/**
		 * Get Ether Last Price
		 * Returns the latest price of 1 ETH.
		 * 
		 * > ​​⏳ Tip: The `timestamps` are represented in **Unix timestamp**​.
		 */
		export const getPrice = async ({
			chainId,
		}: {
			chainId: ChainId,
		}) => await get(chainId, {
			searchParams: {
				module: 'stats',
				action: 'ethprice',
			},
		}) as {
			ethbtc: `${number}`,
			ethbtc_timestamp: `${number}`,
			ethusd: `${number}`,
			ethusd_timestamp: `${number}`,
		}

		/**
		 * Get Ethereum Nodes Size
		 * Returns the size of the Ethereum blockchain, in bytes, over a date range.
		 * 
		 * @param startdate the starting date in `yyyy-MM-dd` format, eg. `2019-02-01`
		 * @param enddate the ending date in `yyyy-MM-dd` format, eg. `2019-02-28`
		 * @param clienttype the Ethereum [node client](https://ethereum.org/en/developers/docs/nodes-and-clients/) to use, either `geth` or `parity`
		 * @param syncmode the [type of node](https://ethereum.org/en/developers/docs/nodes-and-clients/) to run, either `default` or `archive`
		 * @param sort the sorting preference, use `asc` to sort by ascending and `desc` to sort by descending
		 * 
		 * > ⛓️ Tip: The `chainSize` is represented in **bytes**.
		 */
		export const getBlockchainSize = async ({
			chainId,
			startDate,
			endDate,
			clientType,
			syncMode,
			sort,
		}: {
			chainId: ChainId,
			startDate: `${number}-${number}-${number}`,
			endDate: `${number}-${number}-${number}`,
			clientType: 'geth' | 'parity',
			syncMode: 'default' | 'archive',
			sort: 'asc' | 'desc',
		}) => await get(chainId, {
			searchParams: {
				module: 'stats',
				action: 'chainsize',
				startdate: startDate,
				enddate: endDate,
				clienttype: clientType,
				syncmode: syncMode,
				sort,
			},
		}) as {
			blockNumber: `${number}`,
			chainTimeStamp: `${number}-${number}-${number}`,
			chainSize: `${number}`,
			clientType: 'Geth' | 'Parity',
			syncMode: 'Default' | 'Archive',
		}[]

		/**
		 * Get Total Nodes Count
		 * Returns the total number of discoverable Ethereum nodes.
		 * 
		 * @param startdate the starting date in `yyyy-MM-dd` format, eg. `2019-02-01`
		 * @param enddate the ending date in `yyyy-MM-dd` format, eg. `2019-02-28`
		 * @param clienttype the Ethereum node client to use, either `geth` or `parity`
		 * @param syncmode the type of node to run, either `default` or `archive`
		 * @param sort the sorting preference, use `asc` to sort by ascending and `desc` to sort by descending
		 */
		export const getNodeCount = async ({
			chainId,
		}: {
			chainId: ChainId,
		}) => await get(chainId, {
			searchParams: {
				module: 'stats',
				action: 'nodecount',
			},
		}) as {
			UTCDate: `${number}-${number}-${number}`,
			TotalNodeCount: `${number}`,
		}

		/**
		 * Get Daily Network Transaction Fee ​(Pro)
		 * Returns the amount of transaction fees paid to miners per day.
		 * 
		 * @param startdate: `2019-02-01`
		 * @param enddate: `2019-02-28`
		 * @param sort: asc
		 */
		export const getDailyNetworkTransactionFee = async ({
			chainId,
			startDate,
			endDate,
			sort,
		}: {
			chainId: ChainId,
			startDate: `${string}-${string}-${string}`,
			endDate: `${string}-${string}-${string}`,
			sort: 'asc' | 'desc',
		}) => await get(chainId, {
			searchParams: {
				module: 'stats',
				action: 'dailytxnfee',
				startdate: startDate,
				enddate: endDate,
				sort,
			},
		}) as {
			UTCDate: `${number}-${number}-${number}`,
			unixTimeStamp: `${number}`,
			transactionFee_Eth: `${number}`,
		}

		/**
		 * Get Daily New Address Count (Pro)
		 * Returns the number of new Ethereum addresses created per day.
		 * 
		 * @param startdate the starting date in `yyyy-MM-dd` format, eg. `2019-02-01`
		 * @param enddate the ending date in `yyyy-MM-dd` format, eg. `2019-02-28`
		 * @param sort the sorting preference, use `asc` to sort by ascending and `desc` to sort by descending
		 */
		export const getDailyNewAddressCount = async ({
			chainId,
			startDate,
			endDate,
			sort,
		}: {
			chainId: ChainId,
			startDate: `${string}-${string}-${string}`,
			endDate: `${string}-${string}-${string}`,
			sort: 'asc' | 'desc',
		}) => await get(chainId, {
			searchParams: {
				module: 'stats',
				action: 'dailynewaddress',
				startdate: startDate,
				enddate: endDate,
				sort,
			},
		}) as {
			UTCDate: `${number}-${number}-${number}`,
			unixTimeStamp: `${number}`,
			newAddressCount: `${number}`,
		}[]

		/**
		 * Get Daily Network Utilization (Pro)
		 * Returns the daily average gas used over gas limit, in percentage.
		 * 
		 * @param startdate the starting date in `yyyy-MM-dd` format, eg. `2019-02-01`
		 * @param enddate the ending date in `yyyy-MM-dd` format, eg. `2019-02-28`
		 * @param sort the sorting preference, use `asc` to sort by ascending and `desc` to sort by descending
		 */
		export const getDailyNetworkUtilization = async ({
			chainId,
			startDate,
			endDate,
			sort,
		}: {
			chainId: ChainId,
			startDate: `${string}-${string}-${string}`,
			endDate: `${string}-${string}-${string}`,
			sort: 'asc' | 'desc',
		}) => await get(chainId, {
			searchParams: {
				module: 'stats',
				action: 'dailynetutilization',
				startdate: startDate,
				enddate: endDate,
				sort,
			},
		}) as {
			UTCDate: `${number}-${number}-${number}`,
			unixTimeStamp: `${number}`,
			networkUtilization: `${number}`,
		}[]

		/**
		 * Get Daily Average Network Hash Rate (Pro)
		 * Returns the historical measure of processing power of the Ethereum network.
		 * 
		 * @param startdate the starting date in `yyyy-MM-dd` format, eg. `2019-02-01`
		 * @param enddate the ending date in `yyyy-MM-dd` format, eg. `2019-02-28`
		 * @param sort the sorting preference, use `asc` to sort by ascending and `desc` to sort by descending
		 * 
		 * > 🔥 Tip: The `networkHashRate` is represented in **GigaHashes ( GH/s )**.
		 */
		export const getDailyAverageNetworkHashRate = async ({
			chainId,
			startDate,
			endDate,
			sort,
		}: {
			chainId: ChainId,
			startDate: `${string}-${string}-${string}`,
			endDate: `${string}-${string}-${string}`,
			sort: 'asc' | 'desc',
		}) => await get(chainId, {
			searchParams: {
				module: 'stats',
				action: 'dailyavghashrate',
				startdate: startDate,
				enddate: endDate,
				sort,
			},
		}) as {
			UTCDate: `${number}-${number}-${number}`,
			unixTimeStamp: `${number}`,
			networkHashRate: `${number}`,
		}[]

		/**
		 * Get Daily Transaction Count (Pro)
		 * Returns the number of transactions performed on the Ethereum blockchain per day.
		 * 
		 * @param startdate the starting date in `yyyy-MM-dd` format, eg. `2019-02-01`
		 * @param enddate the ending date in `yyyy-MM-dd` format, eg. `2019-02-28`
		 * @param sort the sorting preference, use `asc` to sort by ascending and `desc` to sort by descending
		 */
		export const getDailyTransactionCount = async ({
			chainId,
			startDate,
			endDate,
			sort,
		}: {
			chainId: ChainId,
			startDate: `${string}-${string}-${string}`,
			endDate: `${string}-${string}-${string}`,
			sort: 'asc' | 'desc',
		}) => await get(chainId, {
			searchParams: {
				module: 'stats',
				action: 'dailytx',
				startdate: startDate,
				enddate: endDate,
				sort,
			},
		}) as {
			UTCDate: `${number}-${number}-${number}`,
			unixTimeStamp: `${number}`,
			transactionCount: number,
		}

		/**
		 * Get Daily Average Network Difficulty (Pro)
		 * Returns the historical mining difficulty of the Ethereum network.
		 * 
		 * @param startdate the starting date in `yyyy-MM-dd` format, eg. `2019-02-01`
		 * @param enddate the ending date in `yyyy-MM-dd` format, eg. `2019-02-28`
		 * @param sort the sorting preference, use `asc` to sort by ascending and `desc` to sort by descending
		 * 
		 * > 🔥 Tip: The `networkDifficulty` is represented in **TeraHashes ( TH/s )**.
		 */
		export const getDailyAverageNetworkDifficulty = async ({
			chainId,
			startDate,
			endDate,
			sort,
		}: {
			chainId: ChainId,
			startDate: `${string}-${string}-${string}`,
			endDate: `${string}-${string}-${string}`,
			sort: 'asc' | 'desc',
		}) => await get(chainId, {
			searchParams: {
				module: 'stats',
				action: 'dailyavgnetdifficulty',
				startdate: startDate,
				enddate: endDate,
				sort,
			},
		}) as {
			UTCDate: `${number}-${number}-${number}`,
			unixTimeStamp: `${number}`,
			networkDifficulty: `${number}`,
		}[]

		/**
		 * Get Ether Historical Daily Market Cap (Pro)
		 * Returns the historical Ether daily market capitalization.
		 * 
		 * @param startdate the starting date in `yyyy-MM-dd` format, eg. `2019-02-01`
		 * @param enddate the ending date in `yyyy-MM-dd` format, eg. `2019-02-28`
		 * @param sort the sorting preference, use `asc` to sort by ascending and `desc` to sort by descending
		 * 
		 * > 💰 Tip: The `marketCap` is represented in **million US Dollars ( USD )**.
		 */
		export const getEtherHistoricalDailyMarketCap = async ({
			chainId,
			startDate,
			endDate,
			sort,
		}: {
			chainId: ChainId,
			startDate: `${string}-${string}-${string}`,
			endDate: `${string}-${string}-${string}`,
			sort: 'asc' | 'desc',
		}) => await get(chainId, {
			searchParams: {
				module: 'stats',
				action: 'ethdailymarketcap',
				startdate: startDate,
				enddate: endDate,
				sort,
			},
		}) as {
			UTCDate: `${number}-${number}-${number}`,
			unixTimeStamp: `${number}`,
			supply: `${number}`,
			marketCap: `${number}`,
			price: `${number}`,
		}[]

		/**
		 * Get Ether Historical Price ​(Pro)
		 * Returns the historical price of 1 ETH
		 * 
		 * @param startdate the starting date in `yyyy-MM-dd` format, eg. `2019-02-01`
		 * @param enddate the ending date in `yyyy-MM-dd` format, eg. `2019-02-28`
		 * @param sort the sorting preference, use `asc` to sort by ascending and `desc` to sort by descending
		 * 
		 * ​​> 💰 Tip: The value is represented in **US Dollars ( USD )**.
		 */
		export const getEtherHistoricalPrice = async ({
			chainId,
			startDate,
			endDate,
			sort,
		}: {
			chainId: ChainId,
			startDate: `${string}-${string}-${string}`,
			endDate: `${string}-${string}-${string}`,
			sort: 'asc' | 'desc',
		}) => await get(chainId, {
			searchParams: {
				module: 'stats',
				action: 'ethdailyprice',
				startdate: startDate,
				enddate: endDate,
				sort,
			},
		}) as {
			UTCDate: `${number}-${number}-${number}`,
			unixTimeStamp: `${number}`,
			value: `${number}`,
		}[]
	}
}
