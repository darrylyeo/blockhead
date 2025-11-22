import { EntityType, type Entity } from './_Entity.ts'
import type { Coin, CoinType } from './Coin.ts'
import type { EvmActor } from './EvmActor.ts'
import type { EvmNetwork } from './EvmNetwork.ts'

export type NativeCurrencyAmount = bigint
export type Erc20TokenAmount = bigint

export type Balance<
	_CoinType extends CoinType = CoinType
> = Entity<
	EntityType.Balance,
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
				[CoinType.NativeCurrency]: NativeCurrencyAmount
				[CoinType.Erc20Token]:Erc20TokenAmount
			}[_CoinType]
		)
	}
>
