<script lang="ts">
	import VegaDEX from '$/components/VegaDEX.svelte'
	import { fly } from 'svelte/transition'
	import { expoOut } from 'svelte/easing'
</script>

<style>
	main {
		max-width: var(--one-column-width);
	}
</style>

<main in:fly={{ x: 150, easing: expoOut }} out:fly={{ x: -150, easing: expoOut }}>
	<VegaDEX />
</main>