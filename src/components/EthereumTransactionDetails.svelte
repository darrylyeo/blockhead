<script lang="ts">
	// import type { AnalyticsProvider } from '../data/analytics/provider'

	export let contextualAddress // used for summary
	export let detailLevel: 'summary' | 'detailed' | 'exhaustive' = 'detailed'
	export let showValues: 'original' | 'converted' | 'both' = 'original'
	export let showFees = false

	export let layout: 'standalone' | 'inline' = 'inline'
	export let innerLayout: 'columns' | 'row' = 'row'


	export let transactionID
	export let blockNumber
	export let date

	export let fromAddress
	export let toAddress

	export let token = 'ETH'
	export let value
	export let valueQuote

	export let gasValue
	export let gasValueQuote

	export let quoteToken
	export let rate

	$: isSummary = detailLevel === 'summary'
	$: isExhaustive = detailLevel === 'exhaustive'
	$: contextIsSender = contextualAddress && contextualAddress.toLowerCase() === fromAddress.toLowerCase()
	$: contextIsReceiver = contextualAddress && contextualAddress.toLowerCase() === toAddress.toLowerCase()


	// export let provider: Ethereum.Provider
	// export let analyticsProvider: AnalyticsProvider

	import Address from './Address.svelte'
	import Date from './Date.svelte'
	import EthereumTransactionId from './EthereumTransactionID.svelte'
	import EthereumTransactionSummary from './EthereumTransactionSummary.svelte'
	import TokenValueWithConversion from './TokenValueWithConversion.svelte'
	import { scale } from 'svelte/transition'
</script>


<style>
	h2 :global(.transaction-id) {
		font-size: 0.8em;
	}

	.transaction-details {
		--padding-inner: 0.5em;
		text-align: center;
	}

	.transaction-details :global(.address) {
		font-weight: 600;
	}
	.transaction-details.layout-inline :global(.address) {
		display: inline;
	}
	.fee {
		font-size: 0.85em;
	}
	.transaction-details :global(.token-rate) {
		font-weight: 500;
	}
	.container :global(.date) {
		font-size: 0.66em;
		opacity: 0.7;
		align-self: center;
		align-items: flex-end;
    	justify-content: center;
		height: 1em;
	}


	.transaction-details .footer {
		/* justify-items: end;
		gap: var(--padding-inner); */
		opacity: 0.7;
		font-size: 0.66em;
	}

	.container.inner-layout-row {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		align-items: baseline;
		gap: var(--padding-inner);
	}

	.container.inner-layout-columns {
		display: grid;
		grid-auto-flow: column;
		gap: var(--padding-inner);
		align-items: center;

		font-weight: 300;

		position: relative;
	}
	.container.inner-layout-columns > * {
		display: flex;
		flex-direction: column;
	}
	.container.inner-layout-columns .value {
		font-size: 1.5em;
	}
</style>

<div class="card transaction-details layout-{layout}" transition:scale>
	{#if layout === 'standalone'}
		<div class="bar">
			<h2><EthereumTransactionId {transactionID}/></h2>
			<span class="card-annotation">Ethereum Transaction</span>
		</div>
	{/if}
	<div class="container inner-layout-{innerLayout}">
		{#if !isSummary}
			<span class="sender" transition:scale>
				<Address address={fromAddress} format="middle-truncated" />
			</span>
		{/if}
		{#if value}
			<span>
				<span class="action">{isSummary && contextIsReceiver ? 'received' : 'sent'}</span>
				<TokenValueWithConversion {showValues} {token} {value} conversionCurrency={quoteToken} convertedValue={valueQuote} />
			</span>
		{/if}
		{#if isSummary && contextIsReceiver}
			<span class="sender" transition:scale>
				<span>from</span>
				<Address address={fromAddress} format="middle-truncated" />
			</span>
		{:else}
			<span class="receiver" transition:scale>
				<span>to</span>
				<Address address={toAddress} format="middle-truncated" />
			</span>
		{/if}
		{#if isExhaustive || showFees}
			<span class="fee" transition:scale>
				<span>for fee</span>
				<TokenValueWithConversion {showValues} token="ETH" value={gasValue} conversionCurrency={quoteToken} convertedValue={gasValueQuote} />
			</span>
		{/if}
		{#if isSummary}
			<Date {date} />
		{/if}
	</div>
	{#if !isSummary}
		<div class="footer bar">
			{#if layout === 'standalone' && blockNumber}
				<EthereumTransactionSummary {blockNumber} />
			{:else if layout === 'inline'}
				<EthereumTransactionSummary {transactionID} {blockNumber} />
			{/if}
			<Date {date} layout="horizontal" />
		</div>
	{/if}
</div>