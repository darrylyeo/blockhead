export const parseCaip2Id = (caip2Id: string) => (
	caip2Id.match(/(?<namespace>[^:]+):(?<chainId>\d+):(?<address>0x[0-9a-fA-F]{40})/)?.groups ?? {
		namespace: '',
		chainId: '',
		address: '',
	}
) as {
	namespace: string,
	chainId: string,
	address: string,
}
