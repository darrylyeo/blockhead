<script lang="ts">
	import type { Ethereum } from '../data/networks/types'
	import { getViemPublicClient } from '../data/networkProviders'
	import type { NetworkProvider } from '../data/networkProviders/types'
	import type { TickerSymbol } from '../data/currencies'
	import type { Covalent } from '../api/covalent'
	import type { PriceScale } from './PriceChart.svelte'
	import { getERC20TokenTransfers, getTransactionsByAddress } from '../api/covalent'
	import { preferences } from '../state/preferences'
	import type { TokenBalancesProvider } from '../data/tokenBalancesProvider'
	import { TransactionProvider } from '../data/transactionProvider'


	export let network: Ethereum.Network
	export let networkProvider: NetworkProvider
	export let accountId: Ethereum.Address | string
	export let filterQuery: Ethereum.Address | Ethereum.ContractAddress | Ethereum.BlockNumber

	export let tokenBalancesProvider: TokenBalancesProvider
	export let transactionProvider: TransactionProvider

	$: tokenBalancesProvider = $$props.tokenBalancesProvider || $preferences.tokenBalancesProvider
	$: transactionProvider = $$props.transactionProvider || $preferences.transactionProvider

	let publicClient: Ethereum.PublicClient | undefined
	$: publicClient = network && networkProvider && getViemPublicClient({
		network,
		networkProvider: networkProvider,
	})


	let detailLevel: 'summary' | 'detailed' | 'exhaustive' = 'detailed'
	let tokenBalanceFormat: 'original' | 'converted' | 'both' = 'original'
	let showFees = false
	let sortBy: 'value-descending' | 'value-ascending' | 'ticker-ascending' = 'value-descending'
	let showSmallValues = false

	export let headingLevel: 1 | 2 | 3 | 4 | 5 | 6 = 2
	export let isOpen = true
	export let resolveAccountNames = true

	$: quoteCurrency = $preferences.quoteCurrency


	let selectedToken: Ethereum.ERC20Token | undefined

	import { isAddress } from 'ethers'

	$: if(isAddress(filterQuery) && balances){
		selectedToken = balances
			.find(({token}) => token.address.toLowercase() === filterQuery.toLowerCase())
	}
	// $: if(selectedToken)
	// 	filterQuery = selectedToken.address


	let balances: Covalent.ERC20TokenOrNFTContractWithBalance[] = []

	let priceScale: PriceScale


	import AccountIdResolver from './AccountIdResolver.svelte'
	import Address from './Address.svelte'
	import Balance from './Balance.svelte'
	import CovalentPriceChart from './CovalentPriceChart.svelte'
	import EnsName from './EnsName.svelte'
	import EthereumBalances from './EthereumBalances.svelte'
	import EthereumContractExplorer from './EthereumContractExplorer.svelte'
	import EthereumTransaction from './EthereumTransaction.svelte'
	import EthereumTransactionCovalent from './EthereumTransactionCovalent.svelte'
	import EthereumTransactionMoralis from './EthereumTransactionMoralis.svelte'
	// import EthereumTransactionEtherspot from './EthereumTransactionEtherspot.svelte'
	import EthereumTransactionsLoader from './EthereumTransactionsLoader.svelte'
	import EthereumTransactionsERC20Loader from './EthereumTransactionsERC20Loader.svelte'
	import InlineContainer from './InlineContainer.svelte'
	import TokenName from './TokenName.svelte'
	import TokenBalance from './TokenBalance.svelte'
	import TokenBalanceFormatSelect from './TokenBalanceFormatSelect.svelte'
	import TweenedNumber from './TweenedNumber.svelte'


	import { fade, scale } from 'svelte/transition'
</script>


<style>
	.bar {
		/* --padding-inner: 1.25em; */
		--padding-inner: 1em;
	}

	h3 {
		line-height: 1.6;
	}
	/* .transactions :global(.token-balance-container) {
		font-size: 1.1em;
	} */

	.ethereum-account {
		--echart-height: 20rem;
	}
</style>


