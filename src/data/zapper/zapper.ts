import * as Zapper from './api'
import { env } from '../../config-secrets'
import type { Ethereum } from '../ethereum/types'

const { ZAPPER_API_KEY } = env

const config = new Zapper.Configuration({ apiKey: () => ZAPPER_API_KEY })

export const ProtocolBalances = new Zapper.ProtocolBalancesApi(config)
export const ProtocolStats = new Zapper.ProtocolStatsApi(config)
export const MiscellaneousDataEndpoints = new Zapper.MiscellaneousDataEndpointsApi(config)


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

const fromRaw = requestPromise => requestPromise.then(response => response.raw.json()).catch(async e => { throw e.json ? await e.json() : e.toString() })


function defiProtocolNames(protocolNames){
	return [
		...protocolNames.filter(protocol => !['tokens', 'nft', 'other', 'idle'].includes(protocol)),
		...protocolNames.filter(protocol => ['other'].includes(protocol))
	]
}


export async function getAllDeFiProtocolBalances({network, address}: {network: Ethereum.Network, address: Ethereum.Address}){
	const networkName = networkNamesByChainID[network.chainId]

	const supportedProtocolsByNetwork: {network: string, protocols}[] = await fromRaw(ProtocolBalances.balanceControllerGetSupportedV2BalancesRaw({ addresses: [address] }))
	const supportedProtocols = supportedProtocolsByNetwork.find(({network}) => network === networkName)
	const supportedProtocolNames: Zapper.BalanceControllerGetProtocolBalancesV2ProtocolEnum[] = supportedProtocols?.protocols.map(({protocol}) => protocol) ?? []
	// const supportedProtocolNames = Object.values(Zapper.BalanceControllerGetProtocolBalancesV2ProtocolEnum)

	return await Promise.all(
		defiProtocolNames(supportedProtocolNames).map(protocol =>
			queue.enqueue(() =>
				ProtocolBalances.balanceControllerGetProtocolBalancesV2({
					protocol,
					addresses: [address],
					network: networkNamesByChainID[network.chainId]
				})
				.then(response => Object.values(response)[0])
				// fromRaw(ProtocolBalances.balanceControllerGetProtocolBalancesV2Raw({
				// 	protocol,
				// 	addresses: [address],
				// 	network: networkNamesByChainID[network.chainId]
				// }))
			)
		)
	)
}

export async function getAllPoolStats({network, address}: {network: Ethereum.Network, address: Ethereum.Address}){
	return Promise.all(
		Object.values(Zapper.PoolControllerGetPoolStatsPoolStatsTypeEnum).map(poolStatsType =>
			queue.enqueue(() =>
				ProtocolStats.poolControllerGetPoolStats({
					poolStatsType,    
					network: networkNamesByChainID[network.chainId]
				})
			)
		)
	)
}

export async function getFiatRates(){
	return await MiscellaneousDataEndpoints.pricesControllerListFiatRates()
}