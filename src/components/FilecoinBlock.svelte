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
	import DateComponent from './Date.svelte'
	import FilecoinBlockCid from './FilecoinBlockCid.svelte'
	import FilecoinTransactionsLoader from './FilecoinTransactionsLoader.svelte'
	import FilecoinTransactions from './FilecoinTransactions.svelte'
</script>


<Collapsible
	type="label"
	bind:isOpen
	canToggle={false}
	containerClass="column {layout === 'standalone' ? 'card' : ''}"
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

			<!-- <span>
				mined by
				<Address address={block.minerAddress} />
			</span> -->
		</div>
	</svelte:fragment>

	<svelte:fragment slot="header-right">
		<span class="card-annotation">
			{network.name} Block
		</span>
	</svelte:fragment>
	
	<hr>

	<span>
		mined by
		<Address {network} address={block.minerAddress} />
	</span>

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
			<DateComponent
				date={block.tipset.timestamp}
				format="both"
				layout="horizontal"
			/>
		{/if}
	</footer>
</Collapsible>
