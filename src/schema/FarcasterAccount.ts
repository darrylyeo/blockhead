import type { Entity } from './types'

export type FarcasterAccount = Entity<
	{
		id: string
	},
	{
		username: string
	}
>
