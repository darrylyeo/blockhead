import { EntityType, type Entity } from './_Entity.ts'
import type { EvmActor } from './EvmActor.ts'
import type { EvmNetwork } from './EvmNetwork.ts'

export type Nft = Entity<
	EntityType.Nft,
	{
		$network: EvmNetwork['$id']
		contract: `0x${string}`
		tokenId: string
	},
	{
		name?: string
		description?: string
		image?: string
		collection?: {
			name: string
			slug?: string
		}
		$owner?: EvmActor['$id']
	}
>

