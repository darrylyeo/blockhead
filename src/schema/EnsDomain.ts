import { EntityType, type Entity } from './_Entity.ts'
import type { EvmActor } from "./EvmActor.ts"

export enum EnsTLD {
	eth = 'eth',
	xyz = 'xyz',
	luxe = 'luxe',
	kred = 'kred',
	art = 'art',
	club = 'club',
	test = 'test',
}

export type EnsName = `${string}.${EnsTLD}`
export const ensNamePattern = /(?:[^. ]+[.])*(?:eth|xyz|luxe|kred|art|club|test)/

export type EnsDomain = Entity<
	EntityType.EnsDomain,
	{
		name: EnsName
	},
	{
		$owner: EvmActor['$id']
		$$actors: EvmActor['$id'][]
	}
>
