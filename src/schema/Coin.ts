import type { Entity, ExtendEntity } from './types'
import type { EvmActor } from './EvmActor'
import type { EvmNetwork } from './EvmNetwork'

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
	{
		network: EvmNetwork['$id']
	},
	{
		symbol: string
		decimals: number
		icon?: string
	}
>

export type Erc20Token = ExtendEntity<
	EvmActor,
	{
		network: EvmNetwork['$id']
	},
	{
		symbol: string
		decimals: number
		name: string
		icon?: string
	}
>
