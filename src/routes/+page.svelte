<script>
	import { triggerEvent } from '$/events/triggerEvent'


	import Preferences from '$/components/Preferences.svelte'
	import ContactForm from './ContactForm.svelte'


	import { fly, scale, fade } from 'svelte/transition'
	import { expoOut } from 'svelte/easing'
</script>


<style>
	main {
		--is-hovered: 0;
		--is-active: 0;
		--transition: 10s cubic-bezier(0, 1, 0, 1);

		--card-border-radius: 1.5rem;

		max-width: var(--one-column-width);
		text-align: center;
		gap: 5rem;

		min-height: 100vh;
		min-height: 100dvh;
		align-content: center;

		justify-items: center;

		perspective: 1000px;
	}
	main * {
		transform-style: preserve-3d;
	}

	header {
		display: grid;
		gap: var(--padding-inner);
		--padding-inner: 2.5rem;

		justify-content: center;

		cursor: default;
		user-select: none;

		transform: rotateX(0.03turn);
		/* transform-origin: bottom; */
	}

	section {
		padding: 1rem;
		/* transform-origin: top; */
		/* transform: rotateX(0.01turn); */
		transform-origin: bottom;
		gap: 1rem;
	}
	.buttons {
		--padding-inner: 0.75rem;
		transform: rotateX(-0.01turn);
		transform-origin: top;
	}
	/* Firefox Only */
	@supports (-moz-appearance: none) {
		.buttons {
			transform: none !important;
		}
	}
	@media (width < 30rem) {
		.buttons {
			transform: none !important;
		}
	}

	b {
		color: rgba(var(--rgb-light-dark-inverse), 0.8);
		text-shadow:
			0 1px 1px rgba(var(--rgb-light-dark-inverse), 0.15),
			0 0 2.5em rgba(var(--rgb-light-dark-inverse), 0.2);
	}

	#top {
		display: flex;
		flex-direction: column;
		align-items: center;
		min-height: calc(100vh - 10rem);
		gap: 2rem;
		grid-template-rows: auto;
	}
	#top > :first-child {
		margin-top: auto;
	}
	#top > :last-child {
		margin-bottom: auto;
	}


	.logo-wrapper {
		font-size: clamp(2em, calc(1.5em + 5vw), 5em);
		font-weight: 700;

		box-shadow:
			0 0 0 .15em rgba(var(--rgb-light-dark-inverse), calc(0.05 + var(--is-hovered) * 0.1)),
			inset 0 0 calc(0.05em + var(--is-hovered) * 0.15em) rgba(var(--rgb-light-dark-inverse), calc(0.1 + var(--is-hovered) * 0.1)),
			0 0 1em rgba(var(--rgb-light-dark-inverse), calc(0.15 + var(--is-hovered) * 0.1));
		border-radius: 0.3em;
		/* -webkit-background-clip: border-box; */
		/* text-shadow: 0 0 2em rgba(var(--rgb-light-dark-inverse), 0.5);
		text-shadow: 0 0 1em rgba(var(--rgb-light-dark-inverse), 0.15); */
		/* filter: drop-shadow(0 0 1em var(--primary-color), 0 0 1em rgba(var(--rgb-light-dark-inverse), 0.5)); */
		padding: 0 0.44em;
		justify-self: center;
		
		transition: var(--transition);
	}
	.logo-wrapper:hover, b:hover {
		--is-hovered: 1;
	}
	.logo-wrapper:active, b:hover:active {
		--is-hovered: 0;
		--is-active: 1;
		--transition: 0.15s;
	}

	.logo, b {
		--z: calc((1 - var(--is-active)) * 0.1em + var(--is-hovered) * 0.5rem);
		font-size: inherit;
		line-height: 1.3;
		transform: translateZ(var(--z));
		position: relative;
		display: inline-block;
		width: max-content;

		transition:
			color var(--transition),
			transform var(--transition),
			text-shadow var(--transition);
	}
	.logo::after, b::after {
		color: rgba(var(--rgb-light-dark), 0.1);
		content: attr(data-text);
		transform: translateZ(calc(-1 * var(--z)));
		position: absolute;
		left: 0;
		text-shadow: 0 1px 0.05em rgba(var(--rgb-light-dark-inverse), 0.15);

		transition: inherit;
	}
	@supports (-webkit-background-clip: text) {
		.logo {
			background: radial-gradient(rgba(var(--rgb-light-dark-inverse), calc(0.5 + var(--is-hovered) * 0.1)) calc(-20% - var(--is-light) * 100%), var(--primary-color));
			-webkit-background-clip: text;
			-webkit-text-fill-color: #ffffff20;
		}
	}

	.description, h3 {
		text-transform: uppercase;
		font-family: Pally;
		color: rgba(var(--rgb-light-dark-inverse), 0.4);
		letter-spacing: 0.2ch;
	}
	.description.top {
		font-size: 1em;
		letter-spacing: 0.45ch;
		line-height: 1.5;
	}
	.description.bottom {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.2em;
		letter-spacing: 0.35ch;

		font-size: calc(1.33em * 0.8);
	}
	.description.bottom > :nth-child(2) {
		font-size: 0.75em;
	}
	.description.bottom b {
		font-size: calc(1em / 0.75);
	}

	.metaverse {
		background: linear-gradient(-45deg, rgb(17, 230, 230), rgb(153, 32, 233), rgb(236, 167, 18), rgb(90, 199, 132)); 
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.buttons {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	    justify-content: center;
	}

	.columns {
		display: flex;
		align-items: stretch;
		flex-wrap: wrap;
		gap: 1rem;
		color: rgba(var(--rgb-light-dark-inverse), 0.7);
		font-size: 0.98em;
	}
	.columns > .card {
		justify-content: center;
		flex: 1 20rem;

		--padding-outer: 1.25rem;
		--padding-inner: 0.75rem;
	}
	.card:nth-child(3n + 1) {
		/* transform: translateZ(-1em) rotateY(-0.0075turn); */
		transform: translateZ(-1em);
		transform-origin: 80% center;
	}
	.card:nth-child(3n + 2) {
		transform: translateZ(-1em);
	}
	.card:nth-child(3n + 3) {
		/* transform: translateZ(-1em) rotateY(0.0075turn); */
		transform: translateZ(-1em);
		transform-origin: 20% center;
	}
	.card > * {
		transition: var(--transition);
	}
	.card:hover {
		transform: none;
	}
	/* .card:hover > * {
		transform: translateZ(1em);
	} */

	h3 {
		font-size: 1.2em;
	}

	@media (max-width: 56rem) {
		header {
			max-width: 36rem;
			transform: rotateX(0.01turn);
		}

		.description b {
			display: inline;
		}

		.description.top br {
			display: none;
		}

		.description.bottom {
			gap: 1.25rem;
		}

		.description.bottom :nth-child(2) {
			max-width: 35rem;
		}

		.columns .card {
			transform: none;
		}
	}

	button {
		font-size: 1.3em;
	}
	button:before {
		font-size: 1.1em;
	}

	footer {
		color: rgba(var(--rgb-light-dark-inverse), 0.7);
	}

	.learn-more {
		position: sticky;
		top: calc(100% - 1rem);
	}
</style>


<main in:fly={{ x: 150, easing: expoOut }} out:fly={{ x: -150, easing: expoOut }}>
	<section id="top">
		<header>
			<h2 class="description top" in:scale={{delay: 150}}>
				<b>Track</b>,
				<b>visualize</b>
				&
				<b>explore</b>
				<br>
				<!-- the
				<b>blockchain</b>/<b>web 3.0</b>
				<b>metaverse</b> -->
				<!-- <b>blockchains</b> & -->
				the
				<b>decentralized world wide web</b>
				with
			</h2>
			<div
				class="logo-wrapper"
				in:scale={{delay: 200}}
				on:mousedown={(e) => triggerEvent('Home/LogoMousedown')}
			>
				<h1 class="logo" data-text="Blockhead">Blockhead</h1>
			</div>
		</header>

		<section>
			<div class="buttons">
				<a
					href="/portfolio"
					style="--primary-color: var(--ethereum-blue);"
					in:scale={{delay: 800}}
					class="button large row"
					data-before="📊"
				>
					Create Portfolio ›
				</a>

				<a
					href="/explorer"
					style="--primary-color: var(--arbitrum-blue);"
					in:scale={{delay: 850}}
					class="button large row"
					data-before="🧭"
				>
					Explore Blockchains ›
				</a>

				<a
					href="/apps"
					style="--primary-color: var(--gnosis-teal);"
					in:scale={{delay: 900}}
					class="button large row"
					data-before="📲"
				>
					Browse Apps ›
				</a>
			</div>
		</section>

		<footer in:scale={{delay: 1000}}>
			<p><strong>Blockhead</strong> • created by <a href="https://darryl-yeo.com/blockhead">Darryl Yeo</a> • 2020 – 2024</p>
			<!-- <p><small><a href="https://gitcoin.co/grants/2966/blockhead" target="_blank">Gitcoin Grants</a> • <a href="https://discord.gg/966eXqqq7N" target="_blank">Discord</a> • <a href="https://twitter.com/0xBlockhead" target="_blank">Twitter</a></small></p> -->
			<p><small><a href="https://gitcoin.co/grants/2966/blockhead" target="_blank">Gitcoin Grants</a> • <a href="https://warpcast.com/~/channel/blockhead" target="_blank">Farcaster</a> • <a href="https://twitter.com/0xBlockhead" target="_blank">Twitter</a></small></p>
			<br>
			<p><small>Donate: <a href="/explorer/ethereum/blockhead.eth" target="_blank"><output>blockhead.eth</output></a></small></p>
			<!-- <img src="/Blockhead-Logo.svg" alt="Blockhead Logo" width="40" /> -->
		</footer>

		<p class="learn-more card-annotation">
			Learn more
			<br>
			﹀
		</p>
	</section>

	<section>
		<header>
			<p class="description bottom" in:scale={{delay: 250}}>

				<span>
					a
					<b>crypto portfolio</b>,
					<b>DeFi dashboard</b>,
					<b>NFT viewer</b>
					&
					<b>data explorer</b>
				</span>
				<span>
					for
					<b style="color: var(--ethereum-blue)">Ethereum</b>,
					<b style="color: var(--polygon-purple)">Polygon</b>,
					<b style="color: var(--gnosis-teal)">Gnosis Chain</b>,
					<b style="color: var(--arbitrum-blue)">Arbitrum</b>,
					<b style="color: var(--optimism-red)">Optimism</b>,
					<!-- <b style="color: var(--binance-gold)">BSC</b>, -->
					<!-- <b style="color: var(--avalanche-red)">Avalanche</b>, -->
					<b style="color: var(--fantom-blue)">Fantom</b>
					<!-- <b style="color: var(--aurora-green)">Aurora</b>, -->
					<!-- <b style="color: var(--cronos-blue); filter: brightness(1.75)">Cronos</b> -->
					& the
					<b class="metaverse">Web3 Metaverse</b>
					<!-- <b style="color: var(--bitcoin-gold)">EVM Multiverse</b> -->
				</span>
			</p>
		</header>

		<br>

		<div class="columns">
			<div class="card" in:scale={{delay: 350}}>
				<h3><b>Track</b> your crypto</h3>
				<hr>
				<p>See <b>tokens</b>, <b>NFTs</b>, & <b>DeFi balances</b> across your blockchain accounts in one place.</p>
			</div>
			<div class="card" in:scale={{delay: 500}}>
				<h3><b>Visualize</b> your activity</h3>
				<hr>
				<p>Contextualize your web3 interactions with <b>intuitive charts</b> & <b>visualizations</b>.</p>
			</div>
			<div class="card" in:scale={{delay: 400}}>
				<h3><b>Explore</b> the metaverse</h3>
				<hr>
				<p>Discover <b>apps</b>, <b>services</b> & <b>communities</b> enabling <b>portable, shared experiences</b>.</p>
			</div>
			<div class="card" in:scale={{delay: 600}}>
				<h3><b>Unstoppable</b> Web3 Tech</h3>
				<hr>
				<p>Built upon <b>math</b>, <b>cryptography</b> & open, <b>incentive-aligned</b> computer networks.</p>
			</div>
			<div class="card" in:scale={{delay: 450}}>
				<h3><b>You</b> control the data</h3>
				<hr>
				<p><b>Choose which data sources</b> power this user interface in the <b>Preferences</b> below!</p>
			</div>
			<div class="card" in:scale={{delay: 700}}>
				<h3>To <b>Ethereum</b> & Beyond!</h3>
				<hr>
				<!-- <p>Hop between any of the supported <b>Ethereum Virtual Machine</b>-based chains!</p> -->
				<p>Hop between Ethereum & any supported <b>Ethereum Virtual Machine</b>-based chain!</p>
			</div>
		</div>
	</section>

	<section>
		<ContactForm />
	</section>
</main>

<Preferences relevantPreferences={['theme', 'rpcNetwork', 'quoteCurrency']}/>