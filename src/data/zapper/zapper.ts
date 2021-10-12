import type {
	BalanceControllerGetProtocolBalancesV2Params,
	PoolControllerGetPoolStatsParams,
	PoolControllerGetPoolStatsByAddressParams,
	ProtocolBalanceResponse
} from './api/data-contracts'

import type { Ethereum } from '../ethereum/types'


export type ZapperDeFiNetwork =
	| BalanceControllerGetProtocolBalancesV2Params['network']
	| PoolControllerGetPoolStatsParams['network']
	| PoolControllerGetPoolStatsByAddressParams['network']

const networkNamesByChainID: Record<Ethereum.ChainID, ZapperDeFiNetwork> = {
	'1': 'ethereum',
	'137': 'polygon',
	'10': 'optimism',
	'100': 'xdai',
	'56': 'binance-smart-chain',
	'250': 'fantom',
	'43114': 'avalanche',
	'42161': 'arbitrum'
}


export type ZapperDeFiProtocolName =
	| BalanceControllerGetProtocolBalancesV2Params['protocol']
	| PoolControllerGetPoolStatsParams['poolStatsType']
	| PoolControllerGetPoolStatsByAddressParams['poolStatsType']

const ZapperDeFiProtocolNames: ZapperDeFiProtocolName[] = [
	'1inch',
	'88mph-v3',
	'88mph',
	'aave-amm',
	'aave-safety-module',
	'aave-v2',
	'aave',
	'aavegotchi',
	'abracadabra',
	'adamant',
	'alchemix',
	'alpha-v1',
	'alpha-v2',
	'apeswap',
	'apy',
	'arcx',
	'armor',
	'augur',
	'autofarm',
	'b-protocol',
	'badger',
	'balancer-v1',
	'balancer-v2',
	'bancor',
	'bao',
	'barnbridge-smart-yield',
	'barnbridge',
	'based-money',
	'basis-cash',
	'basis-gold',
	'basket-dao',
	'beefy',
	'bella',
	'belt',
	'benchmark',
	'benqi',
	'big-data',
	'bitcoin',
	'boring-dao',
	'bzx',
	'compound',
	'convex',
	'cover',
	'cream-iron-bank',
	'cream',
	'cryptex',
	'curve',
	'defi-dollar',
	'defi-swap',
	'defisaver',
	'derivadex',
	'deversifi',
	'dfi-money',
	'dforce',
	'dfyn',
	'dhedge',
	'dodo',
	'dopex',
	'dsd',
	'dydx',
	'element',
	'ellipsis',
	'epns',
	'esd',
	'essentia',
	'fei',
	'float-protocol',
	'frax',
	'futureswap',
	'governor-dao',
	'gro',
	'harvest',
	'hegic',
	'idle',
	'illuvium',
	'impossible-finance',
	'index-coop',
	'indexed',
	'inverse',
	'iron',
	'keep-network',
	'keeper-dao',
	'klondike-v2',
	'klondike',
	'kyber-dmm',
	'kyber-network',
	'launchpool',
	'linkswap',
	'liquity',
	'loopring',
	'lydia',
	'lyra',
	'maker',
	'mintr',
	'mirror',
	'mith-cash',
	'mooniswap',
	'mstable',
	'mushroom',
	'nft',
	'nft20',
	'nftx',
	'nsure-network',
	'olympus',
	'onx',
	'opium-network',
	'opyn',
	'orion-protocol',
	'other',
	'pancakeswap',
	'pangolin',
	'penguin',
	'perpetual-protocol',
	'pickle',
	'pie-dao',
	'polywhale',
	'pooltogether',
	'popsicle',
	'powerpool',
	'quickswap',
	'rally',
	'rari-fuse',
	'rari',
	'realt',
	'reflexer',
	'ribbon',
	'sablier',
	'saddle',
	'sfinance',
	'shapeshift',
	'shared-stake',
	'shell',
	'smoothy',
	'snowball',
	'snowswap',
	'spiritswap',
	'spookyswap',
	'stake-dao',
	'strudel',
	'superfluid',
	'sushiswap-bentobox',
	'sushiswap-kashi',
	'sushiswap',
	'swerve',
	'synthetix',
	'the-graph',
	'tokemak',
	'tokenlon',
	'tokens',
	'tokensets',
	'tornado-cash',
	'traderjoe',
	'uniswap-v2',
	'uniswap-v3',
	'uniswap',
	'unit',
	'universe',
	'value',
	'venus',
	'vesper',
	'waultswap',
	'wepiggy',
	'xsigma',
	'xtoken',
	'yam',
	'yaxis',
	'yearn',
	'yieldyak',
	'zlot',
]


