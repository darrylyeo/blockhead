
import type { Signer } from 'ethers'
import type { WalletConnection } from '../data/ethereum/wallets'


export type ConnectedAccount = {
	walletConnection: WalletConnection
	signer: Signer
	address: string
	chainId: number
}
