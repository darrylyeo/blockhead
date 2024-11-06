// Types/constants
import type { Ethereum } from '$/data/networks/types'
import type { appTokenControllerGetAppTokens } from './v2'

export type ZapperSupportedNetwork = Parameters<typeof appTokenControllerGetAppTokens>[1]

export const networkNamesByChainId = new Map<
	Ethereum.ChainId,
	ZapperSupportedNetwork
>([
	[1, 'ethereum'],
	[137, 'polygon'],
	[10, 'optimism'],
	[100, 'gnosis'],
	[56, 'binance-smart-chain'],
	[250, 'fantom'],
	[43114, 'avalanche'],
	[42161, 'arbitrum'],
	[42220, 'celo'],
	[1666600000, 'harmony'],
	[1285, 'moonriver'],
	// : 'bitcoin',
	[25, 'cronos'],
	[1313161554, 'aurora'],
	[9001, 'evmos'],
	[8453, 'base'],
	[81457, 'blast'],
	// : 'solana',
	[666666666, 'degen'],
	[34443, 'mode'],
	[324, 'zksync'],
	[5000, 'mantle'],
	[534352, 'scroll'],
	[1284, 'moonbeam'],
	[59144, 'linea'],
	[7777777, 'zora'],
	[1088, 'metis'],
	[480, 'worldchain'],
	[360, 'shape'],
	[204, 'opbnb'],
	[33139, 'apechain'],
	[2818, 'morph'],
	[60808, 'bob'],
])

export const chainIdByNetworkName = new Map<
	ZapperSupportedNetwork,
	Ethereum.ChainId
>(
	Array.from(
		networkNamesByChainId.entries(),
		([chainId, networkName]) => [
			networkName,
			chainId
		]
	)
)

export type ZapperAppName = string

type Address = `0x${string}`
type Timestamp = `${number}-${number}-${number}T${number}:${number}:${number}.${number}Z`

type App = {
	id: string,
	databaseId: number,
	slug: string,
	name: string,
	description: string,
	url: string,
	imgUrl: string,
	tags: string[],
	categoryId: number | null,
	token: {
		address: string,
		network: string,
	} | null,
	twitterUrl: null | string,
	farcasterUrl: null,
	category: {
		id: number,
		name: 'DeFi' | 'DEX' | 'Bridge' | 'Utility' | 'Art' | 'Metaverse' | 'Gaming' | 'Perpetuals' | 'DePin' | 'Staking' | 'Memes' | 'AI' | 'NFT Marketplace' | 'NFT Fi' | 'Governance' | 'Social' | 'Wallet' | 'Gambling',
		slug: 'defi' | 'dex' | 'bridge' | 'utility' | 'art' | 'metaverse' | 'gaming' | 'perpetuals' | 'depin' | 'staking' | 'memes' | 'ai' | 'nft-marketplace' | 'nft-fi' | 'governance' | 'social' | 'wallet' | 'gambling',
		description: string,
		createdAt: Date,
		updatedAt: Date,
	} | null,
	supportedNetworks: Record<string, never>,
	groups: {
		type: 'contract-position' | 'token',
		id: string,
		label: string,
		isHiddenFromExplore: boolean,
	}[],
}


type Network = {
	id: number,
	slug: string,
	name: string,
	enabled: boolean,
	evmCompatible: boolean,
	vm: 'evm',
	holdingsComparisonJobEnabled: boolean,
	holdingsEnabled: boolean,
	hasLiveFeedEtl: boolean,
	nftBalancesEnabled: boolean,
	onchainPricesEnabled: boolean,
	activityFeedEnabled: boolean,
	thirdPartyBaseTokensEnabled: boolean,
	useHoldingsAsBalances: boolean,
	chainId: number,
	multicallContractAddress: Address,
	wrappedGasTokenAddress: Address,
	blockScannerBaseUrl: string,
	blocksPerDayEstimate: number,
	config: {
		web3Provider: string,
		coinGeckoPlatform: string,
	}[],
}

type NativeToken = {
	id: `${number}`,
	address: Address,
	name: string,
	symbol: string,
	decimals: number,
	coingeckoId: string,
	hide: boolean,
	canExchange: boolean,
	updatedAt: Timestamp,
	createdAt: Timestamp,
	price: number,
	networkId: number,
	status: 'approved',
	totalSupply: `${bigint}`,
	dailyVolume: number | null,
	verified: boolean,
	holdersEnabled: boolean,
	marketCap: number | null,
	priceUpdatedAt: Timestamp,
	externallyVerified: boolean,
	label: string | null,
	balance: number,
	balanceUSD: number,
	balanceRaw: `${bigint}`,
}

type Token = {
	id: `${string}:${number}`,
	networkId: number,
	blockNumber: number | null,
	blockHash: string | null,
	address: Address,
	symbol: string,
	name: string,
	decimals: number,
	totalSupply: `${bigint}`,
	updatedAt: Timestamp,
	createdAt: Timestamp,
	ignoreHoldingsForBalance: null,
	isSpam: null,
	spamReason: null,
	network: Network,
	coingeckoId: string | null,
	status: 'approved',
	hide: boolean,
	canExchange: boolean,
	verified: boolean,
	externallyVerified: boolean,
	priceUpdatedAt: string,
	dailyVolume: number | null,
	holdersEnabled: boolean,
	marketCap: number | null,
	daos: string[],
	historicData: {
		[key: string]: {
			[key: string]: number,
		},
	} | null,
	price: number,
	balance: number,
	balanceUSD: number,
	balanceRaw: `${bigint}`,
}

