<script lang="ts">
	// Constants/types
	import { web3AppsBySection } from '$/data/web3Apps'


	// Context
	import { network } from '../_appsContext'


	// Internal state
	// (Derived)
	$: displayedWeb3AppsBySection =
		$network
			? web3AppsBySection
				.map(section => ({
					...section,
					apps: section.apps.filter(app => (
						app.views.some(view => view.chainId === $network?.chainId)
					)),
				}))
				.filter(section => section.apps.length)
			: web3AppsBySection


	// Functions
	import { resolveRoute } from '$app/paths'


	// Components
	import TokenIcon from '$/components/TokenIcon.svelte'


	// Styles/transitions
	import { cardStyle } from '$/utils/card-background'
	import { fly, scale } from 'svelte/transition'
	import { flip } from 'svelte/animate'
	import { expoOut } from 'svelte/easing'
</script>


<style>
	.grid {
		gap: 1.5rem 2rem;
		display: flex;
		flex-wrap: wrap;
	}
	.grid > * {
		flex: 1 auto;
	}

	.row {
		align-content: start;
		--padding-inner: 1rem;
	}
	.row > * {
		flex: 1 auto;
		text-align: center;
		justify-content: center;
	}

	.item {
		text-decoration: none;
	}
	.item:hover {
		transform: scale(1.04);
	}

	.item h3 {
		gap: 0.66em;
	}

	.item span {
		color: rgba(var(--rgb-light-dark-inverse), calc(0.6 + 0.3 * var(--is-dark)));
		text-shadow: 0 0 0 var(--primary-color);
		opacity: calc(0.75 + 0.25 * var(--is-dark));
	}

	section {
		padding-top: 1.5rem;
		position: relative;
		gap: 1rem;
	}
	section:before {
		content: '';
		position: absolute;
		top: 0;
		width: 100%;

		background: none;
		border: none;
		border-top: currentColor 1px solid;
		opacity: 0.2;
	}

	section.featured .content {
		gap: 1.5rem;
		font-size: 1.15em;
	}
	section:not(.featured) .content {
		font-size: 0.9em;
	}
	section:not(.featured) .content:after {
		flex: 10000;
	}
</style>


<div
	class="column"
	in:fly|global={{x: 300}}
	out:fly|global={{x: -300}}
>
	<div class="grid">
		{#each displayedWeb3AppsBySection as {title, apps, isFeatured}, i(title)}
			<section
				class="column"
				class:featured={isFeatured}
				transition:scale={{ duration: 300, easing: expoOut }}
				animate:flip={{ duration: 300, easing: expoOut }}
			>
				<h2>{title}</h2>

				<div class="content row wrap">
					{#each apps as app, i}
						<a
							href={
								$network
									? resolveRoute(`/apps/[web3AppSlug]/network/[networkSlug]`, { web3AppSlug: app.slug, networkSlug: $network.slug })
									: resolveRoute(`/apps/[web3AppSlug]`, { web3AppSlug: app.slug })
							}
							class="item card"
							in:scale={{ delay: i * 10, duration: 300 }}
							out:scale
							style={cardStyle(app.colors)}
						>
							<h3 class="row">
								{#if app.icon}
									<img src={app.icon} alt={app.name} width={24} />
								{:else}
									{#each app.views?.flatMap(view => view.erc20Tokens ?? []).filter(Boolean).slice(0, 1) as erc20Token}
										<TokenIcon {erc20Token} />
									{/each}
								{/if}

								<span>{app.name}</span>
							</h3>
						</a>
					{/each}
				</div>
			</section>
		{:else}
			<section
				class="column"
				transition:scale={{ duration: 300, easing: expoOut }}
			>
				<div class="card bar wrap">
					<p class="faded">No apps to show{$network ? ` for ${$network.name}` : ''} yet!</p>

					<a
						href="/#contact"
						target="_blank"
						class="button medium"
					>
						Feedback ›
					</a>
				</div>
			</section>
		{/each}
	</div>
</div>
