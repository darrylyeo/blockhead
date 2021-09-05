import type {
	BalanceControllerGetProtocolBalancesV2Params,
	PoolControllerGetPoolStatsParams,
	PoolControllerGetPoolStatsByAddressParams,
	ProtocolBalanceResponse
} from './api/data-contracts'
import { V1 } from './api/V1'

import { ZAPPER_API_KEY } from '../../config-secrets'
import type { Ethereum } from '../ethereum/types'


const Zapper = new V1()


export type ZapperDeFiNetwork =
	| BalanceControllerGetProtocolBalancesV2Params['network']
	| PoolControllerGetPoolStatsParams['network']
	| PoolControllerGetPoolStatsByAddressParams['network']
export type ZapperDeFiProtocolName =
	| BalanceControllerGetProtocolBalancesV2Params['protocol']
	| PoolControllerGetPoolStatsParams['poolStatsType']
	| PoolControllerGetPoolStatsByAddressParams['poolStatsType']


const networkNamesByChainID: Record<Ethereum.ChainID, ZapperDeFiNetwork> = {
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

// const fromRaw = requestPromise => requestPromise.then(response => response.raw.json()).catch(async e => { throw e.json ? await e.json() : e.toString() })


const getSupportedProtocolNamesByNetwork = memoizedAsync(async (networkName: string, address: Ethereum.Address) => {
	const supportedProtocolsByNetwork: {network: string, protocols}[] = await Zapper.balanceControllerGetSupportedV2Balances({ addresses: [address] })

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
	// supportedProtocols
	
	return await PromiseAllFulfilled(
		filterDefiProtocolNames(protocolNames).map(protocol =>
			queue.enqueue(() =>
				Zapper.balanceControllerGetProtocolBalancesV2({
					protocol,
					addresses: [address],
					network: networkName
				})
				.then(response => response.json())
				.then((response: ProtocolBalanceResponse) => {
					console.log('Zapper balance', protocol, address, response)
					return {...Object.values(response)[0], protocolName: protocol}
				})
				// .catch(async response => console.error(await response.text()))
			)
		)
	).then(defiBalances => defiBalances.filter(
		<(_) => _ is Zapper.AddressBalanceResponse & {protocolName: ZapperDeFiProtocolName}> (_ => _)
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