
import { writable } from 'svelte/store'

export type EthereumNetwork = 'mainnet' | 'rinkeby' | 'kovan'

export const ethereumNetwork = writable<EthereumNetwork>('mainnet')