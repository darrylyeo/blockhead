<script lang="ts">
	// Constants
	import { preferences } from '../../../state/preferences'


	// Params
	import { addressOrEnsName, audiusQuery } from '../_appsParams'


	// Context
	import { web3AppConfig, currentView } from '../_appsContext'


	// Internal state

	$: currentAddressOrEnsName = $addressOrEnsName
	$: currentQuery = $audiusQuery

	let tokenBalanceFormat
	let showUnderlyingAssets


	// Components

	import AddressField from '../../../components/AddressField.svelte'
	import Web3AppDashboard from '../../../components/Web3AppDashboard.svelte'
	import EnsResolutionLoader from '../../../components/EnsResolutionLoader.svelte'


	// Transitions

	import { fly } from 'svelte/transition'
</script>


<head>
	<title>{$addressOrEnsName ? `${$addressOrEnsName} | ` : ''}{`${$web3AppConfig.name} ${$currentView}`} | Blockhead</title>
</head>


<style>
	form {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: var(--padding-inner);
		align-items: center;
	}
</style>


<section class="column" in:fly={{x: 100}} out:fly={{x: -100}}>
	{#if $currentView === 'Dashboard'}
		<div class="column" in:fly={{x: 100}} out:fly={{x: -100}}>
			<hr>

			<h2>Explore</h2>
		</div>
	{/if}

	{#if $currentView === 'Dashboard' || $currentView === 'Explorer'}
		<form on:submit|preventDefault={() => $audiusQuery = currentQuery}>
			<input type="search" bind:value={currentQuery} placeholder="Search Audius tracks, artists, and playlists..." />
			<button>Search</button>
		</form>
	{/if}

	<div class="column">
		{#if $currentView === 'Explorer'}
			<div class="column" in:fly={{x: 100}} out:fly={{x: -100}}>
				<hr>

				<slot />
			</div>
		{/if}
		{#if $currentView === 'Dashboard'}
			<hr>

			<h2>Dashboard</h2>
		{/if}

		{#if $currentView === 'Dashboard' || $currentView === 'Account'}
			<form on:submit|preventDefault={() => $addressOrEnsName = currentAddressOrEnsName}>
				<AddressField bind:address={currentAddressOrEnsName}/>
				<button>Go</button>
			</form>

			<EnsResolutionLoader
				addressOrEnsName={$addressOrEnsName}
				passiveForwardResolution
				passiveReverseResolution
				let:address
				let:ensName
				let:isReverseResolving
			>
				<Web3AppDashboard
					{address}
					web3AppConfig={$web3AppConfig}
					providerName={$preferences.rpcNetwork}
					defiProvider={$preferences.defiProvider}
					quoteCurrency={$preferences.quoteCurrency}
					{tokenBalanceFormat}
					{showUnderlyingAssets}
				/>
			</EnsResolutionLoader>
		{/if}
	</div>
</section>