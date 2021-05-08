<script lang="ts">
	import { getContext, onMount, setContext } from 'svelte'
	import { derived, readable, writable } from 'svelte/store'

	import type { Ethereum } from '../../../data/ethereum/types'
	import { networksByChainID } from '../../../data/ethereum/networks'
	import { preferredEthereumProvider } from '../../../data/ethereum/preferences'
	import { getProvider } from '../../../data/ethereum/provider'


	// Network being explored
	const chainID = 43114

	const explorerNetwork = readable<Ethereum.Network>(networksByChainID[chainID], set => {})
	setContext('explorerNetwork', explorerNetwork)

	const explorerProvider = derived<[typeof explorerNetwork, typeof preferredEthereumProvider], Ethereum.Provider>([explorerNetwork, preferredEthereumProvider], async ([$explorerNetwork, $preferredEthereumProvider], set) => {
		await new Promise(r => onMount(r))
		set(await getProvider($explorerNetwork, $preferredEthereumProvider, 'ethers'))
	})
	setContext('explorerProvider', explorerProvider)
	
	const blockNumber = derived<typeof explorerProvider, number>(explorerProvider, ($explorerProvider, set) => {
		const onBlock = blockNumber => set(blockNumber)
		$explorerProvider.on('block', onBlock)
		return () => $explorerProvider.off('block', onBlock)
	})
	setContext('blockNumber', blockNumber)


	export let query = writable<string>('')
	if(!getContext('query'))
		setContext('query', query)

	import { goto } from '@sapper/app'
	$: if(globalThis.document && $query)
		goto(`explorer/${$explorerNetwork.slug}/${$query}`)

	$: currentQuery = $query


	import AddressField from '../../../components/AddressField.svelte'
	import Loader from '../../../components/Loader.svelte'
	import TokenIcon from '../../../components/TokenIcon.svelte'
</script>

<style>
	form {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: var(--padding-inner);
		align-items: center;
	}
</style>

<svelte:head>
	<title>{$query ? `${$query} | ` : ''}{$explorerNetwork.name} Explorer | Blockhead</title>
</svelte:head>


<!-- <AddressField bind:query={$query} on:change={goto(`explorer/${$explorerNetwork.slug}/${query}`)}/> -->
<form on:submit|preventDefault={() => $query = currentQuery}>
	<AddressField bind:address={currentQuery} placeholder="C-Chain Address (0xabcd...6789) / Avvy Domain (avvy.avax)" />
	<button>Go</button>
</form>

<Loader
	loadingMessage="Connecting to the {$explorerNetwork.name} blockchain via {$preferredEthereumProvider}..."
	fromPromise={$explorerProvider && (async () => $explorerProvider)}
>
	<TokenIcon slot="loadingIcon" token={$explorerNetwork.nativeCurrency.symbol} />

	<slot />
</Loader>