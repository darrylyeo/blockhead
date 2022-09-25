<script lang="ts">
	// Constants
	import { preferences } from '../../../state/preferences'


	// Params
	import { addressOrEnsName } from '../_appsParams'


	// Context
	import { web3AppConfig } from '../_appsContext'


	// Internal state

	$: currentAddressOrEnsName = $addressOrEnsName

	let tokenBalanceFormat
	let showUnderlyingAssets


	// Components

	import AddressField from '../../../components/AddressField.svelte'
	import Web3AppDashboard from '../../../components/Web3AppDashboard.svelte'
	import EnsResolutionLoader from '../../../components/EnsResolutionLoader.svelte'


	// Transitions

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
