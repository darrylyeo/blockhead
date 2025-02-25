// Types/constants
import type { Ethereum } from '$/data/networks/types'
import type { Query, Result, Transaction, Block, Log, Trace, TransactionsSelector, BlocksSelector, LogsSelector, TracesSelector } from './types'

const blockFields = [
	'number',
	'hash', 
	'parent_hash',
	'nonce',
	'sha3_uncles',
	'logs_bloom',
	'transactions_root', 
	'state_root',
	'receipts_root',
	'miner',
	'difficulty',
	'total_difficulty',
	'extra_data',
	'size',
	'gas_limit',
	'gas_used',
	'timestamp',
	'uncles',
	'base_fee_per_gas',
	'blob_gas_used',
	'excess_blob_gas',
	'parent_beacon_block_root',
	'withdrawals_root',
	'withdrawals',
	'l1_block_number',
	'send_count',
	'send_root',
	'mix_hash',
] as const satisfies (keyof Block)[]

const transactionFields = [
	'block_hash',
	'block_number',
	'from',
	'gas',
	'gas_price',
	'hash',
	'input',
	'nonce', 
	'to',
	'transaction_index',
	'value',
	'v',
	'r',
	's',
	'y_parity',
	'max_priority_fee_per_gas',
	'max_fee_per_gas',
	'chain_id',
	'access_list',
	'max_fee_per_blob_gas',
	'blob_versioned_hashes',
	'cumulative_gas_used',
	'effective_gas_price',
	'gas_used',
	'contract_address',
	'logs_bloom',
	'kind',
	'root',
	'status',
	'l1_fee',
	'l1_gas_price',
	'l1_gas_used',
	'l1_fee_scalar',
	'gas_used_for_l1',
] as const satisfies (keyof Transaction)[]

const logFields = [
	'removed',
	'log_index',
	'transaction_index',
	'transaction_hash',
	'block_hash',
	'block_number',
	'address',
	'data',
	'topics',
] as const satisfies (keyof Log)[]

const traceFields = [
	'from',
	'to',
	'call_type',
	'gas',
	'input',
	'init',
	'value',
	'author',
	'reward_type',
	'block_hash',
	'block_number',
	'address',
	'code',
	'gas_used',
	'output',
	'subtraces',
	'trace_address',
	'transaction_hash',
	'transaction_position',
	'type',
	'error',
] as const satisfies (keyof Trace)[]

