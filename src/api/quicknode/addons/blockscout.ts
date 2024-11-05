/**
 * Multichain JSON RPC
 * by Blockscout
 * 
 * {@link https://docs.quicknode.com/docs/blockscout-multichain-json-rpc}
 */


// Types
import type { Ethereum } from '$/data/networks/types'
import type { Log, TransactionReceipt, TransactionRequest } from 'viem'
import { getQuickNodePublicClient } from '..'


// Functions
export const getChainId = async ({
	network,
}: {
	network: Ethereum.Network
}) => (
	await getQuickNodePublicClient({ network })
		.request<{
			Parameters: []
			ReturnType: `0x${string}` // hex encoded chain id
		}>({
			method: 'bs_chainId',
			params: [],
		})
)

export const getMaxPriorityFeePerGas = async ({
	network,
}: {
	network: Ethereum.Network
}) => (
	await getQuickNodePublicClient({ network })
		.request<{
			Parameters: []
			ReturnType: `0x${string}` // hex encoded gas price in wei
		}>({
			method: 'bs_maxPriorityFeePerGas',
			params: [],
		})
)

export const getGasPrice = async ({
	network,
}: {
	network: Ethereum.Network
}) => (
	await getQuickNodePublicClient({ network })
		.request<{
			Parameters: []
			ReturnType: `0x${string}` // hex encoded gas price in wei
		}>({
			method: 'bs_gasPrice',
			params: [],
		})
)

export const getBlockNumber = async ({
	network,
}: {
	network: Ethereum.Network
}) => (
	await getQuickNodePublicClient({ network })
		.request<{
			Parameters: []
			ReturnType: `0x${string}` // hex encoded block number
		}>({
			method: 'bs_blockNumber',
			params: [],
		})
)

export const getTransactionByHash = async ({
	network,
	hash,
}: {
	network: Ethereum.Network
	hash: `0x${string}`
}) => (
	await getQuickNodePublicClient({ network })
		.request<{
			Parameters: [
				`0x${string}`, // transaction hash
			]
			ReturnType: Ethereum.Transaction | null
		}>({
			method: 'bs_getTransactionByHash',
			params: [
				hash,
			],
		})
)

export const getTransactionReceipt = async ({
	network,
	hash,
}: {
	network: Ethereum.Network
	hash: `0x${string}`
}) => (
	await getQuickNodePublicClient({ network })
		.request<{
			Parameters: [
				`0x${string}`, // transaction hash
			]
			ReturnType: TransactionReceipt | null
		}>({
			method: 'bs_getTransactionReceipt',
			params: [
				hash,
			],
		})
)

export const getTransactionCount = async ({
	network,
	address,
	blockTag,
}: {
	network: Ethereum.Network
	address: Ethereum.Address
	blockTag: `0x${string}` | 'latest' | 'earliest' | 'pending'
}) => (
	await getQuickNodePublicClient({ network })
		.request<{
			Parameters: [
				Ethereum.Address,
				`0x${string}` | 'latest' | 'earliest' | 'pending',
			]
			ReturnType: `0x${string}` // hex encoded nonce
		}>({
			method: 'bs_getTransactionCount',
			params: [
				address,
				blockTag,
			],
		})
)

export const getBalance = async ({
	network,
	address,
	blockTag,
}: {
	network: Ethereum.Network
	address: Ethereum.Address
	blockTag: `0x${string}` | 'latest' | 'earliest' | 'pending'
}) => (
	await getQuickNodePublicClient({ network })
		.request<{
			Parameters: [
				Ethereum.Address,
				`0x${string}` | 'latest' | 'earliest' | 'pending',
			]
			ReturnType: `0x${string}` // hex encoded balance in wei
		}>({
			method: 'bs_getBalance',
			params: [
				address,
				blockTag,
			],
		})
)

export const getCode = async ({
	network,
	address,
	blockTag,
}: {
	network: Ethereum.Network
	address: Ethereum.Address
	blockTag: `0x${string}` | 'latest' | 'earliest' | 'pending'
}) => (
	await getQuickNodePublicClient({ network })
		.request<{
			Parameters: [
				Ethereum.Address,
				`0x${string}` | 'latest' | 'earliest' | 'pending',
			]
			ReturnType: `0x${string}` // hex encoded bytecode
		}>({
			method: 'bs_getCode',
			params: [
				address,
				blockTag,
			],
		})
)

