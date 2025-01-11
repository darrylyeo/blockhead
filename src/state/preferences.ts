// Type functions
import type { DeepReadonly } from '$/utils/DeepReadonly'
import type { Indices } from '$/utils/Indices'
import type { UnionToObject } from '$/utils/UnionToObject'


// External constants
import type { Ethereum } from '$/data/networks/types'
import { cryptoQuoteCurrencies, fiatQuoteCurrencies } from '$/data/currencies'
import { tokenIcons } from '$/assets/tokenIcons'
import { NetworkProvider } from '$/data/networkProviders/types'
import { networkProviderConfigs, networkProviderConfigByProvider } from '$/data/networkProviders'
import { Erc20TokenProvider, erc20TokenProviders } from '$/data/erc20TokenProviders'
import { TokenBalancesProvider, tokenBalancesProviders } from '$/data/tokenBalancesProviders'
import { FilecoinTokenBalancesProvider, filecoinTokenBalancesProviderIcons } from '$/data/filecoinTokenBalancesProviders'
import { DefiProvider, defiProviders } from '$/data/defiProviders'
import { NftProvider, nftProviders } from '$/data/nftProviders'
import { PriceProvider, HistoricalPriceProvider, priceProviders } from '$/data/priceProviders'
import { TransactionProvider, transactionProviderIcons } from '$/data/transactionProviders'
import { FilecoinTransactionProvider, filecoinTransactionProviderIcons } from '$/data/filecoinTransactionProviders'
import { ContractSourceProvider, contractSourceProviders } from '$/data/contractSourceProviders'
import { NotificationsProvider, notificationsProviderIcons } from '$/data/notificationsProviders'
import { IpfsGatewayProvider, ipfsGateways } from '$/data/ipfsGateways'
import { arweaveGateways } from '$/data/arweaveGateways'
import { FarcasterProvider, farcasterProviders } from '$/data/farcasterProviders'
import { FarcasterFeedProvider, farcasterFeedProviders } from '$/data/farcasterFeedProviders'
import { UrlMetadataProvider, urlMetadataProviderIcons } from '$/data/urlMetadataProviders'
import { EasProvider, easProviderIcons } from '$/api/eas/provider'
import { MoxieProvider, moxieProviderIcons } from '$/api/moxie/provider'


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
		icon?: string | ((preferences: any /* PreferencesState */) => string),
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
				defaultOption: 'auto',
				options: [
					{ value: 'auto', name: () => `Auto (${get(prefersReducedMotion) ? 'Disabled' : 'Enabled'})` },
					{ value: 'enabled', name: 'Enabled' },
					{ value: 'disabled', name: 'Disabled' }
				]
			},
			{
				preferenceId: 'scrollSnap',
				name: 'Scroll Snapping',
				type: 'single',
				defaultOption: 'enabled',
				options: [
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
			// 		{ value: 'Covalent', name: 'Covalent › GoldRush' },
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
				name: 'Node Client',
				type: 'single', // 'multiple',
				defaultOption: NetworkProvider.Default,
				options: [
					{
						groupId: 'default',
						name: 'Per-Network',
						options: [
							{
								value: NetworkProvider.Default,
								name: 'Default',
								icon: networkProviderConfigByProvider[NetworkProvider.Default]?.icon,
							},
						],
					},
					{
						groupId: 'nodeServices',
						name: 'Node Services',
						options: (
							networkProviderConfigs
								.filter(providerConfig => providerConfig.provider !== NetworkProvider.Default)
								.sort((a, b) => a.name.localeCompare(b.name))
								.map(providerConfig => ({
									value: providerConfig.provider,
									name: providerConfig.name,
									icon: providerConfig.icon,
								}))
						),
					},
				],
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
			// {
			// 	preferenceId: 'transactionRelay',
			// 	name: 'Transaction Relay',
			// 	type: 'single', // 'multiple',
			// 	defaultOption: 'Ethers',
			// 	options: [
			// 		{ value: 'Ethers', name: 'Ethers Quorum' }, // (Infura + Etherscan + Alchemy + Pocket)
			// 		{ value: 'Pocket Network', name: 'Pocket Network', icon: networkProviderConfigByProvider[NetworkProvider.PocketNetwork].icon },
			// 		{ value: 'Alchemy', name: 'Alchemy', icon: networkProviderConfigByProvider[NetworkProvider.Alchemy].icon },
			// 		{ value: 'Infura', name: 'Infura', icon: networkProviderConfigByProvider[NetworkProvider.Infura]?.icon },
			// 		{ value: 'Moralis', name: 'Moralis', icon: networkProviderConfigByProvider[NetworkProvider.Moralis].icon }
			// 	]
			// },
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
							{ value: TransactionProvider.RpcProvider, name: (preferences: any) => `Node Client (${preferences.rpcNetwork})`, icon: (preferences: any) => networkProviderConfigByProvider[preferences.rpcNetwork]?.icon },
						]
					},
					{
						groupId: 'offChain',
						name: 'Off-Chain',
						options: [
							{ value: TransactionProvider.Blockscout, name: 'Blockscout › REST API', icon: transactionProviderIcons[TransactionProvider.Blockscout] },
							{ value: TransactionProvider.Chainbase, name: 'Chainbase', icon: transactionProviderIcons[TransactionProvider.Chainbase] },
							{ value: TransactionProvider.Covalent, name: 'Covalent › GoldRush', icon: transactionProviderIcons[TransactionProvider.Covalent] },
							{ value: TransactionProvider.Curvegrid_Multibaas, name: 'Curvegrid › MultiBaas', icon: transactionProviderIcons[TransactionProvider.Curvegrid_Multibaas] },
							{ value: TransactionProvider.Decommas, name: 'Decommas', icon: transactionProviderIcons[TransactionProvider.Decommas] },
							{ value: TransactionProvider.Etherscan, name: 'Etherscan', icon: transactionProviderIcons[TransactionProvider.Etherscan] },
							{ value: TransactionProvider.Moralis, name: 'Moralis', icon: transactionProviderIcons[TransactionProvider.Moralis] },
							// { value: TransactionProvider.Etherspot, name: 'Etherspot', icon: transactionProviderIcons[TransactionProvider.Etherspot] },
							{ 
								value: TransactionProvider.Noves,
								name: 'Noves',
								icon: transactionProviderIcons[TransactionProvider.Noves]
							}
						]
					}
				]
			},
			{
				preferenceId: 'filecoinTransactionProvider',
				name: 'Transactions/Blocks (Filecoin)',
				type: 'single',
				defaultOption: FilecoinTransactionProvider.Beryx,
				options: [
					{
						groupId: 'offChain',
						name: 'Off-Chain',
						options: [
							{ value: FilecoinTransactionProvider.Beryx, name: 'Beryx', icon: filecoinTransactionProviderIcons[FilecoinTransactionProvider.Beryx] },
						]
					},
				],
			},
			{
				preferenceId: 'erc20TokenProvider',
				name: 'ERC-20 Tokens',
				type: 'single',
				defaultOption: Erc20TokenProvider.RpcProvider,
				options: [
					{
						groupId: 'onchain',
						name: 'Onchain',
						options: [
							{
								value: Erc20TokenProvider.RpcProvider,
								name: (preferences: any) => `Node Client (${preferences.rpcNetwork})`,
							},
						],
					},
					{
						groupId: 'offchain',
						name: 'Offchain',
						options: (
							Object.values(Erc20TokenProvider)
								.filter(provider => provider !== Erc20TokenProvider.RpcProvider)
								.map(provider => ({
									value: provider,
									name: provider,
									icon: erc20TokenProviders[provider].icon,
								}))
						),
					},
				],
			},
			{
				preferenceId: 'contractSourceProvider',
				name: 'Contract Source Code',
				type: 'single',
				defaultOption: ContractSourceProvider.Blockscout,
				options: [
					{
						groupId: 'web3',
						name: 'Web3 Hosted',
						options: (
							([
								ContractSourceProvider.Sourcify,
							] as const)
								.map(provider => ({
									value: provider,
									name: contractSourceProviders[provider].name,
									icon: contractSourceProviders[provider].icon,
								}))
						),
					},
					{
						groupId: 'centralized',
						name: 'Centrally Hosted',
						options: (
							([
								ContractSourceProvider.Blockscout,
								ContractSourceProvider.Curvegrid_Multibaas,
								ContractSourceProvider.Etherscan,
								// ContractSourceProvider.Tenderly,
							] as const)
								.map(provider => ({
									value: provider,
									name: contractSourceProviders[provider].name,
									icon: contractSourceProviders[provider].icon,
								}))
						),
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
				defaultOption: TokenBalancesProvider.ZapperGraphql,
				options: [
					{
						groupId: 'onChain',
						name: 'On-Chain',
						options: [
							{ value: TokenBalancesProvider.RpcProvider, name: (preferences: any) => `On-Chain (${preferences.rpcNetwork})` }, // 'RPC Provider + Token List'
							...[
								TokenBalancesProvider.Alchemy_Liquality,
								TokenBalancesProvider.QuickNode,
							].map(provider => ({
								value: provider,
								name: tokenBalancesProviders[provider].name,
								icon: tokenBalancesProviders[provider].icon,
							})),
						]
					},
					{
						groupId: 'offChain',
						name: 'Off-Chain',
						options: (
							([
								// TokenBalancesProvider.Airstack,
								TokenBalancesProvider.Blockscout,
								TokenBalancesProvider.Chainbase,
								TokenBalancesProvider.Covalent,
								TokenBalancesProvider.Decommas,
								TokenBalancesProvider.LlamaFolio,
								TokenBalancesProvider.Moralis,
								TokenBalancesProvider.Nexandria,
								TokenBalancesProvider.Noves,
								TokenBalancesProvider.OneInch_Balance,
								TokenBalancesProvider.ZapperGraphql,
								TokenBalancesProvider.ZapperRest,
							] as const)
								.map(provider => ({
									value: provider,
									name: tokenBalancesProviders[provider].name,
									icon: tokenBalancesProviders[provider].icon,
								}))
						),
					}
				]
			},
			{
				preferenceId: 'filecoinTokenBalancesProvider',
				name: 'Token Balances (Filecoin)',
				type: 'single',
				defaultOption: FilecoinTokenBalancesProvider.Beryx,
				options: [
					{
						groupId: 'onChain',
						name: 'On-Chain',
						options: [
							{ value: FilecoinTokenBalancesProvider.Beryx, name: (preferences: any) => `On-Chain (${preferences.rpcNetwork})` },
						]
					},
					{
						groupId: 'offChain',
						name: 'Off-Chain',
						options: [
							{ value: FilecoinTokenBalancesProvider.Beryx, name: 'Beryx', icon: filecoinTokenBalancesProviderIcons[FilecoinTokenBalancesProvider.Beryx] },
						],
					},
				]
			},
			{
				preferenceId: 'defiProvider',
				name: 'DeFi Positions',
				type: 'single',
				defaultOption: DefiProvider.ZapperGraphql,
				options: [
					{
						groupId: 'onChain',
						name: 'On-Chain',
						options: (
							([
								DefiProvider.ZerionDefiSdk,
							] as const)
								.map(provider => ({
									value: provider,
									name: defiProviders[provider].name,
									icon: defiProviders[provider].icon,
								}))
						)
					},
					{
						groupId: 'offChain',
						name: 'Off-Chain',
						options: (
							([
								DefiProvider.LlamaFolio,
								DefiProvider.ZapperGraphql,
								DefiProvider.ZapperRest,
							] as const)
								.map(provider => ({
									value: provider,
									name: defiProviders[provider].name,
									icon: defiProviders[provider].icon,
								}))
						)
					}
				]
			},
			{
				preferenceId: 'nftProvider',
				name: 'NFTs',
				type: 'single',
				defaultOption: NftProvider.Blockscout,
				options: [
					{
						groupId: 'onChain',
						name: 'On-Chain',
						options: (
							[
								NftProvider.Liquality,
							]
								.map(provider => ({
									value: provider,
									name: nftProviders[provider].name,
									icon: nftProviders[provider].icon,
								}))
						),
					},
					{
						groupId: 'offChain',
						name: 'Off-Chain',
						options: (
							[
								// NftProvider.Airstack,
								NftProvider.Blockscout,
								NftProvider.Chainbase,
								NftProvider.Covalent,
								NftProvider.Decommas,
								NftProvider.NftPort,
								// NftProvider.Zapper,
								// NftProvider.Moralis,
							]
								.map(provider => ({
									value: provider,
									name: nftProviders[provider].name,
									icon: nftProviders[provider].icon,
								}))
						),
					},
				],
			},
			{
				preferenceId: 'notificationsProvider',
				name: 'Notifications',
				type: 'single',
				defaultOption: NotificationsProvider.Push,
				options: [
					{ value: NotificationsProvider.Push, name: 'Push', icon: notificationsProviderIcons[NotificationsProvider.Push] },
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
				defaultOption: PriceProvider.CoinPaprika,
				// defaultOption: 'auto',
				options: [
					{
						groupId: 'onChain',
						name: 'On-Chain',
						options: (
							[
								PriceProvider.Chainlink,
								// PriceProvider.CompoundOpenPriceFeed,
								// PriceProvider.Tellor,
								// PriceProvider.Umbrella,
							]
								.map(provider => ({
									value: provider,
									name: priceProviders[provider].name,
									icon: priceProviders[provider].icon,
								}))
						),
					},
					{
						groupId: 'offChain',
						name: 'Off-Chain',
						options: (
							[
								PriceProvider.CoinApi,
								PriceProvider.CoinGecko_Zapper,
								PriceProvider.CoinPaprika,
								PriceProvider.Covalent,
								PriceProvider.Etherscan,
								PriceProvider.QuickNode_Odos,
								PriceProvider.OneInch_SpotPrice,
								// PriceProvider.Moralis,
							]
								.map(provider => ({
									value: provider,
									name: priceProviders[provider].name,
									icon: priceProviders[provider].icon,
								}))
						)
					},
					// {
					// 	groupId: 'auto',
					// 	name: 'Auto',
					// 	options: [
					// 		{ value: 'auto', name: 'Auto' },
					// 	]
					// },
				]
			},
			{
				preferenceId: 'historicalPriceProvider',
				name: 'Historical Price',
				type: 'single', // 'multiple'
				defaultOption: HistoricalPriceProvider.Covalent,
				options: [
					{
						groupId: 'offChain',
						name: 'Off-Chain',
						options: (
							[
								HistoricalPriceProvider.CoinPaprika,
								HistoricalPriceProvider.Covalent,
								HistoricalPriceProvider.OneInch_Charts,
							]
								.map(provider => ({
									value: provider,
									name: priceProviders[provider].name,
									icon: priceProviders[provider].icon,
								}))
						),
					}
				]
			},
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
							icon: tokenIcons[currency.isoCode],
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
				defaultOption: IpfsGatewayProvider.ProtocolLabsIpfsIo,
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
									icon: ipfsGateway.icon,
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
									icon: ipfsGateway.icon,
								})),
						]
					}
				]
			},
			{
				preferenceId: 'arweaveGateway',
				name: 'Arweave Gateway',
				type: 'single',
				defaultOption: arweaveGateways[0].gatewayDomain,
				options: [
					...arweaveGateways.map(arweaveGateway => ({
						value: arweaveGateway.gatewayDomain,
						name: `${arweaveGateway.name} (${arweaveGateway.gatewayDomain})`,
						icon: arweaveGateway.icon,
					})),
				]
			},
			{
				preferenceId: 'farcasterProvider',
				name: 'Farcaster Source',
				type: 'single',
				defaultOption: FarcasterProvider.Pinata,
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
						options: (
							([
								FarcasterProvider.Airstack,
								FarcasterProvider.Neynar,
								FarcasterProvider.Pinata,
							] as const)
								.map(provider => ({
									value: provider,
									name: farcasterProviders[provider].name,
									icon: farcasterProviders[provider].icon,
								}))
						),
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
						options: (
							([
								FarcasterFeedProvider.OpenRank,
							] as const)
								.map(provider => ({
									value: provider,
									name: farcasterFeedProviders[provider].name,
									icon: farcasterFeedProviders[provider].icon,
								}))
						),
					},
					{
						groupId: 'indexers',
						name: 'Indexers',
						options: [
							{
								value: 'indexer',
								name: (preferences: any) => `Indexer (${farcasterProviders[preferences.farcasterProvider].name})`,
							},
							...(
								([
									FarcasterFeedProvider.Airstack,
									FarcasterFeedProvider.Neynar,
									FarcasterFeedProvider.Pinata,
								] as const)
									.map(provider => ({
										value: provider,
										name: farcasterFeedProviders[provider].name,
										icon: farcasterFeedProviders[provider].icon,
									}))
							),
						],
					},
				]
			},
			{
				preferenceId: 'urlMetadataProvider',
				// name: 'URL Metadata',
				name: 'URLs/Frames',
				type: 'single',
				defaultOption: UrlMetadataProvider.MetadataVision,
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
								value: UrlMetadataProvider.MetadataVision,
								name: UrlMetadataProvider.MetadataVision,
								icon: urlMetadataProviderIcons[UrlMetadataProvider.MetadataVision],
							},
							{
								value: UrlMetadataProvider.ModProtocol,
								name: UrlMetadataProvider.ModProtocol,
								icon: urlMetadataProviderIcons[UrlMetadataProvider.ModProtocol],
							},
						]
					},
				],
			},
		]
	},
	{
		sectionId: 'social',
		name: 'Social',
		preferences: [
			{
				preferenceId: 'moxieProvider',
				name: 'Moxie Provider',
				type: 'single',
				defaultOption: MoxieProvider.TheGraph,
				options: (
					Object.values(MoxieProvider)
						.map(provider => ({
							value: provider,
							name: provider,
							icon: moxieProviderIcons[provider],
						}))
				)
			}
		]
	},
	{
		sectionId: 'attestations',
		name: 'Attestations',
		preferences: [
			{
				preferenceId: 'easProvider',
				name: 'Ethereum Attestation Service',
				type: 'single',
				defaultOption: EasProvider.Easscan,
				options: (
					Object.values(EasProvider)
						.map(provider => ({
							value: provider,
							name: provider,
							icon: easProviderIcons[provider],
						}))
				)
			}
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
// export const defiProvider = localStorageWritable<DefiProvider>('preferred-defi-provider', DefiProvider.ZapperRest)
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
