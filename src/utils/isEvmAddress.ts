import type { Ethereum } from '$/data/networks/types'

export const isEvmAddress = (string: string): string is Ethereum.Address =>
	/^0x[0-9a-f]{40}$/i.test(string)
