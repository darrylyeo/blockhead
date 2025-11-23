import { EntityType, type Entity } from './_Entity.ts'
import type { EvmActor, EvmActorType } from './EvmActor.ts'
import type { Balance } from './Balance.ts'
import type { EvmNetwork } from './EvmNetwork.ts'

export type EvmContractPosition = Entity<
	EntityType.EvmContractPosition,
	{
		$contract?: EvmActor<EvmActorType.Contract>['$id']
	},
	{
		name: string
		protocol: {
			key: string
			name: string
			logo_url?: string
		}
		pool?: {
			address: `0x${string}`
			name?: string
		}
		value: number
		totalCostBasis?: number
		totalClosedPnl?: number
		totalOpenPnl?: number
		chains?: Record<string, {
			$network: EvmNetwork['$id']
			value: number
			valuePercentile: number
			totalCostBasis?: number
			totalClosedPnl?: number
			totalOpenPnl?: number
		}>
		$$assets: Balance['$id'][]
	}
>
