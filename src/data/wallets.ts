export enum WalletConnectionType {
	InjectedEip1193 = 'InjectedEip1193',
	InjectedEthereum = 'InjectedEthereum',
	InjectedWeb3 = 'InjectedWeb3',
	Eip6963 = 'Eip6963',
	WalletConnect1 = 'WalletConnect1',
	WalletConnect2 = 'WalletConnect2',
	Web3Modal = 'Web3Modal',
	CoinbaseWalletSDK = 'CoinbaseWalletSDK',
	WebmaxJs = 'WebmaxJs',
	BananaWalletSdk = 'BananaWalletSdk',
}


export const walletConnectionTypes: Record<WalletConnectionType, {
	name: string
}> = {
	[WalletConnectionType.InjectedEip1193]: {
		name: 'injected EIP-1193 provider',
	},
	[WalletConnectionType.InjectedEthereum]: {
		name: 'injected ethereum', // 'injected ethereum provider',
	},
	[WalletConnectionType.InjectedWeb3]: {
		name: 'injected web3', // 'injected web3 provider',
	},
	[WalletConnectionType.Eip6963]: {
		name: 'EIP-6963 wallet provider',
	},
	[WalletConnectionType.WalletConnect1]: {
		name: 'WalletConnect 1.0',
	},
	[WalletConnectionType.WalletConnect2]: {
		name: 'WalletConnect 2.0',
	},
	[WalletConnectionType.Web3Modal]: {
		name: 'Web3Modal',
	},
	[WalletConnectionType.CoinbaseWalletSDK]: {
		name: 'Coinbase Wallet SDK',
	},
	[WalletConnectionType.WebmaxJs]: {
		name: 'webmax.js',
	},
	[WalletConnectionType.BananaWalletSdk]: {
		name: 'Banana Wallet SDK',
	},
}


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
	type: KnownWalletType,
	name: string,
	icon: string,
	colors: string[],

	connectionTypes: WalletConnectionType[],

	// connectionType === WalletConnectionType.InjectedWeb3 || connectionType === WalletConnectionType.InjectedEthereum
	injectedEip1193ProviderGlobal?: string,
	injectedEip1193ProviderFlag?: string,
	
	// connectionType === WalletConnectionType.WalletConnect1
	walletConnectMobileLinks?: string[],

	// connectionType === WalletConnectionType.WalletConnect2
	walletConnect2ExplorerIds?: string[],
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
			WalletConnectionType.InjectedEthereum,
			WalletConnectionType.InjectedWeb3,
			WalletConnectionType.WalletConnect2,
			WalletConnectionType.WalletConnect1,
		],

		injectedEip1193ProviderFlag: 'isMetaMask',
		walletConnectMobileLinks: ['metamask'],
		walletConnect2ExplorerIds: ['c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96'],
	},
	{
		type: KnownWalletType.WalletConnect2,
		// name: 'WalletConnect 2.0',
		name: 'WalletConnect',
		icon: WalletConnect2Icon,
		colors: ['#3083FC'],

		connectionTypes: [
			WalletConnectionType.WalletConnect2,
		],
	},
	{
		type: KnownWalletType.WalletConnect1,
		name: 'WalletConnect 1.0',
		icon: WalletConnectIcon,
		colors: ['#3083FC'],

		connectionTypes: [
			WalletConnectionType.WalletConnect1,
		],
	},
	{
		type: KnownWalletType.BananaWallet,
		name: 'Banana Wallet',
		icon: BananaWalletIcon,
		colors: ['#ffcf4a', '#f8b42c'], // '#e67f1c', '#b95300'

		connectionTypes: [
			WalletConnectionType.BananaWalletSdk,
		],
	},
	{
		type: KnownWalletType.CoinbaseWallet,
		name: 'Coinbase Wallet',
		icon: CoinbaseWalletIcon,
		colors: ['#1652F0'],

		connectionTypes: [
			WalletConnectionType.InjectedEthereum,
			WalletConnectionType.InjectedWeb3,
			WalletConnectionType.CoinbaseWalletSDK,
			WalletConnectionType.WalletConnect2,
			WalletConnectionType.WalletConnect1,
		],

		injectedEip1193ProviderFlag: 'isCoinbaseWallet',
		walletConnect2ExplorerIds: ['fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa'],
	},
	{
		type: KnownWalletType.Intmax,
		name: 'IntmaxWallet',
		icon: IntmaxIcon,
		colors: ['#14ded2', '#3680fe', '#d32dfd'],

		connectionTypes: [
			WalletConnectionType.WebmaxJs,
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
			WalletConnectionType.InjectedEthereum,
		],

		injectedEip1193ProviderFlag: 'isLiquality',
	},
	{
		type: KnownWalletType.MEW,
		name: 'MyEtherWallet',
		icon: MyEtherWalletIcon,
		colors: ['#1896A4'],

		connectionTypes: [
			WalletConnectionType.InjectedEthereum,
			WalletConnectionType.InjectedWeb3,
			WalletConnectionType.WalletConnect1,
		],

		injectedEip1193ProviderFlag: 'isMew',
		walletConnectMobileLinks: ['mew'],
		walletConnect2ExplorerIds: ['f5b4eeb6015d66be3f5940a895cbaa49ef3439e518cd771270e6b553b48f31d2'],
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
			WalletConnectionType.WalletConnect2,
			WalletConnectionType.WalletConnect1,
		],

		walletConnect2ExplorerIds: ['1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369'],
	},
	{
		type: KnownWalletType.Tally,
		name: 'Tally',
		icon: TallyIcon,
		colors: ['#D08E39', '#002522'],

		connectionTypes: [
			WalletConnectionType.InjectedEip1193,
			WalletConnectionType.InjectedEthereum,
			WalletConnectionType.InjectedWeb3,
		],

		injectedEip1193ProviderGlobal: 'tally',
		injectedEip1193ProviderFlag: 'isTally',
		walletConnectMobileLinks: ['tally'],
		walletConnect2ExplorerIds: ['cf14642fb8736a99b733ada71863241c823743b16e2a822b3dba24e2fa25014d'],
	},
	{
		type: KnownWalletType.Trust,
		name: 'Trust',
		icon: TrustWalletIcon,
		colors: ['#3375BB'],

		connectionTypes: [
			WalletConnectionType.WalletConnect1,
			WalletConnectionType.InjectedEthereum,
		],

		injectedEip1193ProviderFlag: 'isTrust',
		walletConnectMobileLinks: ['trust'],
		walletConnect2ExplorerIds: ['4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0'],
	},
	{
		type: KnownWalletType.Web3Modal,
		name: 'Web3Modal',
		icon: WalletConnect2Icon,
		colors: ['#3396ff', '#66b1ff'],

		connectionTypes: [
			WalletConnectionType.Web3Modal,
		],
	},
	// {
	// 	type: KnownWalletType.OtherWallet,
	// 	name: 'Auto-Detect', // name: 'Other Wallet',
	// 	icon: ,

	// 	connectionTypes: [
	// 		WalletConnectionType.InjectedEthereum,
	// 		WalletConnectionType.InjectedWeb3,
	// 		WalletConnectionType.WalletConnect1,
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
