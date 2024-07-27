// Types/constants
import type { AppWithDefiPositions, DefiPosition } from '$/data/defiPositions'
import type { ProtocolWithBalances, Protocol } from './index'
import type { TokenWithBalance } from '$/data/tokens'

import { web3AppsByProviderName } from '$/data/web3Apps'
import { formatIdentifierToWords } from '$/utils/formatIdentifierToWords'


// Functions
export const normalizeProtocolWithBalance = (
	protocolWithBalances: ProtocolWithBalances,
	protocol?: Protocol,
): AppWithDefiPositions => ({
	app: web3AppsByProviderName.llamafolio[protocolWithBalances.id],

	id: protocolWithBalances.id,
	name: protocol?.name || formatIdentifierToWords(protocolWithBalances.id, true),
	icon: protocol?.logo,

	summary: {
		assets: {
			currency: 'USD',
			value: protocolWithBalances.balanceUSD,
		},
		debt: {
			currency: 'USD',
			value: protocolWithBalances.debtUSD,
		},
		claimable: {
			currency: 'USD',
			value: protocolWithBalances.rewardUSD,
		},
	},

	views: protocolWithBalances.groups.map((group, i) => ({
		id: `${i}`,
		name: 'Assets',

		summary: {
			assets: {
				currency: 'USD',
				value: group.balanceUSD,
			},
			...'debtUSD' in group && {
				debt: {
					currency: 'USD',
					value: group.debtUSD,
				},
			},
			...'rewardUSD' in group && {
				claimable: {
					currency: 'USD',
					value: group.rewardUSD,
				},
			},
		},

		positions: group.balances.map((balance): DefiPosition => ({
			id: balance.address,
			name: 'name' in balance ? balance.name : 'symbol' in balance ? balance.symbol : '',
			type: 'app-token',
			tags: 'category' in balance ? [balance.category] : [],
			images: [],

			tokenWithBalance: {
				token: {
					name: 'name' in balance ? balance.name : '',
					address: balance.address,
					symbol: balance.symbol,
					decimals: balance.decimals,
				},
				
				balance: BigInt(balance.amount),

				...'price' in balance && 'balanceUSD' in balance && {
					conversion: {
						currency: 'USD',
						value: balance.balanceUSD,
						rate: balance.price,
					},
				},
			},
			isDebt: 'debtUSD' in group ? group.debtUSD > 0 : false,
			metadata: [],

			...'underlyings' in balance && {
				subpositions: balance.underlyings?.map(underlying => ({
					tokenWithBalance: {
						token: {
							name: 'name' in underlying ? underlying.name : '',
							address: underlying.address,
							symbol: underlying.symbol,
							decimals: underlying.decimals,
						},
						
						balance: BigInt(underlying.amount),

						...'price' in underlying && 'balanceUSD' in underlying && {
							conversion: {
								currency: 'USD',
								value: underlying.balanceUSD,
								rate: underlying.price,
							},
						},
					},

					isDebt: 'debtUSD' in group ? group.debtUSD > 0 : false,

					metadata: [],
				})),
			},
		})),
	})),
})

export const normalizeTokenBalances = (
	protocol: ProtocolWithBalances,
): TokenWithBalance[] => (console.log(protocol.groups[0].balances)||
	protocol.groups[0].balances
		.map(balance => ({
			token: {
				name: 'name' in balance ? balance.name : '',
				address: balance.address,
				symbol: balance.symbol,
				decimals: balance.decimals,
			},
			balance: BigInt(balance.amount),

			conversion: {
				currency: 'USD',
				value: balance.balanceUSD,
				rate: balance.price,
			},
		}))
)
