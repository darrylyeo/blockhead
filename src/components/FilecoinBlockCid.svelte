<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import type { Filecoin } from '$/data/filecoin'
	import { networkBySlug } from '$/data/networks'

	
	// Inputs
	export let blockCid: Filecoin.BlockCid
	export let network: Ethereum.Network = networkBySlug.get('filecoin')!
	// (View options)
	export let format: 'full' | 'middle-truncated' = 'full'
	export let linked = true


	// Functions
	import { formatTransactionHash } from '$/utils/formatTransactionHash'
	
	
	// Internal state
	$: formattedId = formatTransactionHash(blockCid, format)

	$: link = network ? `/explorer/${network.slug}/block/${blockCid}` : ''


	// Components
	import NetworkIcon from './NetworkIcon.svelte'
	import TruncatedValue from './TruncatedValue.svelte'
</script>


<svelte:element
	this={linked && network ? 'a' : 'span'}
	{...linked && network && {
		href: link,
	}}
	class="block-cid"
	title={blockCid}
	draggable={true}
	on:dragstart={event => {
		event.dataTransfer?.setData('text/plain', blockCid)
	}}
>
	<NetworkIcon {network} />

	<slot formattedTransactionId={formattedId}>
		<TruncatedValue value={blockCid} />
	</slot>
</svelte:element>



<style>
	.block-cid {
		--icon-size: 1em;

		display: inline-flex;
		place-content: center;
		place-items: center;
		gap: 0.5ch;

		min-width: 1.8em;
		height: 1.8em;
		line-height: 1;
		font-size: 0.8em;

		background-color: var(--card-background-color);
		/* padding: 0.15em 0.4em; */
		padding: 0.4em;
		border-radius: 0.45em;

		font-family: var(--monospace-fonts), var(--base-fonts);
		vertical-align: top;

		box-shadow: inset 0 0 0 calc(0.5px + 0.1em) rgba(var(--rgb-light-dark-inverse), 0.15);
		filter: drop-shadow(0 0 0 var(--primary-color));

		transition: 0.3s;
		animation: Flash 0.75s;
	}
	.block-number:not(:hover) {
		text-decoration: none;
	}
	.block-number:hover {
		filter: drop-shadow(0 0 2px var(--primary-color)) contrast(1.2)
	}

	@keyframes Flash {
		10% {
			color: var(--primary-color);
			transform: translateZ(1em) scale(1.1);
		}
	}
</style>
