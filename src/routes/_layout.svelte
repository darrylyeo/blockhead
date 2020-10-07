<script lang="ts">
	import Nav from '../components/Nav.svelte';

	export let segment: string;
</script>

<style>
	main {
		position: relative;
		max-width: 58em;
		padding: 2em;
		margin: 0 auto;

		display: grid;
		gap: var(--padding-inner);
	}

	main > * {
		padding: var(--padding-outer);
	}
</style>

<Nav {segment}/>

<main>
	<slot></slot>
</main>