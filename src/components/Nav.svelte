<script lang="ts">
	// Context
	import { page } from '$app/stores'


	// Internal state
	let isOpen = false


	// Components
	import { FarcasterIcon, GitcoinIcon } from '$/assets/icons'
	import CollapsibleToolbar from './CollapsibleToolbar.svelte'
</script>


<nav>
	<CollapsibleToolbar
		type="label"
		breakpointWidth="30rem"
		contentRightClass="nav-content-right row"
		bind:isOpen
		contentClass="row {isOpen ? 'wrap' : ''}"
	>
		<svelte:fragment slot="title">
			<ul>
				<li><a aria-current="{$page.url.pathname === '/' ? 'page' : undefined}" href="/"><span class="logo">Blockhead</span></a></li>
				<li><a aria-current="{$page.url.pathname.startsWith('/portfolio') ? 'page' : undefined}" href="/portfolio">Portfolio</a></li>
				<li><a aria-current="{$page.url.pathname.startsWith('/explorer') ? 'page' : undefined}" href="/explorer">Explorer</a></li>
				<li><a aria-current="{$page.url.pathname.startsWith('/apps') ? 'page' : undefined}" href="/apps">Apps</a></li>

				<!-- <li><a aria-current="{$page.url.pathname.startsWith('/transfer') ? 'page' : undefined}" href="/transfer">Transfer</a></li> -->
				<!-- <li><a aria-current="{$page.url.pathname.startsWith('/trade') ? 'page' : undefined}" href="/trade">Trade</a></li> -->
				<!-- <li><a aria-current="{$page.url.pathname.startsWith('/invest') ? 'page' : undefined}" href="/invest">Invest</a></li> -->
			</ul>
		</svelte:fragment>

		<ul class="right">
			<!-- <li>
				<a
					href="https://explorer.gitcoin.co/#/round/137/0xa1d52f9b5339792651861329a046dd912761e9a9/0xa1d52f9b5339792651861329a046dd912761e9a9-19"
					target="_blank"
					class="button medium"
					style="--primary-color: #00ae84"
				>
					<img src={GitcoinIcon} width="16" /> Gitcoin Grants
				</a>
			</li> -->
			<li>
				<a
					href="https://warpcast.com/~/channel/blockhead"
					target="_blank"
					class="button medium"
					style="--primary-color: hsl(261.08deg 55.22% 63.59%)"
				>
					<img src={FarcasterIcon} /> Farcaster
				</a>
			</li>
			<!-- <li>
				<a
					href="https://discord.gg/966eXqqq7N"
					target="_blank"
					class="button medium"
				>
					Discord
				</a>
			</li> -->
			<!-- <li>
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
			<li>
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
			<!-- <li>
				<a
					href="/#contact"
					target="_blank"
					class="button medium"
					data-before="💬"
					style="--primary-color: #627EEA"
				>
					Feedback
				</a>
			</li> -->

			<!-- <div class="nav-right row">
				<li><a href="https://gitcoin.co/grants/2966/blockhead" target="_blank">Gitcoin Grants</a></li>
				<li><a href="https://discord.gg/966eXqqq7N" target="_blank">Discord</a></li>
				<li><a href="https://twitter.com/0xBlockhead" target="_blank">Twitter</a></li>
			</div> -->
		</ul>

		<svelte:fragment slot="header-right">
			<slot name="header-right" />
		</svelte:fragment>

		<svelte:fragment slot="trigger-text">
			<slot name="trigger-text">
				Ⲷ
				<!-- ☰ -->
			</slot>
		</svelte:fragment>
	</CollapsibleToolbar>
</nav>


<style>
	nav {
		overflow: auto hidden;

		font-size: 1.2em;
		font-weight: 300;
		white-space: nowrap;
		word-break: keep-all;

		transition-property:
			padding
		;

		@media (width < 37rem) {
			padding-inline: 0.75em;
		}

		&::-webkit-scrollbar {
			display: none;
		}

		ul {
			min-width: min-content;
			display: flex;
			justify-content: safe start;
			align-items: stretch;
			gap: 0;
			list-style-type: none;

			li {
				display: flex;
			}
			
			&:not(.right) {
				li {
					a {
						position: relative;
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

						&[aria-current]:after {
							content: '';
							z-index: -1;
							position: absolute;
							inset: auto 0 0 0;
							height: 1px;
							background-color: var(--primary-color);
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
						}
					}
				}
			}

			&.right {
				padding-block: 0.4em;

				li {
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

		@media (width < 37rem) {
			padding-inline-start: 0.25em;

			ul {
				&:not(.right) {
					li {
						a {
							padding: 0.5rem 0.75rem;

							&[aria-current]:after {
								inset-inline: 0.25rem;
							}

							.logo {
								color: transparent;
								text-shadow: none;
								background-position: center;
								background-size: 1lh auto;
								width: 1lh;
							}
						}
					}
				}
			}
		}

		:global(.nav-content-right) {
			position: sticky;
			right: 0;
			min-width: auto;
			backdrop-filter: var(--overlay-backdrop-filter);
		}
		:global(.nav-content-right:after) {
			content: '';
			z-index: -1;
			position: absolute;
			inset: -1rem;
			background: linear-gradient(to right, rgba(var(--rgb-light-dark), 0), rgba(var(--rgb-light-dark), calc(0.925 - 0.2 * var(--is-light))) 1rem);
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
