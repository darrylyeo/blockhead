<script lang="ts">
	import type { CryptoAddress } from '../data/CryptoAddress'
	import type { Ethereum } from '../data/ethereum/types'
	
	export let network: Ethereum.Network
	export let address: CryptoAddress
	export let label: string

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
	<Address {network} {address} {format} {linked} />
	{#if label}
		<span class="label">{label}</span>
	{/if}
</span>