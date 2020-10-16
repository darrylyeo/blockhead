<script lang="ts">
	import Nav from '../components/Nav.svelte';

	export let segment: string;
</script>

<style>
	:global(#sapper) {
		display: grid;
		grid:
			"nav" auto
			"main" 1fr;
		place-items: start;
		height: 100vh;
	}
	:global(nav) {
		grid-area: nav;
		position: sticky;
		top: 0;
	}
	:global(main) {
		grid-area: main;
		overflow: auto;
	}
</style>

<Nav {segment}/>

<slot></slot>