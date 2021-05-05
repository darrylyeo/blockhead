import * as Zapper from './api'
import { env } from '../../config-secrets'
import type { Ethereum } from '../ethereum/types'

const { ZAPPER_API_KEY } = env

const config = new Zapper.Configuration({ apiKey: () => ZAPPER_API_KEY })

export const ProtocolBalances = new Zapper.ProtocolBalancesApi(config)
export const ProtocolStats = new Zapper.ProtocolStatsApi(config)
console.log('Zapper', globalThis.Zapper = Zapper)
console.log('Zapper ProtocolBalances', globalThis.ProtocolBalances = ProtocolBalances)
console.log('Zapper ProtocolStats', globalThis.ProtocolStats = ProtocolStats)


const networkNamesByChainID: Record<Ethereum.ChainID, Zapper.PoolControllerGetPoolStatsNetworkEnum & Zapper.BalanceControllerGetProtocolBalancesV2NetworkEnum> = {
	'1': 'ethereum',
	'137': 'polygon',
	'10': 'optimism',
	'100': 'xdai',
	'56': 'binance-smart-chain',
	'250': 'fantom'
}

import { ConcurrentPromiseQueue } from '../../utils/concurrent-promise-queue'
const queue = new ConcurrentPromiseQueue(3)

const PromiseAllFulfilled = promises =>
	Promise.allSettled(promises).then(results =>
		Object.values(results)
			.filter(({status}) => status === 'fulfilled')
			.map(({value}) => value)
	)

export async function getAllProtocolBalances(network: Ethereum.Network, address: Ethereum.Address){
	const networkName = networkNamesByChainID[network.chainID]

	const supportedProtocolsByNetwork: {network: string, protocols}[] = await ProtocolBalances.balanceControllerGetSupportedV2BalancesRaw({ addresses: [address] })
		.then(r => r.raw.json())
	const supportedProtocols = supportedProtocolsByNetwork.find(({network}) => network === networkName)
	const supportedProtocolNames = supportedProtocols?.protocols.map(({protocol}) => protocol)

	// const supportedProtocolNames = Object.values(Zapper.BalanceControllerGetProtocolBalancesV2ProtocolEnum)
	console.log(Object.values(Zapper.BalanceControllerGetProtocolBalancesV2ProtocolEnum), supportedProtocols)

	return supportedProtocolNames && Promise.all(
		supportedProtocols.map(protocol =>
			queue.enqueue(() => 
				ProtocolBalances.balanceControllerGetProtocolBalancesV2({
					protocol,
					addresses: [address],
					network: networkNamesByChainID[network.chainID]
				})
			)
		)
	)
}

export async function getAllPoolStats(network: Ethereum.Network, address: Ethereum.Address){
	return Promise.all(
		Object.values(Zapper.PoolControllerGetPoolStatsPoolStatsTypeEnum).map(poolStatsType =>
			queue.enqueue(() =>
				ProtocolStats.poolControllerGetPoolStats({
					poolStatsType,    
					network: networkNamesByChainID[network.chainID]
				})
			)
		)
	)
}