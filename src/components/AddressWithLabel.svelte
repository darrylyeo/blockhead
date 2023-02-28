<script lang="ts">
	import type { NetworkAccountAddress } from '../data/address'
	import type { Ethereum } from '../data/networks/types'
	

	export let network: Ethereum.Network
	export let address: NetworkAccountAddress
	export let label: string

	export let format: 'full' | 'middle-truncated'
	export let linked
	export let alwaysShowAddress = false

	import Address from './Address.svelte'
</script>

<style>
	.address-with-label {
		
	}

	.label {
		/* font-weight: 100; */
	}
	.label + .address {
		font-size: 0.8em;
	}
</style>

<span class="address-with-label">
	{#if label}
		<Address {network} {address} {format} {linked}>
			<span class="label">{label}</span>
		</Address>
	{/if}
	{#if !label || alwaysShowAddress}
		<span class="address">
			{#if label}({/if}<Address {network} {address} {format} {linked} />{#if label}){/if}
		</span>
	{/if}
</span>