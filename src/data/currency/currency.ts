export const fiatQuoteCurrencies = {
	'USD': {
		symbol: '$',
		isoCode: 'USD',
		name: 'US Dollar'
	},
	'GBP': {
		symbol: '£',
		isoCode: 'GBP',
		name: 'British Pound'
	},
	'CAD': {
		symbol: 'CA$',
		isoCode: 'CAD',
		name: 'Canadian Dollar'
	},
	'EUR': {
		symbol: '€',
		isoCode: 'EUR',
		name: 'Euro'
	},
	'SGD': {
		symbol: 'S$',
		isoCode: 'SGD',
		name: 'Singapore Dollar'
	},
	'INR': {
		symbol: '₹',
		isoCode: 'INR',
		name: 'Indian Rupee'
	},
	'JPY': {
		symbol: '¥',
		isoCode: 'JPY',
		name: 'Japanese Yen'
	},
	'VND': {
		symbol: '₫',
		isoCode: 'VND',
		name: 'Vietnamese Dong'
	},
	'CNY': {
		symbol: '¥',
		isoCode: 'CNY',
		name: 'Chinese Yuan'
	},
	'KRW': {
		symbol: '₩',
		isoCode: 'KRW',
		name: 'South Korean Won'
	},
	'RUB': {
		symbol: '₽',
		isoCode: 'RUB',
		name: 'Russian Ruble'
	},
	'TRY': {
		symbol: '₺',
		isoCode: 'TRY',
		name: 'Turkish Lira'
	},
}

export const cryptoQuoteCurrencies = {
	'BTC': {
		symbol: '₿',
		isoCode: 'BTC',
		name: 'Bitcoin'
	},
	'ETH': {
		symbol: 'Ξ',
		isoCode: 'ETH',
		name: 'Ethereum'
	}
}

export const quoteCurrencies = {...fiatQuoteCurrencies, cryptoQuoteCurrencies}

export type QuoteCurrency = keyof typeof quoteCurrencies
export type TickerSymbol = QuoteCurrency | string