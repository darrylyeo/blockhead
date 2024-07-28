// Types/constants
import type { Ethereum } from '$/data/networks/types'
import type { QuoteCurrency } from '$/data/currencies'
import type { TokenWithBalance } from '$/data/tokens'
import type { AppWithDefiPositions, DefiPosition, MetadataItem } from '$/data/defiPositions'
import { web3AppsByProviderName } from '$/data/web3Apps'
import type { Asset, AssetToken, getAppBalances, getTokenBalances, Value } from '.'


// Functions
import { formatIdentifierToWords } from '$/utils/formatIdentifierToWords'

export const normalizeTokenBalance = (
	tokenBalance: Awaited<ReturnType<typeof getTokenBalances>>[number],
	quoteCurrency: QuoteCurrency,
	chainId: Ethereum.ChainID,
): TokenWithBalance => ({
	token: {
		chainId,
		address: tokenBalance.token.address,
		decimals: tokenBalance.token.decimals,
		name: tokenBalance.token.name,
		symbol: tokenBalance.token.symbol,
		icon: `https://storage.googleapis.com/zapper-fi-assets/tokens/${tokenBalance.network}/${tokenBalance.token.address.toLowerCase()}.png`
	},

	balance: BigInt(tokenBalance.token.balanceRaw),

	conversion: {
		currency: quoteCurrency,
		value: tokenBalance.token.balanceUSD,
		rate: tokenBalance.token.price,
	},
})

export const normalizeMetadataItem = (
	item: {
		label: string,
		value: Value | string | number,
	},
): MetadataItem => ({
	label: item.label,
	...(
		typeof item.value === 'string' || typeof item.value === 'number' ? {
			type: 'other',
			value: item.value,
		} : item.value.type === 'string' ? {
			type: 'other',
			value: item.value.value,
		} : item.value.type === 'dollar' ? {
			type: 'currency',
			currency: 'USD',
			value: Number(item.value.value),
		} : item.value.type === 'pct' ? {
			type: 'number',
			format: 'percent',
			value: Number(item.value.value),
		} : {
			type: 'other',
			value: item.value.value,
		}
	),
})

export const normalizeAppBalanceAssetMetadata = (
	asset: Asset | AssetToken,
): MetadataItem[] => ([
	...(asset.displayProps?.statsItems ?? [])
		.map(normalizeMetadataItem),

	...Object.entries({
		...asset.dataProps,
		...asset.type === 'app-token' && {
			supply: asset.supply,
		},
	})
		.map(([key, value]) => ({
			label: formatIdentifierToWords(key, true),
			type: 'other',
			value: value,
		} as MetadataItem))
		.filter(({ label }) => (
			!(asset.displayProps?.statsItems ?? [])
				.some(item => (
					formatIdentifierToWords(item.label, true) === label
				))
		)),
])

export const normalizeAppBalance = (
	balance: Awaited<ReturnType<typeof getAppBalances>>[number],
): AppWithDefiPositions => ({
	app: web3AppsByProviderName.zapper[balance.appId],

	id: balance.appId,
	name: balance.appName,
	icon: balance.appImage,

	views: balance.products.map(product => ({
		id: product.label,
		name: product.label,

		source: {
			name: balance.appName,
			contractAddress: balance.address,
		},

		// summary: {
		// 	assets: {
		// 		currency: 'USD' as QuoteCurrency,
		// 		value: balance.balanceUSD,
		// 	},
		// },
		summary: {
			assets: {
				currency: 'USD' as QuoteCurrency,
				value: (
					product.assets
						.filter(asset => (
							!(asset.dataProps?.isDebt || asset.balanceUSD < 0))
						))
						.reduce((sum, asset) => sum + asset.balanceUSD, 0),
			},
			debt: {
				currency: 'USD',
				value: (
					product.assets
						.filter(asset => (
							asset.dataProps?.isDebt || asset.balanceUSD < 0
						))
						.reduce((sum, asset) => sum + asset.balanceUSD, 0)
				),
			},
		},

		positions: product.assets?.map((asset): DefiPosition => ({
			id: asset.key,
			name: asset.displayProps?.label,
			type: asset.type as 'app-token' | 'contract-position',
			tags: [asset.groupId],
			images: asset.displayProps?.images,

			tokenWithBalance: {
				token: {
					network: asset.network,
					symbol: asset.symbol,
					address: asset.address,
					name: asset.displayProps.label,
					decimals: asset.decimals,
					icon: asset.displayProps?.images?.[0],
				},

				balance: asset.balanceRaw !== undefined ? BigInt(asset.balanceRaw) : undefined,

				conversion: {
					currency: 'USD',
					value: asset.balanceUSD,
					rate: asset.price,
					// rate: asset.pricePerShare?.[0]
				},
			},
			isDebt: asset.dataProps?.isDebt || asset.balanceUSD < 0,
			metadata: normalizeAppBalanceAssetMetadata(asset),

			subpositions: asset.tokens?.map(token => ({
				tokenWithBalance: {
					token: {
						symbol: token.symbol,
						address: token.address,
						name: token.displayProps?.label ?? '',
						decimals: token.decimals,
						icon: token.displayProps?.images?.[0],
					},

					balance: token.balanceRaw !== undefined ? BigInt(token.balanceRaw) : undefined,

					conversion: {
						currency: 'USD' as QuoteCurrency,
						value: token.balanceUSD,
						rate: token.price,
						// rate: token.pricePerShare?.[0]
					},
				},
				isDebt: token.dataProps?.isDebt || token.balanceUSD < 0,
				metadata: normalizeAppBalanceAssetMetadata(token),
			})),
		})),

		metadata: product.meta
			?.filter(item => !['Total', 'Assets', 'Debt'].includes(item.label))
			.map(normalizeMetadataItem),
	})),
})
