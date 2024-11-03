<script lang="ts">
	// Constants/types
	import type { AccountConnection } from '$/state/account'
	import { InputPattern } from '$/data/inputPatterns'


	// Params
	import { type AppsSearchInputParams, appsParams } from '../_appsParams.svelte'


	// Context
	import { appsContext } from '../_appsContext.svelte'

	import { preferences } from '$/state/preferences'


	// Internal state
	let searchInputValue = $state(appsContext.defaultSearchInputValue)
	$effect(() => {
		searchInputValue = appsContext.defaultSearchInputValue
	})

	let searchInputParams: Partial<AppsSearchInputParams> = {}

	let selectedAccountConnection: AccountConnection | undefined


	// Computed
	$effect(() => {
		if(selectedAccountConnection?.state?.account?.address)
			appsParams.accountId = selectedAccountConnection.state.account.address
	})


	// Components
	import AccountIdResolver from '$/components/AccountIdResolver.svelte'
	import BlockTransition from '$/components/BlockTransition.svelte'
	import ConnectedAccountSelect from '$/components/ConnectedAccountSelect.svelte'
	import SearchInput from '$/components/SearchInput.svelte'
	import Web3AppDashboard from '$/components/Web3AppDashboard.svelte'


	// Transitions
	import { fly } from 'svelte/transition'
</script>


<style>
	@container (min-width: 50rem) {
		.accountId-form {
			display: grid;
			grid-template-columns: 3fr auto minmax(14.5rem, 1fr) auto;
		}
	}

	.layout .accountId-form :global(.connected-account-select) {
		max-width: 14.5rem;
		min-width: -webkit-fill-available;
	}


	/* Nouns DAO */
	[data-app="nouns"] :global(:is(.card, select, button, input)) {
		--nouns-border: var(--primary-color) 0.25rem solid;
	}
	[data-app="nouns"] :global(.card:has(.card)) {
		position: relative;
		border-radius: 0;
		border: var(--nouns-border);
	}
	[data-app="nouns"] :global(.card:nth-last-child(n + 2):nth-child(2n + 1):before) {
		content: '';
		position: absolute;
		top: calc(50% - 0.5rem * 0.75);
		right: calc(100% + 0.25rem - 1px);
		width: 0.5rem;
		height: 0.5rem;
		border-top: var(--nouns-border);
		border-left: var(--nouns-border);
		pointer-events: none;
	}
	[data-app="nouns"] :global(.card):nth-child(2n):before {
		content: '';
		position: absolute;
		top: calc(50% - var(--padding-inner) * 0.75);
		right: 100%;
		width: calc(var(--padding-inner) + 0.25rem);
		height: 0.5rem;
		border-top: var(--nouns-border);
		pointer-events: none;
	}
	[data-app="nouns"] :global(.card):is(:nth-last-child(2), :nth-child(2)):after {
		content: '';
		z-index: -1;
		position: absolute;
		inset: 0;
		background: linear-gradient(
			to right,
			rgba(255, 255, 255, calc(0.08 + var(--is-light) * 0.2)) 49.5%,
			rgba(0, 0, 0, calc(0.08 + var(--is-light) * 0.2)) 50.5%
		);
		pointer-events: none;
		animation: Blink 10s infinite;
	}
	@keyframes Blink {
		0%, 20%, 85% {
			translate: 0;
		}
		35%, 45% {
			translate: -1rem;
		}
		55%, 75% {
			translate: 1rem;
		}
		98%, 100% {
			scale: 1;
		}
		99% {
			scale: 1 0;
		}
	}

	[data-app="zora"] :global(:is(h3, h4)) {
		font-family: 'Arial Narrow', var(--base-fonts);
		font-weight: 700;
		letter-spacing: -0.1px;
	}
</style>


<section
	class="layout column"
	data-app={appsContext.web3AppConfig?.slug}
	in:fly={{x: 100}}
	out:fly={{x: -100}}
