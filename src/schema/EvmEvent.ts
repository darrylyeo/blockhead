import type { PartialExceptOneOf } from '$/typescript/PartialExceptOneOf.ts'
import { EntityType, type Entity } from './_Entity.ts'
import type { EvmActor, EvmActorType } from './EvmActor.ts'
import type { EvmBlock } from './EvmBlock.ts'
import type { EvmTrace } from './EvmTrace.ts'
import type { EvmTransaction } from './EvmTransaction.ts'

export type EvmEventTopic = `0x${string}`

export type EvmEvent = Entity<
	EntityType.EvmEvent,
	PartialExceptOneOf<
		| {
			$transaction: EvmTransaction['$id']
			indexInTransaction: bigint
		}
		| {
			$block: EvmBlock['$id']
			indexInBlock: bigint
		}
		| {
			$trace: EvmTrace['$id']
			indexInTrace: bigint
		}
		| {
			$contract: EvmActor<EvmActorType.Contract>['$id']
			indexInContract: bigint
		}
	>,
	{
		data: `0x${string}`
		topics: EvmEventTopic[]
		removed: boolean
	}
>
