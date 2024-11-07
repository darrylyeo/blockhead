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
import { Erc20TokenProvider, erc20TokenProviderIcons } from '$/data/erc20TokenProvider'
import { TokenBalancesProvider, tokenBalancesProviderIcons } from '$/data/tokenBalancesProvider'
import { FilecoinTokenBalancesProvider, filecoinTokenBalancesProviderIcons } from '$/data/filecoinTokenBalancesProvider'
import { DefiProvider, defiProviderIcons } from '$/data/defiProviders'
import { NftProvider, nftProviderIcons } from '$/data/nftProviders'
import { PriceProvider, priceProviderIcons } from '$/data/priceProviders'
import { TransactionProvider, transactionProviderIcons } from '$/data/transactionProvider'
import { FilecoinTransactionProvider, filecoinTransactionProviderIcons } from '$/data/filecoinTransactionProvider'
import { ContractSourceProvider, contractSourceProviderIcons } from '$/data/contractSourceProvider'
import { NotificationsProvider, notificationsProviderIcons } from '$/data/notificationsProvider'
import { IpfsGatewayProvider, ipfsGateways } from '$/data/ipfsGateways'
import { arweaveGateways } from '$/data/arweaveGateways'
import { FarcasterProvider, farcasterProviderIcons } from '$/data/farcasterProviders'
import { FarcasterFeedProvider, farcasterFeedProviderIcons } from '$/data/farcasterFeedProviders'
import { UrlMetadataProvider, urlMetadataProviderIcons } from '$/data/urlMetadataProvider'
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
									icon: erc20TokenProviderIcons[provider],
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
						options: [
							{ value: ContractSourceProvider.Sourcify, name: 'Sourcify', icon: contractSourceProviderIcons[ContractSourceProvider.Sourcify] },
						]
					},
					{
						groupId: 'centralized',
						name: 'Centrally Hosted',
						options: [
							{ value: ContractSourceProvider.Blockscout, name: 'Blockscout', icon: contractSourceProviderIcons[ContractSourceProvider.Blockscout] },
							{ value: ContractSourceProvider.Etherscan, name: 'Etherscan', icon: contractSourceProviderIcons[ContractSourceProvider.Etherscan] },
							// { value: ContractSourceProvider.Tenderly, name: 'Tenderly', icon: contractSourceProviderIcons[ContractSourceProvider.Tenderly] },
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
							{ value: TokenBalancesProvider.Alchemy_Liquality, name: 'Alchemy (via Liquality)', icon: tokenBalancesProviderIcons[TokenBalancesProvider.Alchemy_Liquality] },
							{ value: TokenBalancesProvider.QuickNode, name: 'QuickNode', icon: tokenBalancesProviderIcons[TokenBalancesProvider.QuickNode] },
						]
					},
					{
						groupId: 'offChain',
						name: 'Off-Chain',
						options: [
							// { value: TokenBalancesProvider.Airstack, name: 'Airstack', icon: tokenBalancesProviderIcons[TokenBalancesProvider.Airstack] },
							{ value: TokenBalancesProvider.Blockscout, name: 'Blockscout › REST API', icon: tokenBalancesProviderIcons[TokenBalancesProvider.Blockscout] },
							{ value: TokenBalancesProvider.Chainbase, name: 'Chainbase › Token API', icon: tokenBalancesProviderIcons[TokenBalancesProvider.Chainbase] },
							{ value: TokenBalancesProvider.Covalent, name: 'Covalent › GoldRush', icon: tokenBalancesProviderIcons[TokenBalancesProvider.Covalent] },
							{ value: TokenBalancesProvider.Decommas, name: 'Decommas', icon: tokenBalancesProviderIcons[TokenBalancesProvider.Decommas] },
							{ value: TokenBalancesProvider.LlamaFolio, name: 'LlamaFolio', icon: tokenBalancesProviderIcons[TokenBalancesProvider.LlamaFolio] },
							{ value: TokenBalancesProvider.Moralis, name: 'Moralis › Web3 API', icon: tokenBalancesProviderIcons[TokenBalancesProvider.Moralis] },
							{ value: TokenBalancesProvider.Nexandria, name: 'Nexandria', icon: tokenBalancesProviderIcons[TokenBalancesProvider.Nexandria] },
							{ value: TokenBalancesProvider.Zapper, name: 'Zapper', icon: tokenBalancesProviderIcons[TokenBalancesProvider.Zapper] },
						]
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
				defaultOption: DefiProvider.Zapper,
				options: [
					{
						groupId: 'onChain',
						name: 'On-Chain',
						options: [
							{ value: DefiProvider.ZerionDefiSdk, name: DefiProvider.ZerionDefiSdk, icon: defiProviderIcons[DefiProvider.ZerionDefiSdk] }
						]
					},
					{
						groupId: 'offChain',
						name: 'Off-Chain',
						options: [
							{ value: DefiProvider.LlamaFolio, name: DefiProvider.LlamaFolio, icon: defiProviderIcons[DefiProvider.LlamaFolio] },
							{ value: DefiProvider.Zapper, name: DefiProvider.Zapper, icon: defiProviderIcons[DefiProvider.Zapper] }
						]
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
						options: [
							{ value: NftProvider.Liquality, name: 'Liquality (Alchemy)', icon: nftProviderIcons[NftProvider.Liquality] },
						]
					},
					{
						groupId: 'offChain',
						name: 'Off-Chain',
						options: [
							// { value: NftProvider.Airstack, name: 'Airstack', icon: nftProviderIcons[NftProvider.Airstack] },
							{ value: NftProvider.Blockscout, name: 'Blockscout › REST API', icon: nftProviderIcons[NftProvider.Blockscout] },
							{ value: NftProvider.Chainbase, name: 'Chainbase', icon: nftProviderIcons[NftProvider.Chainbase] },
							{ value: NftProvider.Covalent, name: 'Covalent › GoldRush', icon: nftProviderIcons[NftProvider.Covalent] },
							{ value: NftProvider.Decommas, name: 'Decommas', icon: nftProviderIcons[NftProvider.Decommas] },
							{ value: NftProvider.NftPort,  name: 'NFTPort', icon: nftProviderIcons[NftProvider.NftPort] }
							// { value: 'Zapper', name: 'Zapper', icon: nftProviderIcons[NftProvider.Zapper] },
							// { value: 'Moralis', name: 'Moralis', icon: nftProviderIcons[NftProvider.Moralis] },
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
				defaultOption: 'Chainlink', // 'auto',
				options: [
					{
						groupId: 'onChain',
						name: 'On-Chain',
						options: [
							{ value: PriceProvider.Chainlink, name: 'Chainlink', icon: priceProviderIcons[PriceProvider.Chainlink] },
							// { value: 'Tellor', name: 'Tellor' },
							// { value: 'Compound Price Feed', name: 'Open Price Feed' },
						]
					},
					{
						groupId: 'offChain',
						name: 'Off-Chain',
						options: [
							{ value: PriceProvider.CoinGecko_Zapper, name: 'CoinGecko (via Zapper)', icon: priceProviderIcons[PriceProvider.CoinGecko_Zapper] },
							{ value: PriceProvider.CoinPaprika, name: 'CoinPaprika', icon: priceProviderIcons[PriceProvider.CoinPaprika] },
							{ value: PriceProvider.Etherscan, name: 'Etherscan', icon: priceProviderIcons[PriceProvider.Etherscan] },
							{ value: PriceProvider.QuickNode_Odos, name: 'Odos (via QuickNode)', icon: priceProviderIcons[PriceProvider.QuickNode_Odos] },
							// { value: PriceProvider.Covalent, name: 'Covalent › GoldRush' },
							// { value: 'Moralis', name: 'Moralis' },
						]
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
							// { value: PriceProvider.Covalent, name: 'Covalent › GoldRush' },
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
								icon: farcasterProviderIcons[FarcasterProvider.Airstack],
							},
							{
								value: FarcasterProvider.Neynar,
								name: FarcasterProvider.Neynar,
								icon: farcasterProviderIcons[FarcasterProvider.Neynar],
							},
							{
								value: FarcasterProvider.Pinata,
								name: FarcasterProvider.Pinata,
								icon: farcasterProviderIcons[FarcasterProvider.Pinata],
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
								icon: farcasterFeedProviderIcons[FarcasterFeedProvider.OpenRank],
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
								icon: farcasterFeedProviderIcons[FarcasterFeedProvider.Airstack],
							},
							{
								value: FarcasterFeedProvider.Neynar,
								name: FarcasterFeedProvider.Neynar,
								icon: farcasterFeedProviderIcons[FarcasterFeedProvider.Neynar],
							},
							{
								value: FarcasterFeedProvider.Pinata,
								name: FarcasterFeedProvider.Pinata,
								icon: farcasterFeedProviderIcons[FarcasterFeedProvider.Pinata],
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
