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
	}
	:global(nav) {
		grid-area: nav;
		position: sticky;
		width: 100%;
		top: 0;
		z-index: 1;
	}
	:global(main) {
		grid-area: main;
		overflow: auto;
	}
</style>

<Nav {segment}/>

<slot></slot>