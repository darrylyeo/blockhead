import type { Transaction, BigNumber } from 'ethers'
import type { Ethereum } from '../data/ethereum/types'





import { env } from '../env'

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
	network_id,
	from,
	to,
	input,
	gas,
	gas_price,
	value,
	save_if_fails,
}: {
	network_id: number,
	from: Ethereum.Address,
	to: Ethereum.ContractAddress,
	input: Transaction['data'],
	gas: number,
	gas_price: number,
	value: number,
	save_if_fails: boolean
}) =>
	await makeRequest(`/simulate`, {
		network_id,
		from,
		to,
		input,
		gas,
		gas_price,
		value,
		save_if_fails,
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


// export const getSimulations = async ({

// }: {

// }) =>
// 	await makeRequest(`/simulations`, {
// 	})
