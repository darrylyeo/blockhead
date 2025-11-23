import type { EvmActor } from "../schema/EvmActor.ts"
import type { Balance } from "../schema/Balance.ts"
import type { Nft } from "../schema/Nft.ts"
import type { EvmContractPosition } from "../schema/EvmContractPosition.ts"
import type { Coin, NativeCurrency, Erc20Token } from "../schema/Coin.ts"
import type { EvmNetwork } from "../schema/EvmNetwork.ts"
import { CoinType } from "../schema/Coin.ts"
import { EntityType } from "../schema/_Entity.ts"
import { EvmActorType } from "../schema/EvmActor.ts"

import { query } from "$app/server"

export const getPortfolioValue = query(
	'unchecked',
	async ({
		actor,
	}: {
		actor: EvmActor['$id']
	}) => {
		const { getPortfolioValue } = await import("../api/1inch/api.ts")

		const chainId = 'chainId' in actor.$network ? actor.$network.chainId : 1
		const result = await getPortfolioValue({
			chainId,
			address: actor.address
		})

		return result.result
			.filter((item) => item.amount != null)
			.map((item) => {
				const isNative = item.contract_address === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
				
				if (isNative) {
					const coinId = {
						$network: actor.$network
					}

					return {
						$type: EntityType.Balance,
						$id: { $actor: actor, $coin: coinId },
						$fields: {
							balance: BigInt(item.amount ?? '0')
						}
					} satisfies Balance
				} else {
					 const coinId = {
						$network: actor.$network,
						address: item.contract_address as `0x${string}`
					 }

					 return {
						$type: EntityType.Balance,
						$id: { $actor: actor, $coin: coinId },
						$fields: {
							balance: BigInt(item.amount ?? '0')
						}
					} satisfies Balance
				}
			})
	}
)

export const getProfitAndLoss = query(
	'unchecked',
	async ({
		actor,
	}: {
		actor: EvmActor['$id']
	}) => {
		const { getProfitAndLoss } = await import("../api/1inch/api.ts")

		const chainId = 'chainId' in actor.$network ? actor.$network.chainId : 1
		const result = await getProfitAndLoss({
			chainId,
			address: actor.address
		})

		return result
	}
)

export const getNfts = query(
	'unchecked',
	async ({
		actor,
	}: {
		actor: EvmActor['$id']
	}) => {
		const { getNfts } = await import("../api/1inch/api.ts")

		const chainId = 'chainId' in actor.$network ? actor.$network.chainId : 1
		const result = await getNfts({
			chainId,
			address: actor.address
		})

		return result.result.map((nft) => ({
			$type: EntityType.Nft,
			$id: {
				$network: actor.$network,
				contract: nft.contract_address as `0x${string}`,
				tokenId: nft.token_id
			},
			$fields: {
				name: nft.name,
				description: nft.description,
				image: nft.image_url,
				collection: nft.collection ? {
					name: nft.collection.name,
					slug: nft.collection.slug
				} : undefined,
				$owner: actor
			}
		} satisfies Nft))
	}
)

export const getCoins = query(
	'unchecked',
	async ({
		actor,
	}: {
		actor: EvmActor['$id']
	}) => {
		const { getPortfolioValue } = await import("../api/1inch/api.ts")

		const chainId = 'chainId' in actor.$network ? actor.$network.chainId : 1
		const result = await getPortfolioValue({
			chainId,
			address: actor.address
		})

		const nativeCurrencies: NativeCurrency[] = []
		const erc20Tokens: Erc20Token[] = []
		const seenCoins = new Set<string>()

		for (const item of result.result) {
			if (!item.contract_address) continue
			
			const isNative = item.contract_address === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
			const coinKey = isNative ? `native-${chainId}` : `${chainId}-${item.contract_address.toLowerCase()}`

			if (seenCoins.has(coinKey)) continue
			seenCoins.add(coinKey)

			if (isNative) {
				const networkId = 'chainId' in actor.$network ? { chainId: actor.$network.chainId } : actor.$network
				const nativeCurrencySymbol = chainId === 1 ? 'ETH' : chainId === 137 ? 'MATIC' : chainId === 56 ? 'BNB' : chainId === 42161 ? 'ETH' : 'ETH'

				nativeCurrencies.push({
					$type: EntityType.Coin,
					$id: {
						$network: networkId
					},
					$fields: {
						type: CoinType.NativeCurrency,
						symbol: nativeCurrencySymbol,
						decimals: item.decimals ?? 18,
						icon: item.logo_url
					}
				} satisfies NativeCurrency)
			} else {
				erc20Tokens.push({
					$type: EntityType.EvmActor,
					$id: {
						$network: actor.$network,
						address: item.contract_address as `0x${string}`
					},
					$fields: {
						type: CoinType.Erc20Token,
						symbol: item.symbol,
						decimals: item.decimals,
						name: item.name,
						icon: item.logo_url,
						$$transactions: []
					}
				} as Erc20Token)
			}
		}

		return [...nativeCurrencies, ...erc20Tokens] as Coin[]
	}
)

