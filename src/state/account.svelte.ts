// Types
import type { Ethereum } from '$/data/networks/types'
import type { Signer } from 'ethers'
import type { KnownWalletType } from '$/data/wallets'
import { type WalletConnection, type Provider, type WalletconnectTopic, getWalletConnection } from './walletConnection'

export type Account = {
	address?: Ethereum.Address,
	nickname?: string,
}

export type AccountConnectionSelector = {
	knownWallet?: {
		type: KnownWalletType,
	},
	eip6963?: {
		rdns: string
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
	id = $state<string>()
	selector = $state<AccountConnectionSelector>()!
	autoconnect  = $state<boolean>()
	state: AccountConnectionState = new class {
		walletConnection = $state(undefined)
		signer = $state(undefined)
		account = $state(undefined)
		chainId = $state(undefined)
	}

	constructor({
		id = crypto.randomUUID(),
		selector = {},
		autoconnect = false,
		state = {},
	}: SerializedAccountConnection) {
		this.id = id
		this.selector = selector
		this.autoconnect = autoconnect
		Object.assign(this.state, state)
	}

	serialized: SerializedAccountConnection = $derived(
		{
			id: this.id,
			selector: this.selector,
			autoconnect: this.autoconnect,
			state: {
				account: this.state.account,
				chainId: this.state.chainId,
			},
		}
	)

	async getWalletConnection({
		wallets,
		theme,
	}: {
		wallets: Wallets
		theme: Parameters<typeof getWalletConnection>[0]['theme']
	}){
		return this.state.walletConnection ??= await getWalletConnection({
			wallets,
			selector: this.selector,
			theme,
		})
	}

	#unsubscribe?: () => void

	async connectWallet({
		isInitiatedByUser,
		wallets,
		theme,
	}: {
		isInitiatedByUser: boolean
		wallets: Wallets
		theme?: Parameters<typeof getWalletConnection>[0]['theme']
	}){
		const walletConnection = await this.getWalletConnection({
			wallets,
			theme,
		})

		const { accounts, chainId, newSelector } = await walletConnection.connect(isInitiatedByUser)

		this.#unsubscribe = $effect.root(() => {
			this.state.walletConnection = walletConnection
			// this.state.signer = walletConnection.provider && await getSigner(walletConnection.provider)

			this.state.account = accounts?.[0]
			this.state.chainId = chainId

			if(newSelector)
				this.selector = newSelector

			if(walletConnection.subscribe){
				const stores = walletConnection.subscribe()

				$effect(() => {
					return stores.accounts.subscribe(accounts => {
						this.state.account = accounts[0]
					})
				})

				$effect(() => {
					return stores.chainId.subscribe(chainId => {
						this.state.chainId = chainId
					})
				})
			}
		})
	}

	async disconnectWallet(){
		try {
			await this.state.walletConnection?.disconnect?.()
		}catch(error){
			console.error(error)
		}

		this.state.walletConnection = undefined

		this.#unsubscribe?.()
		this.#unsubscribe = undefined
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



import { StorageValue } from '$/utils/StorageValue.svelte'

class AccountConnections {
	#connections = new StorageValue<
		AccountConnection[],
		SerializedAccountConnection[]
	>(
		'accountConnections',
		[],
		{
			deserialize: accountConnectionsJson => accountConnectionsJson.map(json => new AccountConnection(json)),
			serialize: accountConnections => accountConnections.map(accountConnection => accountConnection.serialized),
		}
	)

	connections = $derived(
		this.#connections.value
	)

	addConnection({
		selector,
	}: {
		selector: AccountConnectionSelector
	}){
		this.connections.unshift(
			new AccountConnection({
				selector,
			})
		)

		// Index of added item
		return 0
	}

	removeConnection(
		index: number,
	){
		return this.connections.splice(index, 1)[0]
	}
}



// Context
const key = Symbol('accountConnections')

import { getContext, setContext } from 'svelte'

export const setAccountConnectionsContext = () => (
	setContext(key, new AccountConnections())
)

export const getAccountConnectionsContext = () => (
	getContext<AccountConnections>(key)
)



import type { Wallets } from './wallets.svelte'

export const getAccountConnectionsInfo = ({
	accountConnections,
	wallets,
}: {
	accountConnections: AccountConnections,
	wallets: Wallets,
}) => (
	new Map(
		accountConnections.connections
			.map(accountConnection => {
				const knownWalletConfig = accountConnection.selector.knownWallet

				const eip6963Provider = (
					accountConnection.selector.eip6963
					&& wallets.findEip6963Provider({
						rdns: accountConnection.selector.eip6963.rdns,
					})
				)

				return [
					accountConnection,
					{
						address: accountConnection.state.account?.address,
						walletName: knownWalletConfig?.type || eip6963Provider?.info.name,
					}
				]
			})
	)
)



import { BrowserProvider } from 'ethers'

const getSigner = (provider: Ethereum.Provider) => {
	try {
		return new BrowserProvider(provider).getSigner() // Object.assign(signer, { address: accounts[0] }),
	}catch(e){
		console.error('Failed to get signer', e)
		return undefined
	}
}
