import { query } from '$app/server'
import type { FarcasterAccount } from '../schema/FarcasterAccount.ts'
import type { EvmActor } from '../schema/EvmActor.ts'
import type { Identity } from '../schema/Identity.ts'
import { IdentityType } from '../schema/Identity.ts'
import { EntityType } from '../schema/_Entity.ts'

// TODO: Implement actual Farcaster API integration
// For now, these are placeholder functions that return null

export const getFarcasterFromAddress = query(
	'unchecked',
	async ({
		identity,
	}: {
		identity: Identity['$id']
	}): Promise<Identity | null> => {
		if (identity.type !== IdentityType.EvmActor) return null

		// TODO: Implement Farcaster API lookup by address
		// This would typically use the Farcaster API to find accounts linked to an address
		const farcasterAccount = null as FarcasterAccount | null
		
		if (!farcasterAccount) return null

		return {
			$type: EntityType.Identity,
			$id: {
				type: IdentityType.FarcasterAccount,
				farcasterAccount: farcasterAccount.$id
			},
			$fields: {
				links: [{
					isPrimary: true,
					$actor: identity.actor
				}]
			}
		} satisfies Identity
	}
)

export const getAddressFromFarcaster = query(
	'unchecked',
	async ({
		identity,
		network,
	}: {
		identity: Identity['$id']
		network?: EvmActor['$id']['$network']
	}): Promise<Identity | null> => {
		if (identity.type !== IdentityType.FarcasterAccount) return null

		// TODO: Implement Farcaster API lookup by FID
		// This would typically use the Farcaster API to find the address linked to a FID
		const address = null as EvmActor | null
		
		if (!address) return null

		return {
			$type: EntityType.Identity,
			$id: {
				type: IdentityType.EvmActor,
				actor: address.$id
			},
			$fields: {
				links: [{
					isPrimary: true,
					$actor: address.$id
				}]
			}
		} satisfies Identity
	}
)


