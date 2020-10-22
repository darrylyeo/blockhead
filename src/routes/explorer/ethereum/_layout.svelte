<script lang="ts">
	import { onMount, getContext, setContext } from 'svelte'
	import { readable, writable } from 'svelte/store'
	import { goto } from '@sapper/app'

	import type { Ethereum } from '../../../data/ethereum/types'
	import { ethereumNetwork, preferredEthereumProvider } from '../../../data/ethereum/preferences'
	import { getProvider } from '../../../data/ethereum/provider'
	
	let provider = readable<Ethereum.Provider>(undefined, set => {
		onMount(async () => {
			set(await getProvider($ethereumNetwork, $preferredEthereumProvider, 'ethers'))
		})
	})
	setContext('provider', provider)

	// let provider: EthereumProvider
	// onMount(async () => {
	// 	console.log('ethereumNetwork', $ethereumNetwork)
	// 	provider = await getProvider($ethereumNetwork)
	// 	console.log('provider', provider)

	// 	setContext('provider', provider)
	// })
		
	// import { pocketInstance } from '../../data/pocket-network'
	// onMount(async () => {
	// 	const pocketInstance = await import('../../data/pocket-network')
	// 	const balance = await pocketInstance.rpc.query.getBalance(address)
	// })

	export let segment: string
	$: console.log('segment', segment)

	export let query = writable<string>('')
	if(!getContext('query'))
		setContext('query', query)

	// $: console.log('query changed: ', query)
	// $: if(globalThis.document)
	// 	goto(`explorer/ethereum/${query}`)

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
<form on:submit|preventDefault={() => goto(`explorer/ethereum/${$query}`)}>
	<AddressField bind:address={$query}/>
	<button>Go</button>
</form>

{#if $provider}
	<slot></slot>
	<!-- <slot {provider} {query}></slot> -->
{:else}
	<Loading>Connecting to the blockchain via {$preferredEthereumProvider}...</Loading>
{/if}