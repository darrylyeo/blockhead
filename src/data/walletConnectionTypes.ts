export enum WalletConnectionType {
	InjectedEip1193 = 'InjectedEip1193',
	Eip6963 = 'Eip6963',
	WalletConnect1 = 'WalletConnect1',
	WalletConnect2 = 'WalletConnect2',
	Web3Modal = 'Web3Modal',
	CoinbaseWalletSDK = 'CoinbaseWalletSDK',
	WebmaxJs = 'WebmaxJs',
	BananaWalletSdk = 'BananaWalletSdk'
}


export const walletConnectionTypes: Record<WalletConnectionType, {
	name: string;
}> = {
	[WalletConnectionType.InjectedEip1193]: {
		name: 'injected EIP-1193 provider',
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
