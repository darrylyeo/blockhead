import { EntityType, type Entity } from './_Entity.ts'
import type { Identity } from './Identity.ts'

export type Portfolio = Entity<
	EntityType.Portfolio,
	{
		id: ReturnType<typeof crypto.randomUUID>
	},
	{
		title: string
		$$identities: Identity['$id'][]

		// stats: {
		// 	netWorth?: number
		// 	totalPnl?: number
		// 	totalRoi?: number
		// }
	}
>
