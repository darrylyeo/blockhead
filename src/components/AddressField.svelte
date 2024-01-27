<script lang="ts">
	import type { NetworkAccountAddress } from '$/data/address'
	
	export let address: NetworkAccountAddress

	export let autofocus = false
	export let required = false

	export let placeholder = 'Address (0xabcd...6789) / Transaction ID (0xabcdef...456789) / Block Number (12345678) / ENS Domain (vitalik.eth)'
</script>


<input
	class="address-field"
	type="search"
	class:is-valid={address !== undefined} 
	{placeholder}
	bind:value={address} 
	{autofocus}
	{required}
	on:focus={e => e.target.select()}
/>
