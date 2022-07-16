<script lang="ts">
	import { preferences } from '../../../data/ethereum/preferences'
    

	import type { Web3AppSlug, Web3AppConfig } from '../../../data/web3Apps';
	import { getContext } from 'svelte'

	const web3AppSlug = getContext<SvelteStore<Web3AppSlug>>('web3AppSlug')
	const web3AppConfig = getContext<SvelteStore<Web3AppConfig>>('web3AppConfig')


	import type { Writable } from 'svelte/store'

	const addressOrEnsName = getContext<Writable<string>>('addressOrEnsName')

	$: currentAddressOrENSName = $addressOrEnsName


	let tokenBalanceFormat
	let showUnderlyingAssets


	import { page } from '$app/stores'
	import { goto } from '$app/navigation'

	$: ({ query } = $page.params)

	$: currentQuery = query


	let currentView: 'Dashboard' | 'Explorer' | 'Account'
	$: currentView =
		!($addressOrEnsName || query) ? 'Dashboard' :
		$addressOrEnsName ? 'Account' :
		'Explorer'


	import AddressField from '../../../components/AddressField.svelte'
	import Web3AppDashboard from '../../../components/Web3AppDashboard.svelte'
	import EnsResolutionLoader from '../../../components/EnsResolutionLoader.svelte'


	import { fly } from 'svelte/transition'
	import { scale } from 'svelte/transition'
</script>


<style>
	form {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: var(--padding-inner);
		align-items: center;
	}
</style>


<section class="column" in:fly={{x: 100}} out:fly={{x: -100}}>
	{#if currentView === 'Dashboard'}
		<div class="column" in:fly={{x: 100}} out:fly={{x: -100}}>
			<hr>

			<h2>Explore</h2>
		</div>
	{/if}

	{#if currentView === 'Dashboard' || currentView === 'Explorer'}
		<form on:submit|preventDefault={() => goto(`/apps/audius${currentQuery ? `/search/${currentQuery}` : ''}`, {keepfocus: true})}>
			<input type="search" bind:value={currentQuery} placeholder="Search Audius tracks, artists, and playlists..." />
			<button>Search</button>
		</form>
	{/if}

	<div class="column">
		{#if currentView === 'Explorer'}
			<div class="column" in:fly={{x: 100}} out:fly={{x: -100}}>
				<hr>

				<slot />
			</div>
		{/if}
		{#if currentView === 'Dashboard'}
			<hr>

			<h2>Dashboard</h2>
		{/if}

		{#if currentView === 'Dashboard' || currentView === 'Account'}
			<form on:submit|preventDefault={() => $addressOrEnsName = currentAddressOrENSName}>
				<AddressField bind:address={currentAddressOrENSName}/>
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