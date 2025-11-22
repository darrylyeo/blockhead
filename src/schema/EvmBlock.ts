import { EntityType, type Entity } from './_Entity.ts'
import type { EvmNetwork } from './EvmNetwork.ts'
import type { EvmTransaction, GasUnitAmount } from './EvmTransaction.ts'

export type EvmBlockNumber = bigint
export type EvmBlockHash = `0x${string}`

export type EvmBlock = Entity<
	EntityType.EvmBlock,
	(
		& {
			network: EvmNetwork['$id']
		}
		& (
			| {
				number: EvmBlockNumber
			}
			| {
				hash: EvmBlockHash
			}
		)
	),
	{
		gasUsed: GasUnitAmount
	},
	{
		transactions: EvmTransaction['$id'][]
		previousBlock: EvmBlock['$id']
	}
>
