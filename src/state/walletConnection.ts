import { type WalletType, WalletConnectionType, walletsByType } from '../data/wallets'


import type { Readable } from 'svelte/store'
import type { Ethereum } from '../data/networks/types'

import type { Provider as EthersProvider } from 'ethers'
import type { CoinbaseWalletProvider } from '@coinbase/wallet-sdk'
import type WalletConnectProvider from '@walletconnect/web3-provider'

export type Provider = EthersProvider | WalletConnectProvider | CoinbaseWalletProvider

export type WalletConnection = {
	walletType: WalletType,
	connectionType: WalletConnectionType,
	provider: Provider,
	connect: () => void,
	switchNetwork?: (network: Ethereum.Network) => void,
	subscribe?: () => {
		accounts: Readable<string[]>;
		chainId: Readable<number>;
	},
	disconnect?: () => void,
}


const connectEip1193 = async (provider: Provider) => {
	try {
		if(!provider.request){
			// provider.request = (request) => provider.sendPromise(request.method, request.params)
			provider.request = async (request) => await new Promise((resolve, reject) => {
				provider.sendAsync(request, (error, result) => {
					// console.log('sendAsync', error, result)
					error ? reject(error) : resolve(result)
				})
			})
		}

		return (await provider.request({ method: 'eth_requestAccounts' })) as string[] | undefined
	}catch(e){
		if(e.message.includes('User rejected the request'))
			throw e
	}
}


import { readable } from 'svelte/store'

const subscribeEip1193 = (provider: Provider) => ({
	accounts: readable<string[]>([], set => {
		const onAccountsChanged = (accounts: string[]) => set(accounts)

		provider.request({ method: 'eth_accounts' }).then(onAccountsChanged)

		provider.on?.('accountsChanged', onAccountsChanged)

		return () => provider.off?.('accountsChanged', onAccountsChanged)
	}),

	chainId: readable<number>(undefined, set => {
		const onChainIdChanged = (chainId: number | string) => set(Number(chainId))

		provider.request({ method: 'eth_chainId' }).then(onChainIdChanged)

		provider.on?.('chainChanged', onChainIdChanged)

		return () => provider.off?.('chainChanged', onChainIdChanged)
	}),
})


import { toQuantity } from 'ethers'

const switchNetworkEip1193 = async ({
	provider,
	network
}: {
	provider: Provider,
	network: Ethereum.Network
}) => {
	try {
		await provider.request({
			method: 'wallet_switchEthereumChain',
			params: [{
				chainId: toQuantity(network.chainId)
			}],
		})
	} catch (e) {
		// This error code indicates that the chain has not been added to MetaMask.
		if (e.code === 4902) {
			try {
				await provider.request({
					method: 'wallet_addEthereumChain',
					params: [
						{
							chainId: toQuantity(network.chainId),
							chainName: network.name,
							rpcUrls: network.rpc,
							nativeCurrency: network.nativeCurrency,
							blockExplorerUrls: network.explorers.map(explorer => explorer.url)
						},
					],
				})
			} catch (e) {
				console.error(e)
			}
		}else{
			console.error(e)
		}
	}
}


// import { env } from '../../env'
import { getNetworkRPC, networksBySlug } from '../data/networks'

