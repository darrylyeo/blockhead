<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'
	import type { TickerSymbol } from '../data/currency/currency'
	import type { Covalent } from '../data/analytics/covalent'
	import type { PriceScale } from './PriceChart.svelte'
	import { getERC20TokenTransfers, getTransactionsByAddress } from '../data/analytics/covalent'
	import { preferredAnalyticsProvider, preferredQuoteCurrency } from '../data/ethereum/preferences'


	export let network: Ethereum.Network
	export let addressOrENSName: Ethereum.Address | string
	export let provider: Ethereum.Provider


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


	let balances: Covalent.ERC20TokenOrNFTContractWithBalance[]

	let priceScale: PriceScale


	import Address from './Address.svelte'
	import Balance from './Balance.svelte'
	import CovalentPriceChart from './CovalentPriceChart.svelte'
	import EnsName from './EnsName.svelte'
	import EnsResolutionLoader from './EnsResolutionLoader.svelte'
	import EthereumBalances from './EthereumBalances.svelte'
	import EthereumTransactionCovalent from './EthereumTransactionCovalent.svelte'
	import Loader from './Loader.svelte'
	import TokenName from './TokenName.svelte'
	import TokenValue from './TokenValue.svelte'
</script>


<style>
	.bar {
		/* --padding-inner: 1.25em; */
		--padding-inner: 1em;
	}
	label, button {
		font-size: 0.9em;
	}

	h3 {
		line-height: 1.6;
	}
	/* .transactions :global(.token-value-container) {
		font-size: 1.1em;
	} */

	.ethereum-account {
		--echart-height: 20rem;
	}
</style>


<div class="ethereum-account card">
	<EnsResolutionLoader
		{addressOrENSName}
		{provider}
		passiveReverseResolution
		let:address
		let:ensName
		let:isReverseResolving
	>
		<div slot="header" class="bar">
			<div class="row-inline">
				{#if isReverseResolving}
					{#if address}
						<h2><Address {network} {address} /></h2>
					{/if}
					{#if ensName}
						<EnsName {ensName} />
					{/if}
				{:else}
					{#if ensName}
						<h2><EnsName {ensName} /></h2>
					{/if}
					{#if address}
						<Address {network} {address} />
					{/if}
				{/if}
			</div>
			<span class="card-annotation">Ethereum Account</span>
		</div>

		<!-- <Balance {provider} {address} /> -->
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
			bind:balances={balances}
		>
			<svelte:fragment slot="header" let:network let:quoteCurrency let:quoteTotal>
				<hr>

				<div class="bar">
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
							<option value="original">Balances</option>
							<option value="converted">Quotes</option>
							<option value="both">Balances + Quotes</option>
							<!-- <option value="original">Token Amounts</option>
							<option value="converted">Quote Values</option>
							<option value="both">Amounts and Values</option> -->
						</select>
					</label>
				</div>
			</svelte:fragment>
		</EthereumBalances>

		<hr>

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

					<div class="transactions-list column" class:scrollable-list={transactions.items.length > 7}>
						{#each transactions.items as transaction}
							<div class="card">
								<EthereumTransactionCovalent
									{network}
									{transaction}
									quoteCurrency={$preferredQuoteCurrency}
									contextualAddress={address}
									{detailLevel}
									{showValues}
									{showFees}
									layout="inline"
								/>
							</div>
						{:else}
							<div class="card">No transactions yet.</div>
						{/each}
					</div>
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
								(<TokenName tokenName={selectedToken.tokenName} token={selectedToken.token} tokenAddress={selectedToken.tokenAddress} tokenIcon={selectedToken.tokenIcon} />)
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

					<div class="transactions-list column" class:scrollable-list={transactions.items.length > 7}>
						{#each transactions.items as erc20TokenTransaction}
							<div class="card">
								<EthereumTransactionCovalent
									{network}
									{erc20TokenTransaction}
									quoteCurrency={$preferredQuoteCurrency}
									contextualAddress={address}
									{detailLevel}
									{showValues}
									{showFees}
									layout="inline"
								/>
							</div>
						{:else}
							<div class="card">No transactions yet.</div>
						{/each}
					</div>
				</Loader>
			{/if}
		{/if}

		{#if balances?.length}
			<CovalentPriceChart
				analyticsProvider={$preferredAnalyticsProvider}
				quoteCurrency={$preferredQuoteCurrency}
				chainID={network.chainId}
				currencies={
					selectedToken ? [selectedToken.tokenAddress] :
					balances ? balances.map(tokenWithBalance => tokenWithBalance.contract_address) :
					[]
				}
				{priceScale}
			>
				<svelte:fragment slot="header">
					<hr>

					<div class="bar">
						<h3>Chart</h3>
						<label>
							<span>Price Scale</span>
							<select bind:value={priceScale}>
								<option value="logarithmic">Logarithmic</option>
								<option value="linear">Linear</option>
								<option value="linearFromZero">Linear From Zero</option>
							</select>
						</label>
					</div>
				</svelte:fragment>
			</CovalentPriceChart>
		{/if}
	</EnsResolutionLoader>
</div>