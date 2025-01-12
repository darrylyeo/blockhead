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
	import Collapsible from './Collapsible.svelte'
	import FilecoinBlockCid from './FilecoinBlockCid.svelte'
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
				<FilecoinBlockCid blockCid={block.id} format="middle-truncated" />
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

	{#if block.transactions?.length}	
		<hr>

		<section>
			<FilecoinTransactions
				transactions={block.transactions}
			/>
		</section>
	{/if}
</Collapsible>
