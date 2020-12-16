<script lang="ts">
	import { getERC20TokenTransfers } from '../data/analytics/covalent'
	import { getTransactionsByAddress } from '../data/analytics/covalent'
	import { preferredAnalyticsProvider, preferredQuoteCurrency } from '../data/ethereum/preferences'
	
	export let address
	export let provider

	let detailLevel: 'summary' | 'detailed' | 'exhaustive' = 'summary'
	let showValues: 'original' | 'converted' | 'both' = 'original'
	let showFees = false
	let sortBy: 'value-descending' | 'value-ascending' | 'ticker-ascending' = 'value-descending'
	let showZeroBalances = false

	$: quoteCurrency = $preferredQuoteCurrency

	import { formatEther, formatUnits } from 'ethers/lib/utils'

	import Address from './Address.svelte'
	import Balance from './Balance.svelte'
	import EthereumBalances from './EthereumBalances.svelte'
	import EthereumTransactionDetails from './EthereumTransactionDetails.svelte'
	import Loading from './Loading.svelte'
	import TokenName from './TokenName.svelte'
</script>

<style>
	.balances, .transactions {
		display: grid;
		gap: var(--padding-inner);
	}
</style>

<div class="card">
	<div class="bar">
		<h2><Address {address}/></h2>
		<span class="card-annotation">Ethereum Account</span>
	</div>
	<!-- <Balance {provider} {address} /> -->
	<div class="balances">
		<div class="bar">
			<h3>Balances</h3>
			<label>
				<input type="checkbox" bind:checked={showZeroBalances}>
				<span>Show Zero Balances</span>
			</label>
			<label>
				<span>Sort</span>
				<select bind:value={sortBy}>
					<option value="value-descending">Highest Value</option>
					<option value="value-ascending">Lowest Value</option>
					<option value="ticker-ascending">Alphabetical</option>
				</select>
			</label>
		</div>
		<EthereumBalances analyticsProvider={$preferredAnalyticsProvider} conversionCurrency={$preferredQuoteCurrency} {sortBy} {showZeroBalances} {showValues} {address} />
	</div>
	<hr>
	<div class="transactions">
		{#if $preferredAnalyticsProvider === 'Covalent'}
			{#await getTransactionsByAddress({address, quoteCurrency})}
				<Loading iconAnimation="hover">
					<img slot="icon" src="/logos/covalent-logomark.svg" alt="Covalent" width="25">
					<p>Fetching transactions...</p>
				</Loading>
			{:then transactions}
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
						fromAddressLabel={transaction.from_address_label}
						toAddress={transaction.to_address}
						toAddressLabel={transaction.to_address_label}
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

			<hr>

			{#await getERC20TokenTransfers({address, contractAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F', quoteCurrency})}
				<Loading iconAnimation="hover">
					<img slot="icon" src="/logos/covalent-logomark.svg" alt="Covalent" width="25">
					<p>Fetching ERC-20 transactions...</p>
				</Loading>
			{:then transactions}
				<div class="bar">
					<h3><TokenName token="DAI" /> Transactions</h3>
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
						fromAddressLabel={transaction.from_address_label}
						toAddress={transaction.to_address}
						toAddressLabel={transaction.to_address_label}
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