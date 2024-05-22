<script lang="ts">
	import { networksBySection, getNetworkColor, testnetsForMainnets, isTestnet } from '$/data/networks'


	import { showTestnets } from './_explorerContext'


	import { isTruthy } from '$/utils/isTruthy'


	import NetworkIcon from '$/components/NetworkIcon.svelte'
	import SizeContainer from '$/components/SizeContainer.svelte'


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
	{#each networksBySection as {title, featuredNetworks, otherNetworks}, i (title)}
		<section
			class="column"
			transition:scale={{ duration: 300, easing: expoOut }}
			animate:flip={{ duration: 300, easing: expoOut }}
		>
			<h2>{title}</h2>

			{#each
				[
					featuredNetworks && { networks: featuredNetworks, isFeatured: true },
					otherNetworks && { networks: otherNetworks, isFeatured: false }
				].filter(isTruthy)
				as
				{ networks, isFeatured }
			}
				<SizeContainer>
					<div
						class="content row wrap"
						class:featured={isFeatured}
					>
						{#each
							(
								$showTestnets
									? networks.flatMap(network => [network, ...testnetsForMainnets[network.slug] ?? []])
									: networks.filter(network => !isTestnet(network))
							).filter(network => network.chainId)
							as
							network, i (network.slug)
						}
							<a
								href="/explorer/{network.slug}"
								class="item card row"
								style={cardStyle([getNetworkColor(network)])}
								in:scale|global={{ duration: 300, delay: i * 10 }}
								out:scale={{ duration: 300 }}
						>
								<NetworkIcon {network} />
								<span>{network.name}</span>
							</a>
						{/each}
					</div>
				</SizeContainer>
			{/each}
		</section>
	{/each}
</div>


<style>
	.layout {
		display: flex;
		flex-wrap: wrap;
		gap: 1.5rem 2rem;

		> section {
			flex: 1 auto;

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
