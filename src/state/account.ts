
import type { Signer } from 'ethers'
import type { WalletType, WalletConnection } from '../data/ethereum/wallets'

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
