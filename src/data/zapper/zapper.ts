import type {
	BalanceControllerGetAppBalancesParams,
} from './api/data-contracts'

import type { Ethereum } from '../ethereum/types'


// Networks

export type ZapperSupportedNetwork =
	| BalanceControllerGetAppBalancesParams['network']

const networkNamesByChainID: Record<Ethereum.ChainID, ZapperSupportedNetwork> = {
	1: 'ethereum',
	137: 'polygon',
	10: 'optimism',
	100: 'gnosis',
	56: 'binance-smart-chain',
	250: 'fantom',
	43114: 'avalanche',
	42161: 'arbitrum',
	42220: 'celo',
	1666600000: 'harmony',
	1285: 'moonriver',
	// : 'cronos',
	1313161554: 'aurora',
	// : 'evmos',
}


// App names

const allZapperAppIds = [
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
] as const

export type ZapperAppId = typeof allZapperAppIds[number]


// App config

export type ZapperAppConfig = {
	id: ZapperAppId;
	tags?: string[];
	keywords?: string[];
	name: string;
	url: string;
	links?: Links;
	description: string;
	groups?: Group[];
	supportedNetworks?: {
		network: ZapperSupportedNetwork;
		actions?: (string)[];
	}[];
	primaryColor?: string;
	token?: Token | null;
	compatibleAddressFormats: Partial<Record<ZapperSupportedNetwork, 'evm' | string>>;
	presentationConfig?: PresentationConfig;
}
type Links = Partial<Record<
	| 'github'
	| 'twitter'
	| 'discord'
	| 'telegram'
	| 'medium'
	| 'learn',
	string
>>
type Group = {
	type?: string;
	id: string;
	label: string;
	isHiddenFromExplore?: boolean;
	groupLabel?: string;
	isHiddenFromExplorer?: boolean;
	groupLabels?: string;
}
type Token = {
	address: string;
	network: string;
}
type PresentationConfig = {
	tabs?: Tabs[];
}
type Tabs = {
	label: string;
	viewType: string;
	views?: View[];
	groupIds?: (string)[];
	options?: (Option)[];
}
type View = {
	viewType: string;
	label: string;
	groupIds?: string[];
	views?: Subview[];
}
type Subview = {
	viewType: string;
	label: string;
	groupIds?: string[];
}
type Option = {
	label: string;
	viewType: string;
	views?: Subview[];
}


// Supported apps

export type ZapperSupportedApp = {
	appId: ZapperAppId
	meta: {
		label: string
		img: string
		supportedActions: string[] // 'view'
		tags: string[]
	}[]
}


// App balances

