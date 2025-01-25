<script lang="ts">
	// Constants/types
	import type { Ethereum } from '$/data/networks/types'
	import type { Filecoin } from '$/data/filecoin'
	import { networkBySlug } from '$/data/networks'


	// Inputs
	export let network: Ethereum.Network = networkBySlug.get('filecoin')!
	export let tipset: Filecoin.Tipset
	// (View options)
	export let headingLevel: 2 | 3 | 4 | 5 | 6 = 3
	export let showTransactions = false


	// Components'
	import Collapsible from './Collapsible.svelte'
	import DateTime from './DateTime.svelte'
	import BlockNumber from './BlockNumber.svelte'
	import FilecoinBlocks from './FilecoinBlocks.svelte'
	import FilecoinTransactionsLoader from './FilecoinTransactionsLoader.svelte'
	import FilecoinTransactions from './FilecoinTransactions.svelte'
	import IpfsContentId from './IpfsContentId.svelte'
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
			<div class="row inline">
				<svelte:element this={`h${headingLevel}`}>
					<BlockNumber
						{network}
						blockNumber={tipset.number ?? tipset.cid}
					/>

					{#if tipset.cid}
						<small>
							<IpfsContentId
								ipfsContentId={tipset.cid}
								format="middle-truncated"
							/>
						</small>
					{/if}
				</svelte:element>

				{#if tipset.isCanonical}
					<abbr title="Canonical">✔</abbr>
				{/if}
			</div>
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
				<div class="row wrap">
					<span class="row inline">
						{#if tipset.isCanonical !== undefined}
							{#if tipset.isCanonical}
								<abbr title="Canonical" class="row inline" data-before="✔">Canonical</abbr>
							{:else}
								<abbr title="Non-canonical" class="row inline" data-before="✘">Non-canonical</abbr>
							{/if}

							tipset
						{:else}
							Tipset
						{/if}
					</span>

					<span>containing</span>

					{#if tipset.blocks?.length}
						{@const uniqueMinersCount = tipset.blocks && (
							new Set(
								tipset.blocks.map(block => (
									block.miner?.shortAddress
								))
							)
								.size
						)}

						<span>
							<span>
								{tipset.blocks.length}
								{new Intl.PluralRules('en-US').select(tipset.blocks.length) === 'one' ? 'block' : 'blocks'}
							</span>

							{#if uniqueMinersCount !== undefined}
								<span>
									produced by
									{uniqueMinersCount}
									unique
									{new Intl.PluralRules('en-US').select(uniqueMinersCount) === 'one' ? 'miner' : 'miners'}
								</span>
							{/if}
						</span>
					{/if}

					{#if tipset.transactions?.length}
						<span>
							{#if tipset.blocks?.length && !(tipset.number > 0n)}and{/if}
							{tipset.transactions.length}
							{new Intl.PluralRules('en-US').select(tipset.transactions.length) === 'one' ? 'transaction' : 'transactions'}
						</span>
					{/if}

					{#if tipset.previousTipset}
						{@const previousTipsetNumber = tipset.previousTipset.number ?? tipset.number - 1n}

						<span>
							{#if tipset.blocks?.length || tipset.transactions?.length}and{/if}
							<abbr title="Block {previousTipsetNumber} hash: {tipset.previousTipset.cid ?? ''}">hash</abbr>
							of previous tipset
							<BlockNumber
								{network}
								blockNumber={previousTipsetNumber}
							/>
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
			<FilecoinTransactionsLoader
				query={{
					tipsetNumber: tipset.number
				}}
				transactions={tipset.transactions}
				transactionsCount={tipset.transactionsCount}
				let:transactions
				let:transactionsCount
				let:pagination
			>
				<FilecoinTransactions
					bind:isOpen={showTransactions}
					{transactions}
					{transactionsCount}
					layout="inline"
					headingLevel={headingLevel + 1}
					{pagination}
				/>
			</FilecoinTransactionsLoader>
		</section>

		<hr>

		<footer class="footer bar wrap">
			{#if tipset.baseGasRate}
				<span>
					Base fee: <TokenBalance
						token={{
							chainId: network.chainId,
							...network.nativeCurrency,
						}}
						balance={Number(tipset.baseGasRate) / 1e18}
						showDecimalPlaces={network.nativeCurrency.decimals}
					/> / gas unit
				</span>
			{:else}
				<span />
			{/if}

			<DateTime date={tipset.timestamp} />
		</footer>
	</Collapsible>
</article>
