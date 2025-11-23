import { EntityType, type Entity } from './_Entity.ts'
import type { EvmTransaction } from './EvmTransaction.ts'
import type { EvmNetwork } from './EvmNetwork.ts'

export type EvmAddress = `0x${string}`
export const evmAddressPattern = /0x[0-9a-fA-F]{40}/

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
