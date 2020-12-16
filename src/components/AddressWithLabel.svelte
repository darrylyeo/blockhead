<script lang="ts">
	import type { CryptoAddress } from '../data/CryptoAddress'
	
	export let address: CryptoAddress
	export let label: string
	export let blockchain
	export let format: 'full' | 'middle-truncated'
	export let linked

	import Address from './Address.svelte'
</script>

<style>
	.address-with-label {
		
	}

	.label {
		font-size: 0.8em;
	}
</style>

<span class="address-with-label">
	<Address {address} {blockchain} {format} {linked} />
	{#if label}
		<span class="label">{label}</span>
	{/if}
</span>