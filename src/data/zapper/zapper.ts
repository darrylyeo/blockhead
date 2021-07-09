import * as Zapper from './api'
import { env } from '../../config-secrets'
import type { Ethereum } from '../ethereum/types'

const { ZAPPER_API_KEY } = env

const config = new Zapper.Configuration({ apiKey: () => ZAPPER_API_KEY })

export const ProtocolBalances = new Zapper.ProtocolBalancesApi(config)
export const ProtocolStats = new Zapper.ProtocolStatsApi(config)
export const MiscellaneousDataEndpoints = new Zapper.MiscellaneousDataEndpointsApi(config)


export type ZapperDeFiProtocolName = `${Zapper.BalanceControllerGetProtocolBalancesV2ProtocolEnum}`


const networkNamesByChainID: Record<Ethereum.ChainID, Zapper.PoolControllerGetPoolStatsNetworkEnum & Zapper.BalanceControllerGetProtocolBalancesV2NetworkEnum> = {
	'1': 'ethereum',
	'137': 'polygon',
	'10': 'optimism',
	'100': 'xdai',
	'56': 'binance-smart-chain',
	'250': 'fantom'
}


import { memoizedAsync } from '../../utils/memoized'

import { ConcurrentPromiseQueue } from '../../utils/concurrent-promise-queue'
const queue = new ConcurrentPromiseQueue(3)

function PromiseAllFulfilled<T>(promises: Promise<T>[]){
	return Promise.allSettled<T>(promises).then(results =>
		Object.values(results)
			.filter(({status}) => status === 'fulfilled')
			.map(({value}) => value as T)
	)
}

const fromRaw = requestPromise => requestPromise.then(response => response.raw.json()).catch(async e => { throw e.json ? await e.json() : e.toString() })


const getSupportedProtocolNamesByNetwork = memoizedAsync(async (networkName: string, address: Ethereum.Address) => {
	const supportedProtocolsByNetwork: {network: string, protocols}[] = await fromRaw(ProtocolBalances.balanceControllerGetSupportedV2BalancesRaw({ addresses: [address] }))

	const supportedProtocols = supportedProtocolsByNetwork.find(({network}) => network === networkName)
	console.log('supportedProtocolsByNetwork', supportedProtocols)

	if(supportedProtocols){
		const supportedProtocolNames: ZapperDeFiProtocolName[] = supportedProtocols.protocols.map(({protocol}) => protocol)
			// ?? Object.values(Zapper.BalanceControllerGetProtocolBalancesV2ProtocolEnum)

		return {supportedProtocols, supportedProtocolNames}
	}

	throw new Error(`Zapper doesn't yet support ${networkName} for the address ${address}.`)
})

function filterDefiProtocolNames(protocolNames: ZapperDeFiProtocolName[]): ZapperDeFiProtocolName[] {
	return [
		...protocolNames.filter(protocol => !['tokens', 'nft', 'other'].includes(protocol)),
		...protocolNames.filter(protocol => ['other'].includes(protocol))
	]
}


export const getDeFiProtocolBalances = memoizedAsync(async ({protocolNames, network, address}: {
	protocolNames?: ZapperDeFiProtocolName[],
	network: Ethereum.Network,
	address: Ethereum.Address
}) => {
	const networkName = networkNamesByChainID[network.chainId]

	if(!networkName)
		throw new Error(`Zapper doesn't yet support ${network.name}.`)

	const {supportedProtocols, supportedProtocolNames} = await getSupportedProtocolNamesByNetwork(networkName, address)
	protocolNames ??= supportedProtocolNames
	supportedProtocols
	
	return await PromiseAllFulfilled(
		filterDefiProtocolNames(protocolNames).map(protocol =>
			queue.enqueue(() =>
				ProtocolBalances.balanceControllerGetProtocolBalancesV2({
					protocol,
					addresses: [address],
					network: networkName
				})
				.then(response => console.log('Zapper balance', protocol, address, response) || Object.values(response)[0])
				// .catch(async response => console.error(await response.text()))
			)
		)
	).then(defiBalances => defiBalances.filter(
		<(_) => _ is Zapper.AddressBalanceResponse> (_ => _)
	))
})

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