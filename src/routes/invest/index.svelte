<script lang="ts">
	import { fly } from 'svelte/transition'
</script>

<style>
	main {
		max-width: var(--one-column-width);
	}
</style>

<main in:fly={{x: 100}} out:fly={{x: -100}}>
	<h1>Invest</h1>
	<section>
		<a href="invest/compound"><button>Compound</button></a>
		<a href="invest/yearn"><button>yEarn</button></a>
		<a href="invest/pool-together"><button>PoolTogether</button></a>
	</section>
</main>