type AppBalance = {
	key: string,
	address: Ethereum.Address,
	appId: string,
	appName: string,
	appImage: string,
	network: ZapperSupportedNetwork,
	updatedAt: Date,
	balanceUSD: number,
	products: {
		label: string,
		assets: Asset[],
		meta: {
			label: string,
			value: number,
			type: ValueType,
		}[],
	}[],
}

export type Asset = {
	key: string,
	type: AssetType,
	appId: string,
	price?: number,
	supply?: number,
	symbol?: string,
	tokens: AssetToken[],
	address: Ethereum.Address,
	groupId: string,
	network: ZapperSupportedNetwork,
	decimals?: number,
	dataProps: {
		apy?: number,
		isDebt?: boolean,
		reserves?: number[],
		liquidity?: number,
		exchangeable?: boolean,
		incentivesControllerAddress?: Ethereum.Address,
		protocolDataProviderAddress?: Ethereum.Address,
		gaugeType?: string,
		isActive?: boolean,
		faucetAddresses?: Ethereum.Address[],
		fee?: number,
		weight?: number[],
	},
	displayProps: AssetDisplayProps,
	pricePerShare?: number[],
	balance?: number,
	balanceRaw?: string,
	balanceUSD: number,
}

type AssetDisplayProps = {
	label: string,
	images: string[],
	statsItems?: {
		label: LabelText,
		value: Value | string,
	}[],
	secondaryLabel?: Value | string,
	tertiaryLabel?: string,
}

type StatsItem = {
	label: LabelText,
	value: Value,
}

export type Value = {
	type: ValueType,
	value: number,
}

type ValueType = 'dollar' | 'pct' | 'number' | 'string'

type LabelText = 'Liquidity' | 'Share' | 'APY' | 'Supply' | 'Fee' | 'Ratio'

export type AssetToken = {
	type: TokenType,
	price: number,
	symbol: string,
	address: Address,
	network: ZapperSupportedNetwork,
	decimals: number,
	metaType?: MetaType,
	balance: number,
	balanceRaw: `${bigint}`,
	balanceUSD: number,
	appId?: string,
	supply?: number,
	tokens?: {
		key?: string,
		type: TokenType,
		appId?: string,
		price: number,
		supply?: number,
		symbol: string,
		tokens?: {
			type: TokenType,
			price: number,
			symbol: string,
			address: Address,
			network: ZapperSupportedNetwork,
			decimals: number,
			metaType?: MetaType,
			balance: number,
			balanceRaw: `${bigint}`,
			balanceUSD: number,
		}[],
		address: string,
		groupId?: string,
		network: ZapperSupportedNetwork,
		decimals: number,
		dataProps?: {
			apy: number,
			isDebt: boolean,
			reserves: number[],
			liquidity: number,
			exchangeable: boolean,
		},
		displayProps?: {
			label: string,
			images: string[],
			statsItems: StatsItem[],
			secondaryLabel: Value,
		},
		pricePerShare?: number[],
		balance: number,
		balanceRaw: `${bigint}`,
		balanceUSD: number,
		metaType?: MetaType,
	}[],
	groupId?: string,
	dataProps?: {
		apy: number,
		fee?: number,
		isDebt: boolean,
		weight?: number[],
		reserves: number[],
		liquidity: number,
		exchangeable?: boolean,
	},
	displayProps?: AssetDisplayProps,
	pricePerShare?: number[],
	key?: string,
}

type MetaType = 'supplied' | 'claimable'

type TokenType = 'base-token' | 'app-token'

type AssetType = 'app-token' | 'contract-position'


// API client
import * as publicEnv from '$env/static/public'

import { appControllerGetApps, defaults } from './v2'
defaults.fetch = (input: URL | RequestInfo, init?: RequestInit | undefined) => {
	const url = new URL(input)
	url.searchParams.set('api_key', publicEnv.PUBLIC_ZAPPER_API_KEY)

	return fetch(
		url,
		init,
	)
}


// Functions
import {
	tokenBalanceControllerGetTokenBalances,
	appBalanceControllerGetAppBalances,
} from './v2'

export const getTokenBalances = async ({
	network,
	address,
}: {
	network: Ethereum.Network,
	address: Ethereum.Address,
}) => {
	const networkName = networkNamesByChainId.get(network.chainId)

	if (!networkName)
		throw new Error(`Zapper doesn't yet support ${network.name}.`)

	const result = JSON.parse(
		await tokenBalanceControllerGetTokenBalances(
			[address],
			{
				networks: [
					networkName,
				],
			},
		)
	) as Record<Ethereum.Address, {
		key: `${bigint}`,
		address: Ethereum.Address,
		network: ZapperSupportedNetwork,
		updatedAt: `${number}-${number}-${number}T${number}:${number}:${number}.${number}Z`,
		token: NativeToken | Token,
	}[]>

	return Object.values(result)[0]
}

export const getTokenBalancesCount = async ({
	address,
	network,
}: {
	address: Ethereum.Address,
	network: Ethereum.Network,
}) => {
	const tokens = await getTokenBalances({
		address,
		network,
	})

	return tokens.length
}

export const getAppBalances = async ({
	address,
	network,
}: {
	address: Ethereum.Address,
	network?: Ethereum.Network,
}) => {
	let networkName
	
	if(network){
		networkName = networkNamesByChainId.get(network.chainId)

		if (!networkName)
			throw new Error(`Zapper doesn't yet support ${network.name}.`)
	}

	const response = await appBalanceControllerGetAppBalances(
		[address],
		networkName && {
			networks: [
				networkName
			],
		},
	) as string

	return JSON.parse(response) as AppBalance[]
}

export const getApps = async () => {
	const response = await appControllerGetApps()

	return JSON.parse(response) as App[]
}
