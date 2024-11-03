// Types/constants
import { networkBySlug } from '$/data/networks'
import type { Ethereum } from '$/data/networks/types'
import { web3AppsBySlug, type Web3AppConfig } from '$/data/web3Apps'


// External stores
import { appsParams } from './_appsParams.svelte'

import { accountConnections } from '$/state/account'


// Derived stores
import { isTruthy } from '$/utils/isTruthy'

export const appsContext = new class {
	web3AppConfig: Web3AppConfig = $derived(
		web3AppsBySlug[appsParams.web3AppSlug] || undefined
	)

	network: Ethereum.Network | undefined = $derived(
		appsParams.networkSlug && networkBySlug.get(appsParams.networkSlug) || undefined
	)

	currentView: 'Dashboard' | 'Explorer' | 'Account' = $derived(
		(
			appsParams.web3AppSlug === 'audius' ?
				appsParams.audiusQuery || appsParams.audiusPlaylistId || appsParams.audiusTrackId || appsParams.audiusUserId
			: appsParams.web3AppSlug === 'disco' ?
				appsParams.didUrl || appsParams.discoCredentialId
			: appsParams.web3AppSlug === 'farcaster' ?
				appsParams.farcasterCastId || appsParams.farcasterChannelId || appsParams.farcasterUserId || appsParams.farcasterUserName
			: appsParams.web3AppSlug === 'eas' ?
				appsParams.easAttestationId || appsParams.easSchemaId
			: appsParams.web3AppSlug === 'ens' ?
				appsParams.accountId
			: appsParams.web3AppSlug === 'ipfs' ?
				appsParams.ipfsContentId || appsParams.ipnsName || appsParams.ipfsContentPath
			: appsParams.web3AppSlug === 'moxie' ?
				appsParams.moxieAuctionId || appsParams.moxieOrderId || appsParams.moxieSubjectId
			: 
				false
		) ?
			'Explorer'
		: appsParams.accountId ?
			'Account'
		:
			'Dashboard'
	)

	defaultSearchInputValue = $derived(
		String(
			appsParams.accountId
			|| appsParams.audiusQuery
			|| appsParams.audiusPlaylistId
			|| appsParams.audiusTrackId
			|| appsParams.audiusUserId
			|| appsParams.didUrl
			|| appsParams.discoCredentialId
			|| appsParams.easAttestationId
			|| appsParams.easSchemaId
			|| appsParams.farcasterCastId
			|| appsParams.farcasterUserId
			|| appsParams.farcasterUserName
			|| appsParams.moxieAuctionId
			|| appsParams.moxieOrderId
			|| appsParams.moxieSubjectId
			|| ''
		)
	)

	accountConnection = $derived(
		// $accountConnections.find(accountConnection => accountConnection.state?.account?.address?.toLowerCase() === appsParams.accountId.toLowerCase())
		undefined
	)

	title = $derived(
		[
			this.defaultSearchInputValue,
			appsParams.web3AppSlug && this.web3AppConfig && `${this.web3AppConfig.name}${this.currentView === 'Dashboard' ? '' : ` ${this.currentView}`}`,
			'Apps',
		]
			.filter(isTruthy)
			.join(' | ')
	)


	// Internal stores
	showTestnets = $state(
		false
	)
}
