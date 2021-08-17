<script lang="ts">
	import { getContext } from 'svelte'

	import type { Ethereum } from '../../data/ethereum/types'
	import { Portfolio, getLocalPortfolios } from '../../data/ethereum/portfolio-accounts'
	import { ethereumChainID, preferredDeFiProvider, preferredAnalyticsProvider, preferredQuoteCurrency } from '../../data/ethereum/preferences'
	import { networksByChainID } from '../../data/ethereum/networks'


	const ethereumProvider = getContext<SvelteStore<Ethereum.Provider>>('ethereumProvider')
	$: portfolioProvider = $ethereumProvider
	
	const localPortfolios = getLocalPortfolios()
	function addPortfolio(){
		$localPortfolios = [...$localPortfolios, new Portfolio()]
	}
	function deletePortfolio(i){
		$localPortfolios = [...$localPortfolios.slice(0, i), ...$localPortfolios.slice(i + 1)]
	}

	$: if(localPortfolios && !$localPortfolios.length)
		addPortfolio()

	$: network = networksByChainID[$ethereumChainID]

	const addToPortfolio = account => {

	}


	import PortfolioComponent from '../../components/Portfolio.svelte'
	import Preferences from '../../components/Preferences.svelte'
	import WalletProviders from '../../components/WalletProviders.svelte'
	import { fly } from 'svelte/transition'
</script>

<style>
	main {
		/* display: grid;
		grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
		justify-items: center; */

		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: 2rem;
		
		/* Override scroll container to support position: sticky */
		height: 100vh;
		overflow-y: auto;
	}
	main > :global(*) {
		flex: 1 30rem;
		max-width: 45rem;
		gap: 2.5rem;
	}
</style>

<svelte:head>
	<title>Portfolio | Blockhead</title>
</svelte:head>

<main in:fly={{x: 300}} out:fly={{x: -300}}>
	<section class="portfolios column">
		{#if localPortfolios}
			{#each $localPortfolios as {name, accounts}, i (i)}
				<PortfolioComponent
					bind:name
					bind:accounts
					editable={true}
					provider={portfolioProvider}
					defiProvider={$preferredDeFiProvider}
					analyticsProvider={$preferredAnalyticsProvider}
					quoteCurrency={$preferredQuoteCurrency}
					on:delete={e => deletePortfolio(i)}
				/>
			{/each}
			{#if $localPortfolios[$localPortfolios.length - 1]?.accounts.length}
				<button on:click={() => addPortfolio()}>+ Create Another Portfolio</button>
			{/if}
		{:else}
			Please enable LocalStorage in your browser.
		{/if}
	</section>
	
	<WalletProviders {network} {portfolioProvider} />
</main>

<Preferences
	showDefiProvider
/>