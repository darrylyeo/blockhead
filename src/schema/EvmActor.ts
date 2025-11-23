import { EntityType, type Entity } from './_Entity.ts'
import type { EvmTransaction } from './EvmTransaction.ts'
import type { EvmNetwork } from './EvmNetwork.ts'

export type EvmAddress = `0x${string}`

export enum EvmActorType {
	EOA = 'EOA',
	Contract = 'Contract',
}

export type EvmActor<
	_EvmActorType extends EvmActorType = EvmActorType,
> = Entity<
	EntityType.EvmActor,
	{
		$network: EvmNetwork['$id']
		address: EvmAddress
	},
	{
		type: _EvmActorType
		$$transactions: EvmTransaction['$id'][]
	}
>

export const isEvmAddress = (string: string): string is EvmAddress => (
	/^0x[a-f0-9]{40}/i.test(string)
)
