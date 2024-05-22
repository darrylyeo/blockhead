<script>
	import { fly } from 'svelte/transition'
	import { expoOut } from 'svelte/easing'
</script>

<style>
	main {
		max-width: var(--one-column-width);
		gap: 1.25rem;
	}

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
</style>

<main in:fly={{ x: 150, easing: expoOut }} out:fly={{ x: -150, easing: expoOut }}>
	<h1>Trade</h1>

	<p>Looking to explore different assets? Choose your adventure below!</p>

	<div class="card">
		<h2>Order Matching 🚀</h2>
		<p>Name your price and you'll be matched to a buyer or seller in the market.</p>
		<div class="row">
			<div class="card">
				<h3>Vega ✨</h3>
				<p>Trade derivatives on a fully automated decentralized network.</p>
				<a href="/trade/vega" class="button">Trade</button></a>
			</div>
		</div>
	</div>

	<div class="card">
		<h2>Liquidity Pools 🚖</h2>
		<p>Use crowd-sourced funds from liquidity providers to hitch a ride!</p>
		<div class="row">
			<div class="card">
				<h3>Uniswap 🦄</h3>
				<p>Travel between ERC-20 assets with this popular unicorn ride-sharing service.</p>
				<a href="/trade/uniswap" disabled class="button">Coming Soon</button></a>
			</div>
			<div class="card">
				<h3>Balancer ⚖️</h3>
				<p>Get the lowest price by helping other investors balance their portfolios.</p>
				<a href="/trade/balancer" disabled class="button">Coming Soon</button></a>
			</div>
		</div>
	</div>

	<div class="card">
		<h2>Express Swap ⚡️</h2>
		<p>Need to swap tokens right away? Let one of these fine travel agencies decide the optimal transport method for you!</p>
		<div class="row">
			<div class="card">
				<h3>1inch 🥊</h3>
				<p>Distribute your trade across many exchanges in one swift, efficient blow!</p>
				<a href="/trade/1inch" disabled class="button">Coming Soon</button></a>
			</div>
			<!-- <div class="card">
				<h3>Matcha 🍵</h3>
				<a href="/trade/matcha" class="button">Coming Soon</button></a>
			</div> -->
		</div>
	</div>
</main>