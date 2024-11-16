<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import type { QuoteCurrency } from '$/data/currencies'
	import type { normalizeTransaction } from '$/api/covalent/normalize'
	import type { TransactionProvider } from '$/data/transactionProvider'


	// Inputs
	export let network: Ethereum.Network
	export let transactionProvider: TransactionProvider
	export let transaction: Ethereum.Transaction | ReturnType<typeof normalizeTransaction>
	export let quoteCurrency: QuoteCurrency

	export let contextualAddress: Ethereum.Address | undefined

	// (View options)
	export let layout: 'standalone' | 'collapsible' | 'inline' = 'inline'
	export let innerLayout: 'columns' | 'row' = 'row'

	export let detailLevel: 'summary' | 'detailed' | 'exhaustive' = 'detailed'
	export let showFees = false
	export let showDate = true
	export let tokenBalanceFormat: 'original' | 'converted' | 'both' = 'original'

	export let showFormattedNames = true

	export let headingLevel: 1 | 2 | 3 | 4 | 5 | 6 = 3

	export let isOpen = true

	// Internal state
	// (Computed)
	$: isSummary = detailLevel === 'summary'
	$: isExhaustive = detailLevel === 'exhaustive'
	$: isStandaloneLayout = layout === 'standalone' || layout === 'collapsible'
	$: isInlineLayout = layout === 'inline'

	$: contextIsSender = contextualAddress && transaction.fromAddress && contextualAddress.toLowerCase() === transaction.fromAddress.toLowerCase()
	$: contextIsReceiver = contextualAddress && transaction.toAddress && contextualAddress.toLowerCase() === transaction.toAddress.toLowerCase()

	$: isContractCall = Boolean(
		transaction.input
		|| transaction.inputDecoded
		|| transaction.logEvents
	)


	// Formatting
	import { formatIdentifierToWords } from '$/utils/formatIdentifierToWords'

	$: formatIdentifier = showFormattedNames
		? formatIdentifierToWords
		: (identifier: string) => identifier


	// Components
	import AddressWithLabel from './AddressWithLabel.svelte'
	import Collapsible from './Collapsible.svelte'
	import Date from './Date.svelte'
	import EthereumErc20Transfer from './EthereumErc20Transfer.svelte'
	import EthereumLogEvent from './EthereumLogEvent.svelte'
	import EthereumParameters from './EthereumParameters.svelte'
	import EthereumTransactionSummary from './EthereumTransactionSummary.svelte'
	import EthereumTransactionTrace from './EthereumTransactionTrace.svelte'
	import TokenBalanceWithConversion from './TokenBalanceWithConversion.svelte'
	import TransactionId from './TransactionId.svelte'
</script>


