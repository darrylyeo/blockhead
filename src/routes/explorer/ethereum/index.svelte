<script lang="ts">
	import { getContext } from 'svelte'
	import type { EthereumProvider } from '../../../data/ethereum/provider'

	// export let provider: EthereumProvider
	
	// $: blockNumber = provider?.getBlockNumber()


	let provider = getContext('provider')

	let blockNumber
	$: $provider?.getBlockNumber().then(_ => blockNumber = _)
</script>

<style>
	section {
		padding: var(--padding-outer);
		background-color: var(--card-background-color);
		border-radius: var(--card-border-radius);
	}
</style>

{#if blockNumber}
	<section>
		<h3>Block Number</h3>
		<p>
			<span>The Ethereum blockchain is </span>
			<strong>{blockNumber}</strong>
			<span> blocks long.</span>
		</p>
	</section>
{/if}