/**
 * {@link https://docs.envio.dev/docs/HyperSync/hypersync-supported-networks}
*/
export const endpoints = [
	{
		label: 'Arbitrum',
		chainId: 42161,
		baseUrl: 'https://arbitrum.hypersync.xyz',
	},
	{
		label: 'Arbitrum Nova',
		chainId: 42170,
		baseUrl: 'https://arbitrum-nova.hypersync.xyz',
	},
	{
		label: 'Arbitrum Sepolia',
		chainId: 421614,
		baseUrl: 'https://arbitrum-sepolia.hypersync.xyz',
	},
	{
		label: 'Aurora',
		chainId: 1313161554,
		baseUrl: 'https://aurora.hypersync.xyz',
	},
	{
		label: 'Avalanche',
		chainId: 43114,
		baseUrl: 'https://avalanche.hypersync.xyz',
	},
	{
		label: 'Base',
		chainId: 8453,
		baseUrl: 'https://base.hypersync.xyz',
	},
	{
		label: 'Base Sepolia',
		chainId: 84532,
		baseUrl: 'https://base-sepolia.hypersync.xyz',
	},
	{
		label: 'Berachain',
		chainId: 80094,
		baseUrl: 'https://berachain.hypersync.xyz',
	},
	{
		label: 'Berachain Bartio',
		chainId: 80084,
		baseUrl: 'https://berachain-bartio.hypersync.xyz',
	},
	{
		label: 'Blast',
		chainId: 81457,
		baseUrl: 'https://blast.hypersync.xyz',
	},
	{
		label: 'Blast Sepolia',
		chainId: 168587773,
		baseUrl: 'https://blast-sepolia.hypersync.xyz',
	},
	{
		label: 'Boba',
		chainId: 288,
		baseUrl: 'https://boba.hypersync.xyz',
	},
	{
		label: 'Bsc',
		chainId: 56,
		baseUrl: 'https://bsc.hypersync.xyz',
	},
	{
		label: 'Bsc Testnet',
		chainId: 97,
		baseUrl: 'https://bsc-testnet.hypersync.xyz',
	},
	{
		label: 'Celo',
		chainId: 42220,
		baseUrl: 'https://celo.hypersync.xyz',
	},
	{
		label: 'Chiliz',
		chainId: 8888,
		baseUrl: 'https://chiliz.hypersync.xyz',
	},
	{
		label: 'Citrea Testnet',
		chainId: 5115,
		baseUrl: 'https://citrea-testnet.hypersync.xyz',
	},
	{
		label: 'Crab',
		chainId: 44,
		baseUrl: 'https://crab.hypersync.xyz',
	},
	{
		label: 'Cyber',
		chainId: 7560,
		baseUrl: 'https://cyber.hypersync.xyz',
	},
	{
		label: 'Darwinia',
		chainId: 46,
		baseUrl: 'https://darwinia.hypersync.xyz',	
	},
	{
		label: 'Ethereum Mainnet',
		chainId: 1,
		baseUrl: 'https://eth.hypersync.xyz',	
	},
	{
		label: 'Extrabud',
		chainId: 283027429,
		baseUrl: 'https://extrabud.hypersync.xyz',
	},
	{
		label: 'Fantom',
		chainId: 250,
		baseUrl: 'https://fantom.hypersync.xyz',
	},
	{
		label: 'Flare',
		chainId: 14,
		baseUrl: 'https://flare.hypersync.xyz',
	},
	{
		label: 'Fraxtal',
		chainId: 252,
		baseUrl: 'https://fraxtal.hypersync.xyz',
	},
	{
		label: 'Fuji',
		chainId: 43113,
		baseUrl: 'https://fuji.hypersync.xyz',
	},
	{
		label: 'Galadriel Devnet',
		chainId: 696969,
		baseUrl: 'https://galadriel-devnet.hypersync.xyz',
	},
	{
		label: 'Gnosis',
		chainId: 100,
		baseUrl: 'https://gnosis.hypersync.xyz',
	},
	{
		label: 'Gnosis Chiado',
		chainId: 10200,
		baseUrl: 'https://gnosis-chiado.hypersync.xyz',
	},
	{
		label: 'Gnosis Traces',
		chainId: 100,
		baseUrl: 'https://gnosis-traces.hypersync.xyz',
	},
	{
		label: 'Harmony Shard 0',
		chainId: 1666600000,
		baseUrl: 'https://harmony-shard-0.hypersync.xyz',
	},
	{
		label: 'Holesky',
		chainId: 17000,
		baseUrl: 'https://holesky.hypersync.xyz',
	},
	{
		label: 'Holesky Token Test',
		chainId: 17000,
		baseUrl: 'https://holesky-token-test.hypersync.xyz',
	},
	{
		label: 'Ink',
		chainId: 57073,
		baseUrl: 'https://ink.hypersync.xyz',
	},
	{
		label: 'Internal Test Chain',
		chainId: 16858666,
		baseUrl: 'https://internal-test-chain.hypersync.xyz',
	},
	{
		label: 'Kroma',
		chainId: 255,
		baseUrl: 'https://kroma.hypersync.xyz',
	},
	{
		label: 'Linea',
		chainId: 59144,
		baseUrl: 'https://linea.hypersync.xyz',
	},
	{
		label: 'Lisk',
		chainId: 1135,
		baseUrl: 'https://lisk.hypersync.xyz',
	},
	{
		label: 'Lukso',
		chainId: 42,
		baseUrl: 'https://lukso.hypersync.xyz',
	},
	{
		label: 'Lukso Testnet',
		chainId: 4201,
		baseUrl: 'https://lukso-testnet.hypersync.xyz',
	},
	{
		label: 'Manta',
		chainId: 169,
		baseUrl: 'https://manta.hypersync.xyz',
	},
	{
		label: 'Mantle',
		chainId: 5000,
		baseUrl: 'https://mantle.hypersync.xyz',
	},
	{
		label: 'Merlin',
		chainId: 4200,
		baseUrl: 'https://merlin.hypersync.xyz',
	},
	{
		label: 'Metall2',
		chainId: 1750,
		baseUrl: 'https://metall2.hypersync.xyz',
	},
	{
		label: 'Metis',
		chainId: 1088,
		baseUrl: 'https://metis.hypersync.xyz',
	},
	{
		label: 'Mev Commit',
		chainId: 17864,
		baseUrl: 'https://mev-commit.hypersync.xyz',
	},
	{
		label: 'Mode',
		chainId: 34443,
		baseUrl: 'https://mode.hypersync.xyz',
	},
	{
		label: 'Monad Testnet',
		chainId: 10143,
		baseUrl: 'https://monad-testnet.hypersync.xyz',
	},
	{
		label: 'Moonbase Alpha',
		chainId: 1287,
		baseUrl: 'https://moonbase-alpha.hypersync.xyz',
	},
	{
		label: 'Moonbeam',
		chainId: 1284,
		baseUrl: 'https://moonbeam.hypersync.xyz',
	},
	{
		label: 'Morph',
		chainId: 2818,
		baseUrl: 'https://morph.hypersync.xyz',
	},
	{
		label: 'Morph Holesky',
		chainId: 2810,
		baseUrl: 'https://morph-holesky.hypersync.xyz',
	},
	{
		label: 'Opbnb',
		chainId: 204,
		baseUrl: 'https://opbnb.hypersync.xyz',
	},
	{
		label: 'Optimism',
		chainId: 10,
		baseUrl: 'https://optimism.hypersync.xyz',
	},
	{
		label: 'Optimism Sepolia',
		chainId: 11155420,
		baseUrl: 'https://optimism-sepolia.hypersync.xyz',
	},
	{
		label: 'Polygon',
		chainId: 137,
		baseUrl: 'https://polygon.hypersync.xyz',
	},
	{
		label: 'Polygon Amoy',
		chainId: 80002,
		baseUrl: 'https://polygon-amoy.hypersync.xyz',
	},
	{
		label: 'Polygon zkEVM',
		chainId: 1101,
		baseUrl: 'https://polygon-zkevm.hypersync.xyz',
	},
	{
		label: 'Rootstock',
		chainId: 30,
		baseUrl: 'https://rootstock.hypersync.xyz',
	},
	{
		label: 'Saakuru',
		chainId: 7225878,
		baseUrl: 'https://saakuru.hypersync.xyz',
	},
	{
		label: 'Scroll',
		chainId: 534352,
		baseUrl: 'https://scroll.hypersync.xyz',
	},
	{
		label: 'Sepolia',
		chainId: 11155111,
		baseUrl: 'https://sepolia.hypersync.xyz',
	},
	{
		label: 'Shimmer Evm',
		chainId: 148,
		baseUrl: 'https://shimmer-evm.hypersync.xyz',
	},
	{
		label: 'Soneium',
		chainId: 1868,
		baseUrl: 'https://soneium.hypersync.xyz',
	},
	{
		label: 'Sophon',
		chainId: 50104,
		baseUrl: 'https://sophon.hypersync.xyz',
	},
	{
		label: 'Sophon Testnet',
		chainId: 531050104,
		baseUrl: 'https://sophon-testnet.hypersync.xyz',
	},
	{
		label: 'Unichain',
		chainId: 130,
		baseUrl: 'https://unichain.hypersync.xyz',
	},
	{
		label: 'Unichain Sepolia',
		chainId: 1301,
		baseUrl: 'https://unichain-sepolia.hypersync.xyz',
	},
	{
		label: 'Zeta',
		chainId: 7000,
		baseUrl: 'https://zeta.hypersync.xyz',
	},
	{
		label: 'Zircuit',
		chainId: 48900,
		baseUrl: 'https://zircuit.hypersync.xyz',
	},
	{
		label: 'ZKsync',
		chainId: 324,
		baseUrl: 'https://zksync.hypersync.xyz',
	},
	{
		label: 'Zora',
		chainId: 7777777,
		baseUrl: 'https://zora.hypersync.xyz',
	},
] as const satisfies {
	label: string
	chainId: Ethereum.ChainId
	baseUrl: string
}[]

