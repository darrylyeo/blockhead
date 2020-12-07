<script lang="ts">
	import type { each } from 'svelte/internal'
	import type { Covalent } from '../data/analytics/covalent'
	import { getTransactions } from '../data/analytics/covalent'
	import { preferredAnalyticsProvider, preferredBaseCurrency } from '../data/ethereum/preferences'
	
	export let address
	export let provider

	$: quoteCurrency = $preferredBaseCurrency as Covalent.QuoteCurrency

	function formatDecimal(value, decimalPlaces = 9) {
		return value * 0.1 ** decimalPlaces
	}

	import Address from './Address.svelte'
	import Balance from './Balance.svelte'
	import EthereumTransactionDetails from './EthereumTransactionDetails.svelte'
	import Loading from './Loading.svelte'
</script>

<div class="card">
	<div class="bar">
		<h2><Address {address}/></h2>
		<span class="card-annotation">Ethereum Account</span>
	</div>
	<Balance {provider} {address} />
	{#if $preferredAnalyticsProvider === 'Covalent'}
		{#await getTransactions({address, quoteCurrency})}
			<Loading iconAnimation="hover">
				<img slot="icon" src="/logos/covalent-logomark.svg" alt="Covalent" width="25">
				<p>Fetching transactions...</p>
			</Loading>
		{:then transactions}
			{#each transactions.items as transaction}
				<EthereumTransactionDetails
					transactionID={transaction.tx_hash}
					fromAddress={transaction.from_address}
					toAddress={transaction.to_address}
					token="ETH"
					value={formatDecimal(transaction.value)}
					gasValue={transaction.gas_spent}
					gasValueQuote={transaction.gas_quote}
					quoteToken={quoteCurrency}
					rate={transaction.value / transaction.value_quote}
				/>
			{/each}
		{/await}
	{/if}
</div>