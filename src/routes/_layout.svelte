<script context="module">
	import { env } from '../config-secrets'
		
	// https://github.com/sveltejs/sapper/issues/122#issuecomment-619770615
	export async function preload({params}, session){
		if(session.env)
			Object.assign(env, session.env)
	}
</script>

<script lang="ts">
	import Nav from '../components/Nav.svelte'

	export let segment: string
</script>

<style>
	/* Grid-based */
	/* :global(#sapper) {
		display: grid;
		grid:
			"nav" auto
			"main" 1fr
			"preferences" auto;
		place-items: start;
		min-height: 100vh;
	}

	:global(nav) {
		grid-area: nav;
		position: sticky;
		width: 100%;
		top: 0;
		z-index: 1;

		-webkit-backdrop-filter: var(--overlay-backdrop-filter);
		backdrop-filter: var(--overlay-backdrop-filter);
		border-bottom: 1px solid rgba(0, 0, 0, 0.2);
		padding: 0 var(--padding-outer);
	}

	:global(main) {
		grid-area: main;
	}

	:global(.preferences) {
		grid-area: preferences;
		position: sticky;
		width: 100%;
		bottom: 0;
		z-index: 1;

		-webkit-backdrop-filter: var(--overlay-backdrop-filter);
		backdrop-filter: var(--overlay-backdrop-filter);
		border-top: 1px solid rgba(0, 0, 0, 0.2);
		--padding-outer: 1em;
		padding: var(--padding-outer);
	} */


	/* Experimental: make <main> the scrolling element to enable inner position: sticky elements */
	/* :global(#sapper) {
		height: 100vh;
	} */
	/* :global(#sapper main) {
		overflow-y: auto;
		height: 100vh;
		grid-area: 1 / 1 / 3 / 1;
	} */
	/* :global(#sapper main) {
		overflow-y: auto;
		--bleed: 3rem;
		margin: calc(-1 * var(--bleed)) 0;
		padding: calc(var(--bleed) + var(--padding-outer)) var(--padding-outer);
	} */


	/* Fixed layout (supports inner position: sticky elements) */
	:global(nav) {
		position: fixed;
		width: 100%;
		top: 0;
		z-index: 1;
	}

	:global(main) {
		--bleed-top: 3.5rem;
		--bleed-bottom: 3.25rem;
		align-content: start;
		padding: calc(var(--bleed-top) + var(--padding-outer)) var(--padding-outer) calc(var(--bleed-bottom) + var(--padding-outer));
	}

	:global(.preferences) {
		position: fixed;
		width: 100%;
		bottom: 0;
		z-index: 1;
	}



	:global(nav) {
		-webkit-backdrop-filter: var(--overlay-backdrop-filter);
		backdrop-filter: var(--overlay-backdrop-filter);
		border-bottom: 1px solid rgba(0, 0, 0, 0.2);
		padding: 0 var(--padding-outer);
	}
	:global(.preferences) {
		-webkit-backdrop-filter: var(--overlay-backdrop-filter);
		backdrop-filter: var(--overlay-backdrop-filter);
		border-top: 1px solid rgba(0, 0, 0, 0.2);
		--padding-outer: 1em;
		padding: var(--padding-outer);
	}
</style>

<Nav {segment}/>

<slot></slot>
