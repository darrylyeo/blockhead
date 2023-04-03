<script lang="ts">
	import type { Ethereum } from '../data/networks/types'
	import { TransactionProvider } from '../data/transactionProvider'
	import type { QuoteCurrency } from '../data/currencies'
	import { updatesByNetwork } from '../data/networks/updates'


	export let network: Ethereum.Network
	export let block: Ethereum.Block
	export let transactionProvider: TransactionProvider
	export let provider: Ethereum.Provider
	export let quoteCurrency: QuoteCurrency


	export let detailLevel: 'summary' | 'detailed' | 'exhaustive' = 'detailed'
	export let tokenBalanceFormat: 'original' | 'converted' | 'both' = 'original'
	export let showFees = false
	export let showTransactions = false


	import { formatPercent } from '../utils/formatPercent'
	import { toUtf8String } from 'ethers'
	import { formatTransactionHash } from '../utils/formatTransactionHash'

	const formatNumber = (number: number) =>
		new Intl.NumberFormat(globalThis.navigator.languages).format(number)

	const _toUtf8String = () => {
		try {
			return toUtf8String(block.extraData)
		} catch (e) {
			return block.extraData
		}
	}


	$: transactions = block.prefetchedTransactions ?? block.transactions ?? []

	$: lastUpdate = updatesByNetwork.get(network)?.find(upgrade => block.blockNumber >= upgrade.blockNumber)


	import Address from './Address.svelte'
	import Date from './Date.svelte'
	import EthereumBlockNumber from './EthereumBlockNumber.svelte'
	import EthereumTransactionLoader from './EthereumTransactionLoader.svelte'
	import EthereumTransactionMoralis from './EthereumTransactionMoralis.svelte'


	import { scale } from 'svelte/transition'
</script>


<style>
	.consensus > .row {
		justify-content: space-between;
	}

	.miner-address {
		font-weight: 600;
	}
	.miner-address, .nonce, .difficulty, .block-hash {
		font-size: 0.9em;
	}

	.including {
		font-size: 0.85em;
		align-items: baseline;
	}

	.extra-data-container {
		display: inline-grid;
		grid-template-columns: auto 1fr;
		align-items: baseline;
		gap: 1ch;
	}

	.extra-data {
		background-color: var(--card-background-color);
		padding: 0.2em 0.5em;
		border-radius: 0.2em;
	}
</style>


