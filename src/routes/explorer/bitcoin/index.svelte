<script lang="ts">
	import { getContext, onMount } from 'svelte'
	import { preferredQuoteCurrency, preferredPriceFeedProvider } from '../../../data/ethereum/preferences'
	import { getChainlinkPriceFeed } from '../../../data/ethereum/price/chainlink'
	
	const provider = getContext('provider')

	$: priceFeedLogo = ({
		'Chainlink': '/logos/chainlink.svg'
	})[$preferredPriceFeedProvider]

	import Loading from '../../../components/Loading.svelte'
	import TokenRate from '../../../components/TokenRate.svelte'
	import { assets } from '$app/paths'
</script>

<style>
	.row {
		display: flex;
		align-items: stretch;
		flex-wrap: wrap;
		gap: var(--padding-inner);
	}
	.row > * {
		flex: 1 20rem;
		padding: var(--padding-outer);
	}

	section :global(.token-rate) {
		font-size: 2em;
	}
</style>

<div class="card">Bitcoin explorer coming soon!</div>

<hr>

<div class="row">
	<section class="card">
		<div class="bar">
			<h3>Current Price</h3>
			<span class="card-annotation">{$preferredPriceFeedProvider}</span>
		</div>
		{#await getChainlinkPriceFeed($provider, 'mainnet', 'BTC', $preferredQuoteCurrency)}
			<Loading iconAnimation="hover">
				<img slot="icon" src={priceFeedLogo} alt={$preferredPriceFeedProvider} width="32">
				Retrieving price...
			</Loading>
		{:then priceFeed}
			<TokenRate rate={priceFeed.price} quoteToken={$preferredQuoteCurrency} baseToken="BTC" layout="horizontal" />
			<!-- <p>Updated {priceFeed.updatedAt.toString()} -->
		{/await}
	</section>
</div>