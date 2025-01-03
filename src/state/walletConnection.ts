// Types/constants
import type { BrandedString } from '$/utils/branded'

import { WalletConnectionType, walletConnectionTypes } from '$/data/walletConnectionTypes'
import { knownWalletsByType, type GlobalInjectedEip1193Resolver } from '$/data/wallets'

import type { Account, AccountConnectionSelector } from './account'

import type { Readable } from 'svelte/store'

import type { Ethereum } from '$/data/networks/types'

export type WalletConnectionState = {
	accounts: Account[]
	chainId: Ethereum.ChainId
}

type WalletConnectionStateStores = {
	[K in keyof WalletConnectionState]: Readable<WalletConnectionState[K]>
}

export type WalletConnection = {
	type: WalletConnectionType,

	provider?: Ethereum.Provider,
	globalInjectedEip1193Resolver?: GlobalInjectedEip1193Resolver,

	connect: (isInitiatedByUser?: boolean) => Promise<(
		& WalletConnectionState
		& {
			newSelector?: AccountConnectionSelector,
		}
	)>

	subscribe?: () => WalletConnectionStateStores,

	switchNetwork?: (network: Ethereum.Network) => void,

	disconnect?: () => void,
}

export type WalletconnectTopic = BrandedString<'WalletconnectTopic'>


// Functions
const connectEip1193 = async (
	eip1193Provider: (
		| Ethereum.Provider
		| Omit<Ethereum.Provider, 'request'> & { send: Ethereum.Provider['request'] }
		| {
			sendAsync: (
				args: { method: string }, // Parameters<Ethereum.Provider['request']>[0],
				callback: (error: Error, accounts: Ethereum.Address[]) => void
			) => void
		}
	)
): Promise<{ accounts: Account[]}> => {
	if(!['request', 'send', 'sendAsync'].some(method => method in eip1193Provider))
		throw new Error(`The EIP-1193 provider does not support any known connection methods.`)

	const accounts = (
		'request' in eip1193Provider ?
			await eip1193Provider.request({
				method: 'eth_requestAccounts',
			})
		: 'send' in eip1193Provider ?
			await eip1193Provider.send({
				method: 'eth_requestAccounts',
			})
		: 'sendAsync' in eip1193Provider ?
			await new Promise((resolve, reject) => {
				eip1193Provider.sendAsync(
					{
						method: 'eth_accounts',
					},
					(error, accounts) => {
						error
							? reject(error)
							: resolve(accounts)
					},
				)
			})
		:
			undefined
	) as Ethereum.Address[]

	if(!accounts)
		throw new Error(`No accounts were found.`)

	return {
		accounts: accounts
			.map(address => ({ address })),
	}
}


import { readable } from 'svelte/store'

const subscribeEip1193 = (provider: Ethereum.Provider) => ({
	accounts: readable<WalletConnectionState['accounts']>([], set => {
		const onAccountsChanged = (addresses: Ethereum.Address[]) => set(addresses.map(address => ({ address })))

		provider.request({ method: 'eth_accounts' }).then(onAccountsChanged)

		provider.on?.('accountsChanged', onAccountsChanged)

		return () => provider.removeListener?.('accountsChanged', onAccountsChanged)
	}),

	chainId: readable<WalletConnectionState['chainId']>(undefined, set => {
		const onChainIdChanged = (chainId: number | string) => set(Number(chainId) as Ethereum.ChainId)

		provider.request({ method: 'eth_chainId' }).then(onChainIdChanged)

		provider.on?.('chainChanged', onChainIdChanged)

		return () => provider.removeListener?.('chainChanged', onChainIdChanged)
	}),
})


import { toHex } from 'viem'

