<script lang="ts">
	import type { DefiAppConfig, DefiAppSlug } from '../../data/ethereum/defi-apps'
	import { defiApps, defiAppsBySlug } from '../../data/ethereum/defi-apps'
	import { derived, writable } from 'svelte/store'
	import { setContext } from 'svelte'


	export let segment: string = ''
	
	const defiAppSlug = writable<DefiAppSlug>(segment)
	setContext('defiAppSlug', defiAppSlug)

	if(segment === undefined && globalThis.document)
		goto(`apps/${$defiAppSlug}`)


	// App context stores

	const defiAppConfig = derived<typeof defiAppSlug, DefiAppConfig>(defiAppSlug, ($defiAppSlug, set) => {
		if(defiAppsBySlug[$defiAppSlug])
			set(defiAppsBySlug[$defiAppSlug])
	})
	setContext('defiAppConfig', defiAppConfig)


	$: if(globalThis.document)
		document.documentElement.style.setProperty('--primary-color', `var(--${tokenColors[$defiAppSlug] || tokenColors['ethereum']})`)


	const query = writable<string>('')
	setContext('query', query)

	import { goto } from '@sapper/app'

	import { fly } from 'svelte/transition'
	import { tokenColors } from '../../data/token-colors'
	import Preferences from '../../components/Preferences.svelte'
</script>

<style>
	main {
		max-width: var(--one-column-width);
		grid-template-columns: 100%;

		min-height: 100vh;
		grid-template-rows: auto 1fr;
	}

	select {
		max-width: 11.5rem;
	}

	.stack {
		flex: 1;
	}
</style>

<svelte:head>
	<title>{$query ? `${$query} | ` : ''}{$defiAppConfig ? `${$defiAppConfig.name} Dashboard` : `DeFi Apps`} | Blockhead</title>
</svelte:head>

<main in:fly={{x: 300}} out:fly={{x: -300}}>
	<div class="bar">
		<h1>{$defiAppConfig ? `${$defiAppConfig.name} Dashboard` : `DeFi Apps`}</h1>
		<label>
			<span>DeFi App: </span>
			<select bind:value={$defiAppSlug} on:input={() => globalThis.requestAnimationFrame(() => goto(`apps/${$defiAppSlug}${$query ? `/${$query}` : ''}`))}>
				{#each defiApps as {name, slug}}
					<option value={slug}>{name}</option>
				{/each}
			</select>
		</label>
	</div>

	<div class="stack">
		<slot />
	</div>
</main>

<Preferences />