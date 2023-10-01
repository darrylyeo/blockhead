<script lang="ts">
	import type { Ethereum } from '../data/networks/types'


	export let network: Ethereum.Network
	export let blockNumber: Ethereum.BlockNumber
	
	// export let format: 'full' | 'number-only' = 'full'
	export let linked = true
	export let tween = true


	const formatBlockNumber = blockNumber =>
		// format === 'full' ?
		// 	`block #${blockNumber}`
		// :
		blockNumber // && new Intl.NumberFormat(globalThis.navigator.languages).format(blockNumber)

	// const blockSymbol = '' // '🅱️' // 'B⃞' // '#'


	$: link = `/explorer/${network.slug}/${blockNumber}`

	const onDragStart = (e: DragEvent) => {
		e.dataTransfer.setData('text/plain', `${blockNumber}`)
		e.dataTransfer.setData('text/uri', link)
	}


	import { tokenColors } from '../data/tokenColors'


	import NetworkIcon from './NetworkIcon.svelte'
	import TweenedNumber from './TweenedNumber.svelte'

	import { animationKey } from '../actions/animationKey'
</script>


<style>
	.block-number {
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

	.icon {
		display: inline-flex;
		align-items: center;
		font-size: 0.8em;
		height: 1em;
	}

	a * {
		pointer-events: none;
	}
</style>


<!-- {#if format === 'full'}block{/if} -->
{#if linked && blockNumber !== undefined}
	<a
		class="block-number"
		href={link}
		use:animationKey={blockNumber}
		style="{tokenColors[network.slug] ? `--primary-color: var(--${tokenColors[network.slug]});` : ''}"
		draggable={true}
		on:dragstart={onDragStart}
	>
		<NetworkIcon {network} />

		{#if blockNumber !== undefined}
			<TweenedNumber
				value={blockNumber}
				formatter={formatBlockNumber}
				format={{
					showDecimalPlaces: 0,
					useGrouping: false,
				}}
				{tween}
				duration={500}
				padZero
			/>
		{:else}
			•••
		{/if}
	</a>
{:else}
	<span
		class="block-number format"
		use:animationKey={blockNumber}
		style="{tokenColors[network.slug] ? `--primary-color: var(--${tokenColors[network.slug]});` : ''}"
		draggable={true}
	>
		<NetworkIcon {network} />

		{#if blockNumber !== undefined}
			<TweenedNumber
				value={blockNumber}
				formatter={formatBlockNumber}
				format={{
					showDecimalPlaces: 0,
					useGrouping: false,
				}}
				{tween}
				duration={500}
				padZero
			/>
		{:else}
			•••
		{/if}
	</span>
{/if}
