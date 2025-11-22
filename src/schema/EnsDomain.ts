import type { Entity } from "./types"
import type { EvmActor } from "./EvmActor"

export enum EnsTLD {
    eth = 'eth',
    xyz = 'xyz',
}

export type EnsName = `${string}.${EnsTLD}`

export type EnsDomain = Entity<
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
