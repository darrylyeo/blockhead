export const isEvmAddress = (string: string) =>
	/^0x[0-9a-f]{40}$/i.test(string)
