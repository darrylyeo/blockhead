import { EntityType, type Entity } from './_Entity.ts'
import type { PartialExceptOneOf } from '$/typescript/PartialExceptOneOf.js'
import type { NativeCurrency } from './Coin.ts'

export type EvmChainId = number

export type EvmNetworkSlug = string

export type EvmNetwork = Entity<
	EntityType.EvmNetwork,
	PartialExceptOneOf<
		| {
			chainId: EvmChainId
		}
		| {
			slug: EvmNetworkSlug
		}
	>,
	{
		name: string
		nativeCurrency: NativeCurrency
	}
>
