import type { PartialExceptOneOf } from '$/typescript/PartialExceptOneOf.d.ts'
import { EntityType, type Entity } from './_Entity.ts'
import type { NativeCurrencyAmount } from './Balance.ts'
import type { EvmNetwork } from "./EvmNetwork.ts"
import type { GasAmount } from './EvmTrace.ts'
import type { EvmTransaction } from "./EvmTransaction.ts"

export type EvmBlockNumber = bigint
export type EvmBlockNumberString = `${number}`
export const evmBlockNumberPattern = /0|[1-9][0-9]*/

export type EvmBlockHash = `0x${string}`
export const evmBlockHashPattern = /0x[0-9a-fA-F]{64}/

export type EvmBlock = Entity<
	EntityType.EvmBlock,
	(
		& {
			$network: EvmNetwork['$id']
		}
		& PartialExceptOneOf<
			| {
				number: EvmBlockNumber
			}
			| {
				hash: EvmBlockHash
			}
		>
	),
	{
		timestamp: number
		gasUsed: GasAmount
		gasLimit: GasAmount
		baseFeePerGas: NativeCurrencyAmount
		$$transactions: EvmTransaction['$id'][]
		$previousBlock: EvmBlock['$id']
	}
>
