<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'

	export let network: Ethereum.Network
	export let block: Ethereum.Block
	export let transactionProvider
	export let provider: Ethereum.Provider
	export let quoteCurrency


	export let detailLevel: 'summary' | 'detailed' | 'exhaustive' = 'detailed'
	export let showValues: 'original' | 'converted' | 'both' = 'original'
	export let showFees = false
	export let showTransactions = false


	import { formatPercent } from '../utils/format-percent'
	import { toUtf8String } from 'ethers/lib/utils.js'
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


	import Address from './Address.svelte'
	import Date from './Date.svelte'
	import EthereumBlockNumber from './EthereumBlockNumber.svelte'
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


<div class="bar">
	<h3>Network Consensus</h3>
	{#if network.chainId === 1}
		<span class="consensus-mechanism card-annotation">
			Proof of Work
			(<a href="https://eth.wiki/en/concepts/ethash/ethash" target="_blank">Ethash</a>)
		</span>
	{/if}
</div>

<div class="consensus card column">
	<div class="row">
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
		
		<span>
			producing hash
			<output class="block-hash"><abbr title="Block {block.blockNumber} hash: {block.hash}">{formatTransactionHash(block.hash, 'middle-truncated')}</abbr></output>
		</span>
	</div>

	<hr>

	<div class="including row">
		<h4>including</h4>

		{#if block.transactions.length}
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

{#if block.transactions.length}
	<hr>

	<div class="bar">
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
		<div class="transactions-list column" class:scrollable-list={block.transactions.length > 7}>
			{#each block.transactions ?? [] as transaction}
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
		</div>
	{/if}
{/if}

<hr>

<div class="footer bar">
	<span class="gas-stats">
		<abbr title={'Gas Used\n\nGas: A virtual fuel used in Ethereum to execute smart contracts. The EVM uses an accounting mechanism to measure the consumption of gas and limit the consumption of computing resources.\n\nSource: https://ethereum.org/en/glossary/#gas'}>{formatNumber(block.gasUsed)}</abbr>
		/
		<abbr title={'Gas Limit\n\nThe maximum amount of gas a transaction or block may consume.\n\nSource: https://ethereum.org/en/glossary/#gas-limit'}>{formatNumber(block.gasLimit)}</abbr>
		computational gas units used
		({formatPercent(block.gasUsed / block.gasLimit)})
	</span>
	<Date date={block.timestamp} layout="horizontal" />
</div>