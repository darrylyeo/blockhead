export const isFilecoinAddress = (string: string) => (
	string.match(/^[ft][0-4][0-9a-z]+$/) !== null
)
