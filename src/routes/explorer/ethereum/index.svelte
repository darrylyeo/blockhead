<script lang="ts">
	import { getContext, onMount } from 'svelte'
	import { preferredBaseCurrency } from '../../../data/ethereum/preferences'
	import { getCompoundPriceFeed } from '.../../../data/ethereum/price/compound-price-feed'
	// import { getChainlinkPriceFeed } from '.../../../data/ethereum/price/chainlink'
	
	const provider = getContext('provider')

	import Loading from '../../../components/Loading.svelte'
	import TokenRate from '../../../components/TokenRate.svelte'

	let isMounted = false
	onMount(() => isMounted = true)
</script>

{#await $provider?.getBlockNumber()}
	<Loading>Retrieving statistics...</Loading>
{:then blockNumber}
	<section class="card">
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

<!-- {#await getChainlinkPriceFeed($provider, 'mainnet', 'ETH', $preferredBaseCurrency)}
	<Loading>
		<img slot="icon" src="/logos/chainlink" alt="Chainlink" width="50">
		Retrieving price...
	</Loading>
{:then rate}
	<section class="card">
		<h3>Current Rate (Chainlink)</h3>
		<TokenRate {rate} quoteToken={'ETH'} baseToken={$preferredBaseCurrency} />
	</section>
{:catch error}
	{console.trace(error)}
{/await} -->

{#if isMounted}
	{#await getCompoundPriceFeed('ETH', $preferredBaseCurrency)}
		<Loading>
			<img slot="icon" src="/logos/chainlink" alt="Chainlink" width="50">
			Retrieving price...
		</Loading>
	{:then rate}
		<section class="card">
			<h3>Current Rate (Chainlink)</h3>
			<TokenRate {rate} quoteToken={'ETH'} baseToken={$preferredBaseCurrency} />
		</section>
	<!-- {:catch error}
		{console.trace(error), error} -->
	{/await}
{/if}