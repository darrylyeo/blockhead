import type { Ethereum } from '$/data/networks/types'

import * as publicEnv from '$env/static/public'

import { Tenderly, type TenderlyConfiguration } from '@tenderly/sdk'
import { encodeFunctionData } from 'viem'

const config: Omit<TenderlyConfiguration, 'network'> = {
	accountName: publicEnv.PUBLIC_TENDERLY_USER,
	projectName: publicEnv.PUBLIC_TENDERLY_PROJECT,
	accessKey: publicEnv.PUBLIC_TENDERLY_ACCESS_TOKEN,
}

export const simulateTransaction = async ({
	chainId,
	params,
	blockNumber,
}: {
	chainId: Ethereum.ChainId,
	params: Ethereum.TransactionContractCallParameters,
	blockNumber?: Ethereum.BlockNumber,
}) => {
	const tenderly = await new Tenderly({
		...config,
		network: chainId,
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
				max_fee_per_gas: Number(params.maxFeePerGas),
				max_priority_fee_per_gas: Number(params.maxPriorityFeePerGas),
			} : {
				gas: Number(params.gasAmount),
				gas_price: String(params.gasPrice),
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

const TENDERLY_URL = `https://api.tenderly.co/api/v1/account/${publicEnv.PUBLIC_TENDERLY_USER}/project/${publicEnv.PUBLIC_TENDERLY_PROJECT}`

const makeRequest = <T>(endpoint: string, params: any, method: 'GET' | 'POST' = 'GET') =>
	fetch(`${TENDERLY_URL}${endpoint}`, {
		method,
		body: JSON.stringify(params),
		headers: {
			'Content-Type': 'application/json',
			'X-Access-Key': publicEnv.PUBLIC_TENDERLY_ACCESS_TOKEN ?? '',
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
