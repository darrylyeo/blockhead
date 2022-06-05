<script lang="ts">
	import { web3AppsBySection } from '../../data/blockchain-apps'


	import TokenIcon from '../../components/TokenIcon.svelte'


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
</style>


<div class="column" in:fly={{x: 300}} out:fly={{x: -300}}>
	{#each web3AppsBySection as {title, apps, isFeatured}, i}
		<hr>

		<h2>{title}</h2>

		<section class="row" class:featured={isFeatured}>
			{#each apps as app, i}
				<a href="/apps/{app.slug}" class="item card" transition:scale={{delay: i * 10}} style={cardStyle(app.colors)}>
					<h3 class="row">
						{#each app.views?.flatMap(view => view.erc20Tokens ?? []).filter(Boolean).slice(0, 1) as erc20Token}
							<TokenIcon {erc20Token} />
						{/each}
						<span>{app.name}</span>
					</h3>
				</a>
			{/each}
		</section>
	{/each}
</div>
