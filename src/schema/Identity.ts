import { EntityType, type Entity } from './_Entity.ts'
import type { EvmActor } from './EvmActor.ts'
import type { EnsDomain } from './EnsDomain.ts'
import type { FarcasterAccount } from './FarcasterAccount.ts'

export enum IdentityType {
	Actor = 'Actor',
	EnsDomain = 'EnsDomain',
	FarcasterAccount = 'FarcasterAccount',
}

export type Identity = Entity<
	EntityType.Identity,
	(
		| {
			type: IdentityType.Actor
			actor: EvmActor['$id']
		}
		| {
			type: IdentityType.EnsDomain
			ensDomain: EnsDomain['$id']
		}
		| {
			type: IdentityType.FarcasterAccount
			farcasterAccount: FarcasterAccount['$id'],
		}
	),
	{
		links?: {
			isPrimary: boolean
			$actor: EvmActor['$id']
		}[]
	}
>
