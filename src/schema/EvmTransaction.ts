import type { PartialExceptOneOf } from '$/typescript/PartialExceptOneOf.d.ts'
import { EntityType, type Entity } from './_Entity.ts'
import type { NativeCurrencyAmount } from './Balance.ts'
import type { EvmActor } from './EvmActor.ts'
import type { EvmBlock } from './EvmBlock.ts'
import type { EvmEvent } from './EvmEvent.ts'
import type { EvmNetwork } from './EvmNetwork.ts'
import type { EvmTrace } from './EvmTrace.ts'

export type EvmTransactionHash = `0x${string}`
export const evmTransactionHashPattern = /0x[0-9a-fA-F]{64}/

export type EvmTransaction = Entity<
	EntityType.EvmTransaction,
	PartialExceptOneOf<
		| {
			$network: EvmNetwork['$id']
			hash: EvmTransactionHash
		}
		| {
			$block: EvmBlock['$id']
			indexInBlock: bigint
		}
	>,
	{
		$fromActor: EvmActor['$id']
		$toActor: EvmActor['$id']
		value: NativeCurrencyAmount
		timestamp: number
		$trace: EvmTrace['$id']
		$$events: EvmEvent['$id'][]
	}
>
