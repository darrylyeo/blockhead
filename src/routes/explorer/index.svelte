<script lang="ts">
	import { networksBySection, getNetworkColor } from '../../data/ethereum/networks'


	import NetworkIcon from '../../components/NetworkIcon.svelte'


	import { cardStyle } from '../../utils/card-background'
	import { fly, scale } from 'svelte/transition'
</script>


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

	.app {
		text-decoration: none;
	}
	.app:hover {
		transform: scale(1.04);
	}

	.app h3 {
		gap: 0.66em;
	}

	.app span {
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
</style>


<div class="column" in:fly={{x: 300}} out:fly={{x: -300}}>
	{#each networksBySection as {title, networks, isFeatured}, i}
		<hr>

		<h2>{title}</h2>

		<section class="row" class:featured={isFeatured}>
			{#each networks as network, i}
				<a href="/explorer/{network.slug}" class="app card" transition:scale={{delay: i * 10}} style={cardStyle([getNetworkColor(network)])}>
					<h3 class="row">
						<NetworkIcon {network} />
						<span>{network.name}</span>
					</h3>
				</a>
			{/each}
		</section>
	{/each}
</div>