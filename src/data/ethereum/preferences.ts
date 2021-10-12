import { localStorageWritable } from '../../utils/localStorageWritable'
import { cryptoQuoteCurrencies, fiatQuoteCurrencies } from '../currency/currency'


type PreferenceOption<
	PreferenceOptionID extends string
> = {
	id: PreferenceOptionID,
	name: string | ((preferences: SerializedPreferences<typeof preferencesConfig>) => string),
	value?,
	disabled?: boolean
}

type PreferenceOptionGroup<
	PreferenceID extends string,
	PreferenceOptionID extends string
> = {
	id: string,
	name: string,
	options: PreferenceOption<PreferenceOptionID>[] | PreferenceOptionGroup<PreferenceID, PreferenceOptionID>[]
}

type Preference<
	PreferenceID extends string,
	PreferenceOptionID extends string
> = PreferenceOptionGroup<PreferenceID, PreferenceOptionID> & ({
	type: 'single',
	defaultOption: PreferenceOptionID
} | {
	type: 'multiple',
	defaultOption: PreferenceOptionID[]
})

type PreferenceSection<
	PreferenceSectionID extends string,
	PreferenceID extends string,
	PreferenceOptionID extends string = string
> = {
	id: PreferenceSectionID,
	name: string,
	preferences: (Preference<PreferenceID, PreferenceOptionID> /* | PreferenceSection<PreferenceSectionID, PreferenceID> */)[]
}

type PreferencesConfig<
	PreferenceSectionID extends string, // = typeof preferencesConfig[number]['id'],
	PreferenceID extends string // = typeof preferencesConfig[number]['id']['preferences']['id']
> = PreferenceSection<PreferenceSectionID, PreferenceID>[]

// interface SerializedPreferences<
// 	TPreferencesConfig extends PreferencesConfig<infer PreferenceSectionID, infer PreferenceID>
// > {[TPreferenceID]: any}
type SerializedPreferences<T extends PreferencesConfig<infer TPreferenceSectionID, infer TPreferenceID>> = {
	[_ in keyof T]
}

export const preferencesConfig: PreferencesConfig<
	| 'appearance'
	| 'blockchainNodes'
	| 'accountData'
	| 'analytics'
	| 'web3',

	| 'theme'
	// | 'tokenIcons'

	| 'rpcNetwork'
	| 'rpcNetworkSend'
	| 'tokenBalancesProvider'
	| 'defiProvider'
	| 'nftProvider'

	| 'currentPriceProvider'
	| 'historicalPriceProvider'
	| 'transactionProvider'
	| 'quoteCurrency'

	// | 'ipfsGateway'
	// | 'skynetGateway'
	// | 'theGraphGateway'
