
import { writable } from 'svelte/store'

export const network = writable<string>('rinkeby') // 'mainnet'