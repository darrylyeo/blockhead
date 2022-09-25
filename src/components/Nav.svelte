<script lang="ts">
	import { page } from '$app/stores'


	import EthereumLatestBlockNumber from './EthereumLatestBlockNumber.svelte'
</script>


<style>
	nav {
		font-size: 1.2em;
		font-weight: 300;
		overflow: auto hidden;
	}

	ul {
		list-style-type: none;
		display: flex;
		align-items: stretch;
	}
	li {
		display: flex;
	}
	li:not(.right) + li.right {
		margin-left: auto;
	}
	li.right {
		font-size: 0.75em;
	}
	li.right a {
		padding: 0.33rem;
	}
	@media (max-width: 43rem) {
		li.right {
			display: none;
		}
	}

	a {
		text-decoration: none;
		padding: 0.75rem;
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


<nav class="bar">
	<ul>
		<li><a aria-current="{$page.url.pathname === '/' ? 'page' : undefined}" href="/"><span class="logo">Blockhead</span></a></li>
		<li><a aria-current="{$page.url.pathname.startsWith('/portfolio') ? 'page' : undefined}" href="/portfolio">Portfolio</a></li>
		<li><a aria-current="{$page.url.pathname.startsWith('/explorer') ? 'page' : undefined}" href="/explorer">Explorer</a></li>
		<li><a aria-current="{$page.url.pathname.startsWith('/apps') ? 'page' : undefined}" href="/apps">Apps</a></li>
		
		<!-- <li><a aria-current="{$page.url.pathname.startsWith('/transfer') ? 'page' : undefined}" href="/transfer">Transfer</a></li> -->
		<!-- <li><a aria-current="{$page.url.pathname.startsWith('/trade') ? 'page' : undefined}" href="/trade">Trade</a></li> -->
		<!-- <li><a aria-current="{$page.url.pathname.startsWith('/invest') ? 'page' : undefined}" href="/invest">Invest</a></li> -->

		<li class="right"><a href="https://gitcoin.co/grants/2966/blockhead" target="_blank">Gitcoin Grants</a></li>
		<li class="right"><a href="https://discord.gg/966eXqqq7N" target="_blank">Discord</a></li>
		<li class="right"><a href="https://twitter.com/0xblockhead" target="_blank">Twitter</a></li>
	</ul>

	<!-- <div class="nav-right row">
		<li><a href="https://gitcoin.co/grants/2966/blockhead" target="_blank">Gitcoin Grants</a></li>
		<li><a href="https://discord.gg/966eXqqq7N" target="_blank">Discord</a></li>
		<li><a href="https://twitter.com/0xblockhead" target="_blank">Twitter</a></li>
	</div> -->
	<!-- <EthereumLatestBlockNumber /> -->
</nav>
