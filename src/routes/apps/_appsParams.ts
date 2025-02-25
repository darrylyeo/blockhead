// Types
import type { Web3AppSlug } from '$/data/web3Apps'
import type { Ethereum } from '$/data/networks/types'
import type { AccountId } from '$/data/accountId'

import type { DidUrl } from '$/api/ceramic/did'
import type { EasAttestationId, EasSchemaId } from '$/api/eas'
import type { FarcasterCastId, FarcasterCastShortId, FarcasterChannelId, FarcasterUserId, FarcasterUserName } from '$/api/farcaster'
import type { IpfsCid } from '$/api/ipfs/contentId'
import type { IpnsName } from '$/api/ipfs/ipns'
import type { MoxieAuctionId, MoxieOrderId } from '$/api/moxie'
import type { MoxieSubjectId } from '$/api/moxie'

export type AppsParams = {
	web3AppSlug?: Web3AppSlug
	networkSlug?: Ethereum.NetworkSlug

	accountId?: AccountId

	audiusQuery?: string
	audiusPlaylistId?: string
	audiusTrackId?: string
	audiusUserId?: string
	didUrl?: DidUrl
	discoCredentialId?: ReturnType<typeof crypto.randomUUID>
	easAttestationId?: EasAttestationId
	easSchemaId?: EasSchemaId
	farcasterCastId?: FarcasterCastId
	farcasterCastShortId?: FarcasterCastShortId
	farcasterChannelId?: FarcasterChannelId
	farcasterUserId?: FarcasterUserId
	farcasterUserName?: FarcasterUserName
	ipfsContentId?: IpfsCid
	ipnsName?: IpnsName
	ipfsContentPath: string
	moxieAuctionId?: MoxieAuctionId
	moxieOrderId?: MoxieOrderId
	moxieSubjectId?: MoxieSubjectId
}

export type AppsSearchInputParams = Partial<Pick<AppsParams,
	| 'accountId'

	| 'audiusQuery'
	| 'audiusPlaylistId'
	| 'audiusTrackId'
	| 'audiusUserId'
	| 'didUrl'
	| 'discoCredentialId'
	| 'easAttestationId'
	| 'easSchemaId'
	| 'farcasterCastId'
	| 'farcasterCastShortId'
	| 'farcasterChannelId'
	| 'farcasterUserId'
	| 'farcasterUserName'
	| 'moxieAuctionId'
	| 'moxieOrderId'
	| 'moxieSubjectId'
>>


// Param stores
import { derived, writable, type Readable } from 'svelte/store'

export const web3AppSlug = writable<Web3AppSlug | undefined>()
export const networkSlug = writable<Ethereum.NetworkSlug | undefined>()
export const accountId = writable<AccountId | undefined>()

export const audiusQuery = writable<string | undefined>()
export const audiusPlaylistId = writable<string | undefined>()
export const audiusTrackId = writable<string | undefined>()
export const audiusUserId = writable<string | undefined>()
export const didUrl = writable<DidUrl | undefined>()
export const discoCredentialId = writable<ReturnType<typeof crypto.randomUUID> | undefined>()
export const easAttestationId = writable<EasAttestationId | undefined>()
export const easSchemaId = writable<EasSchemaId | undefined>()
export const farcasterCastId = writable<FarcasterCastId | undefined>()
export const farcasterCastShortId = writable<FarcasterCastShortId | undefined>()
export const farcasterChannelId = writable<FarcasterChannelId | undefined>()
export const farcasterUserId = writable<FarcasterUserId | undefined>()
export const farcasterUserName = writable<FarcasterUserName | undefined>()
export const ipfsContentId = writable<IpfsCid | undefined>()
export const ipnsName = writable<IpnsName | undefined>()
export const ipfsContentPath = writable<string | undefined>()
export const moxieAuctionId = writable<MoxieAuctionId | undefined>()
export const moxieOrderId = writable<MoxieOrderId | undefined>()
export const moxieSubjectId = writable<MoxieSubjectId | undefined>()

