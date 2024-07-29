// Types
import type { Ethereum } from '$/data/networks/types'
import type { AppWithDefiPositions, DefiPosition, MetadataItem } from '$/data/defiPositions'
import type { TokenWithBalance } from '$/data/tokens'
import type { Asset, ZapperAppId, ZapperAppBalance, ZapperAppConfig, getTokenBalances } from './index'


// Constants
import { web3AppsByProviderName } from '$/data/web3Apps'


// Functions
import { formatIdentifierToWords } from '$/utils/formatIdentifierToWords'

export const normalizeDefiPositionMetadata = (asset: Asset): MetadataItem[] => ([
	...(asset.displayProps?.statsItems ?? [])
		.map((item): MetadataItem => ({
			label: item.label,
			...(typeof item.value === 'string' ? {
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
			}),
		})),

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
		}))
		.filter(({ label }) => (
			!(asset.displayProps?.statsItems ?? [])
				.some(item => formatIdentifierToWords(item.label, true) === label)
		)),
])

export const normalizeDefiPositions = (
	defiBalances: Map<ZapperAppId, ZapperAppBalance>,
	allZapperAppConfigs: Partial<Record<ZapperAppId, ZapperAppConfig>>
): AppWithDefiPositions[] => (
	[...defiBalances.entries()]
		.filter(([appId, balance]) => balance.products?.length)
		.map(([appId, balance]): AppWithDefiPositions => {
			const app = web3AppsByProviderName.zapper?.[appId];
			const erc20Token = app?.views?.flatMap(view => view.erc20Tokens ?? [])[0];
			const zapperAppConfig = allZapperAppConfigs?.[appId];

			const assetsMeta = balance.meta?.find(item => item.label === 'Assets');
			const debtMeta = balance.meta?.find(item => item.label === 'Debt');

			return {
				app,

				id: appId,
				icon: erc20Token?.icon,
				// V1
				// images: [
				// 	...new Set(product.assets?.map(asset => asset.appImgUrl))
				// ],
				colors: zapperAppConfig?.primaryColor ? [zapperAppConfig.primaryColor] : undefined,

				summary: {
					...assetsMeta?.value !== undefined && {
						assets: {
							currency: 'USD',
							value: assetsMeta.value,
						},
					},
					...debtMeta?.value !== undefined && {
						debt: debtMeta && {
							currency: 'USD',
							value: debtMeta.value,
						},
					},
				},

				views: balance.products!.map((product) => ({
					id: product.label,
					name: product.label,

					summary: {
						assets: {
							currency: 'USD',
							value: product.assets!
								.map(asset => asset.balanceUSD)
								.reduce((sum, value) => sum + value, 0),
						},
						// debt: debtMeta && {
						// 	currency: 'USD',
						// 	value: debtMeta.value,
						// },
					},

					// V2
					positions: product.assets?.map((asset): DefiPosition => ({
						id: [
							asset.key,
							asset.appId,
							asset.groupId,
							asset.address, // asset.type === 'app-token' ? asset.address : asset.type === 'contract-position' ? asset.address : undefined,
						].join('/'),
						// id: asset.key,
						name: asset.displayProps?.label,
						type: asset.type as 'app-token' | 'contract-position',
						tags: [asset.groupId],
						images: asset.displayProps?.images,

						tokenWithBalance: {
							token: {
								network: asset.network,
								symbol: asset.symbol,
								address: asset.address as Ethereum.ContractAddress,
								name: asset.displayProps.label,
								decimals: asset.decimals,
								icon: asset.displayProps?.images?.[0],
							},

							balance: asset.balanceRaw !== undefined ? BigInt(asset.balanceRaw) : undefined,

							conversion: {
								currency: 'USD',
								value: asset.balanceUSD,
								rate: asset.price, // asset.pricePerShare[0]
							},
						},

						// metadata: normalizeDefiPositionMetadata(asset),
						subpositions: asset.tokens?.map(token => ({
							tokenWithBalance: {
								token: {
									symbol: token.symbol,
									address: token.address as Ethereum.ContractAddress,
									name: token.name,
									decimals: token.decimals,
									icon: token.displayProps?.images?.[0],
								},

								balance: token.balanceRaw !== undefined ? BigInt(token.balanceRaw) : undefined,

								conversion: {
									currency: 'USD',
									value: token.balanceUSD,
									rate: token.price, // asset.pricePerShare
								},
							},

							metadata: normalizeDefiPositionMetadata(token),
						})),
					})),

					// V1
					/*
					subpositions: product.assets?.map(asset => ({
						app: {
							slug: asset.protocol,
						},
	
						id: asset.protocolSymbol,
						name: asset.protocol,
						tags: [asset.category, asset.label],
						images: [assets.protocolImg],
	
						summary: {
							assets: {
								currency: 'USD',
								value: asset.balanceUSD,
							},
						},
					    
						positions: [
							{
								tokenWithBalance: {
									token: {
										symbol: asset.symbol,
										address: asset.tokenAddress as Ethereum.ContractAddress, // asset.address
										decimals: asset.decimals,
										name: asset.label,
										icon: asset.tokenImageUrl, // asset.img,
									},
									balance: BigInt(asset.balanceRaw),
									conversion: {
										currency: 'USD',
										value: asset.balanceUSD,
										rate: asset.price,
									},
								},
	
								metadata: {
									weight: asset.weight,
	
									// vault
									apy: asset.apy,
	
									// pool
									reserve: asset.reserve,
									share: asset.share,
									supply: asset.supply,
								},
	
								assets: asset.tokens.map(token => ({
									token: {
										symbol: asset.symbol,
										address: asset.tokenAddress as Ethereum.ContractAddress, // asset.address
										decimals: asset.decimals,
										name: asset.label,
										icon: asset.tokenImageUrl, // asset.img,
									},
									balance: BigInt(asset.balanceRaw),
									conversion: {
										currency: 'USD',
										value: asset.balanceUSD,
										rate: asset.price,
									},
								})),
							}
						],
					})),
					*/
					metadata: product.meta
						?.filter(item => !['Total', 'Assets', 'Debt'].includes(item.label))
						.map(item => ({
							label: item.label,
							...(item.type === 'dollar' ? {
								type: 'currency',
								currency: 'USD',
								value: Number(item.value),
							} : item.type === 'pct' ? {
								type: 'number',
								format: 'percent',
								value: Number(item.value),
							} : {
								type: 'other',
								value: item.value,
							}),
						})),
				})),
			};
		})
)

export const normalizeTokenBalance = (
	asset: NonNullable<NonNullable<Awaited<ReturnType<typeof getTokenBalances>>['products']>[number]['assets']>[number],
	chainId: Ethereum.ChainId,
): TokenWithBalance => ({
	token: {
		chainId,
		address: asset.address as Ethereum.ContractAddress,
		name: asset.displayProps.label,
		symbol: asset.symbol,
		decimals: asset.decimals,
		icon: asset.displayProps.images?.[0],
	},
	balance: asset.balanceRaw ? BigInt(asset.balanceRaw) : undefined,
	conversion: {
		currency: 'USD',
		value: asset.balanceUSD,
		rate: asset.price,
	},
})
