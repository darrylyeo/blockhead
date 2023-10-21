<script lang="ts">
	// Types/constants
	import type { Ethereum } from '../data/networks/types'
	import type { Covalent, Erc20Transfer, TransactionWithConversions, TransactionWithERC20Transfers } from '../api/covalent'
	import type { QuoteCurrency } from '../data/currencies'


	// Inputs
	export let network: Ethereum.Network
	export let transaction: TransactionWithConversions | TransactionWithERC20Transfers
	export let erc20TokenTransfer: Covalent.ERC20TokenTransfer
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

	$: _transaction =
		transaction ?
			transaction
		: erc20TokenTransfer ?
			erc20TokenTransfer
		:
			{}


	$: isSummary = detailLevel === 'summary'
	$: isExhaustive = detailLevel === 'exhaustive'
	$: isStandaloneLayout = layout === 'standalone'
	$: isInlineLayout = layout === 'inline'

	$: contextIsSender = contextualAddress && _transaction.fromAddress && contextualAddress.toLowerCase() === _transaction.fromAddress.toLowerCase()
	$: contextIsReceiver = contextualAddress && _transaction.toAddress && contextualAddress.toLowerCase() === _transaction.toAddress.toLowerCase()

	$: isContractCall = _transaction.value == 0 && (_transaction.logEvents?.length || erc20TokenTransaction)


	// let logEventIsHidden = {}
	// $: if(detailLevel, true)
	// 	logEventIsHidden = {}
	// let visibleLogEvents = logEvents
	// $: if(logEventIsHidden, true)
	// 	visibleLogEvents = logEvents //.filter(logEvent => logEventIsHidden[logEvent.indexInTransaction])


	import AddressWithLabel from './AddressWithLabel.svelte'
	import Date from './Date.svelte'
	import EthereumLogEventCovalent from './EthereumLogEventCovalent.svelte'
	import TransactionId from './TransactionId.svelte'
	import EthereumTransactionSummary from './EthereumTransactionSummary.svelte'
	import TokenBalanceWithConversion from './TokenBalanceWithConversion.svelte'
	import { fade, scale } from 'svelte/transition'
	import { scaleFont } from '../transitions/scale-font'
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


