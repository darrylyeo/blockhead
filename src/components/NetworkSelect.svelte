<script lang="ts">
	import type { Ethereum } from '$/data/networks/types'
	import { networksBySection, testnetsForMainnet, getNetworkColor, isTestnet, getNetworkIcon } from '$/data/networks'


	export let placeholder = 'Select Network...'
	export let showTestnets = false
	export let allowedNetworks: Set<Ethereum.Network> | undefined


	export let network: Ethereum.Network | undefined


	import { createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()
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
	style:--select-leftIcon-url={network && getNetworkIcon(network) ? `url(${getNetworkIcon(network)})` : ''}
>
	<option value={undefined} selected>{placeholder}</option>

	{#each networksBySection as {title, featuredNetworks = [], otherNetworks = []}}
		{@const networks = [...featuredNetworks, ...otherNetworks].filter(network => !allowedNetworks || allowedNetworks.has(network))}

		{#if networks.length}
			<optgroup label={title}>
				{#each networks as network}
					{#if showTestnets}
						<option disabled>{network.name}</option>
						<option value={network}>{`${network.name}${isTestnet(network) || network.name.includes('Mainnet') ? '' : ' Mainnet'}`}{network.chainId ? ` (${network.chainId})` : ''}</option>

						{#each testnetsForMainnet.get(network.slug) ?? [] as testnetNetwork}
							<option value={testnetNetwork}>{testnetNetwork.name}{testnetNetwork.chainId ? ` (${testnetNetwork.chainId})` : ''}</option>
						{/each}
					{:else}
						<option value={network} style={`--primary-color: ${getNetworkColor(network)}`}>{network.name}</option>
					{/if}
				{/each}
			</optgroup>
		{/if}
	{/each}

	<!-- {#if showTestnets}
		{#each networksBySection as {title, featuredNetworks = [], otherNetworks = []}}
			{@const networks = [...featuredNetworks, ...otherNetworks]}

			<option disabled>{title}</option>
			{#each networks as network}
				<optgroup label={network.name} style={`--primary-color: ${getNetworkColor(network)}`}>
					<option value={network}>{network.name} Mainnet{network.chainId ? ` (${network.chainId})` : ''}</option>

					{#each testnetsForMainnet,get(network.slug) ?? [] as testnetNetwork (testnetNetwork.chainId)}
						<option value={testnetNetwork}>{testnetNetwork.name}{testnetNetwork.chainId ? ` (${testnetNetwork.chainId})` : ''}</option>
					{/each}
				</optgroup>
			{/each}
		{/each}
	{:else}
		{#each networksBySection as {title, featuredNetworks = [], otherNetworks = []}}
			{@const networks = [...featuredNetworks, ...otherNetworks]}

			<optgroup label={title}>
				{#each networks as network}
					<option value={network} style={`--primary-color: ${getNetworkColor(network)}`}>{network.name}</option>
				{/each}
			</optgroup>
		{/each}
	{/if} -->
</select>

