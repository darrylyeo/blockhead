<script lang="ts">
	// Types/constants
	import type { AccountId } from '$/data/accountId'
	import type { Ethereum } from '$/data/networks/types'
	import type { TokenWithBalance } from '$/data/tokens'
	import { getViemPublicClient } from '$/data/networkProviders'
	import type { NetworkProvider } from '$/data/networkProviders/types'
	import type { PriceScale } from './PriceChart.svelte'
	import { preferences } from '$/state/preferences'
	import type { TokenBalancesProvider } from '$/data/tokenBalancesProvider'
	import type { TransactionProvider } from '$/data/transactionProvider'
	import type { QuoteCurrency } from '$/data/currencies'


	// Inputs
	export let network: Ethereum.Network
	export let networkProvider: NetworkProvider
	export let accountId: AccountId | string
	export let filterQuery: Ethereum.Address | Ethereum.ContractAddress | Ethereum.BlockNumber | undefined

	export let tokenBalancesProvider: TokenBalancesProvider
	export let transactionProvider: TransactionProvider
	export let quoteCurrency: QuoteCurrency
	export let publicClient: Ethereum.PublicClient | undefined

	// (View options)
	export let layout: 'standalone' | 'inline' = 'standalone'
	export let headingLevel: 1 | 2 | 3 | 4 | 5 | 6 = 2
	export let isOpen = true
	export let resolveAccountNames = true

	// (Computed)
	$: quoteCurrency = $$props.quoteCurrency || $preferences.quoteCurrency
	$: tokenBalancesProvider = $$props.tokenBalancesProvider || $preferences.tokenBalancesProvider
	$: transactionProvider = $$props.transactionProvider || $preferences.transactionProvider

	$: publicClient = network && networkProvider && getViemPublicClient({
		network,
		networkProvider: networkProvider,
	})


	// Internal state
	let detailLevel: 'summary' | 'detailed' | 'exhaustive' = 'detailed'
	let tokenBalanceFormat: 'original' | 'converted' | 'both' = 'both'
	let showFees = false
	let sortBy: 'value-descending' | 'value-ascending' | 'ticker-ascending' = 'value-descending'
	let showSmallValues = false

	let balances: TokenWithBalance[] = []

	let selectedToken: Ethereum.NativeCurrency | Ethereum.Erc20Token | undefined

	// (Computed)
	import { isEvmAddress } from '$/utils/isEvmAddress'

	$: if(filterQuery && isEvmAddress(filterQuery) && balances){
		const address = filterQuery
		selectedToken = balances.map(({ token }) => token).find(token => 'address' in token && token.address.toLowerCase() === address.toLowerCase())
	}
	// $: if(selectedToken)
	// 	filterQuery = selectedToken.address

	let contractName: string | undefined


	// Components
	import AccountIdResolver from './AccountIdResolver.svelte'
	import Address from './Address.svelte'
	import AddressWithLabel from './AddressWithLabel.svelte'
	import AnchorLink from './AnchorLink.svelte'
	import Balance from './Balance.svelte'
	import EnsName from './EnsName.svelte'
	import EthereumBalances from './EthereumBalances.svelte'
	import EthereumContractBytecodeLoader from './EthereumContractBytecodeLoader.svelte'
	import EthereumContractExplorer from './EthereumContractExplorer.svelte'
	import EthereumTransaction from './EthereumTransaction.svelte'
	import EthereumTransactionsLoader from './EthereumTransactionsLoader.svelte'
	import EthereumErc20Transfer from './EthereumErc20Transfer.svelte'
	import EthereumErc20TransfersLoader from './EthereumErc20TransfersLoader.svelte'
	import HistoricalPriceChart from './HistoricalPriceChart.svelte'
	import InlineContainer from './InlineContainer.svelte'
	import TokenName from './TokenName.svelte'
	import TokenBalance from './TokenBalance.svelte'
	import TokenBalanceFormatSelect from './TokenBalanceFormatSelect.svelte'
	import TweenedNumber from './TweenedNumber.svelte'


	// Transitions/animations
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
		loaderViewOptions={{
			showIf: ({address}) => address,
			layout: 'collapsible',
			collapsibleType: 'label',
			isOpen,
		}}
	>
		<div slot="header"
			let:address
			let:ensName
			class="bar wrap"
			let:isOpen
			let:toggle
		>
			<div class="row inline">
				<slot name="title" {network} {address} {ensName}>
					{#if address}
						<svelte:element this={`h${headingLevel}`}>
							<AddressWithLabel
								{network}
								{address}
								label={contractName}
								format="both"
							/>
						</svelte:element>

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

			<div class="row">
				<span class="card-annotation">
					<slot name="annotation">
						{network.name}

						<EthereumContractBytecodeLoader
							loaderViewOptions={{
								layout: 'passive',
							}}
							{network}
							{networkProvider}
							contractAddress={address}
							let:contractBytecode
							let:status
						>
							{#if status === 'resolved'}
								{#if contractBytecode}
									<abbr title={contractBytecode}>Contract</abbr>
								{:else}
									Account
								{/if}
							{:else}
								Address
							{/if}
						</EthereumContractBytecodeLoader>
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
		</div>

		<EthereumContractExplorer
			contractAddress={address}
			{network}
			{transactionProvider}
			headingLevel={headingLevel + 1}
			bind:contractName
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
			<svelte:fragment slot="header"
				let:summary
				let:isOpen let:toggle
			>
				{#if balances?.length}
					<div class="column">
						<hr>

						<div class="bar wrap">
							<svelte:element this={`h${headingLevel + 1}`}>
								Balances
								(<TokenBalance
									format="fiat"
									token={{
										symbol: summary.quoteCurrency
									}}
									balance={summary.quoteTotal}
								/>)
							</svelte:element>

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

							<button
								class="small"
								data-after={isOpen ? '▲' : '▼'}
								on:click={toggle}
							/>
						</div>
					</div>
				{/if}
			</svelte:fragment>
		</EthereumBalances>

		<hr>

		<div class="stack">
			{#if !selectedToken}
				<div class="column" transition:fade>
					<!-- Regular Ethereum Transactions -->
					<EthereumTransactionsLoader
						{network}
						{networkProvider}
						{transactionProvider}
						{address}
						{quoteCurrency}
						includeLogs={detailLevel === 'exhaustive'}
						viewOptions={{
							showIf: transactions => transactions,
							isOpen: layout === 'standalone',
						}}
						let:transactions
					>
						<svelte:fragment slot="header"
							let:status
							let:transactions
							let:pagination
							let:isOpen
							let:toggle
						>
							<summary class="bar wrap">
								<svelte:element this={`h${headingLevel + 1}`}>
									Transactions
									<InlineContainer isOpen={status === 'resolved'}>(<TweenedNumber value={transactions.length} /><InlineContainer isOpen={pagination?.hasNextPage}>+</InlineContainer>)</InlineContainer>
								</svelte:element>

								{#if isOpen}
									<div role="toolbar" class="row wrap align-end" transition:scale>
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
								{/if}

								<button
									class="small"
									data-after={isOpen ? '⏶' : '⏷'}
									on:click={toggle}
								>{isOpen ? 'Hide' : 'Show'}</button>
							</summary>
						</svelte:fragment>

						{#if transactions?.length}
							<div class="transactions-list column" class:scrollable-list={transactions.length > 7}>
								{#each transactions as transaction}
									<AnchorLink
										class="card"
										base={`/explorer/${network.slug}`}
										link={`/tx/${transaction.transactionId}`}
									>
										<EthereumTransaction
											{network}
											{transactionProvider}
											{transaction}
											{quoteCurrency}
											contextualAddress={address}
											{detailLevel}
											{tokenBalanceFormat}
											{showFees}
											layout="inline"
										/>
									</AnchorLink>
								{:else}
									<div class="card">No transactions yet.</div>
								{/each}
							</div>
						{/if}
					</EthereumTransactionsLoader>
				</div>
			{:else}{#key selectedToken}
				<div class="column" transition:fade>
					<!-- Transactions with ERC-20 Transfers -->
					<EthereumErc20TransfersLoader
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
									<TokenName
										token={selectedToken}
										layout="name-and-symbol"
									/>

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

								<button
									class="small"
									on:click={() => selectedToken = undefined}
								>Back</button>
							</div>
						</svelte:fragment>

						{#if transactions?.length}
							<div class="transfers-list column" class:scrollable-list={transactions.length > 7}>
								{#each transactions as transaction}
									<AnchorLink
										class="card"
										base={`/explorer/${network.slug}`}
										link={`/tx/${transaction.transactionId}`}
									>
										<EthereumTransaction
											{network}
											{transactionProvider}
											{transaction}
											{quoteCurrency}
											contextualAddress={address}
											{detailLevel}
											{tokenBalanceFormat}
											{showFees}
											layout="inline"
										/>
									</AnchorLink>
								{:else}
									<div class="card">No transactions yet.</div>
								{/each}
							</div>
						{/if}
					</EthereumErc20TransfersLoader>
				</div>
			{/key}{/if}
		</div>

		{#if balances?.length}
			<hr>

			<HistoricalPriceChart
				historicalPriceProvider={$preferences.historicalPriceProvider}
				query={{
					coins: (
						selectedToken ?
							[
								{
									erc20Token: selectedToken,
								},
							]
						:
							balances
								.map(balance => ({
									chainId: network.chainId,
									erc20Token: balance.token,
								}))
					),
				}}
				quoteCurrency={$preferences.quoteCurrency}
			/>
		{/if}
	</AccountIdResolver>
</div>
