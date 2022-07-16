// Types/constants
import { web3AppsBySlug, type Web3AppConfig } from '../../data/web3Apps'


// External stores

import {
	web3AppSlug,
	addressOrEnsName,
	audiusQuery,
	audiusPlaylistId,
	audiusTrackId,
	audiusUserId,
} from './_appsParams'


// Derived stores

import { derived, type Readable } from 'svelte/store'

export const web3AppConfig: Readable<Web3AppConfig> = derived(web3AppSlug, ($web3AppSlug, set) =>
	set(web3AppsBySlug[$web3AppSlug] || undefined)
)

export const currentView: Readable<'Dashboard' | 'Explorer' | 'Account'> = derived([
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
	($web3AppSlug === 'ens' && $addressOrEnsName) || 
	($audiusQuery || $audiusPlaylistId || $audiusTrackId || $audiusUserId) ?
		'Explorer'
	: $addressOrEnsName ?
		'Account'
	:
		'Dashboard'
))