export const getWalletConnection = async ({
	walletType,
	chainId = 1,
	jsonRpcUri = getNetworkRPC(networksBySlug['ethereum']),
	walletConnectBridgeUri = '' // env.WALLET_CONNECT_BRIDGE_URI
}: {
	walletType: WalletType,
	chainId?: number,
	jsonRpcUri?: string,
	walletConnectBridgeUri?: string,
}): Promise<WalletConnection> => {
	const walletConfig = walletsByType[walletType]

	for (const connectionType of walletConfig?.connectionTypes ?? []) {
		switch (connectionType) {
			case WalletConnectionType.InjectedEip1193: {
				const provider = globalThis[walletConfig.injectedEip1193ProviderGlobal]

				if (provider?.[walletConfig.injectedEip1193ProviderFlag]) {
					return {
						walletType,
						connectionType: WalletConnectionType.InjectedEip1193,
						provider,

						connect: async () => await connectEip1193(provider),

						subscribe: () => subscribeEip1193(provider),

						switchNetwork: async (network: Ethereum.Network) => await switchNetworkEip1193({ provider, network }),
					}
				}

				break
			}

			case WalletConnectionType.InjectedEthereum: {
				const provider = globalThis.ethereum

				if (
					provider && (
						!walletConfig.injectedEip1193ProviderFlag
						|| provider[walletConfig.injectedEip1193ProviderFlag]
					)
				) {
					// https://docs.metamask.io/guide/provider-migration.html#migrating-to-the-new-provider-api
					provider.autoRefreshOnNetworkChange = false

					// Coinbase Wallet browser extension disguised as MetaMask
					if(provider.selectedProvider?.isCoinbaseWallet)
						break
						// walletType = WalletType.CoinbaseWallet

					return {
						walletType,
						connectionType: WalletConnectionType.InjectedEthereum,
						provider,

						connect: async () => await connectEip1193(provider),

						subscribe: () => subscribeEip1193(provider),

						switchNetwork: async (network: Ethereum.Network) => await switchNetworkEip1193({ provider, network }),
					}
				}

				break
			}

			case WalletConnectionType.InjectedWeb3: {
				const provider = globalThis.web3?.currentProvider

				if (
					provider && (
						!walletConfig.injectedEip1193ProviderFlag
						|| provider[walletConfig.injectedEip1193ProviderFlag]
					)
				) {
					return {
						walletType,
						connectionType: WalletConnectionType.InjectedWeb3,
						provider,

						connect: async () => await connectEip1193(provider),

						subscribe: () => subscribeEip1193(provider),

						switchNetwork: async (network: Ethereum.Network) => await switchNetworkEip1193({ provider, network }),
					}
				}

				break
			}

			case WalletConnectionType.CoinbaseWalletSDK: {
				const { CoinbaseWalletSDK } = await import('@coinbase/wallet-sdk')

				const sdk = new CoinbaseWalletSDK({
					appName: 'Blockhead',
					appLogoUrl: '/Blockhead-Logo.svg',
					darkMode: true,
					overrideIsMetaMask: false,
					overrideIsCoinbaseWallet: true,
				})

				// const qrUrl = sdk.getQrUrl()

				const provider: CoinbaseWalletProvider = sdk.makeWeb3Provider(
					jsonRpcUri,
					chainId
				)

				return {
					walletType,
					connectionType: WalletConnectionType.CoinbaseWalletSDK,
					provider,

					connect: async () => {
						try {
							return await provider.request({ method: 'eth_requestAccounts' })
						}catch(e){
							if(e.message.includes('User denied account authorization'))
								throw e
						}
					},

					subscribe: () => subscribeEip1193(provider),

					switchNetwork: async (network: Ethereum.Network) => await switchNetworkEip1193({ provider, network }),

					disconnect: async () => {
						await provider.disconnect()
					}
				}
			}

			case WalletConnectionType.WalletConnect: {
				const WalletConnectProvider = (await import('@walletconnect/web3-provider')).default

				let provider: WalletConnectProvider = new WalletConnectProvider({
					rpc: {
						[chainId]: jsonRpcUri || '',
					},
					bridge: walletConnectBridgeUri,

					// Restrict WalletConnect options to the selected wallet
					...walletConfig.walletConnectMobileLinks
						? { qrcodeModalOptions: { mobileLinks: walletConfig.walletConnectMobileLinks } }
						: {},
				})

				return {
					walletType,
					connectionType: WalletConnectionType.WalletConnect,
					provider,

					connect: async () => {
						provider = new WalletConnectProvider({
							rpc: {
								[chainId]: jsonRpcUri || '',
							},
							bridge: walletConnectBridgeUri,
		
							// Restrict WalletConnect options to the selected wallet
							...walletConfig.walletConnectMobileLinks
								? { qrcodeModalOptions: { mobileLinks: walletConfig.walletConnectMobileLinks } }
								: {},
						})

						try {
							return await provider.enable()
						}catch(e){
							if(
								e.message.includes('User closed WalletConnect modal') ||
								e.message.includes('User closed modal')
							)
								throw e
						}
					},

					subscribe: () => subscribeEip1193(provider),

					switchNetwork: async (network: Ethereum.Network) => await switchNetworkEip1193({ provider, network }),

					disconnect: async () => {
						provider.qrcode = false
						await provider.disconnect()
					}
				}
			}
		}
	}

	throw new Error('No provider found')
}