> = [
	{
		id: 'appearance',
		name: 'Appearance',
		preferences: [
			{
				id: 'theme',
				name: 'Theme',
				type: 'single',
				defaultOption: 'auto',
				options: [
					{ id: 'auto', name: 'Auto' },
					{ id: 'dark', name: 'Dark' },
					{ id: 'light', name: 'Light' }
				]
			},
			// {
			// 	id: 'tokenIcons',
			// 	name: 'Token Icons',
			// 	type: 'single',
			// 	defaultOption: 'CoinGecko',
			// 	options: [
			// 		{ id: 'CoinGecko', name: 'CoinGecko' },
			// 		{ id: 'Covalent', name: 'Covalent' },
			// 	]
			// }
		]
	},
	{
		id: 'blockchainNodes',
		name: 'Blockchain Nodes',
		preferences: [
			{
				id: 'rpcNetwork',
				name: 'On-Chain Data',
				type: 'single', // 'multiple',
				defaultOption: 'Ethers',
				options: [
					{ id: 'Ethers', name: 'Ethers Quorum' }, // (Infura + Etherscan + Alchemy + Pocket)
					{ id: 'Pocket Network', name: 'Pocket Network' },
					{ id: 'Alchemy', name: 'Alchemy' },
					{ id: 'Infura', name: 'Infura' },
					{ id: 'Moralis', name: 'Moralis' },
					{ id: 'Etherscan', name: 'Etherscan' },
					// { id: 'Portis', name: 'Infura (Portis)' },
				]
			},
			// {
			// 	id: 'rpcNetworkSend',
			// 	name: 'Sending Transactions',
			// 	type: 'single', // 'multiple',
			// 	defaultOption: 'Ethers',
			// 	options: [
			// 		{ id: 'Ethers', name: 'Ethers Quorum' }, // (Infura + Etherscan + Alchemy + Pocket)
			// 		{ id: 'Pocket Network', name: 'Pocket Network' },
			// 		{ id: 'Alchemy', name: 'Alchemy' },
			// 		{ id: 'Infura', name: 'Infura' },
			// 		{ id: 'Moralis', name: 'Moralis' },
			// 	]
			// },
		]
	},
	{
		id: 'accountData',
		name: 'Account Data',
		preferences: [
			{
				id: 'tokenBalancesProvider',
				name: 'Token Balances',
				type: 'single',
				defaultOption: 'Covalent',
				options: [
					// {
					// 	id: 'onChain',
					// 	name: 'On-Chain',
					// 	options: [
					//	{ id: 'RPC Provider', name: 'RPC Provider + Token List' },

					// 	]
					// },
					{
						id: 'offChain',
						name: 'Off-Chain',
						options: [
							{ id: 'Covalent', name: 'Covalent' },
							{ id: 'Moralis', name: 'Moralis Web3 API' },
							// { id: 'Zapper', name: 'Zapper' }
						]
					}
				]
			},
			{
				id: 'defiProvider',
				name: 'DeFi Balances',
				type: 'single',
				defaultOption: 'Zapper',
				options: [
					{
						id: 'onChain',
						name: 'On-Chain',
						options: [
							{ id: 'Zerion DeFi SDK', name: 'Zerion DeFi SDK' }
						]
					},
					{
						id: 'offChain',
						name: 'Off-Chain',
						options: [
							{ id: 'Zapper', name: 'Zapper' }
						]
					}
				]
			},
			{
				id: 'nftProvider',
				name: 'NFTs',
				type: 'single',
				defaultOption: 'Covalent',
				options: [
					// {
					// 	id: 'onChain',
					// 	name: 'On-Chain',
					// 	options: [
					// 	]
					// },
					{
						id: 'offChain',
						name: 'Off-Chain',
						options: [
							{ id: 'Covalent', name: 'Covalent' },
							// { id: 'Zapper', name: 'Zapper' },
							// { id: 'Moralis', name: 'Moralis' },
						]
					}
				]
			},
			{
				id: 'transactionProvider',
				name: 'Transactions/Blocks',
				type: 'single',
				defaultOption: 'Covalent',
				options: [
					{
						id: 'onChain',
						name: 'On-Chain',
						options: [
							{ id: 'RPC Provider', name: preferences => `On-Chain (${preferences.rpcNetwork})` },
						]
					},
					{
						id: 'offChain',
						name: 'Off-Chain',
						options: [
							{ id: 'Covalent', name: 'Covalent' },
							{ id: 'Moralis', name: 'Moralis' },
							{ id: 'Etherspot', name: 'Etherspot' },
						]
					}
				]
			}
		],
	},
	{
		id: 'analytics',
		name: 'Analytics',
		preferences: [
			{
				id: 'currentPriceProvider',
				name: 'Current Price',
				type: 'single',
				defaultOption: 'Zapper',
				options: [
					{
						id: 'onChain',
						name: 'On-Chain',
						options: [
							{ id: 'Chainlink', name: 'Chainlink' },
							// { id: 'Tellor', name: 'Tellor' },
							// { id: 'Compound Price Feed', name: 'Open Price Feed' },
						]
					},
					{
						id: 'offChain',
						name: 'Off-Chain',
						options: [
							{ id: 'Covalent', name: 'Covalent' },
							// { id: 'Moralis', name: 'Moralis' },
							// { id: 'Zapper', name: 'Zapper' },
							// { id: 'CoinGecko', name: 'CoinGecko' },
							// { id: 'Etherscan', name: 'Etherscan' },
						]
					}
				]
			},
			{
				id: 'historicalPriceProvider',
				name: 'Historical Price',
				type: 'single', // 'multiple'
				defaultOption: 'Covalent',
				options: [
					// {
					// 	id: 'onChain',
					// 	name: 'On-Chain',
					// 	options: [
					// 	]
					// },
					{
						id: 'offChain',
						name: 'Off-Chain',
						options: [
							{ id: 'Covalent', name: 'Covalent' },
							// { id: 'The Graph', name: 'The Graph' },
							// { id: 'Zapper', name: 'Zapper' },
							// { id: 'CoinGecko', name: 'CoinGecko' },
							// { id: 'Etherscan', name: 'Etherscan' },
							// { id: 'TradingView', name: 'TradingView' },
						]
					}
				]
			},
			{
				id: 'quoteCurrency',
				name: 'Currency',
				type: 'single',
				defaultOption: 'USD',
				options: [
					{
						id: 'fiat',
						name: 'Fiat Currencies',
						options: Object.values(fiatQuoteCurrencies).map(currency => ({
							id: currency.isoCode,
							name: `${currency.name} (${currency.symbol})`,
							value: currency.isoCode
						}))
					},
					{
						id: 'crypto',
						name: 'Cryptocurrencies',
						options: Object.values(cryptoQuoteCurrencies).map(currency => ({
							id: currency.isoCode,
							name: `${currency.name} (${currency.symbol})`,
							value: currency.isoCode
						}))
					}
				]
			}
		]
	},
	// {
	// 	id: 'web3',
	// 	name: 'Web 3.0',
	// 	preferences: [
	// 		{
	// 			id: 'ipfsGateway',
	// 			name: 'IPFS Gateway',
	// 			type: 'single',
	// 			defaultOption: 'ipfs.io',
	// 			options: [
	// 				{ id: 'ipfs.io', name: 'ipfs.io' }
	// 			]
	// 		},
	// 		{
	// 			id: 'skynetPortal',
	// 			name: 'Skynet Portal',
	// 			type: 'single',
	// 			defaultOption: 'siasky.net',
	// 			options: [
	// 				{ id: 'siasky.net', name: 'siasky.net' }
	// 			]
	// 		},
	// 		{
	// 			id: 'theGraphGateway',
	// 			name: 'The Graph Gateway',
	// 			type: 'single',
	// 			defaultOption: 'api.thegraph.com',
	// 			options: [
	// 				{ id: 'api.thegraph.com', name: 'api.thegraph.com' }
	// 			]
	// 		},
	// 	]
	// },
] // as const


