<script lang="ts">
	import { fly } from 'svelte/transition'
</script>

<style>
	main {
		max-width: var(--one-column-width);
	}
</style>

<main in:fly|global={{x: 300}} out:fly|global={{x: -300}}>
<!-- <main> -->
	<h1>Invest</h1>
	<section>
		<a href="/invest/compound" class="button">Compound</a>
		<a href="/invest/yearn" class="button">yEarn</a>
		<a href="/invest/pool-together" class="button">PoolTogether</a>
	</section>
</main>
