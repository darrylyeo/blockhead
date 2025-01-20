<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import type { Filecoin } from '$/data/filecoin'
	import { networkBySlug } from '$/data/networks'


	// Inputs
	export let network: Ethereum.Network = networkBySlug.get('filecoin')!
	export let transaction: Filecoin.Transaction
	export let isInternal = false
	// (View options)
	export let layout: 'default' | 'inline' = isInternal ? 'inline' : 'default'
	export let headingLevel: 2 | 3 | 4 | 5 | 6 = 3
	export let detailLevel: 'summary' | 'detailed' | 'exhaustive' = 'detailed'
	export let showFees = false
	export let tokenBalanceFormat: 'original' | 'converted' | 'both' = 'original'

	export let contextualAddress: Filecoin.Address

	$: isSummary = detailLevel === 'summary'
	$: isExhaustive = detailLevel === 'exhaustive'
	$: contextIsSender = (
		contextualAddress
		&& transaction.fromActor
		&& (
			(transaction.fromActor.shortAddress && contextualAddress.toLowerCase() === transaction.fromActor.shortAddress.toLowerCase())
			|| ('robustAddress' in transaction.fromActor && transaction.fromActor.robustAddress && contextualAddress.toLowerCase() === transaction.fromActor.robustAddress.toLowerCase())
		)
	)
	$: contextIsReceiver = (
		contextualAddress
		&& transaction.toActor
		&& (
			(transaction.toActor.shortAddress && contextualAddress.toLowerCase() === transaction.toActor.shortAddress.toLowerCase())
			|| ('robustAddress' in transaction.toActor && transaction.toActor.robustAddress && contextualAddress.toLowerCase() === transaction.toActor.robustAddress.toLowerCase())
		)
	)


	// Components
	import AddressWithLabel from './AddressWithLabel.svelte'
	import BlockNumber from './BlockNumber.svelte'
	import Collapsible from './Collapsible.svelte'
	import DateTime from './DateTime.svelte'
	import FilecoinBlockCid from './FilecoinBlockCid.svelte'
	import FilecoinTransactions from './FilecoinTransactions.svelte'
	import TokenBalanceWithConversion from './TokenBalanceWithConversion.svelte'
	import TransactionId from './TransactionId.svelte'


	// Transitions
	import { fade } from 'svelte/transition'
</script>


<Collapsible
	type="label"
	containerClass="card"
	class="column"
	isOpen
	showTriggerText={false}
	showContentsOnly={layout === 'inline'}
	{...$$restProps}
>
	<svelte:fragment slot="title">
		<svelte:element this={`h${headingLevel}`}>
			<span class="transaction-id">
				<TransactionId
					{network}
					transactionId={transaction.id}
				/>
			</span>
		</svelte:element>
	</svelte:fragment>

	<svelte:fragment slot="header-right">
		<span class="card-annotation">
			{network.name} Transaction
		</span>
	</svelte:fragment>

	<!-- <dl>
		{#if transaction.fromActor}
			<span>
				<dt>From</dt>
				<dd><Address address={transaction.fromActor.shortAddress ?? transaction.fromActor.robustAddress} format="middle-truncated" /></dd>
			</span>
		{/if}

		{#if transaction.toActor}
			<span>
				<dt>To</dt>
				<dd><Address address={transaction.toActor.shortAddress ?? transaction.toActor.robustAddress} format="middle-truncated" /></dd>
			</span>
		{/if}
	</dl> -->

	<div class="row">
		{#if !(isSummary && (contextIsSender || contextIsReceiver)) && transaction.fromActor}
			<span class="sender" transition:fade>
				<AddressWithLabel
					{network}
					address={transaction.fromActor.shortAddress ?? transaction.fromActor.robustAddress}
					label={transaction.labels?.fromActor?.label}
					addressFormat="middle-truncated"
				/>
			</span>
		{/if}

		{#if transaction.method}
			<span>
				called 
				<output title="actor method">{transaction.method}</output>
			</span>
		{/if}

		{#if transaction.value != 0}
			<span>
				<span class="action">
					{isSummary && contextIsReceiver
						? transaction.isSuccessful ? 'received' : 'failed to receive'
						: transaction.isSuccessful ? 'sent' : 'failed to send'}
				</span>
				<TokenBalanceWithConversion
					{tokenBalanceFormat}
					showDecimalPlaces={isExhaustive ? 9 : 6}

					token={{
						chainId: network.chainId,
						...transaction.gasToken,
					}}

					balance={transaction.value}
				/>
			</span>
		{/if}

		{#if isSummary && contextIsReceiver && transaction.fromActor}
			<span class="sender" transition:fade>
				<span>from</span>
				<AddressWithLabel
					{network}
					address={transaction.fromActor.shortAddress ?? ('robustAddress' in transaction.fromActor ? transaction.fromActor.robustAddress : undefined)}
					label={transaction.labels?.fromActor?.label}
					addressFormat="middle-truncated"
				/>
				{#if transaction.labels?.fromActor?.isSigned}✔{/if}
			</span>

		{:else if transaction.toActor}
			<span class="receiver" transition:fade>
				{#if transaction.method}
					<span>on</span>
				{:else}
					<span>to</span>
				{/if}
				<AddressWithLabel
					{network}
					address={transaction.toActor.shortAddress ?? ('robustAddress' in transaction.toActor ? transaction.toActor.robustAddress : undefined)}
					label={transaction.labels?.toActor?.label}
					addressFormat="middle-truncated"
				/>
				{#if transaction.labels?.toActor?.isSigned}✔{/if}
			</span>
		{/if}

		{#if showFees && transaction.gasSpent !== undefined}
			<span class="fee" transition:fade>
				<span>for fee</span>
				<TokenBalanceWithConversion
					{tokenBalanceFormat}
					showDecimalPlaces={isExhaustive ? 9 : 6}

					token={{
						chainId: network.chainId,
						...transaction.gasToken,
					}}

					balance={transaction.gasSpent}
				/>
			</span>
		{/if}

		{#if isSummary && transaction.tipset?.timestamp}
			<DateTime date={transaction.tipset.timestamp} />
		{/if}
	</div>

	{#if transaction.internalTransactions}
		<hr>

		<section>
			<FilecoinTransactions
				transactions={transaction.internalTransactions}
				title="Internal Transactions"
				isInternal
				headingLevel={headingLevel + 1}
			/>
		</section>
	{/if}

	{#if !isSummary && !isInternal}
		<hr>

		<footer class="footer bar">
			<span class="row inline wrap" title="Transaction {transaction.id}">
				<span>
					Transaction
					<TransactionId
						{network}
						transactionId={transaction.id}
						format="middle-truncated"
						linked
						let:formattedTransactionId
					>
						{formattedTransactionId}
					</TransactionId>
				</span>

				{#if transaction.block?.id !== undefined}
					<span>
						in block
						<FilecoinBlockCid
							{network}
							blockCid={transaction.block.id}
							format="middle-truncated"
						/>
					</span>
				{/if}

				{#if transaction.tipset?.number !== undefined}
					<span>
						in tipset
						<BlockNumber
							{network}
							blockNumber={transaction.tipset.number}
						/>
					</span>
				{/if}
			</span>

			{#if transaction.tipset?.timestamp}
				<DateTime date={transaction.tipset.timestamp} />
			{/if}
		</footer>
	{/if}
</Collapsible>


<style>
	.transaction-id {
		font-size: 0.925em;
	}
</style>
