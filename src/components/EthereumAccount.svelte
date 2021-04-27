<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'
	import type { TickerSymbol } from '../data/currency/currency'
	import type { Covalent } from '../data/analytics/covalent'
	import { getERC20TokenTransfers, getTransactionsByAddress } from '../data/analytics/covalent'
	import { preferredAnalyticsProvider, preferredQuoteCurrency } from '../data/ethereum/preferences'
	
	export let network: Ethereum.Network
	export let address
	export let provider

	let detailLevel: 'summary' | 'detailed' | 'exhaustive' = 'summary'
	let showValues: 'original' | 'converted' | 'both' = 'original'
	let showFees = false
	let sortBy: 'value-descending' | 'value-ascending' | 'ticker-ascending' = 'value-descending'
	let showSmallValues = false

	$: quoteCurrency = $preferredQuoteCurrency

	let selectedToken: {
		token: TickerSymbol,
		tokenAddress: Ethereum.ContractAddress,
		tokenIcon: string,
		tokenName: string
	} | undefined


	import { formatEther, formatUnits } from 'ethers/lib/utils'

	function convertCovalentTransaction(transaction: Covalent.Transaction){
		return {
			transactionID: transaction.tx_hash,
			blockNumber: transaction.log_events?.[0]?.block_height,
			date: transaction.block_signed_at,
			isSuccessful: transaction.successful,

			fromAddress: transaction.from_address,
			fromAddressLabel: transaction.from_address_label,
			toAddress: transaction.to_address,
			toAddressLabel: transaction.to_address_label,

			token: 'ETH',
			tokenName: 'Ethereum',

			value: formatEther(transaction.value),
			valueQuote: transaction.value_quote,

			gasValue: formatUnits(transaction.gas_spent, 'gwei'),
			gasValueQuote: transaction.gas_quote,

			quoteToken: quoteCurrency,
			// rate: transaction.value_quote / formatEther(transaction.value),

			logEvents: transaction.log_events,
		}
	}
	function convertCovalentERC20TokenTransaction(transaction: Covalent.ERC20TokenTransaction){
		return {
			...convertCovalentTransaction(transaction),
			transfers: transaction.transfers.map(convertCovalentERC20TokenTransfer)
		}
	}
	function convertCovalentERC20TokenTransfer(transfer: Covalent.ERC20TokenTransfer){
		return {
			transferID: transfer.tx_hash,
			date: transfer.block_signed_at,
			isSuccessful: transfer.successful,

			fromAddress: transfer.from_address,
			fromAddressLabel: transfer.from_address_label,
			toAddress: transfer.to_address,
			toAddressLabel: transfer.to_address_label,

			token: transfer.contract_ticker_symbol,
			tokenName: transfer.contract_name,
			tokenIcon: transfer.logo_url,
			tokenAddress: transfer.contract_address,

			value: formatUnits(transfer.delta, transfer.contract_decimals),
			valueQuote: transfer.delta_quote,

			quoteToken: quoteCurrency,
			rate: transfer.quote_rate,

			logEvents: transfer.log_events,
		}
	}


	import Address from './Address.svelte'
	import Balance from './Balance.svelte'
	import EthereumBalances from './EthereumBalances.svelte'
	import EthereumTransaction from './EthereumTransaction.svelte'
	import Loader from './Loader.svelte'
	import TokenName from './TokenName.svelte'
	import TokenValue from './TokenValue.svelte'
</script>

<style>
	.balances, .transactions {
		display: grid;
		gap: var(--padding-inner);
	}

	.bar {
		/* --padding-inner: 1.25em; */
		--padding-inner: 1em;
	}
	label, button {
		font-size: 0.9em;
	}

	h3 {
		line-height: 1.6
	}
	/* .transactions :global(.token-value-container) {
		font-size: 1.1em;
	} */
</style>

