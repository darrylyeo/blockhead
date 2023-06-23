<script lang="ts">
	// Types

	import type { Ethereum } from '../data/networks/types'
	import type { QuoteCurrency } from '../data/currencies'


	// External state

	export let network: Ethereum.Network
	export let transaction: Ethereum.Transaction
	export let quoteCurrency: QuoteCurrency


	// View options

	export let layout: 'standalone' | 'inline' = 'inline'
	export let innerLayout: 'columns' | 'row' = 'row'

	export let detailLevel: 'summary' | 'detailed' | 'exhaustive' = 'detailed'
	export let showFees = false
	export let tokenBalanceFormat: 'original' | 'converted' | 'both' = 'original'

	export let contextualAddress: Ethereum.Address


	// Computed

	$: isSummary = detailLevel === 'summary'
	$: isExhaustive = detailLevel === 'exhaustive'
	$: isStandaloneLayout = layout === 'standalone'
	$: isInlineLayout = layout === 'inline'
	$: contextIsSender = contextualAddress && transaction.fromAddress && contextualAddress.toLowerCase() === transaction.fromAddress.toLowerCase()
	$: contextIsReceiver = contextualAddress && transaction.toAddress && contextualAddress.toLowerCase() === transaction.toAddress.toLowerCase()


	// Components

	import AddressWithLabel from './AddressWithLabel.svelte'
	import Date from './Date.svelte'
	import EthereumLogEvent from './EthereumLogEvent.svelte'
	import EthereumTransactionID from './EthereumTransactionID.svelte'
	import EthereumTransactionSummary from './EthereumTransactionSummary.svelte'
	import TokenBalanceWithConversion from './TokenBalanceWithConversion.svelte'


	// Transitions

	import { fade } from 'svelte/transition'
</script>


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
	.container :global(.date) {
		font-size: 0.66em;
		opacity: 0.7;
		align-self: center;
		align-items: flex-end;
		justify-content: center;
		height: 1em;
	}

	.log-events {
		font-size: 0.9em;
	}
	.transaction.layout-inline .log-events {
		font-size: 0.75em;
		padding: var(--padding-outer);
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


{#if transaction.network && transaction}
	<div class="transaction layout-{layout} column" class:card={isStandaloneLayout} class:unsuccessful={!transaction.isSuccessful} transition:fade>
		{#if isStandaloneLayout}
			<div class="bar">
				<h2><EthereumTransactionID network={transaction.network} transactionID={transaction.transactionID} /></h2>
				<span class="card-annotation">{transaction.network.name} Transaction</span>
			</div>

			<hr>

			<div class="bar">
				<h4>Signed Transaction Data</h4>
				{#if transaction.nonce}<p class="card-annotation">Nonce #{transaction.nonce}</p>{/if}
			</div>
		{/if}

		<!-- {#if !(isSummary && /*transaction.transfers?.length*/ && value == 0)} -->
			<div class="container inner-layout-{innerLayout}" class:card={isStandaloneLayout}>
				{#if !(isSummary && (contextIsSender || contextIsReceiver))}
					<span class="sender" transition:fade>
						<AddressWithLabel
							network={transaction.network}
							address={transaction.fromAddress}
							label={transaction.fromAddressLabel}
							format="middle-truncated"
						/>
					</span>
				{/if}

				{#if transaction.value}
					<span>
						<span class="action">
							{isSummary && contextIsReceiver
								? transaction.isSuccessful ? 'received' : 'failed to receive'
								: transaction.isSuccessful ? 'sent' : 'failed to send'}
						</span>
						<TokenBalanceWithConversion
							{tokenBalanceFormat}
							showDecimalPlaces={isExhaustive ? 9 : 6}

							network={transaction.network}
							erc20Token={transaction.gasToken}

							balance={transaction.value}
							conversionCurrency={quoteCurrency}
						/>
					</span>
				{/if}

				{#if isSummary && contextIsReceiver && transaction.fromAddress}
					<span class="sender" transition:fade>
						<span>from</span>
						<AddressWithLabel network={transaction.network} address={transaction.fromAddress} label={transaction.fromAddressLabel} format="middle-truncated" />
					</span>
				{:else if transaction.toAddress}
					<span class="receiver" transition:fade>
						<span>to</span>
						<AddressWithLabel network={transaction.network} address={transaction.toAddress} label={transaction.toAddressLabel} format="middle-truncated" />
					</span>
				{/if}

				{#if showFees && transaction.gasValue !== undefined}
					<span class="fee" transition:fade>
						<span>for fee</span>
						<TokenBalanceWithConversion
							{tokenBalanceFormat}
							showDecimalPlaces={isExhaustive ? 9 : 6}

							network={transaction.network}
							erc20Token={transaction.gasToken}

							balance={transaction.gasValue}
							conversionCurrency={quoteCurrency}
						/>
					</span>
				{/if}

				{#if isSummary && transaction.date}
					<Date date={transaction.date} />
				{/if}
			</div>
		<!-- {/if} -->

		<!-- {#if transaction.transfers?.length}
			{#if isStandaloneLayout}
				<hr>
				<h4>ERC-20 Token Transfers</h4>
			{/if}
			<div class="transfers">
				{#each transaction.transfers as erc20TokenTransfer}
					<svelte:self
						network={transaction.network}
						erc20TokenTransfer={transaction.erc20TokenTransfer}
						contextualAddress={transaction.contextualAddress}
						detailLevel={transaction.detailLevel}
						tokenBalanceFormat={transaction.tokenBalanceFormat}
						showFees={false}
						layout="inline"
						innerLayout="row"
					/>
				{/each}
			</div>
		{/if} -->

		{#if isExhaustive && transaction.logEvents?.length}
			{#if isStandaloneLayout}
				<hr>

				<h4>Smart Contract Log Events</h4>

				<div class="log-events column">
					{#each transaction.logEvents as logEvent}
						<div class="card">
							<EthereumLogEvent
								network={transaction.network}
								{logEvent}
								{detailLevel}
								{contextualAddress}
							/>
						</div>
					{/each}
				</div>
			{:else}
				<div class="log-events column" class:scrollable-list={transaction.logEvents.length > 16}><!-- transition:fade -->
					{#each transaction.logEvents as logEvent}
						<EthereumLogEvent
							network={transaction.network}
							{logEvent}
							{detailLevel}
							{contextualAddress}
						/>
					{/each}
				</div>
			{/if}
		{/if}

		{#if !isSummary && (transaction.transactionID || transaction.blockNumber)}
			{#if isStandaloneLayout}
				<hr>
			{/if}

			<div class="footer bar"><!-- transition:fade -->
				<EthereumTransactionSummary
					network={network}
					transactionID={transaction.transactionID}
					transactionIndex={transaction.transactionIndex}
					blockNumber={transaction.blockNumber}
					showTransactionID={isStandaloneLayout || isExhaustive}
				/>

				{#if transaction.date}
					<Date date={transaction.date} layout="horizontal" />
				{/if}
			</div>
		{/if}
	</div>
{/if}
