// Types
import type { Ethereum } from '$/data/networks/types'
import type { Web3AppConfig } from '$/data/web3Apps'
import type { AppWithDefiPositions } from '$/data/defiPositions'
import type { DefiSDK } from './index'


// Constants
import { web3AppsByProviderName } from '$/data/web3Apps'


// Functions
import { isTruthy } from '$/utils/isTruthy'

export const normalizeDefiPositions = (
	defiBalances: DefiSDK.ProtocolBalances
): AppWithDefiPositions[] => (
	defiBalances.map((protocolBalance: DefiSDK.ProtocolBalance) => {
		const app: Web3AppConfig | undefined = web3AppsByProviderName.zerionDefiSDK?.[protocolBalance.metadata.name]
		const erc20Token = app?.views?.flatMap(view => view.erc20Tokens ?? [])[0]

		return {
			app,

			id: protocolBalance.metadata.name,
			name: protocolBalance.metadata.name,
			icon: erc20Token?.icon,
			images: [
				protocolBalance.metadata.iconURL && `https://${protocolBalance.metadata.iconURL}`,
			].filter(isTruthy),

			views: protocolBalance.adapterBalances.map(adapterBalance => ({
				id: adapterBalance.metadata.adapterAddress,
				name: {
					'Asset': 'Assets',
					'Debt': 'Debt',
				}[adapterBalance.metadata.adapterType],
				// tags: [adapterBalance.metadata.adapterType],
				source: {
					name: 'Adapter',
					contractAddress: adapterBalance.metadata.adapterAddress,
				},

				positions: adapterBalance.balances.map(balance => ({
					id: balance.base.metadata.name,
					name: balance.base.metadata.name,
					type: 'app-token',

					tokenWithBalance: {
						token: {
							symbol: balance.base.metadata.symbol,
							address: balance.base.metadata.token as Ethereum.ContractAddress,
							name: balance.base.metadata.name,
							decimals: Number(balance.base.metadata.decimals),
						},

						balance: BigInt(balance.base.amount),
					},

					positions: balance.underlying?.map(tokenBalance => ({
						tokenWithBalance: {
							token: {
								symbol: tokenBalance.metadata.symbol,
								address: tokenBalance.metadata.token as Ethereum.ContractAddress,
								name: tokenBalance.metadata.name,
								decimals: Number(tokenBalance.metadata.decimals),
							},

							balance: BigInt(tokenBalance.amount),
						},
					})),
				})),
			})),
		}
	})
)
