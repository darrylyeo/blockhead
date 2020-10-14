<script context="module">
	import { getContext } from 'svelte'

	export async function preload({ params }) {
		const { address } = params
		return {initialAddress: address}
	}
</script>

<script lang="ts">
	import type { EthereumProvider } from '../../../data/ethereum/provider'

	let provider: SvelteStore<EthereumProvider> = getContext('provider')

	export let initialAddress
	export let address: SvelteStore<string> = getContext('address')
	
	$: if(initialAddress)
		address.set(initialAddress)

	import Balance from '../../../components/Balance.svelte'
</script>

<style>

</style>

<div>
	{#if $provider && $address}
		<Balance provider={$provider} address={$address} />
	{/if}
</div>
