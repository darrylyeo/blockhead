import type { PartialExceptOneOf } from '$/typescript/PartialExceptOneOf.js'
import { EntityType, type Entity } from './_Entity.ts'
import { ensNamePattern, type EnsName } from './EnsDomain.ts'

export type FarcasterCastId = `0x${string}`
export const farcasterCastIdPattern = /0x[0-9a-fA-F]{40}/

export type FarcasterChannelId = string
export const farcasterChannelIdPattern = /[a-z0-9]+(?:-[a-z0-9]+)*/

export type FarcasterUserId = string
export const farcasterUserIdPattern = /[1-9][0-9]*/

export type FarcasterUserName = string
export const farcasterUserNamePattern = /[a-z0-9_]+/

export type FarcasterUserNameEns = EnsName
export const farcasterUserNameEnsPattern = ensNamePattern

export type FarcasterAccount = Entity<
	EntityType.FarcasterAccount,
	PartialExceptOneOf<
		| {
			id: FarcasterUserId
		}
		|  {
			username: FarcasterUserName
		}
		|  {
			usernameEns: FarcasterUserNameEns
		}
	>
>
