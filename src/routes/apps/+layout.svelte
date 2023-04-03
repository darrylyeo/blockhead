<script lang="ts">
	// Params two-way binding

	import { page } from '$app/stores'
	import { browser } from '$app/environment'
	import { goto, beforeNavigate } from '$app/navigation'

	import {
		web3AppSlug,
		addressOrEnsName,
		audiusQuery,
		audiusPlaylistId,
		audiusTrackId,
		audiusUserId,
		derivedPath
	} from './_appsParams'

	$: if($page.url.pathname.startsWith('/apps')){
		$web3AppSlug = $page.params.web3AppSlug || $page.url.pathname.match(/^\/apps\/([^/]+)/)?.[1] || ''
		$addressOrEnsName = $page.params.addressOrEnsName || ''
		$audiusQuery = $page.params.audiusQuery || ''
		$audiusPlaylistId = $page.params.audiusPlaylistId || ''
		$audiusTrackId = $page.params.audiusTrackId || ''
		$audiusUserId = $page.params.audiusUserId || ''
	}

	$: if(browser)
		goto($derivedPath, {keepfocus: true})

	beforeNavigate(({from, to, cancel}) => {
		if(from.url.pathname === to.url.pathname)
			cancel()
	})
	

	// Context

	import { web3AppConfig, currentView } from './_appsContext'

	import { web3AppsBySection } from '../../data/web3Apps'


	// Side effects

	$: if(globalThis.document)
		document.documentElement.style.setProperty('--primary-color', $web3AppConfig?.colors?.[$web3AppConfig.colors.length / 2 | 0] || `var(--${tokenColors['ethereum']})`)


	// Components

	import Preferences from '../../components/Preferences.svelte'
	import TokenIcon from '../../components/TokenIcon.svelte'
	import InlineContainer from '../../components/InlineContainer.svelte'


	// Style/transitions

	import { fly, scale } from 'svelte/transition'
	import { tokenColors } from '../../data/tokenColors'
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


	.title-icon {
		display: inline-flex;
		align-items: center;
		font-size: 1.5em;
	}
</style>


<svelte:head>
	<title>{$addressOrEnsName ? `${$addressOrEnsName} | ` : ''}{$web3AppSlug && $web3AppConfig ? `${$web3AppConfig.name} ${$currentView}` : `Apps`} | Blockhead</title>
</svelte:head>


<main in:fly={{x: 300}} out:fly={{x: -300}}>
<!-- <main> -->
	<div class="bar wrap">
		<div class="title row">
			<span class="stack-inline">
				{#key $web3AppConfig}
					<span class="title-icon" in:scale|local={{ duration: 300 }} out:scale|local={{ duration: 300 }}>
						{#if $web3AppConfig}
							{#if $web3AppConfig.icon}
								<img src={$web3AppConfig.icon} width="30" />
							{:else}
								{@const erc20Token = $web3AppConfig.views?.flatMap(view => view.erc20Tokens ?? [])[0]}

								{#if erc20Token}
									<TokenIcon {erc20Token} />
								{:else}
									<img src="/Blockhead-Logo.svg" width="30" />
								{/if}
							{/if}
						{:else}
							<img src="/Blockhead-Logo.svg" width="30" />
						{/if}
					</span>
				{/key}
			</span>

			<h1>
				<a href="/apps/{$web3AppSlug}" class="stack-inline">
					{#if $web3AppSlug && $web3AppConfig}
						<span in:fly={{y: 20, duration: 200}} out:fly={{y: -20, duration: 200}}>
							<InlineContainer class="stack-inline" clip>
								{#key $web3AppConfig}<mark in:fly={{y: 20, duration: 200}} out:fly={{y: -20, duration: 200}}>{$web3AppConfig.name}</mark>{/key}
							</InlineContainer>

							<InlineContainer class="stack-inline" clip>
								{#key $currentView}<span in:fly={{y: 20, duration: 200}} out:fly={{y: -20, duration: 200}}>{$currentView}</span>{/key}
							</InlineContainer>
						</span>
					{:else}
						<span in:fly={{y: 20, duration: 200}} out:fly={{y: -20, duration: 200}}>
							Web3 Apps/Services
						</span>
					{/if}
				</a>
			</h1>
		</div>

		<label>
			<span>App</span>
			<select bind:value={$web3AppSlug}>
				<option value="" selected>Select App...</option>

				{#each web3AppsBySection as {title, apps}}
					<optgroup label={title}>
						{#each apps as app}
							<option value={app.slug} style={`--primary-color: ${app.colors?.[0]}`}>{app.name}</option>
						{/each}
					</optgroup>
				{/each}
			</select>
		</label>
	</div>

	<div class="stack">
		<slot />
	</div>
</main>

<Preferences
	relevantPreferences={[
		'theme',
		'rpcNetwork', 'defiProvider', 'nftsProvider', 'currentPriceProvider', 'historicalPriceProvider', 'transactionProvider',
		'quoteCurrency'
	]}
/>
