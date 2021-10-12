<script lang="ts">
	import { featuredBlockchainApps, notFeaturedBlockchainApps } from '../../data/blockchain-apps'


	import TokenIcon from '../../components/TokenIcon.svelte'
	import { cardStyle } from '../../utils/card-background'
	import { fly, scale } from 'svelte/transition'
</script>



<style>
	.column {
		--padding-inner: 1.5rem;
	}

	/* .featured {
		font-size: 1.2em;
	} */

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
</style>


<div class="column" in:fly={{x: 300}} out:fly={{x: -300}}>
	<hr>

	<h2>Featured Apps</h2>

	<section class="row featured">
		{#each featuredBlockchainApps as {name, slug, colors, views}, i}
			<a href="/apps/{slug}" class="app card" transition:scale={{delay: i * 10}} style={cardStyle(colors)}>
				<h3 class="row">
					{#each views?.flatMap(view => view.erc20Tokens ?? []).slice(0, 1) as {logoURI, address, name, symbol}}
						<TokenIcon
							{name}
							{symbol}
							icon={logoURI}
							tokenAddress={address}
						/>
					{/each}
					<span>{name}</span>
				</h3>
			</a>
		{/each}
	</section>

	<hr>

	<h2>Other Apps</h2>

	<section class="row">
		{#each notFeaturedBlockchainApps as {name, slug, colors, views}, i}
			<a href="/apps/{slug}" class="app card" transition:scale={{delay: i * 10}} style={cardStyle(colors)}>
				<h3 class="row">
					{#each views?.flatMap(view => view.erc20Tokens ?? []).slice(0, 1) as {logoURI, address, name, symbol}}
						<TokenIcon
							{name}
							{symbol}
							icon={logoURI}
							tokenAddress={address}
						/>
					{/each}
					<span>{name}</span>
				</h3>
			</a>
		{/each}
	</section>
</div>