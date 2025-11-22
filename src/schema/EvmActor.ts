import { EntityType, type Entity } from './_Entity.ts'
import type { EvmTransaction } from './EvmTransaction.ts'
import type { EvmNetwork } from './EvmNetwork.ts'

export type EvmAddress = `0x${string}`

export type EvmActor = Entity<
	EntityType.EvmActor,
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
