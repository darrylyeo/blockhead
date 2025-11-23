import type { Identity, IdentityType } from '$/schema/Identity'
import type { EvmNetwork } from '$/schema/EvmNetwork'
import { IdentityType as IdentityTypeEnum } from '$/schema/Identity'

import { getEnsNameFromAddress, getAddressFromEns } from './Viem.remote'
import { getFarcasterFromAddress, getAddressFromFarcaster } from './Farcaster.remote'

type ResolutionFunction<From extends IdentityType, To extends IdentityType> = (
	identity: Identity['$id'],
	network: EvmNetwork['$id']
) => Promise<Identity | null>

export const identityResolutionMap: {
	[K in IdentityType]: {
		[L in Exclude<IdentityType, K>]?: ResolutionFunction<K, L>
	}
} = {
	[IdentityTypeEnum.EvmActor]: {
		[IdentityTypeEnum.EnsDomain]: async (identity, network) => {
			return await getEnsNameFromAddress({ identity })
		},
		[IdentityTypeEnum.FarcasterAccount]: async (identity, network) => {
			return await getFarcasterFromAddress({ identity })
		},
	},
	[IdentityTypeEnum.EnsDomain]: {
		[IdentityTypeEnum.EvmActor]: async (identity, network) => {
			return await getAddressFromEns({ identity, network })
		},
		[IdentityTypeEnum.FarcasterAccount]: async (identity, network) => {
			const addressIdentity = await getAddressFromEns({ identity, network })
			if (!addressIdentity) return null
			return await getFarcasterFromAddress({ identity: addressIdentity.$id })
		},
	},
	[IdentityTypeEnum.FarcasterAccount]: {
		[IdentityTypeEnum.EvmActor]: async (identity, network) => {
			return await getAddressFromFarcaster({ identity, network })
		},
		[IdentityTypeEnum.EnsDomain]: async (identity, network) => {
			const addressIdentity = await getAddressFromFarcaster({ identity, network })
			if (!addressIdentity) return null
			return await getEnsNameFromAddress({ identity: addressIdentity.$id })
		},
	},
}

