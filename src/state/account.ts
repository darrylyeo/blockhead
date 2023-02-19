
import type { Signer } from 'ethers'
import type { WalletType, WalletConnection, Provider } from '../data/ethereum/wallets'

export type AccountConnection = {
	id: string,
	walletType: WalletType,
	state?: AccountConnectionState
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
	state?: Omit<AccountConnectionState, 'walletConnection' | 'signer'>
}


export const createAccountConnection = ({
	id = crypto.randomUUID(),
	walletType,
	state = {},
}: SerializedAccountConnection) => ({
	id,
	walletType,
	state,
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
	} = {}
}: AccountConnection) => ({
	id,
	walletType,
	state: {
		address,
		chainId,
	},
}) as SerializedAccountConnection


import { localStorageWritable } from '../utils/localStorageWritable'

export const accountConnections = localStorageWritable(
	'accountConnections',
	[] as SerializedAccountConnection[],
	accountConnectionsJson => accountConnectionsJson.map(createAccountConnection),
	accountConnections => accountConnections.map(serializeAccountConnection)
)


import { Web3Provider } from '@ethersproject/providers'

const getSigner = (provider: Provider) =>
	new Web3Provider(provider).getSigner() // Object.assign(signer, { address: accounts[0] }),


import { readable } from 'svelte/store'
import type { Result } from '../data/apollo-store'

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
