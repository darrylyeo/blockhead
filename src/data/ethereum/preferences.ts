
import type { Ethereum } from './types'
import { writable } from 'svelte/store'

export const ethereumNetwork = writable<Ethereum.Network>('mainnet')
export const preferredEthereumProvider = writable<Ethereum.ProviderName>('Portis')