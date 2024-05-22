<script lang="ts">
	import { fly } from 'svelte/transition'
	import { expoOut } from 'svelte/easing'
</script>

<style>
	main {
		max-width: var(--one-column-width);
	}
</style>

<main in:fly={{ x: 150, easing: expoOut }} out:fly={{ x: -150, easing: expoOut }}>
	<h1>Invest</h1>
	<section>
		<a href="/invest/compound" class="button">Compound</a>
		<a href="/invest/yearn" class="button">yEarn</a>
		<a href="/invest/pool-together" class="button">PoolTogether</a>
	</section>
</main>
