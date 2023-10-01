<script lang="ts">
	import type { Ethereum } from '../data/networks/types'
	import type { Covalent } from '../api/covalent'
	import type { QuoteCurrency } from '../data/currencies'


	export let network: Ethereum.Network
	export let transaction: Covalent.Transaction
	export let erc20TokenTransaction: Covalent.ERC20TokenTransaction
	export let erc20TokenTransfer: Covalent.ERC20TokenTransfer
	export let quoteCurrency: QuoteCurrency


	// View options

	export let contextualAddress: Ethereum.Address
	export let detailLevel: 'summary' | 'detailed' | 'exhaustive' = 'detailed'
	export let tokenBalanceFormat: 'original' | 'converted' | 'both' = 'original'
	export let showFees = false

	export let layout: 'standalone' | 'inline' = 'inline'
	export let innerLayout: 'columns' | 'row' = 'row'


	// Data

	type TransactionWithConversions = Ethereum.Transaction & {
		convertedValue: number,
		quoteCurrency: QuoteCurrency,
		conversionRate: number,

		gasConvertedValue: number,
		gasConversionRate: number,
	}
	type TransactionWithERC20Transfers = Ethereum.Transaction & {
		convertedValue: number,
		quoteCurrency: QuoteCurrency,
		conversionRate: number,

		transfers: ERC20Transfer[]
	}
	type ERC20Transfer = Omit<TransactionWithConversions, 'gasToken' | 'nonce'> & {
		transferredToken: Ethereum.ERC20Token,
	}

	import { formatUnits } from 'ethers'

	const _formatUnits = (value: number | string, decimals: number) => {
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
			console.warn(e)
			return value
		}
	}

	const convertCovalentTransaction = (transaction: Covalent.Transaction) => ({
		network,

		transactionID: transaction.tx_hash as Ethereum.TransactionID,
		nonce: undefined,
		transactionIndex: transaction.tx_offset,
		blockNumber: transaction.block_height as Ethereum.BlockNumber,
		blockHash: undefined,
		date: transaction.block_signed_at,

		isSuccessful: transaction.successful,

		fromAddress: transaction.from_address as Ethereum.Address,
		fromAddressLabel: transaction.from_address_label,
		toAddress: transaction.to_address as Ethereum.Address,
		toAddressLabel: transaction.to_address_label,

		value: _formatUnits(transaction.value, network.nativeCurrency.decimals), // transaction.value * 0.1 ** network.nativeCurrency.decimals,

		gasToken: network.nativeCurrency,
		gasOffered: BigInt(transaction.gas_offered),
		gasSpent: BigInt(transaction.gas_spent),
		gasRate: BigInt(transaction.gas_price),
		gasValue: _formatUnits(transaction.gas_spent * transaction.gas_price, network.nativeCurrency.decimals), // transaction.gas_spent * transaction.gas_price * 0.1 ** network.nativeCurrency.decimals,

		logEvents: transaction.log_events
			?.map(logEvent => ({
				indexInTransaction: logEvent.log_offset,
				transactionHash: logEvent.tx_hash,

				indexInBlock: logEvent.tx_offset,
				blockNumber: logEvent.block_height,
				// blockHash: ,

				topics: logEvent.raw_log_topics,
				data: logEvent.raw_log_data,

				contract: {
					name: logEvent.sender_name,
					address: logEvent.sender_address,
					symbol: logEvent.sender_contract_ticker_symbol,
					decimals: logEvent.sender_contract_decimals,
					icon: logEvent.sender_logo_url === 'null' ? null : logEvent.sender_logo_url,
					label: logEvent.sender_address_label === 'null' ? null : logEvent.sender_address_label,
				},

				decoded: logEvent.decoded && {
					name: logEvent.decoded.name,
					signature: logEvent.decoded.signature,
					params: logEvent.decoded.params?.map(logEvent => ({
						name: logEvent.name,
						type: logEvent.type,
						value: logEvent.value ?? '', // logEvent.value === null, logEvent.decoded === false
						indexed: logEvent.indexed,
						decoded: logEvent.decoded,
					})) ?? [],
				}
			}))
			.sort((logEvent1, logEvent2) => logEvent1.indexInTransaction - logEvent2.indexInTransaction),


		convertedValue: transaction.value_quote,
		quoteCurrency,
		conversionRate: transaction.value_quote / Number(_formatUnits(transaction.value, network.nativeCurrency.decimals)), // transaction.value_quote / Number(transaction.value * 0.1 ** network.nativeCurrency.decimals),

		gasConvertedValue: transaction.gas_quote,
		gasConversionRate: transaction.gas_quote_rate,
	} as TransactionWithConversions)

	const convertCovalentERC20TokenTransaction = (transaction: Covalent.ERC20TokenTransaction) => ({
		...convertCovalentTransaction(transaction),
		transfers: transaction.transfers.map(transfer =>
			convertCovalentERC20TokenTransfer(transfer, transaction.successful)
		)
	} as TransactionWithERC20Transfers)

	const convertCovalentERC20TokenTransfer = (
		transfer: Covalent.ERC20TokenTransfer,
		isSuccessful: boolean,
	) => ({
		network,

		transactionID: transfer.tx_hash as Ethereum.TransactionID,
		date: transfer.block_signed_at,

		isSuccessful,

		fromAddress: transfer.from_address,
		fromAddressLabel: transfer.from_address_label,
		toAddress: transfer.to_address,
		toAddressLabel: transfer.to_address_label,

		value: _formatUnits(transfer.delta, transfer.contract_decimals), // transfer.delta * 0.1 ** transfer.contract_decimals,

		transferredToken: {
			symbol: transfer.contract_ticker_symbol,
			address: transfer.contract_address,
			name: transfer.contract_name,
			icon: transfer.logo_url,
			decimals: transfer.contract_decimals
		},

		convertedValue: transfer.delta_quote,
		quoteCurrency,
		conversionRate: transfer.quote_rate,

		logEvents: transfer.method_calls?.map(methodCall => ({
			contract: {
				address: methodCall.sender_address
			},
			decoded: {
				name: methodCall.method
			}
		})),
	} as ERC20Transfer)


	$: ({
		network,

		transactionID,
		nonce,
		transactionIndex,
		blockNumber,
		blockHash,
		date,

		isSuccessful,

		fromAddress,
		fromAddressLabel,
		toAddress,
		toAddressLabel,

		value,

		gasToken,
		gasOffered,
		gasSpent,
		gasRate,
		gasValue,

		logEvents,

		// Transaction | TransactionWithERC20Transfers
		convertedValue,
		quoteCurrency,
		conversionRate,

		// Transaction
		gasConvertedValue,
		gasConversionRate,

		// TransactionWithERC20Transfers
		transfers,

		// ERC20Transfer
		transferredToken
	} = ((
		transaction ?
			convertCovalentTransaction(transaction)
		: erc20TokenTransaction ?
			convertCovalentERC20TokenTransaction(erc20TokenTransaction)
		: erc20TokenTransfer ?
			erc20TokenTransfer
		:
			{}
	)) as TransactionWithConversions | TransactionWithERC20Transfers | ERC20Transfer)


	$: isSummary = detailLevel === 'summary'
	$: isExhaustive = detailLevel === 'exhaustive'
	$: isStandaloneLayout = layout === 'standalone'
	$: isInlineLayout = layout === 'inline'

	$: contextIsSender = contextualAddress && fromAddress && contextualAddress.toLowerCase() === fromAddress.toLowerCase()
	$: contextIsReceiver = contextualAddress && toAddress && contextualAddress.toLowerCase() === toAddress.toLowerCase()

	$: isContractCall = value == 0 && (logEvents?.length || erc20TokenTransaction)


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


