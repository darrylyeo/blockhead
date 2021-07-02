<script lang="ts">
	import type { Ethereum } from '../../../data/ethereum/types'
	import { getContext } from 'svelte'

	const explorerNetwork = getContext<SvelteStore<Ethereum.Network>>('explorerNetwork')
	const explorerProvider = getContext<SvelteStore<Ethereum.Provider>>('explorerProvider')
	const blockNumber = getContext<SvelteStore<number>>('blockNumber')


	import type { Writable } from 'svelte/store'

	const query = getContext<Writable<string>>('query')

	import { goto } from '@sapper/app'
	$: if(globalThis.document && $query)
		goto(`explorer/${$explorerNetwork.slug}/${$query}`)

	$: currentQuery = $query


	import { preferredEthereumProvider } from '../../../data/ethereum/preferences'


	import AddressField from '../../../components/AddressField.svelte'
	import NetworkProviderLoader from '../../../components/NetworkProviderLoader.svelte'
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

	<NetworkProviderLoader
		network={$explorerNetwork}
		providerPromise={$explorerProvider && (async () => $explorerProvider)}
		providerName={$preferredEthereumProvider}
	>
		<slot />
	</NetworkProviderLoader>
</section>