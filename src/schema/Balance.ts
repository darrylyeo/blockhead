import type { Entity } from './types'
import type { Coin, CoinType } from './Coin'
import type { EvmActor } from './EvmActor'
import type { EvmNetwork } from './EvmNetwork'

export type NativeCurrencyAmount = bigint
export type Erc20TokenAmount = bigint

export type Balance<
    _CoinType extends CoinType = CoinType
> = Entity<
    {
        [CoinType.NativeCurrency]: (
            {
                network: EvmNetwork['$id']
            }
        )
        [CoinType.Erc20Token]: (
            EvmActor['$id']
        )
    }[_CoinType],
    {
        coin: Coin<_CoinType>
        balance: (
            {
                [CoinType.NativeCurrency]: (
                    NativeCurrencyAmount
                )
                [CoinType.Erc20Token]: (
                    Erc20TokenAmount
                )
            }[_CoinType]
        )
    }
>