{#key network}

<div class="bar">
	<h3>Network Consensus</h3>

	{#if lastUpdate}
		<span class="card-annotation">
			{lastUpdate.consensus.type}
			(<a href={lastUpdate.consensus.links[0]} target="_blank">{lastUpdate.consensus.algorithm}</a>)
		</span>
	{/if}
</div>

<div class="consensus card column">
	<div class="row wrap">
		{#if lastUpdate?.consensus.type === 'Proof of Work'}
			<span class="miner">
				<abbr title={'A network node that finds valid proof-of-work for new blocks, by repeated pass hashing (Ethash).\n\nSource: https://ethereum.org/en/glossary/#miner'}>Miner</abbr>

				{#if block.minerAddress}
					<span class="miner-address">
						<Address 
							{network}
							address={block.minerAddress}
							format="middle-truncated"
						/>
					</span>
				{/if}
			</span>

			<span>
				discovered <abbr title={'The random value in a block that was used to satisfy the proof-of-work.\n\nSource: https://ethereum.org/en/glossary/#nonce'}>nonce</abbr>
				<output class="nonce">{block.nonce}</output>
			</span>

			<span>
				at <abbr title={'A network-wide setting that controls how much computation is required to produce a proof-of-work.\n\nSource: https://ethereum.org/en/glossary/#difficulty'}>difficulty</abbr>
				<output class="difficulty">{block.difficulty}</output>
			</span>

		{:else if lastUpdate?.consensus.type === 'Proof of Stake'}
			<span class="validator">
				<abbr title={'A node in a proof-of-stake system responsible for storing data, processing transactions, and adding new blocks to the blockchain.\n\nSource: https://ethereum.org/en/glossary/#validator'}>Validator</abbr>

				{#if block.minerAddress}
					<span class="validator-address">
						<Address 
							{network}
							address={block.minerAddress}
							format="middle-truncated"
						/>
					</span>

					<span>
						received fee
						<output class="nonce">{block.nonce}</output>
					</span>

					<!-- <span>
						proposing block
						<output class="nonce">{block.nonce}</output>
					</span> -->
				{/if}
			</span>
		{/if}
		
		<span>
			producing hash
			<output class="block-hash"><abbr title="Block hash: {block.hash}">{formatTransactionHash(block.hash, 'middle-truncated')}</abbr></output>
		</span>
	</div>

	<hr>

	<div class="including row wrap">
		<h4>including</h4>

		{#if block.transactions?.length}
			<span>
				{block.transactions.length}
				transactions
			</span>
		{/if}

		{#if block.blockNumber > 0}
			<span>
				<abbr title="Block {block.blockNumber - 1} hash: {block.parentHash}">hash</abbr>
				<!-- hash
				<output><abbr title="Block {blockNumber - 1} hash: {block.parentHash}">{formatTransactionHash(block.parentHash, 'middle-truncated')}</abbr></output> -->
				of previous block <EthereumBlockNumber {network} blockNumber={block.blockNumber - 1} />
			</span>
		{/if}

		<span class="extra-data-container">
			extra data
			<output class="extra-data"><abbr title={`Extra data:\n${block.extraData}`}>{_toUtf8String(block.extraData)}</abbr></output>
		</span>
	</div>
</div>

{#if transactions.length}
	<hr>

	<div class="bar wrap">
		<div class="row">
			<h3>
				Transactions
				{#if status === 'resolved'}({block.transactions.length}{block.transactions.length === 100 ? '+' : ''}){/if}
			</h3>

			{#if showTransactions}
				<button class="small" on:click={() => showTransactions = false} transition:scale>Hide</button>
			{/if}
		</div>

		{#if showTransactions}
			<label transition:scale>
				<input type="checkbox" bind:checked={showFees}>
				<span>Show Fees</span>
			</label>
			<label transition:scale>
				<span>View</span>
				<select bind:value={detailLevel}>
					<option value="summary">Summary</option>
					<option value="detailed">Detailed</option>
					<option value="exhaustive">Exhaustive</option>
				</select>
			</label>
		{:else}
			<button class="small" on:click={() => showTransactions = true} transition:scale>Show</button>
		{/if}
		<!-- <button class="small" on:click={() => showTransactions = !showTransactions}>{showTransactions ? 'Hide' : 'Show'} transactions</button> -->
	</div>

	{#if showTransactions}
		<div class="transactions-list column" class:scrollable-list={transactions.length > 7}>
			{#if transactionProvider === TransactionProvider.Moralis}
				{#each transactions as transaction, i (transaction.hash)}
					<div class="card">
						<EthereumTransactionMoralis
							{network}
							{transaction}
							{provider}
							{transactionProvider}
							{quoteCurrency}
							includeLogs={detailLevel === 'exhaustive'}
							let:transaction
						/>
					</div>
				{/each}

			{:else}
				{#each transactions as transaction, i (transaction.hash ?? transaction)}
					<div class="card">
						<EthereumTransactionLoader
							transaction={typeof transaction === 'string' ? undefined : transaction}

							{network}
							{provider}
							{transactionProvider}
							transactionId={typeof transaction === 'string' ? transaction : transaction.hash}
							{quoteCurrency}

							{detailLevel}
							{tokenBalanceFormat}
							{showFees}
						/>
					</div>
				{/each}
			{/if}
		</div>
	{/if}
{/if}

<hr>

<div class="footer bar wrap">
	<span class="gas-stats">
		<abbr title={'Gas Used\n\nGas: A virtual fuel used in Ethereum to execute smart contracts. The EVM uses an accounting mechanism to measure the consumption of gas and limit the consumption of computing resources.\n\nSource: https://ethereum.org/en/glossary/#gas'}>{formatNumber(block.gasUsed)}</abbr>
		/
		<abbr title={'Gas Limit\n\nThe maximum amount of gas a transaction or block may consume.\n\nSource: https://ethereum.org/en/glossary/#gas-limit'}>{formatNumber(Number(block.gasLimit))}</abbr>
		computational gas units used
		({formatPercent(Number(block.gasUsed) / Number(block.gasLimit))})
	</span>
	<Date date={block.timestamp} layout="horizontal" />
</div>

{/key}
