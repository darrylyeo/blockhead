import type { QuoteCurrency } from './currencies'
import type { Ethereum } from './networks/types'
import type { TokenWithBalance } from './tokens'
import type { Web3AppConfig } from './web3Apps'


export type AppWithDefiPositions = {
	app?: Web3AppConfig,

	id: string,
	name?: string,
	icon?: string,
	images?: string[],
	colors?: string[],

	summary?: {
		assets?: {
			currency: QuoteCurrency,
			value: number,
		},
		debt?: {
			currency: QuoteCurrency,
			value: number,
		},
	},

	views: {
		id?: string,
		name: string,

		source?: {
			name: string,
			contractAddress?: Ethereum.ContractAddress,
		},

		summary?: {
			assets?: {
				currency: QuoteCurrency,
				value: number,
			},
			debt?: {
				currency: QuoteCurrency,
				value: number,
			},
		},

		positions?: DefiPosition[],

		metadata?: MetadataItem[],
	}[],
}

export type DefiPosition = {
	id: string,
	name?: string,
	type:
		// Zerion
		| 'Asset' | 'Debt'
		// Zapper V2
		| 'app-token' | 'contract-position' | '',
		// Zapper V1
		// | 'claimable' | 'pool' | 'vault' | 'interest' | 'wallet',
	tags?: string[],
	images?: string[],

	tokenWithBalance: TokenWithBalance,
	isDebt?: boolean,
	metadata?: MetadataItem[],

	subpositions?: {
		tokenWithBalance: TokenWithBalance,
		isDebt?: boolean,
		metadata?: MetadataItem[],
	}[],
}

export type MetadataItem = (
	{
		label: string,	
	} & (
		| {
			type: 'currency',
			value: number,
			currency: QuoteCurrency,
		}
		| {
			type: 'number',
			value: number,
			format: 'number' | 'percent',
		}
		| {
			type: 'other',
			value: string | number | boolean | string[] | number[],
		}
	)
)
