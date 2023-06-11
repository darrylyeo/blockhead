import type { AccountId } from '../../data/accountId'


import { derived, writable, type Readable } from 'svelte/store'


// Param stores

export const web3AppSlug = writable('')
export const accountId = writable<AccountId | ''>('')
export const audiusQuery = writable('')
export const audiusPlaylistId = writable('')
export const audiusTrackId = writable('')
export const audiusUserId = writable('')
export const ipfsContentId = writable('')
export const ipfsContentPath = writable('')


// Derived path store

export const derivedPath: Readable<string> = derived([
	web3AppSlug,
	accountId,
	audiusQuery,
	audiusPlaylistId,
	audiusTrackId,
	audiusUserId,
	ipfsContentId,
	ipfsContentPath,
], ([
	$web3AppSlug,
	$accountId,
	$audiusQuery,
	$audiusPlaylistId,
	$audiusTrackId,
	$audiusUserId,
	$ipfsContentId,
	$ipfsContentPath,
], set) => set(
	`/apps${
		$web3AppSlug ?
			`/${$web3AppSlug}${
				// All web3 apps
				$accountId ?
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

				// IPFS
				: $web3AppSlug === 'ipfs' ?
					$ipfsContentId ?
						$ipfsContentPath ?
							`/content/${$ipfsContentId}/${$ipfsContentPath}`
						:
							`/content/${$ipfsContentId}`
					:
						''

				:
					''
			}`
		:
			''
	}`
))