// V1
// export const preferences.rpcNetwork = localStorageWritable<Ethereum.ProviderName>('preferred-ethereum-provider', 'Ethers')
// export const preferences.transactionProvider = localStorageWritable<Ethereum.TransactionProvider>('preferred-transaction-provider', 'Etherspot')
// export const preferences.defiProvider = localStorageWritable<DeFiProvider>('preferred-defi-provider', 'Zapper')
// export const preferences.currentPriceProvider = localStorageWritable<PriceFeedProvider>('preferred-price-feed-provider', 'Chainlink')
// export const preferences.analyticsProvider = localStorageWritable<AnalyticsProvider>('preferred-analytics-provider', 'Covalent')
// export const preferences.quoteCurrency = localStorageWritable<QuoteCurrency>('preferred-quote-currency', 'USD')
// export const preferences.theme = localStorageWritable<'auto' | 'dark' | 'light'>('preferred-color-scheme', 'auto')

// V2
export const localStoragePreferences = localStorageWritable<SerializedPreferences<typeof preferencesConfig>>(
	'localPreferences',
	{}
	// Object.fromEntries(
	// 	preferencesConfig
	// 		.flatMap(preferenceGroup => preferenceGroup.preferences)
	// 		.map(preference => [preference.id, preference.defaultOption])
	// )
)
localStoragePreferences.update(preferences => {
	for(const preferenceGroup of preferencesConfig)
		for(const preference of preferenceGroup.preferences)
			if(!preference.options
				.flatMap(optionOrGroup => optionOrGroup.options ? optionOrGroup.options : optionOrGroup)
				.find((option) => preferences[preference.id] === (option.id || option.value))
			)
				preferences[preference.id] = preference.defaultOption

	return preferences
})

export const preferences = localStoragePreferences