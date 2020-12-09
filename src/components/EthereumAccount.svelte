<script lang="ts">
	import type { Covalent } from '../data/analytics/covalent'
	import { getTransactionsByAddress } from '../data/analytics/covalent'
	import { preferredAnalyticsProvider, preferredBaseCurrency } from '../data/ethereum/preferences'
	
	export let address
	export let provider

	$: quoteCurrency = $preferredBaseCurrency as Covalent.QuoteCurrency

	import { formatEther, formatUnits } from 'ethers/lib/utils'

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
		{#await getTransactionsByAddress({address, quoteCurrency})}
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
					value={formatEther(transaction.value)}
					gasValue={formatUnits(transaction.gas_spent, 'gwei')}
					gasValueQuote={transaction.gas_quote}
					quoteToken={quoteCurrency}
					rate={transaction.value_quote / formatEther(transaction.value)}
				/>
			{/each}
		{:catch error}
			<div class="card">
				{error}
			</div>
		{/await}
	{/if}
</div>