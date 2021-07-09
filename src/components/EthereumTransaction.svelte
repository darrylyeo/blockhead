<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'
	import type { TickerSymbol } from '../data/currency/currency'
	import type { Covalent } from '../data/analytics/covalent'


	// View options

	export let contextualAddress: Ethereum.Address // used for summary
	export let detailLevel: 'summary' | 'detailed' | 'exhaustive' = 'detailed'
	export let showValues: 'original' | 'converted' | 'both' = 'original'
	export let showFees = false

	export let layout: 'standalone' | 'inline' = 'inline'
	export let innerLayout: 'columns' | 'row' = 'row'


	// Data

	export let network: Ethereum.Network
	export let transactionID
	export let blockNumber
	export let date
	export let isSuccessful = true

	export let fromAddress: Ethereum.Address
	export let fromAddressLabel
	export let toAddress: Ethereum.Address
	export let toAddressLabel

	export let token: TickerSymbol
	export let tokenAddress: Ethereum.ContractAddress
	export let tokenIcon: string
	export let tokenName: string

	export let value
	export let valueQuote

	export let gasToken = network.nativeCurrency.symbol
	export let gasValue
	export let gasValueQuote

	export let quoteToken
	export let rate

	export let transfers = []
	export let logEvents: Covalent.LogEvent[] = []


	$: isSummary = detailLevel === 'summary'
	$: isExhaustive = detailLevel === 'exhaustive'
	$: contextIsSender = contextualAddress && fromAddress && contextualAddress.toLowerCase() === fromAddress.toLowerCase()
	$: contextIsReceiver = contextualAddress && toAddress && contextualAddress.toLowerCase() === toAddress.toLowerCase()


	// export let provider: Ethereum.Provider
	// export let analyticsProvider: AnalyticsProvider

	import AddressWithLabel from './AddressWithLabel.svelte'
	import Date from './Date.svelte'
	import EthereumLogEvent from './EthereumLogEvent.svelte'
	import EthereumTransactionId from './EthereumTransactionID.svelte'
	import EthereumTransactionSummary from './EthereumTransactionSummary.svelte'
	import TokenValueWithConversion from './TokenValueWithConversion.svelte'
	import { fade, scale } from 'svelte/transition'
	import { scaleFont } from '../transitions/scale-font'
</script>


<style>
	h2 :global(.transaction-id) {
		font-size: 0.8em;
	}

	.transaction {
		--padding-inner: 0.5em;
		text-align: center;
	}

	.transaction :global(.address) {
		font-weight: 600;
	}
	.transaction.layout-inline :global(.address) {
		display: inline;
	}
	.fee {
		font-size: 0.85em;
	}
	.transaction :global(.token-rate) {
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

	.log-events {
		display: grid;
		gap: var(--padding-inner);
		font-size: 0.75em;
		padding: var(--padding-outer);
	}


	.transaction .footer {
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

	.unsuccessful {
		box-shadow: 0 1px 3px #ff2f00a0;
	}

	.log-events.scrollable-list {
		height: 20rem;
	}
</style>

<div class="card transaction layout-{layout}" class:unsuccessful={!isSuccessful} transition:fade|local>
	{#if layout === 'standalone'}
		<div class="bar">
			<h2><EthereumTransactionId {network} {transactionID} /></h2>
			<span class="card-annotation">Ethereum Transaction</span>
		</div>
	{/if}
	<div class="container inner-layout-{innerLayout}">
		{#if !isSummary}
			<span class="sender" transition:fade|local>
				<AddressWithLabel {network} address={fromAddress} label={fromAddressLabel} format="middle-truncated" />
			</span>
		{/if}
		{#if value}
			<span>
				<span class="action">
					{isSummary && contextIsReceiver
						? isSuccessful ? 'received' : 'failed to receive'
						: isSuccessful ? 'sent' : 'failed to send'}
				</span>
				<TokenValueWithConversion {showValues} {token} {tokenAddress} {tokenIcon} {tokenName} {value} conversionCurrency={quoteToken} convertedValue={valueQuote} />
			</span>
		{/if}
		{#if isSummary && contextIsReceiver && fromAddress}
			<span class="sender" transition:fade|local>
				<span>from</span>
				<AddressWithLabel {network} address={fromAddress} label={fromAddressLabel} format="middle-truncated" />
			</span>
		{:else if toAddress}
			<span class="receiver" transition:fade|local>
				<span>to</span>
				<AddressWithLabel {network} address={toAddress} label={toAddressLabel} format="middle-truncated" />
			</span>
		{/if}
		{#if showFees && gasValue !== undefined}
			<span class="fee" transition:fade|local>
				<span>for fee</span>
				<TokenValueWithConversion {showValues} token={gasToken} value={gasValue} conversionCurrency={quoteToken} convertedValue={gasValueQuote} />
			</span>
		{/if}
		{#if isSummary && date}
			<Date {date} />
		{/if}
	</div>
	{#if transfers?.length}
		<div class="transfers">
			{#each transfers as transfer}
				<svelte:self
					{network}
					{contextualAddress}
					{detailLevel}
					{showValues}
					showFees={false}
					{...transfer}
				/>
			{/each}
		</div>
	{/if}
	{#if isExhaustive && logEvents?.length}
		<div class="log-events" class:scrollable-list={logEvents.length > 16}><!-- transition:fade|local -->
			{#each logEvents as logEvent}
				<EthereumLogEvent
					{network}
					{logEvent}
					{detailLevel}
					{contextualAddress}
				/>
			{/each}
		</div>
	{/if}
	{#if !isSummary}
		<div class="footer bar" transition:fade|local>
			{#if layout === 'standalone' && blockNumber}
				<EthereumTransactionSummary {network} {blockNumber} />
			{:else if layout === 'inline'}
				<EthereumTransactionSummary {network} {transactionID} {blockNumber} />
			{/if}
			{#if date}
				<Date {date} layout="horizontal" />
			{/if}
		</div>
	{/if}
</div>