const switchNetworkEip1193 = async ({
	provider,
	network
}: {
	provider: Ethereum.Provider,
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


// Internal state
let walletconnect2SignClient: ReturnType<typeof import('@walletconnect/sign-client').default['init']> | undefined

import type { WalletConnectModal } from '@walletconnect/modal'
let walletconnect2Modal: WalletConnectModal | undefined

import type { createWeb3Modal } from '@web3modal/wagmi'
let web3Modal: ReturnType<typeof createWeb3Modal> | undefined


import * as publicEnv from '$env/static/public'
import { ethereumMainnet, getNetworkRPC, networkByChainId } from '$/data/networks'

import { isTruthy } from '$/utils/isTruthy'

export const getWalletConnection = async ({
	selector,
	networks = [ethereumMainnet], // availableNetworks
	theme,
	jsonRpcUri = getNetworkRPC(ethereumMainnet),
}: {
	selector: AccountConnectionSelector,
	networks?: Ethereum.Network[],
	theme?: SvelteStore<{
		mode?: ConstructorParameters<typeof WalletConnectModal>[0]['themeMode'],
		color?: ConstructorParameters<typeof WalletConnectModal>[0]['themeColor'],
		background?: ConstructorParameters<typeof WalletConnectModal>[0]['themeBackground'],
	}>,
	jsonRpcUri?: string,
}): Promise<WalletConnection> => {
	const knownWalletConfig = selector.knownWallet && knownWalletsByType[selector.knownWallet.type]

	const connectionTypes = (
		knownWalletConfig ?
			knownWalletConfig.connectionTypes
		: selector.eip6963 ?
			[
				{
					type: WalletConnectionType.Eip6963,
					rdns: selector.eip6963.rdns,
				},
			] as const
		:
			[]
	)

	for (const connectionType of connectionTypes) {
		switch (connectionType.type) {
			case WalletConnectionType.InjectedEip1193: {
				for(const globalInjectedEip1193Resolver of connectionType.globalResolvers){
					const provider = globalInjectedEip1193Resolver(globalThis)

					if (provider && (!connectionType.matches || connectionType.matches(provider)))
						return {
							type: WalletConnectionType.InjectedEip1193,
							provider,
							globalInjectedEip1193Resolver,

							connect: async () => await connectEip1193(provider),

							subscribe: () => subscribeEip1193(provider),

							switchNetwork: async (network: Ethereum.Network) => await switchNetworkEip1193({ provider, network }),
						}
				}

				break
			}

			case WalletConnectionType.Eip6963: {
				const { eip6963Providers, findEip6963Provider } = await import('./wallets')
				const { get } = await import('svelte/store')

				for(const rdns of (
					new Set(
						[
							selector.eip6963?.rdns,
							connectionType.rdns,
						]
							.filter(isTruthy)
					)
				)){
					const eip6963Provider = findEip6963Provider({
						eip6963Providers: get(eip6963Providers),
						rdns,
					})

					const provider = eip6963Provider?.provider

					if(provider)
						return {
							type: WalletConnectionType.Eip6963,
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
				type CoinbaseWalletProvider = import('@coinbase/wallet-sdk').CoinbaseWalletProvider

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
					type: WalletConnectionType.CoinbaseWalletSDK,
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
				type WalletConnectProvider = import('@walletconnect/web3-provider').default

				let provider: WalletConnectProvider = new WalletConnectProvider({
					rpc: Object.fromEntries(networks.map(network => [network.chainId, jsonRpcUri || network.rpc[0]])),
					bridge: publicEnv.PUBLIC_WALLETCONNECT1_BRIDGE_URI,

					// Restrict WalletConnect options to the selected wallet
					...connectionType.mobileLinks && {
						qrcodeModalOptions: {
							mobileLinks: connectionType.mobileLinks,
						},
					},
				})

				return {
					type: WalletConnectionType.WalletConnect1,
					provider,

					connect: async () => {
						provider = new WalletConnectProvider({
							rpc: Object.fromEntries(networks.map(network => [network.chainId, jsonRpcUri || network.rpc[0]])),
							bridge: publicEnv.PUBLIC_WALLETCONNECT1_BRIDGE_URI,
		
							// Restrict WalletConnect options to the selected wallet
							...connectionType.mobileLinks && {
								qrcodeModalOptions: {
									mobileLinks: connectionType.mobileLinks,
								},
							},
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

			case WalletConnectionType.WalletConnect2: {
				const { default: SignClient } = await import('@walletconnect/sign-client')
				type Struct = import('@walletconnect/types').SessionTypes.Struct

				const { parseCaip2Id } = await import ('$/utils/parseCaip2Id')

				const signClient = walletconnect2SignClient ||= await (async () => {
					const walletconnectMetadata = {
						name: "Blockhead",
						description: "Track, visualize, and explore all of crypto/DeFi/web3 in ONE interface!",
						url: "https://blockhead.info",
						icons: ['/Blockhead-Logo.svg'],
					}

					const signClient = await SignClient.init({
						projectId: publicEnv.PUBLIC_WALLETCONNECT2_PROJECT_ID,
						// relayUrl: publicEnv.PUBLIC_WALLETCONNECT2_RELAY_URL,
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
						signClient.events.on?.(eventName, event => {
							console.info('WalletConnect Sign event', eventName, event)
						})

					return signClient
				})()

				const sessions = signClient.session.getAll()

				console.info('WalletConnect Sign', { signClient, sessions })

				let session: Struct | void = selector.walletconnect
					? sessions.find(session => session.topic === selector.walletconnect!.topic)
					: undefined

				const chains = networks.map(network => `eip155:${network.chainId}`)

				return {
					type: connectionType.type,

					// eslint-disable-next-line no-async-promise-executor
					connect: () => new Promise(async (resolve, reject) => {
						try {
							session ||= await (async () => {
								const [
									modal,
									{ uri, approval },
								] = await Promise.all([
									(async () => {
										return walletconnect2Modal ||= await (async () => {
											const { WalletConnectModal } = await import('@walletconnect/modal')

											const modal = new WalletConnectModal({
												projectId: publicEnv.PUBLIC_WALLETCONNECT2_PROJECT_ID,
												themeVariables: {
													'--wcm-z-index': '19',
												},
												chains,
												enableExplorer: true,
												explorerRecommendedWalletIds: connectionType?.explorerIds,
											})

											theme?.subscribe($theme => {
												modal.setTheme({
													themeMode: $theme?.mode ?? 'dark',
												})
											})

											return modal
										})()
									})(),

									signClient.connect({
										optionalNamespaces: {
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
									}),
								])

								if(!uri)
									throw new Error('Missing wc: uri')

								console.info('WalletConnect Sign', { uri })

								const unsubscribe = modal.subscribeModal(({ open }) => {
									if(!open){
										unsubscribe()

										setTimeout(() => {
											reject(new Error('Closed WalletConnect modal.'))
										}, 500)
									}
								})

								modal.openModal({
									uri,
									standaloneChains: chains,
								})

								const session = await approval()
							
								return session
							})()

							resolve({
								newSelector: {
									...selector,
									walletconnect: {
										topic: session.topic as WalletconnectTopic,
									},
								},
								accounts: session.namespaces.eip155.accounts
									.map(caip2Id => ({ address: parseCaip2Id(caip2Id).address! })),
							})
						}catch(e){
							reject(e)
						}finally{
							walletconnect2Modal?.closeModal()
						}
					}),

					subscribe: () => ({
						accounts: readable<Account[]>(
							session?.namespaces.eip155.accounts.map(caip2Id => ({ address: parseCaip2Id(caip2Id).address! })),
							set => {
								signClient.events.on?.('session_event', (e) => console.log(e))
								signClient.events.on?.('session_update', (e) => console.log(e))
							}
						),
					
						chainId: readable<Ethereum.ChainId>(
							session?.namespaces.eip155.accounts.map(caip2Id => Number(parseCaip2Id(caip2Id).chainId) as Ethereum.ChainId)[0],
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
							topic: session!.topic as string,
							event: {
								name: "accountsChanged",
								data: ["0xab16a96D359eC26a11e2C2b3d8f8B8942d5Bfcdb"],
							},
							chainId: `eip155:${network.chainId}`,
					  	})
					),

					disconnect: async () => {
						walletconnect2Modal?.closeModal()

						await signClient.disconnect({
							topic: session!.topic as string,
							reason: '',
						})
					}
				}
			}

			case WalletConnectionType.Web3Modal: {
				const { defaultWagmiConfig, createWeb3Modal } = await import('@web3modal/wagmi')
				const { networkToViemChain } = await import('$/data/networkProviders')

				const projectId = publicEnv.PUBLIC_WALLETCONNECT2_PROJECT_ID
				const chains = networks.map(networkToViemChain)

				const wagmiConfig = defaultWagmiConfig({
					chains,
					projectId,
				})

				const { getConnections, reconnect, watchAccount, watchChainId, disconnect } = await import('@wagmi/core')

				let connections = getConnections(wagmiConfig)
				console.log({connections})

				return {
					type: connectionType.type,

					connect: (isInitiatedByUser) => new Promise(async (resolve, reject) => {
						web3Modal ||= (() => {
							const modal = createWeb3Modal({
								wagmiConfig,
								projectId,
								chains,
								themeMode: 'dark',
							})

							theme?.subscribe($theme => {
								modal.setThemeMode($theme?.mode ?? 'dark')
							})

							return modal
						})()

						if(isInitiatedByUser)
							web3Modal.open()

						if(!connections.length){
							const unsubscribe = watchAccount(wagmiConfig, {
								onChange: (account) => {
									if(account.isConnected){
										resolve({
											accounts: (account.addresses ?? [])
												.map(address => ({ address }))
										})

										unsubscribe()
									}
								},
							})

							// web3Modal.subscribeState(({ open }) => {
							// 	if(!open)
							// 		reject(new Error('Closed Web3Modal'))
							// })

							// await web3Modal.open()

							connections = await reconnect(wagmiConfig)

							if(connections.length){
								resolve({
									accounts: connections[0].accounts.map(address => ({ address })),
								})
							}
						}

						else
							resolve({
								accounts: connections[0].accounts.map(address => ({ address })),
							})
					}),

					subscribe: () => ({
						accounts: readable<Account[]>([], set => {
							return watchAccount(wagmiConfig, {
								onChange: (account) => {
									set(
										(account.addresses ?? [])
											.map(address => ({ address }))
									)
								},
							})
						}),
					
						chainId: readable<Ethereum.ChainId>(undefined, set => {
							return watchChainId(wagmiConfig, {
								onChange: (chainId) => {
									set(chainId)
								},
							})
						}),
					}),

					disconnect: async () => {
						if(connections.length){
							await disconnect(wagmiConfig, {
								connector: connections[0].connector,
							})
						}
					},
				}
			}

			case WalletConnectionType.WebmaxJs: {
				const { IntmaxWalletSigner } = await import('webmax')

				let signer: IntmaxWalletSigner

				return {
					type: WalletConnectionType.WebmaxJs,
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
					
						chainId: readable<Ethereum.ChainId>(undefined, set => {
							signer.getChainId()
								.then(chainId => set(chainId as Ethereum.ChainId))
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

			// case WalletConnectionType.BananaWalletSdk: {
			// 	const { Banana, Chains } = await import('@rize-labs/banana-wallet-sdk')

			// 	const network = networkByChainId.get(Chains.gnosis)

			// 	if(!Object.values(Chains).some(chainId => chainId === network.chainId))
			// 		throw new Error(`Banana Wallet SDK isn't yet deployed on ${network.name}.`)

			// 	const sdk = new Banana(network.chainId)

			// 	return {
			// 		type: WalletConnectionType.BananaWalletSdk,

			// 		connect: async () => {
			// 			const username: string = sdk.getWalletName();

			// 			const wallet = username
			// 				? await sdk.connectWallet(username)
			// 				: await (async () => {
			// 					const username = globalThis.prompt('Choose a unique Banana Wallet username:')?.trim()

			// 					if(!username)
			// 						throw new Error('No username provided.')

			// 					if(await sdk.isWalletNameUnique(username) === false)
			// 						throw new Error(`The username "${username}" is taken.`)

			// 					return await sdk.createWallet(username)

			// 					// Variant: re-prompt if username is invalid
			// 					/*
			// 					let username

			// 					while(!username)
			// 						username = globalThis.prompt('Choose a Banana Wallet username:').trim()

			// 					while(await sdk.isWalletNameUnique(username) === false)
			// 						username = globalThis.prompt(`The username "${username}" is taken.\nChoose a Banana Wallet username:`).trim()

			// 					await sdk.createWallet(username)
			// 					*/
			// 				})()

			// 			const address = wallet.walletAddress

			// 			// const eoas = await sdk.getEOAAddress(username)

			// 			return {
			// 				accounts: [{
			// 					address,
			// 					nickname: username,
			// 				}],
			// 				chainId: network.chainId,
			// 			}
			// 		},

			// 		disconnect: async () => {
			// 			const { success, error } = await sdk.resetWallet()

			// 			if(error)
			// 				throw new Error(error)
			// 		},
			// 	}
			// }
		}
	}

	throw new Error(`The wallet was not detected through any known connection methods: ${
		new Intl.ListFormat(undefined, { type: 'disjunction' })
			.format(
				connectionTypes
					.map(connectionType => walletConnectionTypes[connectionType.type].name)
			)
	}`)
}
