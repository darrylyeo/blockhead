<script lang="ts">
	// Types/constants
	import type { Ethereum } from '../../../data/networks/types'
	import { InputPattern } from '../../../data/inputPatterns'


	// Params/Context

	import {
		networkSlug,

		address,
		blockNumber,
		ensName,
		transactionId,

		explorerParams,
		type ExplorerInputParams,
	} from '../_explorerParams'

	import {
		explorerNetwork,
		explorerPublicClient,
		explorerBlockNumber,

		ExplorerQueryType,
		explorerQueryType,
		explorerQuery,

		explorerTitle,
	} from '../_explorerContext'


	// External stores

	import { preferences } from '../../../state/preferences'


	// Internal state
	let currentExplorerInputValue: string
	$: currentExplorerInputValue = $explorerQuery

	let currentExplorerInputParams: ExplorerInputParams | undefined


	$: networkProvider = $preferences.rpcNetwork


	$: showCurrentBlockHeight = true

	$: showCurrentPrice = [
		'ethereum',
		'polygon',
		'avalanche',
		'fantom',
		'bsc'
	].includes($networkSlug)

	$: showHistoricalPrice = false
	// $: showHistoricalPrice = [
	// 	'ethereum',
	// 	'polygon',
	// 	'avalanche',
	// 	'fantom',
	// 	'bsc'
	// ].includes($networkSlug)


	// Block Navigation
	let navigationContext: {
		transaction?: Ethereum.Transaction,
		transactionBlockNumber?: Ethereum.BlockNumber,
		block?: Ethereum.Block,
	} = {}

	$: navigationContext.transactionBlockNumber = navigationContext.transaction?.blockNumber

	import { availableNetworks, networksByChainID } from '../../../data/networks'
	import { TransactionProvider, transactionProviderIcons } from '../../../data/transactionProvider'
	import { parallelLoaderStore } from '../../../utils/parallelLoaderStore'
	import { chainCodeFromNetwork, MoralisWeb3Api } from '../../../api/moralis/web3Api/index'


	// Components
	import { MetaTags } from 'svelte-meta-tags'

	import SearchInput from '../../../components/SearchInput.svelte'

	import HistoricalPriceChart from '../../../components/HistoricalPriceChart.svelte'
	import CurrentPrice from '../../../components/CurrentPrice.svelte'
	import EthereumBlockHeight from '../../../components/EthereumBlockHeight.svelte'

	import EthereumAccountOrContract from '../../../components/EthereumAccountOrContract.svelte'
	import EthereumBlocks from '../../../components/EthereumBlocks.svelte'
	import EthereumBlock from '../../../components/EthereumBlock.svelte'
	import EthereumBlockHeader from '../../../components/EthereumBlockHeader.svelte'
	import EthereumBlockLoader from '../../../components/EthereumBlockLoader.svelte'
	import EthereumBlockNavigation from '../../../components/EthereumBlockNavigation.svelte';
	import EthereumTransactionLoader from '../../../components/EthereumTransactionLoader.svelte'

	import FilecoinAccount from '../../../components/FilecoinAccount.svelte'
	import FilecoinAccountLoader from '../../../components/FilecoinAccountLoader.svelte'
	import FilecoinTipset from '../../../components/FilecoinTipset.svelte'
	import FilecoinTipsetLoader from '../../../components/FilecoinTipsetLoader.svelte'
	import FilecoinTransaction from '../../../components/FilecoinTransaction.svelte'
	import FilecoinTransactionLoader from '../../../components/FilecoinTransactionLoader.svelte'

	import Loader from '../../../components/Loader.svelte'
	

	// Transitions
	import { fly } from 'svelte/transition'
</script>


<MetaTags {...{
	title: `${$explorerTitle} | Blockhead`,
	description: `Explore${$explorerNetwork ? ` ${$explorerNetwork.name}` : ''} transactions, blocks, accounts, smart contracts and more on Blockhead.`,
}} />


