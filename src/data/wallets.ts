import type { Ethereum } from './networks/types'

type GlobalThis = typeof globalThis
export type GlobalInjectedEip1193Resolver = (globalThis: GlobalThis & { [key: string]: any }) => Ethereum.Provider | undefined

const globalEthereumResolver: GlobalInjectedEip1193Resolver = globalThis => globalThis.ethereum
const globalWeb3Resolver: GlobalInjectedEip1193Resolver = globalThis => globalThis.web3?.currentProvider


import type { Eip6963Rdns } from '$/state/wallets'
import { WalletConnectionType } from './walletConnectionTypes'

export enum KnownWalletType {
	BananaWallet = 'BananaWallet',
	CoinbaseWallet = 'Coinbase Wallet',
	Intmax = 'Intmax',
	Liquality = 'Liquality',
	MetaMask = 'MetaMask',
	MEW = 'MEW',
	Rainbow = 'Rainbow',
	Tally = 'Tally',
	Trust = 'Trust',
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
		| {
			type: WalletConnectionType.BananaWalletSdk
		}
	)[]
}


import {
	BananaWalletIcon,
	CoinbaseWalletIcon,
	IntmaxIcon,
	MetaMaskIcon,
	MyEtherWalletIcon,
	RainbowIcon,
	TallyIcon,
	TrustWalletIcon,
	WalletConnect2Icon,
	WalletConnectIcon,
} from '$/assets/walletIcons'

import { LiqualityIcon } from '$/assets/icons'

export const knownWallets = [
	{
		type: KnownWalletType.MetaMask,
		name: 'MetaMask',
		icon: MetaMaskIcon,
		colors: ['#e27625'],

		connectionTypes: [
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
		colors: ['#3083FC'],

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
		colors: ['#3083FC'],

		connectionTypes: [
			{
				type: WalletConnectionType.WalletConnect1,
			},
		],
	},
	{
		type: KnownWalletType.BananaWallet,
		name: 'Banana Wallet',
		icon: BananaWalletIcon,
		colors: ['#ffcf4a', '#f8b42c'], // '#e67f1c', '#b95300'

		connectionTypes: [
			{
				type: WalletConnectionType.BananaWalletSdk,
			},
		],
	},
	{
		type: KnownWalletType.CoinbaseWallet,
		name: 'Coinbase Wallet',
		icon: CoinbaseWalletIcon,
		colors: ['#1652F0'],

		connectionTypes: [
			{
				type: WalletConnectionType.InjectedEip1193,
				globalResolvers: [
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
		type: KnownWalletType.Intmax,
		name: 'IntmaxWallet',
		icon: IntmaxIcon,
		colors: ['#14ded2', '#3680fe', '#d32dfd'],

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
			'#1CE5C3',
			'#5440D7',
			'#8B2CE4',
			'#D421EB',
			'#AC39FD',
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
		colors: ['#1896A4'],

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
		type: KnownWalletType.Rainbow,
		name: 'Rainbow',
		icon: RainbowIcon,
		colors: [
			'#001E59',
			'#8754C9',
			'#FF4000',
			'#FF9901',
			'#FFF700',
			'#01DA40',
			'#00AAFF',
			'#174299',
		],

		connectionTypes: [
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
		type: KnownWalletType.Tally,
		name: 'Tally',
		icon: TallyIcon,
		colors: ['#D08E39', '#002522'],

		connectionTypes: [
			{
				type: WalletConnectionType.InjectedEip1193,
				globalResolvers: [
					globalThis => globalThis.tally,
					globalEthereumResolver,
					globalWeb3Resolver,
				],
				matches: provider => provider.isTally,
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
		colors: ['#3375BB'],

		connectionTypes: [
			{
				type: WalletConnectionType.InjectedEip1193,
				globalResolvers: [
					globalEthereumResolver,
					globalWeb3Resolver,
				],
				matches: provider => provider.isTrust,
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
		type: KnownWalletType.Web3Modal,
		name: 'Web3Modal',
		icon: WalletConnect2Icon,
		colors: ['#3396ff', '#66b1ff'],

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

export const knownWalletsByType: Record<KnownWalletType, KnownWalletConfig> = Object.fromEntries(
	knownWallets
		.map(knownWallet => [knownWallet.type, knownWallet])
)

export const displayedKnownWallets = ([
	KnownWalletType.MetaMask,
	KnownWalletType.WalletConnect2,
	KnownWalletType.WalletConnect1,
	KnownWalletType.CoinbaseWallet,
	KnownWalletType.Rainbow,
	KnownWalletType.Web3Modal,
] as const satisfies KnownWalletType[])
	.map(type => knownWalletsByType[type])
