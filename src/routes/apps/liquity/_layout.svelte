<script lang="ts">
	import { preferredDeFiProvider, preferredEthereumProvider, preferredQuoteCurrency } from '../../../data/ethereum/preferences'
    

	import type { DefiAppSlug, DefiAppConfig } from '../../../data/ethereum/defi-apps';
	import { getContext } from 'svelte'

	const defiAppSlug = getContext<SvelteStore<DefiAppSlug>>('defiAppSlug')
	const defiAppConfig = getContext<SvelteStore<DefiAppConfig>>('defiAppConfig')


	import type { Writable } from 'svelte/store'

	const query = getContext<Writable<string>>('query')

	import { goto } from '@sapper/app'
	$: if(globalThis.document && $query)
		goto(`apps/${$defiAppSlug}/${$query}`)

	$: currentQuery = $query


	let showValues
	let showUnderlyingAssets


	const isAddress = query => /^0x[0-9a-f]{40}$/i.test(query)
	const isTransaction = query => /^0x[0-9a-f]{64}$/i.test(query)
	const isBlockNumber = query => /^[0-9]+$/i.test(query)


	import AddressField from '../../../components/AddressField.svelte'
	import DefiAppDashboard from '../../../components/DefiAppDashboard.svelte'


	import { fly } from 'svelte/transition'
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
	<form on:submit|preventDefault={() => $query = currentQuery}>
		<AddressField bind:address={currentQuery}/>
		<button>Go</button>
	</form>


	{#if $defiAppConfig}
		{#if $query && !isAddress($query)}
			<div class="card">
				"{$query}" is not a valid address. ENS names will be supported soon!
			</div>
		{/if}

		<DefiAppDashboard
			address={isAddress($query) ? $query : undefined}
			defiAppConfig={$defiAppConfig}
			providerName={$preferredEthereumProvider}
			defiProvider={$preferredDeFiProvider}
			quoteCurrency={$preferredQuoteCurrency}
			{showValues}
			{showUnderlyingAssets}
		/>
	{/if}


	<slot />
</section>