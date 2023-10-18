export const filecoinAddressPattern = /[ft][0-4][0-9a-z]+/

export const isFilecoinAddress = (string: string) => (
	string.match(new RegExp(`^${filecoinAddressPattern.source}$`)) !== null
)