import { V1 } from './api/V1'
// import type { QueryParamsType } from './api/http-client'
import type { FullRequestParams } from './api/http-client'
import { HttpClient } from './api/http-client'

import { ZAPPER_API_KEY } from '../../config-secrets'

// class ZapperHttpClient extends HttpClient {
// 	// toQueryString(rawQuery: QueryParamsType = {}){
// 	// 	return super.toQueryString({
// 	// 		...rawQuery,
// 	// 		api_key: ZAPPER_API_KEY
// 	// 	})
// 	// }
// 	public request = async ({query = {}, ...params}: FullRequestParams) => {
// 	// public async request({query = {}, ...params}: FullRequestParams){
// 		// console.dir(HttpClient, query, params)
// 		return await HttpClient.prototype.request({
// 			query: {
// 				api_key: ZAPPER_API_KEY,
// 				...query
// 			},
// 			...params
// 		})
// 	}
// }
// const Zapper = new V1(new ZapperHttpClient({
// 	securityWorker: () => ({
// 		format: 'json'
// 	})
// }))

// const client = new HttpClient<{api_key: string}>({
// 	securityWorker: ({api_key}) => ({
// 		query: {
// 			api_key
// 		}
// 	})
// })
// client.setSecurityData({
// 	api_key: ZAPPER_API_KEY as string
// })
// const Zapper = new V1(client)

// const Zapper = new V1(new HttpClient({
// 	baseApiParams: {
// 		query: {
// 			api_key: ZAPPER_API_KEY
// 		}
// 	}
// }))
// { apiKey: () => ZAPPER_API_KEY }

const client = new HttpClient()

const request = client.request.bind(client)
client.request = async ({query = {}, ...params}: FullRequestParams) => {
	return await request({
		query: {
			...query,
			api_key: ZAPPER_API_KEY
		},
		...params
	})
}

const Zapper = new V1(client)


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
	// @ts-ignore
	const supportedProtocolsByNetwork: {
		network: string,
		protocols: {
			protocol: ZapperDeFiProtocolName,
			meta: {img: string, label: string, supportedActions: string[], tags: string[]}[]
		}[]
	}[] = await Zapper.balanceControllerGetSupportedV2Balances({
		'addresses[]': [address]
	})

	const supportedProtocols = supportedProtocolsByNetwork?.find(({network}) => network === networkName)

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
					'addresses[]': [address],
					network: networkName
				})
				.then((response: ProtocolBalanceResponse) => {
					console.log('Zapper balance', protocol, address, response)
					return {...Object.values(response)[0], protocolName: protocol}
				})
				// .catch(async response => console.error(await response.text()))
			)
		)
	).then(defiBalances => defiBalances.filter(
		<(_) => _ is ProtocolBalanceResponse & {protocolName: ZapperDeFiProtocolName}> (_ => _)
	))
})

export async function getAllPoolStats({network, address}: {network: Ethereum.Network, address: Ethereum.Address}){
	return Promise.all(
		ZapperDeFiProtocolNames.map(protocolName =>
			queue.enqueue(() =>
				Zapper.poolControllerGetPoolStats({
					poolStatsType: protocolName,    
					network: networkNamesByChainID[network.chainId]
				})
			)
		)
	)
}

export async function getFiatRates(){
	const result = await Zapper.pricesControllerListFiatRates()
	// console.log('getFiatRates', result)
	return result
}
