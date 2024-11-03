<script lang="ts">
	// Constants/types
	import { web3AppsBySection } from '$/data/web3Apps'


	// Context
	import { appsContext } from '../_appsContext.svelte'


	// Internal state
	// (Derived)
	const displayedWeb3AppsBySection = $derived(
		appsContext.network
			? web3AppsBySection
				.map(section => ({
					...section,
					apps: section.apps.filter(app => (
						app.views.some(view => view.chainId === appsContext.network?.chainId)
					)),
				}))
				.filter(section => section.apps.length)
			: web3AppsBySection
	)


	// Functions
	import { resolveRoute } from '$app/paths'


	// Components
	import Collapsible from '$/components/Collapsible.svelte'
	import Icon from '$/components/Icon.svelte'
	import TokenIcon from '$/components/TokenIcon.svelte'


	// Styles/transitions
	import { cardStyle } from '$/utils/card-background'
	import { fly, scale } from 'svelte/transition'
	import { flip } from 'svelte/animate'
	import { expoOut } from 'svelte/easing'
</script>


<div
	class="layout"
	in:fly={{ x: 150, easing: expoOut }}
	out:fly={{ x: -150, easing: expoOut }}
>
	{#each displayedWeb3AppsBySection as { title, apps, isFeatured, isCollapsible }, i(title)}
		<section
			class="column"
			class:full={isCollapsible}
			in:fly|global={{ y: 30, delay: i * 50, duration: 300, easing: expoOut }}
			animate:flip={{ duration: 300, easing: expoOut }}
		>
			<Collapsible
				type="label"
				isOpen={!isCollapsible}
				canToggle={Boolean(isCollapsible)}
				class="column"
			>
				<svelte:fragment slot="title">
					<h2>{title}</h2>
				</svelte:fragment>

				<div
					class="content row wrap"
					class:featured={isFeatured}
				>
					{#each apps as app, i}
						<a
							href={
								appsContext.network
									? resolveRoute(`/apps/[web3AppSlug]/network/[networkSlug]`, { web3AppSlug: app.slug, networkSlug: appsContext.network.slug })
									: resolveRoute(`/apps/[web3AppSlug]`, { web3AppSlug: app.slug })
							}
							class="item card row"
							in:scale={{ delay: i * 10, duration: 300 }}
							out:scale={{ duration: 200 }}
							style={cardStyle(app.colors)}
						>
							{#if app.icon}
								<Icon imageSources={[app.icon]} title={app.name} />
							{:else}
								{#each app.views?.flatMap(view => view.erc20Tokens ?? []).filter(Boolean).slice(0, 1) as token}
									<TokenIcon
										{token}
									/>
								{/each}
							{/if}

							<span>{app.name}</span>
						</a>
					{/each}
				</div>
			</Collapsible>
		</section>
	{:else}
		<section
			class="column"
			transition:scale={{ duration: 300, easing: expoOut }}
		>
			<div class="card bar wrap">
				<p class="faded">No apps to show{appsContext.network ? ` for ${appsContext.network.name}` : ''} yet!</p>

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


<style>
	.layout {
		display: flex;
		align-content: start;
		flex-wrap: wrap;
		gap: 1.5rem 2rem;

		> section {
			flex: 1 auto;

			&.full {
				width: 100%;
			}

			position: relative;
			align-content: start;
			gap: 1rem;
			padding-top: 1.5rem;

			&:before {
				content: '';
				position: absolute;
				top: 0;
				width: 100%;

				background: none;
				border: none;
				border-top: currentColor 1px solid;
				opacity: 0.2;
			}

			.content {
				gap: 1rem;

				&.featured {
					font-size: 1.15em;
				}

				&:not(.featured) {
					font-size: 0.9em;

					&:after {
						content: '';
						flex: 10000;
					}
				}

				@media (20rem < width < 41rem) {
					&:after {
						content: '';
						flex: 10000;
					}
				}

				.item {
					flex: 1 auto;

					justify-content: center;
					padding: 1rem 1.125rem;
					gap: 0.66em;

					font-size: 1.17em;
					font-weight: 600;
					line-height: 1.2;
					text-align: center;

					transition-duration: 0.2s;
					transition-timing-function: ease-in-out;
					transition-property:
						background,
						color,
						opacity,
						scale
					;

					&:hover {
						scale: 1.04;
					}

					span {
						color: rgba(var(--rgb-light-dark-inverse), calc(0.6 + 0.3 * var(--is-dark)));
						text-shadow: 0 0 0 var(--primary-color);
						opacity: calc(0.75 + 0.25 * var(--is-dark));
					}
				}
			}
		}
	}
</style>
