import type { Ethereum } from '$/data/networks/types'

export const parseCaip2Id = (caip2Id: string) => (
	caip2Id.match(/(?<namespace>[^:]+):(?<chainId>\d+):(?<address>0x[0-9a-fA-F]{40})/)?.groups ?? {}
) as Partial<{
	namespace: string,
	chainId?: Ethereum.ChainId,
	address: Ethereum.Address,
}>