export type ZapperAppBalanceResponse = {
	balances: Record<Ethereum.Address, ZapperAppBalance>;
}
export type ZapperAppBalance = {
	products?: Products[];
	meta?: AppMeta[];
}
type Products = {
	label: string;
	assets?: Asset[];
	meta?: ProductMeta[];
}
type Asset = {
	address: string;
	type: string;
	appId: string;
	groupId: string;
	network: string;
	tokens?: TokenBreakdown[];
	balanceUSD: number;
	dataProps: DataProps;
	displayProps: DisplayProps;
	key?: string;
	symbol?: string;
	decimals?: number;
	supply?: number;
	price?: number;
	pricePerShare?: number | number[];
	balance?: number;
	balanceRaw?: string;
}
type TokenBreakdown = {
	metaType?: string;
	id?: string;
	networkId?: number;
	address: string;
	name?: string;
	symbol: string;
	decimals: number;
	coingeckoId?: string;
	status?: string;
	hide?: boolean;
	canExchange?: boolean;
	verified?: boolean;
	updatedAt?: string;
	createdAt?: string;
	price: number;
	dailyVolume?: number;
	totalSupply?: string;
	networkEnumValue?: string;
	type: string;
	network: string;
	balance: number;
	balanceRaw: string;
	balanceUSD: number;
	appId?: string;
	groupId?: string;
	supply?: number;
	pricePerShare?: number[] | number;
	tokens?: TokenBreakdown1[];
	dataProps?: DataProps1;
	displayProps?: DisplayProps1;
	apt_address?: null;
	apt_networkId?: null;
	key?: string;
}
type TokenBreakdown1 = {
	id?: string;
	networkId?: number;
	address: string;
	name?: string;
	symbol: string;
	decimals: number;
	coingeckoId?: string;
	status?: string;
	hide?: boolean;
	canExchange?: boolean;
	verified?: boolean;
	updatedAt?: string;
	createdAt?: string;
	price: number;
	dailyVolume?: number;
	totalSupply?: string;
	networkEnumValue?: string;
	type: string;
	network: string;
	balance: number;
	balanceRaw: string;
	balanceUSD: number;
	key?: string;
	appId?: string;
	supply?: number;
	tokens?: TokenBreakdown2[];
	groupId?: string;
	dataProps?: DataProps2;
	displayProps?: DisplayProps2;
	pricePerShare?: number[];
	apt_address?: null;
	apt_networkId?: null;
}
type TokenBreakdown2 = {
	id: string;
	address: string;
	name: string;
	symbol: string;
	decimals: number;
	coingeckoId: string;
	hide: boolean;
	canExchange: boolean;
	updatedAt: string;
	createdAt: string;
	price: number;
	networkId: number;
	status: string;
	totalSupply: string;
	dailyVolume: number;
	verified: boolean;
	apt_address?: null;
	apt_networkId?: null;
	networkEnumValue: string;
	type: string;
	network: string;
	balance: number;
	balanceRaw: string;
	balanceUSD: number;
}
type DataProps2 = {
	reserve: number;
	liquidity: number;
}
type DisplayProps2 = {
	label: string;
	secondaryLabel: SecondaryLabelOrValue;
	images?: string[];
	statsItems?: StatsItems[];
}
type SecondaryLabelOrValue = {
	type: string;
	value: number;
}
type StatsItems = {
	label: string;
	value: SecondaryLabelOrValue;
}
type DataProps1 = {
	fee?: number;
	poolId?: string;
	volume?: number;
	weights?: number[];
	reserves?: number[];
	liquidity?: number;
	volumeChangePercentage?: number;
	isBlocked?: boolean;
	reserve?: number;
	exchangeable?: boolean;
	poolType?: string;
	swapAddress?: string;
	gaugeAddresses?: string[];
	apy?: number;
}
type DisplayProps1 = {
	label: string;
	images?: string[];
	statsItems?: StatsItems1[];
	secondaryLabel?: string | SecondaryLabelOrValue;
}
type StatsItems1 = {
	label: string;
	value: SecondaryLabelOrValue | string | SecondaryLabelOrValue | string | SecondaryLabelOrValue | string | SecondaryLabelOrValue | string;
}
type DataProps = {
	poolIndex?: number;
	liquidity?: number;
	isActive?: boolean;
	dailyROI?: number;
	weeklyROI?: number;
	yearlyROI?: number;
	fee?: number;
	volume?: number;
	volumeChangePercentage?: number;
	isBlocked?: boolean;
	reserves?: number[];
	weight?: number[];
	apy?: number;
	reserve?: number;
	faucetAddresses?: string[];
	exchangeable?: boolean;
	lensAddress?: string;
	implementation?: string;
	supplyApy?: number;
	borrowApy?: number;
	comptrollerAddress?: string;
	supply?: number;
	borrow?: number;
	incentivesControllerAddress?: string;
	protocolDataProviderAddress?: string;
	poolType?: string;
	swapAddress?: string;
	gaugeAddresses?: string[];
	feeTier?: number;
	rangeStart?: number;
	rangeEnd?: number;
	poolAddress?: string;
	assetStandard?: string;
	cRatio?: number;
	liquidationThreshold?: number;
	enabledAsCollateral?: boolean;
	deposited?: number;
	remaining?: number;
}
type DisplayProps = {
	label: string;
	secondaryLabel?: SecondaryLabelOrValue1 | string | string | SecondaryLabelOrValue;
	images?: string[];
	statsItems?: StatsItems2[];
	tertiaryLabel?: string;
	labelDetailed?: string;
	balanceDisplayMode?: string;
}
type SecondaryLabelOrValue1 = {
	type: string;
	value: number;
}
type StatsItems2 = {
	label: string;
	value: SecondaryLabelOrValue | string | SecondaryLabelOrValue | string | SecondaryLabelOrValue | string | SecondaryLabelOrValue | string | SecondaryLabelOrValue | string | SecondaryLabelOrValue | string | SecondaryLabelOrValue | string;
}
type ProductMeta = {
	label: string;
	value: number;
	type: string;
}
type AppMeta = {
	label: string;
	value: number;
	type: string;
}


// Swagger API Client

import { V2 } from './api/V2'
// import type { QueryParamsType } from './api/http-client'
import type { FullRequestParams } from './api/http-client'
import { HttpClient } from './api/http-client'

import { env } from '../../env'

// class ZapperHttpClient extends HttpClient {
// 	// toQueryString(rawQuery: QueryParamsType = {}){
// 	// 	return super.toQueryString({
// 	// 		...rawQuery,
// 	// 		api_key: env.ZAPPER_API_KEY
// 	// 	})
// 	// }
// 	public request = async ({query = {}, ...params}: FullRequestParams) => {
// 	// public async request({query = {}, ...params}: FullRequestParams){
// 		// console.dir(HttpClient, query, params)
// 		return await HttpClient.prototype.request({
// 			query: {
// 				api_key: env.ZAPPER_API_KEY,
// 				...query
// 			},
// 			...params
// 		})
// 	}
// }
// const Zapper = new V2(new ZapperHttpClient({
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
// 	api_key: env.ZAPPER_API_KEY as string
// })
// const Zapper = new V2(client)

// const Zapper = new V2(new HttpClient({
// 	baseApiParams: {
// 		query: {
// 			api_key: env.ZAPPER_API_KEY
// 		}
// 	}
// }))
// { apiKey: () => env.ZAPPER_API_KEY }

const client = new HttpClient()

const request = client.request.bind(client)
client.request = async ({ query = {}, ...params }: FullRequestParams) => {
	return await request({
		...params,
		query: {
			...query,
			api_key: env.ZAPPER_API_KEY
		},
		format: 'json',
	})
}

