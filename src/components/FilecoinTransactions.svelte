<script lang="ts">
	// Types/constants
	import type { Filecoin } from '$/data/filecoin'

	
	// Inputs
	export let transactions: Filecoin.Transaction[] = []
	export let isInternal = false
	// (View options)
	export let layout: 'default' | 'inline' | undefined
	export let title = 'Transactions'
	export let headingLevel: 2 | 3 | 4 | 5 | 6 = 3
	export let detailLevel: 'summary' | 'detailed' | 'exhaustive' = 'detailed'
	export let tokenBalanceFormat: 'original' | 'converted' | 'both' = 'original'
	export let showFees = false
	export let isOpen: boolean


	// Components
	import Collapsible from './Collapsible.svelte'
	import FilecoinTransaction from './FilecoinTransaction.svelte'
	import InlineContainer from './InlineContainer.svelte'
	import TweenedNumber from './TweenedNumber.svelte'
</script>


<Collapsible
	type="label"
	title=""
	bind:isOpen
>
	<svelte:fragment slot="title">
		<slot name="title">
			<svelte:element this={`h${headingLevel}`}>
				{title}
				<span>(<TweenedNumber value={transactions.length} />)</span>
			</svelte:element>
		</slot>
	</svelte:fragment>

	<svelte:fragment slot="toolbar-items" let:isOpen>
		<InlineContainer {isOpen}>
			<label>
				<input type="checkbox" bind:checked={showFees}>
				<span>Fees</span>
			</label>

			<label>
				<span>View</span>
				<select bind:value={detailLevel}>
					<option value="summary">Summary</option>
					<option value="detailed">Detailed</option>
					<option value="exhaustive">Exhaustive</option>
				</select>
			</label>
		</InlineContainer>
	</svelte:fragment>
	
	<div class="transactions-list column" class:scrollable-list={transactions.length > 7}>
		{#each transactions as transaction}
			<FilecoinTransaction
				{transaction}
				{isInternal}

				{layout}
				headingLevel={headingLevel + 1}
				{detailLevel}
				{tokenBalanceFormat}
				{showFees}
			/>
		{/each}
	</div>
</Collapsible>
