
import type { Signer } from 'ethers'
import type { WalletType, WalletConnection, Provider } from './walletConnection'

export type AccountConnection = {
	id: string,
	walletType: WalletType,
	state?: AccountConnectionState,
	autoconnect?: boolean,
}

export type AccountConnectionState = {
	walletConnection?: WalletConnection
	signer?: Signer
	address?: string
	chainId?: number
}


type SerializedAccountConnection = {
	id?: string,
	walletType: WalletType,
	state?: Omit<AccountConnectionState, 'walletConnection' | 'signer'>,
	autoconnect?: boolean,
}


export const createAccountConnection = ({
	id = crypto.randomUUID(),
	walletType,
	state = {},
	autoconnect = false,
}: SerializedAccountConnection) => ({
	id,
	walletType,
	state,
	autoconnect,
	// toJSON(){
	// 	return serializeAccountConnection(this)
	// }
}) as AccountConnection

export const serializeAccountConnection = ({
	id,
	walletType,
	state: {
		address,
		chainId,
	} = {},
	autoconnect,
}: AccountConnection) => ({
	id,
	walletType,
	state: {
		address,
		chainId,
	},
	autoconnect,
}) as SerializedAccountConnection


import { localStorageWritable } from '../utils/localStorageWritable'

export const accountConnections = localStorageWritable(
	'accountConnections',
	[] as SerializedAccountConnection[],
	accountConnectionsJson => accountConnectionsJson.map(createAccountConnection),
	accountConnections => accountConnections.map(serializeAccountConnection)
)


import { BrowserProvider } from 'ethers'

const getSigner = (provider: Provider) =>
	new BrowserProvider(provider).getSigner() // Object.assign(signer, { address: accounts[0] }),


import { readable } from 'svelte/store'
import type { Result } from '../utils/apolloRequestStore'

export const getAccountConnectionState = (walletConnection: WalletConnection) =>
	readable<Result<AccountConnectionState>>(
		{loading: true},
		set => void (async () => {
			const accounts = await walletConnection.connect()

			const accountConnectionState: AccountConnectionState = {
				walletConnection,
				signer: getSigner(walletConnection.provider),
				address: accounts?.[0],
				chainId: undefined,
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
						address: accounts[0]
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
