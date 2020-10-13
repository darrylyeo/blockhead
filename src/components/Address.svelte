<script lang="ts">
	import type { CryptoAddress } from '../data/CryptoAddress'
	
	export let address: CryptoAddress = ''
	export let format = 'middle-truncated'
	export let editable = false

	let isValid = false
	$: {
		isValid = address !== undefined
	}
</script>

<span class="address">
	{#if editable}
		<input type="text" class:is-valid={isValid} placeholder="Address (0xabcd...6789) / ENS (example.eth)" bind:value={address} on:input={e => address = e.target.value} /><!--  -->
	{:else if address}
		{#if format === 'middle-truncated'}
			{address.slice(0, 4) + '…' + address.slice(-4)}
		{:else}
			{address}
		{/if}
	{/if}
</span>