<script lang="ts">
	import { featuredDefiApps, notFeaturedDefiApps } from '../../data/ethereum/defi-apps'


	import { goto } from '@sapper/app'


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
		{#each featuredDefiApps as {name, slug, colors}, i}
			<div class="card" transition:scale={{delay: i * 10}} style={cardStyle(colors)}>
				<h3><a href="/apps/{slug}" on:click={() => globalThis.requestAnimationFrame(() => goto(`apps/${slug}`))}>{name}</a></h3>
			</div>
		{/each}
	</section>

	<hr>

	<h2>Other Apps</h2>

	<section class="row">
		{#each notFeaturedDefiApps as {name, slug, colors}, i}
			<div class="card" transition:scale={{delay: i * 10}}><!-- style={cardStyle(colors)} -->
				<h4><a href="/apps/{slug}" on:click={() => globalThis.requestAnimationFrame(() => goto(`apps/${slug}`))}>{name}</a></h4>
			</div>
		{/each}
	</section>
</div>