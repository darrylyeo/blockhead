import { EntityType, type Entity } from './_Entity.ts'
import type { NativeCurrencyAmount } from './Balance.ts';
import type { EvmActor } from './EvmActor.ts';
import type { EvmBlock } from './EvmBlock.ts';

export type EvmTransaction = Entity<
    EntityType.EvmTransaction,
    {
        hash: `0x${string}`
    },
    {
        fromActor: EvmActor['$id']
        toActor: EvmActor['$id']
        value: NativeCurrencyAmount
        indexInBlock: number
        timestamp: number
    },
    {
        block: EvmBlock['$id']
    }
>
