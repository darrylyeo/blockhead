export enum WalletType {
	CoinbaseWallet = 'Coinbase Wallet',
	MetaMask = 'MetaMask',
	// MEW = 'MEW',
	Rainbow = 'Rainbow',
	// Tally = 'Tally',
	WalletConnect = 'WalletConnect',
	WalletConnect2 = 'WalletConnect2',
}

export enum WalletConnectionType {
	InjectedEip1193 = 'injected EIP-1193 provider',
	InjectedEthereum = 'injected ethereum', // 'injected ethereum provider',
	InjectedWeb3 = 'injected web3', // 'injected web3 provider',
	WalletConnect1 = 'WalletConnect 1.0',
	WalletConnect1_Web3Modal = 'WalletConnect 1.0 (Web3Modal)',
	WalletConnect2_Web3Modal = 'WalletConnect 2.0 (Web3Modal)',
	WalletConnect1_Web3Modal_Standalone = 'WalletConnect 1.0 (Web3Modal)',
	WalletConnect2_Web3Modal_Standalone = 'WalletConnect 2.0 (Web3Modal)',
	WalletConnect2_EthereumProvider = 'WalletConnect 2.0 (Ethereum provider)',
	CoinbaseWalletSDK = 'Coinbase Wallet SDK',
}


type WalletConfig = {
	type: WalletType,
	name: string,
	icon: string,
	colors: string[],

	connectionTypes: WalletConnectionType[],

	// connectionType === WalletConnectionType.InjectedWeb3 || connectionType === WalletConnectionType.InjectedEthereum
	injectedEip1193ProviderGlobal?: string,
	injectedEip1193ProviderFlag?: string,
	
	// connectionType === WalletConnectionType.WalletConnect 
	walletConnectMobileLinks?: string[],
}


import {
	CoinbaseWalletIcon,
	MetaMaskIcon,
	RainbowIcon,
	WalletConnectIcon,
	WalletConnect2Icon,
} from '../assets/walletIcons'

export const wallets: WalletConfig[] = [
	{
		type: WalletType.MetaMask,
		name: 'MetaMask',
		icon: MetaMaskIcon,
		colors: ['#e27625'],

		connectionTypes: [
			WalletConnectionType.InjectedEthereum,
			WalletConnectionType.InjectedWeb3,
			WalletConnectionType.WalletConnect1,
		],

		injectedEip1193ProviderFlag: 'isMetaMask',
		walletConnectMobileLinks: ['metamask'],
	},
	// {
	// 	type: WalletType.Tally,
	// 	name: 'Tally',
	// 	icon: TallyIcon,
	// 	colors: ['#D08E39', '#002522'],

	// 	connectionTypes: [
	// 		WalletConnectionType.InjectedEip1193,
	// 		WalletConnectionType.InjectedEthereum,
	// 		WalletConnectionType.InjectedWeb3,
	// 	],

	// 	injectedEip1193ProviderGlobal: 'tally',
	// 	injectedEip1193ProviderFlag: 'isTally',
	// 	walletConnectMobileLinks: ['tally'],
	// },
	{
		type: WalletType.CoinbaseWallet,
		name: 'Coinbase Wallet',
		icon: CoinbaseWalletIcon,
		colors: ['#1652F0'],

		connectionTypes: [
			WalletConnectionType.InjectedEthereum,
			WalletConnectionType.InjectedWeb3,
			WalletConnectionType.CoinbaseWalletSDK,
			WalletConnectionType.WalletConnect1,
		],

		injectedEip1193ProviderFlag: 'isCoinbaseWallet',
	},
	// {
	// 	type: WalletType.MEW,
	// 	name: 'MyEtherWallet',
	// 	icon: MyEtherWalletIcon,
	// 	colors: ['#1896A4'],

	// 	connectionTypes: [
	// 		WalletConnectionType.InjectedEthereum,
	// 		WalletConnectionType.InjectedWeb3,
	// 		WalletConnectionType.WalletConnect,
	// 	],

	// 	injectedEip1193ProviderFlag: 'isMew',
	// 	walletConnectMobileLinks: ['mew'],
	// },
	{
		type: WalletType.Rainbow,
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
			WalletConnectionType.WalletConnect,
		],
	},
	// {
	// 	type: WalletType.Trust,
	// 	name: 'Trust',
	// 	icon: TrustWalletIcon,
	// 	colors: ['#3375BB'],

	// 	connectionTypes: [
	// 		WalletConnectionType.WalletConnect,
	// 		WalletConnectionType.InjectedEthereum,
	// 	],

	// 	injectedEip1193ProviderFlag: 'isTrust',
	// 	walletConnectMobileLinks: ['trust'],
	// },
	{
		type: WalletType.WalletConnect,
		name: 'WalletConnect 1.0',
		icon: WalletConnectIcon,
		colors: ['#3083FC'],

		connectionTypes: [
			WalletConnectionType.WalletConnect1,
		],
	},
	{
		type: WalletType.WalletConnect,
		name: 'WalletConnect 1.0 (Web3Modal)',
		icon: WalletConnectIcon,
		colors: ['#3083FC'],

		connectionTypes: [
			WalletConnectionType.WalletConnect1_Web3Modal,
			WalletConnectionType.WalletConnect1_Web3Modal_Standalone,
		],
	},
	{
		type: WalletType.WalletConnect2,
		name: 'WalletConnect 2.0 (Web3Modal)',
		icon: WalletConnect2Icon,
		colors: ['#3396ff', '#66b1ff'],

		connectionTypes: [
			// WalletConnectionType.WalletConnect2_Web3Modal,
			WalletConnectionType.WalletConnect2_Web3Modal_Standalone,
			// WalletConnectionType.WalletConnect2_EthereumProvider,
		],
	},
	// {
	// 	type: WalletType.OtherWallet,
	// 	name: 'Auto-Detect', // name: 'Other Wallet',
	// 	icon: ,

	// 	connectionTypes: [
	// 		WalletConnectionType.InjectedEthereum,
	// 		WalletConnectionType.InjectedWeb3,
	// 		WalletConnectionType.WalletConnect,
	// 	],
	// },
]

export const walletsByType: Record<WalletType, WalletConfig> = Object.fromEntries(wallets.map(wallet => [wallet.type, wallet]))
