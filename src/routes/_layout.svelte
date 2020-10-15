<script lang="ts">
	import Nav from '../components/Nav.svelte';

	export let segment: string;
</script>

<style>
	main {
		display: grid;
		gap: var(--padding-inner);
		/* justify-content: center; */
		padding: 2rem;

		position: relative;
		max-width: 58em;
		margin: 0 auto;
	}

	main > * {
		padding: var(--padding-outer);
	}
</style>

<Nav {segment}/>

<main>
	<slot></slot>
</main>