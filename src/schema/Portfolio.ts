import type { Entity } from './types'
import type { EvmActor } from './EvmActor'

export type Portfolio = Entity<
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
