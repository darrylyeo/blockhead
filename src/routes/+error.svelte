<script lang="ts">
	import { page } from '$app/stores'
	import { dev } from '$app/environment'


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
	<title>{$page.status} Error</title>
</svelte:head>


<main in:fly={{x: 300}} out:fly={{x: -300}}>
<!-- <main> -->
	<h1>{$page.status} Error</h1>

	<p>{$page.error.message}</p>

	{#if dev && $page.error.stack}
		<pre>{$page.error.stack}</pre>
	{/if}
</main>
