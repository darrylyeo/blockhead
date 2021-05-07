<script lang="ts">
	import { getContext, setContext } from 'svelte'
	import { writable } from 'svelte/store'
	import { goto } from '@sapper/app'

	import type { Ethereum } from '../../../data/ethereum/types'
	import { networksByChainID } from '../../../data/ethereum/networks'
	import { preferredAnalyticsProvider, preferredEthereumProvider } from '../../../data/ethereum/preferences'
	
	const chainID = 1
	export const explorerNetwork = writable<Ethereum.Network>(networksByChainID[chainID])
	setContext('explorerNetwork', explorerNetwork)

	const provider = getContext<Ethereum.Provider>('ethereumProvider')
	setContext('analyticsProvider', preferredAnalyticsProvider)

	export let segment: string
	$: console.log('segment', segment)

	export let query = writable<string>('')
	if(!getContext('query'))
		setContext('query', query)

	// $: console.log('query changed: ', query)
	$: if(globalThis.document && $query)
		goto(`explorer/ethereum/${$query}`)

	$: currentQuery = $query

	import AddressField from '../../../components/AddressField.svelte'
	import Loading from '../../../components/Loading.svelte'
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
	<title>{$query ? `${$query} | ` : ''}Ethereum Explorer | Blockhead</title>
</svelte:head>


<!-- <AddressField bind:query={$query} on:change={goto(`explorer/ethereum/${query}`)}/> -->
<form on:submit|preventDefault={() => $query = currentQuery}>
	<AddressField bind:address={currentQuery}/>
	<button>Go</button>
</form>

{#if $provider}
	<slot></slot>
	<!-- <slot {provider} {query}></slot> -->
{:else}
	<Loading>Connecting to the blockchain via {$preferredEthereumProvider}...</Loading>
{/if}