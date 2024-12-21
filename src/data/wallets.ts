import type { Ethereum } from './networks/types'

type GlobalThis = typeof globalThis
export type GlobalInjectedEip1193Resolver = (globalThis: GlobalThis & { [key: string]: any }) => Ethereum.Provider | undefined

const globalEthereumResolver: GlobalInjectedEip1193Resolver = globalThis => globalThis.ethereum
const globalWeb3Resolver: GlobalInjectedEip1193Resolver = globalThis => globalThis.web3?.currentProvider


import type { Eip6963Rdns } from '$/state/wallets'
import { WalletConnectionType } from './walletConnectionTypes'

export enum KnownWalletType {
	// BananaWallet = 'BananaWallet',
	CoinbaseWallet = 'Coinbase Wallet',
	Coin98 = 'Coin98',
	Enkrypt = 'Enkrypt',
	Frame = 'Frame',
	Intmax = 'Intmax',
	Liquality = 'Liquality',
	MetaMask = 'MetaMask',
	MEW = 'MEW',
	Phantom = 'Phantom',
	Rabby = 'Rabby',
	Rainbow = 'Rainbow',
	Rivet = 'Rivet',
	Taho = 'Taho',
	Trust = 'Trust',
	UniswapExtension = 'Uniswap Extension',
	WalletConnect1 = 'WalletConnect1',
	WalletConnect2 = 'WalletConnect2',
	Web3Modal = 'Web3Modal',
}

export type KnownWalletConfig = {
	type: KnownWalletType
	name: string
	icon: string
	colors: string[]

	connectionTypes: (
		| {
			type: WalletConnectionType.InjectedEip1193
			globalResolvers: GlobalInjectedEip1193Resolver[]
			matches?: (provider: Ethereum.Provider & { [key: `is${string}`]: boolean }) => boolean
		}
		| {
			type: WalletConnectionType.Eip6963
			rdns: Eip6963Rdns
		}
		| {
			type: WalletConnectionType.WalletConnect1
			mobileLinks?: string[]
		}
		| {
			type: WalletConnectionType.WalletConnect2
			explorerIds?: string[]
		}
		| {
			type: WalletConnectionType.Web3Modal
		}
		| {
			type: WalletConnectionType.CoinbaseWalletSDK
		}
		| {
			type: WalletConnectionType.WebmaxJs
		}
		// | {
		// 	type: WalletConnectionType.BananaWalletSdk
		// }
	)[]
}


import {
	// BananaWalletIcon,
	Coin98Icon,
	CoinbaseWalletIcon,
	EnkryptIcon,
	FrameIcon,
	IntmaxIcon,
	MetaMaskIcon,
	MyEtherWalletIcon,
	PhantomIcon,
	RabbyIcon,
	RainbowIcon,
	RivetIcon,
	TahoIcon,
	TrustWalletIcon,
	UniswapExtensionIcon,
	WalletConnect2Icon,
	WalletConnectIcon,
} from '$/assets/walletIcons'

import { LiqualityIcon } from '$/assets/icons'

