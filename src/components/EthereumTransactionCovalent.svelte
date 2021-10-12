<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'
	import type { Covalent } from '../data/analytics/covalent'
	import type { QuoteCurrency } from '../data/currency/currency'


	export let network: Ethereum.Network
	export let transaction: Covalent.Transaction
	export let erc20TokenTransaction: Covalent.ERC20TokenTransaction
	export let erc20TokenTransfer: Covalent.ERC20TokenTransfer
	export let quoteCurrency: QuoteCurrency


	// View options

	export let contextualAddress: Ethereum.Address
	export let detailLevel: 'summary' | 'detailed' | 'exhaustive' = 'detailed'
	export let showValues: 'original' | 'converted' | 'both' = 'original'
	export let showFees = false

	export let layout: 'standalone' | 'inline' = 'inline'
	export let innerLayout: 'columns' | 'row' = 'row'


	// Data

	type Transaction = Ethereum.Transaction & {
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
	type ERC20Transfer = Omit<Transaction, 'gasToken'> & {
		transferredToken: Ethereum.ERC20Token,
	}

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

	const convertCovalentTransaction = ({
		block_signed_at,
		block_height,
		tx_hash,
		tx_offset,
		successful,
		from_address,
		from_address_label,
		to_address,
		to_address_label,
		value,
		value_quote,
		gas_offered,
		gas_spent,
		gas_price,
		gas_quote,
		gas_quote_rate,
		log_events
	}: Covalent.Transaction) => ({
		network,

		transactionID: tx_hash,
		nonce: undefined,
		transactionIndex: tx_offset,
		blockNumber: block_height,
		blockHash: undefined,
		date: block_signed_at,

		isSuccessful: successful,

		fromAddress: from_address,
		fromAddressLabel: from_address_label,
		toAddress: to_address,
		toAddressLabel: to_address_label,

		value: _formatUnits(value, network.nativeCurrency.decimals),

		gasToken: network.nativeCurrency,
		gasOffered: gas_offered,
		gasSpent: gas_spent,
		gasRate: gas_price,
		gasValue: formatUnits(gas_spent * gas_price, network.nativeCurrency.decimals),

		logEvents: log_events
			?.map(({
				block_signed_at,
				block_height,
				tx_offset,
				log_offset,
				tx_hash,
				_raw_log_topics_bytes,
				raw_log_topics,
				sender_contract_decimals,
				sender_name,
				sender_contract_ticker_symbol,
				sender_address,
				sender_address_label,
				sender_logo_url,
				raw_log_data,
				decoded
			}) => ({
				indexInTransaction: log_offset,
				transactionHash: tx_hash,

				indexInBlock: tx_offset,
				blockNumber: block_height,
				// blockHash,

				topics: raw_log_topics,
				data: raw_log_data,

				contract: {
					name: sender_name,
					address: sender_address,
					symbol: sender_contract_ticker_symbol,
					decimals: sender_contract_decimals,
					icon: sender_logo_url === 'null' ? null : sender_logo_url,
					label: sender_address_label === 'null' ? null : sender_address_label,
				},

				decoded: decoded && {
					name: decoded.name,
					signature: decoded.signature,
					params: decoded.params?.map(({
						name,
						type,
						value,
						indexed,
						decoded
					}) => ({
						name,
						type,
						value: value ?? '', // value === null, decoded === false
						indexed,
						decoded
					})) ?? []
				}
			}))
			.sort((logEvent1, logEvent2) => logEvent1.indexInTransaction - logEvent2.indexInTransaction),


		convertedValue: value_quote,
		quoteCurrency,
		conversionRate: value_quote / _formatUnits(value, network.nativeCurrency.decimals),

		gasConvertedValue: gas_quote,
		gasConversionRate: gas_quote_rate,
	}) as Transaction

	const convertCovalentERC20TokenTransaction = (transaction: Covalent.ERC20TokenTransaction) => ({
		...convertCovalentTransaction(transaction),
		transfers: transaction.transfers.map(transfer =>
			convertCovalentERC20TokenTransfer(transfer, transaction.successful)
		)
	}) as TransactionWithERC20Transfers

	const convertCovalentERC20TokenTransfer = ({
		block_signed_at,
		tx_hash,
		from_address,
		from_address_label,
		to_address,
		to_address_label,
		contract_decimals,
		contract_name,
		contract_ticker_symbol,
		contract_address,
		logo_url,
		transfer_type,
		delta,
		balance,
		quote_rate,
		delta_quote,
		balance_quote,
		method_calls
	}: Covalent.ERC20TokenTransfer,
		isSuccessful: boolean
	) => ({
		network,

		transactionID: tx_hash,
		nonce: undefined,
		blockHash: undefined,
		date: block_signed_at,

		isSuccessful,

		fromAddress: from_address,
		fromAddressLabel: from_address_label,
		toAddress: to_address,
		toAddressLabel: to_address_label,

		value: _formatUnits(delta, contract_decimals),

		transferredToken: {
			symbol: contract_ticker_symbol,
			address: contract_address,
			name: contract_name,
			icon: logo_url,
			decimals: contract_decimals
		},

		convertedValue: delta_quote,
		quoteCurrency,
		conversionRate: quote_rate,

		logEvents: method_calls?.map(({method, sender_address}) => ({
			contract: {
				address: sender_address
			},
			decoded: {
				name: method
			}
		}))
	}) as ERC20Transfer


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
	)) as Transaction & TransactionWithERC20Transfers & ERC20Transfer)


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
	import EthereumTransactionID from './EthereumTransactionID.svelte'
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
		height: 20rem;
	}
	.transaction.layout-standalone .log-events.scrollable-list {
		height: 54vh;
	}
</style>


{#if network && (transaction || erc20TokenTransaction || erc20TokenTransfer)}
	<div class="transaction layout-{layout} column" class:card={isStandaloneLayout} class:unsuccessful={!isSuccessful}><!-- transition:fade|local -->
		{#if isStandaloneLayout}
			<div class="bar">
				<h2><EthereumTransactionID {network} {transactionID} /></h2>
				<span class="card-annotation">Ethereum Transaction</span>
			</div>
			<hr>
			<h4>Signed Transaction Data</h4>
		{/if}

		{#if !(isSummary && transfers?.length && value == 0)}
			<div class="container inner-layout-{innerLayout}" class:card={isStandaloneLayout}>
				{#if !(isSummary && (contextIsSender || contextIsReceiver))}
					<span class="sender" class:mark={contextIsSender}><!-- transition:fade|local -->
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
							{showValues}

							erc20Token={gasToken || transferredToken}

							balance={value}
							conversionCurrency={quoteCurrency} 
							{convertedValue}
						/>
					</span>
				{/if}
				{#if isSummary && contextIsReceiver && fromAddress}
					<span class="sender"><!-- transition:fade|local -->
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
					<span class="receiver" class:mark={contextIsReceiver}><!-- transition:fade|local -->
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
					<span class="fee"><!-- transition:fade|local -->
						<span>for fee</span>
						<TokenBalanceWithConversion
							{showValues}
							showDecimalPlaces={isExhaustive ? 9 : 6}

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
						{showValues}
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
			<div class="log-events column" class:scrollable-list={isExhaustive && logEvents.length > (isStandaloneLayout ? 8 : 16)}><!-- transition:fade|local -->
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
				<div class="log-events column" class:scrollable-list={visibleLogEvents.length > 16}><!-- transition:fade|local -- >
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
			<div class="footer bar"><!-- transition:fade|local -->
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
