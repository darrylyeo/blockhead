// Types/constants
import type { Ethereum } from '$/data/networks/types'

export const supportedChains = {
	'arbitrum': 42161,
	'arbitrum-nova': 42170,
	'avalanche': 43114,
	'base': 8453,
	'bnb-chain': 56,
	'celo': 42220,
	'ethereum': 1,
	'fantom': 250,
	'gnosis': 100,
	'linea': 59144,
	'moonbeam': 1284,
	'opbnb': 204,
	'optimism': 10,
	'polygon': 137,
	'polygon-zkevm': 1101,
	'zksync-era': 324,
} satisfies Record<string, Ethereum.ChainID>

export type ChainName = keyof typeof supportedChains

export type LlamafolioAppName = Exclude<string, 'wallet'>

export type Protocol = (
	| {
		id: 'wallet',
		chain: string,
		balanceUSD: number,
		debtUSD: 0,
		rewardUSD: 0,
		groups: {
			balanceUSD: number,
			balances: Balance[],
		}[]
	}
	| {
		id: LlamafolioAppName,
		chain: string,
		balanceUSD: number,
		debtUSD: number,
		rewardUSD: number,
		groups: {
			fromAddress: Ethereum.Address,
			balanceUSD: number,
			debtUSD: number,
			rewardUSD: number,
			balances: DefiBalance[],
		}[],
		isDeprecated: true,
	}
)

type Balance = (
	& (
		| {}
		| {
			name: string,
		}
	)
	& {
		address: Ethereum.Address,
		symbol: string,
		decimals: number,
	}
	& (
		| {}
		| {
			stable: boolean,
		}
	)
	& {
		amount: number | `${bigint}`,
	}
	& (
		| {}
		| {
			price: number,
			balanceUSD: number,
		}
	)
)

type DefiBalance = (
	& Balance
	& (
		| {}
		| {
			category: 'farm',
			underlyings: Balance[],
		}
		| {
			category: 'lend',
			collateralUSD: number,
			underlyings: Balance[],
		}
		| {
			category: 'lp',
			underlyings: Balance[],
		}
		| {
			category: 'stake',
			underlyings: Balance[],
		}
	)
)


// Functions
import { getBalancesByAddress as _getBalancesByAddress } from './api'

export const getBalancesByAddress = async ({
	address,
}: {
	address: Ethereum.Address,
}) => (
	await _getBalancesByAddress(
		address
	)
		.then(result => JSON.parse(result))
) as {
	status: string,
	updatedAt: number,
	nextUpdateAt: number,
	protocols: Protocol[],
}
