<script lang="ts">
    import type { DefiAppSlug } from '../../../data/ethereum/defi-apps';
	import { getContext } from 'svelte'

	const defiAppSlug = getContext<SvelteStore<DefiAppSlug>>('defiAppSlug')


	import type { Writable } from 'svelte/store'

	const query = getContext<Writable<string>>('query')

	import { goto } from '@sapper/app'
	$: if(globalThis.document && $query)
		goto(`apps/${$defiAppSlug}/${$query}`)

	$: currentQuery = $query


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
	<form on:submit|preventDefault={() => $query = currentQuery}>
		<AddressField bind:address={currentQuery}/>
		<button>Go</button>
	</form>

	<slot />
</section>