export const appsParams = derived([
	web3AppSlug,
	networkSlug,
	accountId,
	audiusQuery,
	audiusPlaylistId,
	audiusTrackId,
	audiusUserId,
	didUrl,
	discoCredentialId,
	easAttestationId,
	easSchemaId,
	farcasterCastId,
	farcasterCastShortId,
	farcasterChannelId,
	farcasterUserId,
	farcasterUserName,
	ipfsContentId,
	ipnsName,
	ipfsContentPath,
	moxieAuctionId,
	moxieOrderId,
	moxieSubjectId,
], ([
	$web3AppSlug,
	$networkSlug,
	$accountId,
	$audiusQuery,
	$audiusPlaylistId,
	$audiusTrackId,
	$audiusUserId,
	$didUrl,
	$discoCredentialId,
	$easAttestationId,
	$easSchemaId,
	$farcasterCastId,
	$farcasterCastShortId,
	$farcasterChannelId,
	$farcasterUserId,
	$farcasterUserName,
	$ipfsContentId,
	$ipnsName,
	$ipfsContentPath,
	$moxieAuctionId,
	$moxieOrderId,
	$moxieSubjectId,
], set: (_: AppsParams) => void) => {
	set(({
		web3AppSlug: $web3AppSlug,
		networkSlug: $networkSlug,
		accountId: $accountId,
		audiusQuery: $audiusQuery,
		audiusPlaylistId: $audiusPlaylistId,
		audiusTrackId: $audiusTrackId,
		audiusUserId: $audiusUserId,
		didUrl: $didUrl,
		discoCredentialId: $discoCredentialId,
		easAttestationId: $easAttestationId,
		easSchemaId: $easSchemaId,
		farcasterCastId: $farcasterCastId,
		farcasterCastShortId: $farcasterCastShortId,
		farcasterChannelId: $farcasterChannelId,
		farcasterUserId: $farcasterUserId,
		farcasterUserName: $farcasterUserName,
		ipfsContentId: $ipfsContentId,
		ipnsName: $ipnsName,
		ipfsContentPath: $ipfsContentPath,
		moxieAuctionId: $moxieAuctionId,
		moxieOrderId: $moxieOrderId,
		moxieSubjectId: $moxieSubjectId,
	}))
})


// Derived path store
export const derivedPath: Readable<string> = derived([
	web3AppSlug,
	networkSlug,
	accountId,

	audiusQuery,
	audiusPlaylistId,
	audiusTrackId,
	audiusUserId,
	didUrl,
	discoCredentialId,
	easAttestationId,
	easSchemaId,
	farcasterCastId,
	farcasterCastShortId,
	farcasterChannelId,
	farcasterUserId,
	farcasterUserName,
	ipfsContentId,
	ipnsName,
	ipfsContentPath,
	moxieAuctionId,
	moxieOrderId,
	moxieSubjectId,
], ([
	$web3AppSlug,
	$networkSlug,
	$accountId,

	$audiusQuery,
	$audiusPlaylistId,
	$audiusTrackId,
	$audiusUserId,
	$didUrl,
	$discoCredentialId,
	$easAttestationId,
	$easSchemaId,
	$farcasterCastId,
	$farcasterCastShortId,
	$farcasterChannelId,
	$farcasterUserId,
	$farcasterUserName,
	$ipfsContentId,
	$ipnsName,
	$ipfsContentPath,
	$moxieAuctionId,
	$moxieOrderId,
	$moxieSubjectId,
], set) => set(
	`/apps${
		$web3AppSlug ?
			`/${$web3AppSlug}${
				$accountId ?
					$networkSlug ?
						`/network/${$networkSlug}/account/${$accountId}`
					:
						`/account/${$accountId}`

				// Audius
				: $web3AppSlug === 'audius' ?
					$audiusQuery ?
						`/search/${$audiusQuery}`
					: $audiusPlaylistId ?
						`/playlist/${$audiusPlaylistId}`
					: $audiusTrackId ?
						`/track/${$audiusTrackId}`
					: $audiusUserId ?
						`/user/${$audiusUserId}`
					:
						''

				// Disco
				: $web3AppSlug === 'disco' ?
					$discoCredentialId ?
						`/credential/${$discoCredentialId}`
					: $didUrl ?
						`/account/${$didUrl}`
					:
						''

				// EAS
				: $web3AppSlug === 'eas' ?
					$easAttestationId ?
						`/network/${$networkSlug}/attestation/${$easAttestationId}`
					: $easSchemaId ?
						`/network/${$networkSlug}/schema/${$easSchemaId}`
					: $networkSlug ?
						`/network/${$networkSlug}`
					:
						''

				// Farcaster
				: $web3AppSlug === 'farcaster' ?
					$farcasterUserName && $farcasterCastShortId ?
						`/cast/${$farcasterUserName}/${$farcasterCastShortId}`
					: $farcasterCastId ?
						`/cast/${$farcasterCastId}`
					: $farcasterUserId || $farcasterUserName ?
						`/account/${$farcasterUserId || $farcasterUserName}`
					: $farcasterChannelId ?
						`/channel/${$farcasterChannelId}`
					:
						''

				// Moxie
				: $web3AppSlug === 'moxie' ?
					$moxieAuctionId ?
						`/network/${$networkSlug}/auction/${$moxieAuctionId}`
					: $moxieOrderId ?
						`/network/${$networkSlug}/order/${$moxieOrderId}`
					: $moxieSubjectId ?
						`/network/${$networkSlug}/token/${$moxieSubjectId}`
					: $networkSlug ?
						`/network/${$networkSlug}`
					:
						''

				// IPFS
				: $web3AppSlug === 'ipfs' ?
					$ipfsContentId || $ipnsName ?
						$ipfsContentPath ?
							`/content/${encodeURIComponent($ipfsContentId || $ipnsName)}/${$ipfsContentPath}`
						:
							`/content/${encodeURIComponent($ipfsContentId || $ipnsName)}`
					:
						''

				// All web3 apps
				: $networkSlug ?
					`/network/${$networkSlug}`

				:
					''
			}`

		: $networkSlug ?
			`/network/${$networkSlug}`

		:
			''
	}`
))