export const knownWallets = [
	{
		type: KnownWalletType.MetaMask,
		name: 'MetaMask',
		icon: MetaMaskIcon,
		colors: [
			'#e27625',
		],

		connectionTypes: [
			{
				type: WalletConnectionType.Eip6963,
				rdns: 'io.metamask',
			},
			{
				type: WalletConnectionType.InjectedEip1193,
				globalResolvers: [
					globalEthereumResolver,
					globalWeb3Resolver,
				],
				matches: provider => provider.isMetaMask === true && Object.keys(provider).filter(key => /^is[A-Z]/.test(key)).length === 1,
			},
			{
				type: WalletConnectionType.WalletConnect2,
				explorerIds: ['c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96'],
			},
			{
				type: WalletConnectionType.WalletConnect1,
				mobileLinks: ['metamask'],
			},
		],
	},
	{
		type: KnownWalletType.WalletConnect2,
		// name: 'WalletConnect 2.0',
		name: 'WalletConnect',
		icon: WalletConnect2Icon,
		colors: [
			'#3083fc',
		],

		connectionTypes: [
			{
				type: WalletConnectionType.WalletConnect2,
			},
		],
	},
	{
		type: KnownWalletType.WalletConnect1,
		name: 'WalletConnect 1.0',
		icon: WalletConnectIcon,
		colors: [
			'#3083fc',
		],

		connectionTypes: [
			{
				type: WalletConnectionType.WalletConnect1,
			},
		],
	},
	// {
	// 	type: KnownWalletType.BananaWallet,
	// 	name: 'Banana Wallet',
	// 	icon: BananaWalletIcon,
	// 	colors: [
	// 		'#ffcf4a',
	// 		'#f8b42c',
	// 		// '#e67f1c',
	// 		// '#b95300',
	// 	],

	// 	connectionTypes: [
	// 		{
	// 			type: WalletConnectionType.BananaWalletSdk,
	// 		},
	// 	],
	// },
	{
		type: KnownWalletType.CoinbaseWallet,
		name: 'Coinbase Wallet',
		icon: CoinbaseWalletIcon,
		colors: [
			'#1652f0',
		],

		connectionTypes: [
			{
				type: WalletConnectionType.Eip6963,
				rdns: 'com.coinbase.wallet',
			},
			{
				type: WalletConnectionType.InjectedEip1193,
				globalResolvers: [
					globalThis => globalThis.coinbaseWalletExtension,
					globalThis => globalThis.coinbaseWalletRequestProvider?.provide(),
					globalEthereumResolver,
					globalWeb3Resolver,
				],
				matches: provider => provider.isCoinbaseWallet === true,
			},
			{
				type: WalletConnectionType.CoinbaseWalletSDK,
			},
			{
				type: WalletConnectionType.WalletConnect2,
				explorerIds: ['fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa'],
			},
			{
				type: WalletConnectionType.WalletConnect1,
			},
		],
	},
	{
		type: KnownWalletType.Coin98,
		name: 'Coin98',
		icon: Coin98Icon,
		colors: [
			'#f1d961',
			'#cda146',
		],

		connectionTypes: [
			{
				type: WalletConnectionType.Eip6963,
				rdns: 'coin98.com',
			},
			{
				type: WalletConnectionType.InjectedEip1193,
				globalResolvers: [
					globalThis => globalThis.coin98?.provider,
					globalEthereumResolver,
					globalWeb3Resolver,
				],
				matches: provider => provider.isCoin98 === true,
			},
			{
				type: WalletConnectionType.WalletConnect2,
			},
			{
				type: WalletConnectionType.WalletConnect1,
			},
		],
	},
	{
		type: KnownWalletType.Enkrypt,
		name: 'Enkrypt',
		icon: EnkryptIcon,
		colors: [
			'#c549ff',
			'#654bff',
		],

		connectionTypes: [
			{
				type: WalletConnectionType.Eip6963,
				rdns: 'com.enkrypt',
			},
			{
				type: WalletConnectionType.InjectedEip1193,
				globalResolvers: [
					globalThis => globalThis.enkrypt?.providers?.ethereum,
					globalEthereumResolver,
					globalWeb3Resolver,
				],
				matches: provider => provider.isEnkrypt === true,
			},
			{
				type: WalletConnectionType.WalletConnect2,
			},
			{
				type: WalletConnectionType.WalletConnect1,
			},
		],
	},
	{
		type: KnownWalletType.Frame,
		name: 'Frame',
		icon: FrameIcon,
		colors: [
			'#28272a',
			'#00d2be',
		],

		connectionTypes: [
			{
				type: WalletConnectionType.Eip6963,
				rdns: 'sh.frame',
			},
			{
				type: WalletConnectionType.InjectedEip1193,
				globalResolvers: [
					globalEthereumResolver,
					globalWeb3Resolver,
				],
				matches: provider => provider.isFrame === true,
			},
			{
				type: WalletConnectionType.WalletConnect2,
			},
			{
				type: WalletConnectionType.WalletConnect1,
			},
		],
	},
	{
		type: KnownWalletType.Intmax,
		name: 'IntmaxWallet',
		icon: IntmaxIcon,
		colors: [
			'#14ded2',
			'#3680fe',
			'#d32dfd',
		],

		connectionTypes: [
			{
				type: WalletConnectionType.WebmaxJs,
			},
		],
	},
	{
		type: KnownWalletType.Liquality,
		name: 'Liquality Wallet',
		icon: LiqualityIcon,
		colors: [
			'#1ce5c3',
			'#5440d7',
			'#8b2ce4',
			'#d421eb',
			'#ac39fd',
		],

		connectionTypes: [
			{
				type: WalletConnectionType.InjectedEip1193,
				globalResolvers: [
					globalEthereumResolver,
					globalWeb3Resolver,
				],
				matches: provider => provider.isLiquality === true,
			},
		],
	},
	{
		type: KnownWalletType.MEW,
		name: 'MyEtherWallet',
		icon: MyEtherWalletIcon,
		colors: [
			'#1896a4',
		],

		connectionTypes: [
			{
				type: WalletConnectionType.InjectedEip1193,
				globalResolvers: [
					globalEthereumResolver,
					globalWeb3Resolver,
				],
				matches: provider => provider.isMew === true,
			},
			{
				type: WalletConnectionType.WalletConnect2,
				explorerIds: ['f5b4eeb6015d66be3f5940a895cbaa49ef3439e518cd771270e6b553b48f31d2'],
			},
			{
				type: WalletConnectionType.WalletConnect1,
				mobileLinks: ['mew'],
			},
		],
	},
	{
		type: KnownWalletType.Phantom,
		name: 'Phantom',
		icon: PhantomIcon,
		colors: [
			'#9886e5',
			// '#ab9ff2',
		],

		connectionTypes: [
			{
				type: WalletConnectionType.Eip6963,
				rdns: 'app.phantom',
			},
			{
				type: WalletConnectionType.InjectedEip1193,
				globalResolvers: [
					globalThis => globalThis.phantom?.ethereum,
					globalEthereumResolver,
					globalWeb3Resolver,
				],
				matches: provider => provider.isPhantom === true,
			},
			{
				type: WalletConnectionType.WalletConnect2,
			},
			{
				type: WalletConnectionType.WalletConnect1,
			},
		],
	},
	{
		type: KnownWalletType.Rabby,
		name: 'Rabby',
		icon: RabbyIcon,
		colors: [
			'#7084FF',
			'#8697FF',
			// '#D1D8FF',
		],

		connectionTypes: [
			{
				type: WalletConnectionType.Eip6963,
				rdns: 'io.rabby',
			},
			{
				type: WalletConnectionType.InjectedEip1193,
				globalResolvers: [
					globalEthereumResolver,
					globalWeb3Resolver,
				],
				matches: provider => provider.isRabby,
			},
		],
	},
	{
		type: KnownWalletType.Rainbow,
		name: 'Rainbow',
		icon: RainbowIcon,
		colors: [
			'#001e59',
			'#8754c9',
			'#ff4000',
			'#ff9901',
			'#fff700',
			'#01da40',
			'#00aaff',
			'#174299',
		],

		connectionTypes: [
			{
				type: WalletConnectionType.Eip6963,
				rdns: 'me.rainbow',
			},
			{
				type: WalletConnectionType.InjectedEip1193,
				globalResolvers: [
					globalThis => globalThis.rainbow,
					globalEthereumResolver,
					globalWeb3Resolver,
				],
				matches: provider => provider.isRainbow === true,
			},
			{
				type: WalletConnectionType.WalletConnect2,
				explorerIds: ['1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369'],
			},
			{
				type: WalletConnectionType.WalletConnect1,
			},
		],
	},
	{
		type: KnownWalletType.Rivet,
		name: 'Rivet',
		icon: RivetIcon,
		colors: [
			'#3e7ce1',
		],

		connectionTypes: [
			{
				type: WalletConnectionType.Eip6963,
				rdns: 'et.riv',
			},
			{
				type: WalletConnectionType.InjectedEip1193,
				globalResolvers: [
					globalEthereumResolver,
					globalWeb3Resolver,
				],
			},
			{
				type: WalletConnectionType.WalletConnect2,
			},
			{
				type: WalletConnectionType.WalletConnect1,
			},
		],
	},
	{
		type: KnownWalletType.Taho,
		name: 'Taho',
		icon: TahoIcon,
		colors: [
			'#d08e39',
			'#002522',
		],

		connectionTypes: [
			{
				type: WalletConnectionType.InjectedEip1193,
				globalResolvers: [
					globalThis => globalThis.tally,
					globalEthereumResolver,
					globalWeb3Resolver,
				],
				matches: provider => provider.isTaho && provider.isTally,
			},
			{
				type: WalletConnectionType.WalletConnect2,
				explorerIds: ['cf14642fb8736a99b733ada71863241c823743b16e2a822b3dba24e2fa25014d'],
			},
			{
				type: WalletConnectionType.WalletConnect1,
				mobileLinks: ['tally'],
			},
		],
	},
	{
		type: KnownWalletType.Trust,
		name: 'Trust',
		icon: TrustWalletIcon,
		colors: [
			'#0000ff',
			'#0094ff',
			'#48ff91',
			'#0094ff',
			'#0038ff',
			'#0500ff',
		],

		connectionTypes: [
			{
				type: WalletConnectionType.Eip6963,
				rdns: 'com.trustwallet.app',
			},
			{
				type: WalletConnectionType.InjectedEip1193,
				globalResolvers: [
					globalThis => globalThis.trustwallet,
					globalEthereumResolver,
					globalWeb3Resolver,
				],
				matches: provider => provider.isTrust && provider.isTrustWallet,
			},
			{
				type: WalletConnectionType.WalletConnect2,
				explorerIds: ['4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0'],
			},
			{
				type: WalletConnectionType.WalletConnect1,
				mobileLinks: ['trust'],
			},
		],
	},
	{
		type: KnownWalletType.UniswapExtension,
		name: 'Uniswap Extension',
		icon: UniswapExtensionIcon,
		colors: [
			'#FEF4FF',
			'#F50DB4',
		],

		connectionTypes: [
			{
				type: WalletConnectionType.Eip6963,
				rdns: 'org.uniswap.app',
			},
			{
				type: WalletConnectionType.InjectedEip1193,
				globalResolvers: [
					globalEthereumResolver,
					globalWeb3Resolver,
				],
				matches: provider => provider.isUniswapWallet,
			},
		],
	},
	{
		type: KnownWalletType.Web3Modal,
		name: 'Web3Modal',
		icon: WalletConnect2Icon,
		colors: [
			'#3396ff',
			'#66b1ff',
		],

		connectionTypes: [
			{
				type: WalletConnectionType.Web3Modal,
			},
		],
	},
	// {
	// 	type: KnownWalletType.OtherWallet,
	// 	name: 'Auto-Detect', // name: 'Other Wallet',
	// 	icon: ,

	// 	connectionTypes: [
	// 		{
	// 			type: WalletConnectionType.InjectedEip1193,
	// 			globalResolvers: [
	// 				globalEthereumResolver,
	// 				globalWeb3Resolver,
	// 			],
	// 		},
	// 		{
	// 			type: WalletConnectionType.WalletConnect1,
	// 		},
	// 	],
	// },
] as const satisfies KnownWalletConfig[]

export const knownWalletsByType: Partial<Record<KnownWalletType, KnownWalletConfig>> = Object.fromEntries(
	knownWallets
		.map(knownWallet => [knownWallet.type, knownWallet])
)

export const knownWalletsByEip6963Rdns: Partial<Record<Eip6963Rdns, KnownWalletConfig>> = Object.fromEntries(
	knownWallets
		.flatMap(knownWallet => (
			knownWallet.connectionTypes
				.filter(connectionType => connectionType.type === WalletConnectionType.Eip6963)
				.map(connectionType => [
					connectionType.rdns,
					knownWallet,
				])
		))
)

export const displayedKnownWallets = ([
	KnownWalletType.MetaMask,
	KnownWalletType.Web3Modal,
	KnownWalletType.WalletConnect2,
	KnownWalletType.CoinbaseWallet,
	KnownWalletType.Taho,
	KnownWalletType.WalletConnect1,
] as const satisfies KnownWalletType[])
	.map(type => knownWalletsByType[type])
