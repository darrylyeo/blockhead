<script lang="ts">
	// Constants/types
	import type { Ethereum } from '../data/networks/types'
	import type { Filecoin } from '../data/filecoin'
	import { networksBySlug } from '../data/networks'


	// Inputs
	export let network: Ethereum.Network = networksBySlug['filecoin']
	export let tipset: Filecoin.Tipset
	// (View options)
	export let headingLevel: 2 | 3 | 4 | 5 | 6 = 3
	export let showTransactions = false


	// Components'
	import Collapsible from './Collapsible.svelte'
	import Date from './Date.svelte'
	import BlockNumber from './BlockNumber.svelte'
	import FilecoinBlocks from './FilecoinBlocks.svelte'
	import FilecoinTipsetTransactionsLoader from './FilecoinTipsetTransactionsLoader.svelte'
	import FilecoinTransactions from './FilecoinTransactions.svelte'
	import TokenBalance from './TokenBalance.svelte'
</script>


<article class="card">
	<Collapsible
		type="label"
		isOpen
		canToggle={false}
		class="column"
	>
		<svelte:fragment slot="title">
			<svelte:element this={`h${headingLevel}`}>
				<BlockNumber
					{network}
					blockNumber={Number(tipset.number)}
				/>
			</svelte:element>
		</svelte:fragment>

		<svelte:fragment slot="header-right">
			<span class="card-annotation">
				<abbr title="Tipset: A set of blocks that are mined at the same time.">{network.name} Tipset</abbr>
			</span>
		</svelte:fragment>

		<hr>

		<section class="column">
			<header class="bar">
				<svelte:element this={`h${headingLevel + 1}`}>Network Consensus</svelte:element>

				<span class="card-annotation">
					<a href="https://spec.filecoin.io/algorithms/expected_consensus/" target="_blank">Expected Consensus</a>
				</span>
			</header>

			<div class="card consensus column">
				<div class="row spaced wrap">
					<span class="row-inline">
						{#if tipset.isCanonical}
							<span class="row-inline" data-before="✔">Canonical</span>
						{:else}
							<span class="row-inline" data-before="✘">Non-Canonical</span>
						{/if}

						tipset
					</span>

					<span>containing</span>

					{#if tipset.blocks?.length}
						<span>
							{tipset.blocks.length}
							blocks
						</span>
					{/if}

					{#if tipset.transactions?.length}
						<span>
							{tipset.transactions.length}
							transactions
						</span>
					{/if}

					{#if Number(tipset.number) > 0}
						<span>
							<abbr title="Block {Number(tipset.number) - 1} hash: {tipset.previousId}">hash</abbr>
							of previous tipset <BlockNumber {network} blockNumber={Number(tipset.number - 1n)} />
						</span>
					{/if}
				</div>
			</div>
		</section>

		<hr>

		<section>
			<FilecoinBlocks
				blocks={tipset.blocks}
				headingLevel={headingLevel + 1}
			/>
		</section>

		<hr>

		<section>
			<FilecoinTipsetTransactionsLoader
				tipsetNumber={tipset.number}
				transactions={tipset.transactions}
				let:transactions
			>
				<FilecoinTransactions
					bind:isOpen={showTransactions}
					{transactions}
					layout="inline"
					headingLevel={headingLevel + 1}
				/>
			</FilecoinTipsetTransactionsLoader>
		</section>

		<hr>

		<footer class="footer bar wrap">
			{#if tipset.baseGasFee}
				<span>
					Base fee: <TokenBalance {...network.nativeCurrency} balance={Number(tipset.baseGasFee) / 1e18} showDecimalPlaces={network.nativeCurrency.decimals} /> / gas unit
				</span>
			{:else}
				<span />
			{/if}

			<Date date={tipset.timestamp} layout="horizontal" />
		</footer>
	</Collapsible>
</article>
