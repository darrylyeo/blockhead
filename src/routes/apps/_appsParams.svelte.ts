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
	web3AppSlug: Web3AppSlug | '',
	networkSlug: Ethereum.NetworkSlug | '',

	accountId: AccountId | '',

	audiusQuery: string,
	audiusPlaylistId: string,
	audiusTrackId: string,
	audiusUserId: string,
	didUrl: DidUrl | '',
	discoCredentialId: ReturnType<typeof crypto.randomUUID> | '',
	easAttestationId: EasAttestationId | '',
	easSchemaId: EasSchemaId | '',
	farcasterCastId: FarcasterCastId | '',
	farcasterCastShortId: FarcasterCastShortId | '',
	farcasterChannelId: FarcasterChannelId | '',
	farcasterUserId: FarcasterUserId | '',
	farcasterUserName: FarcasterUserName | '',
	ipfsContentId: IpfsCid | '',
	ipnsName: IpnsName | '',
	ipfsContentPath: string,
	moxieAuctionId: MoxieAuctionId | '',
	moxieOrderId: MoxieOrderId | '',
	moxieSubjectId: MoxieSubjectId | '',
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


export const appsParams = new class {
	// Params
	web3AppSlug = $state<Web3AppSlug | ''>('')
	networkSlug = $state<Ethereum.NetworkSlug | ''>('')
	accountId = $state<AccountId | ''>('')

	audiusQuery = $state('')
	audiusPlaylistId = $state('')
	audiusTrackId = $state('')
	audiusUserId = $state('')
	didUrl = $state<DidUrl | ''>('')
	discoCredentialId = $state<ReturnType<typeof crypto.randomUUID> | ''>('')
	easAttestationId = $state<EasAttestationId | ''>('')
	easSchemaId = $state<EasSchemaId | ''>('')
	farcasterCastId = $state<FarcasterCastId | ''>('')
	farcasterCastShortId = $state<FarcasterCastShortId | ''>('')
	farcasterChannelId = $state<FarcasterChannelId | ''>('')
	farcasterUserId = $state<FarcasterUserId | ''>('')
	farcasterUserName = $state<FarcasterUserName | ''>('')
	ipfsContentId = $state<IpfsCid | ''>('')
	ipnsName = $state<IpnsName | ''>('')
	ipfsContentPath = $state('')
	moxieAuctionId = $state<MoxieAuctionId | ''>('')
	moxieOrderId = $state<MoxieOrderId | ''>('')
	moxieSubjectId = $state<MoxieSubjectId | ''>('')

	appsParams = $derived(
		{
			web3AppSlug: this.web3AppSlug,
			networkSlug: this.networkSlug,
			accountId: this.accountId,
			audiusQuery: this.audiusQuery,
			audiusPlaylistId: this.audiusPlaylistId,
			audiusTrackId: this.audiusTrackId,
			audiusUserId: this.audiusUserId,
			didUrl: this.didUrl,
			discoCredentialId: this.discoCredentialId,
			easAttestationId: this.easAttestationId,
			easSchemaId: this.easSchemaId,
			farcasterCastId: this.farcasterCastId,
			farcasterCastShortId: this.farcasterCastShortId,
			farcasterChannelId: this.farcasterChannelId,
			farcasterUserId: this.farcasterUserId,
			farcasterUserName: this.farcasterUserName,
			ipfsContentId: this.ipfsContentId,
			ipnsName: this.ipnsName,
			ipfsContentPath: this.ipfsContentPath,
			moxieAuctionId: this.moxieAuctionId,
			moxieOrderId: this.moxieOrderId,
			moxieSubjectId: this.moxieSubjectId,
		} as AppsParams
	)


	// Derived path
	derivedPath = $derived(
		`/apps${
			this.web3AppSlug ?
				`/${this.web3AppSlug}${
					this.accountId ?
						this.networkSlug ?
							`/network/${this.networkSlug}/account/${this.accountId}`
						:
							`/account/${this.accountId}`

					// Audius
					: this.web3AppSlug === 'audius' ?
						this.audiusQuery ?
							`/search/${this.audiusQuery}`
						: this.audiusPlaylistId ?
							`/playlist/${this.audiusPlaylistId}`
						: this.audiusTrackId ?
							`/track/${this.audiusTrackId}`
						: this.audiusUserId ?
							`/user/${this.audiusUserId}`
						:
							''

					// Disco
					: this.web3AppSlug === 'disco' ?
						this.discoCredentialId ?
							`/credential/${this.discoCredentialId}`
						: this.didUrl ?
							`/account/${this.didUrl}`
						:
							''

					// EAS
					: this.web3AppSlug === 'eas' ?
						this.easAttestationId ?
							`/network/${this.networkSlug}/attestation/${this.easAttestationId}`
						: this.easSchemaId ?
							`/network/${this.networkSlug}/schema/${this.easSchemaId}`
						: this.networkSlug ?
							`/network/${this.networkSlug}`
						:
							''

					// Farcaster
					: this.web3AppSlug === 'farcaster' ?
						this.farcasterUserName && this.farcasterCastShortId ?
							`/cast/${this.farcasterUserName}/${this.farcasterCastShortId}`
						: this.farcasterCastId ?
							`/cast/${this.farcasterCastId}`
						: this.farcasterUserId || this.farcasterUserName ?
							`/account/${this.farcasterUserId || this.farcasterUserName}`
						: this.farcasterChannelId ?
							`/channel/${this.farcasterChannelId}`
						:
							''

					// Moxie
					: this.web3AppSlug === 'moxie' ?
						this.moxieAuctionId ?
							`/network/${this.networkSlug}/auction/${this.moxieAuctionId}`
						: this.moxieOrderId ?
							`/network/${this.networkSlug}/order/${this.moxieOrderId}`
						: this.moxieSubjectId ?
							`/network/${this.networkSlug}/token/${this.moxieSubjectId}`
						: this.networkSlug ?
							`/network/${this.networkSlug}`
						:
							''

					// IPFS
					: this.web3AppSlug === 'ipfs' ?
						this.ipfsContentId || this.ipnsName ?
							this.ipfsContentPath ?
								`/content/${encodeURIComponent(this.ipfsContentId || this.ipnsName)}/${this.ipfsContentPath}`
							:
								`/content/${encodeURIComponent(this.ipfsContentId || this.ipnsName)}`
						:
							''

					// All web3 apps
					: this.networkSlug ?
						`/network/${this.networkSlug}`

					:
						''
				}`

			: this.networkSlug ?
				`/network/${this.networkSlug}`

			:
				''
		}`
	)
}
