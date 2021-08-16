<script lang="ts">
	import { setContext } from 'svelte'
	import { derived, writable } from 'svelte/store'
	import { page } from '$app/stores'
	import { browser } from '$app/env'
	import { goto } from '$app/navigation'

	// const defiAppSlug = derived<typeof page, string>(page, ($page, set) =>
	// 	set($page.params.defiApp || '')
	// )
	// // $: $defiAppSlug = $page.params.defiApp
	const defiAppSlug = writable<DefiAppSlug>($page.params.defiApp || $page.path.match(/^\/apps\/([^/]+)/)?.[1] || '')
	const addressOrENSName = writable<string>($page.params.addressOrENSName || '')
	$: $defiAppSlug = $page.params.defiApp || $page.path.match(/^\/apps\/([^/]+)/)?.[1] || ''
	$: $addressOrENSName = $page.params.addressOrENSName || ''

	setContext('defiAppSlug', defiAppSlug)
	setContext('addressOrENSName', addressOrENSName)

	let path = $page.path
	$: if(browser){
		const newPath = `/apps${$defiAppSlug ? `/${$defiAppSlug}${$addressOrENSName ? `/address/${$addressOrENSName}` : ''}` : ''}`
		console.log(newPath, path)
		if(newPath !== path)
			goto(newPath, {keepfocus: true})
	}


	import type { DefiAppConfig, DefiAppSlug} from '../../data/ethereum/defi-apps'
	import { defiApps, defiAppsBySlug, featuredDefiApps, notFeaturedDefiApps } from '../../data/ethereum/defi-apps'


	// App context stores

	const defiAppConfig = derived<typeof defiAppSlug, DefiAppConfig>(defiAppSlug, ($defiAppSlug, set) => {
		if(defiAppsBySlug[$defiAppSlug])
			set(defiAppsBySlug[$defiAppSlug])
	})
	setContext('defiAppConfig', defiAppConfig)


	$: if(globalThis.document)
		document.documentElement.style.setProperty('--primary-color', $defiAppConfig?.colors?.[$defiAppConfig.colors.length / 2 | 0] || `var(--${tokenColors['ethereum']})`)


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
	<title>{$addressOrENSName ? `${$addressOrENSName} | ` : ''}{$defiAppConfig ? `${$defiAppConfig.name} ${$addressOrENSName ? 'Account' : 'Dashboard'}` : `DeFi Apps`} | Blockhead</title>
</svelte:head>


<main in:fly={{x: 300}} out:fly={{x: -300}}>
	<div class="bar">
		<h1><a href="/apps/{$defiAppSlug}">{$defiAppConfig ? `${$defiAppConfig.name} ${$addressOrENSName ? 'Account' : 'Dashboard'}` : `DeFi Apps`}</a></h1>
		<label>
			<span>DeFi App: </span>
			<select bind:value={$defiAppSlug}>
				<option value="" selected>Select App...</option>
				<optgroup label="Featured">
					{#each featuredDefiApps as {name, slug}}
						<option value={slug}>{name}</option>
					{/each}
				</optgroup>
				<optgroup label="Other">
					{#each notFeaturedDefiApps as {name, slug}}
						<option value={slug}>{name}</option>
					{/each}
				</optgroup>
			</select>
		</label>
	</div>

	<div class="stack">
		<slot />
	</div>
</main>

<Preferences />