{#if transaction.network && transaction}
	<Collapsible
		type="label"
		{isOpen}
		canToggle={layout === 'collapsible'}
		showContentsOnly={layout === 'inline'}
		containerClass="transaction {isStandaloneLayout ? 'card' : ''} {transaction.executionStatus === 'failed' ? 'unsuccessful' : ''}" 
		class="column layout-{layout}"
	>
		<svelte:fragment slot="title">
			<svelte:element this={`h${headingLevel}`}>
				<span class="transaction-id">
					<TransactionId network={transaction.network} transactionId={transaction.transactionId} />
				</span>
			</svelte:element>
		</svelte:fragment>

		<svelte:fragment slot="header-right">
			<span class="card-annotation">{transaction.network.name} Transaction</span>
		</svelte:fragment>

		{#if transaction.summary?.description}
			{#if isStandaloneLayout}
				<hr>

				<section>
					<Collapsible
						type="label"
						isOpen
						showTriggerText={false}
					>
						<svelte:fragment slot="title">
							<svelte:element this={`h${headingLevel + 1}`}>Summary</svelte:element>
						</svelte:fragment>

						<svelte:fragment slot="header-right">
							<span class="card-annotation">{transactionProvider}</span>
						</svelte:fragment>

						<div class="card row wrap">
							<svelte:element this={`h${headingLevel + 2}`}>{transaction.summary.description}</svelte:element>
		
							{#if transaction.summary.category}
								<span class="card-annotation">{formatIdentifierToWords(transaction.summary.category)}</span>
							{/if}
						</div>
					</Collapsible>
				</section>
			{:else}
				<div class="row wrap">
					<svelte:element this={`h${headingLevel + 1}`}>{transaction.summary.description}</svelte:element>

					{#if transaction.summary.category}
						<span class="card-annotation">{formatIdentifierToWords(transaction.summary.category)}</span>
					{/if}
				</div>

				<hr>
			{/if}
		{/if}

		{#if !(isSummary && 'erc20Transfers' in transaction && transaction.erc20Transfers?.length && transaction.value === 0n)}
			{#if isStandaloneLayout}
				<hr>
			{/if}

			<section>
				<Collapsible
					type="label"
					isOpen
					showTriggerText={false}
					showContentsOnly={!isStandaloneLayout}
				>
					<svelte:fragment slot="title">
						<svelte:element this={`h${headingLevel + 1}`}>Signed Transaction Data</svelte:element>
					</svelte:fragment>

					<svelte:fragment slot="header-right">
					</svelte:fragment>

					<div class="container inner-layout-{innerLayout}" class:card={isStandaloneLayout}>
						{#if !(isSummary && (contextIsSender || contextIsReceiver))}
							<span class="sender" class:mark={contextIsSender}><!-- transition:fade -->
								<AddressWithLabel
									network={transaction.network}
									address={transaction.fromAddress}
									label={transaction.labels?.fromAddress}
									format={isExhaustive ? 'both' : 'label'}
									addressFormat="middle-truncated"
								/>
							</span>
						{/if}

						<!-- {#if transaction.value} -->
						{#if transaction.value || !isContractCall} <!-- Show "sent 0 to" if can't infer whether isContractCall -->
							<span>
								<span class="action">
									{isSummary && contextIsReceiver
										? transaction.executionStatus !== 'failed' ? 'received' : 'failed to receive'
										: transaction.executionStatus !== 'failed' ? 'sent' : 'failed to send'}
								</span>
								<TokenBalanceWithConversion
									{tokenBalanceFormat}
									showDecimalPlaces={isExhaustive ? 9 : 6}

									token={{
										chainId: network.chainId,
										...transaction.network.nativeCurrency,
									}}

									balance={transaction.value}
									conversionCurrency={transaction.conversion?.quoteCurrency} 
									convertedValue={transaction.conversion?.value}
								/>
							</span>
						{/if}

						{#if isSummary && contextIsReceiver && transaction.fromAddress}
							<span class="sender"><!-- transition:fade -->
								<span>from</span>
								<AddressWithLabel
									network={transaction.network}
									address={transaction.fromAddress}
									label={transaction.labels?.fromAddress}
									format={isExhaustive ? 'both' : 'label'}
									addressFormat="middle-truncated"
								/>
							</span>
						{:else}
							<span class="receiver" class:mark={contextIsReceiver}><!-- transition:fade -->
								{#if isContractCall}
									<span class="action">
										{`${
											transaction.deployedContractAddress ?
												transaction.executionStatus !== 'failed'
													? transaction.value
														? 'and deployed'
														: 'deployed'
													: transaction.value
														? 'and failed to deploy'
														: 'failed to deploy'
											: transaction.toAddress ?
												transaction.executionStatus !== 'failed'
													? transaction.value
														? 'and called'
														: 'called'
													: transaction.value
														? 'and failed to call'
														: 'failed to call'
											:
												transaction.executionStatus !== 'failed'
													? transaction.value
														? 'and called'
														: 'called'
													: transaction.value
														? 'and failed to call'
														: 'failed to call'
										}${
											transaction.deployedContractAddress ?
												' contract'
											: transaction.inputDecoded?.methodHash || transaction.inputDecoded?.methodName ?
												''
											: !transaction.toAddress ? 
												' a contract'
											:
												' contract'
										}`}
									</span>
								{/if}

								<!-- {#if !isContractCall && transaction.value && (transaction.toAddress || transaction.deployedContractAddress)} -->
								{#if !isContractCall && transaction.toAddress || transaction.deployedContractAddress} <!-- Show "sent 0 to" if can't infer whether isContractCall -->
									<span>to</span>
								{/if}

								{#if transaction.toAddress || transaction.deployedContractAddress}
									<AddressWithLabel
										network={transaction.network}
										{
											...(transaction.deployedContractAddress
												? {
													address: transaction.deployedContractAddress,
													label: transaction.labels?.deployedContractAddress,
												}
												: {
													address: transaction.toAddress,
													label: transaction.labels?.toAddress,
												}
											)
										}
										format={isExhaustive ? 'both' : 'label'}
										addressFormat="middle-truncated"
									/>
									{#if transaction.inputDecoded?.methodHash || transaction.inputDecoded?.methodName}
										›
										<abbr
											title={
												transaction.inputDecoded.methodHash && transaction.inputDecoded.methodName
													? `${transaction.inputDecoded.methodName} (${transaction.inputDecoded.methodHash})`
													: transaction.inputDecoded.methodHash || transaction.inputDecoded.methodName
											}
										>
											{transaction.inputDecoded.methodName
												? formatIdentifier(transaction.inputDecoded.methodName, true)
												: transaction.inputDecoded.methodHash}
										</abbr>
									{/if}
								{/if}
							</span>
						{/if}

						{#if (showFees || isExhaustive) && transaction.gasUnitsSpent !== undefined}
							<span class="fee"><!-- transition:fade -->
								<span>for fee</span>
								<TokenBalanceWithConversion
									{tokenBalanceFormat}
									showDecimalPlaces={isExhaustive ? 9 : 6}

									token={{
										chainId: network.chainId,
										...transaction.gasToken,
									}}

									balance={transaction.gasValue}
									conversionCurrency={transaction.conversion?.quoteCurrency}
									conversionRate={transaction.conversion?.gasUnitRate}
									convertedValue={transaction.conversion?.gasValue}
								/>
							</span>
						{/if}

						{#if (isStandaloneLayout || isExhaustive) && (transaction.inputDecoded || transaction.input)}
							<hr>

							<div class="input row inline wrap">
								<span>with input</span>

								{#if transaction.inputDecoded}
									<EthereumParameters
										{network}
										inputDecoded={transaction.inputDecoded}
										{showFormattedNames}
									/>

								{:else if transaction.input}
									<output class:scrollable-list={transaction.input.length > 80}>{transaction.input}</output>
								{/if}
							</div>
						{/if}

						{#if isStandaloneLayout && transaction.nonce}
							<hr>
							
							<footer>
								<small>Nonce #{transaction.nonce}</small>
							</footer>
						{/if}

						{#if isSummary && transaction.blockTimestamp}
							<span class="date"><Date date={transaction.blockTimestamp} layout="vertical" format="relative" /></span>
						{/if}
					</div>
				</Collapsible>
			</section>
		{/if}

		{#if 'erc20Transfers' in transaction && transaction.erc20Transfers?.length}
			{#if isStandaloneLayout}
				<hr>
			{/if}

			<section>
				<Collapsible
					type="label"
					isOpen
					showTriggerText={false}
					showContentsOnly={!isStandaloneLayout}
				>
					<svelte:fragment slot="title">
						<svelte:element this={`h${headingLevel + 1}`}>ERC-20 Token Transfers</svelte:element>
					</svelte:fragment>

					<div
						class="transfers card"
						class:scrollable-list={transaction.erc20Transfers.length > 6}
					>
						{#each transaction.erc20Transfers as erc20Transfer}
							<EthereumErc20Transfer
								{network}
								{erc20Transfer}
								{contextualAddress}

								{detailLevel}
								{tokenBalanceFormat}
								showFees={false}

								layout="inline"
								innerLayout="row"
							/>
						{/each}
					</div>
				</Collapsible>
			</section>
		{/if}

		{#if !isSummary && transaction.trace}
			{#if isStandaloneLayout}
				<hr>
			{/if}

			<section>
				<Collapsible
					type="label"
					isOpen
					showTriggerText={false}
					showContentsOnly={!isStandaloneLayout}
				>
					<svelte:fragment slot="title">
						<svelte:element this={`h${headingLevel + 1}`}>Execution</svelte:element>
					</svelte:fragment>

					<EthereumTransactionTrace
						network={transaction.network}
						trace={transaction.trace}
						{contextualAddress}
						{detailLevel}
						{tokenBalanceFormat}
					/>
				</Collapsible>
			</section>
		{/if}

		{#if !isSummary && transaction.logEvents?.length}
			{#if isStandaloneLayout}
				<hr>
			{/if}

			<section>
				<Collapsible
					type="label"
					isOpen
					showTriggerText={false}
					showContentsOnly={!isStandaloneLayout}
				>
					<svelte:fragment slot="title">
						<svelte:element this={`h${headingLevel + 1}`}>Log Events</svelte:element>
					</svelte:fragment>

					<div class="log-events column" class:scrollable-list={isExhaustive && transaction.logEvents.length > (isStandaloneLayout ? 8 : 16)}>
						{#each transaction.logEvents as logEvent}
							<a
								href={`#/event/${logEvent.indexInBlock}`}
								id={`/event/${logEvent.indexInBlock}`}
								class="log-event"
								class:card={isStandaloneLayout}
							>
								<EthereumLogEvent
									network={transaction.network}
									{logEvent}
									{detailLevel}
									{contextualAddress}
								/>
							</a>
						{/each}
					</div>
				</Collapsible>
			</section>
		{/if}

		{#if isStandaloneLayout && transaction.signature}
			<hr>

			<section>
				<Collapsible
					type="label"
					isOpen
					showTriggerText={false}
					showContentsOnly={false}
				>
					<svelte:fragment slot="title">
						<svelte:element this={`h${headingLevel + 1}`}>Signature</svelte:element>
					</svelte:fragment>

					<svelte:fragment slot="header-right">
						<span class="card-annotation">
							ECDSA (<a href="https://eips.ethereum.org/EIPS/eip-2098" target="_blank">secp256k1</a>)
						</span>
					</svelte:fragment>

					<dl class="signature card">
						<dt>R</dt>
						<dd>
							<output>{transaction.signature.r}</output>
						</dd>

						<dt>S</dt>
						<dd>
							<output>{transaction.signature.s}</output>
						</dd>

						<dt>V</dt>
						<dd>
							<output>{transaction.signature.v}</output>
						</dd>

						{#if transaction.signature.yParity !== undefined}
							<dt>Y Parity</dt>
							<dd>
								<output>{transaction.signature.yParity}</output>
							</dd>
						{/if}
					</dl>
				</Collapsible>
			</section>
		{/if}

		{#if !isSummary && (transaction.transactionId || transaction.blockNumber)}
			{#if isStandaloneLayout}
				<hr>
			{/if}

			<div class="footer bar"><!-- transition:fade -->
				<EthereumTransactionSummary
					network={transaction.network}
					transactionID={transaction.transactionId}
					transactionIndex={transaction.transactionIndex}
					blockNumber={transaction.blockNumber}
					showTransactionID={isStandaloneLayout || isExhaustive}
				/>

				{#if showDate && transaction.blockTimestamp}
					<Date date={transaction.blockTimestamp} />
				{/if}
			</div>
		{/if}
	</Collapsible>
{/if}


<style>
	.transaction {
		/* text-align: center; */

		font-size: 1.025em;
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

	hr {
		width: 100%;
	}
	.container .input {
		font-size: 0.85em;
		width: 100%;
	}
	.container .input output {
		font-size: 1em;
		text-align: start;
	}
	.container .input output.scrollable-list {
		font-size: 0.85em;
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

	.signature {
		grid-template-columns: minmax(max-content, 0.25fr) minmax(max-content, 1fr);
	}

	.transfers {
		gap: 0.33em;
	}
</style>
