<script lang="ts">
	import Preferences from '$/components/Preferences.svelte'
	import TransferAssets from '$/components/TransferAssets.svelte'


	import { fly } from 'svelte/transition'
	import { expoOut } from 'svelte/easing'
</script>


<style>
	main {
		max-width: var(--one-column-width);
		gap: 1.25rem;
	}
</style>


<main in:fly={{ x: 150, easing: expoOut }} out:fly={{ x: -150, easing: expoOut }}>
	<h1>Transfer Assets</h1>

	<TransferAssets />
</main>

<Preferences />