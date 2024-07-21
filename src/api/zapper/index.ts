// Types/constants
import type { Ethereum } from '$/data/networks/types'
import type { appTokenControllerGetAppTokens } from './v2'

export type ZapperSupportedNetwork = Parameters<typeof appTokenControllerGetAppTokens>[1]

export const networkNamesByChainId: Record<Ethereum.ChainID, ZapperSupportedNetwork> = {
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
	// : 'bitcoin',
	25: 'cronos',
	1313161554: 'aurora',
	9001: 'evmos',
	8453: 'base',
}

type ZapperSupportedApp = string

type Address = `0x${string}`
type Timestamp = `${number}-${number}-${number}T${number}:${number}:${number}.${number}Z`

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


// API client
import * as publicEnv from '$env/static/public'

import { defaults } from './v2'
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
} from './v2'

export const getTokenBalances = async ({
	network,
	address,
}: {
	network: Ethereum.Network,
	address: Ethereum.Address,
}) => {
	const networkName = networkNamesByChainId[network.chainId]

	if (!networkName)
		throw new Error(`Zapper doesn't yet support ${network.name}.`)

	const result = JSON.parse(
		await tokenBalanceControllerGetTokenBalances(
			[address],
			{
				networks: [
					networkNamesByChainId[network.chainId],
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
