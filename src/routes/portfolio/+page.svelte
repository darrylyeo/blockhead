<script lang="ts">
	// Types/constants
	import { EntityType } from '$/schema/_Entity.ts'


	// Context
	import { usePortfolios, createNewPortfolio } from '$/state/portfolios.svelte.ts'
	const portfolios = usePortfolios()


	// Components
	import Portfolio, { PortfolioLayout } from '$/views/Portfolio.svelte'
</script>


<main>
	<header
		data-scroll-item="inline-detached padding-match-start padding-match-end"
		data-row
	>
		<div data-row>
			<h2>Portfolios</h2>

			<div data-tag>
				{portfolios.current.length}
			</div>
		</div>

		<button
			onclick={() => {
				portfolios.current.push(
					createNewPortfolio(portfolios.current.length)
				)
			}}
		>
			Add Portfolio
		</button>
	</header>

	<ul
		data-scroll-item="inline-detached padding-match-end"
		data-sticky-container
		data-column="gap-4"
		data-list="unstyled"
	>
		{#each portfolios.current as portfolio}
			<li>
				<Portfolio
					{portfolio}
					layout={PortfolioLayout.Summary}
				/>
			</li>
		{/each}
	</ul>
</main>
