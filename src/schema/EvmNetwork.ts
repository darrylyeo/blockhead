import { EntityType, type Entity } from './_Entity.ts'
import type { NativeCurrency } from './Coin.ts'

export type EvmChainId = number

export type EvmNetwork = Entity<
	EntityType.EvmNetwork,
	{
		chainId: EvmChainId
	},
	{
		name: string
		nativeCurrency: NativeCurrency
	}
>
