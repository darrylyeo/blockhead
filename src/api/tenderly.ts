import type { Ethereum } from '../data/networks/types'

import { env } from '../env'

import { Tenderly, type TenderlyConfiguration } from '@tenderly/sdk'
import { encodeFunctionData } from 'viem'

const config: Omit<TenderlyConfiguration, 'network'> = {
	accountName: env.TENDERLY_USER,
	projectName: env.TENDERLY_PROJECT,
	accessKey: env.TENDERLY_ACCESS_TOKEN,
}

export const simulateTransaction = async ({
	params,
	blockNumber,
}: {
	params: Ethereum.TransactionContractCallParameters<any, any, any>,
	blockNumber?: Ethereum.BlockNumber,
}) => {
	const tenderly = await new Tenderly({
		...config,
		network: params.network.chainId,
	})

	return tenderly.simulator.simulateTransaction({
		transaction: {
			from: params.fromAddress,
			to: params.contractAddress,
			input: encodeFunctionData({
				abi: params.contractAbi,
				functionName: params.contractMethodName,
				args: params.contractMethodArgs,
			}),

			...params.isEip1559 ? {
				max_fee_per_gas: params.maxFeePerGas,
				max_priority_fee_per_gas: params.maxPriorityFeePerGas,
			} : {
				gas: params.gasAmount,
				gas_price: params.gasPrice,
			},

			value: String(params.payableAmount),
			
			access_list: params.accessList?.map(({ address, storageKeys }) => ({
				value_address: address,
				value_storage_keys: storageKeys,
			})),
		},
		...blockNumber && {
			blockNumber,
		},
		// overrides: {
		// 	contractAddress: params.contractAddress,
		// },
	})
}


/*
import type { Transaction } from 'ethers'

const TENDERLY_URL = `https://api.tenderly.co/api/v1/account/${env.TENDERLY_USER}/project/${env.TENDERLY_PROJECT}`

const makeRequest = <T>(endpoint: string, params: any, method: 'GET' | 'POST' = 'GET') =>
	fetch(`${TENDERLY_URL}${endpoint}`, {
		method,
		body: JSON.stringify(params),
		headers: {
			'Content-Type': 'application/json',
			'X-Access-Key': env.TENDERLY_ACCESS_TOKEN ?? '',
		}
	})
	.then(r => r.json())

export const simulateTransaction = async ({
	network,
	from,
	to,
	input,
	gas,
	gasPrice,
	value,
	saveIfFails,
}: {
	network: Ethereum.Network,
	from: Ethereum.Address,
	to: Ethereum.ContractAddress,
	input: Transaction['data'],
	gas: number,
	gasPrice: number,
	value: number,
	saveIfFails: boolean
}) => (
	await makeRequest(`/simulate`, {
		network_id: network.chainOId,
		from,
		to,
		input,
		gas,
		gas_price: gasPrice,
		value,
		save_if_fails: saveIfFails,
	}, 'POST')
	.then(response => {
		if(response.error)
			throw new Error(response.error.message)

		return response as {
			simulation: {
				status: boolean,
				error: {
					data: string
					message: string
					slug: string
				}
			}
		}
	})
)
*/

// export const getSimulations = async ({

// }: {

// }) =>
// 	await makeRequest(`/simulations`, {
// 	})
