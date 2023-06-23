<script lang="ts">
	import Preferences from '../../components/Preferences.svelte'
	import TransferAssets from '../../components/TransferAssets.svelte'


	import { fly } from 'svelte/transition'
</script>


<style>
	main {
		max-width: var(--one-column-width);
		gap: 1.25rem;
	}
</style>


<main in:fly|global={{x: 300}} out:fly|global={{x: -300}}>
<!-- <main> -->
	<h1>Transfer Assets</h1>

	<TransferAssets />
</main>

<Preferences />