export const isEvmTransactionId = (string: string) =>
	/^0x[0-9a-f]{64}$/i.test(string)
