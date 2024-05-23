// Type functions
import type { DeepReadonly } from '$/utils/DeepReadonly'
import type { Indices } from '$/utils/Indices'
import type { UnionToObject } from '$/utils/UnionToObject'


// External constants
import type { Ethereum } from '$/data/networks/types'
import { cryptoQuoteCurrencies, fiatQuoteCurrencies } from '$/data/currencies'
import { NetworkProvider } from '$/data/networkProviders/types'
import { networkProviderConfigs } from '$/data/networkProviders'
import { TokenBalancesProvider } from '$/data/tokenBalancesProvider'
import { DefiProvider } from '$/data/defiProviders'
import { NftProvider } from '$/data/nftProviders'
import { PriceProvider } from '$/data/priceProviders'
import { TransactionProvider } from '$/data/transactionProvider'
import { ContractSourceProvider } from '$/data/contractSourceProvider'
import { NotificationsProvider } from '$/data/notificationsProvider'
import { ipfsGateways } from '$/data/ipfsGateways'
import { arweaveGateways } from '$/data/arweaveGateways'
import { FarcasterProvider } from '$/data/farcasterProviders'
import { FarcasterFeedProvider } from '$/data/farcasterFeedProviders'
import { UrlMetadataProvider } from '$/data/urlMetadataProvider'


// Context
import { get } from 'svelte/store'
import { colorTheme } from '$/state/colorTheme'
import { prefersReducedMotion } from '$/state/prefersReducedMotion'


// Constants
namespace Preferences {
	export type Value = string | number | boolean

	export type OptionOrOptionGroup = Option | OptionGroup

	export type Options = OptionOrOptionGroup[] | readonly OptionOrOptionGroup[]

	export type Option = {
		value: Value,
		name: string | ((preferences: any /* PreferencesState */) => string),
		disabled?: boolean,
	}

	export type OptionGroup = {
		groupId: string,
		name: string,
		options: Options,
	}

	export type Preference = {
		preferenceId: string,
		name: string,
		options: Options,
	} & ({
		type: 'single',
		defaultOption: Value,
	} | {
		type: 'multiple',
		defaultOption: Value,
	})

	export type Section = {
		sectionId: string,
		name: string,
		network?: Ethereum.Network,
		preferences: (Preference /* | PreferenceSection */)[],
	}

	export type Config = Section[]

	export type ExtractOptionValues<T extends Options> =
		T[number] extends infer T ?
			T extends OptionGroup ?
				ExtractOptionValues<T['options']>
			: T extends Option ?
				T['value']
			:
				never
		: never
}

