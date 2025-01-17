<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import type { Filecoin } from '$/data/filecoin'
	import { networkBySlug } from '$/data/networks'
	
	
	// Inputs
	export let network: Ethereum.Network = networkBySlug.get('filecoin')!
	export let block: Filecoin.Block

	// (View options)
	export let isOpen = true
	export let layout: 'standalone' | 'inline' = 'inline'
	export let headingLevel: 1 | 2 | 3 | 4 | 5 | 6 = 4
	
	
	// Components
	import Address from './Address.svelte'
	import BlockNumber from './BlockNumber.svelte'
	import Collapsible from './Collapsible.svelte'
	import DateTime from './DateTime.svelte'
	import FilecoinBlockCid from './FilecoinBlockCid.svelte'
	import FilecoinTransactionsLoader from './FilecoinTransactionsLoader.svelte'
	import FilecoinTransactions from './FilecoinTransactions.svelte'
</script>


<Collapsible
	type="label"
	bind:isOpen
	canToggle={false}
	containerClass="column {layout === 'standalone' ? 'card' : ''}"
	class="column"
>
	<svelte:fragment slot="title">
		<div class="row wrap">
			<svelte:element this={`h${headingLevel}`}>
				<FilecoinBlockCid
					{network}
					blockCid={block.id}
					format="middle-truncated"
				/>
			</svelte:element>
		</div>
	</svelte:fragment>

	<svelte:fragment slot="header-right">
		<span class="card-annotation">
			{network.name} Block
		</span>
	</svelte:fragment>

	<hr>

	<section>
		<Collapsible
			type="label"
			class="column"
			canToggle
			isOpen
		>
			<svelte:fragment slot="title">
				<svelte:element this={`h${headingLevel + 1}`}>Network Consensus</svelte:element>
			</svelte:fragment>

			<svelte:fragment slot="header-right">
				<span class="card-annotation">
					<a href="https://spec.filecoin.io/algorithms/expected_consensus/" target="_blank">Expected Consensus</a>
				</span>
			</svelte:fragment>

			<div class="consensus card column">
				<div class="row wrap">
					<span>
						Miner

						{#if block.miner?.shortAddress ?? block.miner?.robustAddress}
							<span class="miner-address">
								<Address
									{network}
									address={block.miner?.shortAddress ?? block.miner?.robustAddress}
									format="middle-truncated"
								/>
							</span>
						{/if}
					</span>

					{#if block.transactionsCount !== undefined}
						<span>
							included

							<span>
								{block.transactionsCount ?? 0}
								{block.transactionsCount === 1 ? 'transaction' : 'transactions'}
							</span>
						</span>
					{/if}

					{#if block.tipset?.number !== undefined}
						<span>
							in

							<span>
								tipset

								<BlockNumber
									{network}
									blockNumber={block.tipset.number}
								/>
							</span>
						</span>
					{/if}
				</div>
			</div>
		</Collapsible>
	</section>

	<hr>

	<section>
		<FilecoinTransactionsLoader
			{network}
			query={{
				blockCid: block.id,
			}}
			bind:transactions={block.transactions}
			bind:transactionsCount={block.transactionsCount}
			let:transactions
			let:transactionsCount
			let:pagination
		>
			<FilecoinTransactions
				{network}
				{transactions}
				{transactionsCount}
				{pagination}
				isOpen
			/>
		</FilecoinTransactionsLoader>
	</section>

	<hr>

	<footer class="footer row">
		<span class="row inline wrap">
			<span>
				Block
				<FilecoinBlockCid
					{network}
					blockCid={block.id}
					format="middle-truncated"
				/>
			</span>

			{#if block.tipset?.number !== undefined}
				in

				<span>
					tipset
					<BlockNumber
						{network}
						blockNumber={block.tipset.number}
					/>
				</span>
			{/if}
		</span>

		{#if block.tipset?.timestamp}
			<DateTime
				date={block.tipset.timestamp}
				layout="horizontal"
			/>
		{/if}
	</footer>
</Collapsible>
