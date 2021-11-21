<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'


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


	import { tweened } from 'svelte/motion'
	import { quintOut } from 'svelte/easing'

	const tweenedBlockNumber = tweened(0, {
		duration: tween ? 500 : 0,
		delay: tween ? 1 : 0,
		easing: quintOut,
		interpolate: (from, to) => t => {
			const logFrom = from != 0 ? Math.log10(from) : -1
			const logTo = to != 0 ? Math.log10(to) : -1
			const result = Math.round(Math.pow(10, logFrom + t * (logTo - logFrom)))
			return from == 0 ? result.toString().padStart(logTo + 1, '0') : result
		}
	})
	$: tweenedBlockNumber.set(blockNumber || 0)


	import { tokenColors } from '../data/token-colors'


	import TokenIcon from './TokenIcon.svelte'
</script>


<style>
	.block-number {
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
{#key blockNumber}
	{#if linked && blockNumber !== undefined}
		<a class="block-number" href="/explorer/{network.slug}/{blockNumber}" style="{tokenColors[network.slug] ? `--primary-color: var(--${tokenColors[network.slug]});` : ''}">
			<span class="icon"><TokenIcon {...network.nativeCurrency} /></span>
			{#if blockNumber !== undefined}
				{formatBlockNumber($tweenedBlockNumber)}
			{:else}
				•••
			{/if}
		</a>
	{:else}
		<span class="block-number format" style="{tokenColors[network.slug] ? `--primary-color: var(--${tokenColors[network.slug]});` : ''}">
			<span class="icon"><TokenIcon {...network.nativeCurrency} /></span>
			{#if blockNumber !== undefined}
				{formatBlockNumber($tweenedBlockNumber)}
			{:else}
				•••
			{/if}
		</span>
	{/if}
{/key}