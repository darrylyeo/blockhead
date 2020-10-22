<script>
	import { fly } from 'svelte/transition'
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

<main in:fly={{x: 300}} out:fly={{x: -300}}>
	<h1>Trade</h1>

	<p>Looking to explore different assets? Choose your adventure below!</p>

	<div class="card">
		<h2>Market Makers 🚀</h2>
		<p>Name your price and you'll be matched to a buyer or seller.</p>
		<div class="row">
			<div class="card">
				<a href="trade/vega"><button>✨ Vega</button></a>
			</div>
		</div>
	</div>

	<div class="card">
		<h2>Liquidity Pools 🚖</h2>
		<p>Use crowd-sourced funds to hail a ride!</p>
		<div class="row">
			<div class="card">
				<h3>Uniswap 🦄</h3>
				<p>Ethereum Island's crowd-sourced unicorn ride-sharing service</p>
				<a href="trade/uniswap" disabled><button>Coming Soon</button></a>
			</div>
			<div class="card">
				<h3>Balancer ⚖️</h3>
				<a href="trade/balancer" disabled><button>Coming Soon</button></a>
			</div>
		</div>
	</div>

	<div class="card">
		<h2>Express Swap ⚡️</h2>
		<p>Need to swap tokens right away? Let one of these fine travel agencies decide the optimal transport method for you!</p>
		<div class="row">
			<div class="card">
				<h3>1inch 🐴</h3>
				<p>Prices, it'll knock you out.</p>
				<a href="trade/1inch" disabled><button>Coming Soon</button></a>
			</div>
			<!-- <div class="card">
				<h3>Matcha 🍵</h3>
				<a href="trade/matcha"><button>Coming Soon</button></a>
			</div> -->
		</div>
	</div>
</main>