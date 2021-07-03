<script lang="ts">
	import { defiApps } from '../../data/ethereum/defi-apps'


	import { scale } from 'svelte/transition'
</script>


<section class="row">
	{#each defiApps as {slug, name}, i}
		<div class="card" transition:scale={{delay: i * 10}}>
			<a href="apps/{slug}"><button>{name}</button></a>
		</div>
	{/each}
</section>