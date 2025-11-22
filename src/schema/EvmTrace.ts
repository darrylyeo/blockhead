import { EntityType, type Entity } from './_Entity.ts'
import type { EvmActor } from './EvmActor.ts'
import type { EvmTransaction } from './EvmTransaction.ts'
import type { EvmBlock } from './EvmBlock.ts'
import type { NativeCurrencyAmount } from './Balance.ts'
import type { PartialExceptOneOf } from '$/typescript/PartialExceptOneOf.js'

export type GasAmount = bigint

export enum EvmTraceType {
    Call = 'call',
    Create = 'create',
    Suicide = 'suicide',
    Reward = 'reward'
}

export type EvmTrace = Entity<
    EntityType.EvmTrace,
    PartialExceptOneOf<
        | {
            $transaction: EvmTransaction['$id']
            indexInTransaction: bigint
        }
        | {
            $transaction: EvmTransaction['$id']
            traceAddress: number[] // e.g. [] for root, [0] for first subcall
        }
        | {
            $block: EvmBlock['$id']
            indexInBlock: bigint
        }
    >,
    {
        type: EvmTraceType
        $fromActor: EvmActor['$id']
        $toActor: EvmActor['$id']
        value: NativeCurrencyAmount
        input: `0x${string}`
        output: `0x${string}`
        gas: GasAmount
        gasUsed: GasAmount
        error?: string
        $$subtraces: EvmTrace['$id'][]
    }
>

