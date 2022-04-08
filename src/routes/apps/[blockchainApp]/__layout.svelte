<script lang="ts">
	import { preferences } from '../../../data/ethereum/preferences'
    

	import type { BlockchainAppSlug, BlockchainAppConfig } from '../../../data/blockchain-apps';
	import { getContext } from 'svelte'

	const blockchainAppSlug = getContext<SvelteStore<BlockchainAppSlug>>('blockchainAppSlug')
	const blockchainAppConfig = getContext<SvelteStore<BlockchainAppConfig>>('blockchainAppConfig')


	import type { Writable } from 'svelte/store'

	const addressOrENSName = getContext<Writable<string>>('addressOrENSName')

	$: currentAddressOrENSName = $addressOrENSName


	let tokenBalanceFormat
	let showUnderlyingAssets


	import AddressField from '../../../components/AddressField.svelte'
	import BlockchainAppDashboard from '../../../components/BlockchainAppDashboard.svelte'
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
		{#if $blockchainAppConfig}
			<div class="stack">
				{#key $blockchainAppConfig}
					<div class="column" in:fly={{x: 100}} out:fly={{x: -100}}>
						<BlockchainAppDashboard
							{address}
							blockchainAppConfig={$blockchainAppConfig}
							providerName={$preferences.rpcNetwork}
							defiProvider={$preferences.defiProvider}
							quoteCurrency={$preferences.quoteCurrency}
							{tokenBalanceFormat}
							{showUnderlyingAssets}
						/>
					</div>
				{/key}
			</div>
		{/if}
	</EnsResolutionLoader>

	<slot />
</section>