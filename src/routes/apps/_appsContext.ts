// Types/constants
import { networksBySlug } from '../../data/networks'
import type { Ethereum } from '../../data/networks/types'
import { web3AppsBySlug, type Web3AppConfig } from '../../data/web3Apps'


// External stores

import {
	web3AppSlug,
	networkSlug,
	appsParams,
	accountId,
} from './_appsParams'

import { accountConnections } from '../../state/account'


// Derived stores

import { derived, type Readable } from 'svelte/store'

export const web3AppConfig: Readable<Web3AppConfig> = derived(web3AppSlug, ($web3AppSlug, set) =>
	set(web3AppsBySlug[$web3AppSlug] || undefined)
)

export let network: Readable<Ethereum.Network | undefined> = derived(networkSlug, ($networkSlug, set) =>
	set($networkSlug && networksBySlug[$networkSlug] || undefined)
)

export const currentView: Readable<'Dashboard' | 'Explorer' | 'Account'> = derived(appsParams, ($appsParams, set) => set(
	(
		$appsParams.web3AppSlug === 'audius' ?
			$appsParams.audiusQuery || $appsParams.audiusPlaylistId || $appsParams.audiusTrackId || $appsParams.audiusUserId
		: $appsParams.web3AppSlug === 'disco' ?
			$appsParams.didUrl || $appsParams.discoCredentialId
		: $appsParams.web3AppSlug === 'ens' ?
			$appsParams.accountId
		: $appsParams.web3AppSlug === 'ipfs' ?
			$appsParams.ipfsContentId || $appsParams.ipnsName || $appsParams.ipfsContentPath
		: 
			false
	) ?
		'Explorer'
	: $appsParams.accountId ?
		'Account'
	:
		'Dashboard'
))

export const defaultSearchInputValue: Readable<string> = derived(appsParams, ($appsParams, set) => set(
	String(
		$appsParams.accountId
		|| $appsParams.audiusQuery
		|| $appsParams.audiusPlaylistId
		|| $appsParams.audiusTrackId
		|| $appsParams.audiusUserId
		|| $appsParams.didUrl
		|| $appsParams.discoCredentialId
		|| ''
	)
))

export let accountConnection = derived([
	accountConnections,
	accountId,
], ([
	$accountConnections,
	$accountId,
], set) => set(
	$accountConnections.find(accountConnection => accountConnection.state?.account?.address?.toLowerCase() === $accountId.toLowerCase())
))


// Internal stores
import { writable } from 'svelte/store'

export const showTestnets = writable(false)
