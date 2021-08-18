<script lang="ts">
	import { setContext } from 'svelte'
	import { derived, writable } from 'svelte/store'
	import { page } from '$app/stores'
	import { browser } from '$app/env'
	import { goto } from '$app/navigation'

	// const blockchainAppSlug = derived<typeof page, string>(page, ($page, set) =>
	// 	set($page.params.blockchainApp || '')
	// )
	// // $: $blockchainAppSlug = $page.params.blockchainApp
	const blockchainAppSlug = writable<BlockchainAppSlug>($page.params.blockchainApp || $page.path.match(/^\/apps\/([^/]+)/)?.[1] || '')
	const addressOrENSName = writable<string>($page.params.addressOrENSName || '')
	$: $blockchainAppSlug = $page.params.blockchainApp || $page.path.match(/^\/apps\/([^/]+)/)?.[1] || ''
	$: $addressOrENSName = $page.params.addressOrENSName || ''

	setContext('blockchainAppSlug', blockchainAppSlug)
	setContext('addressOrENSName', addressOrENSName)

	// let path = $page.path
	// $: if(browser){
	// 	const newPath = `/apps${$blockchainAppSlug ? `/${$blockchainAppSlug}${$addressOrENSName ? `/address/${$addressOrENSName}` : ''}` : ''}`
	// 	console.log(newPath, path)
	// 	if(newPath !== path)
	// 		goto(newPath, {keepfocus: true})
	// }


	$: query = $page.params.query


	let currentView: 'Dashboard' | 'Explorer' | 'Account'
	$: currentView = 
		query || ($addressOrENSName && $blockchainAppConfig.name) === 'ENS' ? 'Explorer' :
		$addressOrENSName ? 'Account' :
		'Dashboard'


	import type { BlockchainAppConfig, BlockchainAppSlug} from '../../data/blockchain-apps'
	import { blockchainApps, blockchainAppsBySlug, featuredBlockchainApps, notFeaturedBlockchainApps } from '../../data/blockchain-apps'


	// App context stores

	const blockchainAppConfig = derived<typeof blockchainAppSlug, BlockchainAppConfig>(blockchainAppSlug, ($blockchainAppSlug, set) => {
		if(blockchainAppsBySlug[$blockchainAppSlug])
			set(blockchainAppsBySlug[$blockchainAppSlug])
	})
	setContext('blockchainAppConfig', blockchainAppConfig)


	$: if(globalThis.document)
		document.documentElement.style.setProperty('--primary-color', $blockchainAppConfig?.colors?.[$blockchainAppConfig.colors.length / 2 | 0] || `var(--${tokenColors['ethereum']})`)


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
	<title>{$addressOrENSName || query ? `${$addressOrENSName || query} | ` : ''}{$blockchainAppSlug && $blockchainAppConfig ? `${$blockchainAppConfig.name} ${currentView}` : `Apps`} | Blockhead</title>
</svelte:head>


<main in:fly={{x: 300}} out:fly={{x: -300}}>
	<div class="bar">
		<h1><a href="/apps/{$blockchainAppSlug}">{$blockchainAppSlug && $blockchainAppConfig ? `${$blockchainAppConfig.name} ${currentView}` : `Blockchain/Web 3.0 Apps`}</a></h1>
		<label>
			<span>Blockchain App: </span>
			<!-- <select bind:value={$blockchainAppSlug}> -->
			<select bind:value={$blockchainAppSlug} on:input={() => globalThis.requestAnimationFrame(() => goto(`/apps/${$blockchainAppSlug}${$addressOrENSName ? `/${$addressOrENSName}` : ''}`))}>
				<option value="" selected>Select App...</option>
				<optgroup label="Featured">
					{#each featuredBlockchainApps as {name, slug}}
						<option value={slug}>{name}</option>
					{/each}
				</optgroup>
				<optgroup label="Other">
					{#each notFeaturedBlockchainApps as {name, slug}}
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

<Preferences
	showDefiProvider
/>