// Types/constants
import type { Ethereum } from '$/data/networks/types'

export type MoxieAuctionId = string
export type MoxieOrderId = string
export type MoxieSubjectId = string
export type MoxieUserId = string

export type MoxieToken = Pick<Ethereum.Erc20Token, 'chainId' | 'address' | 'symbol' | 'decimals'>

export type MoxieSubjectToken = MoxieToken & {
	name?: string,
	symbol?: MoxieSubjectId,
	icon?: string,
}

export enum MoxieNetwork {
	Farcaster = 'farcaster',
}

import { FarcasterIcon } from '$/assets/icons'

export const moxieNetworks = {
	[MoxieNetwork.Farcaster]: {
		id: MoxieNetwork.Farcaster,
		name: 'Farcaster',
		icon: FarcasterIcon,
	},
}

import type { FarcasterChannel, FarcasterUser } from '../farcaster'

export type MoxieSubject = {
	network?: typeof moxieNetworks[MoxieNetwork]
	farcasterUser?: FarcasterUser | Partial<FarcasterUser>,
	farcasterChannel?: FarcasterChannel,
}


// Functions
export const moxieSubjectIdRegex = /^id:(?<networkId>[a-z]+)|fid:(?<farcasterUserId>\d+)|cid:(?<farcasterChannelId>[a-z0-9]+(?:-[a-z0-9]+)*)$/
