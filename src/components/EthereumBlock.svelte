<script lang="ts">
	// Constants/types
	import type { Ethereum } from '$/data/networks/types'
	import type { TransactionProvider } from '$/data/transactionProvider'
	import type { QuoteCurrency } from '$/data/currencies'
	import { updatesByNetwork } from '$/data/networks/updates'


	// Inputs
	export let network: Ethereum.Network
	export let block: Ethereum.Block
	export let transactionProvider: TransactionProvider
	export let quoteCurrency: QuoteCurrency

	// (Computed)
	$: lastUpdate = updatesByNetwork.get(network)?.find(upgrade => block.blockNumber >= upgrade.blockNumber)

	// (View options)
	export let headingLevel: 1 | 2 | 3 | 4 | 5 | 6 = 2
	export let detailLevel: 'summary' | 'detailed' | 'exhaustive' = 'detailed'
	export let tokenBalanceFormat: 'original' | 'converted' | 'both' = 'original'
	export let showFees = false
	export let showSummary = true
	export let showTransactions = false


	// Functions
	import { formatPercent } from '$/utils/formatPercent'
	import { bytesToString, toBytes } from 'viem'

	const formatNumber = (number: number) =>
		new Intl.NumberFormat(globalThis.navigator.languages).format(number)


	// Components
	import Address from './Address.svelte'
	import AnchorLink from './AnchorLink.svelte'
	import Date from './Date.svelte'
	import BlockNumber from './BlockNumber.svelte'
	import Collapsible from './Collapsible.svelte'
	import EthereumTransaction from './EthereumTransaction.svelte'
	import EthereumTransactionLoader from './EthereumTransactionLoader.svelte'
	import TruncatedValue from './TruncatedValue.svelte'


	// Transitions/animations
	import { scale } from 'svelte/transition'
	import { expoOut } from 'svelte/easing'
</script>


