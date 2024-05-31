<script lang="ts">
	import { page } from '$app/stores'


	import { FarcasterIcon, GitcoinIcon } from '$/assets/icons'
</script>


<nav class="bar row">
	<ul>
		<li><a aria-current="{$page.url.pathname === '/' ? 'page' : undefined}" href="/"><span class="logo">Blockhead</span></a></li>
		<li><a aria-current="{$page.url.pathname.startsWith('/portfolio') ? 'page' : undefined}" href="/portfolio">Portfolio</a></li>
		<li><a aria-current="{$page.url.pathname.startsWith('/explorer') ? 'page' : undefined}" href="/explorer">Explorer</a></li>
		<li><a aria-current="{$page.url.pathname.startsWith('/apps') ? 'page' : undefined}" href="/apps">Apps</a></li>
		
		<!-- <li><a aria-current="{$page.url.pathname.startsWith('/transfer') ? 'page' : undefined}" href="/transfer">Transfer</a></li> -->
		<!-- <li><a aria-current="{$page.url.pathname.startsWith('/trade') ? 'page' : undefined}" href="/trade">Trade</a></li> -->
		<!-- <li><a aria-current="{$page.url.pathname.startsWith('/invest') ? 'page' : undefined}" href="/invest">Invest</a></li> -->

		<!-- <li class="right">
			<a
				href="https://explorer.gitcoin.co/#/round/137/0xa1d52f9b5339792651861329a046dd912761e9a9/0xa1d52f9b5339792651861329a046dd912761e9a9-19"
				target="_blank"
				class="button medium"
				style="--primary-color: #00ae84"
			>
				<img src={GitcoinIcon} width="16" /> Gitcoin Grants
			</a>
		</li> -->
		<li class="right">
			<a
				href="https://warpcast.com/~/channel/blockhead"
				target="_blank"
				class="button medium"
				style="--primary-color: hsl(261.08deg 55.22% 63.59%)"
			>
				<img src={FarcasterIcon} width="16" /> Farcaster
			</a>
		</li>
		<!-- <li class="right">
			<a
				href="https://discord.gg/966eXqqq7N"
				target="_blank"
				class="button medium"
			>
				Discord
			</a>
		</li> -->
		<!-- <li class="right">
			<a
				href="https://twitter.com/0xBlockhead"
				target="_blank"
				class="button medium"
				data-before="🐦"
				style="--primary-color: rgb(29, 155, 240)"
			>
				Twitter
			</a>
		</li> -->
		<li class="right">
			<a
				href="https://twitter.com/0xBlockhead"
				target="_blank"
				class="button medium"
				data-before="𝕏"
				style="--primary-color: #2c4660"
			>
				Twitter
			</a>
		</li>
		<li class="right">
			<a
				href="/#contact"
				target="_blank"
				class="button medium"
				data-before="💬"
				style="--primary-color: #627EEA"
			>
				Feedback
			</a>
		</li>
	</ul>

	<!-- <div class="nav-right row">
		<li><a href="https://gitcoin.co/grants/2966/blockhead" target="_blank">Gitcoin Grants</a></li>
		<li><a href="https://discord.gg/966eXqqq7N" target="_blank">Discord</a></li>
		<li><a href="https://twitter.com/0xBlockhead" target="_blank">Twitter</a></li>
	</div> -->

	<slot name="toolbar" />
</nav>


<style>
	nav {
		overflow: auto hidden;

		font-size: 1.2em;
		font-weight: 300;
		white-space: nowrap;
		word-break: keep-all;

		&::-webkit-scrollbar {
			display: none;
		}

		ul {
			min-width: min-content;
			display: flex;
			align-items: stretch;
			gap: 0;
			list-style-type: none;

			li {
				display: flex;

				&:not(.right) a {
					display: flex;
					padding: 0.75rem 1.25rem;
					align-items: center;

					text-decoration: none;

					transition-duration: 0.2s;
					transition-property:
						color,
						font-weight,
						opacity,
						padding
					;

					@media (width < 37rem) {
						padding: 0.5rem 0.85rem;
					}
				}

				&:not(.right) + .right {
					margin-left: auto;
				}

				&.right {
					/* padding: 0.33rem 0.66rem; */
					padding: 0.2rem 0.5rem 0;
					align-items: center;

					font-size: 0.75em;

					/* @media (max-width: 43rem) {
						display: none;
					} */

					a {
						img {
							width: 1.25em;
						}
					}
				}
			}
		}
	}

	[aria-current] {
		border-bottom: 2px solid var(--primary-color);
		margin-bottom: -1px;
		font-weight: bold;
	}

	.logo {
		display: inline-block;
		margin: 0 -0.25rem;

		font-size: 1.1em;
		background: url('/Blockhead-Logo.svg') no-repeat -100% 0 / 0lh auto;

		transition-duration: 0.3s;
		transition-property:
			background,
			color,
			margin,
			width
		;
		transition-timing-function: var(--ease-out-expo);

		@media (width < 37rem) {
			color: transparent;
			background-position: center;
			background-size: 1lh auto;
			width: 1lh;
			margin-left: -0.85rem;
		}
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
