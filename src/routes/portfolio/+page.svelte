<script lang="ts">
	import { getLocalPortfolios } from '$/state/portfolios.svelte'
	import { preferences } from '$/state/preferences'


	const _portfoliosState = getLocalPortfolios()
	const portfoliosState = $derived(_portfoliosState.value)


	import { triggerEvent } from '$/events/triggerEvent'

	const addPortfolio = () => {
		portfoliosState.addPortfolio()

		triggerEvent('Portfolios/AddPortfolio', {
			newPortfolioCount: portfoliosState.portfolios.length
		})
	}

	const deletePortfolio = (i: number) => {
		const deletedPortfolio = portfoliosState.deletePortfolio(i)

		triggerEvent('Portfolios/DeletePortfolio', {
			portfolioAccountsCount: deletedPortfolio.accounts.length,
			newPortfolioCount: portfoliosState.portfolios.length,
		})
	}

	$effect(() => {
		if(portfoliosState && !portfoliosState.portfolios.length)
			addPortfolio()
	})


	// Components
	import PortfolioComponent from '$/components/Portfolio.svelte'
	import Preferences from '$/components/Preferences.svelte'
	import AccountConnections from '$/components/AccountConnections.svelte'
	// import WalletProviders from '$/components/WalletProviders.svelte'


	// Style

	import { matchesMediaQuery } from '$/utils/matchesMediaQuery'

	const matchesLayoutBreakpoint = matchesMediaQuery('(min-width: 100rem)')
	const layout = $derived(
		$matchesLayoutBreakpoint
			? 'row' as const
			: 'column' as const
	)

	import { fly } from 'svelte/transition'
	import { expoOut } from 'svelte/easing'
</script>


<main in:fly={{ x: 150, easing: expoOut }} out:fly={{ x: -150, easing: expoOut }}>
	<section class="portfolios column">
		{#if portfoliosState}
			{#each portfoliosState.portfolios as portfolio, i (i)}
				<PortfolioComponent
					bind:portfolio={portfoliosState.portfolios[i]}
					isEditable
					networkProvider={$preferences.rpcNetwork}
					defiProvider={$preferences.defiProvider}
					tokenBalancesProvider={$preferences.tokenBalancesProvider}
					notificationsProvider={$preferences.notificationsProvider}
					quoteCurrency={$preferences.quoteCurrency}
					on:delete={e => deletePortfolio(i)}
				/>
			{/each}

			{#if portfoliosState.portfolios[portfoliosState.portfolios.length - 1]?.accounts.length}
				<div class="align-end">
					<button
						data-before="＋"
						onclick={() => { addPortfolio() }}
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
		height: 100dvh;
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