{#if network && (transaction || erc20TokenTransfer)}
	<div class="transaction layout-{layout} column" class:card={isStandaloneLayout} class:unsuccessful={!_transaction.isSuccessful}><!-- transition:fade -->
		{#if _transaction.nonce}{_transaction.nonce}{/if}

		{#if isStandaloneLayout}
			<div class="bar">
				<h2><TransactionId network={_transaction.network} transactionId={_transaction.transactionID} /></h2>
				<span class="card-annotation">{_transaction.network.name} Transaction</span>
			</div>

			<hr>

			<div class="bar">
				<h4>Signed Transaction Data</h4>
				{#if _transaction.nonce}<p class="card-annotation">Nonce #{_transaction.nonce}</p>{/if}
			</div>
		{/if}

		{#if !(isSummary && _transaction.transfers?.length && _transaction.value == 0)}
			<div class="container inner-layout-{innerLayout}" class:card={isStandaloneLayout}>
				{#if !(isSummary && (contextIsSender || contextIsReceiver))}
					<span class="sender" class:mark={contextIsSender}><!-- transition:fade -->
						<AddressWithLabel
							network={_transaction.network}
							address={_transaction.fromAddress}
							label={_transaction.fromAddressLabel}
							format="middle-truncated"
							alwaysShowAddress={isExhaustive}
						/>
					</span>
				{/if}
				{#if isContractCall && !isExhaustive}
					<span class="action">
						{_transaction.isSuccessful ? 'called smart contract' : 'failed to call smart contract'}
					</span>
				{:else if _transaction.value}
					<span>
						<span class="action">
							{isSummary && contextIsReceiver
								? _transaction.isSuccessful ? 'received' : 'failed to receive'
								: _transaction.isSuccessful ? 'sent' : 'failed to send'}
						</span>
						<TokenBalanceWithConversion
							{tokenBalanceFormat}
							showDecimalPlaces={isExhaustive ? 9 : 6}

							network={_transaction.network}
							erc20Token={_transaction.gasToken || _transaction.transferredToken}

							balance={Number(_transaction.value)}
							conversionCurrency={_transaction.quoteCurrency} 
							convertedValue={_transaction.convertedValue}
						/>
					</span>
				{/if}
				{#if isSummary && contextIsReceiver && _transaction.fromAddress}
					<span class="sender"><!-- transition:fade -->
						<span>from</span>
						<AddressWithLabel
							network={_transaction.network}
							address={_transaction.fromAddress}
							label={_transaction.fromAddressLabel}
							format="middle-truncated"
							alwaysShowAddress={isExhaustive}
						/>
					</span>
				{:else if _transaction.toAddress}
					<span class="receiver" class:mark={contextIsReceiver}><!-- transition:fade -->
						{#if !(isContractCall && !isExhaustive)}<span>to</span>{/if}
						<AddressWithLabel
							network={_transaction.network}
							address={_transaction.toAddress}
							label={_transaction.toAddressLabel}
							format="middle-truncated"
							alwaysShowAddress={isExhaustive}
						/>
					</span>
				{/if}
				{#if (showFees || isExhaustive) && _transaction.gasSpent !== undefined}
					<span class="fee"><!-- transition:fade -->
						<span>for fee</span>
						<TokenBalanceWithConversion
							{tokenBalanceFormat}
							showDecimalPlaces={isExhaustive ? 9 : 6}

							network={_transaction.network}
							erc20Token={_transaction.gasToken}

							balance={Number(_transaction.gasValue)}
							conversionCurrency={_transaction.quoteCurrency}
							convertedValue={_transaction.gasConvertedValue}
						/>
					</span>
				{/if}
				{#if isSummary && _transaction.date}
					<span class="date"><Date date={_transaction.date} layout="vertical" format="relative" /></span>
				{/if}
			</div>
		{/if}

		{#if 'erc20Transfers' in transaction && transaction.erc20Transfers?.length}
			{#if isStandaloneLayout}
				<hr>
				<h4>ERC-20 Token Transfers</h4>
			{/if}
			<div class="transfers">
				{#each transaction.erc20Transfers as erc20Transfer}
					<svelte:self
						network={_transaction.network}
						{erc20Transfer}
						quoteCurrency={_transaction.quoteCurrency}

						{contextualAddress}
						{detailLevel}
						{tokenBalanceFormat}
						showFees={false}

						layout="inline"
						innerLayout="row"
					/>
				{/each}
			</div>
		{/if}

		{#if !isSummary && _transaction.logEvents?.length}
			{#if isStandaloneLayout}
				<hr>
				<h4>Smart Contract Event Logs</h4>
			{/if}
			<div class="log-events column" class:scrollable-list={isExhaustive && _transaction.logEvents.length > (isStandaloneLayout ? 8 : 16)}><!-- transition:fade -->
				{#each _transaction.logEvents as logEvent (logEvent.indexInTransaction)}
					<EthereumLogEventCovalent
						network={_transaction.network}
						{logEvent}
						{contextualAddress}

						{detailLevel}
						isCard={isStandaloneLayout}
					/>
				{/each}
			</div>
			<!-- {#if visibleLogEvents.length}
				<div class="log-events column" class:scrollable-list={visibleLogEvents.length > 16}><!-- transition:fade -- >
					{#each visibleLogEvents as logEvent (logEvent.indexInTransaction)}
						<EthereumLogEventCovalent
							{network}
							{logEvent}
							{detailLevel}
							{contextualAddress}
							bind:isHidden={logEventIsHidden[logEvent.indexInTransaction]}
						/>
					{/each}
				</div>
			{/if} -->
		{/if}

		{#if !isSummary && transaction}
			{#if isStandaloneLayout}
				<hr>
			{/if}
			<div class="footer bar"><!-- transition:fade -->
				<EthereumTransactionSummary
					network={_transaction.network}
					transactionID={_transaction.transactionID}
					transactionIndex={_transaction.transactionIndex}
					blockNumber={_transaction.blockNumber}
					showTransactionID={isStandaloneLayout || isExhaustive}
				/>
				{#if _transaction.date}
					<Date date={_transaction.date} layout="horizontal" />
				{/if}
			</div>
		{/if}
	</div>
{/if}
