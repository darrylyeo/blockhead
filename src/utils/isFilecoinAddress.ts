// Types
import type { Filecoin } from '$/data/filecoin'
import type { Ethereum } from '$/data/networks/types'


// Functions
export const filecoinAddressPattern = /(?:[ft]0(?:[0-9]+)|[ft]1[1-9a-z]{39}|[ft]2[1-9a-z]{39}|[ft]3[1-9a-z]{84}|[ft]4[0-9]+f[0-9a-z]{39}|0x[0-9a-f]{40})/i

export const isFilecoinAddress = (string: string): string is Filecoin.Address | Ethereum.Address => (
	string.match(new RegExp(`^${filecoinAddressPattern.source}$`, filecoinAddressPattern.flags)) !== null
)