<div class="ethereum-account card">
	<AccountIdResolver
		{accountId}
		resolveToName={resolveAccountNames ? undefined : false}
		passiveResolveToName
		let:address
		let:ensName
		showIf={({address}) => address}
		layout="collapsible"
		collapsibleType="label"
		{isOpen}
	>
		<div slot="header"
			let:address
			let:ensName
			class="bar wrap"
			let:isOpen
			let:toggle
		>
			<div class="row-inline">
				<slot name="title" {network} {address} {ensName}>
					{#if address}
						<svelte:element this={`h${headingLevel}`}><Address {network} {address} /></svelte:element>
						{#if ensName}
							<span class="align-start" transition:scale>
								<EnsName {ensName} showAvatar />
							</span>
						{/if}
					{:else if ensName}
						<svelte:element this={`h${headingLevel}`}><EnsName {ensName} showAvatar /></svelte:element>
					{/if}
				</slot>
			</div>

			<span class="card-annotation">
				<slot name="annotation">
					{network.name} 
					{#if publicClient}
						{#await publicClient.getBytecode({ address })}
							Address
						{:then contractCode}
							{#if contractCode === '0x'}
								Account
							{:else}
								<abbr title={contractCode}>Contract</abbr>
							{/if}
						{:catch}
							Address
						{/await}
					{/if}
				</slot>
			</span>

			{#if toggle}
				<button
					class="small"
					data-after={isOpen ? '▲' : '▼'}
					on:click={toggle}
				/>
			{/if}
		</div>

		<EthereumContractExplorer
			contractAddress={address}
			{network}
			{transactionProvider}
		>
			<svelte:fragment slot="header">
				<hr>
			</svelte:fragment>

			<slot slot="title" name="contract-title" {network} {address}>
				<svelte:element this={`h${headingLevel + 1}`}>
					<Address {network} {address}>Contract Code</Address>
				</svelte:element>
			</slot>
		</EthereumContractExplorer>

		<!-- <Balance {network} {networkProvider} {address} /> -->
		<EthereumBalances
			{network}
			{address}
			{tokenBalancesProvider}
			{quoteCurrency}
			{sortBy}
			{showSmallValues}
			{tokenBalanceFormat}
			isSelectable={true}
			bind:selectedToken
			bind:balances
		>
			<svelte:fragment slot="header" let:summary>
				{#if balances.length}
					<hr>

					<div class="bar wrap">
						<svelte:element this={`h${headingLevel + 1}`}>Balances (<TokenBalance symbol={summary.quoteCurrency} balance={summary.quoteTotal} showPlainFiat={true} />)</svelte:element>

						<div role="toolbar" class="row wrap">
							<TokenBalanceFormatSelect
								type="checkboxes"
								bind:tokenBalanceFormat
								quoteCurrency={summary.quoteCurrency}
							/>
			
							<label>
								<input type="checkbox" bind:checked={showSmallValues}>
								<span>Small</span>
							</label>
			
							<label>
								<span>Sort</span>
								<select bind:value={sortBy}>
									<option value="ticker-ascending">A–Z</option>
									<option value="value-descending">Highest</option>
									<option value="value-ascending">Lowest</option>
								</select>
							</label>
						</div>
					</div>
				{/if}
			</svelte:fragment>
		</EthereumBalances>

		<hr>

		<div class="stack">
			{#if !selectedToken}
				<div class="column" transition:fade|global>
					<!-- Regular Ethereum Transactions -->
					<EthereumTransactionsLoader
						{network}
						{networkProvider}
						{transactionProvider}
						{address}
						{quoteCurrency}
						includeLogs={detailLevel === 'exhaustive'}
						showIf={transactions => transactions}
						let:transactions
					>
						<svelte:fragment slot="header"
							let:status
							let:transactions
							let:pagination
						>
							<summary class="bar wrap">
								<svelte:element this={`h${headingLevel + 1}`}>
									Transactions
									<InlineContainer isOpen={status === 'resolved'}>(<TweenedNumber value={transactions.length} /><InlineContainer isOpen={pagination?.hasNextPage}>+</InlineContainer>)</InlineContainer>
								</svelte:element>

								<div role="toolbar" class="row wrap">
									<label>
										<input type="checkbox" bind:checked={showFees}>
										<span>Fees</span>
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
							</summary>
						</svelte:fragment>

						<div class="transactions-list column" class:scrollable-list={transactions.length > 7}>
							{#each transactions as transaction}
								{#if transactionProvider === TransactionProvider.Covalent}
									<a class="card" id={transaction.tx_hash} href="#{transaction.tx_hash}">
										<EthereumTransactionCovalent
											{network}
											{transaction}
											{quoteCurrency}
											contextualAddress={address}
											{detailLevel}
											{tokenBalanceFormat}
											{showFees}
											layout="inline"
										/>
									</a>

								{:else if transactionProvider === TransactionProvider.Moralis}
									<a class="card" id={transaction.hash} href="#{transaction.hash}">
										<EthereumTransactionMoralis
											{network}
											{transaction}
											{quoteCurrency}
											contextualAddress={address}
											{detailLevel}
											{tokenBalanceFormat}
											{showFees}
											layout="inline"
										/>
									</a>

								<!-- {:else if transactionProvider === TransactionProvider.Etherspot}
									<a class="card" id={transaction.hash} href="#{transaction.hash}">
										<EthereumTransactionEtherspot
											{network}
											{transaction}
											{quoteCurrency}
											contextualAddress={address}
											{detailLevel}
											{tokenBalanceFormat}
											{showFees}
											layout="inline"
										/>
									</a> -->

								{:else}
									<a class="card" id={transaction.transactionID} href="#{transaction.transactionID}">
										<EthereumTransaction
											{network}
											{transaction}
											{quoteCurrency}
											contextualAddress={address}
											{detailLevel}
											{tokenBalanceFormat}
											{showFees}
											layout="inline"
										/>
									</a>
								{/if}
							{:else}
								<div class="card">No transactions yet.</div>
							{/each}
						</div>
					</EthereumTransactionsLoader>
				</div>
			{:else}{#key selectedToken}
				<div class="column" transition:fade|global>
					<!-- ERC-20 Transactions -->
					<EthereumTransactionsERC20Loader
						{network}
						{networkProvider}
						{transactionProvider}
						{address}
						erc20Token={selectedToken}
						{quoteCurrency}
						includeLogs={detailLevel === 'exhaustive'}
						let:transactions
					>
						<svelte:fragment slot="header"
							let:status
							let:transactions
							let:pagination
						>
							<div class="bar wrap">
								<svelte:element this={`h${headingLevel + 1}`}>
									{selectedToken.name}
									(<TokenName {network} erc20Token={selectedToken} />)
									Transactions
									<InlineContainer isOpen={status === 'resolved'}>(<TweenedNumber value={transactions.length} /><InlineContainer isOpen={pagination?.hasNextPage}>+</InlineContainer>)</InlineContainer>
								</svelte:element>

								<div role="toolbar" class="row wrap">
									{#if detailLevel !== 'exhaustive'}
										<label transition:scale>
											<input type="checkbox" bind:checked={showFees}>
											<span>Fees</span>
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
								</div>

								<button on:click={() => selectedToken = undefined}>Back</button>
							</div>
						</svelte:fragment>

						<div class="transactions-list column" class:scrollable-list={transactions.length > 7}>
							{#each transactions as erc20TokenTransaction}
								{#if transactionProvider === TransactionProvider.Covalent}
									<a class="card" id={erc20TokenTransaction.tx_hash} href="#{erc20TokenTransaction.tx_hash}">
										<EthereumTransactionCovalent
											{network}
											{erc20TokenTransaction}
											{quoteCurrency}
											contextualAddress={address}
											{detailLevel}
											{tokenBalanceFormat}
											{showFees}
											layout="inline"
										/>
									</a>

								{:else if transactionProvider === TransactionProvider.Moralis}
									<a class="card" id={erc20TokenTransaction.hash} href="#{erc20TokenTransaction.hash}">
										<EthereumTransactionMoralis
											{network}
											{erc20TokenTransaction}
											{quoteCurrency}
											contextualAddress={address}
											{detailLevel}
											{tokenBalanceFormat}
											{showFees}
											layout="inline"
										/>
									</a>
								{/if}
							{:else}
								<div class="card">No transactions yet.</div>
							{/each}
						</div>
					</EthereumTransactionsERC20Loader>
				</div>
			{/key}{/if}
		</div>

		{#if balances.length}
			<CovalentPriceChart
				historicalPriceProvider={$preferences.historicalPriceProvider}
				quoteCurrency={$preferences.quoteCurrency}
				chainID={network.chainId}
				currencies={
					selectedToken?.tokenAddress
						? [selectedToken.tokenAddress]
						: balances.map(tokenWithBalance => tokenWithBalance.contract_address).filter(Boolean)
				}
				{priceScale}
			>
				<svelte:fragment slot="header">
					<hr>

					<div class="bar wrap">
						<svelte:element this={`h${headingLevel + 1}`}>Chart</svelte:element>	

						<div role="toolbar">
							<label>
								<span>Price Scale</span>
								<select bind:value={priceScale}>
									<option value="logarithmic">Logarithmic</option>
									<option value="linear">Linear</option>
									<option value="linearFromZero">Linear From Zero</option>
								</select>
							</label>
						</div>
					</div>
				</svelte:fragment>
			</CovalentPriceChart>
		{/if}
	</AccountIdResolver>
</div>
