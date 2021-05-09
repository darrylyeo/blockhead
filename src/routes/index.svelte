<script>
	import { fly, scale } from 'svelte/transition'
</script>

<style>
	main {
		max-width: var(--one-column-width);
		text-align: center;
		gap: 3.5rem;

		min-height: 100vh;
		align-content: center;

		justify-items: center;
	}

	header {
		display: grid;
		gap: var(--padding-inner);
		--padding-inner: 1.75rem;
	}

	h1 {
		font-size: clamp(2em, calc(1.5em + 5vw), 5em);
		font-weight: 700;
	}

	h2 {
		line-height: 1.5;
	}
	h2 span {
		text-shadow: 0 0 2.5em;
	}

	.cards {
		display: flex;
		align-items: stretch;
		flex-wrap: wrap;
		gap: var(--padding-inner);
		--padding-inner: 2rem;
	}
	.cards > * {
		justify-content: center;
		flex: 1 20rem;

		display: grid;
		gap: var(--padding-inner);
		--padding-inner: 1rem;
	}

	button {
		font-size: 1.5em;
	}

	footer {
		margin-top: 2rem;
	}

	.logo {
		text-shadow: 0 0 2em white;
	}
	@supports (-webkit-background-clip: text ) {
		.logo {
			background: radial-gradient(currentColor -20%, var(--primary-color));
			-webkit-background-clip: text;
			-webkit-text-fill-color: #ffffff20;
		}
	}

	.buttons {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	    justify-content: center;
	}
</style>

<svelte:head>
	<title>Blockhead</title>
</svelte:head>

<main in:fly={{x: 300}} out:fly={{x: -300}}>
	<header transition:scale>
		<div class="centered">
			<h1 class="logo">Blockhead</h1>
		</div>
		<h2>a cross-chain crypto portfolio and explorer interface<br>for <span style="color: var(--ethereum-blue)">Ethereum</span>, <span style="color: var(--polygon-purple)">Polygon</span>, and the <span style="color: var(--binance-gold)">EVM Multiverse</span></h2>
	</header>

	<section>
		<div class="cards">
			<div class="card" transition:scale={{delay: 100}}>
				<h3><strong>Track</strong> all your crypto holdings</h3>
				<p>Connect your wallets and see your <strong>tokens</strong>, <strong>DeFi balances</strong> and <strong>NFTs</strong> in one place.</p>
			</div>
			<div class="card" transition:scale={{delay: 150}}>
				<h3><strong>Visualize</strong> your crypto activity</h3>
				<p>See your transactions in new ways through <strong>interactive charts</strong> and <strong>visualizations</strong>.</p>
			</div>
			<div class="card" transition:scale={{delay: 200}}>
				<h3><strong>Explore</strong> the Ethereum Multiverse</h3>
				<p>Browse <strong>blockchain transactions</strong> and <strong>statistics</strong> for any EVM compatible chain!</p>
			</div>
		</div>
	</section>

	<div class="buttons">
		<a href="portfolio"><button>Create Your Portfolio</button></a>
		<a href="explorer"><button>Explore Blockchains</button></a>
	</div>
	
	<footer transition:scale>
		<p><strong>Blockhead</strong> • created by <a href="https://darryl-yeo.com/blockhead">Darryl Yeo</a> (darrylyeo.eth) • 2021</p>
	</footer>
</main>