export const endpointsByChainId = (
	Map.groupBy(
		endpoints,
		network => network.chainId
	)
)


// Functions
const getBaseUrl = (chainId: Ethereum.ChainId): string => {
	if (!endpointsByChainId.has(chainId))
		throw new Error(`Envio HyperSync does not yet support chain ID ${chainId}.`)

	return (
		endpointsByChainId
			.get(chainId as typeof endpoints[number]['chainId'])![0]
			.baseUrl
	)
}

const handleResponse = async <
	T
>(
	response: Response,
): Promise<T> => {
	if (!response.ok)
		throw new Error(await response.text())

	return response.json() as unknown as T
}

const get = async <
	Result
>(
	chainId: Ethereum.ChainId,
	path: string
) => (
	await fetch(
		`${getBaseUrl(chainId)}/${path}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		}
	)
		.then(response => (
			handleResponse<Result>(response)
		))
)

const post = async <
	Params,
	Result
>(
	chainId: Ethereum.ChainId,
	params: Params,
) => (
	await fetch(
		`${getBaseUrl(chainId)}/query`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(params),
		}
	)
		.then(response => (
			handleResponse<Result>(response)
		))
)


// Queries
export const getLatestBlockHeight = async ({
	chainId,
}: {
	chainId: Ethereum.ChainId
}) => (
	(
		await get<
			{
				height: number
			}
		>(
			chainId,
			`height`,
		)
	)
)

export const getBlocks = async ({
	chainId,
	fromBlock = 0,
	toBlock,
	selectors,
}: {
	chainId: Ethereum.ChainId
	blockHashes?: string[]
	fromBlock?: number
	toBlock?: number
	selectors: BlocksSelector[]
}) => (
	(
		await post<
			Query,
			Result<
				{
					blocks: Block[]
				}
			>
		>(
			chainId,
			{
				from_block: fromBlock,
				...toBlock && {
					to_block: toBlock,
				},
				blocks: selectors,
				field_selection: {
					block: blockFields,
				},
			}
		)
	)
)

export const getBlock = async ({
	chainId,
	blockNumber,
}: {
	chainId: Ethereum.ChainId
	blockNumber: number
}) => (
	(
		await post<
			Query,
			Result<
				{
					blocks: Block[]
				}
			>
		>(
			chainId,
			{
				from_block: blockNumber,
				to_block: blockNumber + 1,
				blocks: [
					{
						number: [
							blockNumber,
						],
					},
				],
				field_selection: {
					block: blockFields,
				},
			}
		)
	)
)

export const getTransactions = async ({
	chainId,
	fromBlock = 0,
	toBlock,
	selectors,
}: {
	chainId: Ethereum.ChainId
	fromBlock?: number
	toBlock?: number
	selectors: TransactionsSelector[]
}) => (
	(
		await post<
			Query,
			Result<{
				transactions: Transaction[]
			}>
		>(
			chainId,
			{
				from_block: fromBlock,
				...toBlock && {
					to_block: toBlock,
				},
				transactions: selectors,
				field_selection: {
					transaction: transactionFields,
					// block: blockFields,
				}
			}
		)
	)
)

export const getLogs = async ({
	chainId,
	fromBlock = 0,
	toBlock,
	selectors,
}: {
	chainId: Ethereum.ChainId
	fromBlock?: number
	toBlock?: number
	selectors: LogsSelector[]
}) => (
	(
		await post<
			Query,
			Result<{
				logs: Log[]
			}>
		>(
			chainId,
			{
				from_block: fromBlock,
				...toBlock && {
					to_block: toBlock,
				},
				logs: selectors,
				field_selection: {
					log: logFields,
					block: blockFields,
				},
			},
		)
	)
)

export const getTraces = async ({
	chainId,
	fromBlock = 0,
	toBlock,
	selectors,
}: {
	chainId: Ethereum.ChainId
	fromBlock?: number
	toBlock?: number
	selectors?: TracesSelector[]
}) => (
	(
		await post<
			Query,
			Result<{
				traces: Trace[]
			}>
		>(
			chainId,
			{
				from_block: fromBlock,
				...toBlock && {
					to_block: toBlock,
				},
				traces: selectors,
				field_selection: {
					trace: traceFields,
					block: blockFields,
				},
			},
		)
	)
)
