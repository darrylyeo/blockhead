<script lang="ts">
	import { getContext } from 'svelte'
	import type { EthereumProvider } from '../../../data/ethereum/provider'
	
	// export let provider: EthereumProvider
	const provider = getContext('provider')
	
	import Loading from '../../../components/Loading.svelte'
</script>

<style>
	section {
		padding: var(--padding-outer);
		background-color: var(--card-background-color);
		border-radius: var(--card-border-radius);
	}
</style>

{#await $provider?.getBlockNumber()}
	<Loading>Retrieving statistics...</Loading>
{:then blockNumber}
	<section>
		<h3>Block Number</h3>
		<p>
			<span>The Ethereum blockchain is </span>
			<strong>{blockNumber}</strong>
			<span> blocks long.</span>
		</p>
	</section>
{:catch error}
	{error}
{/await}