export const getStorageAt = async ({
	network,
	address,
	position,
	blockTag,
}: {
	network: Ethereum.Network
	address: Ethereum.Address
	position: `0x${string}`
	blockTag: `0x${string}` | 'latest' | 'earliest' | 'pending'
}) => (
	await getQuickNodePublicClient({ network })
		.request<{
			Parameters: [
				Ethereum.Address,
				`0x${string}`, // storage position
				`0x${string}` | 'latest' | 'earliest' | 'pending',
			]
			ReturnType: `0x${string}` // hex encoded storage value
		}>({
			method: 'bs_getStorageAt',
			params: [
				address,
				position,
				blockTag,
			],
		})
)

export const getBlockByHash = async ({
	network,
	hash,
	includeTransactions,
}: {
	network: Ethereum.Network
	hash: `0x${string}`
	includeTransactions: boolean
}) => (
	await getQuickNodePublicClient({ network })
		.request<{
			Parameters: [
				`0x${string}`, // block hash
				boolean,
			]
			ReturnType: Ethereum.Block | null
		}>({
			method: 'bs_getBlockByHash',
			params: [
				hash,
				includeTransactions,
			],
		})
)

export const estimateGas = async ({
	network,
	transaction,
	blockTag,
}: {
	network: Ethereum.Network
	transaction: TransactionRequest
	blockTag: `0x${string}` | 'latest' | 'earliest' | 'pending'
}) => (
	await getQuickNodePublicClient({ network })
		.request<{
			Parameters: [
				TransactionRequest,
				`0x${string}` | 'latest' | 'earliest' | 'pending',
			]
			ReturnType: `0x${string}` // hex encoded gas estimate
		}>({
			method: 'bs_estimateGas',
			params: [
				transaction,
				blockTag,
			],
		})
)

export const getBlockByNumber = async ({
	network,
	blockTag,
	includeTransactions,
}: {
	network: Ethereum.Network
	blockTag: `0x${string}` | 'latest' | 'earliest' | 'pending'
	includeTransactions: boolean
}) => (
	await getQuickNodePublicClient({ network })
		.request<{
			Parameters: [
				`0x${string}` | 'latest' | 'earliest' | 'pending',
				boolean,
			]
			ReturnType: Ethereum.Block | null
		}>({
			method: 'bs_getBlockByNumber',
			params: [
				blockTag,
				includeTransactions,
			],
		})
)

export const sendRawTransaction = async ({
	network,
	signedTransaction,
}: {
	network: Ethereum.Network
	signedTransaction: `0x${string}`
}) => (
	await getQuickNodePublicClient({ network })
		.request<{
			Parameters: [
				`0x${string}`, // signed transaction data
			]
			ReturnType: `0x${string}` // transaction hash
		}>({
			method: 'bs_sendRawTransaction',
			params: [
				signedTransaction,
			],
		})
)

export const call = async ({
	network,
	transaction,
	blockTag,
}: {
	network: Ethereum.Network
	transaction: TransactionRequest
	blockTag: `0x${string}` | 'latest' | 'earliest' | 'pending'
}) => (
	await getQuickNodePublicClient({ network })
		.request<{
			Parameters: [
				TransactionRequest,
				`0x${string}` | 'latest' | 'earliest' | 'pending',
			]
			ReturnType: `0x${string}` // hex encoded return data
		}>({
			method: 'bs_call',
			params: [
				transaction,
				blockTag,
			],
		})
)

export const getLogs = async ({
	network,
	filter,
}: {
	network: Ethereum.Network
	filter: {
		fromBlock: `0x${string}` | 'latest' | 'earliest' | 'pending'
		toBlock: `0x${string}` | 'latest' | 'earliest' | 'pending'
		address?: Ethereum.Address | Ethereum.Address[] | null
		topics?: `0x${string}`[] | null
	},
}) => (
	await getQuickNodePublicClient({ network })
		.request<{
			Parameters: [
				{
					fromBlock: `0x${string}` | 'latest' | 'earliest' | 'pending'
					toBlock: `0x${string}` | 'latest' | 'earliest' | 'pending'
					address?: Ethereum.Address | Ethereum.Address[] | null
					topics?: `0x${string}`[] | null
				},
			]
			ReturnType: Log[]
		}>({
			method: 'bs_getLogs',
			params: [
				filter,
			],
		})
)
