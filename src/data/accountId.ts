// Types/constants
import type { NetworkAccountAddress } from './address'
import type { ENS } from '$/api/ens'
import type { LensName } from '$/api/lens'


export type AccountId = NetworkAccountAddress | ENS.Name | LensName

export enum AccountIdType {
	Address = 'address',
	EnsName = 'ensName',
	LensHandle = 'lensHandle',
}
