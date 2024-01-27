<script lang="ts">
	// Metadata
	import { MetaTags } from 'svelte-meta-tags'


	import { web3AppsBySection } from '$/data/web3Apps'


	import TokenIcon from '$/components/TokenIcon.svelte'


	import { cardStyle } from '$/utils/card-background'
	import { fly, scale } from 'svelte/transition'
</script>


<MetaTags {...{
	title: `Apps | Blockhead`,
	description: 'Browse DeFi protocols and web3 apps on Blockhead.',
}} />


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


<div class="column" in:fly|global={{x: 300}} out:fly|global={{x: -300}}>
	<!-- <hr> -->

	<div class="grid">
		{#each web3AppsBySection as {title, apps, isFeatured}, i}
			<section class="column" class:featured={isFeatured}>
				<h2>{title}</h2>

				<div class="content row wrap">
					{#each apps as app, i}
						<a href="/apps/{app.slug}" class="item card" transition:scale|global={{delay: i * 10}} style={cardStyle(app.colors)}>
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
		{/each}
	</div>
</div>
