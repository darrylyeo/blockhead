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


	// Functions
	import { formatPercent } from '$/utils/formatPercent'


	// Components
	import AddressWithLabel from './AddressWithLabel.svelte'
	import BlockNumber from './BlockNumber.svelte'
	import Collapsible from './Collapsible.svelte'
	import DateTime from './DateTime.svelte'
	import FilecoinBlockCid from './FilecoinBlockCid.svelte'
	import FilecoinTransactions from './FilecoinTransactions.svelte'
	import FilecoinTransfers from './FilecoinTransfers.svelte'
	import TokenBalance from './TokenBalance.svelte'
	import TokenBalanceWithConversion from './TokenBalanceWithConversion.svelte'
	import TransactionId from './TransactionId.svelte'
	import TweenedNumber from './TweenedNumber.svelte'


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
					transactionId={transaction.cid}
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

	<div
		class="row wrap"
		class:card={layout === 'default'}
	>
		{#if !(isSummary && (contextIsSender || contextIsReceiver)) && transaction.fromActor}
			<span class="sender" transition:fade>
				<AddressWithLabel
					{network}
					address={transaction.fromActor.shortAddress ?? transaction.fromActor.robustAddress}
					label={transaction.labels?.fromActor?.label}
					format="address-label"
					addressFormat="middle-truncated"
				/>
			</span>
		{/if}

		{#if transaction.method}
			<span>
				called
				<output title="actor method">{transaction.method.name}</output>
			</span>
		{/if}

		{#if transaction.value > 0n}
			<span>
				{#if transaction.method}and{/if}
				<span class="action">
					{isSummary && contextIsReceiver
						? transaction.receipt?.exitCode === 0 ? 'received' : 'failed to receive'
						: transaction.receipt?.exitCode === 0 ? 'sent' : 'failed to send'}
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
					format="address-label"
					addressFormat="middle-truncated"
				/>
				{#if transaction.labels?.fromActor?.isSigned}✔{/if}
			</span>

		{:else if transaction.toActor}
			<span class="receiver" transition:fade>
				{#if transaction.method && !(transaction.value > 0n)}
					<span>on</span>
				{:else}
					<span>to</span>
				{/if}
				<AddressWithLabel
					{network}
					address={transaction.toActor.shortAddress ?? ('robustAddress' in transaction.toActor ? transaction.toActor.robustAddress : undefined)}
					label={transaction.labels?.toActor?.label}
					format="address-label"
					addressFormat="middle-truncated"
				/>
				{#if transaction.labels?.toActor?.isSigned}✔{/if}
			</span>
		{/if}

		{#if showFees && transaction.receipt?.gasSpent !== undefined}
			<span class="fee" transition:fade>
				<span>for fee</span>
				<TokenBalanceWithConversion
					{tokenBalanceFormat}
					showDecimalPlaces={isExhaustive ? 9 : 6}

					token={{
						chainId: network.chainId,
						...transaction.gasToken,
					}}

					balance={transaction.receipt.gasSpent}
				/>
			</span>
		{/if}

		{#if isSummary && transaction.tipset?.timestamp}
			<small>
				<DateTime date={transaction.tipset.timestamp} />
			</small>
		{/if}
	</div>

	{#if !isSummary && (
		transaction.gasParams !== undefined
		|| transaction.tipset?.baseGasRate !== undefined
		|| transaction.receipt?.gasSpent !== undefined
		|| transaction.fees !== undefined
	)}
		<hr>

		<section>
			<Collapsible
				isOpen
			>
				<svelte:fragment slot="title">
					<svelte:element this={`h${headingLevel + 1}`}>
						Fees
					</svelte:element>
				</svelte:fragment>

				<svelte:fragment slot="header-right">
					<span class="card-annotation">
						<a href="https://spec.filecoin.io/systems/filecoin_vm/gas_fee/" target="_blank">EIP-1559 Auction</a>
					</span>
				</svelte:fragment>

				<div class="card">
					<dl>
						{#if transaction.gasParams !== undefined && transaction.fees !== undefined}
							{@const estimatedTotalFees = transaction.gasParams.gasUnitRateCap * transaction.gasParams.gasLimit}

							<dt>
								<abbr title="Gas Limit × Max Gas Rate">
									Estimated Total Fees
								</abbr>
							</dt>
							<dd>
								<span>
									<TokenBalance
										token={network.nativeCurrency}
										balance={-estimatedTotalFees || -0}
										isBalanceChange
										showDecimalPlaces={network.nativeCurrency.decimals}
									/>
								</span>

								<dl>
									<dt>Gas Limit</dt>
									<dd>
										<TweenedNumber value={transaction.gasParams.gasLimit} /> gas units
									</dd>
									
									<dt>Max Gas Rate</dt>
									<dd>
										<span>
											<TokenBalance
												token={network.nativeCurrency}
												balance={transaction.gasParams.gasUnitRateCap}
												showSmallestUnits
											/> / gas unit
										</span>
									</dd>
								</dl>
							</dd>

							<dt>Gas Premium</dt>
							<dd>
								<span>
									<TokenBalance
										token={network.nativeCurrency}
										balance={transaction.gasParams.gasPremium}
										showSmallestUnits
									/> / gas unit
								</span>
							</dd>
						{/if}

						{#if
							(transaction.gasParams !== undefined && transaction.fees !== undefined)
							&& (
								transaction.tipset?.baseGasRate !== undefined
								|| transaction.receipt?.gasSpent !== undefined
							)
						}
							<hr>
						{/if}

						{#if transaction.tipset?.baseGasRate !== undefined}
							<dt>
								Base Gas Rate
								<small>(tipset{#if transaction.tipset?.number !== undefined} <BlockNumber
									{network}
									blockNumber={transaction.tipset.number}
								/>{/if})</small>
							</dt>
							<dd>
								<TokenBalance
									token={{
										chainId: network.chainId,
										...network.nativeCurrency
									}}
									balance={transaction.tipset.baseGasRate}
									showSmallestUnits
								/> / gas unit
							</dd>
						{/if}

						{#if transaction.receipt?.gasSpent !== undefined}
							<dt>Used Gas</dt>
							<dd>
								<span>
									<TweenedNumber value={transaction.receipt?.gasSpent} /> gas units
								</span>
								{#if transaction.gasParams}
									<small>({formatPercent(Number(transaction.receipt.gasSpent) / Number(transaction.gasParams.gasLimit))} of <abbr title="Gas Limit">Gas Limit</abbr>)</small>
								{/if}
							</dd>

							{#if transaction.gasParams !== undefined}
								<dt>Unused Gas</dt>
								<dd>
									<span>
										<TweenedNumber value={transaction.gasParams.gasLimit - transaction.receipt.gasSpent} /> gas units
									</span>

									<small
										>(<span>{formatPercent(Number(transaction.gasParams.gasLimit - transaction.receipt.gasSpent) / Number(transaction.gasParams.gasLimit))} of <abbr title="Gas Limit">Gas Limit</abbr></span
										>・<span>{formatPercent(Number(transaction.gasParams.gasLimit) / Number(transaction.receipt.gasSpent) - 1)} <abbr title="≥ 10%">overbid</abbr></span
									>)</small>
								</dd>
							{/if}
						{/if}

						{#if transaction.gasParams !== undefined}
							{@const estimatedTotalFees = transaction.gasParams.gasUnitRateCap * transaction.gasParams.gasLimit}

							{#if transaction.fees !== undefined}
								{@const totalBurnedFees = transaction.fees.baseFeeBurn + transaction.fees.overEstimationBurn}
								{@const totalMinerFees = transaction.fees.minerTip + transaction.fees.minerPenalty}
								{@const totalFees = totalBurnedFees + totalMinerFees}

								<hr>

								<dt>Total Fees</dt>
								<dd>
									<span>
										<TokenBalance
											token={{
												chainId: network.chainId,
												...network.nativeCurrency
											}}
											balance={-totalFees || -0}
											isBalanceChange
											showDecimalPlaces={network.nativeCurrency.decimals}
										/>
										<small>({formatPercent(Number(totalFees) / Number(estimatedTotalFees))} of <abbr title="Estimated Total Fees">Estimated Total Fees</abbr>)</small>
									</span>

									<dl>
										<dt>Burned</dt>
										<dd>
											<span>
												<TokenBalance
													token={{
														chainId: network.chainId,
														...network.nativeCurrency
													}}
													balance={-totalBurnedFees || -0}
													isBalanceChange
													showDecimalPlaces={network.nativeCurrency.decimals}
												/>
											</span>

											<dl>
												<dt>
													<abbr
														title="Base Gas Rate × Used Gas"
													>
														Base Fee
													</abbr>
												</dt>
												<dd>
													<TokenBalance
														token={{
															chainId: network.chainId,
															...network.nativeCurrency
														}}
														balance={-transaction.fees.baseFeeBurn || -0}
														isBalanceChange
														showDecimalPlaces={network.nativeCurrency.decimals}
													/>
													<small>({formatPercent(Number(transaction.fees.baseFeeBurn) / Number(totalBurnedFees))})</small>
												</dd>

												<dt>
													<abbr
														title="Unused Gas × (Base Gas Rate + Miner Premium)"
													>
														Overestimation Penalty
													</abbr>
												</dt>
												<dd>
													<TokenBalance
														token={{
															chainId: network.chainId,
															...network.nativeCurrency
														}}
														balance={-transaction.fees.overEstimationBurn || -0}
														isBalanceChange
														showDecimalPlaces={network.nativeCurrency.decimals}
													/>
													<small>({formatPercent(Number(transaction.fees.overEstimationBurn) / Number(totalBurnedFees))})</small>
												</dd>
											</dl>
										</dd>

										<dt>Miner</dt>
										<dd>
											<span class="total">
												<TokenBalance
													token={{
														chainId: network.chainId,
														...network.nativeCurrency
													}}
													balance={-totalMinerFees || -0}
													isBalanceChange
													showDecimalPlaces={network.nativeCurrency.decimals}
												/>
											</span>
											<dl>
												<dt>
													<abbr title="Gas Limit × Gas Premium">
														Tip
													</abbr>
												</dt>
												<dd>
													<TokenBalance
														token={{
															chainId: network.chainId,
															...network.nativeCurrency
														}}
														balance={-transaction.fees.minerTip || -0}
														isBalanceChange
														showDecimalPlaces={network.nativeCurrency.decimals}
													/>
												</dd>

												<dt>Penalty</dt>
												<dd>
													<TokenBalance
														token={{
															chainId: network.chainId,
															...network.nativeCurrency
														}}
														balance={-transaction.fees.minerPenalty || -0}
														isBalanceChange
														showDecimalPlaces={network.nativeCurrency.decimals}
													/>
												</dd>
											</dl>
										</dd>
									</dl>
								</dd>

								<hr>

								<dt>Refund</dt>
								<dd>
									<TokenBalance
										token={{
											chainId: network.chainId,
											...network.nativeCurrency
										}}
										balance={transaction.fees.refund}
										isBalanceChange
										showDecimalPlaces={network.nativeCurrency.decimals}
									/>
									<small>({formatPercent(Number(transaction.fees.refund) / Number(estimatedTotalFees))} of <abbr title="Estimated Total Fees">Estimated Total Fees</abbr>)</small>
								</dd>
							{/if}
						{/if}
					</dl>
				</div>
			</Collapsible>
		</section>
	{/if}

	{#if transaction.internalTransactions?.length}
		<hr>

		<section>
			<FilecoinTransactions
				transactions={transaction.internalTransactions}
				title="Internal Transactions"
				isInternal
				headingLevel={headingLevel + 1}
				layout="inline"
			/>
		</section>
	{/if}

	{#if transaction.transfers?.length}
		<hr>

		<section>
			<FilecoinTransfers
				{network}
				transfers={transaction.transfers}
				transfersCount={transaction.transfers.length}
				headingLevel={headingLevel + 1}
			/>
		</section>
	{/if}

	{#if !isSummary && !isInternal}
		<hr>

		<footer class="footer bar">
			<span class="row inline wrap" title="Transaction {transaction.cid}">
				<span>
					Transaction
					<TransactionId
						{network}
						transactionId={transaction.cid}
						format="middle-truncated"
						linked
						let:formattedTransactionId
					>
						{formattedTransactionId}
					</TransactionId>
				</span>

				{#if transaction.blocks?.length}
					<span>
						in
						{transaction.blocks.length === 1 ? 'block' : 'blocks'}

						{#each transaction.blocks as block (block.cid)}
							{' '}
							<FilecoinBlockCid
								{network}
								blockCid={block.cid}
								format="middle-truncated"
							/>
						{/each}
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

	small {
		opacity: 0.66;
	}

	dl {
		--level: 0;

		dl {
			--level: 1;

			dl {
				--level: 2;

				dl {
					--level: 3;

					dl {
						--level: 4;
					}
				}
			}
		}
	}

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

	dd dd:has(> dl) > :first-child,
	dd:has(> dl) dd:not(:has(> dl)) {
		padding-inline-start: calc(
			(var(--level) - 1) * var(--icon-size)
			+ (var(--level) - 2) * var(--padding-inner)
		);

		&:before {
			content: '┖ ';
			width: var(--icon-size);
			display: inline-block;
		}
	}
</style>
