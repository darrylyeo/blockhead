<script lang="ts">
	import { preferredDeFiProvider, preferredEthereumProvider, preferredQuoteCurrency } from '../../../data/ethereum/preferences'
    

	import type { DefiAppSlug, DefiAppConfig } from '../../../data/ethereum/defi-apps';
	import { getContext } from 'svelte'

	const defiAppSlug = getContext<SvelteStore<DefiAppSlug>>('defiAppSlug')
	const defiAppConfig = getContext<SvelteStore<DefiAppConfig>>('defiAppConfig')


	import type { Writable } from 'svelte/store'

	const addressOrENSName = getContext<Writable<string>>('addressOrENSName')

	$: currentAddressOrENSName = $addressOrENSName


	let showValues
	let showUnderlyingAssets


	import { page } from '$app/stores'
	import { goto } from '$app/navigation'

	$: ({ query } = $page.params)

	$: currentQuery = query


	let currentView: 'Dashboard' | 'Explorer' | 'Account'
	$: currentView =
		!($addressOrENSName || query) ? 'Dashboard' :
		$addressOrENSName ? 'Account' :
		'Explorer'


	import AddressField from '../../../components/AddressField.svelte'
	import DefiAppDashboard from '../../../components/DefiAppDashboard.svelte'
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
			<form on:submit|preventDefault={() => $addressOrENSName = currentAddressOrENSName}>
				<AddressField bind:address={currentAddressOrENSName}/>
				<button>Go</button>
			</form>

			<EnsResolutionLoader
				addressOrENSName={$addressOrENSName}
				passiveForwardResolution
				passiveReverseResolution
				let:address
				let:ensName
				let:isReverseResolving
			>
				<DefiAppDashboard
					{address}
					defiAppConfig={$defiAppConfig}
					providerName={$preferredEthereumProvider}
					defiProvider={$preferredDeFiProvider}
					quoteCurrency={$preferredQuoteCurrency}
					{showValues}
					{showUnderlyingAssets}
				/>
			</EnsResolutionLoader>
		{/if}
	</div>
</section>