export const Zapper = new V2(client)

// export const Zapper = new V2(new HttpClient({
// 	baseApiParams: {
// 		headers: {
// 			'Authorization': env.ZAPPER_API_KEY
// 		}
// 	}
// }))


// Utils

import { ConcurrentPromiseQueue } from '../../utils/concurrent-promise-queue'

const queue = new ConcurrentPromiseQueue(3)

function PromiseAllFulfilled<T>(promises: Promise<T>[]) {
	return Promise.allSettled<T>(promises).then(results =>
		Object.values(results)
			.filter(({ status }) => status === 'fulfilled')
			.map(({ value }) => value as T)
	)
}

import { readable } from 'svelte/store'
import type { Result } from 'svelte-apollo'


import { memoizedAsync } from '../../utils/memoized'


// Methods

export const getAllApps = memoizedAsync(async () =>
	(await Zapper.appsControllerGetApps({ format: 'json' })) as ZapperAppConfig[]
)

const getAppsForAddress = memoizedAsync(async (
	address: Ethereum.Address
) =>
	await Zapper.balanceControllerGetSupportedBalances({
		'addresses[]': [address]
	}) as {
		network: ZapperSupportedNetwork
		apps: ZapperSupportedApp[]
	}[] | undefined
)

const getAppsForAddressAndNetwork = memoizedAsync(async ({
	address,
	networkName
}: {
	address: Ethereum.Address,
	networkName: ZapperSupportedNetwork
}) => {
	const apps = (await getAppsForAddress(address))
		?.find(({ network }) => network === networkName)
		?.apps

	// if(!apps)
	// 	throw new Error(`Zapper didn't find any ${networkName} DeFi balances for the address ${address}.`)

	return apps
})

const getAppsForNetwork = memoizedAsync(async (
	networkName: ZapperSupportedNetwork
) =>
	(await getAllApps())
		.filter(({ supportedNetworks }) => supportedNetworks.some(({ network }) => network === networkName)),
)

const filterAndSortApps = (
	appIds: ZapperAppId[]
): ZapperAppId[] => [
		...appIds.filter(protocol => !['tokens', 'nft', 'other'].includes(protocol)),
		...appIds.filter(protocol => ['other'].includes(protocol))
	]

const allResponses = []

export const getDefiBalancesForApp = memoizedAsync(async ({
	appId,
	networkName,
	address,
}: {
	appId: ZapperAppId,
	networkName: ZapperSupportedNetwork,
	address: Ethereum.Address,
}): Promise<{ appId: ZapperAppId } & ZapperAppBalance> => {
	const response = await Zapper.balanceControllerGetAppBalances({
		appId,
		'addresses[]': [address],
		network: networkName
	}) as ZapperAppBalanceResponse

	console.log('Zapper balance', appId, address, response)

	allResponses.push(response)
	console.log('allResponses', allResponses)

	return {
		appId,
		...(response.balances[address.toLowerCase()])
	}
	// .catch(async response => console.error(await response.text()))
})


export const getDefiBalancesForApps = memoizedAsync(async ({
	appIds,
	network,
	address,
	asStore = false
}: {
	appIds?: ZapperAppId[],
	network: Ethereum.Network,
	address: Ethereum.Address,
	asStore?: boolean
}) => {
	const networkName = networkNamesByChainID[network.chainId]

	if (!networkName)
		throw new Error(`Zapper doesn't yet support ${network.name}.`)

	console.log('appIds', appIds)

	const apps = await getAppsForAddressAndNetwork({
		address,
		networkName
	})

	console.log('apps', apps)

	const _appIds = filterAndSortApps(
		appIds
		?? apps?.map(({ appId }) => appId)
		?? (await getAppsForNetwork(networkName)).map(({ id }) => id)
	)

	const promises = _appIds.map(appId =>
		queue.enqueue(async () =>
			getDefiBalancesForApp({
				appId,
				networkName,
				address
			})
		)
	)

	return asStore
		? readable<Result<{ appId: ZapperAppId } & ZapperAppBalance>[]>({ loading: true }, set => {
			let results = []

			for (const promise of promises)
				promise.then(result => set({
					loading: true,
					data:
						results = [...results, result]
				}))

			PromiseAllFulfilled(promises).then(() => set({
				loading: false,
				data: results
			}))
		})
		: await PromiseAllFulfilled(promises)
	// .then(defiBalances => defiBalances.filter(
	// 	<(_) => _ is ProtocolBalanceResponse & {protocolName: ZapperAppId}> (_ => _)
	// ))
})

export async function getTokenBalances({
	network,
	address
}: {
	network: Ethereum.Network,
	address: Ethereum.Address
}) {
	// const result = await Zapper.balanceControllerGetBalances({
	// 	'networks[]': [networkNamesByChainID[network.chainId]],
	// 	'addresses[]': [address]
	// }) ?? []
	const result = await getDefiBalancesForApp({
		appId: 'tokens',
		networkName: networkNamesByChainID[network.chainId],
		address,
	})

	console.log('getTokenBalances', result)

	return result
}
