import type { Entity } from './types'
import type { EvmTransaction } from './EvmTransaction'
import type { EvmNetwork } from './EvmNetwork'

export type EvmAddress = `0x${string}`

export type EvmActor = Entity<
	{
		network: EvmNetwork['$id']
		address: EvmAddress
	},
	{
		
	},
	{
		transactions: EvmTransaction['$id'][]
	}
>
