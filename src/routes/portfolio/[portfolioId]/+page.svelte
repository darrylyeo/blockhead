<script lang="ts">
	// Props
	let {
		data
	} = $props()


	// Context
	import { usePortfolios } from '$/state/portfolios.svelte.ts'
	const portfolios = usePortfolios()


	// State
	const portfolioIndex = $derived(
		portfolios.current.findIndex(p => p.$id.id === data.portfolioId)
	)

	$effect(() => {
		// Portfolio doesn't exist, redirect to main portfolio page
		if (portfolioIndex === -1 && typeof window !== 'undefined') {
			window.location.href = '/portfolio'
		}
	})


	// Components
	import Portfolio from '$/views/Portfolio.svelte'
</script>


{#if portfolioIndex !== -1}
	<main data-column>
		<Portfolio
			bind:portfolio={portfolios.current[portfolioIndex]}
		/>
	</main>
{:else}
	<main data-column>
		<p>Portfolio not found. Redirecting...</p>
	</main>
{/if}