>
	<form class="accountId-form bar wrap" on:submit|preventDefault={() => {
		appsParams.accountId = searchInputParams.address ?? searchInputParams.ensName ?? searchInputParams.lensHandle ?? ''
		appsParams.audiusQuery = searchInputParams.audiusQuery ?? ''
		appsParams.audiusPlaylistId = searchInputParams.audiusPlaylistId ?? ''
		appsParams.audiusTrackId = searchInputParams.audiusTrackId ?? ''
		appsParams.audiusUserId = searchInputParams.audiusUserId ?? ''
		appsParams.didUrl = searchInputParams.didUrl ?? ''
		appsParams.discoCredentialId = searchInputParams.discoCredentialId ?? ''
		appsParams.easAttestationId = searchInputParams.easAttestationId ?? ''
		appsParams.easSchemaId = searchInputParams.easSchemaId ?? ''
		appsParams.farcasterCastId = searchInputParams.farcasterCastId ?? ''
		appsParams.farcasterUserId = searchInputParams.farcasterUserId ?? ''
		appsParams.farcasterUserName = searchInputParams.farcasterUserName ?? searchInputParams.farcasterUserNameEns ?? ''
		appsParams.moxieAuctionId = searchInputParams.moxieAuctionId ?? ''
		appsParams.moxieOrderId = searchInputParams.moxieOrderId ?? ''
		appsParams.moxieSubjectId = searchInputParams.moxieSubjectId ?? ''
	}}>
		<SearchInput
			inputPatterns={
				appsContext.web3AppConfig?.slug === 'farcaster' ? [
					InputPattern.FarcasterCastId,
					InputPattern.FarcasterUserId,
					InputPattern.FarcasterUserName,
					InputPattern.FarcasterUserNameEns,
				] : appsContext.web3AppConfig?.slug === 'eas' ? [
					InputPattern.EasAttestationId,
					InputPattern.EasSchemaId,
					InputPattern.Address,
					InputPattern.EnsName,
				] : appsContext.web3AppConfig?.slug === 'moxie' ? [
					InputPattern.MoxieAuctionId,
					InputPattern.MoxieOrderId,
					InputPattern.MoxieSubjectId,
					InputPattern.Address,
					InputPattern.EnsName,
				] : [
					InputPattern.Address,
					InputPattern.EnsName,
					InputPattern.LensHandle,
				]
			}
			bind:value={searchInputValue}
			bind:matchedPatterns={searchInputParams}
		/>

		<span>or</span>

		<label class="row inline">
			<ConnectedAccountSelect address={appsParams.accountId} bind:selectedAccountConnection />
		</label>

		<button type="submit">Go</button>
	</form>

	<AccountIdResolver
		accountId={appsParams.accountId}
		passiveResolveToAddress
		passiveResolveToName
		let:address
	>
		{#if appsContext.web3AppConfig}
			<BlockTransition
				key={appsContext.web3AppConfig}
				clip={false}
				contentTransition={{
					in: [fly, { x: 100, duration: 300 }],
					out: [fly, { x: -100, duration: 300 }],
				}}
			>
				{#if (
					Array.isArray(appsContext.web3AppConfig?.showCustomUi)
						? appsContext.web3AppConfig.showCustomUi.includes(appsContext.currentView)
						: appsContext.web3AppConfig?.showCustomUi === true
				)}
					<slot />
				{/if}

				<Web3AppDashboard
					web3AppConfig={appsContext.web3AppConfig}
					network={appsContext.network}
					currentView={appsContext.currentView}
					{address}
					accountConnection={appsContext.accountConnection}
					networkProvider={$preferences.rpcNetwork}
					defiProvider={$preferences.defiProvider}
					quoteCurrency={$preferences.quoteCurrency}
					bind:showTestnets={appsContext.showTestnets}
				/>
			</BlockTransition>
		{/if}
	</AccountIdResolver>
</section>
