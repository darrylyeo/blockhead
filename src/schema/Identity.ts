import { EntityType, type Entity } from './_Entity.ts'
import type { EvmActor } from './EvmActor.ts'
import type { EnsDomain } from './EnsDomain.ts'
import type { FarcasterAccount } from './FarcasterAccount.ts'

export enum IdentityType {
	Address = 'Address',
	Ens = 'Ens',
	Farcaster = 'Farcaster',
}

export type Identity = Entity<
	EntityType.Identity,
	(
		| {
			type: IdentityType.Address
			id: EvmActor['$id']
		}
		| {
			type: IdentityType.Ens
			id: {
				name: EnsDomain['$id']
			}
		}
		| {
			type: IdentityType.Farcaster
			id: {
				fid: FarcasterAccount['$id'],
			}
		}
	),
	{
		links: {
			isPrimary: boolean
			$actor: EvmActor['$id']
		}[]
	}
>
