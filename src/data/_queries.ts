import type { EntityByType } from '$/schema/_Entity'
import { EntityType } from '$/schema/_Entity'
import type { EvmNetwork } from '$/schema/EvmNetwork'
import type { Identity } from '$/schema/Identity'
import { IdentityType } from '$/schema/Identity'

import { getEnsNameFromAddress, getAddressFromEns } from './Viem.remote'
import { getFarcasterFromAddress, getAddressFromFarcaster } from './Farcaster.remote'
import { getDefiPositions as getDefiPositionsOctav, getCoins as getCoinsOctav, getNetworks as getNetworksOctav } from './Octav.remote'
import { getProfitAndLoss, getNfts, getHistoricalBalances, getNetworks } from './1inch.remote'

export const entityQueryMap: {
	[K in EntityType]?: {
		queryFn: (params: any) => Promise<unknown>
		getParams: (entityId: EntityByType[K]['$id'], context?: { network?: EvmNetwork['$id'] }) => any
	}[]
} = {
	[EntityType.EvmActor]: [
		{
			queryFn: getEnsNameFromAddress,
			getParams: (actor) => ({
				identity: {
					$type: EntityType.Identity,
					$id: {
						type: IdentityType.EvmActor,
						actor
					},
					$fields: {
						links: []
					}
				} satisfies Identity
			}),
		},
		{
			queryFn: getFarcasterFromAddress,
			getParams: (actor) => ({
				identity: {
					$type: EntityType.Identity,
					$id: {
						type: IdentityType.EvmActor,
						actor
					},
					$fields: {
						links: []
					}
				} satisfies Identity
			}),
		},
		{
			queryFn: getProfitAndLoss,
			getParams: (actor) => ({ actor }),
		},
		{
			queryFn: getNfts,
			getParams: (actor) => ({ actor }),
		},
		{
			queryFn: getDefiPositionsOctav,
			getParams: (actor) => ({ actor }),
		},
		{
			queryFn: getCoinsOctav,
			getParams: (actor) => ({ actor }),
		},
		{
			queryFn: getNetworksOctav,
			getParams: (actor) => ({ actor }),
		},
		{
			queryFn: getHistoricalBalances,
			getParams: (actor) => ({ actor }),
		},
		{
			queryFn: getNetworks,
			getParams: (actor) => ({ actor }),
		},
	],
	[EntityType.EnsDomain]: [
		{
			queryFn: getAddressFromEns,
			getParams: (ensDomain, context) => ({
				identity: {
					$type: EntityType.Identity,
					$id: {
						type: IdentityType.EnsDomain,
						ensDomain: { name: ensDomain.name }
					},
					$fields: {
						links: []
					}
				} satisfies Identity,
				network: context?.network ?? { chainId: 1 },
			}),
		},
	],
	[EntityType.FarcasterAccount]: [
		{
			queryFn: getAddressFromFarcaster,
			getParams: (farcasterAccount, context) => ({
				identity: {
					$type: EntityType.Identity,
					$id: {
						type: IdentityType.FarcasterAccount,
						farcasterAccount
					},
					$fields: {
						links: []
					}
				} satisfies Identity,
				network: context?.network ?? { chainId: 1 },
			}),
		},
	],
}

