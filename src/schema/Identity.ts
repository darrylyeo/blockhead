import type { Entity } from './types'
import type { EvmActor } from './EvmActor'
import type { EnsDomain } from './EnsDomain'
import type { FarcasterAccount } from './FarcasterAccount'

export enum IdentityType {
    Address = 'Address',
    Ens = 'Ens',
    Farcaster = 'Farcaster',
}

export type Identity = Entity<
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
            actor: EvmActor['$id']
        }[]
    }
>