<style>
	form {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: var(--padding-inner);
		align-items: center;
	}

	.row {
		align-items: stretch;
	}
	.row > * {
		flex: 1 20rem;
	}


	.navigation {
		--padding-inner: 0.25em;

		/* margin: 0 calc(-1 * var(--padding-outer)); */
		margin-top: auto;
		padding: var(--padding-outer);

		background-color: rgba(0, 0, 0, 0.25);
		-webkit-backdrop-filter: var(--overlay-backdrop-filter);
		backdrop-filter: var(--overlay-backdrop-filter);
		border-radius: var(--card-border-radius);
		margin: 0 calc(-1 * var(--padding-outer));
	}
	.navigation.currentNetwork {
		position: sticky;
		bottom: 4rem;
		/* bottom: 0; */
		z-index: 1;
	}
	.navigation.otherNetworks {
		font-size: 0.8em;
	}
	/* .navigation {
		position: sticky;
		top: calc(100% - 8rem);
		bottom: 3.5rem;

		transition: 0.3s;
	}
	.navigation:not(:hover):not(:focus-within) {
		transform: translateY(calc(100% - 1em - var(--padding-outer) * 2));
	} */
</style>


<section class="column" in:fly={{x: 100}} out:fly={{x: -100}}>
	<form on:submit|preventDefault={() => {
		$address = currentExplorerInputParams.address
		$blockNumber = currentExplorerInputParams.blockNumber
		$ensName = currentExplorerInputParams.ensName
		$transactionId = currentExplorerInputParams.transactionId
	}}>
		<SearchInput
			inputPatterns={
				$explorerNetwork?.slug === 'filecoin' ?
					[
						InputPattern.FilecoinAccountId,
						InputPattern.FilecoinTransactionId,
						InputPattern.FilecoinTipsetNumber,
					]
				:
					[
						InputPattern.Address,
						InputPattern.TransactionId,
						InputPattern.BlockNumber,
						InputPattern.EnsName,
					]
			}
			bind:value={currentExplorerInputValue}
			bind:matchedPatterns={currentExplorerInputParams}
			network={$explorerNetwork}
		/>
		<button type="submit">Go</button>
	</form>

	{#if $explorerNetwork}
		<div class="stack">
			{#key $explorerParams}
				{#if $explorerQueryType === ExplorerQueryType.Transaction}
					<div class="column"in:fly={{ x: 50, duration: 200 }} out:fly={{ x: -50, duration: 200 }}>
						{#if $explorerNetwork.slug === 'filecoin'}
							<FilecoinTransactionLoader
								network={$explorerNetwork}
								{networkProvider}
								transactionCid={$explorerParams.transactionId}

								detailLevel="exhaustive"
								tokenBalanceFormat="both"
								showFees={true}

								layout="standalone"

								bind:transaction={navigationContext.transaction}
								let:transaction
							>
								<FilecoinTransaction
									network={$explorerNetwork}
									{transaction}
									headingLevel={2}
								/>
							</FilecoinTransactionLoader>
						{:else}
							<EthereumTransactionLoader
								network={$explorerNetwork}
								{networkProvider}
								transactionId={$explorerParams.transactionId}

								detailLevel="exhaustive"
								tokenBalanceFormat="both"
								showFees={true}

								layout="standalone"

								bind:transaction={navigationContext.transaction}
							/>
						{/if}
					</div>
				{:else if $explorerQueryType === ExplorerQueryType.Block}
					<div class="column" in:fly={{ x: 50, duration: 200 }} out:fly={{ x: -50, duration: 200 }}>
						{#if $explorerNetwork.slug === 'filecoin'}
							<FilecoinTipsetLoader
								network={$explorerNetwork}
								tipsetNumber={BigInt($explorerParams.blockNumber)}
								let:tipset
							>
								<FilecoinTipset
									network={$explorerNetwork}
									{tipset}
									headingLevel={2}
								/>
							</FilecoinTipsetLoader>
						{:else}
							<EthereumBlockLoader
								containerClass="card"
								network={$explorerNetwork}
								{networkProvider}
								blockNumber={$explorerParams.blockNumber}
								transactionProvider={$preferences.transactionProvider}
								includeTransactions={true}

								bind:block={navigationContext.block}
								let:block
								let:status
							>
								<svelte:fragment slot="header" let:block>
									{#if block}
										<EthereumBlockHeader
											network={$explorerNetwork}
											{block}
											headingLevel={2}
										/>
									{/if}
								</svelte:fragment>

								{#if status === 'resolved'}
									<hr>

									<EthereumBlock
										network={$explorerNetwork}
										{block}
										headingLevel={2}
									/>
								{/if}
							</EthereumBlockLoader>
						{/if}
					</div>
				{:else if $explorerQueryType === ExplorerQueryType.Account}
					<div class="column" in:fly={{ x: 50, duration: 200 }} out:fly={{ x: -50, duration: 200 }}>
						{#if $explorerNetwork.slug === 'filecoin'}
							<FilecoinAccountLoader
								network={$explorerNetwork}
								address={$explorerParams.address}
								let:account
							>
								<FilecoinAccount
									network={$explorerNetwork}
									{account}
									headingLevel={2}
								/>
							</FilecoinAccountLoader>
						{:else}
							<EthereumAccountOrContract
								network={$explorerNetwork}
								{networkProvider}
								accountId={$explorerParams.address || $explorerParams.ensName}
							/>
						{/if}
					</div>
				{:else}
					<div class="column-block" in:fly={{ x: 50, duration: 200 }} out:fly={{ x: -50, duration: 200 }}>
						<div class="row">
							{#if showCurrentBlockHeight}
								<section class="card">
									<EthereumBlockHeight
										network={$explorerNetwork}
										blockNumber={$explorerBlockNumber}
									/>
								</section>
							{/if}

							{#if showCurrentPrice}
								<section class="card">
									<CurrentPrice
										{networkProvider}
										currentPriceProvider={$preferences.currentPriceProvider}
										token={$explorerNetwork.nativeCurrency.symbol}
										quoteCurrency={$preferences.quoteCurrency}
										blockNumber={$explorerBlockNumber}
									/>
								</section>
							{/if}
						</div>

						{#if showHistoricalPrice}
							<div class="row">
								<section class="card">
									<HistoricalPriceChart
										historicalPriceProvider={$preferences.historicalPriceProvider}
										currencies={[$explorerNetwork.nativeCurrency.symbol]}
										quoteCurrency={$preferences.quoteCurrency}
									/>
								</section>
							</div>
						{/if}

						{#if $explorerNetwork}
							<EthereumBlocks
								network={$explorerNetwork}
							/>
						{/if}
					</div>
				{/if}
			{/key}
		</div>

		<div class="navigation currentNetwork column">
			<EthereumBlockNavigation
				network={$explorerNetwork}
				{networkProvider}
				blockNumber={
					$explorerQueryType === 'block' ?
						BigInt($blockNumber)
					: $explorerQueryType === 'transaction' ?
						navigationContext.transactionBlockNumber
					:
						undefined
				}
				showBeforeAndAfter={$explorerQueryType === 'block'}
			/>
		</div>
		
		{@const transactionProvider = $preferences.transactionProvider}
		{#if $explorerQueryType === 'block' && availableNetworks && transactionProvider === TransactionProvider.Moralis && navigationContext.block?.timestamp}
			{@const network = $explorerNetwork}
			{@const otherNetworks = availableNetworks.filter(_network => _network !== network)}
		
			<Loader
				loadingIconName={'Moralis'}
				loadingIcon={transactionProviderIcons[transactionProvider]}
				fromStore={otherNetworks && navigationContext.block?.timestamp && (() =>
					// <Awaited<ReturnType<typeof MoralisWeb3Api.dateToBlock.getDateToBlock>>[]>
					parallelLoaderStore(otherNetworks, network => (
						MoralisWeb3Api.dateToBlock.getDateToBlock({
							chain: chainCodeFromNetwork(network),
							date: navigationContext.block.timestamp
						})
					))
				)}
				then={closestBlockByNetwork => (
					[...closestBlockByNetwork?.entries() ?? []]
						.map(([network, data]) => ({
							network,
							blockNumber: BigInt(data.block),
							timestamp: data.timestamp,
						}))
						.filter(data => data.blockNumber > 0n)
				)}
				let:result={networksAndClosestBlock}
				clip={false}
			>
				<svelte:fragment slot="loadingMessage">
					Finding blocks produced around the same time as {network.name} › Block {navigationContext.block.blockNumber}...
				</svelte:fragment>
		
				{#if networksAndClosestBlock?.length}
					<div class="navigation otherNetworks column">
						{#each networksAndClosestBlock as { network, blockNumber, timestamp }}
							<EthereumBlockNavigation
								{network}
								blockNumber={blockNumber > 1n ? blockNumber : undefined}
							/>
						{/each}
					</div>
				{/if}
			</Loader>
		{/if}
	{/if}
</section>
