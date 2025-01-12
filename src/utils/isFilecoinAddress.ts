export const filecoinAddressPattern = /(?:[ft]0(?:[0]|[1-9][0-9]*)|[ft]1[1-9a-z]{39}|[ft]2[1-9a-z]{39}|[ft]3[1-9a-z]{84}|[ft]4[0-9]{2}f[0-9a-z]{39}|0x[0-9a-f]{40})/i

export const isFilecoinAddress = (string: string) => (
	string.match(new RegExp(`^${filecoinAddressPattern.source}$`, filecoinAddressPattern.flags)) !== null
)
