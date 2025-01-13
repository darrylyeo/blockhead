import type { Ethereum } from '$/data/networks/types'
import type { ENS } from '$/api/ens'
import type { LensName } from '$/api/lens'


export type AccountId = Ethereum.Address | ENS.Name | LensName

export enum AccountIdType {
	Address = 'address',
	EnsName = 'ensName',
	LensHandle = 'lensHandle',
}


import { findMatchedCaptureGroupName } from '$/utils/findMatchedCaptureGroup'

const accountIdPattern = /(?<ensName>(?:[^. ]+[.])*(?:eth|xyz|luxe|kred|art|club))|(?<lensName>(?:[^. ]+[.])(?:lens|test))|(?<address>0x[0-9a-fA-F]{40})/

export const resolveAccountIdType = (accountId: AccountId) => (
	findMatchedCaptureGroupName<AccountIdType>(accountIdPattern, accountId)
)