export const getDefiPositions = query(
	'unchecked',
	async ({
		actor,
	}: {
		actor: EvmActor['$id']
	}) => {
		const { getDefiPositions } = await import("../api/1inch/api.ts")

		const chainId = 'chainId' in actor.$network ? actor.$network.chainId : 1
		
		try {
			const result = await getDefiPositions({
				chainId,
				address: actor.address
			})

			if (!result?.result) {
				return []
			}

			return result.result
				.filter(position => position.protocol)
				.map((position) => {
				const contractId = position.pool?.address ? {
					$network: actor.$network,
					address: position.pool.address as `0x${string}`,
					type: EvmActorType.Contract
				} : undefined

				return {
					$type: EntityType.EvmContractPosition,
					$id: {
						$contract: contractId
					},
					$fields: {
						name: position.pool?.name ?? `${position.protocol?.name ?? 'Unknown'} Position`,
						protocol: {
							key: position.protocol?.key ?? '',
							name: position.protocol?.name ?? 'Unknown',
							logo_url: position.protocol?.logo_url
						},
						pool: position.pool ? {
							address: position.pool.address as `0x${string}`,
							name: position.pool.name
						} : undefined,
						value: position.net_worth ?? 0,
						$$assets: (position.assets ?? []).filter(asset => asset.contract_address).map((asset) => {
							const isNative = asset.contract_address === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
							const coinId = isNative
								? { $network: actor.$network }
								: {
									$network: actor.$network,
									address: asset.contract_address as `0x${string}`
								}
							return {
								$actor: actor,
								$coin: coinId
							}
						})
					}
				} satisfies EvmContractPosition
			})
		} catch (error) {
			console.error('Error fetching DeFi positions:', error)
			return []
		}
	}
)

export const getNetworks = query(
	'unchecked',
	async ({
		actor,
	}: {
		actor: EvmActor['$id']
	}) => {
		const chainId = 'chainId' in actor.$network ? actor.$network.chainId : 1
		const networkId = 'chainId' in actor.$network ? { chainId: actor.$network.chainId } : actor.$network

		const networkNames: Record<number, string> = {
			1: 'Ethereum Mainnet',
			137: 'Polygon',
			56: 'BNB Chain',
			42161: 'Arbitrum One',
			10: 'Optimism',
			43114: 'Avalanche',
			250: 'Fantom',
			8453: 'Base',
			324: 'zkSync Era',
			100: 'Gnosis',
			1313161554: 'Aurora',
			8217: 'Klaytn'
		}

		const nativeCurrencySymbols: Record<number, string> = {
			1: 'ETH',
			137: 'MATIC',
			56: 'BNB',
			42161: 'ETH',
			10: 'ETH',
			43114: 'AVAX',
			250: 'FTM',
			8453: 'ETH',
			324: 'ETH',
			100: 'xDAI',
			1313161554: 'ETH',
			8217: 'KLAY'
		}

		const networkName = networkNames[chainId] ?? `Chain ${chainId}`
		const nativeSymbol = nativeCurrencySymbols[chainId] ?? 'ETH'

		return [{
			$type: EntityType.EvmNetwork,
			$id: networkId,
			$fields: {
				name: networkName,
				nativeCurrency: {
					$type: EntityType.Coin,
					$id: {
						$network: networkId
					},
					$fields: {
						type: CoinType.NativeCurrency,
						symbol: nativeSymbol,
						decimals: 18
					}
				} satisfies NativeCurrency
			}
		} satisfies EvmNetwork]
	}
)

export const getHistoricalBalances = query(
	'unchecked',
	async ({
		actor,
		fromTimestamp,
		toTimestamp,
	}: {
		actor: EvmActor['$id']
		fromTimestamp?: number
		toTimestamp?: number
	}) => {
		const { getHistoricalBalances } = await import("../api/1inch/api.ts")

		const chainId = 'chainId' in actor.$network ? actor.$network.chainId : 1
		const result = await getHistoricalBalances({
			chainId,
			address: actor.address,
			fromTimestamp,
			toTimestamp
		})

		return result.result.map((historical) => {
			const balances: Balance[] = historical.balances.map((balance) => {
				const isNative = balance.contract_address === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
				const coinId = isNative
					? { $network: actor.$network }
					: {
						$network: actor.$network,
						address: balance.contract_address as `0x${string}`
					}

				return {
					$type: EntityType.Balance,
					$id: {
						$actor: actor,
						$coin: coinId
					},
					$fields: {
						balance: BigInt(balance.amount)
					}
				} satisfies Balance
			})

			return {
				timestamp: historical.timestamp,
				balances
			}
		})
	}
)
