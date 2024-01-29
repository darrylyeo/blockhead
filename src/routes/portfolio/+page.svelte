<script lang="ts">
	import { getLocalPortfolios, createPortfolio } from '$/state/portfolio-accounts'
	import { preferences } from '$/state/preferences'


	const localPortfolios = getLocalPortfolios()


	import { triggerEvent } from '$/events/triggerEvent'

	const addPortfolio = () => {
		$localPortfolios = [...$localPortfolios, createPortfolio()]

		triggerEvent('Portfolios/AddPortfolio', {
			newPortfolioCount: $localPortfolios.length
		})
	}

	const deletePortfolio = (i: number) => {
		const deletedPortfolio = $localPortfolios[i]
		$localPortfolios = [...$localPortfolios.slice(0, i), ...$localPortfolios.slice(i + 1)]

		triggerEvent('Portfolios/DeletePortfolio', {
			portfolioAccountsCount: deletedPortfolio.accounts.length,
			newPortfolioCount: $localPortfolios.length,
		})
	}

	$: if(localPortfolios && !$localPortfolios.length)
		addPortfolio()


	// Components
	import PortfolioComponent from '$/components/Portfolio.svelte'
	import Preferences from '$/components/Preferences.svelte'
	import AccountConnections from '$/components/AccountConnections.svelte'
	// import WalletProviders from '$/components/WalletProviders.svelte'


	// Style

	import { matchesMediaQuery } from '$/utils/matchesMediaQuery'

	const matchesLayoutBreakpoint = matchesMediaQuery('(min-width: 100rem)')
	let layout: 'row' | 'column'
	$: layout = $matchesLayoutBreakpoint ? 'row' : 'column'

	import { fly } from 'svelte/transition'
</script>


<main in:fly|global={{x: 300}} out:fly|global={{x: -300}}>
	<section class="portfolios column">
		{#if localPortfolios}
			{#each $localPortfolios as portfolio, i (i)}
				<PortfolioComponent
					bind:portfolio
					isEditable
					networkProvider={$preferences.rpcNetwork}
					defiProvider={$preferences.defiProvider}
					tokenBalancesProvider={$preferences.tokenBalancesProvider}
					notificationsProvider={$preferences.notificationsProvider}
					quoteCurrency={$preferences.quoteCurrency}
					on:delete={e => deletePortfolio(i)}
				/>
			{/each}

			{#if $localPortfolios[$localPortfolios.length - 1]?.accounts.length}
				<div class="align-end">
					<button
						data-before="＋"
						on:click={() => addPortfolio()}
					>New Portfolio</button>
				</div>
			{/if}
		{:else}
			Please enable LocalStorage in your browser.
		{/if}
	</section>
	
	<!-- <WalletProviders {network} {portfolioProvider} /> -->

	<!-- <aside
		class="account-connections column"
		class:scrollable-list={layout === 'row'}
	>
		<AccountConnections layout={{'column': 'row', 'row': 'column'}[layout]} />
	</aside> -->
</main>

<Preferences
	relevantPreferences={[
		'theme',
		'rpcNetwork', 'tokenBalancesProvider', 'defiProvider', 'nftProvider',
		'quoteCurrency'
	]}
/>


<style>
	/* main {
		display: grid;
		justify-content: center;
		grid-template:
			'AccountConnections'
			'Portfolios'
			/ minmax(0, 1fr);
		gap: 2rem 1.5rem !important;
		
		/* Override scroll container to support position: sticky * /
		height: 100vh;
		overflow-y: auto;
	}
	@media (min-width: 100rem) {
		main {
			grid-template:
				'Portfolios AccountConnections'
				/ 1fr 19rem;
		}
	} */

	main {
		display: grid;
		justify-content: center;
		grid-template:
			'Portfolios' 1fr
			/ 1fr;
		
		/* Override scroll container to support position: sticky */
		height: 100vh;
		overflow-y: auto;
	}

	.portfolios {
		isolation: isolate;
		grid-area: Portfolios;
	}

	.account-connections {
		grid-area: AccountConnections;
		isolation: isolate;

		align-self: start;
	}
	@media (min-width: 100rem) {
		.account-connections {
			position: sticky;
			top: 0;
			height: calc(100vh - var(--bleed-top) - var(--bleed-bottom) - 2rem);
		}
	}

	.portfolios {
		padding: 0 0.5rem 60vh;
		gap: 3rem;
	}

	.sticky {
		isolation: isolate;
		z-index: 30000;
	}
</style>
