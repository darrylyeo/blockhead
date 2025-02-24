<script context="module" lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import { Filecoin } from '$/data/filecoin'

	export enum Layout {
		Standalone = 'Standalone',
		ListItemSequential = 'ListItemSequential',
		ListItemDiscrete = 'ListItemDiscrete',
	}

	export enum DetailLevel {
		SummaryDetailsLocation = 'SummaryDetailsLocation',
		SummaryLocation = 'SummaryLocation',
		Summary = 'Summary',
	}
</script>


<script lang="ts">
	// Inputs
	export let network: Ethereum.Network
	export let event: Filecoin.Event
	export let headingLevel: 2 | 3 | 4 | 5 | 6 = 3

	// (View options)
	export let layout: Layout
	export let detailLevel: DetailLevel
	export let showFormattedNames = true

	// (Derived)
	$: isLayoutStandalone = layout === Layout.Standalone
	$: isLayoutSequential = layout === Layout.ListItemSequential

	$: isShowingSummaryOnly = new Set([DetailLevel.Summary]).has(detailLevel)
	$: isShowingDetails = new Set([DetailLevel.SummaryDetailsLocation]).has(detailLevel)
	$: isShowingLocation = new Set([DetailLevel.SummaryDetailsLocation, DetailLevel.SummaryLocation]).has(detailLevel)


	// Function
	import { formatIdentifierToWords } from '$/utils/formatIdentifierToWords'


	// Components
	import AddressWithLabel from './AddressWithLabel.svelte'
	import BlockNumber from './BlockNumber.svelte'
	import Collapsible from './Collapsible.svelte'
	import DateTime from './DateTime.svelte'
	import FilecoinTipsetCid from './FilecoinTipsetCid.svelte'
	import TransactionId from './TransactionId.svelte'
	import TruncatedValue from './TruncatedValue.svelte'
</script>


<Collapsible
	type="label"
	class="column"
	isOpen={isShowingDetails || isShowingLocation}
	canToggle={isShowingDetails || isShowingLocation}
	showTriggerText={false}
>
	<svelte:fragment slot="title">
		<div class="row">
			{#if isShowingSummaryOnly && isLayoutSequential && event.indexInTransaction !== undefined}
				<span>{event.indexInTransaction}</span>
			{/if}

			<svelte:element this={`h${headingLevel}`}>
				<strong>
					{#if event.method?.name}
						{#if showFormattedNames}
							“{formatIdentifierToWords(event.method.name, true)}”
						{:else}
							<output>{event.method.name}</output>
						{/if}

					{:else if event.method?.selector}
						Event
						<output>
							<TruncatedValue
								value={event.method.selector}
							/>
						</output>

					{:else}
						{#if layout === Layout.ListItemSequential}
							[Event {#if event.indexInTransaction !== undefined}#{event.indexInTransaction}{/if}]
						{:else}
							[Event]
						{/if}
					{/if}
				</strong>

				emitted by

				<strong>
					<AddressWithLabel
						{network}
						address={event.emitter.shortAddress ?? event.emitter.robustAddress}
						label={event.labels?.emitter?.label}
						addressFormat="middle-truncated"
					/>
				</strong>
			</svelte:element>
		</div>
	</svelte:fragment>

	<svelte:fragment slot="header-right">
		<span class="card-annotation">
			{#if isLayoutStandalone}
				{#if network}{network.name} {/if} Event ({event.type})
			{:else}
				{#if isLayoutSequential}
					{event.type}
				{:else}
					{event.type} Event
				{/if}
			{/if}
		</span>
	</svelte:fragment>

	{#if isShowingDetails}
		<dl class="card">
			<dt>Type</dt>
			<dd>{Filecoin.eventTypes[event.type].name}</dd>

			<dt>Emitted by</dt>
			<dd>
				<AddressWithLabel
					{network}
					address={event.emitter.shortAddress ?? event.emitter.robustAddress}
					label={event.labels?.emitter?.label}
				/>
			</dd>

			{#if event.method}
				<dt>Method</dt>
				<dd>
					{#if event.method?.name}
						<output>{event.method.name}</output>
					{:else if event.method?.selector}
						Event
						<output>
							<TruncatedValue
								value={event.method.selector}
							/>
						</output>
					{:else}
						Event
					{/if}

					{#if event.method.signature}
						<dl>
							<dt>Signature</dt>
							<dd>
								<ol class="bulleted">
									{#each event.method.signature as param}
										<li>
											<output>{param}</output>
										</li>
									{/each}
								</ol>
							</dd>
						</dl>
					{/if}
				</dd>
			{/if}

			{#if event.data}
				<dt>Data</dt>
				<dd>
					<pre>{event.data}</pre>
				</dd>
			{/if}

			{#if event.metadata}
				<dt>Metadata</dt>
				<dd>
					<pre>{JSON.stringify(event.metadata, null, 2)}</pre>
				</dd>
			{/if}
		</dl>
	{/if}

	{#if isShowingLocation}
		<footer class="footer">
			<span class="row inline wrap">
				{#if !isLayoutSequential}
					Event

					{#if event.indexInTransaction !== undefined}
						#{event.indexInTransaction}
					{/if}
				{/if}

				<span>
					from
					<span>
						transaction
						{#if event.transaction?.cid}
							<TransactionId
								{network}
								transactionId={event.transaction.cid}
								format="middle-truncated"
								linked
								let:formattedTransactionId
						>
								{formattedTransactionId}
							</TransactionId>
						{/if}
					</span>
				</span>

				{#if event.tipset || event.transaction?.tipset}
					{@const tipset = event.tipset ?? event.transaction?.tipset}

					{#if tipset?.number !== undefined || tipset?.cid}
						<span>
							in
							<span title="Tipset {tipset?.number ?? tipset?.cid ?? ''}">
								tipset
								{#if tipset?.number !== undefined}
									<BlockNumber
										{network}
										blockNumber={tipset.number}
									/>
								{:else if tipset?.cid !== undefined}
									<FilecoinTipsetCid
										tipsetCid={tipset.cid}
										format="middle-truncated"
									/>
								{/if}
							</span>
						</span>
					{/if}

					{#if tipset?.timestamp}
						<DateTime
							date={tipset.timestamp}
						/>
					{/if}
				{/if}
			</span>
		</footer>
	{/if}
</Collapsible>


<style>
	dd:has(> dl) {
		display: contents;

		> dl {
			display: grid;
			grid-template-columns: subgrid;
			grid-column: 1 / -1;
			row-gap: 0.5em;

			--r: 0.85;
			margin-top: calc((var(--r) - 1) * (1 / var(--r)) * var(--padding-inner));
			font-size: calc(var(--r) * 1em);
		}

		dt:has(+ &) {
			display: contents;
		}
	}
</style>
