import type { Entity } from './types';
import type { NativeCurrencyAmount } from './Balance';
import type { EvmActor } from './EvmActor';
import type { EvmBlock } from './EvmBlock';

export type EvmTransaction = Entity<
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
