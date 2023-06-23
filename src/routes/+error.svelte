<script lang="ts">
	import { page } from '$app/stores'

	$: console.error($page.error)


	import { browser } from '$app/environment'

	let previousEntry: NavigationHistoryEntry

	$: if(browser)
		previousEntry = globalThis.navigation?.entries().findLast(entry => entry.url !== globalThis.navigation.currentEntry.url)

	const goBack = async (e: Event) => {
		if(globalThis.navigation){
			if(previousEntry){
				// try {
				// 	await globalThis.navigation.traverseTo(previousEntry.key).finished
				// 	return e.preventDefault()
				// }catch(e){
				// 	console.error(e)
				// }

				try {
					await globalThis.navigation.navigate(previousEntry.url, { history: "replace" }).finished
					return e.preventDefault()
				}catch(e){
					console.error(e)
				}
			}

			if(globalThis.navigation.canGoBack){
				await globalThis.navigation.back().finished
				return e.preventDefault()
			}
		}

		if(globalThis.history){
			globalThis.history.back()
			return e.preventDefault()
		}
	}

	const reload = async (e: Event) => {
		if(globalThis.navigation){
			await globalThis.navigation.reload().finished
			return e.preventDefault()
		}

		if(globalThis.history){
			globalThis.history.go()
			return e.preventDefault()
		}
	}


	import Preferences from '../components/Preferences.svelte'


	import { fly } from 'svelte/transition'
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


<main in:fly|global={{x: 300}} out:fly|global={{x: -300}}>
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

			{#if !globalThis.navigation || globalThis.navigation.canGoBack}
				<a href={previousEntry?.url}><button class="small" data-before="←" on:click={goBack}>Back</button></a>
			{/if}
			<a href=""><button class="small" data-before="↻" on:click={reload}>Reload</button></a>
		</div>
	</section>
</main>

<Preferences isShowingAll />
