<script lang="ts">
	import type { Covalent } from '../data/analytics/covalent'
	import { getTransactionsByAddress } from '../data/analytics/covalent'
	import { preferredAnalyticsProvider, preferredBaseCurrency } from '../data/ethereum/preferences'
	
	export let address
	export let provider

	let detailLevel: 'summary' | 'detailed' | 'exhaustive' = 'summary'
	let showValues: 'original' | 'converted' | 'both' = 'original'
	let showFees = false

	$: quoteCurrency = $preferredBaseCurrency as Covalent.QuoteCurrency

	import { formatEther, formatUnits } from 'ethers/lib/utils'

	import Address from './Address.svelte'
	import Balance from './Balance.svelte'
	import EthereumTransactionDetails from './EthereumTransactionDetails.svelte'
	import Loading from './Loading.svelte'
</script>

<style>
	.transactions {
		display: grid;
		gap: var(--padding-inner);
	}
</style>

<div class="card">
	<div class="bar">
		<h2><Address {address}/></h2>
		<span class="card-annotation">Ethereum Account</span>
	</div>
	<Balance {provider} {address} />
	<div class="transactions">
		{#if $preferredAnalyticsProvider === 'Covalent'}
			{#await getTransactionsByAddress({address, quoteCurrency})}
				<Loading iconAnimation="hover">
					<img slot="icon" src="/logos/covalent-logomark.svg" alt="Covalent" width="25">
					<p>Fetching transactions...</p>
				</Loading>
			{:then transactions}
				<hr>
				<div class="bar">
					<h3>Transactions</h3>
					<label>
						<span>Show</span>
						<select bind:value={detailLevel}>
							<option value="summary">Summary</option>
							<option value="detailed">Detailed</option>
							<option value="exhaustive">Exhaustive</option>
						</select>
					</label>
					<label>
						<span>Values</span>
						<select bind:value={showValues}>
							<option value="original">Original</option>
							<option value="converted">Converted</option>
							<option value="both">Both</option>
						</select>
					</label>
					{#if detailLevel !== 'exhaustive'}
						<label>
							<input type="checkbox" bind:checked={showFees}>
							<span>Fees</span>
						</label>
					{/if}
				</div>
				{#each transactions.items as transaction}
					<EthereumTransactionDetails
						contextualAddress={address}
						{detailLevel}
						{showValues}
						{showFees}
						transactionID={transaction.tx_hash}
						date={transaction.block_signed_at}
						fromAddress={transaction.from_address}
						toAddress={transaction.to_address}
						token="ETH"
						value={formatEther(transaction.value)}
						valueQuote={transaction.value_quote}
						gasValue={formatUnits(transaction.gas_spent, 'gwei')}
						gasValueQuote={transaction.gas_quote}
						quoteToken={quoteCurrency}
					/>
						<!-- rate={transaction.value_quote / formatEther(transaction.value)} -->
				{/each}
			{:catch error}
				<div class="card">
					{error}
				</div>
			{/await}
		{/if}
	</div>
</div>