export const preferencesConfig = [
	{
		sectionId: 'appearance',
		name: 'Appearance',
		preferences: [
			{
				preferenceId: 'theme',
				name: 'Theme',
				type: 'single',
				defaultOption: 'auto',
				options: [
					{ value: 'auto', name: () => `Auto (${get(colorTheme) === 'dark' ? 'Dark' : 'Light'})` }, 
					{ value: 'dark', name: 'Dark' },
					{ value: 'light', name: 'Light' }
				]
			},
			{
				preferenceId: 'animations',
				name: 'Animations',
				type: 'single',
				defaultOption: 'enabled',
				options: [
					{ value: 'auto', name: () => `Auto (${get(prefersReducedMotion) ? 'Disabled' : 'Enabled'})` },
					{ value: 'enabled', name: 'Enabled' },
					{ value: 'disabled', name: 'Disabled' }
				]
			},
			// {
			// 	preferenceId: 'tokenIcons',
			// 	name: 'Token Icons',
			// 	type: 'single',
			// 	defaultOption: 'CoinGecko',
			// 	options: [
			// 		{ value: 'CoinGecko', name: 'CoinGecko' },
			// 		{ value: 'Covalent', name: 'Covalent' },
			// 	]
			// }
		]
	},
	{
		sectionId: 'blockchainData',
		name: 'Blockchain Data',
		preferences: [
			{
				preferenceId: 'rpcNetwork',
				name: 'On-Chain Data',
				type: 'single', // 'multiple',
				defaultOption: NetworkProvider.Default,
				options: networkProviderConfigs.map(({ provider, name }) => ({ value: provider, name }))
				// options: [
				// 	{ value: 'Auto', name: 'Auto' },
				// 	{ value: 'Pocket Network', name: 'Pocket Network' },
				// 	{ value: 'Alchemy', name: 'Alchemy' },
				// // 	{ value: 'Moralis', name: 'Moralis' },
				// 	{ value: 'Infura', name: 'Infura' },
				// 	{ value: 'Etherscan', name: 'Etherscan' },
				// 	{ value: 'Ethers', name: 'Ethers Quorum' }, // (Infura + Etherscan + Alchemy + Pocket)
				// ]
			},
			{
				preferenceId: 'transactionRelay',
				name: 'Transaction Relay',
				type: 'single', // 'multiple',
				defaultOption: 'Ethers',
				options: [
					{ value: 'Ethers', name: 'Ethers Quorum' }, // (Infura + Etherscan + Alchemy + Pocket)
					{ value: 'Pocket Network', name: 'Pocket Network' },
					{ value: 'Alchemy', name: 'Alchemy' },
					{ value: 'Infura', name: 'Infura' },
					{ value: 'Moralis', name: 'Moralis' },
				]
			},
			{
				preferenceId: 'transactionProvider',
				name: 'Transactions/Blocks',
				type: 'single',
				defaultOption: TransactionProvider.RpcProvider,
				options: [
					{
						groupId: 'onChain',
						name: 'On-Chain',
						options: [
							{ value: TransactionProvider.RpcProvider, name: (preferences: any) => `RPC Node (${preferences.rpcNetwork})` },
						]
					},
					{
						groupId: 'offChain',
						name: 'Off-Chain',
						options: [
							{ value: TransactionProvider.Etherscan, name: 'Etherscan' },
							{ value: TransactionProvider.Chainbase, name: 'Chainbase' },
							{ value: TransactionProvider.Covalent, name: 'Covalent' },
							{ value: TransactionProvider.Decommas, name: 'Decommas' },
							{ value: TransactionProvider.Moralis, name: 'Moralis' },
							// { value: TransactionProvider.Etherspot, name: 'Etherspot' },
							{ value: TransactionProvider.Beryx, name: 'Beryx' },
						]
					}
				]
			},
			{
				preferenceId: 'contractSourceProvider',
				name: 'Contract Source Code',
				type: 'single',
				defaultOption: ContractSourceProvider.Etherscan,
				options: [
					{
						groupId: 'web3',
						name: 'Web3 Hosted',
						options: [
							{ value: ContractSourceProvider.Sourcify, name: 'Sourcify' },
						]
					},
					{
						groupId: 'centralized',
						name: 'Centrally Hosted',
						options: [
							{ value: ContractSourceProvider.Etherscan, name: 'Etherscan' },
							// { value: ContractSourceProvider.Tenderly, name: 'Tenderly' },
						]
					}
				]
			}
		]
	},
	{
		sectionId: 'accountData',
		name: 'Account Data',
		preferences: [
			{
				preferenceId: 'tokenBalancesProvider',
				name: 'Token Balances',
				type: 'single',
				defaultOption: TokenBalancesProvider.Zapper,
				options: [
					{
						groupId: 'onChain',
						name: 'On-Chain',
						options: [
							{ value: TokenBalancesProvider.RpcProvider, name: (preferences: any) => `On-Chain (${preferences.rpcNetwork})` }, // 'RPC Provider + Token List'
							{ value: TokenBalancesProvider.Liquality, name: 'Liquality (Alchemy)' },
							{ value: TokenBalancesProvider.QuickNode, name: 'QuickNode' },
						]
					},
					{
						groupId: 'offChain',
						name: 'Off-Chain',
						options: [
							{ value: TokenBalancesProvider.Airstack, name: 'Airstack' },
							{ value: TokenBalancesProvider.Chainbase, name: 'Chainbase › Token API' },
							{ value: TokenBalancesProvider.Covalent, name: 'Covalent' },
							{ value: TokenBalancesProvider.Decommas, name: 'Decommas' },
							{ value: TokenBalancesProvider.Moralis, name: 'Moralis › Web3 API' },
							{ value: TokenBalancesProvider.Nexandria, name: 'Nexandria' },
							{ value: TokenBalancesProvider.Zapper, name: 'Zapper' },
							{ value: TokenBalancesProvider.Beryx, name: 'Beryx' },
						]
					}
				]
			},
			{
				preferenceId: 'defiProvider',
				name: 'DeFi Positions',
				type: 'single',
				defaultOption: DefiProvider.Zapper,
				options: [
					{
						groupId: 'onChain',
						name: 'On-Chain',
						options: [
							{ value: DefiProvider.ZerionDefiSdk, name: DefiProvider.ZerionDefiSdk }
						]
					},
					{
						groupId: 'offChain',
						name: 'Off-Chain',
						options: [
							{ value: DefiProvider.Zapper, name: DefiProvider.Zapper }
						]
					}
				]
			},
			{
				preferenceId: 'nftProvider',
				name: 'NFTs',
				type: 'single',
				defaultOption: NftProvider.Airstack,
				options: [
					{
						groupId: 'onChain',
						name: 'On-Chain',
						options: [
							{ value: NftProvider.Liquality, name: 'Liquality (Alchemy)' },
						]
					},
					{
						groupId: 'offChain',
						name: 'Off-Chain',
						options: [
							{ value: NftProvider.Airstack, name: 'Airstack' },
							{ value: NftProvider.Chainbase, name: 'Chainbase' },
							{ value: NftProvider.Covalent, name: 'Covalent' },
							{ value: NftProvider.Decommas, name: 'Decommas' },
							{ value: NftProvider.NftPort,  name: 'NFTPort' }
							// { value: 'Zapper', name: 'Zapper' },
							// { value: 'Moralis', name: 'Moralis' },
						]
					}
				]
			},
			{
				preferenceId: 'notificationsProvider',
				name: 'Notifications',
				type: 'single',
				defaultOption: NotificationsProvider.Push,
				options: [
					{ value: NotificationsProvider.Push, name: 'Push' },
				]
			},
		],
	},
	{
		sectionId: 'analytics',
		name: 'Analytics',
		preferences: [
			{
				preferenceId: 'currentPriceProvider',
				name: 'Current Price',
				type: 'single',
				defaultOption: 'Chainlink', // 'auto',
				options: [
					{
						groupId: 'onChain',
						name: 'On-Chain',
						options: [
							{ value: PriceProvider.Chainlink, name: 'Chainlink' },
							// { value: 'Tellor', name: 'Tellor' },
							// { value: 'Compound Price Feed', name: 'Open Price Feed' },
						]
					},
					// {
					// 	groupId: 'offChain',
					// 	name: 'Off-Chain',
					// 	options: [
					// 		// { value: PriceProvider.Covalent, name: 'Covalent' },
					// 		// { value: 'Moralis', name: 'Moralis' },
					// 		// { value: 'Zapper', name: 'Zapper' },
					// 		// { value: 'CoinGecko', name: 'CoinGecko' },
					// 		// { value: 'Etherscan', name: 'Etherscan' },
					// 	]
					// },
					// {
					// 	groupId: 'auto',
					// 	name: 'Auto',
					// 	options: [
					// 		{ value: 'auto', name: 'Auto' },
					// 	]
					// }
				]
			},
			/*{
				preferenceId: 'historicalPriceProvider',
				name: 'Historical Price',
				type: 'single', // 'multiple'
				defaultOption: '',
				options: [
					// {
					// 	groupId: 'onChain',
					// 	name: 'On-Chain',
					// 	options: [
					//	{ value: PriceProvider.Chainlink, name: 'Chainlink' },
					// 	]
					// },
					{
						groupId: 'offChain',
						name: 'Off-Chain',
						options: [
							// { value: PriceProvider.Covalent, name: 'Covalent' },
							// { value: 'The Graph', name: 'The Graph' },
							// { value: 'Zapper', name: 'Zapper' },
							// { value: 'CoinGecko', name: 'CoinGecko' },
							// { value: 'Etherscan', name: 'Etherscan' },
							// { value: 'TradingView', name: 'TradingView' },
						]
					}
				]
			},*/
			{
				preferenceId: 'quoteCurrency',
				name: 'Currency',
				type: 'single',
				defaultOption: 'USD',
				options: [
					{
						groupId: 'fiat',
						name: 'Fiat Currencies',
						options: Object.values(fiatQuoteCurrencies).map(currency => ({
							value: currency.isoCode,
							name: `${currency.name} (${currency.symbol})`,
						}))
					},
					{
						groupId: 'crypto',
						name: 'Cryptocurrencies',
						options: Object.values(cryptoQuoteCurrencies).map(currency => ({
							value: currency.isoCode,
							name: `${currency.name} (${currency.symbol})`,
						}))
					}
				]
			}
		]
	},
	{
		sectionId: 'contentNetworks',
		name: 'Content Networks',
		preferences: [
			{
				preferenceId: 'ipfsGateway',
				name: 'IPFS Gateway',
				type: 'single',
				defaultOption: ipfsGateways[1].gatewayProvider,
				options: [
					{
						groupId: 'local',
						name: 'Local',
						options: [
							...ipfsGateways
								.filter(ipfsGateway => ipfsGateway.gatewayDomain === 'local')
								.map(ipfsGateway => ({
									value: ipfsGateway.gatewayProvider,
									name: `${ipfsGateway.name} (${ipfsGateway.gatewayDomain})`,
								})),
						]
					},
					{
						groupId: 'hosted',
						name: 'Hosted',
						options: [
							...ipfsGateways
								.filter(ipfsGateway => ipfsGateway.gatewayDomain !== 'local')
								.map(ipfsGateway => ({
									value: ipfsGateway.gatewayProvider,
									name: `${ipfsGateway.name} (${ipfsGateway.gatewayDomain})`,
								})),
						]
					}
				]
			},
			{
				preferenceId: 'arweaveGateway',
				name: 'Arweave Gateway',
				type: 'single',
				defaultOption: arweaveGateways[0],
				options: [
					...arweaveGateways.map(url => ({
						value: url,
						name: url,
					})),
				]
			},
			{
				preferenceId: 'farcasterProvider',
				name: 'Farcaster Source',
				type: 'single',
				defaultOption: FarcasterProvider.Neynar,
				options: [
					// {
					// 	groupId: 'hubs',
					// 	name: 'Hubs',
					// 	options: [
					// 		{
					// 			value: 'Coming soon...',
					// 			name: 'Coming soon...',
					// 			disabled: true,
					// 		}
					// 	]
					// },
					{
						groupId: 'indexers',
						name: 'Indexers',
						options: [
							{
								value: FarcasterProvider.Airstack,
								name: FarcasterProvider.Airstack,
							},
							{
								value: FarcasterProvider.Neynar,
								name: FarcasterProvider.Neynar,
							},
							{
								value: FarcasterProvider.Pinata,
								name: FarcasterProvider.Pinata,
							},
						],
					},
				]
			},
			{
				preferenceId: 'farcasterFeedProvider',
				name: 'Farcaster Feed',
				type: 'single',
				defaultOption: FarcasterFeedProvider.OpenRank,
				options: [
					{
						groupId: 'algorithms',
						name: 'Algorithms',
						options: [
							{
								value: FarcasterFeedProvider.OpenRank,
								name: FarcasterFeedProvider.OpenRank,
							},
						],
					},
					{
						groupId: 'indexers',
						name: 'Indexers',
						options: [
							{
								value: 'indexer',
								name: (preferences: any) => `Indexer (${preferences.farcasterProvider})`,
							},
							{
								value: FarcasterFeedProvider.Airstack,
								name: FarcasterFeedProvider.Airstack,
							},
							{
								value: FarcasterFeedProvider.Neynar,
								name: FarcasterFeedProvider.Neynar,
							},
							{
								value: FarcasterFeedProvider.Pinata,
								name: FarcasterFeedProvider.Pinata,
							},
						],
					},
				]
			},
			{
				preferenceId: 'urlMetadataProvider',
				// name: 'URL Metadata',
				name: 'URLs/Frames',
				type: 'single',
				defaultOption: UrlMetadataProvider.ModProtocol,
				options: [
					{
						groupId: 'none',
						name: 'None',
						options: [
							{
								value: undefined,
								name: 'None',
							},
						]
					},
					{
						groupId: 'crawlers',
						name: 'OpenGraph Crawlers',
						options: [
							{
								value: UrlMetadataProvider.ModProtocol,
								name: UrlMetadataProvider.ModProtocol,
							},
						]
					},
				],
			},
		]
	},
	// {
	// 	sectionId: 'web3',
	// 	name: 'Web 3.0',
	// 	preferences: [
	// 		{
	// 			preferenceId: 'skynetPortal',
	// 			name: 'Skynet Portal',
	// 			type: 'single',
	// 			defaultOption: 'siasky.net',
	// 			options: [
	// 				{ value: 'siasky.net', name: 'siasky.net' }
	// 			]
	// 		},
	// 		{
	// 			preferenceId: 'theGraphGateway',
	// 			name: 'The Graph Gateway',
	// 			type: 'single',
	// 			defaultOption: 'api.thegraph.com',
	// 			options: [
	// 				{ value: 'api.thegraph.com', name: 'api.thegraph.com' }
	// 			]
	// 		},
	// 	]
	// },
] as const satisfies DeepReadonly<Preferences.Config>

