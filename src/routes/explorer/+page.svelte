<script lang="ts">
	// Types/constants
	import { networksBySection, getNetworkColor, mainnetForTestnet, testnetsForMainnet, isTestnet } from '$/data/networks'


	// Context
	import { explorerContext } from './_explorerContext.svelte'


	// Functions
	import { isTruthy } from '$/utils/isTruthy'


	// Internal state
	let watchBlockHeights: Record<string, boolean> = {}
	let showTimeline: Record<string, boolean> = {}


	// COmponents
	import Collapsible from '$/components/Collapsible.svelte'
	import EthereumLatestBlockNumber from '$/components/EthereumLatestBlockNumber.svelte'
	import NetworkIcon from '$/components/NetworkIcon.svelte'
	import NetworksTimeline from '$/components/NetworksTimeline.svelte'
	import SizeContainer from '$/components/SizeContainer.svelte'


	// Transitions/animations
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
	{#each networksBySection as { title, featuredNetworks, otherNetworks, isCollapsible }, i (title)}
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

				<svelte:fragment slot="toolbar-items">
					<label>
						<input
							type="checkbox"
							bind:checked={watchBlockHeights[i]}
						/>

						<span>Block Heights</span>
					</label>

					{#if watchBlockHeights[i]}
						<label>
							<input
								type="checkbox"
								bind:checked={showTimeline[i]}
							/>

							<span>Timeline</span>
						</label>
					{/if}
				</svelte:fragment>

				{#each
					[
						featuredNetworks && { networks: featuredNetworks, isFeatured: true },
						otherNetworks && { networks: otherNetworks, isFeatured: false }
					].filter(isTruthy)
					as
					{ networks, isFeatured }
				}
					{@const shownNetworks = (
						(
							explorerContext.showTestnets
								? networks
									.filter(network => isTestnet(network) ? !mainnetForTestnet.has(network.slug) : true)
									.flatMap(network => [network, ...testnetsForMainnet.get(network.slug) ?? []])
								: networks
									.filter(network => !isTestnet(network))
						).filter(network => network?.chainId)
					)}

					<SizeContainer>
						<div class="column">
							{#if showTimeline[i]}
								<NetworksTimeline
									networks={shownNetworks}
								/>
							{/if}

							<div
								class="content row wrap"
								class:featured={isFeatured}
							>
								{#each shownNetworks as network, j (network.slug)}
									<a
										href="/explorer/{network.slug}"
										class="item card row"
										style={cardStyle([getNetworkColor(network)])}
										in:scale={{ delay: j * 10, duration: 300 }}
										out:scale={{ duration: 200 }}
								>
										<NetworkIcon {network} />
										<span>{network.name}</span>

										{#if watchBlockHeights[i]}
											<EthereumLatestBlockNumber
												{network}
											/>
										{/if}
									</a>
								{/each}
							</div>
						</div>
					</SizeContainer>
				{/each}
			</Collapsible>
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
