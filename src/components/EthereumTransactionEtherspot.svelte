<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'
	import type { TickerSymbol } from '../data/currency/currency'
	import type { QuoteCurrency } from '../data/currency/currency'
	import type { Transaction } from 'etherspot'
	import { TransactionStatuses } from 'etherspot'


	export let network: Ethereum.Network
	export let transaction: Transaction
	export let quoteCurrency: QuoteCurrency


	// View options

	export let contextualAddress: Ethereum.Address // used for summary
	export let detailLevel: 'summary' | 'detailed' | 'exhaustive' = 'detailed'
	export let showValues: 'original' | 'converted' | 'both' = 'original'
	export let showFees = false

	export let layout: 'standalone' | 'inline' = 'inline'
	export let innerLayout: 'columns' | 'row' = 'row'


	// Data

	type TransactionData = Partial<{
		transactionID: Ethereum.TransactionID,
		blockNumber: Ethereum.BlockNumber,
		blockHash: Ethereum.BlockHash,
		transactionIndex: Ethereum.TransactionIndex,
		nonce: Ethereum.TransactionNonce,
		date,

		isSuccessful: boolean,

		fromAddress: Ethereum.Address,
		fromAddressLabel: string,
		toAddress: Ethereum.Address,
		toAddressLabel: string,

		token: TickerSymbol,
		tokenAddress: Ethereum.ContractAddress,
		tokenIcon: string,
		tokenName: string,

		value,
		valueQuote,

		gasToken: string,
		gasValue,
		gasValueQuote,

		quoteToken,
		rate,

		transfers: TransactionData[],
		logEvents: Transaction['logs'],
	}>

	import { formatUnits } from '@ethersproject/units'

	const _formatUnits = (value, decimals) => {
		try {
			return value
				? formatUnits(
					typeof value === 'string' ?
						value.replace(/\.0*$/, '')
					:
						value,
					decimals
				)
				: 0
		}catch(e){
			console.error(e)
			return value
		}
	}

	const convertEtherspotTransaction = (transaction: Transaction) => ({
		transactionID: transaction.hash,
		blockNumber: transaction.blockNumber,
		blockHash: transaction.blockHash,
		transactionIndex: transaction.transactionIndex,
		nonce: transaction.nonce,
		date: transaction.timestamp,

		isSuccessful: transaction.status === TransactionStatuses.Completed,

		fromAddress: transaction.from,
		// fromAddressLabel: transaction.from,
		toAddress: transaction.to,
		// toAddressLabel: transaction.to,

		token: network.nativeCurrency.symbol,
		tokenName: network.nativeCurrency.name,

		value: _formatUnits(transaction.value, network.nativeCurrency.decimals),
		// valueQuote: transaction.value_quote,

		gasToken: network.nativeCurrency.symbol,
		gasValue: _formatUnits(transaction.gasUsed, 'gwei'),
		gasValueQuote: transaction.gasPrice.mul(transaction.gasUsed),

		quoteToken: quoteCurrency,
		// rate: transaction.value_quote / _formatUnits(transaction.value, network.nativeCurrency.decimals),

		logEvents: transaction.logs,
	}) as TransactionData


	$: ({
		transactionID,
		blockNumber,
		blockHash,
		transactionIndex,
		nonce,
		date,

		isSuccessful,

		fromAddress,
		fromAddressLabel,
		toAddress,
		toAddressLabel,

		token,
		tokenAddress,
		tokenIcon,
		tokenName,

		value,
		valueQuote,

		gasToken,
		gasValue,
		gasValueQuote,

		quoteToken,
		rate,

		transfers,
		logEvents
	} = (
		transaction ?
			convertEtherspotTransaction(transaction)
		:
			{} as TransactionData
	))


	$: isSummary = detailLevel === 'summary'
	$: isExhaustive = detailLevel === 'exhaustive'
	$: isStandaloneLayout = layout === 'standalone'
	$: isInlineLayout = layout === 'inline'
	$: contextIsSender = contextualAddress && fromAddress && contextualAddress.toLowerCase() === fromAddress.toLowerCase()
	$: contextIsReceiver = contextualAddress && toAddress && contextualAddress.toLowerCase() === toAddress.toLowerCase()


	import AddressWithLabel from './AddressWithLabel.svelte'
	import Date from './Date.svelte'
	import EthereumLogEventEtherspot from './EthereumLogEventEtherspot.svelte'
	import EthereumTransactionID from './EthereumTransactionID.svelte'
	import EthereumTransactionSummary from './EthereumTransactionSummary.svelte'
	import TokenValueWithConversion from './TokenValueWithConversion.svelte'
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

