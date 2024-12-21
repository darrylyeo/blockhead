// Types
import type { Eip6963Rdns } from './wallets'
import type { Ethereum } from '$/data/networks/types'
import type { Signer } from 'ethers'
import { type KnownWalletType, knownWalletsByType, knownWalletsByEip6963Rdns } from '$/data/wallets'
import { type WalletConnection, type WalletconnectTopic, getWalletConnection } from './walletConnection'

export type Account = {
	address?: Ethereum.Address,
	nickname?: string,
}

export type AccountConnectionSelector = {
	knownWallet?: {
		type: KnownWalletType,
	},
	eip6963?: {
		rdns: Eip6963Rdns,
	},
	walletconnect?: {
		topic: WalletconnectTopic,
	},
}

export type AccountConnectionState = {
	walletConnection?: WalletConnection,
	signer?: Signer,

	account?: Account,
	chainId?: number,
}

type SerializedAccountConnection = {
	id?: string,
	selector: AccountConnectionSelector,
	autoconnect?: boolean,
	state?: Omit<AccountConnectionState, 'walletConnection' | 'signer'>,
}


// State
import { readable } from 'svelte/store'
import type { ApolloResult } from '$/utils/apolloResult'

export class AccountConnection {
	id: string
	selector: AccountConnectionSelector
	autoconnect: boolean
	state: AccountConnectionState

	constructor({
		id = crypto.randomUUID(),
		selector = {},
		autoconnect = false,
		state = {},
	}: SerializedAccountConnection) {
		this.id = id
		this.selector = selector
		this.autoconnect = autoconnect
		this.state = state
	}

	serialize(){
		return {
			id: this.id,
			selector: this.selector,
			autoconnect: this.autoconnect,
			state: {
				account: this.state.account,
				chainId: this.state.chainId,
			},
		} as SerializedAccountConnection
	}

	async getWalletConnection({
		theme,
	}: {
		theme: Parameters<typeof getWalletConnection>[0]['theme']
	}){
		return this.state.walletConnection ??= await getWalletConnection({
			selector: this.selector,
			theme,
		})
	}

	#unsubscribe = new Set<() => void>

	connectWallet({
		isInitiatedByUser,
		theme,
	}: {
		isInitiatedByUser: boolean
		theme?: Parameters<typeof getWalletConnection>[0]['theme']
	}){
		return readable<ApolloResult<AccountConnectionState>>(
			this.state ? { loading: true } : { loading: false, data: this.state },
			set => {
				(async () => {
					try {
						const walletConnection = await this.getWalletConnection({
							theme,
						})
				
						const { accounts, chainId, newSelector } = await walletConnection.connect(isInitiatedByUser)

						set({ loading: false, data: this.state })

						this.state.walletConnection = walletConnection
						this.state.signer = walletConnection.provider && await this.getSigner({ isInitiatedByUser }),

						this.state.account = accounts?.[0],
						this.state.chainId = chainId

						if(newSelector)
							this.selector = newSelector

						if(walletConnection.subscribe){
							const stores = await walletConnection.subscribe()

							this.#unsubscribe.add(
								stores.accounts.subscribe(accounts => {
									this.state.account = accounts[0]
									set({ loading: false, data: this.state })
								})
							)

							this.#unsubscribe.add(
								stores.chainId.subscribe(chainId => {
									this.state.chainId = chainId
									set({ loading: false, data: this.state })
								})
							)
						}
					}catch(error){
						set({
							error,
							loading: false,
							data: this.state,
						})
					}
				})()
			}
		)
	}

	async disconnectWallet(){
		await this.state.walletConnection?.disconnect?.()

		this.state.walletConnection = undefined

		for(const unsubscribe of this.#unsubscribe) unsubscribe()
		this.#unsubscribe.clear()
	}

	async getSigner({
		isInitiatedByUser,
	}: {
		isInitiatedByUser: boolean
	}){
		if(!this.state.walletConnection)
			await this.connectWallet({
				isInitiatedByUser,
			})

		return await getSigner(this.state.walletConnection!.provider)
	}
}



import { localStorageWritable } from '$/utils/localStorageWritable'

export const accountConnections = localStorageWritable(
	'accountConnections',
	[] as SerializedAccountConnection[],
	accountConnectionsJson => accountConnectionsJson.map(json => new AccountConnection(json)),
	accountConnections => accountConnections.map(accountConnections => accountConnections.serialize()),
)


import { derived } from 'svelte/store'
import { eip6963Providers, findEip6963Provider } from './wallets'
import { networkByChainId } from '$/data/networks'

export const accountConnectionToInfo: SvelteStore<
	Map<
		AccountConnection,
		{
			walletConnectionTypeName?: string
			network?: Ethereum.Network
			address?: Account['address']
			walletName?: string
			icon?: string
			colors?: string[]
		}
	>
> = derived(
	[
		accountConnections,
		eip6963Providers,
	],
	([$accountConnections, $eip6963Providers], set) => set(
		new Map(
			$accountConnections
				.map(accountConnection => {
					const knownWalletConfig = accountConnection.selector.knownWallet && knownWalletsByType[accountConnection.selector.knownWallet.type]

					const eip6963Provider = accountConnection.selector.eip6963 && findEip6963Provider({
						eip6963Providers: $eip6963Providers,
						rdns: accountConnection.selector.eip6963.rdns,
					})

					const knownEip6963WalletConfig = accountConnection.selector.eip6963 && knownWalletsByEip6963Rdns[accountConnection.selector.eip6963.rdns]

					const walletConnectionType = accountConnection.state.walletConnection?.type

					return [
						accountConnection,
						{
							walletConnectionTypeName: walletConnectionType && walletConnectionTypes[walletConnectionType]?.name || walletConnectionType,
							network: accountConnection.state.chainId && networkByChainId.get(accountConnection.state.chainId),
							address: accountConnection.state.account?.address,
							walletName: knownWalletConfig?.name ?? eip6963Provider?.info.name ?? knownEip6963WalletConfig?.name,
							icon: knownWalletConfig?.icon ?? eip6963Provider?.info.icon ?? knownEip6963WalletConfig?.icon,
							colors: knownWalletConfig?.colors ?? knownEip6963WalletConfig?.colors,
						}
					]
				})
		)
	)
)


import { BrowserProvider } from 'ethers'
import { walletConnectionTypes } from '$/data/walletConnectionTypes'

const getSigner = (provider: Provider) => {
	try {
		return new BrowserProvider(provider).getSigner() // Object.assign(signer, { address: accounts[0] }),
	}catch(e){
		console.error('Failed to get signer', e)
		return undefined
	}
}
