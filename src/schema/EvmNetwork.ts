import type { Entity } from './types'
import type { NativeCurrency } from './Coin'

export type EvmChainId = number

export type EvmNetwork = Entity<
	{
		chainId: EvmChainId
	},
	{
		name: string
		nativeCurrency: NativeCurrency
	}
>
