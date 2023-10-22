// Types
import type { Web3AppSlug } from '../../data/web3Apps'
import type { Ethereum } from '../../data/networks/types'
import type { AccountId } from '../../data/accountId'

import type { DidUrl } from '../../api/ceramic/did'
import type { IpfsCid } from '../../api/ipfs/contentId'
import type { IpnsName } from '../../api/ipfs/ipns'

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
	ipfsContentId: IpfsCid | '',
	ipnsName: IpnsName | '',
	ipfsContentPath: string,
}


// Param stores
import { derived, writable, type Readable } from 'svelte/store'

export const web3AppSlug = writable<Web3AppSlug | ''>('')
export const networkSlug = writable<Ethereum.NetworkSlug | ''>('')
export const accountId = writable<AccountId | ''>('')

export const audiusQuery = writable('')
export const audiusPlaylistId = writable('')
export const audiusTrackId = writable('')
export const audiusUserId = writable('')
export const didUrl = writable<DidUrl | ''>('')
export const discoCredentialId = writable<ReturnType<typeof crypto.randomUUID> | ''>('')
export const ipfsContentId = writable<IpfsCid | ''>('')
export const ipnsName = writable<IpnsName | ''>('')
export const ipfsContentPath = writable('')

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
	ipfsContentId,
	ipnsName,
	ipfsContentPath,
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
	$ipfsContentId,
	$ipnsName,
	$ipfsContentPath,
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
		ipfsContentId: $ipfsContentId,
		ipnsName: $ipnsName,
		ipfsContentPath: $ipfsContentPath,
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
	ipfsContentId,
	ipnsName,
	ipfsContentPath,
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
	$ipfsContentId,
	$ipnsName,
	$ipfsContentPath,
], set) => set(
	`/apps${
		$web3AppSlug ?
			`/${$web3AppSlug}${
				// All web3 apps
				$networkSlug ?
					$accountId ?
						`/network/${$networkSlug}/account/${$accountId}`
					:
						`/network/${$networkSlug}`

				: $accountId ?
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

				// IPFS
				: $web3AppSlug === 'ipfs' ?
					$ipfsContentId || $ipnsName ?
						$ipfsContentPath ?
							`/content/${encodeURIComponent($ipfsContentId || $ipnsName)}/${$ipfsContentPath}`
						:
							`/content/${encodeURIComponent($ipfsContentId || $ipnsName)}`
					:
						''

				:
					''
			}`

		: $networkSlug ?
			`/network/${$networkSlug}`

		:
			''
	}`
))
