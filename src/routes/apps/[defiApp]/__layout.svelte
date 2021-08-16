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


	import AddressField from '../../../components/AddressField.svelte'
	import DefiAppDashboard from '../../../components/DefiAppDashboard.svelte'
	import EnsResolutionLoader from '../../../components/EnsResolutionLoader.svelte'


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
		{#if $defiAppConfig}
			<div class="stack">
				{#key $defiAppConfig}
					<div class="column" in:fly={{x: 100}} out:fly={{x: -100}}>
						<DefiAppDashboard
							{address}
							defiAppConfig={$defiAppConfig}
							providerName={$preferredEthereumProvider}
							defiProvider={$preferredDeFiProvider}
							quoteCurrency={$preferredQuoteCurrency}
							{showValues}
							{showUnderlyingAssets}
						/>
					</div>
				{/key}
			</div>
		{/if}
	</EnsResolutionLoader>

	<slot />
</section>