<script lang="ts">
	import type { Ethereum } from '../data/networks/types'
	import { networksBySection, testnetsForMainnets, getNetworkColor, networksByChainID } from '../data/networks'

	export let showTestnets = false


	export let network: Ethereum.Network


	import { createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()


	// Components
	import NetworkIcon from './NetworkIcon.svelte'
</script>


<style>
	select {
		max-width: 11.5rem;
	}
</style>


<select
	bind:value={network}
	on:change={(e) => {
		// dispatchEvent(new CustomEvent('change', { detail: { network } }))
		dispatch('change', { network, target: e.target })
	}}
>
	<option value="" selected>Select Network...</option>

	{#each networksBySection as {title, networks}}
		<optgroup label={title}>
			{#each networks as network}
				{#if showTestnets}
					<option disabled>{network.name}</option>
					<option value={network}>{network.name} Mainnet{network.chainId ? ` (${network.chainId})` : ''}</option>

					{#each testnetsForMainnets[network.slug] ?? [] as testnetNetwork}
						<option value={testnetNetwork.slug}>{testnetNetwork.name}{testnetNetwork.chainId ? ` (${testnetNetwork.chainId})` : ''}</option>
					{/each}
				{:else}
					<option value={network} style={`--primary-color: ${getNetworkColor(network)}`}>{network.name}</option>
				{/if}
			{/each}
		</optgroup>
	{/each}

	<!-- {#if showTestnets}
		{#each networksBySection as {title, networks}}
			<option disabled>{title}</option>
			{#each networks as network}
				<optgroup label={network.name} style={`--primary-color: ${getNetworkColor(network)}`}>
					<option value={network}>{network.name} Mainnet{network.chainId ? ` (${network.chainId})` : ''}</option>

					{#each testnetsForMainnets[network.slug] ?? [] as testnetNetwork (testnetNetwork.chainId)}
						<option value={testnetNetwork}>{testnetNetwork.name}{testnetNetwork.chainId ? ` (${testnetNetwork.chainId})` : ''}</option>
					{/each}
				</optgroup>
			{/each}
		{/each}
	{:else}
		{#each networksBySection as {title, networks}}
			<optgroup label={title}>
				{#each networks as network}
					<option value={network} style={`--primary-color: ${getNetworkColor(network)}`}>{network.name}</option>
				{/each}
			</optgroup>
		{/each}
	{/if} -->
</select>

