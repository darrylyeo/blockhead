<script lang="ts">
	import VegaDEX from '../../components/VegaDEX.svelte'
	import { fly } from 'svelte/transition'
</script>

<style>
	main {
		max-width: var(--one-column-width);
	}
</style>

<main in:fly={{x: 300}} out:fly={{x: -300}}>
	<VegaDEX />
</main>