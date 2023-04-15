import type { Ethereum } from '../data/networks/types'
import type { ENS } from '../api/ens'
import type { LensName } from '../api/lens'


export type AccountId = Ethereum.Address | ENS.Name | LensName
