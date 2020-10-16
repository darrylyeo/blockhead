<script>
	import { fly } from 'svelte/transition'
</script>

<style>
	main {
		max-width: var(--one-column-width);
	}

	header {
		text-align: center;
	}

	h1 {
		font-size: 2.8em;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	p {
		margin: 1em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}

	.row {
		display: flex;
		align-items: stretch;
		/* flex-wrap: wrap; */
	}
	.row > * {
		justify-content: center;
		flex: 1 20rem;
		padding: var(--padding-outer);
	}
</style>

<svelte:head>
	<title>Blockhead Explorers</title>
</svelte:head>

<main in:fly={{x: 300}} out:fly={{x: -300}}>
	<header>
		<p>Welcome to</p>
		<h1>Blockhead Explorers</h1>
		<p>An all-in-one crypto market visualizer, DeFi interface and block explorer metaverse</p>
	</header>

	<section>
		<div class="row">
			<div>
				<h3><strong>Track</strong> your crypto holdings and activity</h3>
				<p>Connect your wallet addresses and keep tabs on your positions, trades, and transactions.</p>
			</div>
			<div>
				<h3><strong>Invest and trade</strong> with smart contracts and DeFi protocols</h3>
				<p>Buy, sell, lend, borrow, stake, and farm through one comprehensive, informative, easy-to-use interface.</p>
			</div>
			<div>
				<h3><strong>Explore</strong> the Blockhead Metaverse</h3>
				<p>Visualize blockchain transactions and statistics like never before within a rich and vibrant virtual world.</p>
			</div>
		</div>
	</section>

	<a href="portfolio"><button>Get Started</button></a>
	<!-- <button>I know what I'm doing</button> -->
</main>