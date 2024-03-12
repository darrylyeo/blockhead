import type { Ethereum } from '$/data/networks/types'
import type { Signer } from 'ethers'
import type { KnownWalletType } from '$/data/wallets'
import type { WalletConnection, Provider, WalletconnectTopic } from './walletConnection'


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

	newSelector?: AccountConnectionSelector,
}

type SerializedAccountConnection = {
	id?: string,
	selector: AccountConnectionSelector,
	autoconnect?: boolean,
	state?: Omit<AccountConnectionState, 'walletConnection' | 'signer'>,
}

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
}

export type Account = {
	address?: Ethereum.Address,
	nickname?: string,
}



import { localStorageWritable } from '$/utils/localStorageWritable'

export const accountConnections = localStorageWritable(
	'accountConnections',
	[] as SerializedAccountConnection[],
	accountConnectionsJson => accountConnectionsJson.map(json => new AccountConnection(json)),
	accountConnections => accountConnections.map(accountConnections => accountConnections.serialize()),
)


import { BrowserProvider } from 'ethers'

const getSigner = (provider: Provider) => {
	try {
		return new BrowserProvider(provider).getSigner() // Object.assign(signer, { address: accounts[0] }),
	}catch(e){
		console.error('Failed to get signer', e)
		return undefined
	}
}


import { readable } from 'svelte/store'
import type { Result } from '$/utils/apolloRequestStore'

export const getAccountConnectionState = ({
	walletConnection,
	isInitiatedByUser = true,
}: {
	walletConnection: WalletConnection,
	isInitiatedByUser?: boolean
}) =>
	readable<Result<AccountConnectionState>>(
		{loading: true},
		set => void (async () => {
			const { accounts, chainId, newSelector } = await walletConnection.connect(isInitiatedByUser)

			const accountConnectionState: AccountConnectionState = {
				walletConnection,
				signer: walletConnection.provider && await getSigner(walletConnection.provider),

				account: accounts?.[0]!,
				chainId,

				newSelector,
			}

			set({
				loading: false,
				data: accountConnectionState
			})

			if(walletConnection.subscribe){
				const stores = walletConnection.subscribe()

				stores.accounts.subscribe(accounts => set({
					loading: false,
					data: {
						...accountConnectionState,
						account: accounts[0]
					}
				}))

				stores.chainId.subscribe(chainId => set({
					loading: false,
					data: {
						...accountConnectionState,
						chainId
					}
				}))
			}
		})()
		.catch(error => {
			set({
				loading: false,
				error
			})
		})
	)
