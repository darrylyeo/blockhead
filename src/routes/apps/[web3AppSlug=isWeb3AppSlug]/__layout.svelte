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


	import AddressField from '../../../components/AddressField.svelte'
	import Web3AppDashboard from '../../../components/Web3AppDashboard.svelte'
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
		{#if $web3AppConfig}
			<div class="stack">
				{#key $web3AppConfig}
					<div class="column" in:fly={{x: 100}} out:fly={{x: -100}}>
						<Web3AppDashboard
							{address}
							web3AppConfig={$web3AppConfig}
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