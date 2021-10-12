<script lang="ts">
	import { getContext } from 'svelte'
	import type { Writable } from 'svelte/store'

	const addressOrENSName = getContext<Writable<string>>('addressOrENSName')


	$: currentQuery = $addressOrENSName


	import AddressField from '../../../components/AddressField.svelte'


	import { fly } from 'svelte/transition'
</script>


<style>
	form {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: var(--padding-inner);
		align-items: center;
	}
</style>


<section class="column" in:fly={{x: 100}} out:fly={{x: -100}}>
	<form on:submit|preventDefault={() => $addressOrENSName = currentQuery}>
		<AddressField bind:address={currentQuery}/>
		<button>Go</button>
	</form>

	<slot />
</section>