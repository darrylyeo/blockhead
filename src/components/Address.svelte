<script lang="ts">
	import type { CryptoAddress } from '../data/CryptoAddress'
	import type { Ethereum } from '../data/networks/types'


	export let network: Ethereum.Network
	export let address: CryptoAddress = ''

	export let format: 'full' | 'middle-truncated' = 'full'
	export let linked = true


	import { formatAddress } from '../utils/formatAddress'
	$: formattedAddress = formatAddress(address, format)


	$: link = network ? `/explorer/${network.slug}/${address}` : ''

	const onDragStart = (e: DragEvent) => {
		e.dataTransfer.setData('text/plain', address)
		if(linked) e.dataTransfer.setData('text/uri-list', link)
	}
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
	<a
		class="address"
		href={link}
		draggable={true}
		on:dragstart={onDragStart}
	>
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
			<abbr
				class="address format"
				title={address}
				draggable={true}
				on:dragstart={onDragStart}

			>{formattedAddress}</abbr>
		{:else}
			<span
				class="address format"
				draggable={true}
				on:dragstart={onDragStart}
			>{formattedAddress}</span>
		{/if}
	</slot>
{/if}