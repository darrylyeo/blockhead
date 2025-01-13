import type { Ethereum } from './networks/types'
import type { Filecoin } from './filecoin'

export type NetworkAccountAddress = Ethereum.Address | Filecoin.Address
