import type { EvmActor } from '../schema/EvmActor.ts'
import type { Balance } from '../schema/Balance.ts'
import type { EvmContractPosition } from '../schema/EvmContractPosition.ts'
import type { Coin, NativeCurrency, Erc20Token } from '../schema/Coin.ts'
import type { EvmNetwork } from '../schema/EvmNetwork.ts'
import { CoinType } from '../schema/Coin.ts'
import { EntityType } from '../schema/_Entity.ts'
import { EvmActorType } from '../schema/EvmActor.ts'

import { query } from '$app/server'

export const getDefiPositions = query(
	'unchecked',
	async ({
		actor,
	}: {
		actor: EvmActor['$id']
	}) => {
		const { getPortfolio } = await import('../api/Octav/api.ts')

		const result = await getPortfolio({ address: actor.address })

		const positions: EvmContractPosition[] = []

		if (result?.result?.[0]?.assetByProtocols) {
			const portfolioData = result.result[0]
			
			for (const [protocolKey, protocol] of Object.entries(portfolioData.assetByProtocols)) {
				// Skip "wallet" protocol as it's not a DeFi position
				if (protocolKey === 'wallet') continue
				
				// Skip if value is 0 or negative
				const value = parseFloat(protocol.value)
				if (value <= 0) continue

				const assets: Balance['$id'][] = []

				// Process assets if they exist
				if (protocol.assets && protocol.assets.length > 0) {
					for (const asset of protocol.assets) {
						const isNative = !asset.contractAddress || asset.contractAddress === '0x0000000000000000000000000000000000000000'
						const coinId = isNative
							? { $network: actor.$network }
							: {
								$network: actor.$network,
								address: asset.contractAddress as `0x${string}`
							}
						assets.push({
							$actor: actor,
							$coin: coinId
						})
					}
				}

				const chains = protocol.chains ? Object.fromEntries(
					Object.entries(protocol.chains).map(([chainKey, chain]) => [
						chainKey,
						{
							$network: {
								chainId: parseInt(chain.chainId, 10)
							},
							value: parseFloat(chain.value),
							valuePercentile: parseFloat(chain.valuePercentile),
							totalCostBasis: chain.totalCostBasis && chain.totalCostBasis !== 'N/A' ? parseFloat(chain.totalCostBasis) : undefined,
							totalClosedPnl: chain.totalClosedPnl && chain.totalClosedPnl !== 'N/A' ? parseFloat(chain.totalClosedPnl) : undefined,
							totalOpenPnl: chain.totalOpenPnl && chain.totalOpenPnl !== 'N/A' ? parseFloat(chain.totalOpenPnl) : undefined,
						}
					])
				) : undefined

				positions.push({
					$type: EntityType.EvmContractPosition,
					$id: {
						$contract: undefined
					},
					$fields: {
						name: `${protocol.name} Position`,
						protocol: {
							key: protocol.key,
							name: protocol.name
						},
						value,
						totalCostBasis: protocol.totalCostBasis && protocol.totalCostBasis !== 'N/A' ? parseFloat(protocol.totalCostBasis) : undefined,
						totalClosedPnl: protocol.totalClosedPnl && protocol.totalClosedPnl !== 'N/A' ? parseFloat(protocol.totalClosedPnl) : undefined,
						totalOpenPnl: protocol.totalOpenPnl && protocol.totalOpenPnl !== 'N/A' ? parseFloat(protocol.totalOpenPnl) : undefined,
						chains,
						$$assets: assets
					}
				} satisfies EvmContractPosition)
			}
		}

		return positions
	}
)

export const getCoins = query(
	'unchecked',
	async ({
		actor,
	}: {
		actor: EvmActor['$id']
	}) => {
		const { getPortfolio } = await import('../api/Octav/api.ts')

		const result = await getPortfolio({ address: actor.address })

		const nativeCurrencies: NativeCurrency[] = []
		const erc20Tokens: Erc20Token[] = []
		const seenCoins = new Set<string>()

		if (result?.result?.[0]?.assetByProtocols) {
			const portfolioData = result.result[0]

			for (const protocol of Object.values(portfolioData.assetByProtocols)) {
				if (protocol.assets && protocol.assets.length > 0) {
					for (const asset of protocol.assets) {
						const isNative = !asset.contractAddress || asset.contractAddress === '0x0000000000000000000000000000000000000000'
						const chainId = 'chainId' in actor.$network ? actor.$network.chainId : 1
						const coinKey = isNative ? `native-${chainId}` : `${chainId}-${asset.contractAddress?.toLowerCase() ?? ''}`

						if (seenCoins.has(coinKey)) continue
						seenCoins.add(coinKey)

						if (isNative) {
							const networkId = 'chainId' in actor.$network ? { chainId: actor.$network.chainId } : actor.$network
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
							const nativeSymbol = nativeCurrencySymbols[chainId] ?? 'ETH'

							nativeCurrencies.push({
								$type: EntityType.Coin,
								$id: {
									$network: networkId
								},
								$fields: {
									type: CoinType.NativeCurrency,
									symbol: nativeSymbol,
									decimals: 18
								}
							} satisfies NativeCurrency)
						} else if (asset.contractAddress) {
							erc20Tokens.push({
								$type: EntityType.EvmActor,
								$id: {
									$network: actor.$network,
									address: asset.contractAddress as `0x${string}`
								},
								$fields: {
									type: CoinType.Erc20Token,
									symbol: asset.symbol,
									decimals: 18,
									name: asset.symbol,
									$$transactions: []
								}
							} as Erc20Token)
						}
					}
				}
			}
		}

		return [...nativeCurrencies, ...erc20Tokens] as Coin[]
	}
)

export const getNetworks = query(
	'unchecked',
	async ({
		actor,
	}: {
		actor: EvmActor['$id']
	}) => {
		const { getPortfolio } = await import('../api/Octav/api.ts')

		const result = await getPortfolio({ address: actor.address })

		const networks: EvmNetwork[] = []
		const seenNetworks = new Set<number>()

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

		if (result?.result?.[0]?.assetByProtocols) {
			const portfolioData = result.result[0]

			for (const protocol of Object.values(portfolioData.assetByProtocols)) {
				if (protocol.chains) {
					for (const chain of Object.values(protocol.chains)) {
						const chainId = parseInt(chain.chainId, 10)
						if (seenNetworks.has(chainId)) continue
						seenNetworks.add(chainId)

						const networkId = { chainId }
						const networkName = networkNames[chainId] ?? `Chain ${chainId}`
						const nativeSymbol = nativeCurrencySymbols[chainId] ?? 'ETH'

						networks.push({
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
						} satisfies EvmNetwork)
					}
				}
			}
		}

		if (networks.length === 0) {
			const chainId = 'chainId' in actor.$network ? actor.$network.chainId : 1
			const networkId = 'chainId' in actor.$network ? { chainId: actor.$network.chainId } : actor.$network
			const networkName = networkNames[chainId] ?? `Chain ${chainId}`
			const nativeSymbol = nativeCurrencySymbols[chainId] ?? 'ETH'

			networks.push({
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
			} satisfies EvmNetwork)
		}

		return networks
	}
)