{#if network && (transaction || erc20TokenTransaction || erc20TokenTransfer)}
	<div class="transaction layout-{layout} column" class:card={isStandaloneLayout} class:unsuccessful={!isSuccessful}><!-- transition:fade -->
		{#if nonce}{nonce}{/if}

		{#if isStandaloneLayout}
			<div class="bar">
				<h2><TransactionId {network} transactionId={transactionID} /></h2>
				<span class="card-annotation">{network.name} Transaction</span>
			</div>

			<hr>

			<div class="bar">
				<h4>Signed Transaction Data</h4>
				{#if nonce}<p class="card-annotation">Nonce #{nonce}</p>{/if}
			</div>
		{/if}

		{#if !(isSummary && transfers?.length && value == 0)}
			<div class="container inner-layout-{innerLayout}" class:card={isStandaloneLayout}>
				{#if !(isSummary && (contextIsSender || contextIsReceiver))}
					<span class="sender" class:mark={contextIsSender}><!-- transition:fade -->
						<AddressWithLabel
							{network}
							address={fromAddress}
							label={fromAddressLabel}
							format="middle-truncated"
							alwaysShowAddress={isExhaustive}
						/>
					</span>
				{/if}
				{#if isContractCall && !isExhaustive}
					<span class="action">
						{isSuccessful ? 'called smart contract' : 'failed to call smart contract'}
					</span>
				{:else if value}
					<span>
						<span class="action">
							{isSummary && contextIsReceiver
								? isSuccessful ? 'received' : 'failed to receive'
								: isSuccessful ? 'sent' : 'failed to send'}
						</span>
						<TokenBalanceWithConversion
							{tokenBalanceFormat}
							showDecimalPlaces={isExhaustive ? 9 : 6}

							{network}
							erc20Token={gasToken || transferredToken}

							balance={value}
							conversionCurrency={quoteCurrency} 
							{convertedValue}
						/>
					</span>
				{/if}
				{#if isSummary && contextIsReceiver && fromAddress}
					<span class="sender"><!-- transition:fade -->
						<span>from</span>
						<AddressWithLabel
							{network}
							address={fromAddress}
							label={fromAddressLabel}
							format="middle-truncated"
							alwaysShowAddress={isExhaustive}
						/>
					</span>
				{:else if toAddress}
					<span class="receiver" class:mark={contextIsReceiver}><!-- transition:fade -->
						{#if !(isContractCall && !isExhaustive)}<span>to</span>{/if}
						<AddressWithLabel
							{network}
							address={toAddress}
							label={toAddressLabel}
							format="middle-truncated"
							alwaysShowAddress={isExhaustive}
						/>
					</span>
				{/if}
				{#if (showFees || isExhaustive) && gasSpent !== undefined}
					<span class="fee"><!-- transition:fade -->
						<span>for fee</span>
						<TokenBalanceWithConversion
							{tokenBalanceFormat}
							showDecimalPlaces={isExhaustive ? 9 : 6}

							{network}
							erc20Token={gasToken}

							balance={gasValue}
							conversionCurrency={quoteCurrency}
							convertedValue={gasConvertedValue}
						/>
					</span>
				{/if}
				{#if isSummary && date}
					<span class="date"><Date {date} layout="vertical" format="relative" /></span>
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
						{quoteCurrency}

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

		{#if !isSummary && logEvents?.length}
			{#if isStandaloneLayout}
				<hr>
				<h4>Smart Contract Event Logs</h4>
			{/if}
			<div class="log-events column" class:scrollable-list={isExhaustive && logEvents.length > (isStandaloneLayout ? 8 : 16)}><!-- transition:fade -->
				{#each logEvents as logEvent (logEvent.indexInTransaction)}
					<EthereumLogEventCovalent
						{network}
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

		{#if !isSummary && (transaction || erc20TokenTransaction)}
			{#if isStandaloneLayout}
				<hr>
			{/if}
			<div class="footer bar"><!-- transition:fade -->
				<EthereumTransactionSummary
					{network}
					{transactionID}
					{transactionIndex}
					{blockNumber}
					showTransactionID={isStandaloneLayout || isExhaustive}
				/>
				{#if date}
					<Date {date} layout="horizontal" />
				{/if}
			</div>
		{/if}
	</div>
{/if}
