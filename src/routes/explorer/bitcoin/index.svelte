<script lang="ts">
	import { getContext, onMount } from 'svelte'
	import { preferredQuoteCurrency, preferredPriceFeedProvider } from '../../../data/ethereum/preferences'
	import { getChainlinkPriceFeed } from '.../../../data/ethereum/price/chainlink'
	
	const provider = getContext('provider')

	$: priceFeedLogo = ({
		'Chainlink': '/logos/chainlink.svg'
	})[$preferredPriceFeedProvider]

	import Loader from '../../../components/Loader.svelte'
	import TokenRate from '../../../components/TokenRate.svelte'
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
		<Loader
			loadingIcon={priceFeedLogo}
			loadingIconName={$preferredPriceFeedProvider}
			loadingMessage="Retrieving price from Chainlink..."
			errorMessage="Error retrieving price from Chainlink"
			fromPromise={() => getChainlinkPriceFeed($provider, 'mainnet', 'BTC', $preferredQuoteCurrency)}
			let:then={priceFeed}
		>
			<TokenRate rate={priceFeed.price} quoteToken={$preferredQuoteCurrency} baseToken="BTC" layout="horizontal" />
			<!-- <p>Updated {priceFeed.updatedAt.toString()} -->
		</Loader>
	</section>
</div>