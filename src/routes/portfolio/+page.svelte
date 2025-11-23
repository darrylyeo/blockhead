<script lang="ts">
	// Types/constants
	import { EntityType } from '$/schema/_Entity.ts'


	// Context
	import { usePortfolios, createDefaultPortfolio } from '$/state/portfolios.svelte.ts'
	const portfolios = usePortfolios()


	// Components
	import Portfolio, { PortfolioLayout } from '$/views/Portfolio.svelte'
</script>


<main data-column>
	{#each portfolios.current as portfolio}
		<Portfolio
			{portfolio}
			layout={PortfolioLayout.Summary}
		/>
	{:else}
		<button
			onclick={() => {
				portfolios.current.push(createDefaultPortfolio())
			}}
		>
			Add Portfolio
		</button>
	{/each}
</main>
