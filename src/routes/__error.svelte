<script context="module" lang="ts">
	export function load({error, status}: { error: Error, status: number }) {
		return {
			props: {
				error,
				status
			}
		};
	}
</script>

<script lang="ts">
	export let status: number
	export let error: Error
	
	
	import { dev } from '$app/env'


	import { fly } from 'svelte/transition'
</script>

<style>
	h1, p {
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	p {
		margin: 1em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>

<svelte:head>
	<title>{status} Error</title>
</svelte:head>

<main in:fly={{x: 300}} out:fly={{x: -300}}>
	<h1>{status} Error</h1>

	<p>{error.message}</p>

	{#if dev && error.stack}
		<pre>{error.stack}</pre>
	{/if}
</main>