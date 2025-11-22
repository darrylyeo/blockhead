import { EntityType, type Entity, type ExtendEntity } from './_Entity.ts'
import type { EvmActor } from './EvmActor.ts'
import type { EvmNetwork } from './EvmNetwork.ts'

export enum CoinType {
	NativeCurrency = 'NativeCurrency',
	Erc20Token = 'Erc20Token',
}

export type Coin<
	_CoinType extends CoinType = CoinType
> = (
	{
		[CoinType.NativeCurrency]: (
			NativeCurrency
		)
		[CoinType.Erc20Token]: (
			Erc20Token
		)
	}[_CoinType]
)

export type NativeCurrency = Entity<
	EntityType.Coin,
	{
		$network: EvmNetwork['$id']
	},
	{
		type: CoinType.NativeCurrency,
		symbol: string
		decimals: number
		icon?: string
	}
>

export type Erc20Token = ExtendEntity<
	EvmActor,
	{
		type: CoinType.Erc20Token,
		symbol: string
		decimals: number
		name: string
		icon?: string
	}
>
