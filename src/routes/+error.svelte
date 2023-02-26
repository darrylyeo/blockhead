<script lang="ts">
	import { page } from '$app/stores'


	$: console.error($page.error)


	import { fly } from 'svelte/transition'
	import Preferences from '../components/Preferences.svelte'
</script>


<style>
	main {
		max-width: var(--one-column-width);
		grid-template-columns: 100%;
	}
</style>


<svelte:head>
	<title>{$page.status} Error</title>
</svelte:head>


<main in:fly={{x: 300}} out:fly={{x: -300}}>
	<section class="card">
		<div class="bar">
			<h3>Whoops! Something went wrong loading the page.</h3>
			<span class="card-annotation">{$page.status} Error</span>
		</div>

		<hr>

		<div class="bar">
			{#if $page.error}
				<pre>{$page.error.message}</pre>

				{#if $page.error.stack}
					<details>
						<summary>Stack Trace</summary>
						<pre>{$page.error.stack}</pre>
					</details>
				{/if}
			{:else}
				<span />
			{/if}

			<a href="./"><button class="small" data-before="↻" on:click={() => globalThis.navigation.reload()}>Reload</button></a>
		</div>
	</section>
</main>

<Preferences isShowingAll />
