import type { BrandedString } from '$/utils/branded'
import type { Readable } from 'svelte/store'


import type { Ethereum } from '$/data/networks/types'
import { type WalletType, WalletConnectionType, walletsByType } from '$/data/wallets'
import type { Account } from './account'


import type { Provider as EthersProvider } from 'ethers'


import type { CoinbaseWalletProvider } from '@coinbase/wallet-sdk'


import type WalletConnectProvider from '@walletconnect/web3-provider'

export type WalletconnectTopic = BrandedString<'WalletconnectTopic'>


export type Provider = EthersProvider | WalletConnectProvider | CoinbaseWalletProvider

export type WalletConnection = {
	walletType: WalletType,
	connectionType: WalletConnectionType,

	provider?: Provider,

	connect: (isInitiatedByUser?: boolean) => Promise<Partial<{
		accounts?: Account[],
		chainId?: Ethereum.ChainID
		walletconnectTopic?: WalletconnectTopic,
	}>>

	subscribe?: () => {
		accounts: Readable<Account[]>;
		chainId: Readable<Ethereum.ChainID>;
	},

	switchNetwork?: (network: Ethereum.Network) => void,

	disconnect?: () => void,
}


const connectEip1193 = async (provider: Provider): Promise<{ accounts: Account[]}> => {
	try {
		if(!provider.request){
			// provider.request = (request) => provider.sendPromise(request.method, request.params)
			provider.request = async (request) => await new Promise((resolve, reject) => {
				provider.sendAsync(request, (error, accounts: Ethereum.Address[]) => {
					// console.log('sendAsync', error, accounts)
					error
						? reject(error)
						: resolve(accounts.map(address => ({ address })))
				})
			})
		}

		return {
			accounts: (await provider.request({ method: 'eth_requestAccounts' }) as Ethereum.Address[]).map(address => ({ address }))
		}
	}catch(e){
		if(e.message.includes('User rejected the request'))
			throw e

		return {}
	}
}


import { readable } from 'svelte/store'

const subscribeEip1193 = (provider: Provider) => ({
	accounts: readable<Account[]>([], set => {
		const onAccountsChanged = (addresses: Ethereum.Address[]) => set(addresses.map(address => ({ address })))

		provider.request({ method: 'eth_accounts' }).then(onAccountsChanged)

		provider.on?.('accountsChanged', onAccountsChanged)

		return () => provider.off?.('accountsChanged', onAccountsChanged)
	}),

	chainId: readable<Ethereum.ChainID>(undefined, set => {
		const onChainIdChanged = (chainId: number | string) => set(Number(chainId) as Ethereum.ChainID)

		provider.request({ method: 'eth_chainId' }).then(onChainIdChanged)

		provider.on?.('chainChanged', onChainIdChanged)

		return () => provider.off?.('chainChanged', onChainIdChanged)
	}),
})


import { toHex } from 'viem'

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
				chainId: toHex(network.chainId)
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
							chainId: toHex(network.chainId),
							chainName: network.name,
							rpcUrls: network.rpc,
							nativeCurrency: network.nativeCurrency,
							blockExplorerUrls: network.explorers?.map(explorer => explorer.url)
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


import { env } from '$/env'
import { availableNetworks, getNetworkRPC, networksByChainID, networksBySlug } from '$/data/networks'
import type { PairingTypes, SessionTypes } from '@walletconnect/types'
import type { Web3Modal } from '@web3modal/standalone'
import { parseCaip2Id } from '$/utils/parseCaip2Id'
import { networkToViemChain } from '$/data/networkProviders'
import { isTruthy } from '$/utils/isTruthy'

const walletconnectMetadata = {
	name: "Blockhead",
	description: "Track, visualize, and explore all of crypto/DeFi/web3 in ONE interface!",
	url: "https://blockhead.info",
	icons: ['/Blockhead-Logo.svg'],
}

