import { EntityType, type Entity } from './_Entity.ts'
import type { EvmActor } from "./EvmActor.ts"

export enum EnsTLD {
    eth = 'eth',
    xyz = 'xyz',
}

export type EnsName = `${string}.${EnsTLD}`

export type EnsDomain = Entity<
    EntityType.EnsDomain,
	{
		name: EnsName
	},
	{
	},
    {
		owner: EvmActor['$id']
        addresses: EvmActor['$id'][]
    }
>
