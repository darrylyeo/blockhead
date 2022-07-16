import { derived, writable, type Readable } from 'svelte/store'


// Param stores

export const web3AppSlug = writable('')
export const addressOrEnsName = writable('')
export const audiusQuery = writable('')
export const audiusPlaylistId = writable('')
export const audiusTrackId = writable('')
export const audiusUserId = writable('')


// Derived path store

export const derivedPath: Readable<string> = derived([
	web3AppSlug,
	addressOrEnsName,
	audiusQuery,
	audiusPlaylistId,
	audiusTrackId,
	audiusUserId,
], ([
	$web3AppSlug,
	$addressOrEnsName,
	$audiusQuery,
	$audiusPlaylistId,
	$audiusTrackId,
	$audiusUserId,
], set) => set(
	`/apps${
		$web3AppSlug ?
			`/${$web3AppSlug}${
				// All web3 apps
				$addressOrEnsName ?
					`/address/${$addressOrEnsName}`

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
				:
					''
			}`
		:
			''
	}`
))
