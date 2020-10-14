<script lang="ts">
	import type { CryptoAddress } from '../data/CryptoAddress'
	
	export let address: CryptoAddress = ''
	export let format: 'full' | 'middle-truncated' = 'full'
</script>

<style>
	.address {
		display: inline-block;
		max-width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>

<span class="address">
	{#if format === 'middle-truncated'}
		{address.slice(0, 4) + '…' + address.slice(-4)}
	{:else}
		{address}
	{/if}
</span>