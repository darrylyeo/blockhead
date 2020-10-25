<script>
	import { fly } from 'svelte/transition'
</script>

<style>
	main {
		max-width: var(--one-column-width);
		text-align: center;
		--padding-inner: 3.5rem;
	}

	header {
		display: grid;
		gap: var(--padding-inner);
		--padding-inner: 1.75rem;
	}

	h1 {
		font-size: 3em;
		font-weight: 700;
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
		gap: var(--padding-inner);
		--padding-inner: 2rem;
	}
	.row > * {
		justify-content: center;
		flex: 1 20rem;

		display: grid;
		gap: var(--padding-inner);
		--padding-inner: 1rem;
	}

	button {
		font-size: 1.5em;
	}
</style>

<svelte:head>
	<title>Blockhead</title>
</svelte:head>

<main in:fly={{x: 300}} out:fly={{x: -300}}>
	<header>
		<!-- <p>Welcome to</p> -->
		<h1 class="logo">Blockhead</h1>
		<!-- <h2>is a decentralized crypto market visualizer,<br>DeFi interface and block explorer metaverse</h2> -->
		<h2>is a decentralized wallet manager, trading interface,<br>and blockchain explorer metaverse</h2>
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