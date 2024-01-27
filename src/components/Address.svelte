<script lang="ts">
	// Types/constants
	import type { NetworkAccountAddress } from '$/data/address'
	import type { Ethereum } from '$/data/networks/types'


	// Inputs
	export let network: Ethereum.Network
	export let address: NetworkAccountAddress
	// (View options)
	export let format: 'full' | 'middle-truncated' = 'full'
	export let linked = true


	// Functions
	import { formatAddress } from '$/utils/formatAddress'
	import { resolveRoute } from '$app/paths'


	// Internal state
	// (Computed)
	$: formattedAddress = formatAddress(address, format)
	$: link = linked && network && address ? resolveRoute(`/explorer/[networkSlug]/address/[address]`, { networkSlug: network.slug, address }) : undefined


	// Actions
	const onDragStart = (e: DragEvent) => {
		e.dataTransfer?.setData('text/plain', address)
		if(link) e.dataTransfer?.setData('text/uri-list', link)
	}
</script>


{#if link}
	<a
		class="address"
		href={link}
		draggable={true}
		on:dragstart={onDragStart}
	>
		<slot {formattedAddress}>
			{#if format === 'middle-truncated'}
				<abbr class="monospace" title={address}>{formattedAddress}</abbr>
			{:else}
				<span class="monospace">{formattedAddress}</span>
			{/if}
		</slot>
	</a>
{:else}
	<slot {formattedAddress}>
		{#if format === 'middle-truncated'}
			<abbr
				class="address monospace"
				title={address}
				draggable={true}
				on:dragstart={onDragStart}

			>{formattedAddress}</abbr>
		{:else}
			<span
				class="address monospace"
				draggable={true}
				on:dragstart={onDragStart}
			>{formattedAddress}</span>
		{/if}
	</slot>
{/if}
