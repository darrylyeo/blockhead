import { EntityType, type Entity } from './_Entity.ts'
import type { EvmActor, EvmActorType } from './EvmActor.ts'
import type { Balance } from './Balance.ts'

export type EvmContractPosition = Entity<
	EntityType.EvmContractPosition,
	{
        $contract?: EvmActor<EvmActorType.Contract>['$id']
	},
	{
		name: string // Display name of the position (e.g., "Uniswap V3 LP")
		protocol: {
			key: string
			name: string
            logo_url?: string
		}
        // Sub-protocol or pool info
        pool?: {
            address: `0x${string}`
            name?: string
        }
        // Financial metrics
        netWorth: number // USD Value
        
        // Underlying assets in this position (e.g. tokens in an LP)
        $$assets: Balance['$id'][]
	}
>