// (Derived types)
export type PreferencesConfig = typeof preferencesConfig
export type PreferenceSection = PreferencesConfig[number]
export type Preference = PreferenceSection['preferences'][number]
export type PreferenceId = Preference['preferenceId']
export type PreferenceOption = Preference['options'][number]

// (Functions)
const extractOptionValues = <T extends Preferences.Options>(options: T): Preferences.Value[] => (
	options.flatMap(optionOrGroup => (
		'groupId' in optionOrGroup
			? extractOptionValues(optionOrGroup.options)
			: optionOrGroup.value
	))
) satisfies Preferences.ExtractOptionValues<T>[]


// State
type PreferencesState = UnionToObject<{
	[i in Indices<PreferencesConfig> as PreferencesConfig[i]['sectionId']]: {
		[j in Indices<PreferencesConfig[i]['preferences']> as PreferencesConfig[i]['preferences'][j]['preferenceId']]:
			Preferences.ExtractOptionValues<PreferencesConfig[i]['preferences'][j]['options']>
	}
}[PreferencesConfig[number]['sectionId']]>

import { localStorageWritable } from '$/utils/localStorageWritable'

// (Functions)
const resolveDefaultPreferences = (preferences?: Partial<PreferencesState>): PreferencesState => (
	Object.fromEntries(
		preferencesConfig
			.flatMap(section => (
				section.preferences
					.map(preference => [
						preference.preferenceId,
						extractOptionValues(preference.options).includes(preferences?.[preference.preferenceId])
							&& preferences?.[preference.preferenceId]
							|| preference.defaultOption
					])
			))
	)
)

// (Stores - V1)
// export const rpcNetwork = localStorageWritable<NetworkProvider>('preferred-ethereum-provider', 'Ethers')
// export const transactionProvider = localStorageWritable<TransactionProvider>('preferred-transaction-provider', TransactionProvider.Etherspot)
// export const defiProvider = localStorageWritable<DefiProvider>('preferred-defi-provider', DefiProvider.Zapper)
// export const currentPriceProvider = localStorageWritable<PriceProvider>('preferred-price-feed-provider', PriceProvider.Chainlink)
// export const analyticsProvider = localStorageWritable<AnalyticsProvider>('preferred-analytics-provider', 'Covalent')
// export const quoteCurrency = localStorageWritable<QuoteCurrency>('preferred-quote-currency', 'USD')
// export const theme = localStorageWritable<'auto' | 'dark' | 'light'>('preferred-color-scheme', 'auto')

// (Stores - V2)
export const preferences = localStorageWritable<PreferencesState>(
	'localPreferences',
	resolveDefaultPreferences(),
)

preferences.update(resolveDefaultPreferences)

// (Actions)
export const resetPreferences = () => preferences.set(resolveDefaultPreferences())
