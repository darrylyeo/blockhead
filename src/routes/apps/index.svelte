<script lang="ts">
	import { featuredBlockchainApps, notFeaturedBlockchainApps } from '../../data/blockchain-apps'


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

		/* display: grid;
		grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
		align-items: stretch; */
	}
	.row > * {
		flex: 1 auto;
		text-align: center;
	}
</style>


<div class="column" in:fly={{x: 300}} out:fly={{x: -300}}>
	<hr>

	<h2>Featured Apps</h2>

	<section class="row featured">
		{#each featuredBlockchainApps as {name, slug, colors}, i}
			<div class="card" transition:scale={{delay: i * 10}} style={cardStyle(colors)}>
				<h3><a href="/apps/{slug}">{name}</a></h3>
			</div>
		{/each}
	</section>

	<hr>

	<h2>Other Apps</h2>

	<section class="row">
		{#each notFeaturedBlockchainApps as {name, slug, colors}, i}
			<div class="card" transition:scale={{delay: i * 10}}><!-- style={cardStyle(colors)} -->
				<h4><a href="/apps/{slug}">{name}</a></h4>
			</div>
		{/each}
	</section>
</div>