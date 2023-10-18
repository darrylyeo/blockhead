import type { Ethereum } from '../../data/networks/types'
import type { AccountId } from '../../data/accountId'
import type { DidUrl } from '../../api/ceramic/did'


import { derived, writable, type Readable } from 'svelte/store'


// Param stores

export const web3AppSlug = writable('')
export const networkSlug = writable<Ethereum.NetworkSlug>('')
export const accountId = writable<AccountId | ''>('')

export const audiusQuery = writable('')
export const audiusPlaylistId = writable('')
export const audiusTrackId = writable('')
export const audiusUserId = writable('')
export const didUrl = writable<DidUrl | ''>('')
export const discoCredentialId = writable('')
export const ipfsContentId = writable('')
export const ipnsName = writable('')
export const ipfsContentPath = writable('')


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
