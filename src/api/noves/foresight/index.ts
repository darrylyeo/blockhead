/**
 * Noves › Foresight API
 * {@link https://docs.noves.fi/reference/foresight-api-quickstart}
 */


// Types
import type { int32, int64 } from '..'

type UnsignedTransaction = {
	from: string | null
	to: string | null
	data: string | null
	value: string | null
	gas: string | null
	gasPrice: string | null
	maxFeePerGas: string | null
	maxPriorityFeePerGas: string | null
	type: string | null
}

type Transaction = {
	txTypeVersion: int32
	chain: string | null
	accountAddress: string | null
	classificationData: string
	rawTransactionData: {
		transactionHash: string | null
		fromAddress: string | null
		toAddress: string | null
		blockNumber: int32
		gas: object
		gasPrice: object
		transactionFee: object
		timestamp: object
	}
}

type UserOp = {
	sender: string | null
	nonce: int64
	initCode: string | null
	callData: string | null
	callGasLimit: int64
	verificationGasLimit: int64
	preVerificationGas: int64
	maxFeePerGas: int64
	maxPriorityFeePerGas: int64
	paymasterAndData: string | null
	signature: string | null
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
		`https://foresight.noves.fi/${endpoint}${
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
 * /chains
 * 
 * Returns a list with the names of the EVM blockchains currently supported by this API. Use the provided chain names when calling other endpoints.
 * 
 * {@link https://docs.noves.fi/reference/get_evm-chains-1}
 */
export const chains = async () => (
	await request<
		{
			name: string | null
			ecosystem: string | null
			evmChainId: int64 | null
		}[]
	>(
		'chains',
	)
)

/**
 * /preview
 * 
 * Takes an unsigned transaction object and returns a fully classified transaction, including an enriched English description of the action that is about to take place, and all relevant asset transfers tagged.
 * 
 * Optionally, it takes a stateOverrides object, which allows you to customize the state of the chain before the transaction is previewed. Useful for more advanced applications. You can skip this object to preview the transaction in the "real" state of the chain.
 * 
 * {@link https://docs.noves.fi/reference/post_evm-chain-preview}
 */
export const preview = async ({
	chain,
	viewAsAccountAddress,
	blockNumber,
	transaction,
	stateOverrides,
}: {
	// Path Params
	/** The chain name, as listed in the /chains endpoint. */
	chain: string

	// Query Params
	/** The account address from which perspective the transaction will be previewed (optional). Leave blank to use the raw 'from' of the transaction object. */
	viewAsAccountAddress?: string
	/** The block number to preview the transaction at (optional). Leave blank to use the latest block number. */
	blockNumber?: int64

	// Body Params
	transaction: {
		from: string | null
		to: string | null
		data: string | null
		value: string | null
		gas: string | null
		gasPrice: string | null
		maxFeePerGas: string | null
		maxPriorityFeePerGas: string | null
		type: string | null
	}
	stateOverrides?: Record<string, { stateDiff: object | null}>
}) => (
	await request<
		Transaction
	>(
		`evm/${chain}/preview`,
		{
			viewAsAccountAddress,
			blockNumber,
		},
		'POST',
		{
			transaction,
			stateOverrides,
		}
	)
)

/**
 * /evm/{chain}/preview4337
 * 
 * Takes an ERC-4337 userOp object, and returns a classified transaction previewing what will happen if the userOp is executed.
 * It includes an English description plus all relevant asset transfers tagged from the perspective of the userOp's 'sender' (the user).
 * 
 * {@link https://docs.noves.fi/reference/post_evm-chain-preview4337}
 */
export const preview4337 = async ({
	chain = 'ethereum',
	blockNumber,
	userOp,
}: {
	// Path Params
	/** The chain name, as listed in the /chains endpoint. */
	chain?: string

	// Query Params
	/** The block number to preview the userOp at (optional). Leave blank to preview the userOp in the current state of the chain. */
	blockNumber?: int64

	// Body Params
	/** The ERC-4337 userOp object, in exactly the same format that would be submitted to a bundler for transaction execution. */
	userOp: UserOp
}) => (
	await request<
		Transaction
	>(
		`evm/${chain}/preview4337`,
		{
			blockNumber,
		},
		'POST',
		{
			userOp,
		},
	)
)

/**
 * /evm/{chain}/describe
 * 
 * Returns a description of the action that will take place if the transaction executes.
 * 
 * {@link https://docs.noves.fi/reference/post_evm-chain-describe}
 */
export const describe = async ({
	chain = 'ethereum',
	transaction,
}: {
	// Path Params
	/** The chain name, as listed in the /chains endpoint. */
	chain?: string

	// Body Params
	/** The unsigned transaction object, modeled after the standard format used by multiple EVM wallets. */
	transaction: UnsignedTransaction
}) => (
	await request<
		Transaction
	>(
		`evm/${chain}/describe`,
		undefined,
		'POST',
		{
			transaction,
		},
	)
)

/**
 * /evm/{chain}/describe4337
 * 
 * Returns a description of what will happen if the ERC-4337 userOp object executes.
 * 
 * {@link https://docs.noves.fi/reference/post_evm-chain-describe4337}
 */
export const describe4337 = async ({
	chain = 'ethereum',
	userOp,
}: {
	// Path Params
	/** The chain name, as listed in the /chains endpoint. */
	chain?: string

	// Body Params
	/** The ERC-4337 userOp object, in exactly the same format that would be submitted to a bundler for transaction execution. */
	userOp: UserOp
}) => (
	await request<
		Transaction
	>(
		`evm/${chain}/describe4337`,
		undefined,
		'POST',
		{
			userOp,
		},
	)
)
