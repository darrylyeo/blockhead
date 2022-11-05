
import type { Signer } from 'ethers'
import type { WalletConnection, WalletType } from '../data/ethereum/wallets'


export type ConnectedAccount = {
	walletConnection: WalletConnection
	signer: Signer
	address: string
	chainId: number
}


import { localStorageWritable } from '../utils/localStorageWritable'

export const accountConnections = localStorageWritable<{
	walletType: WalletType
}[]>('accountConnections', [])