<div class="card">
	<div class="bar">
		<h2><Address {address}/></h2>
		<span class="card-annotation">Ethereum Account</span>
	</div>
	<!-- <Balance {provider} {address} /> -->
	<div class="balances">
		<EthereumBalances
			{network}
			{address}
			analyticsProvider={$preferredAnalyticsProvider}
			quoteCurrency={$preferredQuoteCurrency}
			{sortBy}
			{showSmallValues}
			{showValues}
			isSelectable={true}
			bind:selectedToken={selectedToken}
		>
			<div slot="header" class="bar" let:network let:quoteCurrency let:quoteTotal>
				<h3>{network.name} Tokens (<TokenValue token={quoteCurrency} value={quoteTotal} showPlainFiat={true} />)</h3>
				<label>
					<input type="checkbox" bind:checked={showSmallValues}>
					<span>Show Small Values</span>
				</label>
				<label>
					<span>Sort</span>
					<select bind:value={sortBy}>
						<option value="ticker-ascending">Alphabetical</option>
						<option value="value-descending">Highest Value</option>
						<option value="value-ascending">Lowest Value</option>
					</select>
				</label>
				<label>
					<span>Show</span>
					<select bind:value={showValues}>
						<option value="original">Token Amounts</option>
						<option value="converted">Quote Values</option>
						<option value="both">Amounts and Values</option>
					</select>
				</label>
			</div>
		</EthereumBalances>
	</div>
	<hr>
	<div class="transactions">
		{#if $preferredAnalyticsProvider === 'Covalent'}
			{#if !selectedToken}
				<!-- Regular Ethereum Transactions -->
				<Loader
					loadingIcon={'/logos/covalent-logomark.svg'}
					loadingIconName={'Covalent'}
					loadingMessage="Retrieving {network.name} transactions from {$preferredAnalyticsProvider}..."
					errorMessage="Error retrieving {network.name} transactions from {$preferredAnalyticsProvider}"
					fromPromise={() => getTransactionsByAddress({chainID: network.chainId, address, includeLogs: true, quoteCurrency})}
					let:then={transactions}
				>
					<svelte:fragment slot="header" let:status>
						<div class="bar">
							<h3>
								Transactions
								{#if status === 'resolved'}({transactions.items.length}){/if}
							</h3>
							<label>
								<input type="checkbox" bind:checked={showFees}>
								<span>Show Fees</span>
							</label>
							<label>
								<span>View</span>
								<select bind:value={detailLevel}>
									<option value="summary">Summary</option>
									<option value="detailed">Detailed</option>
									<option value="exhaustive">Exhaustive</option>
								</select>
							</label>
						</div>
					</svelte:fragment>

					{#each transactions.items as transaction}
						<EthereumTransaction
							contextualAddress={address}
							{detailLevel}
							{showValues}
							{showFees}
							{...convertCovalentTransaction(transaction)}
						/>
					{/each}
				</Loader>
			{:else}
				<!-- ERC-20 Transactions -->
				<Loader
					loadingIcon={'/logos/covalent-logomark.svg'}
					loadingIconName={'Covalent'}
					loadingMessage="Retrieving ERC-20 transactions from {$preferredAnalyticsProvider}..."
					errorMessage="Error retrieving ERC-20 transactions from {$preferredAnalyticsProvider}"
					fromPromise={() => getERC20TokenTransfers({chainID: network.chainId, address, contractAddress: selectedToken.tokenAddress, quoteCurrency})}
					let:then={transactions}
				>
					<svelte:fragment slot="header" let:status>
						<div class="bar">
							<h3>
								{selectedToken.tokenName}
								(<TokenName token={selectedToken.token} tokenAddress={selectedToken.tokenAddress} tokenIcon={selectedToken.tokenIcon} />)
								Transactions
								{#if status === 'resolved'}({transactions.items.length}){/if}
							</h3>
							{#if detailLevel !== 'exhaustive'}
								<label>
									<input type="checkbox" bind:checked={showFees}>
									<span>Show Fees</span>
								</label>
							{/if}
							<label>
								<span>View</span>
								<select bind:value={detailLevel}>
									<option value="summary">Summary</option>
									<option value="detailed">Detailed</option>
									<option value="exhaustive">Exhaustive</option>
								</select>
							</label>
							<button on:click={() => selectedToken = undefined}>Back</button>
						</div>
					</svelte:fragment>

					{#each transactions.items as transaction}
						<EthereumTransaction
							contextualAddress={address}
							{detailLevel}
							{showValues}
							{showFees}
							{...convertCovalentERC20TokenTransaction(transaction)}
						/>
					{/each}
				</Loader>
			{/if}
		{/if}
	</div>
</div>