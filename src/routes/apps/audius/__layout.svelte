<script lang="ts">
	import { page } from '$app/stores'
	import { goto } from '$app/navigation'


	const { query } = $page.params


	$: currentQuery = query


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
	<form on:submit|preventDefault={() => goto(`/apps/audius${currentQuery ? `/search/${currentQuery}` : ''}`, {keepfocus: true})}>
		<AddressField bind:address={currentQuery} placeholder="Search Audius tracks, artists, and playlists..." />
		<button>Go</button>
	</form>


	<slot />
</section>