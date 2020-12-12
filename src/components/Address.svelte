<script lang="ts">
	import type { CryptoAddress } from '../data/CryptoAddress'
	
	export let address: CryptoAddress = ''
	export let blockchain = 'ethereum'
	export let format: 'full' | 'middle-truncated' = 'full'
	export let linked = true

	$: formattedAddress =
		format === 'middle-truncated' ?
			address.slice(0, 6) + '…' + address.slice(-4)
		:
			address
</script>

<style>
	.address {
		font-family: var(--monospace-fonts), var(--base-fonts);
		font-size: 0.95em;

		/* display: inline-block; */
		max-width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>

{#if linked}
	<a class="address" href="explorer/{blockchain}/{address}">{formattedAddress}</a>
{:else}
	<span class="address">{formattedAddress}</span>
{/if}