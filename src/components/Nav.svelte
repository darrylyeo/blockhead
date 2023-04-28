<script lang="ts">
	import { page } from '$app/stores'


	import EthereumLatestBlockNumber from './EthereumLatestBlockNumber.svelte'


	import { GitcoinIcon } from '../assets/icons'
</script>


<style>
	nav {
		font-size: 1.2em;
		font-weight: 300;
		overflow: auto hidden;
		
		white-space: nowrap;
		word-break: keep-all;
	}
	nav::-webkit-scrollbar {
		display: none;
	}

	ul {
		list-style-type: none;
		display: flex;
		align-items: stretch;
		min-width: min-content;
		gap: 0;
	}
	li {
		display: flex;
	}
	li:not(.right) + li.right {
		margin-left: auto;
	}
	li.right {
		font-size: 0.75em;
		align-items: center;
	}
	li.right a {
		/* padding: 0.33rem 0.66rem; */
		padding: 0.2rem 0.5rem 0;
	}
	/* @media (max-width: 43rem) {
		li.right {
			display: none;
		}
	} */

	a {
		text-decoration: none;
		padding: 0.75rem 1.25rem;
		transition: 0.2s, font-weight 0.2s;
		display: flex;
		align-items: center;
	}

	[aria-current] {
		border-bottom: 2px solid var(--primary-color);
		margin-bottom: -1px;
		font-weight: bold;
	}

	.logo {
		font-size: 1.1em;
		margin: 0 -0.25rem;
	}


	/* span {
		flex: 1;
	}

	.nav-right {
		font-size: 0.75em;
	}
	.nav-right a {
		padding: 0.33rem;
	} */
</style>


<nav class="bar row">
	<ul>
		<li><a aria-current="{$page.url.pathname === '/' ? 'page' : undefined}" href="/"><span class="logo">Blockhead</span></a></li>
		<li><a aria-current="{$page.url.pathname.startsWith('/portfolio') ? 'page' : undefined}" href="/portfolio">Portfolio</a></li>
		<li><a aria-current="{$page.url.pathname.startsWith('/explorer') ? 'page' : undefined}" href="/explorer">Explorer</a></li>
		<li><a aria-current="{$page.url.pathname.startsWith('/apps') ? 'page' : undefined}" href="/apps">Apps</a></li>
		
		<!-- <li><a aria-current="{$page.url.pathname.startsWith('/transfer') ? 'page' : undefined}" href="/transfer">Transfer</a></li> -->
		<!-- <li><a aria-current="{$page.url.pathname.startsWith('/trade') ? 'page' : undefined}" href="/trade">Trade</a></li> -->
		<!-- <li><a aria-current="{$page.url.pathname.startsWith('/invest') ? 'page' : undefined}" href="/invest">Invest</a></li> -->

		<li class="right"><a href="https://bounties.gitcoin.co/grants/2966/blockhead" target="_blank"><button class="medium" style="--primary-color: #00ae84"><img src={GitcoinIcon} width="16" /> Gitcoin Grants</button></a></li>
		<!-- <li class="right"><a href="https://discord.gg/966eXqqq7N" target="_blank">Discord</a></li> -->
		<li class="right"><a href="https://twitter.com/0xBlockhead" target="_blank"><button class="medium" data-before="🐦" style="--primary-color: rgb(29, 155, 240)">Twitter</button></a></li>
		<li class="right"><a href="/#contact" target="_blank"><button class="medium" data-before="💬" style="--primary-color: #627EEA">Feedback</button></a></li>
	</ul>

	<!-- <div class="nav-right row">
		<li><a href="https://gitcoin.co/grants/2966/blockhead" target="_blank">Gitcoin Grants</a></li>
		<li><a href="https://discord.gg/966eXqqq7N" target="_blank">Discord</a></li>
		<li><a href="https://twitter.com/0xBlockhead" target="_blank">Twitter</a></li>
	</div> -->
	<!-- <EthereumLatestBlockNumber /> -->

	<slot name="toolbar" />
</nav>
