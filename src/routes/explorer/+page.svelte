<script lang="ts">
	// Metadata
	import { MetaTags } from 'svelte-meta-tags'


	import { networksBySection, getNetworkColor, testnetsForMainnets, isTestnet } from '../../data/networks'


	import { showTestnets } from './_explorerContext'


	import { isTruthy } from '../../utils/isTruthy'


	import NetworkIcon from '../../components/NetworkIcon.svelte'


	import { cardStyle } from '../../utils/card-background'
	import { fly, scale } from 'svelte/transition'
</script>


<MetaTags {...{
	title: 'Explorer',
	titleTemplate: '%s | Blockhead',
	description: 'Explore transactions, blocks, accounts and smart contracts across Ethereum, Polygon, Gnosis Chain, and other EVM chains.',
}} />


<style>
	.column {
		--padding-inner: 1.5rem;
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

	section.featured {
		font-size: 1.15em;
	}
	section:not(.featured) {
		font-size: 0.9em;
	}
	section:not(.featured):after {
		content: '';
		flex: 10000;
	}
</style>


<div class="column" in:fly|global={{x: 300}} out:fly|global={{x: -300}}>
	{#each networksBySection as {title, featuredNetworks, otherNetworks}}
		<hr>

		<h2>{title}</h2>

		{#each
			[
				featuredNetworks && { networks: featuredNetworks, isFeatured: true },
				otherNetworks && { networks: otherNetworks, isFeatured: false }
			].filter(isTruthy)
			as
			{ networks, isFeatured }
		}
			<section class="row wrap" class:featured={isFeatured}>
				{#each
					$showTestnets
						? networks.flatMap(network => [network, ...testnetsForMainnets[network.slug] ?? []])
						: networks.filter(network => !isTestnet(network))
					as
					network, i (network.slug)
				}
					<a
						href="/explorer/{network.slug}"
						class="item card"
						style={cardStyle([getNetworkColor(network)])}
						in:scale|global={{ duration: 300, delay: i * 10 }}
						out:scale={{ duration: 300 }}
					>
						<h3 class="row">
							<NetworkIcon {network} />
							<span>{network.name}</span>
						</h3>
					</a>
				{/each}
			</section>
		{/each}
	{/each}
</div>
