import { env } from '../env'


const TENDERLY_URL = `https://api.tenderly.co/api/v1/account/${env.TENDERLY_USER}/project/${env.TENDERLY_PROJECT}`

const makeRequest = <T>(endpoint: string, params: any, method: 'GET' | 'POST' = 'GET') =>
	fetch(`${TENDERLY_URL}${endpoint}`, {
		method,
		body: params,
		headers: {
			'Content-Type': 'application/json',
			'X-Access-Key': env.TENDERLY_ACCESS_TOKEN ?? '',
		}
	})
	.then(r => r.json())


export const getSimulations = async ({

}: {

}) =>
	await makeRequest(`/simulations`, {
	})


export const simulateTransaction = async ({

}: {

}) =>
	await makeRequest(`/simulate`, {

	}, 'POST')
	.then(response => {
		console.log(response)
		if(response.data.simulation.status)
			throw new Error(response.data.simulation.error)
		
		return response.data.simulation
	})