{#if network && transaction}
	<div class="transaction layout-{layout} column" class:card={isStandaloneLayout} class:unsuccessful={!isSuccessful} transition:fade|local>
		{#if isStandaloneLayout}
			<div class="bar">
				<h2><EthereumTransactionID {network} {transactionID} /></h2>
				<span class="card-annotation">Ethereum Transaction</span>
			</div>
			<hr>
	
			<div class="bar">
				<h4>Initial Message</h4>
				{#if nonce}<p class="card-annotation">#{nonce}</p>{/if}
			</div>
		{/if}

		{#if !(isSummary && transfers?.length && value == 0)}
			<div class="container inner-layout-{innerLayout}" class:card={isStandaloneLayout}>
				{#if !(isSummary && (contextIsSender || contextIsReceiver))}
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
						<TokenValueWithConversion {showValues} symbol={token} address={tokenAddress} icon={tokenIcon} name={tokenName} {value} conversionCurrency={quoteToken} convertedValue={valueQuote} />
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
						<TokenValueWithConversion {showValues} symbol={gasToken} value={gasValue} conversionCurrency={quoteToken} convertedValue={gasValueQuote} />
					</span>
				{/if}
				{#if isSummary && date}
					<Date {date} />
				{/if}
			</div>
		{/if}

		{#if transfers?.length}
			{#if isStandaloneLayout}
				<hr>
				<h4>ERC-20 Token Transfers</h4>
			{/if}
			<div class="transfers">
				{#each transfers as erc20TokenTransfer}
					<svelte:self
						{network}
						{erc20TokenTransfer}
						{contextualAddress}
						{detailLevel}
						{showValues}
						showFees={false}
						layout="inline"
						innerLayout="row"
					/>
				{/each}
			</div>
		{/if}

		{#if isExhaustive && logEvents?.length}
			{#if isStandaloneLayout}
				<hr>
				<h4>Smart Contract Log Events</h4>
				<div class="log-events column">
					{#each logEvents as logEvent}
						<div class="card">
							<EthereumLogEventEtherspot
								{network}
								{logEvent}
								{detailLevel}
								{contextualAddress}
							/>
						</div>
					{/each}
				</div>
			{:else}
				<div class="log-events column" class:scrollable-list={logEvents.length > 16}><!-- transition:fade|local -->
					{#each logEvents as logEvent}
						<EthereumLogEventEtherspot
							{network}
							{logEvent}
							{detailLevel}
							{contextualAddress}
						/>
					{/each}
				</div>
			{/if}
		{/if}

		{#if !isSummary && (transactionID || blockNumber)}
			{#if isStandaloneLayout}
				<hr>
			{/if}
			<div class="footer bar" transition:fade|local>
				{#if isStandaloneLayout && blockNumber}
					<EthereumTransactionSummary {network} {transactionIndex} {blockNumber} />
				{:else if isInlineLayout}
					<EthereumTransactionSummary {network} {transactionID} {blockNumber} />
				{:else}
					<span />
				{/if}
				{#if date}
					<Date {date} layout="horizontal" />
				{/if}
			</div>
		{/if}
	</div>
{/if}
