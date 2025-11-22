import type { Entity } from "./types"
import type { EvmNetwork } from "./EvmNetwork"
import type { EvmTransaction } from "./EvmTransaction"

export type EvmBlockNumber = bigint
export type EvmBlockHash = `0x${string}`

export type EvmBlock = Entity<
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
		
	},
	{
		transactions: EvmTransaction['$id'][]
	}
>
