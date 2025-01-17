// Types
import type { Ethereum } from '$/data/networks/types'

import type { QuoteCurrency } from '$/data/currencies'
import type { DefiPosition, AppWithDefiPositions } from '$/dataPositions'
import type { TokenWithBalance } from '$/data/tokens'
import { web3AppsByProviderName } from '$/data/web3Apps'

import type { FragmentOf } from 'gql.tada'

import type { WalletTokenBalanceToken, TokenBalance, AppBalance } from '.'


// Functions
import { getChainId } from '.'

export const normalizeToken = (
	token: FragmentOf<typeof WalletTokenBalanceToken>,
): Ethereum.Erc20Token => ({
	chainId: getChainId(token.network),
	address: token.address as Ethereum.ContractAddress,

	name: token.name,
	symbol: token.symbol,
	decimals: token.decimals,
	icon: token.imgUrl,
})

export const normalizeTokenBalance = (
	tokenBalance: FragmentOf<typeof TokenBalance>,
	quoteCurrency: QuoteCurrency
): TokenWithBalance => ({
	token: normalizeToken(tokenBalance.token.baseToken),

	balance: BigInt(Math.trunc(tokenBalance.token.balance * 10 ** tokenBalance.token.baseToken.decimals)),

	conversion: {
		currency: quoteCurrency,
		value: tokenBalance.token.balanceUSD,
		rate: tokenBalance.token.baseToken.onchainMarketData?.price ?? null,
	},
})

export const normalizeAppBalance = (
	balance: FragmentOf<typeof AppBalance>
): AppWithDefiPositions => ({
	app: web3AppsByProviderName.zapper[balance.appId],
	id: balance.appId,
	name: balance.appName,
	views: balance.products.map(normalizeProduct),
})

export const normalizeProduct = (
	product: FragmentOf<typeof AppBalance>['products'][number]
): AppWithDefiPositions['views'][number] => ({
	id: product.label,
	name: product.label,
	summary: {
		assets: {
			currency: 'USD',
			value: product.assets
				.filter(asset => 'balanceUSD' in asset && asset.balanceUSD >= 0)
				.reduce((sum, asset) => sum + ('balanceUSD' in asset ? asset.balanceUSD : 0), 0)
		},
		debt: {
			currency: 'USD',
			value: product.assets
				.filter(asset => 'balanceUSD' in asset && asset.balanceUSD < 0)
				.reduce((sum, asset) => sum + ('balanceUSD' in asset ? asset.balanceUSD : 0), 0)
		},
	},
	positions: product.assets
		.map(asset => ({
			id: asset.address,
			name: asset.symbol,
			type: asset.type as 'app-token' | 'contract-position',
			tokenWithBalance: normalizeAsset(asset),
			isDebt: asset.balanceUSD < 0,
		}))
})

export const normalizeAsset = (
	asset: FragmentOf<typeof AppBalance>['products'][number]['assets'][number] & {
		balance: string
		balanceUSD: number
		price: number
		symbol: string
		decimals: number
	}
): DefiPosition['tokenWithBalance'] => ({
	token: {
		chainId: getChainId(asset.network),
		address: asset.address as Ethereum.ContractAddress,
		symbol: asset.symbol,
		decimals: asset.decimals,
		name: asset.symbol,
	},
	balance: asset.balance !== undefined && BigInt(Number(asset.balance) * 10 ** asset.decimals),
	conversion: {
		currency: 'USD',
		value: asset.balanceUSD,
		rate: asset.price,
	},
})