export const getWalletConnection = async ({
	walletType,
	walletconnectTopic,
	networks = [networksByChainID[1 as Ethereum.ChainID]], // availableNetworks
	theme,
	jsonRpcUri = getNetworkRPC(networksBySlug['ethereum']),
}: {
	walletType: WalletType,
	walletconnectTopic?: WalletconnectTopic,
	networks?: Ethereum.Network[],
	theme?: SvelteStore<{
		mode?: ConstructorParameters<typeof Web3Modal>[0]['themeMode'],
		color?: ConstructorParameters<typeof Web3Modal>[0]['themeColor'],
		background?: ConstructorParameters<typeof Web3Modal>[0]['themeBackground'],
	}>,
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
					networks[0]?.chainId ?? 1,
				)

				return {
					walletType,
					connectionType: WalletConnectionType.CoinbaseWalletSDK,
					provider,

					connect: async () => {
						try {
							return {
								accounts: (await provider.request({ method: 'eth_requestAccounts' })).map(address => ({ address }))
							}
						}catch(e){
							if(e.message.includes('User denied account authorization'))
								throw e

							return {}
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
					rpc: Object.fromEntries(networks.map(network => [network.chainId, jsonRpcUri || network.rpc[0]])),
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
							rpc: Object.fromEntries(networks.map(network => [network.chainId, jsonRpcUri || network.rpc[0]])),
							bridge: env.WALLETCONNECT1_BRIDGE_URI,
		
							// Restrict WalletConnect options to the selected wallet
							...walletConfig.walletConnectMobileLinks
								? { qrcodeModalOptions: { mobileLinks: walletConfig.walletConnectMobileLinks } }
								: {},
						})

						try {
							return {
								accounts: (await provider.enable() as Ethereum.Address[]).map(address => ({ address }))
							}
						}catch(e){
							if(
								e.message.includes('User closed WalletConnect modal') ||
								e.message.includes('User closed modal')
							)
								throw e
							
							return {}
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

			// case WalletConnectionType.WalletConnect1_Web3Modal:
			// case WalletConnectionType.WalletConnect2_Web3Modal: {
			// 	const { Core } = (await import('@walletconnect/core'))
			// 	const { Web3Wallet } = (await import('@walletconnect/web3wallet'))

			// 	const core = new Core({
			// 		projectId: env.WALLETCONNECT2_PROJECT_ID,
			// 		// name: '',
			// 		// relayUrl: '',
			// 		// logger: 'whee',
			// 		// keychain: ,
			// 		// storage: ,
			// 		// storageOptions: ,
			// 	})

			// 	const provider = await Web3Wallet.init({
			// 		core,
			// 		metadata: walletconnectMetadata,
			// 	})

			// 	let session: SessionTypes.Struct
			// 	let pairing: PairingTypes.Struct

			// 	provider.on('session_proposal', async proposal => {
			// 		session = await provider.approveSession({
			// 			id: proposal.id,
			// 			namespaces: {
			// 				eip155: {
			// 					accounts: [],
			// 					methods: [
			// 						"eth_requestAccounts",
			// 						"eth_accounts",
			// 						"eth_chainId",
			// 						"eth_sendTransaction",
			// 						"eth_signTransaction",
			// 						"eth_sign",
			// 						"eth_signTypedData",
			// 						"personal_sign",
			// 					],
			// 					events: [
			// 						'accountsChanged',
			// 						'chainChanged',
			// 					],
			// 				},
			// 			},
			// 		})
			// 	})

			// 	return {
			// 		walletType,
			// 		connectionType,
			// 		provider,

			// 		connect: async () => {
			// 			pairing = await provider.core.pairing.pair({ uri: 'https://blockhead.info' })
			// 		},

			// 		subscribe: () => subscribeEip1193(provider),

			// 		switchNetwork: async (network: Ethereum.Network) => (
			// 			await provider.emitSessionEvent({
			// 				topic,
			// 				event: {
			// 					name: "accountsChanged",
			// 					data: ["0xab16a96D359eC26a11e2C2b3d8f8B8942d5Bfcdb"],
			// 				},
			// 				chainId: `eip155:${network.chainId}`,
			// 		  	})
			// 		),

			// 		disconnect: async () => {
			// 			await provider.disconnectSession({
			// 				topic,
			// 				reason: getSdkError('USER_DISCONNECTED'),
			// 			})
			// 		}
			// 	}
			// }

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

				let session: SessionTypes.Struct | void = walletconnectTopic ? sessions.find(session => session.topic === walletconnectTopic) : undefined

				let web3Modal: Web3Modal
			
				const onModalClose = (callback: () => void) => {
					const unsubscribe = web3Modal?.subscribeModal(({ open }) => {
						if(!open){
							unsubscribe()
							callback()
						}
					})
				}

				const chains = networks.map(network => `eip155:${network.chainId}`)

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
										[WalletConnectionType.WalletConnect1_Web3Modal_Standalone]: 1,
										[WalletConnectionType.WalletConnect2_Web3Modal_Standalone]: 2,
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
						})().catch(reject)

						resolve({
							accounts: session?.namespaces.eip155.accounts.map(caip2Id => ({ address: parseCaip2Id(caip2Id).address! })),
							walletconnectTopic: session?.topic as WalletconnectTopic,
						})

						web3Modal?.closeModal()
					}),

					subscribe: () => ({
						accounts: readable<Account[]>(
							session?.namespaces.eip155.accounts.map(caip2Id => ({ address: parseCaip2Id(caip2Id).address! })),
							set => {
								signClient.events.on?.('session_event', (e) => console.log(e))
								signClient.events.on?.('session_update', (e) => console.log(e))
							}
						),
					
						chainId: readable<Ethereum.ChainID>(
							session?.namespaces.eip155.accounts.map(caip2Id => Number(parseCaip2Id(caip2Id).chainId) as Ethereum.ChainID)[0],
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
							topic: walletconnectTopic as string,
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
							topic: walletconnectTopic as string,
							reason: '',
						})
					}
				}
			}

			// case WalletConnectionType.WalletConnect2_EthereumProvider: {
			// 	const { EthereumProvider } = (await import('@walletconnect/ethereum-provider'))

			// 	const provider = await EthereumProvider.init({
			// 		projectId: env.WALLETCONNECT2_PROJECT_ID,
			// 		chains: networks.map(network => network.chainId),
			// 		methods: [
			// 			"eth_requestAccounts",
			// 			"eth_accounts",
			// 			"eth_chainId",
			// 			"eth_sendTransaction",
			// 			"eth_signTransaction",
			// 			"eth_sign",
			// 			"eth_signTypedData",
			// 			"personal_sign",
			// 		],
			// 		events: [
			// 			'accountsChanged',
			// 			'chainChanged',
			// 		],
			// 		// rpcMap: Object.fromEntries(networks.map(network => [network.chainId, network.rpc[0]])),
			// 		metadata: walletconnectMetadata,
			// 		showQrModal: true,
			// 	})

			// 	return {
			// 		walletType,
			// 		connectionType: WalletConnectionType.WalletConnect2_EthereumProvider,
			// 		provider,

			// 		connect: async () => {
			// 			console.log('connecting...')
			// 			await provider.connect({
			// 				chains: networks.map(network => network.chainId),
			// 				// rpcMap: Object.fromEntries(networks.map(network => [network.chainId, network.rpc[0]])),
			// 				// pairingTopic, // OPTIONAL pairing topic
			// 			})
			// 			console.log('connected...')

			// 			return {
			// 				accounts: await provider.enable() as Ethereum.Address[]
			// 			}
			// 		},

			// 		subscribe: () => subscribeEip1193(provider),

			// 		switchNetwork: async (network: Ethereum.Network) => (
			// 			await switchNetworkEip1193({ provider, network })
			// 		),

			// 		disconnect: async () => {
			// 			provider.qrcode = false
			// 			await provider.disconnect()
			// 		}
			// 	}
			// }

			case WalletConnectionType.WalletConnect2_Web3Modal3: {
				const { defaultWagmiConfig, createWeb3Modal } = await import('@web3modal/wagmi')

				const projectId = env.WALLETCONNECT2_PROJECT_ID
				const chains = networks.map(networkToViemChain)

				const wagmiConfig = defaultWagmiConfig({
					chains,
					projectId: env.WALLETCONNECT2_PROJECT_ID,
					appName: 'Blockhead',
				})

				const modal = createWeb3Modal({ wagmiConfig, projectId, chains })

				const { watchAccount, disconnect, getAccount, watchWalletClient } = await import('@wagmi/core')

				return {
					walletType,
					connectionType,

					connect: async () => {
						await modal.open()

						return {
							accounts: [{
								address: getAccount().address
							}],
						}
					},

					subscribe: () => ({
						accounts: readable<Account[]>([], set => {
							watchAccount(account => set([{ address: account.address }].filter(isTruthy)))
						}),
					
						chainId: readable<Ethereum.ChainID>(undefined, set => {
							watchWalletClient({}, async walletClient => set(await walletClient?.getChainId()))
						}),
					}),

					disconnect,
				}
			}

			case WalletConnectionType.WebmaxJs: {
				const { IntmaxWalletSigner } = await import('webmax')

				let signer: IntmaxWalletSigner

				return {
					walletType,
					connectionType: WalletConnectionType.WebmaxJs,
					// provider: ,

					connect: (isInitiatedByUser = true) => new Promise(async (resolve, reject) => {
						console.log({isInitiatedByUser})
						signer = new IntmaxWalletSigner()

						// If popup launched without user interaction, assume blocked by browser and fail after timeout
						if(!isInitiatedByUser)
							setTimeout(async () => {
								reject('Failed to connect automatically (popup blocked).')
								await signer.closeIntmaxWallet(globalThis.window)
							}, 5000)

						const account = await signer.connectToAccount()

						resolve({
							accounts: [{ address: account.address }],
							chainId: account.chainId,
						})
					}),

					subscribe: () => ({
						accounts: readable<Account[]>([signer?._account.address], set => {
							signer.getAddress()
								.then((address: Ethereum.Address) => set([{ address }]))

							// provider.eventPromiseListener()
					
							// return () => {}
						}),
					
						chainId: readable<Ethereum.ChainID>(undefined, set => {
							signer.getChainId()
								.then(chainId => set(chainId as Ethereum.ChainID))
						}),
					}),

					switchNetwork: async (network: Ethereum.Network) => (
						await signer.switchChain(network.chainId)
					),

					disconnect: async () => {
						await signer.closeIntmaxWallet(globalThis.window)
					}
				}
			}

			case WalletConnectionType.BananaWalletSdk: {
				const { Banana, Chains } = await import('@rize-labs/banana-wallet-sdk')

				const network = networksByChainID[Chains.gnosis]

				if(!Object.values(Chains).some(chainId => chainId === network.chainId))
					throw new Error(`Banana Wallet SDK isn't yet deployed on ${network.name}.`)

				const sdk = new Banana(network.chainId)

				return {
					walletType,
					connectionType: WalletConnectionType.BananaWalletSdk,

					connect: async () => {
						const username: string = sdk.getWalletName();

						const wallet = username
							? await sdk.connectWallet(username)
							: await (async () => {
								const username = globalThis.prompt('Choose a unique Banana Wallet username:')?.trim()

								if(!username)
									throw new Error('No username provided.')

								if(await sdk.isWalletNameUnique(username) === false)
									throw new Error(`The username "${username}" is taken.`)

								return await sdk.createWallet(username)

								// Variant: re-prompt if username is invalid
								/*
								let username

								while(!username)
									username = globalThis.prompt('Choose a Banana Wallet username:').trim()

								while(await sdk.isWalletNameUnique(username) === false)
									username = globalThis.prompt(`The username "${username}" is taken.\nChoose a Banana Wallet username:`).trim()

								await sdk.createWallet(username)
								*/
							})()

						const address = wallet.walletAddress

						// const eoas = await sdk.getEOAAddress(username)

						return {
							accounts: [{
								address,
								nickname: username,
							}],
							chainId: network.chainId,
						}
					},

					disconnect: async () => {
						const { success, error } = await sdk.resetWallet()

						if(error)
							throw new Error(error)
					},
				}
			}
		}
	}

	throw new Error('No provider found')
}
