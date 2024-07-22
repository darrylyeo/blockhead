// Types/constants
import type { AppWithDefiPositions, DefiPosition } from '$/data/defiPositions'
import type { Protocol } from './index'

import { web3AppsByProviderName } from '$/data/web3Apps'
import { formatIdentifierToWords } from '$/utils/formatIdentifierToWords'


// Functions
export const normalizeProtocolWithBalance = (
	protocol: Protocol,
): AppWithDefiPositions => ({
	app: web3AppsByProviderName.llamafolio[protocol.id],

	id: protocol.id,
	name: formatIdentifierToWords(protocol.id, true),

	summary: {
		assets: {
			currency: 'USD',
			value: protocol.balanceUSD,
		},
		debt: {
			currency: 'USD',
			value: protocol.debtUSD,
		},
		claimable: {
			currency: 'USD',
			value: protocol.rewardUSD,
		},
	},

	views: protocol.groups.map((group, i) => ({
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
			name: 'name' in balance ? balance.name : balance.symbol,
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
