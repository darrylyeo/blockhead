<script lang="ts">
	import type { Ethereum } from '$/data/networks/types'
	import type { NetworkProvider } from '$/data/networkProviders/types'

	export let network: Ethereum.Network
	export let networkProvider: NetworkProvider

	export let blockNumber: Ethereum.BlockNumber | undefined
	export let publicClient: Ethereum.PublicClient

	export let showBeforeAndAfter = false

	$: blockNumberBefore = blockNumber && blockNumber - 1n
	$: blockNumberAfter = blockNumber && blockNumber + 1n


	// let latestBlockNumber: Ethereum.BlockNumber


	let navElement: HTMLElement

	import { explorerParams } from '$/routes/explorer/_explorerParams.svelte'


	import BlockNumber from './BlockNumber.svelte'
	import EthereumLatestBlockNumber from './EthereumLatestBlockNumber.svelte'
	import { tokenColors } from '$/data/tokenColors'
	import { fade } from 'svelte/transition'
	import { scaleFont } from '$/transitions/scale-font'
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


<EthereumLatestBlockNumber {network} let:latestBlockNumber>
	<nav
		class="block-navigation row"
		bind:this={navElement}
		on:click={e => {console.log({e})
			if(e.target instanceof Element && e.target.closest('a')) return

			if(blockNumber === undefined && latestBlockNumber === undefined) return

			const x = (e.clientX - navElement.getBoundingClientRect().left) / navElement.clientWidth
			const adjustedX = Math.min(Math.max(0.3 + (x - 0.3) * 1.15, 0), 1)
			;[explorerParams.networkSlug, explorerParams.blockNumber] = [network.slug, BigInt(Math.round(adjustedX * Math.max(Number(blockNumber ?? -Infinity), Number(latestBlockNumber ?? -Infinity))).toString())]
		}}
		transition:fade|global
		style="
			{tokenColors[network.slug] ? `--primary-color: var(--${tokenColors[network.slug]});` : ''}
			--current-block-number: {blockNumber ?? 0n};
			--latest-block-number: {latestBlockNumber ?? (blockNumber ? blockNumber * 2n : 2)};
		"
	>
	<!-- on:mousemove={e => {
		const rect = navElement.getBoundingClientRect()
		const x = (e.clientX - rect.left) / navElement.clientWidth
		const y = (e.clientY - rect.top) / navElement.clientHeight
		const adjustedX = Math.min(Math.max(0.3 + (x - 0.3) * 1.15, 0), 1)
		blockNumber = y >= 0.1 && y <= 0.9 ? Math.round(adjustedX * Math.max(blockNumber ?? -Infinity, latestBlockNumber ?? -Infinity)) : $$props.blockNumber
	}} -->
		{#if blockNumber !== 0n && !(showBeforeAndAfter && blockNumberBefore === 0n)}
			<span class="first-block" style="--block-number: {0n}" transition:scaleFont>
				<span title="{network.name} Genesis Block"><BlockNumber {network} blockNumber={0n} /></span>
				<span>«</span>
				<!-- <span>🔗</span> -->
			</span>
		{/if}

		{#if showBeforeAndAfter && blockNumber !== 0n}
			<span class="previous-block" style="--block-number: {blockNumberBefore}" transition:scaleFont>
				<span title="Previous {network.name} Block"><BlockNumber {network} blockNumber={blockNumberBefore} /></span>
				<span>‹</span>
				<!-- <span>🔗</span> -->
			</span>
		{/if}

		{#if blockNumber !== undefined}
			<span class="current-block" style="--block-number: {blockNumber ?? (latestBlockNumber ? BigInt(Math.ceil(Number(latestBlockNumber) / 2)) : 1n)}" transition:scaleFont>
				<span title="Current {network.name} Block"><BlockNumber {network} {blockNumber} /></span>
			</span>
		{:else}
			<span />
		{/if}

		{#if showBeforeAndAfter && blockNumber !== latestBlockNumber}
			<span class="next-block" style="--block-number: {blockNumberAfter}" transition:scaleFont>
				<!-- <span>🔗</span> -->
				<span>›</span>
				<span title="Next {network.name} Block"><BlockNumber {network} blockNumber={blockNumberAfter} /></span>
			</span>
		{/if}

		{#if !(blockNumber !== undefined && blockNumber === latestBlockNumber) && !(showBeforeAndAfter && blockNumberAfter === latestBlockNumber)}
			<span class="latest-block" style="--block-number: {latestBlockNumber ?? (blockNumber ? blockNumber * 2n : 2)}" transition:scaleFont>
				<!-- <span>🔗</span> -->
				<span>»</span>
				<span title="Latest {network.name} Block"><BlockNumber {network} blockNumber={latestBlockNumber} /></span>
			</span>
		{/if}

		<!--<span class="latest-block" transition:scaleFont hidden={!(
			!latestBlockNumber || blockNumber < latestBlockNumber && (!showBeforeAndAfter && blockNumberAfter === latestBlockNumber)
		)}>
			<!-- <span>🔗</span> -- >
			<!-- <span>»</span> -- >
			<EthereumLatestBlockNumber {network} {networkProvider} bind:blockNumber={latestBlockNumber} />
		</span>-->
	</nav>
</EthereumLatestBlockNumber>
