<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'
	
	export let network: Ethereum.Network
	export let blockNumber: Ethereum.BlockNumber
	export let provider: Ethereum.Provider

	export let showBeforeAndAfter = false

	$: blockNumberBefore = blockNumber - 1
	$: blockNumberAfter = blockNumber + 1


	// let latestBlockNumber: Ethereum.BlockNumber


	let navElement

	import type { Writable } from 'svelte/store'
	import { getContext } from 'svelte'
	const networkSlug = getContext<Writable<string>>('networkSlug')
	const query = getContext<Writable<string>>('query')


	import EthereumBlockNumber from './EthereumBlockNumber.svelte'
	import EthereumLatestBlockNumber from './EthereumLatestBlockNumber.svelte'
	import { tokenColors } from '../data/token-colors'
	import { fade } from 'svelte/transition'
	import { scaleFont } from '../transitions/scale-font'
</script>


<style>
	.block-navigation {
		background: radial-gradient(var(--primary-color) -20%, transparent 40%) 0/0.3em 0.3em repeat-x;
		gap: 0.25em;
		cursor: col-resize;
	}
	.block-navigation:hover {
		background: radial-gradient(var(--primary-color) 0%, transparent 40%) 0/0.3em 0.3em repeat-x;
	}

	.block-navigation > span {
		display: inline-flex;
		align-items: start;
		transition: 0.3s;
		/* order: var(--block-number); */
	}

	.first-block {
		/* margin-right: max(1ch, var(--current-block-number) / var(--latest-block-number) * 100%); */
		/* margin-right: auto; */
		flex-grow: calc(var(--current-block-number) / var(--latest-block-number));
		justify-content: start;
	}

	.latest-block {
		/* margin-left: max(1ch, (1 - var(--current-block-number) / var(--latest-block-number)) * 100%); */
		/* margin-left: auto; */
		flex-grow: max(1 - var(--current-block-number) / var(--latest-block-number), 1 - var(--latest-block-number) / max(var(--current-block-number), 1));
		justify-content: end;
	}
	/* .latest-block > :global(div) {
		display: inline-block;
	} */

	.current-block {
		font-size: 1.15em;
		/* margin-left: max(0, (1 - var(--latest-block-number) / var(--current-block-number)) * 100%); */
		/* margin-left: auto; */
	}
</style>


<EthereumLatestBlockNumber {network} {provider} let:latestBlockNumber>
	<nav
		class="block-navigation row"
		bind:this={navElement}
		on:click={e => {
			if(e.target instanceof globalThis.HTMLAnchorElement) return

			if(blockNumber === undefined && latestBlockNumber === undefined) return

			const x = (e.clientX - navElement.getBoundingClientRect().left) / navElement.clientWidth
			const adjustedX = Math.min(Math.max(0.3 + (x - 0.3) * 1.15, 0), 1)
			;[$networkSlug, $query] = [network.slug, Math.round(adjustedX * Math.max(blockNumber ?? -Infinity, latestBlockNumber ?? -Infinity)).toString()]
		}}
		transition:fade
		style="
			{tokenColors[network.slug] ? `--primary-color: var(--${tokenColors[network.slug]});` : ''}
			--current-block-number: {blockNumber};
			--latest-block-number: {latestBlockNumber ?? Math.max(blockNumber * 2, 2)};
		"
	>
	<!-- on:mousemove={e => {
		const rect = navElement.getBoundingClientRect()
		const x = (e.clientX - rect.left) / navElement.clientWidth
		const y = (e.clientY - rect.top) / navElement.clientHeight
		const adjustedX = Math.min(Math.max(0.3 + (x - 0.3) * 1.15, 0), 1)
		blockNumber = y >= 0.1 && y <= 0.9 ? Math.round(adjustedX * Math.max(blockNumber ?? -Infinity, latestBlockNumber ?? -Infinity)) : $$props.blockNumber
	}} -->
		{#if blockNumber !== 0 && !(showBeforeAndAfter && blockNumberBefore === 0)}
			<span class="first-block" style="--block-number: {0}" transition:scaleFont>
				<span title="Genesis {network.name} Block"><EthereumBlockNumber {network} blockNumber={0} /></span>
				<span>«</span>
				<!-- <span>🔗</span> -->
			</span>
		{/if}

		{#if showBeforeAndAfter && blockNumber !== 0}
			<span class="previous-block" style="--block-number: {blockNumberBefore}" transition:scaleFont>
				<span title="Previous {network.name} Block"><EthereumBlockNumber {network} blockNumber={blockNumberBefore} /></span>
				<span>‹</span>
				<!-- <span>🔗</span> -->
			</span>
		{/if}

		<span class="current-block" style="--block-number: {blockNumber ?? latestBlockNumber ? Math.ceil(latestBlockNumber / 2) : 1}" transition:scaleFont>
			<span title="Current {network.name} Block"><EthereumBlockNumber {network} {blockNumber} /></span>
		</span>

		{#if showBeforeAndAfter && blockNumber !== latestBlockNumber}
			<span class="next-block" style="--block-number: {blockNumberAfter}" transition:scaleFont>
				<!-- <span>🔗</span> -->
				<span>›</span>
				<span title="Next {network.name} Block"><EthereumBlockNumber {network} blockNumber={blockNumberAfter} /></span>
			</span>
		{/if}


		{#if blockNumber !== latestBlockNumber && !(showBeforeAndAfter && blockNumberAfter === latestBlockNumber)}
			<span class="latest-block" style="--block-number: {latestBlockNumber ?? blockNumber ? blockNumber * 2 : 2}" transition:scaleFont>
				<!-- <span>🔗</span> -->
				<span>»</span>
				<span title="Latest {network.name} Block"><EthereumBlockNumber {network} blockNumber={latestBlockNumber} /></span>
			</span>
		{/if}

		<!--<span class="latest-block" transition:scaleFont hidden={!(
			!latestBlockNumber || blockNumber < latestBlockNumber && (!showBeforeAndAfter && blockNumberAfter === latestBlockNumber)
		)}>
			<!-- <span>🔗</span> -- >
			<!-- <span>»</span> -- >
			<EthereumLatestBlockNumber {network} {provider} bind:blockNumber={latestBlockNumber} />
		</span>-->
	</nav>
</EthereumLatestBlockNumber>