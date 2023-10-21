<script lang="ts">
	// Types/constants
	import type { Ethereum } from '../data/networks/types'
	import type { Erc20Transfer } from '../api/covalent'
	import type { QuoteCurrency } from '../data/currencies'


	// Inputs
	export let network: Ethereum.Network
	export let erc20Transfer: Erc20Transfer
	export let quoteCurrency: QuoteCurrency

	// (View options)
	export let contextualAddress: Ethereum.Address
	export let detailLevel: 'summary' | 'detailed' | 'exhaustive' = 'detailed'
	export let tokenBalanceFormat: 'original' | 'converted' | 'both' = 'original'
	export let showFees = false

	export let layout: 'standalone' | 'inline' = 'inline'
	export let innerLayout: 'columns' | 'row' = 'row'


	// Internal state
	// (Computed)
	$: isSummary = detailLevel === 'summary'
	$: isExhaustive = detailLevel === 'exhaustive'
	$: isStandaloneLayout = layout === 'standalone'
	$: isInlineLayout = layout === 'inline'

	$: contextIsSender = contextualAddress && erc20Transfer.fromAddress && contextualAddress.toLowerCase() === erc20Transfer.fromAddress.toLowerCase()
	$: contextIsReceiver = contextualAddress && erc20Transfer.toAddress && contextualAddress.toLowerCase() === erc20Transfer.toAddress.toLowerCase()


	import AddressWithLabel from './AddressWithLabel.svelte'
	import TokenBalanceWithConversion from './TokenBalanceWithConversion.svelte'
</script>


<div class="transaction layout-{layout} column" class:card={isStandaloneLayout} class:unsuccessful={!erc20Transfer.isSuccessful}>
	<div class="container inner-layout-{innerLayout}" class:card={isStandaloneLayout}>
		{#if !(isSummary && (contextIsSender || contextIsReceiver))}
			<span class="sender" class:mark={contextIsSender}>
				<AddressWithLabel
					{network}
					address={erc20Transfer.fromAddress}
					label={erc20Transfer.fromAddressLabel}
					format="middle-truncated"
					alwaysShowAddress={isExhaustive}
				/>
			</span>
		{/if}
		{#if erc20Transfer.value}
			<span>
				<span class="action">
					{isSummary && contextIsReceiver
						? erc20Transfer.isSuccessful ? 'received' : 'failed to receive'
						: erc20Transfer.isSuccessful ? 'sent' : 'failed to send'}
				</span>
				<TokenBalanceWithConversion
					{tokenBalanceFormat}
					showDecimalPlaces={isExhaustive ? 9 : 6}

					{network}
					erc20Token={erc20Transfer.transferredToken}

					balance={Number(erc20Transfer.value)}
					conversionCurrency={quoteCurrency} 
					convertedValue={erc20Transfer.convertedValue}
				/>
			</span>
		{/if}
		{#if isSummary && contextIsReceiver && erc20Transfer.fromAddress}
			<span class="sender">
				<span>from</span>
				<AddressWithLabel
					{network}
					address={erc20Transfer.fromAddress}
					label={erc20Transfer.fromAddressLabel}
					format="middle-truncated"
					alwaysShowAddress={isExhaustive}
				/>
			</span>
		{:else if erc20Transfer.toAddress}
			<span class="receiver" class:mark={contextIsReceiver}>
				<span>to</span>
				<AddressWithLabel
					{network}
					address={erc20Transfer.toAddress}
					label={erc20Transfer.toAddressLabel}
					format="middle-truncated"
					alwaysShowAddress={isExhaustive}
				/>
			</span>
		{/if}
	</div>
</div>


<style>
	.transaction {
		/* text-align: center; */
	}
	h2 :global(.transaction-id) {
		font-size: 0.8em;
	}

	.transaction.layout-inline {
		--padding-inner: 0.5em;
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

	.log-events {
		font-size: 0.9em;
	}
	.transaction.layout-inline .log-events {
		font-size: 0.75em;
		padding: 0.66em 1em;
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

	.container .date {
		opacity: 0.8;
		font-size: 0.66em;
		align-self: center;
		text-align: end;
	}

	.unsuccessful {
		/* box-shadow: 0 1px 3px #ff2f00a0; */
		text-shadow: 0 1px 2px #ff2f00;
		opacity: 0.6;
		/* filter: saturate(0.5) contrast(0.5); */
		/* filter: saturate(0.5) sepia(0.5) hue-rotate(-55deg); */
		transition: opacity 0.3s;
	}
	.unsuccessful:hover, .unsuccessful:focus-within {
		opacity: 0.9;
	}

	.log-events.scrollable-list {
		--resizeVertical-defaultHeight: 20rem;
	}
	.transaction.layout-standalone .log-events.scrollable-list {
		--resizeVertical-defaultHeight: 54vh;
	}
</style>
