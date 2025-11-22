import { EntityType, type Entity } from './_Entity.ts'

export type FarcasterAccount = Entity<
	EntityType.FarcasterAccount,
	{
		id: string
	},
	{
		username: string
	}
>
