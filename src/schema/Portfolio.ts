import { EntityType, type Entity } from './_Entity.ts'
import type { EvmActor } from './EvmActor.ts'

export type Portfolio = Entity<
	EntityType.Portfolio,
	{
		id: ReturnType<typeof crypto.randomUUID>
	},
	{
		name: string
	},
	{
		actors: EvmActor['$id'][]
	}
>
