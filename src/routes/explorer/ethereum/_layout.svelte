<script lang="ts">
	import { onMount, setContext } from 'svelte'
	import { readable, writable } from 'svelte/store'
	import { goto } from '@sapper/app'

	import type { EthereumProvider } from '../../../data/ethereum/provider'
	import { ethereumNetwork } from '../../../data/ethereum/network'
	import { getProvider } from '../../../data/ethereum/provider'
	
	let provider = readable<EthereumProvider>(undefined, set => {
		onMount(async () => {
			set(await getProvider($ethereumNetwork))
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

	export let segment
	$: console.log('segment', segment)

	export let address = writable<string>('')
	setContext('address', address)

	// $: console.log('address changed: ', address)
	// $: if(globalThis.document)
	// 	goto(`explorer/ethereum/${address}`)

	import AddressField from '../../../components/AddressField.svelte'
	import Loading from '../../../components/Loading.svelte'
</script>

<svelte:head>
	<title>{$address ? `${$address} | ` : ''}Ethereum Explorer | Blockhead</title>
</svelte:head>

<div>
	<AddressField bind:address={$address} on:change={goto(`explorer/ethereum/${address}`)}/>
</div>

{#if $provider}
	<slot></slot>
	<!-- <slot {provider} {address}></slot> -->
{:else}
	<Loading>Connecting to the blockchain...</Loading>
{/if}