<style>
	.consensus > .row {
		justify-content: space-between;
	}

	output {
		font-size: 0.9em;
	}

	.miner-address {
		font-weight: 600;
	}

	.including {
		font-size: 0.85em;
		align-items: baseline;
		column-gap: 4ch;
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


<Collapsible
	type="label"
	bind:isOpen={showSummary}
	class="column"
	canToggle
>
	<svelte:fragment slot="title">
		<svelte:element this={`h${headingLevel + 1}`}>Network Consensus</svelte:element>
	</svelte:fragment>

	<svelte:fragment slot="header-right">
		{#if lastUpdate}
			<span class="card-annotation">
				{lastUpdate.consensus.type}
				(<a href={lastUpdate.consensus.links[0]} target="_blank">{lastUpdate.consensus.algorithm}</a>)
			</span>
		{/if}
	</svelte:fragment>

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
					<output>{block.nonce}</output>
				</span>

				<span>
					with <abbr title={'A network-wide setting that controls how much computation is required to produce a proof-of-work.\n\nSource: https://ethereum.org/en/glossary/#difficulty'}>difficulty</abbr>
					<output>{block.difficulty}</output>
					{#if block.totalDifficulty}
						<small>(total: <output>{block.totalDifficulty}</output>)</small>
					{/if}
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
					{/if}
				</span>

				<span>
					proposed block
				</span>
			{/if}

			{#if block.blockHash}
				<span>
					producing block hash
					<abbr title="Block hash: {block.blockHash}"><output><TruncatedValue value={block.blockHash} /></output></abbr>
				</span>
			{/if}
		</div>

		<hr>

		<div class="including row wrap">
			<h4>including</h4>

			{#if block.blockNumber > 0}
				<span>
					<abbr title="Block {Number(block.blockNumber) - 1} hash: {block.parentBlockHash}">hash</abbr>
					of block <BlockNumber {network} blockNumber={block.blockNumber - 1n} />
					<small>(<output><TruncatedValue value={block.parentBlockHash} /></output>)</small>
				</span>
			{/if}

			{#if block.transactions?.length}
				<span>
					{block.transactions.length}
					transactions

					{#if block.transactionsRoot}
						<small>(root: <abbr title={`Transactions root: ${block.transactionsRoot}`}><output><TruncatedValue value={block.transactionsRoot} /></output></abbr>)</small>
					{/if}


					{#if block.receiptsRoot}
						<span>
							with receipts
							<small>(root: <abbr title={`Receipts root: ${block.receiptsRoot}`}><output><TruncatedValue value={block.receiptsRoot} /></output></abbr>)</small>
						</span>
					{/if}
				</span>
			{/if}

			{#if block.mixHashOrPrevRandao}
				<span>
					{#if lastUpdate?.consensus.type === 'Proof of Work'}
						mix hash <output><TruncatedValue value={block.mixHashOrPrevRandao} /></output>
					{:else if lastUpdate?.consensus.type === 'Proof of Stake'}
						RANDAO <output><TruncatedValue value={block.mixHashOrPrevRandao} /></output>
					{/if}
				</span>
			{/if}

			{#if block.logsBloom && BigInt(block.logsBloom) !== 0n}
				<span>
					logs
					<small>(Bloom filter: <abbr title={`Logs bloom filter: ${block.logsBloom}`}><output><TruncatedValue value={block.logsBloom} /></output></abbr>)</small>
				</span>
			{/if}

			{#if block.sha3Uncles && block.sha3Uncles !== '0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347'}
				<span>
					SHA-3 hash of uncle block(s)
					<abbr title={`SHA3 of uncles: ${block.sha3Uncles}`}><output><TruncatedValue value={block.sha3Uncles} /></output></abbr>
				</span>
			{/if}

			{#if block.extraData && block.extraData !== '0x'}
				<span class="extra-data-container">
					extra data
					<span class="extra-data"><abbr title={`Extra data:\n${block.extraData}`}>{bytesToString(toBytes(block.extraData))}</abbr></span>
				</span>
			{/if}
		</div>
	</div>
</Collapsible>

{#if block.transactions?.length}
	<hr>

	<Collapsible
		type="details"
		bind:isOpen={showTransactions}
	>
		<svelte:element slot="title" this={`h${headingLevel + 1}`}>
			Transactions
			{#if block.transactions?.length}({block.transactions.length}{block.transactions.length === 100 ? '+' : ''}){/if}
		</svelte:element>

		<svelte:fragment slot="toolbar-items" let:isOpen>
			{#if isOpen}
				<div class="row align-end" transition:scale={{ easing: expoOut }}>
					<label>
						<input type="checkbox" bind:checked={showFees}>
						<span>Fees</span>
					</label>

					<label>
						<span>View</span>
						<select bind:value={detailLevel}>
							<option value='summary'>Summary</option>
							<option value='detailed'>Detailed</option>
							<option value='exhaustive'>Exhaustive</option>
						</select>
					</label>
				</div>
			{/if}
		</svelte:fragment>

		<div class="transactions-list column" class:scrollable-list={block.transactions?.length > 7}>
			{#if block.transactions}
				{#each block.transactions as transaction (transaction.transactionId)}
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
							includeLogs={detailLevel === 'exhaustive'}
							showDate={false}

							{detailLevel}
							{tokenBalanceFormat}
							{showFees}
						/>
					</AnchorLink>
				{/each}

			{:else if block.transactionIds}
				{#each block.transactionIds as transactionId (transactionId)}
					<AnchorLink
						class="card"
						base={`/explorer/${network.slug}`}
						link={`/tx/${transactionId}`}
					>
						<EthereumTransactionLoader
							{network}
							{transactionId}
							{transactionProvider}
							{quoteCurrency}

							{detailLevel}
							{tokenBalanceFormat}
							{showFees}
						/>
				</AnchorLink>
				{/each}
			{/if}
		</div>
	</Collapsible>
{/if}

<hr>

<div class="footer bar wrap">
	<span class="gas-stats">
		{#if block.gasLimit && block.gasUsed}
			<abbr title={'Gas Used\n\nGas: A virtual fuel used in Ethereum to execute smart contracts. The EVM uses an accounting mechanism to measure the consumption of gas and limit the consumption of computing resources.\n\nSource: https://ethereum.org/en/glossary/#gas'}>{formatNumber(block.gasUsed)}</abbr>
			/
			<abbr title={'Gas Limit\n\nThe maximum amount of gas a transaction or block may consume.\n\nSource: https://ethereum.org/en/glossary/#gas-limit'}>{formatNumber(Number(block.gasLimit))}</abbr>
			computational gas units used
			({formatPercent(Number(block.gasUsed) / Number(block.gasLimit))})
		{/if}
	</span>

	{#if block.timestamp}
		<Date date={block.timestamp} />
	{/if}
</div>
