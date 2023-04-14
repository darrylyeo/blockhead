import { localStorageWritable } from '../utils/localStorageWritable'
import { cryptoQuoteCurrencies, fiatQuoteCurrencies } from '../data/currencies'

import { NetworkProvider } from '../data/networkProviders/types'
import { networkProviderConfigs } from '../data/networkProviders'
import { TokenBalancesProvider } from '../data/tokenBalancesProvider'
import { DefiProvider } from '../data/defiProviders'
import { NftProvider } from '../data/nftProviders'
import { PriceProvider } from '../data/priceProviders'
import { TransactionProvider } from '../data/transactionProvider'
import { NotificationsProvider } from '../data/notificationsProvider'


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
	| 'blockchainData'
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

	| 'notificationsProvider'

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
		id: 'blockchainData',
		name: 'Blockchain Data',
		preferences: [
			{
				id: 'rpcNetwork',
				name: 'On-Chain Data',
				type: 'single', // 'multiple',
				defaultOption: NetworkProvider.Alchemy, // NetworkProvider.Default,
				options: networkProviderConfigs.map(({ provider, name }) => ({ id: provider, name }))
				// options: [
				// 	{ id: 'Auto', name: 'Auto' },
				// 	{ id: 'Pocket Network', name: 'Pocket Network' },
				// 	{ id: 'Alchemy', name: 'Alchemy' },
				// // 	{ id: 'Moralis', name: 'Moralis' },
				// 	{ id: 'Infura', name: 'Infura' },
				// 	{ id: 'Etherscan', name: 'Etherscan' },
				// 	{ id: 'Ethers', name: 'Ethers Quorum' }, // (Infura + Etherscan + Alchemy + Pocket)
				// ]
			},
			{
				id: 'transactionRelay',
				name: 'Transaction Relay',
				type: 'single', // 'multiple',
				defaultOption: 'Ethers',
				options: [
					{ id: 'Ethers', name: 'Ethers Quorum' }, // (Infura + Etherscan + Alchemy + Pocket)
					{ id: 'Pocket Network', name: 'Pocket Network' },
					{ id: 'Alchemy', name: 'Alchemy' },
					{ id: 'Infura', name: 'Infura' },
					{ id: 'Moralis', name: 'Moralis' },
				]
			},
			{
				id: 'transactionProvider',
				name: 'Transactions/Blocks',
				type: 'single',
				defaultOption: TransactionProvider.Covalent,
				options: [
					{
						id: 'onChain',
						name: 'On-Chain',
						options: [
							{ id: TransactionProvider.RpcProvider, name: preferences => `On-Chain (${preferences.rpcNetwork})` },
						]
					},
					{
						id: 'offChain',
						name: 'Off-Chain',
						options: [
							{ id: TransactionProvider.Covalent, name: 'Covalent' },
							{ id: TransactionProvider.Moralis, name: 'Moralis' },
							// { id: TransactionProvider.Etherspot, name: 'Etherspot' },
						]
					}
				]
			},
			{
				id: 'contractSourceProvider',
				name: 'Contract Source Code',
				type: 'single',
				defaultOption: 'Sourcify',
				options: [
					{
						id: 'web3',
						name: 'Web3 Hosted',
						options: [
							{ id: 'Sourcify', name: 'Sourcify' },
						]
					},
					{
						id: 'centralized',
						name: 'Centrally Hosted',
						options: [
							{ id: 'Etherscan', name: 'Etherscan' },
							{ id: 'Tenderly', name: 'Tenderly' },
						]
					}
				]
			}
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
				defaultOption: TokenBalancesProvider.Airstack,
				options: [
					{
						id: 'onChain',
						name: 'On-Chain',
						options: [
							// { id: 'RPC Provider', name: 'RPC Provider + Token List' },
							{ id: TokenBalancesProvider.QuickNode, name: 'QuickNode' },
						]
					},
					{
						id: 'offChain',
						name: 'Off-Chain',
						options: [
							{ id: TokenBalancesProvider.Airstack, name: 'Airstack' },
							{ id: TokenBalancesProvider.Covalent, name: 'Covalent' },
							{ id: TokenBalancesProvider.Liquality, name: 'Liquality (Alchemy)' },
							{ id: TokenBalancesProvider.Moralis, name: 'Moralis › Web3 API' },
							{ id: TokenBalancesProvider.Zapper, name: 'Zapper' }
						]
					}
				]
			},
			{
				id: 'defiProvider',
				name: 'DeFi Balances',
				type: 'single',
				defaultOption: DefiProvider.ZerionDefiSdk,
				options: [
					{
						id: 'onChain',
						name: 'On-Chain',
						options: [
							{ id: DefiProvider.ZerionDefiSdk, name: DefiProvider.ZerionDefiSdk }
						]
					},
					{
						id: 'offChain',
						name: 'Off-Chain',
						options: [
							{ id: DefiProvider.Zapper, name: DefiProvider.Zapper }
						]
					}
				]
			},
			{
				id: 'nftProvider',
				name: 'NFTs',
				type: 'single',
				defaultOption: NftProvider.Airstack,
				options: [
					{
						id: 'onChain',
						name: 'On-Chain',
						options: [
							{ id: NftProvider.Liquality, name: 'Liquality (Alchemy)' },
						]
					},
					{
						id: 'offChain',
						name: 'Off-Chain',
						options: [
							{ id: NftProvider.Airstack, name: 'Airstack' },
							{ id: NftProvider.Covalent, name: 'Covalent' },
							{ id: NftProvider.NftPort,  name: 'NFTPort' }
							// { id: 'Zapper', name: 'Zapper' },
							// { id: 'Moralis', name: 'Moralis' },
						]
					}
				]
			},
			{
				id: 'notificationsProvider',
				name: 'Notifications',
				type: 'single',
				defaultOption: NotificationsProvider.Push,
				options: [
					{ id: NotificationsProvider.Push, name: 'Push' },
				]
			},
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
				defaultOption: 'auto',
				options: [
					{
						id: 'onChain',
						name: 'On-Chain',
						options: [
							{ id: PriceProvider.Chainlink, name: 'Chainlink' },
							// { id: 'Tellor', name: 'Tellor' },
							// { id: 'Compound Price Feed', name: 'Open Price Feed' },
						]
					},
					// {
					// 	id: 'offChain',
					// 	name: 'Off-Chain',
					// 	options: [
					// 		// { id: PriceProvider.Covalent, name: 'Covalent' },
					// 		// { id: 'Moralis', name: 'Moralis' },
					// 		// { id: 'Zapper', name: 'Zapper' },
					// 		// { id: 'CoinGecko', name: 'CoinGecko' },
					// 		// { id: 'Etherscan', name: 'Etherscan' },
					// 	]
					// },
					{
						id: 'auto',
						name: 'Auto',
						options: [
							{ id: 'auto', name: 'Auto' },
						]
					}
				]
			},
			{
				id: 'historicalPriceProvider',
				name: 'Historical Price',
				type: 'single', // 'multiple'
				defaultOption: '',
				options: [
					// {
					// 	id: 'onChain',
					// 	name: 'On-Chain',
					// 	options: [
					//	{ id: PriceProvider.Chainlink, name: 'Chainlink' },
					// 	]
					// },
					{
						id: 'offChain',
						name: 'Off-Chain',
						options: [
							// { id: PriceProvider.Covalent, name: 'Covalent' },
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
// export const preferences.transactionProvider = localStorageWritable<TransactionProvider>('preferred-transaction-provider', TransactionProvider.Etherspot)
// export const preferences.defiProvider = localStorageWritable<DefiProvider>('preferred-defi-provider', DefiProvider.Zapper)
// export const preferences.currentPriceProvider = localStorageWritable<PriceProvider>('preferred-price-feed-provider', PriceProvider.Chainlink)
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
const resolveDefaultPreferences = (preferences = {}) => {
	for(const preferenceGroup of preferencesConfig)
		for(const preference of preferenceGroup.preferences)
			if(!preference.options
				.flatMap(optionOrGroup => optionOrGroup.options ? optionOrGroup.options : optionOrGroup)
				.find((option) => preferences[preference.id] === (option.id || option.value))
			)
				preferences[preference.id] = preference.defaultOption

	return preferences
}
localStoragePreferences.update(resolveDefaultPreferences)

export const resetPreferences = () => localStoragePreferences.set(resolveDefaultPreferences({}))

export const preferences = localStoragePreferences
