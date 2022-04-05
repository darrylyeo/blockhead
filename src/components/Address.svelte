<script lang="ts">
	import type { CryptoAddress } from '../data/CryptoAddress'
	import type { Ethereum } from '../data/ethereum/types'


	export let network: Ethereum.Network
	export let address: CryptoAddress = ''

	export let format: 'full' | 'middle-truncated' = 'full'
	export let linked = true


	import { formatAddress } from '../utils/formatAddress'
	$: formattedAddress = formatAddress(address, format)
</script>

<style>
	.format {
		font-family: var(--monospace-fonts), var(--base-fonts);
		font-size: 0.95em;

		/* display: inline-block;
		max-width: 100%;
		overflow: hidden;
		text-overflow: ellipsis; */

		white-space: nowrap;
	}
</style>


{#if linked && network}
	<a class="address" href="/explorer/{network.slug}/{address}" draggable={true}>
		<slot {formattedAddress}>
			{#if format === 'middle-truncated'}
				<abbr class="format" title={address}>{formattedAddress}</abbr>
			{:else}
				<span class="format">{formattedAddress}</span>
			{/if}
		</slot>
	</a>
{:else}
	<slot {formattedAddress}>
		{#if format === 'middle-truncated'}
			<abbr class="address format" title={address} draggable={true}>{formattedAddress}</abbr>
		{:else}
			<span class="address format" draggable={true}>{formattedAddress}</span>
		{/if}
	</slot>
{/if}