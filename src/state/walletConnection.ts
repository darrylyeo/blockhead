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
	provider?: Provider,
	connect: () => void,
	switchNetwork?: (network: Ethereum.Network) => void,
	subscribe?: () => {
		accounts: Readable<string[]>;
		chainId: Readable<number>;
		walletconnectTopic: Readable<string>;
	},
	disconnect?: () => void,
}


const connectEip1193 = async (provider: Provider): Promise<Ethereum.Address[] | undefined> => {
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

		return (await provider.request({ method: 'eth_requestAccounts' }))
	}catch(e){
		if(e.message.includes('User rejected the request'))
			throw e
	}
}


import { readable } from 'svelte/store'

const subscribeEip1193 = (provider: Provider) => ({
	accounts: readable<Ethereum.Address[]>([], set => {
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


import { env } from '../env'
import { availableNetworks, getNetworkRPC, networksBySlug } from '../data/networks'
import type { SessionTypes } from '@walletconnect/types'
import type { Web3Modal } from '@web3modal/standalone'
import { parseCaip2Id } from '../utils/parseCaip2Id'

const walletconnectMetadata = {
	name: "Blockhead",
	description: "Track, visualize, and explore all of crypto/DeFi/web3 in ONE interface!",
	url: "https://blockhead.info",
	icons: ['/Blockhead-Logo.svg'],
}

export const getWalletConnection = async ({
	walletType,
	chainId = 1,
	theme,
	walletconnectTopic,
	jsonRpcUri = getNetworkRPC(networksBySlug['ethereum']),
}: {
	walletType: WalletType,
	chainId?: number,
	theme?: SvelteStore<{
		mode?: ConstructorParameters<typeof Web3Modal>[0]['themeMode'],
		color?: ConstructorParameters<typeof Web3Modal>[0]['themeColor'],
		background?: ConstructorParameters<typeof Web3Modal>[0]['themeBackground'],
	}>,
	walletconnectTopic?: string,
	jsonRpcUri?: string,
}): Promise<WalletConnection> => {
	const walletConfig = walletsByType[walletType]

	for (const connectionType of walletConfig.connectionTypes) {
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

			case WalletConnectionType.WalletConnect1: {
				const WalletConnectProvider = (await import('@walletconnect/web3-provider')).default

				let provider: WalletConnectProvider = new WalletConnectProvider({
					rpc: {
						[chainId]: jsonRpcUri || '',
					},
					bridge: env.WALLETCONNECT1_BRIDGE_URI,

					// Restrict WalletConnect options to the selected wallet
					...walletConfig.walletConnectMobileLinks
						? { qrcodeModalOptions: { mobileLinks: walletConfig.walletConnectMobileLinks } }
						: {},
				})

				return {
					walletType,
					connectionType: WalletConnectionType.WalletConnect1,
					provider,

					connect: async () => {
						provider = new WalletConnectProvider({
							rpc: {
								[chainId]: jsonRpcUri || '',
							},
							bridge: env.WALLETCONNECT1_BRIDGE_URI,
		
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

			case WalletConnectionType.WalletConnect1_Web3Modal:
			case WalletConnectionType.WalletConnect2_Web3Modal: {
				const { Core } = (await import('@walletconnect/core'))
				const { Web3Wallet } = (await import('@walletconnect/web3wallet'))

				const core = new Core({
					projectId: env.WALLETCONNECT2_PROJECT_ID,
					// name: '',
					// relayUrl: '',
					// logger: 'whee',
					// keychain: ,
					// storage: ,
					// storageOptions: ,
				})

				const provider = await Web3Wallet.init({
					core,
					metadata: walletconnectMetadata,
				})

				let session: SessionTypes.Struct

				provider.on('session_proposal', async proposal => {
					session = await provider.approveSession({
						id: proposal.id,
						namespaces: {
							eip155: {
								accounts: [],
								methods: [
									"eth_requestAccounts",
									"eth_accounts",
									"eth_chainId",
									"eth_sendTransaction",
									"eth_signTransaction",
									"eth_sign",
									"eth_signTypedData",
									"personal_sign",
								],
								events: [
									'accountsChanged',
									'chainChanged',
								],
							},
						},
					})
				})

				return {
					walletType,
					connectionType,
					provider,

					connect: async () => (
						await provider.core.pairing.pair({ uri: 'https://blockhead.info' })
					),

					subscribe: () => subscribeEip1193(provider),

					switchNetwork: async (network: Ethereum.Network) => (
						await provider.emitSessionEvent({
							topic,
							event: {
								name: "accountsChanged",
								data: ["0xab16a96D359eC26a11e2C2b3d8f8B8942d5Bfcdb"],
							},
							chainId: `eip155:${network.chainId}`,
					  	})
					),

					disconnect: async () => (
						await provider.disconnectSession({
							topic,
							reason: getSdkError('USER_DISCONNECTED'),
						})
					)
				}
			}

			case WalletConnectionType.WalletConnect1_Web3Modal_Standalone:
			case WalletConnectionType.WalletConnect2_Web3Modal_Standalone: {
				const { default: SignClient } = await import('@walletconnect/sign-client')

				const signClient = await SignClient.init({
					projectId: env.WALLETCONNECT2_PROJECT_ID,
					// relayUrl: env.WALLETCONNECT2_RELAY_URL,
					metadata: walletconnectMetadata,
				})

				for(const eventName of [
					'session_proposal',
					'session_request',
					'session_update',
					'session_delete',
					'session_event',
					'session_ping',
					'session_expire',
					'session_extend',
					'proposal_expire',
				] as const)
					signClient.events.on?.(eventName, (e) => console.info(eventName, e))

				const sessions = signClient.session.getAll()
				console.log({sessions})

				let session: SessionTypes.Struct // = walletconnectTopic && sessions.get(walletconnectTopic)

				console.log('session', {walletconnectTopic, session})

				let web3Modal: Web3Modal
			
				const onModalClose = (callback: () => void) => {
					const unsubscribe = web3Modal?.subscribeModal(({ open }) => {
						if(!open){
							unsubscribe()
							callback()
						}
					})
				}

				const chains = availableNetworks.map(network => `eip155:${network.chainId}`)

				return {
					walletType,
					connectionType,
					provider: signClient,

					connect: () => new Promise(async (resolve, reject) => {
						session ||= await (async () => {
							const { Web3Modal } = await import('@web3modal/standalone')
			
							if(!web3Modal){
								web3Modal = new Web3Modal({
									projectId: env.WALLETCONNECT2_PROJECT_ID,
									walletConnectVersion: ({
										[WalletConnectionType.WalletConnect1_Web3Modal]: 1,
										[WalletConnectionType.WalletConnect2_Web3Modal]: 2,
									} as const)[connectionType],
									// themeMode: 'dark',
									// themeColor: 'blue',
									// themeBackground: 'gradient',
									themeZIndex: 19,
									standaloneChains: chains,
									// defaultChain: ,
									// mobileWallets: ,
									// desktopWallets: ,
									// walletImages: ,
									// chainImages: ,
									// tokenImages: ,
									enableNetworkView: true,
									enableAccountView: true,
									// explorerAllowList: ,
									// explorerDenyList: ,
									// termsOfServiceUrl: ,
									// privacyPolicyUrl: ,
								})

								theme?.subscribe($theme => {
									web3Modal.setTheme({
										themeMode: $theme?.mode ?? 'dark',
										themeColor: $theme?.color ?? 'blue',
										themeBackground: $theme?.background ?? 'gradient',
									})
								})
							}

							const { uri, approval } = await signClient.connect({
								requiredNamespaces: {
									eip155: {
										methods: [
											'eth_requestAccounts',
											'eth_accounts',
											'eth_chainId',
											'eth_sendTransaction',
											'eth_signTransaction',
											'eth_sign',
											'eth_signTypedData',
											'personal_sign',
										],
										chains,
										events: [
											'accountsChanged',
											'chainChanged',
										],
									},
								},
							})

							if(!uri)
								throw new Error('Missing wc: uri')

							onModalClose(() => requestAnimationFrame(() => reject(new Error('Closed Web3Modal'))))

							await web3Modal.openModal({ uri, standaloneChains: chains })

							const session = await approval()
							console.log('approved', session, signClient.session, session === signClient.session)

							console.log({signClient, session})
							return session
						})()

						resolve(session?.namespaces.eip155.accounts.map(caip2Id => parseCaip2Id(caip2Id).address))

						web3Modal?.closeModal()
					}),

					subscribe: () => ({
						walletconnectTopic: readable<string>(
							session?.topic,
							set =>	{
								set(session?.topic)
							}
						),

						accounts: readable<Ethereum.Address[]>(
							session?.namespaces.eip155.accounts.map(caip2Id => parseCaip2Id(caip2Id).address),
							set => {
								signClient.events.on?.('session_event', (e) => console.log(e))
								signClient.events.on?.('session_update', (e) => console.log(e))

							}
						),
					
						chainId: readable<number>(
							session?.namespaces.eip155.accounts.map(caip2Id => Number(parseCaip2Id(caip2Id).chainId))[0],
							set => {}
						),

						isConnected: readable<boolean>(
							true,
							set => {
								signClient.events.on?.('session_delete', () => set(false))
								signClient.events.on?.('session_expire', () => set(false))
							}
						),
					}),

					switchNetwork: async (network: Ethereum.Network) => (
						await signClient.emitSessionEvent({
							topic: 'topic',
							event: {
								name: "accountsChanged",
								data: ["0xab16a96D359eC26a11e2C2b3d8f8B8942d5Bfcdb"],
							},
							chainId: `eip155:${network.chainId}`,
					  	})
					),

					disconnect: async () => {
						web3Modal?.closeModal()

						await signClient.disconnect({
							topic: 'topic',
							reason: '',
						})
					}
				}
			}

			case WalletConnectionType.WalletConnect2_EthereumProvider: {
				const { EthereumProvider } = (await import('@walletconnect/ethereum-provider'))

				const provider = await EthereumProvider.init({
					projectId: env.WALLETCONNECT2_PROJECT_ID,
					chains: availableNetworks.map(network => network.chainId),
					methods: [
						"eth_requestAccounts",
						"eth_accounts",
						"eth_chainId",
						"eth_sendTransaction",
						"eth_signTransaction",
						"eth_sign",
						"eth_signTypedData",
						"personal_sign",
					],
					events: [
						'accountsChanged',
						'chainChanged',
					],
					// rpcMap: Object.fromEntries(availableNetworks.map(network => [network.chainId, network.rpc[0]])),
					metadata,
					showQrModal: true,
				})

				console.log({provider})

				return {
					walletType,
					connectionType: WalletConnectionType.WalletConnect2_EthereumProvider,
					provider,

					connect: async () => {
						console.log('connecting...')
						await provider.connect({
							chains: availableNetworks.map(network => network.chainId),
							// rpcMap: Object.fromEntries(availableNetworks.map(network => [network.chainId, network.rpc[0]])),
							// pairingTopic, // OPTIONAL pairing topic
						})
						console.log('connected...')

						return await provider.enable()
					},

					subscribe: () => subscribeEip1193(provider),

					switchNetwork: async (network: Ethereum.Network) => (
						await switchNetworkEip1193({ provider, network })
					),

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
